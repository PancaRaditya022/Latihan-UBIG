<?php

namespace App\Http\Middleware;

use App\Models\Akun;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class CekTokenMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        $akun = $token ? Akun::where('login_token', $token)->first() : null;

        if (!$akun) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }
        $request->setUserResolver(fn () => $akun);

        return $next($request);
    }
}
