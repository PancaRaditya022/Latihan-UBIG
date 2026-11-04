<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsultationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if(!$this->resource) {
            return [
                'consultation' => null
            ];
        }

        return [
            'id' => $this->id,
            'status' => $this->status,
            'disease_history' => $this->disease_history ?? null,
            'current_symptoms' => $this->current_symptoms ?? null,
            'doctor_notes' => $this->doctor_notes ?? null,
            'doctor' => $this->medicals ? [
                'id' => $this->medicals->id,
                'name' => $this->medicals->name ?? null
            ] : null,
        ];
    }
}
