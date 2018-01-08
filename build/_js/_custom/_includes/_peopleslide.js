var peopleSlide = {
    $tn: '',
    $ti: '',
    slider: function() {
        peopleSlide.$tn.on('click', function() {

            var $this = $(this),
                $tc = $this.closest('.team-item');

            $tc.siblings('.open').removeClass('open').find('.slider-target').slideUp('fast');

            if ($tc.hasClass('open') === true) {
                console.log('true');
                $tc.addClass('sliding').find('.slider-target').slideUp('fast', function() {
                    $('.sliding').removeClass('sliding').removeClass('open');
                });
            } else {
                $tc.addClass('sliding').find('.slider-target').slideDown('fast', function() {
                    $('.sliding').removeClass('sliding').addClass('open');
                });
            }
        });
    },
    init: function() {
        this.$tn = $('.team-name');
        this.$ti = $('.team-item');

        if (peopleSlide.$tn.length) {
            peopleSlide.slider();
        }
    }
};
peopleSlide.init();
module.exports = peopleSlide;