<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CheckLessonRequest extends FormRequest
{
    public function rules(): array  {
        return [
            'option_id' => 'required|exists:options,id',
        ];
    }

    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'message' => 'Invalid field(s) in request',
            'errors' => $validator->errors()
        ], 400));
    }
}
