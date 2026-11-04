<?php

namespace App\Http\Controllers;

use App\Models\Society;
use Illuminate\Http\Request;
use App\Models\Consultation;
use App\Models\Vaccinations;
use Illuminate\Support\Carbon;
use App\Http\Requests\VaccinationRequest;
use App\Http\Resources\VaccinationResource;

class VaccinationController extends Controller
{
    public function store(VaccinationRequest $request)
    {
        $token = $request->query('token') ?? $request->header('token');
        $society = Society::where('login_tokens', $token)->first();

        if (!$society || !$token) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $consultation = Consultation::where('society_id', $society->id)->first();
        if (!$consultation || $consultation->status !== 'accepted') {
            return response()->json([
                'message' => "Your consultation layout hasn't accepted by doctor"
            ], 401);
        }

        $vaccinations = Vaccinations::where('society_id', $society->id)
            ->orderBy('dose', 'asc')
            ->get();

        if ($vaccinations->count() >= 2) {
            return response()->json([
                'message' => 'Society has been 2x vaccinated'
            ], 401);
        }

        $validated = $request->validated();
        $registerDate = Carbon::parse($validated['date']);

        if ($vaccinations->count() === 1) {
            $firstVaccination = $vaccinations->first();
            $firstDate = Carbon::parse($firstVaccination->date);

            if ($registerDate->diffInDays($firstDate) < 30) {
                return response()->json([
                    'message' => 'Wait at least +30 days from 1st Vaccination'
                ], 401);
            }

            $dose = 2;
            $message = 'Second vaccination registered successful';
        } else {
            $dose = 1;
            $message = 'First vaccination registered successful';
        }

        Vaccinations::create([
            'society_id' => $society->id,
            'spot_id' => $validated['spot_id'],
            'date' => $validated['date'],
            'dose' => $dose,
        ]);

        return response()->json([
            'message' => $message
        ], 200);
    }

    public function index(Request $request)
    {
        $token = $request->query('token') ?? $request->header('token');
        $society = Society::where('login_tokens', $token)->first();

        if (!$society || !$token) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $firstVaccination = Vaccinations::with(['spot.regional', 'vaccine', 'doctor'])
            ->where('society_id', $society->id)
            ->where('dose', 1)
            ->first();

        $secondVaccination = Vaccinations::with(['spot.regional', 'vaccine', 'doctor'])
            ->where('society_id', $society->id)
            ->where('dose', 2)
            ->first();

        return response()->json([
            'vaccinations' => [
                'first' => $firstVaccination ? new VaccinationResource($firstVaccination) : null,
                'second' => $secondVaccination ? new VaccinationResource($secondVaccination) : null,
            ]
        ], 200);
    }
}
