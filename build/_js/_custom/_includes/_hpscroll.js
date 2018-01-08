var scrollMonitor = require('scrollMonitor');
var hpscroll = {
    body: '',
    scroll: [],
    init: function() {
        this.body = $('body');

        if (hpscroll.body.hasClass('home') === true) {
            $('#main').find('section').addClass('scrollmonitor').append('<div class="smonitor smonitor--left"></div><div class="smonitor smonitor--right"></div>');
            $(hpscroll.body).addClass('sm-active')
            hpscroll.smFire();
        }
    },
    smFire: function() {
        var scrollElements = document.querySelectorAll('.scrollmonitor'),
            $windowW = $(window).width();
        let offset = -150;
        if ($windowW < 560) {
            offset = -50;
        } else if ($windowW >= 561 && $windowW < 960) {
            offset = -100;
        }
        for (let i = 0; i < scrollElements.length; i++) {
            var ew = scrollMonitor.create(scrollElements[i], offset);

            ew.enterViewport(function() {
                var $this = $(this.watchItem);
                $this.find('.smonitor--left').addClass('go_left');
                $this.find('.smonitor--right').addClass('go_right');
            });

            // ew.exitViewport(function(){

            // });
        }
    }
}
hpscroll.init();
module.exports = hpscroll;