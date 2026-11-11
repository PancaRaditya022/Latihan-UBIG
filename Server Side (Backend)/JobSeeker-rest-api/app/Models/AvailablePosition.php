<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AvailablePosition extends Model
{
    protected $table = 'available_positions';

    protected $fillable = [
        'job_vacancy_id',
        'position',
        'capacity',
        'apply_capacity'
    ];

    public function jobVacancy()
    {
        return $this->belongsTo(JobVacancies::class, 'job_vacancy_id', 'id');
    }
}