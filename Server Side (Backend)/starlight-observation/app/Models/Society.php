<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Society extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'societies';

    protected $fillable = ['username', 'name', 'member_type', 'born_date', 'gender', 'address', 'regional_id'];

    protected $hidden = ['password', 'login_tokens'];

    public function regional() {
        return $this->belongsTo(Regional::class, 'regional_id', 'id');
    }

    public function validation() {
        return $this->hasMany(Validation::class, 'validator_id', 'id');
    }

    public function reservation() {
        return $this->hasMany(Reservation::class, 'society_id', 'id');
    }
}
