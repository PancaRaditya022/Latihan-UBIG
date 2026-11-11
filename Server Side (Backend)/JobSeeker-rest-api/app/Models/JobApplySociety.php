<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplySociety extends Model
{
    protected $table = 'job_apply_societies';

    protected $fillable = [
        'notes',
        'date',
        'society_id',
        'job_vacancy_id'
    ];
    
    public $timestamps = false;

    public function society() {
        return $this->belongsTo(Society::class, 'society_id', 'id');
    }

    public function jobVacancy() {
        return $this->belongsTo(JobVacancies::class, 'job_vacancy_id', 'id');
    }

    public function positions() {
        return $this->hasMany(JobApplyPosition::class, 'job_apply_societies_id');
    }
}
