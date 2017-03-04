class Pusher {	
    constructor() {
        this.init();
    }

    init() {
    	
        Pusher.logToConsole = true;

		var pusher = new Pusher('f2e5a3d97d76db1562dd', {
		  cluster: 'eu',
		  encrypted: true
		});

		var channel = pusher.subscribe('my-channel');
		channel.bind('my-event', function(data) {
	  		alert(data.message);
		});
    }
}

module.exports = Pusher;