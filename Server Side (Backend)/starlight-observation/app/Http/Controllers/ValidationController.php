<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Providers\ValidationProvider;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ValidationController extends Controller
{
    protected $validationProvider;

    public function __construct()
    {
        $this->validationProvider = new ValidationProvider();
    }

    public function store(Request $request): JsonResponse {
        $society = Auth::guard('api')->user();

        $validator = Validator::make($request->all(), [
            'institution' => 'required|string',
            'occupation' => 'required|string',
            'reason_accepted' => 'required|string'
        ]);

        if(!$validator) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        // if($this->validationProvider->hasRequestedBefore($society->id)) {
        //     return response()->json([
        //         'message' => ''
        //     ]);
        // }

        $this->validationProvider->createRequest($society->id, $request->all());

        return response()->json([
            'message' => 'Request data validation sent successful'
        ], 200);
    }

    public function index() {
        $society = Auth::guard('api')->user();

        $data = $this->validationProvider->getSocietyValidation($society->id);

        return response()->json([
            'validation' => [
                $data
            ]
        ], 200);
    }
}
