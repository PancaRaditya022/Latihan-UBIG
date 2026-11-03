<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Observatory;

class ObservatoryController extends Controller
{
    public function search(Request $request) {
        $observatory = Observatory::with('telescope:id,name,type')
            ->when($request->search, function ($q, $search) {
                return $q->where('event_name', 'like', "%{$search}%");
            })
            ->when($request->min_price, fn($q, $min) => $q->where('price_per_slot', '>=', $min))
            ->when($request->max_price, fn($q, $max) => $q->where('price_per_slot', '<=', $max))
            // ->get();
            ->paginate($request->get('per_page', 10));

        return response()->json($observatory);
    }

    public function show(int $id)
    {
        $observatory = Observatory::with('telescope')->find($id);

        if (!$observatory) {
            return response()->json([
                'message' => 'Data tidak ditemukan'
            ]);
        }

        $observatory->makeVisible('description');

        return response()->json([
            'slot' => [
                'id' => $observatory->id,
                'event_name' => $observatory->event_name,
                'event_date' => $observatory->event_date,
                'price_per_slot' => (string) $observatory->price_per_slot,
                'max_capacity' => (int) $observatory->max_capacity,
                'booked_count' => (int) $observatory->booked_count,
                'description' => $observatory->description,
                'telescope' => $observatory->telescope ? [
                    'id' => $observatory->telescope->id,
                    'name' => $observatory->telescope->name,
                    'type' => $observatory->telescope->type,
                ] : null,
            ]
        ], 200);
    }
}
