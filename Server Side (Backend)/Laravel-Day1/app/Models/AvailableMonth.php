<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AvailableMonth extends Model
{
    protected $table = 'available_month';

    public $timestamps = false;

    protected $fillable = ['installment_id', 'month', 'description', 'nominal'];
}
