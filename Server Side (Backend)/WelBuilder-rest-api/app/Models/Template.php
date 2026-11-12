<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Override;

class Template extends Model
{
    protected $table = 'templates';

    protected $fillable = [
        'name',
        'slug',
        'created_at',
        'updated_at'
    ];

    #[Override]
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function fields() {
        return $this->hasMany(TemplateFields::class, 'template_id');
    }
}
