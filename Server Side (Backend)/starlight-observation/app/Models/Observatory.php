<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Observatory extends Model
{
    protected $table = 'observatory_slots';

    protected $hidden = ['description'];

    protected $fillable = ['telescope_id', 'event_name', 'event_date', 'price_per_slot', 'max_capacity', 'booked_count', 'description'];

    public $timestamps = false;

    public function telescope() {
        return $this->belongsTo(Telescopes::class, 'telescope_id', 'id');
    }

    public function reservation() {
        return $this->hasMany(Reservation::class, 'observatory_slot_id', 'id');
    }
}
