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

// For calls that user Auth::user();
// protect routes => only when logged in !!!!!!!!!!!!!!!!!! TODO
// Route::group(['middleware' => 'auth'], function () {
// 	Route::get('/api/message/{id?}','MessageController@index')->middleware('auth');
// });
Route::group(['middleware' => ['forceSSL']], function()
{
// Route::group(['https'], function(){
	Route::get('/', 'ChatController@index');
	Auth::routes();
});

	Route::get('/api/getChatRooms', 'ChatController@getChatRooms');
	Route::post('/api/username', 'ChatController@editUserName')->middleware('auth');
	Route::post('/api/email', 'ChatController@editUserEmail')->middleware('auth');

	// messages
	Route::get('/api/message/{id?}', 'MessageController@index')->middleware('auth');
	Route::post('/api/message', 'MessageController@store');
	Route::post('/api/getThemes/{id}', 'MessageController@getThemes');
	Route::post('/api/newMessage', 'MessageController@unread');
	Route::post('/api/readMessages', 'MessageController@read');
	Route::get('/api/getMessages/{id?}', 'MessageController@getMessages');

	// friends
	Route::get('/api/searchNewFriend/{letters?}', 'FriendController@searchNewFriend')->middleware('auth');
	Route::get('/api/friends', 'FriendController@getFriendList');
	Route::post('/api/addFriend', 'FriendController@addFriend')->middleware('auth');
	Route::post('/api/declineFriend', 'FriendController@decline')->middleware('auth');
	Route::post('/api/deleteFriend', 'FriendController@delete')->middleware('auth');
	Route::get('/api/friendRequests', 'FriendController@getFriendRequests')->middleware('auth');
	Route::get('/api/searchFriend/{id?}', 'FriendController@searchFriend');
	Route::post('/api/onlineState', 'FriendController@sendOnline');
	Route::post('/api/onlineAnswer', 'FriendController@receiveOnline');
	Route::post('/api/sendLogout', 'FriendController@sendOffline');
	Route::post('/api/renameFriend', 'FriendController@renameFriend');

	//groups
	Route::post('/api/createGroup', 'GroupController@createGroup')->middleware('auth');
	Route::post('/api/accept', 'GroupController@accept')->middleware('auth');
	Route::post('/api/decline', 'GroupController@decline')->middleware('auth');
	Route::post('/api/addFriendToGroup', 'GroupController@addFriendToGroup');
	Route::post('/api/toggleAdmin', 'GroupController@toggleAdmin');
	Route::post('/api/deleteGroup', 'GroupController@delete');
	Route::post('/api/renameChat', 'GroupController@renameChat');
	// theme 
	Route::post('/api/NewTheme', 'ThemeController@create');
	Route::post('/api/updateTheme', 'ThemeController@update');
	Route::post('/api/toggleTheme', 'ThemeController@toggle');
	Route::post('/api/deleteTheme', 'ThemeController@delete');

	// User
	
	Route::post('/api/profileImage', 'ChatController@profileImage')->middleware('auth');

	// Route::get('logout','auth\LoginController@logout');

	Route::get('/home', 'HomeController@index');
