<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $completedLessonIds = $user->completedLessons()->pluck('lessons.id')->toArray();

        $request->attributes->set('completed_lesson_ids', $completedLessonIds);

        $courses = $user->courses()->with('sets.lessons')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'User progress retrieved successfully',
            'data' => [
                'progress' => UserResource::collection($courses)
            ]
        ], 200);
    }
}
