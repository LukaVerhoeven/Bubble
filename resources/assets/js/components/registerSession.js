

// !!!!!!!!!!!! This scripts is in the public map. and as a stand alone script loaded on the login-page only !!!!!!!!!
//  ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
class RegisterSession {
    constructor() {
        this.$register = $('.js-register');
        this.$tab = $('.js-register-tab');
        this.init();
    }

    init() {
        this.$register.on('click',()=>{
            sessionStorage.setItem("register", true);
        })
        console.log('register',this.$tab);
        if(this.$tab){
            this.$tab.click();
        }
    }
}

export default RegisterSession