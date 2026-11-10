<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstallmentApplyStatus extends Model
{
    protected $table = 'installment_apply_status';
    public $timestamps = false;

    protected $fillable = [
        'date', 'society_id', 'installment_id', 'available_month_id', 'installment_apply_societies_id', 'status'
    ];
}
