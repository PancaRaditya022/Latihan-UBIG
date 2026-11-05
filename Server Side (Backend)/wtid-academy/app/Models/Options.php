<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Options extends Model
{
    protected $table = 'options';

    protected $fillable = ['lesson_content_id', 'option_text', 'is_correct', 'created_at', 'updated_at'];

    public function lessonContents() {
        return $this->belongsTo(LessonContents::class, 'lesson_content_id', 'id');
    }
}
