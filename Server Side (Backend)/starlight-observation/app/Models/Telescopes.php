<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Telescopes extends Model
{
    protected $table = 'telescopes';

    protected $fillable = ['name', 'type', 'description'];

    public function obsevatory() {
        $this->hasMany(Observatory::class, 'telescope_id', 'id');
    }
}
