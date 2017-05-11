class SlideOpen {
    constructor() {
        this.$slideComponent = '.js-slide-menu';
        this.$toggleSlider = $('.js-toggle-slide-menu');
        this.$openSlider = $('.js-open-slide-menu');
        this.$swipeSlider = '.js-toggle-edit-menu';
        this.init();
    }

    init() {
        this.$toggleSlider.on('click', ( event ) => {
            event.stopPropagation();
            this.$toggleSlider.closest(this.$slideComponent).toggleClass('open-slider');
            // this.$slideComponent.toggleClass('open-slider');
        });

        this.$openSlider.on('click', () => {
            this.$toggleSlider.closest(this.$slideComponent).addClass('open-slider');
        });

        $(document).on('click',this.$swipeSlider, (event) => {
            var key = '.theme-' +$(event.currentTarget).data('key');
            $(this.$swipeSlider).parents(key).find(this.$slideComponent).toggleClass('hide');

        });
    }
}

module.exports = SlideOpen;