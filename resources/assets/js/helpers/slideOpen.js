class SlideOpen {
    constructor() {
        this.$toggleSlider = $('.js-toggle-slide-menu');
        this.$slideComponent = '.js-slide-menu';
        this.$swipeSlider = '.js-toggle-edit-menu';
        this.$submitEdit = '.js-submit-edit-form'; 
        this.init();
    }

    init() {
        this.$toggleSlider.on('click', ( event ) => {
            event.stopPropagation();
            this.$toggleSlider.closest(this.$slideComponent).toggleClass('open-slider');
            this.$toggleSlider.toggleClass('close');
            // this.$slideComponent.toggleClass('open-slider');
        });

        $(document).on('click',this.$swipeSlider, (event) => {
            event.preventDefault();
            var currentElement = $(event.currentTarget);
            var parent = currentElement.parents('.js-theme-card');
            var status = parent.find('.js-theme-status');
            currentElement.toggleClass('exit-theme');
            if(parent.hasClass('open')){
                status.css('color','red');
                status.html('Theme not saved');
                status.removeClass('hidden').addClass('fadeout');
            }else{
                status.removeClass('fadeout').addClass('hidden');
            }
            parent.toggleClass('open');
        });

        $(document).on('click',this.$submitEdit, (event) => {
            event.preventDefault();
            var parent = $(event.currentTarget).parents('.js-theme-card');
            var status = parent.find('.js-theme-status');
            var button = parent.find('.exit-theme').removeClass('exit-theme');
            status.css('color','#26a69a');
            status.html('Theme saved');
            status.removeClass('hidden').addClass('fadeout');
            parent.toggleClass('open');
        });
        
    }
}

module.exports = SlideOpen;