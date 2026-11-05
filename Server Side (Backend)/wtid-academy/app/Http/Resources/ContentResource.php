<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'type' => $this->type,
            'content' => $this->content,
            'order' => (int) $this->order,
        ];

        if ($this->type === 'quiz') {
            $data['options'] = OptionResource::collection($this->whenLoaded('options') ?? []);
        }

        return $data;
    }
}
