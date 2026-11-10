<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestConsultation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Consultation;
use App\Models\Society;

class ConsulationController extends Controller
{
    public function store(RequestConsultation $request) {
        $token = $request->query("token");

        $society = Society::where("login_tokens", $token)->first();

        if(!$token) {
            return response()->json([
                'message' => 'Unauthorized User'
            ], 401);
        }

        $validated = $request->validated();

        return DB::transaction(function () use ($request, $society, $validated) {
            Consultation::create([
                'society_id' => $society->id,
                'disease_history' => $validated['disease_history'],
                'current_symptoms' => $validated['current_symptoms'],

                
            ]);

            return response()->json([
                'message' => 'Request consultation sent successful'
            ], 200);
        });
    }

    public function index(Request $request) {
        $token = $request->query('token');

        $societies = Society::where('login_tokens', $token)->first();

        $consultation = Consultation::with('medicals')
            ->where('society_id', $societies->id)
            ->first();

        if(!$token) {
            return response()->json([
                'message' => 'Unauthorized User'
            ], 401);
        }

        return response()->json([
            'consultation' => [
                'id' => $consultation->id,
                'status' => $consultation->status,
                'disease_history' => $consultation->disease_history ?? null,
                'current_symptoms' => $consultation->current_symptoms ?? null,
                'doctor_notes' => $consultation->doctor_notes ?? null,
                'doctor' => $consultation->medicals ? [
                    'id' => $consultation->medicals->id,
                    'name' => $consultation->medicals->name ?? null
                ] : null,
            ]
        ]);
    }
}
