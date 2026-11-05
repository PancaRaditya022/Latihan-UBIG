<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollments extends Model
{
    protected $table = 'enrollments';

    protected $fillable = ['user_id', 'course_id', 'created_at', 'updated_at'];

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function courses() {
        return $this->belongsTo(Courses::class, 'course_id', 'id');
    }
}
