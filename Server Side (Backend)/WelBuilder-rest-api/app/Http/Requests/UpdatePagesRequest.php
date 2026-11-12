<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePagesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $currentSlug = $this->route('slug');
        $page = $this->user()->pages()->where('slug', $currentSlug)->first();

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug'  => [
                'required',
                'string',
                'max:255',
                Rule::unique('pages', 'slug')->ignore($page?->id),
            ],
            'summary' => ['nullable', 'string'],
        ];
    }
}