class chatSettings {
    constructor() {
        this.$editName = $('#editChatName');
        this.$editNameButton = $('.editChatNameButton');
        this.$editNameInput = $('#editChatNameInput');
        this.init();
    }

    init() {
        this.$editNameButton.on('click', () => {
            this.$editName.toggleClass('edit');
            this.$editNameInput.toggleClass('edit');
        });
    }
}

module.exports = chatSettings;