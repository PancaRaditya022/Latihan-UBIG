<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplyJob;
use App\Models\JobApplyPosition;
use App\Models\JobVacancies;
use App\Models\Societies;
use App\Models\Validations;
use Illuminate\Http\Request;

class JobVacancy extends Controller
{
    public function index(Request $request) 
    {
        $token = $request->query("token");

        if (!$token) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $society = Societies::where("login_tokens", $token)->first();

        if (!$society) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $validation = Validations::where('society_id', $society->id)
            ->where('status', 'accepted')
            ->first();

        if (!$validation) {
            return response()->json([
                'vacancies' => []
            ], 200);
        }

        $jobVacancies = JobVacancies::with(['jobCategory', 'availablePositions'])
            ->where('job_category_id', $validation->job_category_id)
            ->get();

        $vacancies = $jobVacancies->map(function ($vacancy) {
            return [
                'id' => $vacancy->id,
                'category' => [
                    'id' => $vacancy->jobCategory->id ?? null,
                    'job_category' => $vacancy->jobCategory->job_category ?? null,
                ],
                'company' => $vacancy->company,
                'address' => $vacancy->address,
                'description' => $vacancy->description,
                'available_position' => $vacancy->availablePositions->map(function ($position) {
                    return [
                        'id' => $position->id,
                        'position_id' => $position->id,
                        'position' => $position->position,
                        'capacity' => (int) $position->capacity,
                        'apply_capacity' => (int) $position->apply_capacity,
                    ];
                })
            ];
        });

        return response()->json([
            'vacancies' => $vacancies
        ], 200);
    }

    public function show(Request $request, $id)
    {
        $token = $request->query("token");

        if (!$token) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $society = Societies::where("login_tokens", $token)->first();

        if (!$society) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $vacancy = JobVacancies::with(['jobCategory', 'availablePositions'])->find($id);

        if (!$vacancy) {
            return response()->json([
                'message' => 'Vacancy not found'
            ], 404);
        }

        return response()->json([
            'vacancy' => [
                'id' => $vacancy->id,
                'category' => [
                    'id' => $vacancy->jobCategory->id ?? null,
                    'job_category' => $vacancy->jobCategory->job_category ?? null,
                ],
                'company' => $vacancy->company,
                'address' => $vacancy->address,
                'description' => $vacancy->description,
                'available_position' => $vacancy->availablePositions->map(function ($position) use ($society) {
                    $applyCount = JobApplyPosition::where('position_id', $position->id)->count();

                    return [
                        'id' => $position->id,
                        'position_id' => $position->id,
                        'position' => $position->position,
                        'capacity' => (int) $position->capacity,
                        'apply_capacity' => (int) $position->apply_capacity,
                        'apply_count' => $applyCount,
                    ];
                })
            ]
        ], 200);
    }
}