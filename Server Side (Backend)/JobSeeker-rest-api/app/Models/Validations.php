<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Validations extends Model
{
    protected $table = 'validations';

    protected $fillable = [
        'job_category_id',
        'society_id',
        'validator_id',
        'status',
        'work_experience',
        'job_position',
        'reason_accepted',
        'validator_notes'
    ];

    public $timestamps = false;

    public function society() {
        return $this->belongsTo(Society::class, 'society_id', 'id');
    }

    public function validators() {
        return $this->belongsTo(Validators::class, 'validator_id', 'id');
    }

    public function jobCategory() {
        return $this->belongsTo(JobCategori::class, 'job_category_id', 'id');
    }
}
