class chatSettings {
    constructor() {
        this.$editName = $('#editChatName');
        this.$editNameButton = $('.editChatNameButton');
        this.$editNameInput = $('#editChatNameInput');
        this.init();
    }

    init() {
        this.$editNameButton.on('click', () => {
            this.$editName.toggleClass('hide');
            this.$editNameInput.toggleClass('hide');
        });
    }
}

module.exports = chatSettings;