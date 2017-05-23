class ProfileSettings {
    constructor() {
        this.$editInput = '.js-edit-input';
        this.$editButton = $('.js-edit-button');
        this.$editValue = '.js-edit-value';
        this.init();
    }

    init() {
        this.$editButton.on('click', (e) => {
            var parent = $(e.currentTarget).parents('.js-parent');
            var value = parent.find(this.$editValue).text();
            var input = parent.find(this.$editInput);
            input.val(value);
            input.focus();
        });
    }
}

module.exports = ProfileSettings;