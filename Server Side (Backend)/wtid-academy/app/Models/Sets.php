<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sets extends Model
{
    protected $table = 'sets';

    protected $fillable = ['name', 'course_id', 'order', 'created_at', 'updated_at'];

    public function course() {
        return $this->belongsTo(Courses::class, 'course_id', 'id');
    }

    public function lessons()
    {
        return $this->hasMany(Lessons::class, 'set_id');
    }
}
