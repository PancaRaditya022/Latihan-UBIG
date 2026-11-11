<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestValidations;
use App\Models\Societies;
use App\Models\Validations;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ValidationController extends Controller
{
    public function store(RequestValidations $request) {
        $token = $request->query("token");
        $society = Societies::where('login_tokens', $token)->first();

        if(!$token) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $validated = $request->validated();

        return DB::transaction(function () use ($society, $validated,) {
            Validations::create([
                'society_id' => $society->id,
                'work_experience' => $validated['work_experience'],
                'job_category_id' => $validated['job_category_id'],
                'job_position' => $validated['job_position'],
                'reason_accepted' => $validated['reason_accepted'],
            ]);

            return response()->json([
                'message' => 'Request data validations sent'
            ], 200);
        });
    }

    public function index(Request $request) {
        $token = $request->query('token');

        $society = Societies::where('login_tokens', $token)->first();
        $validation = Validations::with('validators')
            ->where('society_id', $society->id)
            ->first();

        if(!$token) {
            return response()->json([
                'message'=> 'Unauthorized user'
            ], 404);
        }

        return response()->json([
            'id' => $validation->id,
            'status' => $validation->status,
            'work_experience' => $validation->work_experience ?? null,
            'job_category_id' => $validation->job_category_id ?? null,
            'job_position' => $validation->job_position ?? null,
            'reason_accepted' => $validation->reason_accepted ?? null,
            'validator_notes' => $validation->validator_notes ?? null,
            'validator' => $validation->validators ? [
                'id' => $validation->validators->id,
                'name' => $validation->validators->name
            ]: null
        ]);
    }
}
