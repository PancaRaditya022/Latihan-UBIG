<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Validation extends Model
{
    protected $table = 'validations';

    public $timestamps = false;

    protected $fillable = ['society_id', 'validator_id', 'status', 'job', 'job_description', 'income', 'reason_accepted', 'validator_notes'];

    public function validator() {
        return $this->belongsTo(Validators::class, 'validator_id', 'id');
    }
}
