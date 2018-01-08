var stickyNav = {
    siteHeader: '',
    init: function() {
        this.siteHeader = $('.site-header');
        $(document).on('scroll', stickyNav.scrollHeader);
        stickyNav.scrollHeader();
    },
    scrollHeader: function() {

        var windowScroll = $(window).scrollTop();

        if (windowScroll >= 60) {
            stickyNav.siteHeader.addClass('site-header--sticky');
        } else {
            stickyNav.siteHeader.removeClass('site-header--sticky');
        }

    }

}
stickyNav.init();
module.exports = stickyNav;