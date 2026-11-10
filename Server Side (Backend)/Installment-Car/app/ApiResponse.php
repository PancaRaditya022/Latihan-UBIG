<?php

namespace App;

use Illuminate\Http\JsonResponse;

trait ApiResponse {
    protected function errorResponse(string $message, int $code): JsonResponse {
        return response()->json([
            'status' => false,
            'message' => $message
        ], $code);
    }

    protected function errorCars(string $message, int $code = 401): JsonResponse {
        return response()->json([
            'message' => $message
        ], $code);
    }

    protected function successResponse(string $message, $data = null, int $code = 200): JsonResponse {
        return response()->json([
            'status'=> true,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    protected function successNoData(string $message, $data = null, int $code = 200): JsonResponse {
        return response()->json([
            'status'=> true,
            'message' => $message
        ], $code);
    }

    protected function successCars($data = null, int $code = 200) {
        return response()->json([
            'cars' => $data
        ], $code);
    }

    protected function successInstallment($data = null, int $code = 200) {
        return response()->json([
            'instalment' => $data
        ], $code);
    }
}
