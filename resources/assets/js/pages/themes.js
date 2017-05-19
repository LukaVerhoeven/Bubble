class Themes {
    constructor() {
        // this.$editform = '.js-edit-theme';
        // this.$toggleButton = '.js-toggle-edit-menu';
        // this.$toggleSlideButton = '.js-toggle-slide-menu';
        // this.$themeCard = '.js-theme-card';
        this.themes();
    }

    themes() {
       
        // $(document).on('click',this.$toggleButton, (e) => {
        //     $(e.currentTarget).toggleClass('exit-theme');
        // });

    //         var parent = $(e.currentTarget).parent().parent();
    //         var children = parent.children();
    //         var editTheme = children[3];
    //         var bg = $(e.currentTarget).css('backgroundColor');
          
    //         console.log(parent.children());
    //         $('theme-line').toggleClass('hide');
    //         $(editTheme).toggleClass('opening');
    //         $(e.currentTarget).toggleClass('no-shadow');
    //         setTimeout(function(){ 
    //             // $(children[0]).toggleClass('hide');
    //             // $(children[1]).toggleClass('hide');

    //         }, 500);

    //         var rippler =  parent;

    //         // create .ink element if it doesn't exist
    //         if(rippler.find(".ink").length == 0) {
    //             rippler.append("<span class='ink'></span>");
    //         }

    //         var ink = rippler.find(".ink");

    //         // prevent quick double clicks
    //         ink.removeClass("animate");

    //         // set .ink diametr
    //         if(!ink.height() && !ink.width())
    //         {
    //             var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
    //             ink.css({height: d, width: d});
    //         }

    //         // get click coordinates
    //         var x = e.pageX - rippler.offset().left - ink.width()/2;
    //         var y = e.pageY - rippler.offset().top - ink.height()/2;

    //         // set .ink position and add class .animate
    //         ink.css({
    //           top: y+'px',
    //           left:x+'px',
    //           background : bg
    //         }).addClass("animate");
    //     });

    //     function removeShadow(element){
    //         console.log(element);
    //         element.removeClass('no-shadow');
    //     }

    //     function hexc(colorval) {
    //         var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    //         delete(parts[0]);
    //         for (var i = 1; i <= 3; ++i) {
    //             parts[i] = parseInt(parts[i]).toString(16);
    //             if (parts[i].length == 1) parts[i] = '0' + parts[i];
    //         }
    //         color = '#' + parts.join('');
    }
}

module.exports = Themes;