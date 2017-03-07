class PreventDefault {
    constructor() {
        this.$element = $('.prev-def');
        this.init();
    }

    init() {
        this.$element.on('submit', ( event ) => {
            event.preventDefault();
        });
    }
}

module.exports = PreventDefault;