<?php

namespace App\Http\Requests;

// use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class AuthRequest extends FormRequest
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
            'id_card_number' => 'required',
            'password' => 'required|min:5'
        ];
    }

    #[Override]
    protected function failedValidation(Validator $validator)
    {
        return response()->json([
            // 'status' => false,
            'message' => 'Invalid request',
            'errors' => $validator->errors()
        ], 422);
    }
}
