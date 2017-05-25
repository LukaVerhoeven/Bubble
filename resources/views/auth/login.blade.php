<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="{{URL::asset('/img/bubble-icon.png')}}">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Bubble') }}</title>

    <!-- Styles -->
    <link href="/css/all.css" rel="stylesheet" type="text/css">
    <!-- Scripts -->
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>
</head>
<body>
    <div id="bubble" class="red darken-1">
        <div id="login-page" class="v-align">

            <div class="row">
                <div class="logo">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         width="375.667px" height="99px" viewBox="0 0 375.667 99" enable-background="new 0 0 375.667 99" xml:space="preserve">
                    <g>
                        <path fill="#FFFFFF" d="M75.944,30.43h19.705v34.456c0,2.746,0.529,4.722,1.586,5.928c1.057,1.206,2.625,1.809,4.703,1.809
                            c2.115,0,3.942-0.426,5.482-1.28c1.54-0.853,2.83-2.022,3.869-3.506c1.038-1.484,1.809-3.208,2.31-5.176
                            c0.501-1.967,0.751-4.044,0.751-6.234V30.43h19.705v58.724h-18.925v-5.121c0-0.481,0.008-0.946,0.027-1.392
                            c0.019-0.445,0.046-0.835,0.083-1.169c0.037-0.408,0.074-0.779,0.112-1.113h-0.223c-0.78,1.559-1.81,2.97-3.089,4.23
                            c-1.28,1.262-2.719,2.338-4.314,3.229c-1.596,0.891-3.322,1.567-5.176,2.032c-1.856,0.463-3.768,0.695-5.734,0.695
                            c-2.894,0-5.613-0.371-8.154-1.113c-2.542-0.742-4.759-1.977-6.651-3.701c-1.893-1.727-3.377-3.999-4.453-6.819
                            c-1.077-2.819-1.614-6.29-1.614-10.409V30.43z"/>
                        <path fill="#FFFFFF" d="M145.79,7.664h19.704v22.655c0,0.743-0.01,1.419-0.028,2.031c-0.02,0.612-0.047,1.142-0.084,1.587
                            c-0.038,0.52-0.074,0.984-0.111,1.391h0.223c1.15-1.149,2.505-2.188,4.063-3.117c1.336-0.779,2.986-1.494,4.954-2.142
                            c1.967-0.649,4.249-0.975,6.846-0.975c4.008,0,7.635,0.751,10.882,2.254s6.021,3.6,8.322,6.29c2.3,2.691,4.082,5.928,5.343,9.713
                            c1.261,3.785,1.893,7.959,1.893,12.524c0,4.64-0.696,8.841-2.087,12.607c-1.391,3.768-3.303,6.986-5.733,9.658
                            c-2.431,2.672-5.315,4.741-8.655,6.206c-3.34,1.466-6.958,2.199-10.854,2.199c-2.747,0-5.121-0.334-7.125-1.002
                            c-2.003-0.668-3.674-1.428-5.01-2.282c-1.559-0.965-2.876-2.078-3.952-3.339h-0.223c0,0.259,0.019,0.575,0.056,0.945
                            c0,0.298,0.009,0.65,0.028,1.058c0.018,0.409,0.027,0.835,0.027,1.28v1.948H145.79V7.664z M164.937,60.209
                            c0,1.781,0.241,3.506,0.724,5.176c0.482,1.671,1.196,3.165,2.143,4.482c0.947,1.318,2.143,2.375,3.591,3.172
                            c1.447,0.799,3.135,1.196,5.065,1.196c1.559,0,3.034-0.306,4.425-0.918s2.616-1.512,3.674-2.699
                            c1.058-1.188,1.892-2.653,2.504-4.398c0.613-1.744,0.918-3.748,0.918-6.011c0-2.189-0.278-4.175-0.834-5.956
                            c-0.557-1.781-1.346-3.302-2.366-4.564c-1.021-1.261-2.236-2.235-3.646-2.922c-1.411-0.687-2.969-1.03-4.675-1.03
                            c-1.484,0-2.922,0.279-4.313,0.835c-1.392,0.557-2.617,1.42-3.674,2.589c-1.057,1.168-1.912,2.672-2.56,4.508
                            C165.262,55.506,164.937,57.686,164.937,60.209z"/>
                        <path fill="#FFFFFF" d="M215.579,7.664h19.704v22.655c0,0.743-0.01,1.419-0.028,2.031c-0.02,0.612-0.047,1.142-0.084,1.587
                            c-0.037,0.52-0.074,0.984-0.111,1.391h0.223c1.15-1.149,2.505-2.188,4.063-3.117c1.336-0.779,2.986-1.494,4.954-2.142
                            c1.967-0.649,4.249-0.975,6.846-0.975c4.008,0,7.635,0.751,10.882,2.254c3.247,1.503,6.021,3.6,8.322,6.29
                            c2.3,2.691,4.082,5.928,5.343,9.713c1.261,3.785,1.893,7.959,1.893,12.524c0,4.64-0.696,8.841-2.087,12.607
                            c-1.391,3.768-3.303,6.986-5.733,9.658c-2.431,2.672-5.316,4.741-8.656,6.206c-3.34,1.466-6.958,2.199-10.854,2.199
                            c-2.747,0-5.121-0.334-7.125-1.002c-2.003-0.668-3.674-1.428-5.01-2.282c-1.559-0.965-2.876-2.078-3.952-3.339h-0.223
                            c0,0.259,0.019,0.575,0.056,0.945c0,0.298,0.009,0.65,0.028,1.058c0.019,0.409,0.027,0.835,0.027,1.28v1.948h-18.479V7.664z
                             M234.726,60.209c0,1.781,0.241,3.506,0.724,5.176c0.482,1.671,1.196,3.165,2.143,4.482c0.947,1.318,2.143,2.375,3.591,3.172
                            c1.447,0.799,3.135,1.196,5.065,1.196c1.559,0,3.034-0.306,4.425-0.918s2.616-1.512,3.674-2.699
                            c1.058-1.188,1.892-2.653,2.504-4.398c0.613-1.744,0.918-3.748,0.918-6.011c0-2.189-0.278-4.175-0.834-5.956
                            c-0.557-1.781-1.346-3.302-2.366-4.564c-1.021-1.261-2.236-2.235-3.646-2.922c-1.411-0.687-2.969-1.03-4.675-1.03
                            c-1.484,0-2.922,0.279-4.313,0.835c-1.392,0.557-2.617,1.42-3.674,2.589c-1.057,1.168-1.912,2.672-2.56,4.508
                            C235.051,55.506,234.726,57.686,234.726,60.209z"/>
                        <path fill="#FFFFFF" d="M284.589,7.664h19.704v57.222c0,1.41,0.074,2.588,0.223,3.534c0.148,0.946,0.427,1.717,0.836,2.311
                            c0.407,0.594,0.964,1.021,1.669,1.279c0.705,0.261,1.614,0.391,2.728,0.391c0.297,0,0.594,0,0.891,0s0.558-0.019,0.78-0.056
                            c0.259,0,0.5-0.019,0.723-0.057v17.089c-0.557,0.074-1.15,0.129-1.781,0.167c-0.521,0.074-1.141,0.12-1.864,0.139
                            s-1.476,0.028-2.254,0.028c-1.745,0-3.498-0.093-5.261-0.278c-1.763-0.187-3.442-0.557-5.037-1.114
                            c-1.597-0.556-3.089-1.336-4.48-2.337c-1.393-1.002-2.599-2.328-3.618-3.979c-1.021-1.651-1.819-3.665-2.394-6.039
                            c-0.576-2.375-0.863-5.195-0.863-8.461V7.664z"/>
                        <path fill="#FFFFFF" d="M315.136,59.764c0-4.305,0.705-8.322,2.115-12.051c1.41-3.729,3.432-6.977,6.067-9.741
                            c2.635-2.764,5.835-4.935,9.602-6.513c3.767-1.576,8.024-2.366,12.774-2.366c4.342,0,8.191,0.715,11.551,2.143
                            c3.357,1.429,6.196,3.405,8.516,5.929c2.318,2.523,4.081,5.52,5.288,8.989c1.206,3.47,1.81,7.245,1.81,11.327
                            c0,0.482-0.028,1.077-0.084,1.781c-0.056,0.705-0.121,1.373-0.194,2.004c-0.075,0.743-0.149,1.521-0.223,2.337h-37.017
                            c0.371,1.781,0.993,3.341,1.865,4.676c0.872,1.336,1.921,2.431,3.145,3.284c1.226,0.854,2.589,1.495,4.092,1.921
                            c1.503,0.427,3.033,0.64,4.593,0.64c2.114,0,4.137-0.307,6.066-0.918c1.93-0.612,3.654-1.289,5.177-2.031
                            c1.781-0.891,3.413-1.893,4.898-3.006l7.291,13.804c-1.93,1.634-4.155,3.062-6.679,4.286c-2.19,1.076-4.815,2.059-7.876,2.95
                            c-3.063,0.891-6.56,1.336-10.493,1.336c-5.232,0-9.861-0.873-13.888-2.616c-4.026-1.744-7.403-4.054-10.13-6.93
                            c-2.729-2.875-4.788-6.159-6.179-9.853C315.832,67.455,315.136,63.661,315.136,59.764z M352.986,52.305
                            c0-1.113-0.186-2.171-0.557-3.173c-0.371-1.001-0.891-1.892-1.559-2.671c-0.668-0.78-1.484-1.4-2.449-1.865
                            c-0.966-0.464-2.022-0.696-3.173-0.696c-1.411,0-2.653,0.242-3.729,0.724c-1.076,0.483-1.995,1.113-2.755,1.893
                            c-0.761,0.779-1.383,1.669-1.864,2.672c-0.482,1.002-0.854,2.041-1.113,3.117H352.986z"/>
                    </g>
                    <path fill="#FFFFFF" d="M55.526,46.518V46.29c4.218-2.28,9.462-8.208,9.462-17.328c0-14.022-11.399-21.317-27.702-21.317H1.604v17.1
                        h7.41v56.088c0,0.017,0.001,0.031,0.001,0.047v8.275h8.32h5.803h14.147c16.188,0,31.008-6.498,31.008-24.282
                        C68.294,57.689,64.875,49.368,55.526,46.518z M29.42,24.744h7.752c5.13,0,7.296,3.192,7.296,6.954c0,3.876-2.166,7.525-6.954,7.525
                        H29.42V24.744z M39.225,72.054h-7.296c-1.596,0-2.508-0.913-2.508-2.509V55.182h9.918c5.472,0,7.98,3.762,7.98,8.322
                        S44.696,72.054,39.225,72.054z"/>
                    </svg>
                </div>
                <div class="col-md-8 col-md-offset-2 form-container">
                    <div class="form-box">
                        <nav class="nav-extended">
                            <ul class="tabs tabs-transparent">
                                <li class="tab col s6 white"><a class="red-text text-darken-4 active"href="#login">Login</a></li>
                                <li class="tab col s6 white"><a class="red-text text-darken-4" href="#register">Register</a></li>
                            </ul>
                        </nav>
                        <div class="panel panel-default" id="login">
                            <div class="panel-body">
                                <form class="form-horizontal" role="form" method="POST" action="{{ route('login') }}">
                                    {{ csrf_field() }}

                                    <div class="input-field col s12{{ $errors->has('email') ? ' has-error' : '' }}">
                                        <input id="email" type="email" maxlength="100" class="validate" name="email" value="{{ old('email') }}" required autofocus>
                                        <label for="email">E-Mail Address</label>
                                        @if ($errors->has('email'))
                                            <span class="help-block">
                                                <strong>{{ $errors->getBag('login')->first('email') }}</strong>
                                            </span>
                                        @endif
                                    </div>

                                    <div class="input-field col s12{{ $errors->has('password') ? ' has-error' : '' }}">
                                        <input id="password" type="password" maxlength="100" class="validate" name="password" required>
                                        <label for="password">Password</label>
                                        @if ($errors->has('password'))
                                            <span class="help-block">
                                                <strong>{{ $errors->first('password') }}</strong>
                                            </span>
                                        @endif
                                    </div>

                       <!--              <div class="input-field col s12">
                                        <div class="col-md-6 col-md-offset-4">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                                                </label>
                                            </div>
                                        </div>
                                    </div> -->

                                    <div class="input-field col s12">
                                        <button type="submit" class="btn waves-effect waves-light col s12">
                                            Login
                                        </button>

                                         <!--    <a class="btn btn-link" href="{{ route('password.request') }}">
                                                Forgot Your Password?
                                            </a> -->
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="panel panel-default" id="register">
                            <div class="panel-body">
                                <form class="form-horizontal" role="form" method="POST" action="{{ route('register') }}">
                                    {{ csrf_field() }}

                                    <div class="input-field col s12{{ $errors->has('name') ? ' has-error' : '' }}">
                                        <input id="name" type="text" class="validate" name="name" value="{{ old('name') }}" maxlength="100" required>
                                        <label for="name">Name</label>
                                        @if ($errors->has('name'))
                                            <span class="help-block">
                                                <strong>{{ $errors->first('name') }}</strong>
                                            </span>
                                        @endif
                                    </div>

                                    <div class="input-field col s12{{ $errors->has('email') ? ' has-error' : '' }}">
                                        <input id="register-email" maxlength="100" type="email" class="validate" name="email" value="{{ old('email') }}" required>
                                        <label for="register-email" data-error="this is not a valid e-mail" data-success="valid e-mail">E-Mail Address</label>
                                        @if ($errors->has('email'))
                                            <span class="help-block">
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </span>
                                        @endif
                                    </div>

                                    <div class="input-field col s12{{ $errors->has('password') ? ' has-error' : '' }}">
                                        <input pattern=".{0}|.{6,}" maxlength="100" id="register-password" type="password" class="validate" name="password" required>
                                        <label for="register-password" data-error="password needs to minimum 6 characters" data-success="Good job! almost done">Password</label>
                                        @if ($errors->has('password'))
                                            <span class="help-block">
                                                <strong>{{ $errors->first('password') }}</strong>
                                            </span>
                                        @endif
                                    </div>

                                    <div class="input-field col s12">
                                        <input id="password-confirm" maxlength="100" type="password" class="validate" name="password_confirmation" required>
                                        <label for="password-confirm" >Confirm Password</label>
                                    </div>

                                    <div class="input-field col s12">
                                        <div class="col-md-6 col-md-offset-4">
                                            <button type="submit" class="btn waves-effect waves-light col s12">
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>      
                   </div>              
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <!-- {{-- <script src="/js/app.js"></script> --}} -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> 
    <script src="/js/materialize.js"></script>
</body>
</html>
