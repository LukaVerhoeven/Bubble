class chatSettings {
    constructor() {
        this.$editNameButton = $('.bubble-editButton');
        this.$editName = '.bubble-editName';
        this.$editNameInput = '.bubble-editInput';
        this.$parent = '.js-parent';
        this.init();
    }

    init() {
        this.$editNameButton.on('click', (e) => {
            var parent = $(e.currentTarget).parents(this.$parent);
            var editName = parent.find(this.$editName);
            var editInput = parent.find(this.$editNameInput);
            editName.toggleClass('edit');
            editInput.toggleClass('edit');
        });
    }
}

module.exports = chatSettings;