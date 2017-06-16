class SlideOpen {
    constructor() {
        this.$toggleSlider = $('.js-toggle-slide-menu');
        this.$slideComponent = '.js-slide-menu';
        this.$swipeSlider = '.js-toggle-edit-menu';
        this.init();
    }

    init() {
        this.$toggleSlider.on('click', ( event ) => {
            event.stopPropagation();
            var currentElement = $(event.currentTarget);
            currentElement.closest(this.$slideComponent).toggleClass('open-slider');
            currentElement.toggleClass('close');
            // this.$slideComponent.toggleClass('open-slider');
        });

        $(document).on('click',this.$swipeSlider, (event) => {
            event.preventDefault();
            var currentElement = $(event.currentTarget);
            var parent = currentElement.parents('.js-theme-card');
            var status = parent.find('.js-theme-status');
            // othere opened forms
            var container = currentElement.parents('.js-theme-container');
            var openMenu = container.find('.js-theme-card.open');

            currentElement.toggleClass('exit-theme');
            if(parent.hasClass('open')){
                status.css('color','red');
                status.html('<span class="hide-on-small-only">Theme </span> not saved');
                status.removeClass('hidden').addClass('fadeout');
            }else{
                status.removeClass('fadeout').addClass('hidden');
            }
            parent.toggleClass('open');
            // close any other opened form
            if(openMenu[0]){
                openMenu.removeClass('open');
                openMenu.find(this.$swipeSlider).removeClass('exit-theme');
            }
        });

        // close on submit => angular themeController closeForm()
    }
}

module.exports = SlideOpen;