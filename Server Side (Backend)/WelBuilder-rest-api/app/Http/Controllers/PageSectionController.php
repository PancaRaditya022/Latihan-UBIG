<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReorderSectionsRequest;
use App\Http\Requests\StoreSectionRequest;
use App\Http\Requests\UpdateSectionFieldsRequest;
use App\Http\Resources\PageSectionResource;
use App\Models\Pages;
use App\Models\PageSection;
use App\ApiResponse;
use App\Http\Requests\ReorderSectionRequest;
use App\Http\Requests\StorePageSectionRequest;
use App\Http\Requests\UpdatePageSectionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PageSectionController extends Controller
{
    use ApiResponse;

    private function findOwnedPage(Request $request, string $slug)
    {
        $page = Pages::where('slug', $slug)->first();

        if (!$page) {
            return ['error' => $this->error('Not found', 404)];
        }

        if ((int) $page->user_id !== (int) $request->user()->id) {
            return ['error' => $this->error('Forbidden access', 403)];
        }

        return ['page' => $page];
    }

    public function store(StorePageSectionRequest $request, string $slug)
    {
        $check = $this->findOwnedPage($request, $slug);
        if (isset($check['error'])) return $check['error'];
        $page = $check['page'];

        $section = DB::transaction(function () use ($request, $page) {
            $newSection = $page->sections()->create([
                'template_id' => $request->template_id,
                'position'    => $request->position,
                'name'        => $request->name
            ]);

            $newSection->load('template.fields');
            foreach ($newSection->template->fields as $field) {
                $newSection->fieldValues()->create([
                    'template_field_id' => $field->id,
                    'value'             => null,
                ]);
            }

            return $newSection->load(['template.fields', 'fieldValues']);
        });

        return $this->success(
            new PageSectionResource($section),
            'Section added successful',
            201
        );
    }

    public function update(UpdatePageSectionRequest $request, string $slug, int $sectionId)
    {
        $check = $this->findOwnedPage($request, $slug);
        if (isset($check['error'])) return $check['error'];
        $page = $check['page'];

        $section = $page->sections()->where('id', $sectionId)->first();
        if (!$section) {
            return $this->error('Not found', 404);
        }

        DB::transaction(function () use ($request, $section) {
            foreach ($request->fields as $item) {
                $section->fieldValues()->updateOrCreate(
                    ['template_field_id' => $item['field_id']],
                    ['value' => $item['value']]
                );
            }
        });

        $section->load(['template.fields', 'fieldValues']);
        $section->unsetRelation('template');
        $section->load('template.fields');

        return $this->success(
            new PageSectionResource($section),
            'Section fields updated successful',
            200
        );
    }

    public function reorder(ReorderSectionRequest $request, string $slug)
    {
        $check = $this->findOwnedPage($request, $slug);
        if (isset($check['error'])) return $check['error'];
        $page = $check['page'];

        $sectionIds = $request->validated()['section_ids'];

        $validCount = $page->sections()->whereIn('id', $sectionIds)->count();
        if ($validCount !== count($sectionIds)) {
            return $this->error('Not found', 404);
        }

        DB::transaction(function () use ($sectionIds, $page) {
            foreach ($sectionIds as $index => $sectionId) {
                $page->sections()
                    ->where('id', $sectionId)
                    ->update(['position' => $index + 1]);
            }
        });

        return $this->success(null, 'Sections reordered successful', 200);
    }

    public function destroy(Request $request, string $slug, int $sectionId)
    {
        $check = $this->findOwnedPage($request, $slug);
        if (isset($check['error'])) return $check['error'];
        $page = $check['page'];

        $section = $page->sections()->where('id', $sectionId)->first();
        if (!$section) {
            return $this->error('Not found', 404);
        }

        $section->delete();

        return $this->success(null, 'Section removed successful', 200);
    }
}