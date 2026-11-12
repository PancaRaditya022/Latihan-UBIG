<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SectionFields extends Model
{
    protected $table = "section_field_values";

    protected $fillable = [
        'page_section_id',
        'template_field_id',
        'value',
        'created_at',
        'updated_at'
    ];

    public function pageSection()
    {
        return $this->belongsTo(PageSections::class, 'page_section_id');
    }

    public function templateField()
    {
        return $this->belongsTo(TemplateFields::class, 'template_field_id');
    }
}
