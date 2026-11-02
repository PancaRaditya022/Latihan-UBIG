<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Validators extends Model
{
    protected $table = 'validators';

    public $timestamps = false;

    protected $fillable = ['user_id', 'role', 'name'];
}
