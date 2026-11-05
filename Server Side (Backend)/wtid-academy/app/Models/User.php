<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'users';

    protected $fillable = ['full_name', 'username', 'password', 'remember_token', 'created_at', 'updated_at'];

    protected $hidden = ['password', 'remember_token'];

    public function courses() {
        return $this->belongsToMany(Courses::class, 'enrollments', 'user_id', 'course_id');
    }

    public function completedLessons() {
        return $this->belongsToMany(Lessons::class, 'completed_lessons', 'user_id', 'lesson_id');
    }
}
