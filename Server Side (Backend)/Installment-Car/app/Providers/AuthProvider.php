<?php

namespace App\Providers;

use App\Models\Societies;
use Illuminate\Support\Facades\Auth;

class AuthProvider
{
    public function attemptLogin(array $credentials) {
        $societies = Societies::with('regional')->where('id_card_number', $credentials['id_card_number'])->first();

        if (!$societies || $societies->password !== $credentials['password']) {
            return false;
        }

        $token = $societies->createToken('auth_token')->plainTextToken;

        return [
            "name" => $societies->name,
            "born_date" => $societies->born_date,
            "gender" => $societies->gender,
            "address" => $societies->address,
            "token" => $token,
            "regional" => [
                "id" => $societies->regional->id,
                "province" => $societies->regional->province,
                "district" => $societies->regional->district,
            ]
        ];
    }

    public function attemptLogout() {
        /** @var \App\Models\Societies $societies */
        $societies = Auth::guard('api')->user();

        if ($societies) {
            /** @var \Laravel\Sanctum\PersonalAccessToken $accessToken */
            $accessToken = $societies->currentAccessToken();

            if ($accessToken) {
                $accessToken->delete();
            }

            return true;
        }
        return false;
    }
}
