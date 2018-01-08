//mobile nav open/close 
var events = require('../_jake/events');
var mainToggle = {
    navBtn: '',
    body: '',
    menu: '',
    main: '',
    siteSearch: '',
    clearSearch: function() {
        if (mainToggle.siteSearch.val() !== '') {
            mainToggle.siteSearch.val('');
        }

    },
    stopSearch: function() {
        $('.form--search').on('submit', function() {
            if ($(this).find('#siteSearch').length && $('#siteSearch').val() === '') {
                return false;
            } else if ($(this).find('#postSearch').length && $('#postSearch').val() === '') {
                return false;
            }
        });
    },
    esc: function() {
        document.addEventListener('keydown', function(evt) {
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
            } else {
                isEscape = (evt.keyCode == 27);
            }

            if (isEscape && mainToggle.body.hasClass('menu-open')) {
                mainToggle.navClose();
            }
        });
    },
    focusOn: function(el) {
        el.find('a,button,input,select,iframe,video,audio').attr('tabIndex', '0');
    },
    focusOff: function(el) {
        el.find('a,button,input,select,iframe,video,audio').attr('tabIndex', '-1');
    },
    setUp: function() {
        mainToggle.menu.attr('tabIndex', '-1');
        mainToggle.focusOff(mainToggle.menu);
    },
    navOpen: function(shiftFocus) {
        mainToggle.body.addClass('menu-open');
        if (shiftFocus !== undefined) {
            shiftFocus.focus();
        } else {
            mainToggle.menu.focus();
        }

        mainToggle.focusOn(mainToggle.menu);
        mainToggle.focusOff(mainToggle.footer);
        mainToggle.focusOff(mainToggle.main);
        events.send('Action Nav', 'Click', 'Navigation Open');
    },
    navClose: function() {
        mainToggle.body.removeClass('menu-open');
        mainToggle.focusOff(mainToggle.menu);
        mainToggle.focusOn(mainToggle.main);
        mainToggle.focusOn(mainToggle.footer);
        $('.return-focus').focus().removeClass('return-focus');
        events.send('Action Nav', 'Click', 'Navigation Close');
    },
    //tabIndex -1 on menu initially
    //user clicks menu toggle, tabIndex 0, focus to search or focus in general on menu__container
    //click anywhere outside menu__container to close, put tabIndex back to -1, focus back to body area
    //how can focus get back to last element slected

    init: function() {
        this.navBtn = $('.menu__toggle');
        this.body = $('body');
        this.menu = $('.menu__container');
        this.main = $('#main');
        this.footer = $('.site-footer, .footer-nav');
        this.siteSearch = $('#siteSearch');
        this.setUp();
        this.esc();
        this.clearSearch();
        this.stopSearch();

        mainToggle.navBtn.on('click', function() {

            if (mainToggle.body.hasClass('menu-open')) {
                mainToggle.navClose();
            } else {
                if ($(this).hasClass('site-header__search') === true) {
                    mainToggle.navOpen($('#siteSearch'));
                } else {
                    mainToggle.navOpen();
                }

                $(this).addClass('return-focus');
            }
        });
        mainToggle.main.on('click', function() {
            if (mainToggle.body.hasClass('menu-open')) {
                mainToggle.navClose();
            }
        });

    }

}
mainToggle.init();
module.exports = mainToggle;