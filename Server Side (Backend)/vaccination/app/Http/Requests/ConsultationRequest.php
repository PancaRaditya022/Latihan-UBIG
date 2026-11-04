<?php

namespace App\Http\Requests;

// use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class ConsultationRequest extends FormRequest
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
            'disease_history' => 'nullable|string',
            'current_symptoms' => 'nullable|string'
        ];
    }

    #[Override]
    protected function failedValidation(Validator $validator)
    {
        return response()->json([
            'message' => 'Invalid Requests',
            'errors' => $validator->errors()
        ], 401);
    }
}
