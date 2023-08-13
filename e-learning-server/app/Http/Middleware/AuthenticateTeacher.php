<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateTeacher
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        $type =  $user->user_type_id;

        if ($type == 2) {
            return $next($request);
        }

        return redirect()->route("unauthorized");
    }
}
