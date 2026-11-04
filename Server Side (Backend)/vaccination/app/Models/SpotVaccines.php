<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpotVaccines extends Model
{
    protected $table = 'spot_vaccines';

    protected $fillable = ['spot_id', 'vaccine_id'];

    public function spots() {
        return $this->belongsTo(Spots::class, 'spot_id', 'id');
    }

    public function vaccines() {
        return $this->belongsTo(Vaccines::class, 'vaccine_id');
    }
}
