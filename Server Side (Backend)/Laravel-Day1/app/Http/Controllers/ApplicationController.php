<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Providers\ApplicantProvider;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    protected $appProvider;

    public function __construct()
    {
        $this->appProvider = new ApplicantProvider();
    }

    public function store(Request $request): JsonResponse
    {
        /** @var \App\Models\Societies $society */
        $society = Auth::guard('api')->user();

        $validator = Validator::make($request->all(), [
            'instalment_id' => 'required|integer|exists:installment,id',
            'months'        => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors'  => $validator->errors()
            ], 401);
        }

        if (!$this->appProvider->isSocietyValidated($society->id)) {
            return response()->json([
                'message' => 'Your data validator must be accepted by validator before'
            ], 401);
        }

        if ($this->appProvider->hasAppliedBefore($society->id)) {
            return response()->json([
                'message' => ' Application for a instalment can only be once'
            ], 401);
        }

        $availableMonth = $this->appProvider->getAvailableMonth((int) $request->instalment_id, (int) $request->months);

        if (!$availableMonth) {
            return response()->json([
                'message' => 'Invalid field',
                'errors'  => ['months' => ['The selected months is not available for this instalment.']]
            ], 401);
        }

        $income = $this->appProvider->societyIncome($society->id);

        if ($income === null || $income < $availableMonth->nominal) {
            return response()->json([
                'message' => 'Invalid field',
                'errors'  => ['months' => ['The selected months does not fit your income.']]
            ], 401);
        }

        $this->appProvider->createApplication($society->id, $request->all(), $availableMonth);

        return response()->json([
            'message' => 'Applying for Instalment successful'
        ], 200);
    }

    public function index(): JsonResponse
    {
        /** @var \App\Models\Societies $society */
        $society = Auth::guard('api')->user();

        $data = $this->appProvider->getSocietyApplications($society->id);

        return response()->json([
            'instalments' => $data
        ], 200);
    }
}
