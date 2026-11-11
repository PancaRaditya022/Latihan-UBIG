<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobCategori extends Model
{
    protected $table = 'job_categories';

    protected $fillable = [
        'job_category'
    ];

    public function jobVacancies()
    {
        return $this->hasMany(JobVacancies::class, 'job_category_id', 'id');
    }
}