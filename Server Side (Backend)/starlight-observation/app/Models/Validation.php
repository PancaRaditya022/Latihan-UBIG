<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Validation extends Model
{
    protected $table = 'validations';

    protected $fillable = ['society_id', 'validator_id', 'status', 'institution', 'occupation', 'reason_accepted', 'validator_notes'];

    public $timestamps = false;

    public function society() {
        return $this->belongsTo(Society::class, 'society_id', 'id');
    }

    public function validator() {
        return $this->belongsTo(Validators::class, 'validator_id', 'id');
    }
}
