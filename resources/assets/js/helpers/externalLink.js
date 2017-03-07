// import $ from 'jquery'; --> geeft error

class externalLink {
    constructor() {
        console.log('externalLink');
        this.$external = $('.external');
        this.init();
    }

    init() {
        this.$external.on('click', ( event ) => {
            var url = $("a",event.currentTarget).attr('href');
            location.href = url;
        });
    }
}

module.exports = externalLink;