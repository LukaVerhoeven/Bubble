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
Route::post('/api/getThemes/{id}', 'MessageController@getThemes');

// friends
Route::get('/api/searchNewFriend/{letters?}', 'FriendController@searchNewFriend');
Route::get('/api/friends', 'FriendController@getFriendList');
Route::post('/api/addFriend', 'FriendController@addFriend');
Route::get('/api/searchFriend/{id?}', 'FriendController@searchFriend');

//groups
Route::post('/api/createGroup', 'GroupController@createGroup');

Auth::routes();
// Route::get('logout','auth\LoginController@logout');

Route::get('/home', 'HomeController@index');


