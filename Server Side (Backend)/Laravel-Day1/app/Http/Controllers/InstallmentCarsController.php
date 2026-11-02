<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use App\Providers\InstallmentProvider;
use Illuminate\Http\JsonResponse;

class InstallmentCarsController extends Controller
{
    use ApiResponse;

    protected $installmentProvider;

    public function __construct()
    {
        $this->installmentProvider = new InstallmentProvider();
    }

    public function index(): JsonResponse {
        return $this->successCars($this->installmentProvider->getAllCars());
    }

    public function show(int $id): JsonResponse {
        $cars = $this->installmentProvider->getInstallmentById($id);

        if ($cars === null) {
            return response()->json([
                'message' => 'Instalment not found'
            ], 404);
        }

        return $this->successInstallment($cars);
    }
}
