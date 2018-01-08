var events = {
    attach: function() {
        var self = this;
        $("[data-ga-trigger]").each(function() {
            var trigger = $(this).data("ga-trigger");
            $(this).on(trigger, $.proxy(self.trigger, self, $(this)));
        })
    },

    trigger: function($el, event) {
        var data = this.buildData($el)

        for (var prop in data) {
            if (typeof data[prop] === "undefined") {
                delete data[prop]
            }
        }
        if (typeof ga !== 'undefined') {
            ga('send', data);
        }

    },

    buildData: function($el) {
        return {
            'hitType': 'event',
            eventCategory: this.findData($el, "category"),
            eventAction: this.findData($el, "action"),
            eventLabel: $el.data("ga-label"),
            eventvalue: $el.data("ga-value"),
        }
    },

    findData: function($el, data) {
        return $el.data("ga-" + data) || $el.closest("[data-ga-" + data + "]").data("ga-" + data)
    },
    trackHP: function() {
        //hero
        var $fm = $('#frontpage-masthead'),
            fmBtn = $fm.find('.hero__btn'),
            $hpBtns = $('#hp-btns');


        fmBtn.on('click', function() {
            var fmAction = fmBtn.text(),
                fmLabel = $fm.find('.hero__headline').text() + ' - ' + $fm.find('.hero__text').text();

            events.send('Home Hero', fmAction, fmLabel);
        });

        $hpBtns.on('click', '.btn', function() {
            var hpBtnLabel = $(this).text();
            events.send('I Am Buttons', 'click', hpBtnLabel);
        });
    },
    cta: function() {
        var $cta = $('.cta');

        $cta.on('click', '.btn', function() {
            var ctaLabel = $(this).closest('.cta').find('.cta__heading').text();
            events.send('Call to Action', 'click', ctaLabel);
        });

        $cta.on('click', '.cta__video--trigger', function() {
            var ctaLabel = $(this).closest('.cta').find('.cta__heading').text();
            events.send('Call to Action', 'video', ctaLabel);
        });
    },
    listings: function() {
        var $lc = $('.list-container');

        $lc.on('click', '.list__headline a', function() {
            var lcLabel = $(this).closest('.list-content__container').find('.list__headline').text();
            events.send('Listing', 'title click', lcLabel);
        });

        $lc.on('click', '.btn', function() {
            var lcLabel = $(this).closest('.list-content__container').find('.list__headline').text();
            events.send('Listing', 'button click', lcLabel);
        });

        $lc.on('click', '.meta__link', function() {
            var meta = $(this).text();
            events.send('Listing', 'meta', meta);
        });

        $('#selectCategory').on('change', function() {
            var drop = $(this).find('option:selected').text();
            events.send('Listing', 'dropdown', drop);
        });
    },
    search: function() {
        $('.ga-site-search').on('submit', function() {
            var term = $('#siteSearch').val();
            events.send('Search', 'Full Site', term);
        });

        $('.ga-site-search-post').on('submit', function() {
            var term = $('#postSearch').val();
            events.send('Search', 'Fosts', term);
        });
    },
    send: function(category, action, label, value) {
        if (typeof ga !== 'undefined') {
            ga('send', 'event', category, action, label, value);
        }
    },
    //ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue]);
    init: function() {
        if ($('body').hasClass('home') === true) {
            events.trackHP();
        }
        events.cta();
        events.listings();
        events.search();
    }
};
module.exports = events;