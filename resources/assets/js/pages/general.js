class General {
    constructor() {
        var width = $(window).width();
        this.IsDesktop = false;
        if(width > 415){
            this.sidebarWidth = 400
        }else if(width > 900){
          this.IsDesktop = true;
        }else {
            this.sidebarWidth = 300
        }
        this.$tutorial = $('#tutorial');
        this.init();
    }

    init() {
        this.sidebar();
        this.registerSession();
    }

    sidebar() {
                     
        $('.drag-target').on('mousedown',()=>{
            console.log(this);
        })
        $('.drag-target').on('click',()=>{
            console.log(this);
        })
        $('#sidenav-overlay').on('hover',()=>{
            console.log(this);
        })        
        // mobile sidebar
        if(this.IsDesktop){
            $("#slide-out").sideNav({
                menuWidth: this.sidebarWidth,
            });
            $("#slide-out").sideNav({
                menuWidth: this.sidebarWidth,
            });
            $(".button-collapse").sideNav({
                menuWidth: this.sidebarWidth,
            });
        }else{
            $("#slide-out").sideNav();
            $("#slide-out").sideNav();
            $(".button-collapse").sideNav();
        }

       	$(document).on('click','.button-close-nav', () => {
  			$(".drag-target").trigger("click");
		    return false;
        });		
    }

    registerSession() {
        var ClickedOnRegister = sessionStorage.getItem('register');
        if(ClickedOnRegister !== null){
            if(ClickedOnRegister){
                this.$tutorial.removeClass('hide');
                sessionStorage.removeItem('register');
                // sessionStorage.clear();
            }
        }
    }
}

module.exports = General;