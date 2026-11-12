<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageSectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $valueMap = $this->fieldValues->pluck('value', 'template_field_id');

        $data = [
            'id' => $this->id,
            'page_id' => $this->page_id,
            'template_id' => $this->template_id,
            'position' => $this->position
        ];

        if ($this->relationLoaded('template') && $this->template) {
            $data['template'] = [
                'id' => $this->template->id,
                'name' => $this->template->name,
                'slug' => $this->template->slug
            ];
        }

        $data['fields'] = $this->template->fields->map(function ($field) use ($valueMap) {
            return [
                'id' => $field->id,
                'name' => $field->name,
                'slug' => $field->slug,
                'type' => $field->type,
                'value' => $valueMap[$field->id] ?? null
                
            ];
        });

        $data['created_at'] = $this->created_at;
        $data['updated_at'] = $this->updated_at;

        return $data;
    }
}
