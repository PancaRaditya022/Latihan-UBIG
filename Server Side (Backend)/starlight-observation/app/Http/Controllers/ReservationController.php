<?php

namespace App\Http\Controllers;

use App\Models\Validation;
use App\Models\Reservation;
use App\Models\Observatory;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = validator($request->all(), [
            'observatory_slot_id' => 'required|exists:observatory_slots,id',
            'requested_tickets'   => 'required|integer|min:1',
            'notes'               => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors'  => $validator->errors()
            ], 401);
        }

        $society = $request->user();

        $validation = Validation::where('society_id', $society->id)
            ->where('status', 'accepted')
            ->first();

        if (!$validation) {
            return response()->json([
                'message' => "Your data validation must be accepted by validator before"
            ], 401);
        }

        $hasApplied = Reservation::where('society_id', $society->id)
            ->where('observatory_slot_id', $request->observatory_slot_id)
            ->exists();

        if ($hasApplied) {
            return response()->json([
                'message' => 'Application for a reservation can only be once'
            ], 401);
        }

        try {
            return DB::transaction(function () use ($request, $society) {
                $slot = Observatory::lockForUpdate()->findOrFail($request->observatory_slot_id);

                $availableCapacity = $slot->max_capacity - $slot->booked_count;
                if ($request->requested_tickets > $availableCapacity) {
                    throw new \Exception('KAPASITAS_FULL');
                }

                $totalPrice = $slot->price_per_slot * $request->requested_tickets;
                $bookingCode = 'OBS-' . now()->format('Ym') . '-' . Str::padLeft($society->id, 3, '0');

                Reservation::create([
                    'society_id'          => $society->id,
                    'observatory_slot_id' => $slot->id,
                    'booking_code'        => $bookingCode,
                    'total_tickets'       => $request->requested_tickets,
                    'total_price'         => $totalPrice,
                    'status'              => 'pending',
                    'notes'               => $request->notes,
                ]);

                $slot->increment('booked_count', $request->requested_tickets);

                return response()->json([
                    'message' => 'Applying for reservation successful'
                ], 200);
            });


        } catch (\Exception $e) {
            if ($e->getMessage() === 'KAPASITAS_FULL') {
                return response()->json([
                    'message' => 'Requested ticket quantity exceeds available slot capacity'
                ], 422);
            }

            return response()->json([
                'message' => 'Server Error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function index(Request $request): JsonResponse
    {
        $society = $request->user();

        $reservations = Reservation::with('observatory.telescopes')
            ->where('society_id', $society->id)
            ->get();

        $data = $reservations->map(function ($reservation) {
            return [
                'id'            => $reservation->id,
                'booking_code'  => $reservation->booking_code,
                'total_tickets' => $reservation->total_tickets,
                'total_price'   => (string) $reservation->total_price,
                'status'        => $reservation->status,
                'notes'         => $reservation->notes,
                'slot' => [
                    'id'         => $reservation->observatory->id,
                    'event_name' => $reservation->observatory->event_name,
                    'event_date' => $reservation->observatory->event_date,
                    'telescope'  => $reservation->observatory->telescopes->name ?? null,
                ]
            ];
        });

        return response()->json([
            'reservations' => $data
        ], 200);
    }
}
