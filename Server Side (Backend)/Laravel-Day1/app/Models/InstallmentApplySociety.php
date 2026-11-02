<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstallmentApplySociety extends Model
{
    protected $table = 'installment_apply_societies';
    public $timestamps = false;

    protected $fillable = [
        'notes', 'available_month_id', 'date', 'society_id', 'installment_id'
    ];

    public function statusRecord()
    {
        return $this->hasOne(InstallmentApplyStatus::class, 'installment_apply_societies_id', 'id');
    }

    public function availableMonth()
    {
        return $this->belongsTo(AvailableMonth::class, 'available_month_id', 'id');
    }
}
