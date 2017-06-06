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
Route::post('/api/username', 'ChatController@editUserName');
Route::post('/api/email', 'ChatController@editUserEmail');

// messages
Route::get('/api/message/{id?}', 'MessageController@index');
Route::post('/api/message', 'MessageController@store');
Route::post('/api/getThemes/{id}', 'MessageController@getThemes');
Route::post('/api/newMessage', 'MessageController@unread');
Route::post('/api/readMessages', 'MessageController@read');
Route::get('/api/getMessages/{id?}', 'MessageController@getMessages');

// friends
Route::get('/api/searchNewFriend/{letters?}', 'FriendController@searchNewFriend');
Route::get('/api/friends', 'FriendController@getFriendList');
Route::post('/api/addFriend', 'FriendController@addFriend');
Route::post('/api/declineFriend', 'FriendController@decline');
Route::post('/api/deleteFriend', 'FriendController@delete');
Route::get('/api/friendRequests', 'FriendController@getFriendRequests');
Route::get('/api/searchFriend/{id?}', 'FriendController@searchFriend');
Route::post('/api/onlineState', 'FriendController@sendOnline');
Route::post('/api/onlineAnswer', 'FriendController@receiveOnline');
Route::post('/api/sendLogout', 'FriendController@sendOffline');
Route::post('/api/renameFriend', 'FriendController@renameFriend');

//groups
Route::post('/api/createGroup', 'GroupController@createGroup');
Route::post('/api/accept', 'GroupController@accept');
Route::post('/api/decline', 'GroupController@decline');
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
Auth::routes();
Route::post('/api/profileImage', 'ChatController@profileImage');

// Route::get('logout','auth\LoginController@logout');

Route::get('/home', 'HomeController@index');