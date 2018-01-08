var offsite = {
    alt: '',
    baseUrl: window.location.origin,
    addTarget: function() {
        this.alt.find('a[href^="' + offsite.baseUrl + '"]').addClass('onsite');
        this.alt.find('a').each(function() {
            if ($(this).hasClass('onsite') === false) {
                $(this).attr({ 'target': '_blank', 'rel': 'noopener' });
            }
        });

    },
    init: function() {
        this.alt = $('.alt-bg');
        if (offsite.alt.length) {
            offsite.addTarget();
        }
    }
};
offsite.init();
module.exports = offsite;