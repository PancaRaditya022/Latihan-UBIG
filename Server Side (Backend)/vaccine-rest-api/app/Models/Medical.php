<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medical extends Model
{
    protected $table = 'medicals';

    protected $fillable = ['spot_id', 'user_id', 'role', 'role', 'name'];

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function spots() {
        return $this->belongsTo(Spots::class, 'spot_id', 'id');
    }
}
