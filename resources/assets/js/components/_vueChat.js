//vue
// require('./vue/vue'); // importeet de vue library

// Vue.component('example', require('./components/Example.vue'));
Vue.component('chat-message', require('./vue/ChatMessage.vue'));
Vue.component('chat-log', require('./vue/ChatLog.vue'));
Vue.component('chat-composer', require('./vue/ChatComposer.vue'));

class VueChat {
    constructor() {
        this.init();
    }

    init() {
    	const app = new Vue({
		    el: '#chat',
		    data:{
		        messages:[],
		        usersInRoom:[],
		        ChatID: undefined
		        },
		    methods:{
		        addMessage(message) {
		            //add to existing messages
		            this.messages.push(message);
		            axios.post('api/message/1', message).then(response =>{

		                console.log('test');
		            })
		        },
		    },
		    created(){
		        axios.get('api/message/1').then(response => {
		            this.messages = response.data.messages;
		        })

		        Echo.join('chatroom')
		        .here((users)=>{
		            this.usersInRoom = users;
		        })
		        .joining((user)=>{
		            this.usersInRoom.push(user);
		        })
		        .leaving((user)=>{
		            this.usersInRoom = this.usersInRoom.filter(u => u != user);
		        })
		        .listen('UpdateChat',(e)=>{
		            console.log(e);
		            this.messages.push({
		                text: e.message.text,
		                user: e.user
		            })
		        });
		    }
		});
    }
}

export default VueChat;

