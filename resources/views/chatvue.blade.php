<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>ChatRoom</title>
	<link rel="stylesheet" href="">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
	<div id="app">
		<h2>chatroom {{ Auth::user()->name }} <span class="badge">@{{ usersInRoom.length }}</span></h1>
		<chat-log :messages="messages"></chat-log>
		<chat-composer v-on:messagesent="addMessage"></chat-composer>
	</div>
	<script>
		window.Laravel = { 'csrfToken' : '{{ csrf_token() }}' };
	</script>
	<script src="/js/all.js" charset='utf-8'></script>
</body>
</html>
