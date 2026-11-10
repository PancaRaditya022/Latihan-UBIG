<?php

namespace App\Http\Requests;

// use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class VaccinationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'spot_id' => 'required|exists:spots,id',
            'date' => 'required|date_format:Y-m-d',
        ];
    }

    #[Override]
    protected function failedValidation(Validator $validator)
    {
        return response()->json([
            'message' => 'Invalid request',
            'errors' => $validator->errors()
        ], 422);
    }
}
