<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    
    public function postLogin(Request $request)
    {
        $this->validate($request, [
            'user_email' => 'required|email', 'password' => 'required',
        ]);

        $credentials = $request->only('user_email', 'password');

        if ($this->auth->attempt($credentials, $request->has('remember')))
        {
            return redirect()->intended($this->redirectPath());
        }

        return redirect($this->loginPath())
                    ->withInput($request->only('user_email', 'remember'))
                    ->withErrors([
                        'user_email' => $this->getFailedLoginMessage(),
                    ]);
    }    

    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }
}
