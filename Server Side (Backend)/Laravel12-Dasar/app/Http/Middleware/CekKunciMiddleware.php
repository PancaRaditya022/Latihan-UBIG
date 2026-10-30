<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class CekKunciMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->header('X-Kunci') !== 'ubig2026') {
            return response()->json([
                'message' => 'Kunci salah, kamu ga boleh masuk'
            ], 401);
        }

        return $next($request);
    }
}
