<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $completedLessonIds = $request->attributes->get('completed_lesson_ids', []);

        $completedLessons = $this->sets
            ->pluck('lessons')
            ->flatten()
            ->filter(function ($lesson) use ($completedLessonIds) {
                return in_array($lesson->id, $completedLessonIds);
            })
            ->values();

        return [
            'course' => [
                'id' => $this->id,
                'name' => $this->name,
                'slug' => $this->slug,
                'description' => $this->description,
                'is_published' => (int) $this->is_published,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ],
            'completed_lessons' => $completedLessons->map(function ($lesson) {
                return [
                    'id' => $lesson->id,
                    'name' => $lesson->name,
                    'order' => (int) $lesson->order,
                ];
            }),
        ];
    }
}
