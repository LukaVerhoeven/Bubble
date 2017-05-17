class Conversation {
    constructor() {
        this.$emojiClick = $('.js-emoji-click');
        this.$emojiPopup = $('.js-emoji-popup');
        this.$emoji = $('.js-emoji');
        this.$message = $('.js-message');
        this.emojis();
    }

    emojis() {
        this.$emojiClick.on('click', () => {
            this.$emojiPopup.toggleClass('hide');
        });

        this.$emoji.on('click', (e) => {
            var textValue = this.$message.val();
            var emojiCode = $(e.currentTarget).data('value');
            this.$message.val(textValue+ ' :'+ emojiCode +':');
            this.$message.focus();
        });
    }
}

module.exports = Conversation;