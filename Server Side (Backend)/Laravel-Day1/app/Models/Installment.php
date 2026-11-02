<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Installment extends Model
{
    protected $table = 'installment';

    public $timestamps = false;

    protected $fillable = ['brand_id', 'cars', 'description', 'price'];

    public function brand() {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
    }

    public function availableMonths() {
        return $this->hasMany(AvailableMonth::class, 'installment_id', 'id');
    }

    public function applications() {
        return $this->hasMany(InstallmentApplySociety::class, 'installment_id', 'id');
    }
}
