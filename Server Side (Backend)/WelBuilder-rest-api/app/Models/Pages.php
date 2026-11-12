<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Override;

class Pages extends Model
{
    protected $table = "pages";

    protected $fillable = [
        'title',
        'summary',
        'slug',
        'user_id',
        'created_at',
        'updated_at'
    ];

    protected $guarded = ['id'];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    #[Override]
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function users() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function sections() {
        return $this->hasMany(PageSections::class, 'page_id')->orderBy('position');
    }
}
