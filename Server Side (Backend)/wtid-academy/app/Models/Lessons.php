<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lessons extends Model
{
    protected $table = 'lessons';

    protected $fillable = ['set_id', 'name', 'order', 'created_at', 'updated_at'];

    public function sets() {
        return $this->belongsTo(Sets::class, 'set_id', 'id');
    }

    public function contents() {
        return $this->hasMany(LessonContents::class, 'lesson_id');
    }

    public function lessons() {
        return $this->hasMany(Lessons::class, 'set_id');
    }
}
