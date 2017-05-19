// import Carousel from './components/carousel';
import Scrolling from './components/scrolling';
import addFriend from './components/addFriend';
// import AutoScrollDownChat from './helpers/autoScrollDownChat';
import externalLink from './helpers/externalLink';
import PreventDefault from './helpers/preventDefault';
import SlideOpen from './helpers/slideOpen';
// import ParentSelector from './helpers/parentSelector';
import chatSettings from './pages/chatSettings';
import Conversation from './pages/Conversation';
import Themes from './pages/themes';
// import pusher from './plugins/Pusher';
import angular from 'angular';
import angularSanitize from 'angular-sanitize';
// import ngInfiniteScroll from 'ng-infinite-scroll';
// import angularSanitize from 'angular-sanitize';
// import VueChat from './components/_vueChat';


// Global variables
// var _USERID = null;
// var _USERNAME = null;
// var _LOGINBTN = null;
// var _ISLOGGEDIN = 0;
// var _APILINK = "http://jorenvh.webhosting.be/api";
// var _ALL_POLITICIANS = [];
// var _POLITICIAN_QUESTIONS = [];
// var _FIRST_QUESTION_LIKED = false;


const $ = global.jQuery = require('jquery');

class App {
    constructor() {
        //components
        this.scrolling = new Scrolling();
        this.injector = { app: this };
        this.addfriend = new addFriend();
        //helpers
        this.externallink = new externalLink();
        this.preventdefault = new PreventDefault();
        // this.autoscrolldownchat = new AutoScrollDownChat();
        this.slideopen = new SlideOpen();
        // this.parentselector = new ParentSelector();
        // pages
        this.chatsettings = new chatSettings();
        this.conversation = new Conversation();
        this.themes = new Themes();


    }

    start() {

    }
}

//init
$(document).ready(() => {
    // const init = new App();
    const init = new App();

});


import Echo from "laravel-echo"

window.Echo = new Echo({
    cluster:'eu',
    broadcaster: 'pusher',
    key: '02588819c60d53b60c81',
    // encrypted: true
});

