<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    protected $table = 'courses';

    protected $fillable = ['name', 'slug', 'description', 'is_published', 'created_at', 'updated_at'];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function enrollments() {
        return $this->hasMany(Enrollments::class, 'course_id', 'id');
    }

    public function sets() {
        return $this->hasMany(Sets::class, 'course_id');
    }
}
