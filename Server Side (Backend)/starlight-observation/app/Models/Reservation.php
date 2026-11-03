<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $table = 'reservations';

    protected $fillable = ['society_id', 'observatory_slot_id', 'booking_code', 'total_tickets', 'total_price', 'status', 'notes'];

    public $timestamps = false;

    public function society() {
        return $this->belongsTo(Society::class, 'society_id', 'id');
    }

    public function observatory() {
        return $this->belongsTo(Observatory::class, 'observatory_slot_id', 'id');
    }

    public function reservationLogs() {
        return $this->hasMany(ReservationLogs::class, 'reservation_id', 'id');
    }
}
