<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     Route::get('/', 'ChatController@index');
// });
Route::get('/', 'ChatController@index');
Route::get('/api/getChatRooms', 'ChatController@getChatRooms');

Route::get('/api/message/{id?}', 'MessageController@index');
Route::post('/api/message/{id}', 'MessageController@store');

Route::get('/api/searchNewFriend/{id?}', 'FriendController@searchNewFriend');
Route::get('/api/friends', 'FriendController@getFriendList');
Route::post('/api/addFriend', 'FriendController@addFriend');


Auth::routes();
Route::get('logout','auth\LoginController@logout');

Route::get('/home', 'HomeController@index');

// Route::get('/chatvue', 'ChatController@index') ;
// Route::get('/api/friends', function(){
// 	$user = Auth::user();
// 	dd($user);
// })->middleware('auth') ;

// //pusher

// Route::get('/pusher', function() {
//     event(new App\Events\UpdateChat('Hi there Pusher!'));
//     return "Event has been sent!";
// });

// Route::get('/bridge', function() {
//     $pusher = App::make('pusher');

//     $pusher->trigger( 'test-channel',
//                       'test-event', 
//                       array('text' => 'Preparing the Pusher Laracon.eu workshop!'));

//     return view('welcome');
// });


// use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

// class TestEvent implements ShouldBroadcast
// {
//     public $text;

//     public function __construct($text)
//     {
//         $this->text = $text;
//     }

//     public function broadcastOn()
//     {
//         return ['test-channel'];
//     }
// }

// Route::get('/broadcast', function() {
//     event(new TestEvent('Broadcasting in Laravel using Pusher!'));

//     return view('welcome');
// });

