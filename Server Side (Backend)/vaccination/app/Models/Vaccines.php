<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vaccines extends Model
{
    protected $table = 'vaccines';

    protected $fillable = ['name'];

    public function spotVaccines() {
        return $this->hasMany(SpotVaccines::class, 'vaccine_id', 'id');
    }

    public function vaccinations() {
        return $this->hasMany(Vaccinations::class, 'vaccine_id', 'id');
    }
}
