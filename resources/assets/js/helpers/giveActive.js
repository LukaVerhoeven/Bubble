class GiveActive {
    constructor() {
        this.$container = '.js-active-container';
        this.$active = '.js-give-active';
        this.init();
        // An extra function to remove all active classes from somewhere else
        this.$removeContainer = $('.side-nav-content');
    }

    init() {
       $(document).on('click',this.$active, (e) => {
       		var element = $(e.currentTarget);
            var parent = element.parents(this.$container);
            var children = parent.children(this.$active);
            children.removeClass('active');
            // extra remove
            var children = this.$removeContainer.find(this.$active);
            children.removeClass('active');
            // add active
            element.addClass('active');
        });
    }
}

module.exports = GiveActive;