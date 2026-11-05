<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\Enrollments;
use Illuminate\Http\Request;
// use Illuminate\Http\Request;
use App\Http\Requests\CourseRequest;
use App\Http\Resources\CoursesResource;
use App\Http\Resources\GetCourseResource;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\GetDetailsCourseResource;
use App\Http\Resources\UpdateCourseResource;

class CourseController extends Controller
{
    public function store(CourseRequest $request) {
        $validated = $request->validated();

        $course = Courses::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'slug' => $validated['slug']
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Course successfully added',
            'data' => new CoursesResource($course)
        ], 201);
    }

    public function update(UpdateCourseRequest $request, string $slug) {
        $validated = $request->validated();

        $course = Courses::where('slug', $slug)->first();

        if(!$course) {
            return response()->json([
                'status' => 'not_found',
                'message' => 'Resource not found'
            ], 404);
        }

        $course->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Course successfully updated',
            'data' => new UpdateCourseResource($course)
        ], 200);
    }

    public function destroy(string $slug) {
        $course = Courses::where('slug', $slug)->first();

        if(!$course) {
            return response()->json([
                'status' => 'not_found',
                'message' => 'Resource not found'
            ], 404);
        }

        // dd($course);

        $course->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Course successfully deleted'
        ], 200);
    }

    public function index() {
        $course = Courses::where('is_published', true)->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Courses retrieved successfully',
            'data' => [
                'courses' => GetCourseResource::collection($course)
            ]
        ]);
    }

    public function show(string $slug) {
        $course = Courses::where('slug', $slug)
            ->with(['sets.lessons.contents.options'])
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'message' => 'Course details retrieved successfully',
            'data' => new GetDetailsCourseResource($course)
        ], 200);
    }

    public function register(Request $request, string $slug)
    {
        $course = Courses::where('slug', $slug)->first();

        if (!$course) {
            return response()->json([
                'status' => 'not_found',
                'message' => 'Resource not found'
            ], 404);
        }

        $userId = $request->user()->id;

        $isRegistered = Enrollments::where('user_id', $userId)
            ->where('course_id', $course->id)
            ->exists();

        if ($isRegistered) {
            return response()->json([
                'status' => 'error',
                'message' => 'The user is already registered for this course'
            ], 400);
        }

        Enrollments::create([
            'user_id' => $userId,
            'course_id' => $course->id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User registered successful'
        ], 201);
    }
}
