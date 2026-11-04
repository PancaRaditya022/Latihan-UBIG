<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Spots;
use App\Models\Society;
use Illuminate\Http\Request;
use App\Models\Vaccinations;
use App\Http\Resources\SpotResource;

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

        $spots = Spots::with('vaccines')
            ->where('regional_id', $society->regional_id)
            ->get();

        return response()->json([
            'spots' => SpotResource::collection($spots)
        ], 200);
    }

    public function show(Request $request, $spot_id)
    {
        $token = $request->query('token') ?? $request->header('token');

        $society = Society::where('login_tokens', $token)->first();

        if (!$society || !$token) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $spot = Spots::find($spot_id);

        if (!$spot) {
            return response()->json([
                'message' => 'Spot not found'
            ], 404);
        }

        $dateParam = $request->query('date') ?? date('Y-m-d');
        $formattedDate = Carbon::parse($dateParam)->format('F d, Y');

        $vaccinationsCount = Vaccinations::where('spot_id', $spot->id)
            ->where('date', Carbon::parse($dateParam)->format('Y-m-d'))
            ->count();

        return response()->json([
            'date' => $formattedDate,
            'spot' => [
                'id' => $spot->id,
                'name' => $spot->name,
                'address' => $spot->address,
                'serve' => $spot->serve,
                'capacity' => $spot->capacity,
            ],
            'vaccinations_count' => $vaccinationsCount
        ], 200);
    }
}
