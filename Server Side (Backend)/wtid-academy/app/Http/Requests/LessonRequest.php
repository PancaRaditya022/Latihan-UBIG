<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class LessonRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'set_id' => 'required|exists:sets,id',
            'contents' => 'required|array',
            'contents.*.type' => 'required|in:learn,quiz',
            'contents.*.content' => 'required|string',
            'contents.*.options' => 'required_if:contents.*.type,quiz|array',
            'contents.*.options.*.option_text' => 'required_with:contents.*.options|string',
            'contents.*.options.*.is_correct' => 'required_with:contents.*.options|boolean',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'message' => 'Invalid field(s) in request',
            'errors' => $validator->errors()
        ], 400));
    }
}
