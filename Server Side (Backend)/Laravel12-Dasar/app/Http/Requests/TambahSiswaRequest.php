<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class TambahSiswaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'kelas_id' => 'required|integer|exists:kelas,id',
            'nama' => 'required|string|min:3',
            'nis' => 'required|digits:7|unique:siswa,nis',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'nis.unique' => 'NIS ini udah dipake siswa lain.',
            'jenis_kelamin.in' => 'Jenis kelamin cuma boleh L atau P.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Invalid field',
            'errors' => $validator->errors(),
        ], 422));
    }
}
