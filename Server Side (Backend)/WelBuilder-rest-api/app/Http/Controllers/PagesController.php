<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use App\Http\Requests\StorePagesRequest;
use App\Http\Requests\UpdatePagesRequest;
use App\Http\Resources\PageSectionResource;
use App\Models\Pages;
use Illuminate\Http\Request;

class PagesController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $pages = $request->user()->pages()->latest()->get();
        
        return $this->success($pages, 'Get all pages successful', 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePagesRequest $request)
    {
        $pages = $request->user()->pages()->create($request->validated());
        // dd($pages);

        return $this->success($pages, 'Page created successful', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $slug)
    {
        $page = Pages::where('slug', $slug)
            ->with(['sections.template.fields', 'sections.fieldValues'])
            ->first();

        if (!$page) {
            return $this->error('Not found', 404);
        }

        if ((int) $page->user_id !== (int) $request->user()->id) {
            return $this->error('Forbidden access', 403);
        }

        return $this->success([
            'id'         => $page->id,
            'user_id'    => $page->user_id,
            'title'      => $page->title,
            'slug'       => $page->slug,
            'summary'    => $page->summary,
            'sections'   => PageSectionResource::collection($page->sections),
            'created_at' => $page->created_at,
            'updated_at' => $page->updated_at,
        ], 'Get page successful', 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePagesRequest $request, string $slug)
    {
        $pages = $request->user()->pages()->where('slug', $slug)->firstOrFail();
        
        $pages->update($request->validated());

        return $this->success($pages, 'Page updated successful', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $pageSlug)
    {
        $page = Pages::where('slug', $pageSlug)->first();

        // dd($page);

        if (!$page) {
            return $this->error('Not found', 404);
        }

        if ((int) $page->user_id !== (int) $request->user()->id) {
            return $this->error('Forbidden access', 403);
        }

        $page->delete();

        return $this->success(null, 'Page deleted successful', 200);
    }
}
