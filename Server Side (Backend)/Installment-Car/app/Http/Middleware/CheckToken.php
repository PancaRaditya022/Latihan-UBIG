<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Societies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckToken
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->query('token') ?? $request->bearerToken();

        if (!$token) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $societies = Societies::where('login_tokens', $token)->first();

        if (!$societies) {
            return response()->json([
                'message' => 'Unauthorized user',
            ], 401);
        }

        Auth::setUser($societies);
        Auth::guard('api')->setUser($societies);

        return $next($request);
    }
}
