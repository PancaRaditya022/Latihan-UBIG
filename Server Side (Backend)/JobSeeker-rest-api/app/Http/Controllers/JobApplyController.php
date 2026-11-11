<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplyJob;
use App\Models\JobApplyPosition;
use App\Models\JobApplySociety;
use App\Models\Societies;
use App\Models\Validations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JobApplyController extends Controller
{
    public function store(ApplyJob $request) {
        $token = $request->query('token');
        $society = Societies::where('login_tokens', $token)->first();
        $validated = $request->validated();

        if (!$token || !$society) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $validation = Validations::where('society_id', $society->id)
            ->where('status', 'accepted')
            ->first();

        if (!$validation) {
            return response()->json([
                'message' => 'Your data validator must be accepted by validator before'
            ], 401);
        }

        $check = JobApplySociety::where('society_id', $society->id)->exists();

        if ($check) {
            return response()->json([
                'message' => 'Application for a job can only be once'
            ], 401);
        }

        return DB::transaction(function () use ($society, $validated) {
            $jobApplySociety = JobApplySociety::create([
                'society_id'     => $society->id,
                'date'           => date('Y-m-d'),
                'notes'          => $validated['notes'] ?? null,
                'job_vacancy_id' => $validated['vacancy_id'],
            ]);

            $positions = $validated['positions'] ?? [];

            foreach ($positions as $positionId) {
                JobApplyPosition::create([
                    'date'                   => date('Y-m-d'),
                    'society_id'             => $society->id,
                    'job_vacancy_id'         => $validated['vacancy_id'],
                    'position_id'            => $positionId,
                    'job_apply_societies_id' => $jobApplySociety->id,
                    'status'                 => 'pending'
                ]);
            }

            return response()->json([
                'message' => 'Applying for job successful'
            ], 200);
        });
    }

    public function index(Request $request) {
        $token = $request->query('token');
        $society = Societies::where('login_tokens', $token)->first();

        if (!$token || !$society) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $applications = JobApplySociety::where('society_id', $society->id)
            ->with(['jobVacancy.jobCategory', 'positions.availablePosition'])
            ->get();

        $vacancies = $applications->map(function ($app) {
            return [
                'id' => $app->jobVacancy->id,
                'category' => [
                    'id' => $app->jobVacancy->jobCategory->id,
                    'job_category' => $app->jobVacancy->jobCategory->job_category,
                ],
                'company' => $app->jobVacancy->company,
                'address' => $app->jobVacancy->address,
                'position' => $app->positions->map(function ($pos) use ($app) {
                    return [
                        'position' => $pos->availablePosition->position ?? null,
                        'apply_status' => $pos->status,
                        'notes' => $app->notes,
                    ];
                }),
                'date' => $app->date,
            ];
        });

        return response()->json([
            'vacancies' => $vacancies
        ], 200);
    }
}
