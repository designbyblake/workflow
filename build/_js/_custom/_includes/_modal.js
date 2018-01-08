var modal = {
    videoBtn: '',
    closeBtn: '',
    modalWin: '',
    docFocus: '',
    modalFocus: '',
    isOpen: false,
    isVideoLoaded: false,
    //click .trigger-video
    //add video and close code to modal div
    //add class to modal to open and add focus
    //hit esc or click .trigger-close to close modal, focus back to .trigger-video
    init: function() {
        this.videoBtn = $('.trigger-video');
        this.modalWin = $('.modal');
        this.closeBtn = this.modalWin.find('.trigger-close');
        this.docFocus = document.querySelectorAll('input, iframe, button, a, video');
        this.modalFocus = this.modalWin.find('input, iframe, button, a, video');
        this.esc();
        this.videoBtn.on('click', modal.open);
        this.closeBtn.on('click', modal.close);
    },
    playFirstTime: function() {
        setTimeout(function() {
            if (youtube_g.players.length >= 1 && youtube_g.ready === true) {
                youtube_g.players[0].playVideo();
            } else {
                modal.playFirstTime();
            }
        }, 100);

    },
    modalHTML: function() {
        //Only load the video the first time.
        if (modal.isVideoLoaded === false) {
            modal.modalVid = modal.videoBtn.data('video');
            modal.modalWin.html(`
			<div class="yt responsive__video" data-youtube="${modal.modalVid}"></div>
			<button type="button" class="btn modal__close trigger-close">
				<span class="icon-close" aria-hidden="true"></span>
				<span class="access">Close Video</span>
			</button>`);
            youtube_g.apiReady();
            modal.isVideoLoaded = true;
            if (istouch.is_touch_device() === false) {
                modal.playFirstTime();
            }
        } else {
            if (istouch.is_touch_device() === false) {
                youtube_g.players[0].playVideo();
            }
        }

        // Resets the trigger close, if the first load it won't exist during the init();
        modal.closeBtn = modal.modalWin.find('.trigger-close');

        //Unbind the click event on any existing modal.closeBtn to prevent firing functions multiple times.
        modal.closeBtn.unbind();
        // Rebind the close function
        modal.closeBtn.on('click', modal.close)

    },
    open: function() {
        modal.isOpen = true;
        for (let i = 0; i < modal.docFocus.length; i++) {
            modal.docFocus[i].setAttribute('tabindex', '-1');
        }
        for (let i = 0; i < modal.modalFocus.length; i++) {
            modal.modalFocus[i].removeAttribute('tabindex');
        }
        modal.modalHTML();
        modal.modalWin.addClass('modal--active');
        modal.modalWin.focus();
    },
    close: function() {
        modal.isOpen = false;
        for (let i = 0; i < modal.docFocus.length; i++) {
            modal.docFocus[i].removeAttribute('tabindex');
        }
        for (let i = 0; i < modal.modalFocus.length; i++) {
            modal.modalFocus[i].setAttribute('tabindex', '-1');
        }
        youtube_g.stopAllVideos();
        modal.modalWin.removeClass('modal--active');
        modal.videoBtn.focus();
    },
    esc: function() {
        //Allow keyboard Esc to close subscribe
        document.addEventListener('keydown', function(evt) {
            evt = evt || window.event;
            var isEscape = false;

            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
            } else {
                isEscape = (evt.keyCode == 27);
            }

            if (isEscape && modal.isOpen) {
                modal.close();
            }
        });
    }
}
modal.init();
module.exports = modal;