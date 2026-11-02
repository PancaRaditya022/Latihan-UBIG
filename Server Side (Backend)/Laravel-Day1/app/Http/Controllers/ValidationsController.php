<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Providers\ValidationsProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ValidationsController extends Controller
{
    use ApiResponse;

    protected $validationProvider;

    public function __construct()
    {
        $this->validationProvider = new ValidationsProvider();
    }

    public function store(Request $request): JsonResponse
    {
        /** @var \App\Models\Societies $society */
        $society = Auth::guard('api')->user();

        $validator = Validator::make($request->all(), [
            'job'             => 'required|string',
            'job_description' => 'required|string',
            'income'          => 'required|numeric',
            'reason_accepted' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors'  => $validator->errors()
            ], 401);
        }

        if ($this->validationProvider->hasRequestedBefore($society->id)) {
            return response()->json([
                'message' => 'Application for a validation can only be once'
            ], 401);
        }

        $this->validationProvider->createRequest($society->id, $request->all());

        return $this->successNoData('Request data validation sent successful');
    }

    public function index(): JsonResponse
    {
        /** @var \App\Models\Societies $society */
        $society = Auth::guard('api')->user();

        $data = $this->validationProvider->getSocietyValidation($society->id);

        return response()->json([
            'validation' => $data
        ], 200);
    }
}
