<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ConsultationRequest;
use App\Http\Resources\ConsultationResource;
use App\Models\Consultation;
use App\Models\Society;

class ConsultationController extends Controller
{
    public function store(ConsultationRequest $request)
    {
        $token = $request->query('token');

        $society = Society::where('login_tokens', $token)->first();

        if (!$society || !$token) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $validated = $request->validated();

        Consultation::create([
            'society_id' => $society->id,
            'disease_history' => $validated['disease_history'] ?? null,
            'current_symptoms' => $validated['current_symptoms'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Request consultation sent successful'
        ], 200);
    }

    public function index(Request $request)
    {
        $token = $request->query('token');

        $society = Society::where('login_tokens', $token)->first();

        if (!$society || !$token) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $consultation = Consultation::with('medicals')
            ->where('society_id', $society->id)
            ->first();

        return new ConsultationResource($consultation);
    }
}
