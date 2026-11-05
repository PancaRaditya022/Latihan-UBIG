<?php

namespace App\Http\Controllers;

use App\Models\Lessons;
use App\Models\Options;
use Illuminate\Http\Request;
use App\Models\LessonContents;
use App\Models\CompleteLessons;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\LessonRequest;
use App\Http\Resources\AddLesonResource;
use App\Http\Requests\CheckLessonRequest;

class LessonController extends Controller
{
    public function store(LessonRequest $request)
    {
        $validated = $request->validated();

        $lesson = DB::transaction(function () use ($validated) {
            $maxOrder = Lessons::where('set_id', $validated['set_id'])->max('order');
            $nextOrder = is_null($maxOrder) ? 0 : $maxOrder + 1;

            $lesson = Lessons::create([
                'name' => $validated['name'],
                'set_id' => $validated['set_id'],
                'order' => $nextOrder,
            ]);

            foreach ($validated['contents'] as $contentIndex => $contentData) {
                $content = LessonContents::create([
                    'lesson_id' => $lesson->id,
                    'type' => $contentData['type'],
                    'content' => $contentData['content'],
                    'order' => $contentIndex,
                ]);

                if ($contentData['type'] === 'quiz' && isset($contentData['options'])) {
                    foreach ($contentData['options'] as $optionData) {
                        Options::create([
                            'lesson_content_id' => $content->id,
                            'option_text' => $optionData['option_text'],
                            'is_correct' => $optionData['is_correct'],
                        ]);
                    }
                }
            }

            return $lesson;
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Lesson successfully added',
            'data' => new AddLesonResource($lesson)
        ], 201);
    }

    public function destroy(int $id) {
        $lesson = Lessons::where('id', $id)->first();

        if(!$lesson) {
            return response()->json([
                'status' => 'not_found',
                'message' => 'Resource not found'
            ], 404);
        }

        $lesson->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Lesson successfully deleted'
        ], 200);
    }

        public function checkAnswer(CheckLessonRequest $request, int $id, int $content_id)
    {
        $validated = $request->validated();

        $content = LessonContents::where('id', $content_id)
            ->where('lesson_id', $id)
            ->first();

        if (!$content) {
            return response()->json([
                'status' => 'not_found',
                'message' => 'Resource not found'
            ], 404);
        }

        if ($content->type !== 'quiz') {
            return response()->json([
                'status' => 'error',
                'message' => 'Only for quiz content'
            ], 400);
        }

        $selectedOption = Options::where('id', $validated['option_id'])
            ->where('lesson_content_id', $content->id)
            ->first();

        if (!$selectedOption) {
            return response()->json([
                'status' => 'not_found',
                'message' => 'Resource not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Check answer success',
            'data' => [
                'question' => $content->content,
                'user_answer' => $selectedOption->option_text,
                'is_correct' => (bool) $selectedOption->is_correct
            ]
        ], 200);
    }

    public function update(Request $request, int $id) {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'status' => 'invalid_token',
                'message' => 'Invalid or expired token'
            ], 401);
        }

        $lesson = Lessons::find($id);

        if (!$lesson) {
            return response()->json([
                'status' => 'not_found',
                'message' => 'Resource not found'
            ], 404);
        }

        CompleteLessons::firstOrCreate([
            'user_id' => $user->id,
            'lesson_id' => $id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Lesson successfully completed'
        ], 200);
    }
}
