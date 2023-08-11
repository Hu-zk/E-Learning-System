<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;

class TestController extends Controller
{
    //
    function test(){

        return response()->json([
            'data' => Auth::user()
        ]);
    }
}
