<?php

namespace App\Http\Controllers;

use App\Models\Sets;
use App\Models\Courses;
// use Illuminate\Http\Request;
use App\Http\Requests\SetsRequest;
use App\Http\Resources\AddSetsResource;

class SetsController extends Controller
{
    public function store(SetsRequest $request, string $slug) {
        $validated = $request->validated();

        $course = Courses::where('slug', $slug)->firstOrFail();

        $order = Sets::where('course_id', $course->id)->max('order') + 1;

        $sets = Sets::create([
            'course_id' => $course->id,
            'name' => $validated['name'],
            'order' => $order
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Set successfully added',
            'data' => new AddSetsResource($sets)
        ], 201);
    }

    public function destroy(string $slug, int $id) {
        $course = Courses::where('slug', $slug)->first();

        if (!$course) {
            return response()->json([
                'status' => 'not_found',
                'message' => 'Resource not found'
            ], 404);
        }

        $set = Sets::where('id', $id)->first();
        // dd($set);

        if (!$set) {
            return response()->json([
                'status' => 'not_found',
                'message' => 'Resource not found'
            ], 404);
        }

        $set->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Set successfully deleted'
        ], 200);
    }
}
