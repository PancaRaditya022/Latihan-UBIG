<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TemplateFields extends Model
{
    protected $table = 'template_fields';

    protected $fillable = [
        'name',
        'type',
        'template_id',
        'created_at',
        'updated_at'
    ];

    protected $guarded = ['id'];

    public function templates() {
        return $this->belongsTo(Template::class, 'template_id');
    }
}
