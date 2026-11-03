<?php

namespace App\Providers;

use App\Models\Validation;

class ValidationProvider
{
    public function hasRequestedBefore(int $societyId): bool
    {
        return Validation::where('society_id', $societyId)->exists();
    }

    public function createRequest(int $societyId, array $data): bool
    {
        return(bool) Validation::create([
            'society_id' => $societyId,
            'validator_id' => '1',
            'status' => 'pending',
            'institution' => $data['institution'],
            'occupation' => $data['occupation'],
            'reason_accepted' => $data['reason_accepted'],
            'validator_notes'=> $data['validator_notes'] ?? null
        ]);
    }

    public function getSocietyValidation(int $societyId) {
        $validation = Validation::with('validator')->where('society_id', $societyId)->first();

        if(!$validation) {
            return null;
        }

        $status = $validation->status === "declined" ? "rejected" : $validation->status;

        return [
            'id' => $validation->id,
            'status' => $status,
            'institution' => $validation->institution,
            'occupation' => $validation->occuaption,
            'reason_accepted' => $validation->reason_accepted,
            'validator_notes' => $validation->validator_notes ?? null,
            'validator'       => $validation->validator ? [
                'id'   => $validation->validator->id,
                'name' => $validation->validator->name,
                'role' => $validation->validator->role,
            ] : null
        ];
    }
}
