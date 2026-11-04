<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Spots extends Model
{
    protected $table = 'spots';

    protected $fillable = ['regional_id', 'name', 'address', 'serve', 'capacity'];

    public function spotVaccines() {
        return $this->hasMany(Spots::class, 'spot_id', 'id');
    }

    public function regional() {
        return $this->belongsTo(Regional::class, 'regional_id', 'id');
    }

    public function vaccines() {
        return $this->belongsToMany(Vaccines::class, 'spot_vaccines', 'spot_id', 'vaccine_id');
    }
}
