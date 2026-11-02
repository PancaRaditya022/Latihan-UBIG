<?php

namespace App\Providers;

use App\Models\Installment;

class InstallmentProvider
{
    public function getAllCars(): array{
        $installment = Installment::with(['brand', 'availableMonths'])->get();

        return $installment->map(function ($item) {
            return [
                'id' => $item->id,
                'car' => $item->cars,
                'brand' => $item->brand ? $item->brand->brand : null,
                'price' => (string)$item->price,
                'description' => $item->description,
                'available_month' => $item->availableMonths->map(function ($month) {
                    return [
                        'month' => (int) $month->month,
                        'description' => $month->description
                    ];
                })->values()->all()
            ];
        })->all();
    }

    public function getInstallmentById(int $id): ?array
    {
        $item = Installment::with(['brand', 'availableMonths'])->find($id);

        if (!$item) {
            return null;
        }

        return [
            'id'              => $item->id,
            'car'             => $item->cars,
            'brand'           => $item->brand ? $item->brand->brand : null,
            'price'           => (string) $item->price,
            'description'     => $item->description,
            'available_month' => $item->availableMonths->map(function ($month) {
                return [
                    'month'       => (int) $month->month,
                    'description' => $month->description,
                ];
            })->values()->all()
        ];
    }
}
