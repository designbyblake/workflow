//mobile nav open/close 
var subNavToggle = {
    navBtn: '',
    body: '',
    init: function() {
        this.navBtn = $('.page-nav__toggle');

        subNavToggle.navBtn.on('click', subNavToggle.navFunc);
    },
    navFunc: function() {
        subNavToggle.navBtn.toggleClass('page-nav__toggle--open').next().toggleClass('submenu-open');
    }
}
subNavToggle.init();
module.exports = subNavToggle;