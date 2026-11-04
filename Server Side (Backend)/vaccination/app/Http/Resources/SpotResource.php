<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Vaccines;

class SpotResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $allVaccines = Vaccines::all();

        $availableVaccineIds = $this->vaccines->pluck('id')->toArray();

        $status = [];
        foreach ($allVaccines as $vaccine) {
            $status[$vaccine->name] = in_array($vaccine->id, $availableVaccineIds);
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'serve' => $this->serve,
            'capacity' => $this->capacity,
            'available_vaccines' => $status,
        ];
    }
}
