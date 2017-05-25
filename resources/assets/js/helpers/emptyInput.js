class EmptyInput {
    constructor() {
        this.$empty = $('.js-empty-input');
        this.init();
    }

    init() {
        this.$empty.on('click', (e) => {
            var input = $(e.currentTarget).siblings('input');
            input.focus();
            input.val('');
            input.trigger('input');
            input.trigger('change');
        });
    }
}

module.exports = EmptyInput;