<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VaccinationResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        if (!$this->resource) {
            return [
                'vaccinations' => null
            ];
        }

        return [
            'queue' => $this->id,
            'dose' => $this->dose,
            'vaccination_date' => $this->date,
            'spot' => $this->spot ? [
                'id' => $this->spot->id,
                'name' => $this->spot->name,
                'address' => $this->spot->address,
                'serve' => $this->spot->serve,
                'capacity' => $this->spot->capacity,
                'regional' => $this->spot->regional ? [
                    'id' => $this->spot->regional->id,
                    'province' => $this->spot->regional->province,
                    'district' => $this->spot->regional->district,
                ] : null,
            ] : null,
            'status' => $this->status ?? 'done',
            'vaccine' => $this->vaccine ? [
                'id' => $this->vaccine->id,
                'name' => $this->vaccine->name,
            ] : null,
            'vaccinator' => $this->doctor ? [
                'id' => $this->doctor->id,
                'role' => $this->doctor->role,
                'name' => $this->doctor->name,
            ] : null,
        ];
    }
}
