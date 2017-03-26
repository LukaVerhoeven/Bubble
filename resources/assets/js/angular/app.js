var app = angular.module('bubble',[])
        .constant('API_URL','http://bubble.local/api/')

require('./controllers/FriendController');        
require('./controllers/MessageController');        
require('./controllers/NavController');        
