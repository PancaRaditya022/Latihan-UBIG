<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompleteLessons extends Model
{
    protected $table = 'completed_lessons';

    protected $fillable = ['user_id', 'lesson_id', 'created_at', 'updated_at'];

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function lessons() {
        return $this->belongsTo(Lessons::class, 'lesson_id', 'id');
    }
}
