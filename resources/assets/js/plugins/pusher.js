class Pusher {	
    constructor() {
        this.init();
    }

    init() {
    	//DEBUGGER PUSHER
        Pusher.logToConsole = true;
        Pusher.log = function(message) {
		  if (window.console && window.console.log) {
		    window.console.log(message);
		  }
		};

		// var pusher = new Pusher('f2e5a3d97d76db1562dd', {
		//   cluster: 'eu',
		//   encrypted: true
		// });

		// var channel = pusher.subscribe('chatroom');
		// channel.bind('UpdateChat', function(data) {
	 	//  		alert(data.message);
		// });
    }
}

module.exports = Pusher;