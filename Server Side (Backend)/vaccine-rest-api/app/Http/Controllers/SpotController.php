<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Society;
use App\Models\Spot;
use App\Models\Vaccine;
use App\Models\Vaccinations;
use Carbon\Carbon;

class SpotController extends Controller
{
    public function index(Request $request)
    {
        $token = $request->query('token') ?? $request->header('token');

        $society = Society::where('login_tokens', $token)->first();

        if (!$society || !$token) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $spots = Spot::with('vaccines')->where('regional_id', $society->regional_id)->get();

        $data = $spots->map(function ($spot) {
            $spot->makeHidden(['vaccines']);

            $allVaccines = Vaccine::pluck('name')->mapWithKeys(fn ($name) => [$name => false]);
            // dd($allVaccines);
            $availableVaccines = $spot->vaccines->mapWithKeys(fn ($v) => [$v->name => true])->toArray();
            // dd($availableVaccines);

            $spotDatas = $spot->toArray();
            $spotDatas['available_vaccines'] = array_merge($allVaccines->toArray(), $availableVaccines);

            return $spotDatas;
        });

        return response()->json([
            'message' => 'Spot Vaccines Data retrieved successful',
            'spots' => $data,
        ], 200);
    }

public function show(Request $request, int $spot_id)
    {
        $token = $request->query('token');
        $society = Society::where('login_tokens', $token)->first();

        if (!$society || !$token) {
            return response()->json(['message' => 'Unauthorized user'], 401);
        }

        $spot = Spot::find($spot_id);
        if (!$spot) {
            return response()->json(['message' => 'Spot not found'], 404);
        }

        $dateParam = $request->query('date', date('Y-m-d'));
        $formattedDate = date('F d, Y', strtotime($dateParam));

        $vaccinations = Vaccinations::where('spot_id', $spot->id)
            ->whereDate('date', $dateParam)
            ->get(['id', 'dose', 'date', 'society_id', 'spot_id']);

        return response()->json([
            'date' => $formattedDate,
            'spot' => [
                'id' => $spot->id,
                'name' => $spot->name,
                'address' => $spot->address,
                'serve' => $spot->serve,
                'capacity' => $spot->capacity,
            ],
            'vaccinations_count' => $vaccinations->count(),
            'vaccinations' => $vaccinations
        ], 200);
    }
}
