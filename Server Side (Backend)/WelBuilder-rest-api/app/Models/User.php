<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Override;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = "users";

    protected $guarded = ['id'];

    protected $fillable = [
        'name',
        'email',
        'email_verified_at',
        'password',
        'remember_token',
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    public function pages() {
        return $this->hasOne(Pages::class);
    }

    #[Override]
    protected function casts()
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed'
        ];
    }
}
