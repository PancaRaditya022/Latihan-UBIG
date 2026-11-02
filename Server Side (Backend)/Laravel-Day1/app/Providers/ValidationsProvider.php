<?php

namespace App\Providers;

use App\Models\Validation;

class ValidationsProvider
{
    public function hasRequestedBefore(int $societyId): bool
    {
        return Validation::where('society_id', $societyId)->exists();
    }

    public function createRequest(int $societyId, array $data): bool
    {
        return (bool) Validation::create([
            'society_id'      => $societyId,
            'status'          => 'pending',
            'job'             => $data['job'],
            'job_description' => $data['job_description'],
            'income'          => $data['income'],
            'reason_accepted' => $data['reason_accepted'],
        ]);
    }

    public function getSocietyValidation(int $societyId)
    {
        $validation = Validation::with('validator')
            ->where('society_id', $societyId)
            ->first();

        if (!$validation) {
            return null;
        }

        $status = $validation->status === 'declined' ? 'rejected' : $validation->status;

        return [
            'id'              => $validation->id,
            'status'          => $status,
            'job'             => $validation->job,
            'job_description' => $validation->job_description,
            'income'          => (string) $validation->income,
            'reason_accepted' => $validation->reason_accepted,
            'validator_notes' => $validation->validator_notes,
            'validator'       => $validation->validator ? [
                'id'   => $validation->validator->id,
                'name' => $validation->validator->name,
                'role' => $validation->validator->role,
            ] : null
        ];
    }
}
