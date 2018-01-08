var url = {
    base: '',
    isSearch: false,
    segments: '',
    path: '',
    term: '',
    body: '',
    search: function() {
        if (window.location.pathname === '/state-restaurant-association-partnerships/') {
            url.body.append('<script src="/content/themes/fishbowl/js-map/raphael.js"></script>');
            url.body.append('<script src="/content/themes/fishbowl/js-map/jquery.usmap.js"></script>');
            url.body.append('<script src="/content/themes/fishbowl/js-map/custom-map2.js"></script>');
        }
    },
    init: function() {
        this.base = window.location.protocol + '//' + window.location.host;
        this.path = window.location.pathname;
        this.segments = this.path.split('/');
        this.body = $('body');

        this.search();  

    }
};
url.init();
module.exports = url;