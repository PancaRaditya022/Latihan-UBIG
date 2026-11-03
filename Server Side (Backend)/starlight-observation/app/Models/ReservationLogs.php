<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservationLogs extends Model
{
    protected $table = 'reservation_logs';

    protected $fillable = ['reservation_id', 'action', 'notes', 'created_at'];

    public function reservation() {
        return $this->belongsTo(Reservation::class, 'reservation_id', 'id');
    }
}
