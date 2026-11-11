<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplyPosition extends Model
{
    protected $table = 'job_apply_positions';

    protected $fillable = [
        'date',
        'society_id',
        'job_vacancy_id',
        'position_id',
        'job_apply_societies_id',
        'status'
    ];

    public $timestamps = false;

    public function society() {
        return $this->belongsTo(Society::class, 'society_id', 'id');
    }

    public function jobVacancies() {
        return $this->belongsToMany(JobVacancies::class, 'job_vacancy_id', 'id');
    }

    public function availablePosition() {
        return $this->belongsTo(AvailablePosition::class, 'position_id');
    }

    public function jobApplySociety() {
        return $this->belongsTo(JobApplySociety::class, 'job_apply_societies_id');
    }
}
