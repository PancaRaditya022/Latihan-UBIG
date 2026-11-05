<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LessonContents extends Model
{
    protected $table = 'lesson_contents';

    protected $fillable = ['lesson_id', 'type', 'content', 'order', 'created_at', 'updated_at'];

    public function lessons() {
        return $this->belongsTo(Lessons::class, 'lesson_id', 'id');
    }

    public function options() {
        return $this->hasMany(Options::class, 'lesson_content_id');
    }
}
