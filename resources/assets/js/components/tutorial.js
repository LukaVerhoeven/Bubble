class Tutorial {
    constructor() {
    	this.$close = $('.js-close-tutorial');
    	this.$bg = $('.js-tutorial-screen');
    	this.$tutorial = $('#tutorial');
    	this.$nextStep = $('.js-next-step');
    	this.$prevStep = $('.js-prev-step');
    	this.currentStep = 1;
        this.init();
    }

    init() {
        this.$close.on('click', () => {
            this.$tutorial.addClass('hide');
            this.currentStep = 1;
            this.checkStep();
        })
        this.$nextStep.on('click', () => {
            $('.step-'+this.currentStep).addClass('hide');
            this.$bg.removeClass('step'+this.currentStep);
        	this.currentStep++;
            $('.step-'+this.currentStep).removeClass('hide');
            this.$bg.addClass('step'+this.currentStep);
            this.checkStep();
        })
        this.$prevStep.on('click', () => {
            $('.step-'+this.currentStep).addClass('hide');
            this.$bg.removeClass('step'+this.currentStep);
        	this.currentStep--;
            $('.step-'+this.currentStep).removeClass('hide');
            this.$bg.addClass('step'+this.currentStep);
            this.checkStep();
        })

    }

    checkStep () {
    	if(this.currentStep === 4){
    		$('.theme-tab a')[0].click();
    		$('.new-theme').addClass('open');
    		$('#themes').addClass('tutorial-theme');
    	} else if($('#themes').hasClass('tutorial-theme')){
    		$('.conversation-tab a')[0].click();
    		$('.new-theme').removeClass('open');
    		$('#themes').removeClass('tutorial-theme');
    	}
    	if (this.currentStep === 5){
    		$('#chat-section .chat-input').addClass('tutorial-theme');
    		$('#chat-section .filter').addClass('tutorial-theme');
    		$('.-text').addClass('blue-text');
    		$('.-border').addClass('blue-border');
    		$('.js-emoji').addClass('blue');
    		$('.js-tutorial-filter').removeClass('hide');
    	}else if ($('#chat-section .chat-input').hasClass('tutorial-theme')){
    		$('#chat-section .chat-input').removeClass('tutorial-theme');
    		$('#chat-section .filter').removeClass('tutorial-theme');
    		$('.-text').removeClass('blue-text');
    		$('.-border').removeClass('blue-border');
    		$('.js-emoji').removeClass('blue');    	
    		$('.js-tutorial-filter').addClass('hide');	
    	}
    }
}

export default Tutorial;