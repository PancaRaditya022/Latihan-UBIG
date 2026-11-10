<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Society extends Authenticatable
{
    protected $table = 'societies';

    protected $fillable = ['id_card_number', 'name', 'born_date', 'gender', 'address', 'regional_id', 'login_tokens'];

    protected $hidden = ['password', 'login_tokens'];

    public $timestamps = false;

    public function regional() {
        return $this->belongsTo(Regional::class, 'regional_id', 'id');
    }

    public function consultation() {
        return $this->belongsTo(Consultation::class, 'society_id', 'id');
    }
}
