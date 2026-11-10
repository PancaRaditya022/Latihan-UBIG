<?php

namespace App\Providers;

use App\Models\Validation;
use App\Models\InstallmentApplySociety;
use App\Models\InstallmentApplyStatus;
use App\Models\AvailableMonth;
use App\Models\Installment;
use Illuminate\Support\Facades\DB;

class ApplicantProvider
{
    public function isSocietyValidated(int $societyId): bool
    {
        $validation = Validation::where('society_id', $societyId)->first();
        return $validation && $validation->status === 'accepted';
    }

    public function hasAppliedBefore(int $societyId): bool
    {
        return InstallmentApplySociety::where('society_id', $societyId)->exists();
    }

    public function getAvailableMonth(int $installmentId, int $month): ?AvailableMonth
    {
        return AvailableMonth::where('installment_id', $installmentId)
            ->where('month', $month)
            ->first();
    }

    public function societyIncome(int $societyId): ?int
    {
        $income = Validation::where('society_id', $societyId)->value('income');
        return $income === null ? null : (int) $income;
    }

    public function createApplication(int $societyId, array $data, AvailableMonth $availableMonth): void
    {
        $currentDate = date('Y-m-d');
        $installmentId = (int) $data['instalment_id'];

        DB::transaction(function () use ($currentDate, $data, $availableMonth, $societyId, $installmentId) {
            $apply = InstallmentApplySociety::create([
                'notes'              => $data['notes'] ?? null,
                'available_month_id' => $availableMonth->id,
                'date'               => $currentDate,
                'society_id'         => $societyId,
                'installment_id'     => $installmentId
            ]);

            InstallmentApplyStatus::create([
                'date'                           => $currentDate,
                'society_id'                     => $societyId,
                'installment_id'                 => $installmentId,
                'available_month_id'             => $availableMonth->id,
                'installment_apply_societies_id' => $apply->id,
                'status'                         => 'pending'
            ]);
        });
    }

    public function getSocietyApplications(int $societyId): array
    {
        $installments = Installment::with(['brand', 'applications' => function($query) use ($societyId) {
            $query->where('society_id', $societyId)->with(['statusRecord', 'availableMonth']);
        }])
        ->whereHas('applications', function($query) use ($societyId) {
            $query->where('society_id', $societyId);
        })
        ->get();

        return $installments->map(function ($inst) {
            return [
                'id'           => $inst->id,
                'car'          => $inst->cars,
                'brand'        => $inst->brand ? $inst->brand->brand : null,
                'price'        => (string) $inst->price,
                'description'  => $inst->description,
                'applications' => $inst->applications->map(function ($app) {
                    return [
                        'month'        => $app->availableMonth ? (string) $app->availableMonth->month : "0",
                        'nominal'      => $app->availableMonth ? (string) $app->availableMonth->nominal : "0",
                        'apply_status' => $app->statusRecord ? $app->statusRecord->status : 'pending',
                        'notes'        => $app->notes,
                    ];
                })->values()->all()
            ];
        })->all();
    }
}
