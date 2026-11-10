<?php

namespace App\Http\Controllers;

use App\Http\Requests\VaccinationRequest;
use App\Models\Consultation;
use App\Models\Society;
use App\Models\Vaccinations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
                'message' => "Your consultation must be accepted by doctor before"
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

        if ($vaccinations->count() === 1) {
            $firstVaccination = $vaccinations->first();
            $diffInDays = (strtotime($validated['date']) - strtotime($firstVaccination->date)) / 86400;

            if ($diffInDays < 30) {
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

        return DB::transaction(function () use ($society, $validated, $dose, $message) {
            Vaccinations::create([
                'society_id' => $society->id,
                'spot_id'    => $validated['spot_id'],
                'date'       => $validated['date'],
                'dose'       => $dose,
            ]);

            return response()->json([
                'message' => $message
            ], 200);
        });
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
                'first'  => $firstVaccination ? $this->formatVaccination($firstVaccination) : null,
                'second' => $secondVaccination ? $this->formatVaccination($secondVaccination) : null,
            ]
        ], 200);
    }

    /**
     * Format data vaksinasi secara langsung tanpa Resource class.
     */
    private function formatVaccination($vaccination)
    {
        return [
            'queue'            => $vaccination->id,
            'dose'             => $vaccination->dose,
            'vaccination_date' => $vaccination->date,
            'spot'             => $vaccination->spot ? [
                'id'       => $vaccination->spot->id,
                'name'     => $vaccination->spot->name,
                'address'  => $vaccination->spot->address,
                'serve'    => $vaccination->spot->serve,
                'capacity' => $vaccination->spot->capacity,
                'regional' => $vaccination->spot->regional ? [
                    'id'       => $vaccination->spot->regional->id,
                    'province' => $vaccination->spot->regional->province,
                    'district' => $vaccination->spot->regional->district,
                ] : null,
            ] : null,
            'status'     => $vaccination->status,
            'vaccine'    => $vaccination->vaccine ? [
                'id'   => $vaccination->vaccine->id,
                'name' => $vaccination->vaccine->name,
            ] : null,
            'vaccinator' => $vaccination->doctor ? [
                'id'   => $vaccination->doctor->id,
                'role' => $vaccination->doctor->role,
                'name' => $vaccination->doctor->name,
            ] : null,
        ];
    }
}