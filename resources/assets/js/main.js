// import Carousel from './components/carousel';
import externalLink from './helpers/externalLink';
import addFriend from './components/addFriend';
import pusher from './plugins/Pusher';

// Global variables
var _USERID = null;
var _USERNAME = null;
var _LOGINBTN = null;
var _ISLOGGEDIN = 0;
var _APILINK = "http://jorenvh.webhosting.be/api";
var _ALL_POLITICIANS = [];
var _POLITICIAN_QUESTIONS = [];
var _FIRST_QUESTION_LIKED = false;


const $ = global.jQuery = require('jquery');

class App {
    constructor() {
        this.injector = { app: this };
        this.addfriend = new addFriend();
        this.externallink = new externalLink();
        console.log('drol');
    }

    start() {
    
    }
}

//init
$(document).ready(() => {
   const init = new App();
  
});

