<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageSections extends Model
{
    protected $table = "page_sections";

    protected $fillable = [
        'name',
        'page_id',
        'template_id',
        'position',
        'created_at',
        'updated_at'
    ];

    public function page()
    {
        return $this->belongsTo(Pages::class, 'page_id');
    }

    public function template()
    {
        return $this->belongsTo(Template::class, 'template_id');
    }

    public function fieldValues()
    {
        return $this->hasMany(SectionFields::class, 'page_section_id');
    }
}
