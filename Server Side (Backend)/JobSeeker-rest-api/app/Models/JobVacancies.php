<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobVacancies extends Model
{
    protected $table = 'job_vacancies';

    protected $fillable = [
        'job_category_id',
        'company',
        'address',
        'description'
    ];

    public function jobCategory() 
    {
        return $this->belongsTo(JobCategori::class, 'job_category_id', 'id');
    }

    public function availablePositions()
    {
        return $this->hasMany(AvailablePosition::class, 'job_vacancy_id', 'id');
    }
}