<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use App\Models\Template;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $templates = Template::with('fields')->get();

        return $this->success([
            'templates' => $templates,
        ], 'Get all templates successful', 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Template $template)
    {
        $template->load('fields');

        return $this->success([
            $template,
        ], 'Get template successful', 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Template $template)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Template $template)
    {
        //
    }
}
