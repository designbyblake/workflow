var general = {
    heroInterior: '',
    heroText: '',
    HeroHeadline: '',
    heroColor: function() {
        general.heroInterior.each(function() {
            var $this = $(this);
            if ($this.find('picture').length === 0) {
                $this.addClass('hero--color');
            }
        });
    },
    activateNavigation: function() {
        if (activeNav === 'blog') {
            $('.menu__news-resources').addClass('menu__item--active');
        } else if (activeNav === 'casestudy') {
            $('.menu__case-studies').addClass('menu__item--active');
        }
    },
    heroHeadlineFix: function() {
        var ht = this.heroHeadline.text().split(' '),
            hts = '';

        for (var i = 0; i < ht.length; i++) {
            if (i === (ht.length - 2)) {
                hts += `<span class="hero__orphans">${ht[i]} `;
            } else if (i === (ht.length - 1)) {
                hts += `${ht[i]}</span>`;
            } else {
                hts += `${ht[i]} `;
            }
        }

        this.heroHeadline.html(hts);
    },
    heroTextFix: function() {
        var ht = this.heroText.text().split(' '),
            hts = '';

        for (var i = 0; i < ht.length; i++) {
            if (i === (ht.length - 2)) {
                hts += `<span class="hero__orphans">${ht[i]} `;
            } else if (i === (ht.length - 1)) {
                hts += `${ht[i]}</span>`;
            } else {
                hts += `${ht[i]} `;
            }
        }

        this.heroText.html(`<p>${hts}</p>`);
    },
    init: function() {
        this.heroInterior = $('.hero--interior');
        this.heroText = $('.hero__text');
        this.heroHeadline = $('.hero__headline');

        if (general.heroInterior.length) {
            general.heroColor();
        }

        if (general.heroText.length) {
            general.heroTextFix();
        }

        if (general.heroHeadline.length) {
            general.heroHeadlineFix();
        }

        if (typeof activeNav !== 'undefined' && activeNav !== null) {
            general.activateNavigation();
        }


    },
}
general.init();
module.exports = general;