<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Exceptions\HttpResponseException;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();

        if (!$user) {
            throw new HttpResponseException(response()->json([
                'status'  => 'invalid_token',
                'message' => 'Invalid or expired token',
                // 'errors'  => $validator->errors()
            ], 401));
        }

        if (!$user->tokenCan("role:{$role}")) {
            return response()->json([
                'status' => 'insufficient_permissions',
                'message' => 'Access forbidden'
            ], 403);
        }

        return $next($request);
    }
}
