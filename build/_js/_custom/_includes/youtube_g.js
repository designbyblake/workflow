global.youtube_g = {
    players: [],
    videoCount: 0,
    videos: '',
    hasEnded: true,
    videoTitle: '',
    ready: false,
    addAPI: function() {
        var tag = document.createElement('script'),
            firstScriptTag = document.getElementsByTagName('script')[0];

        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },
    initialize: function() {
        this.addAPI();
    },
    onPlayerStateChange: function(event) {
        // Get Video Title
        //console.log(event.target.B.videoData.title);
        if (event.data === -1) {
            //unstarted
        } else if (event.data === 0) {
            //ended
            youtube_g.hasEnded = true;
            //tracking.google('Video', 'ended', youtube_g.videoTitle);
        } else if (event.data === 2) {
            //paused
        } else if (event.data === 3) {
            //buffering
        } else if (event.data === 5) {
            //video cued
        }

        if (event.data == YT.PlayerState.PLAYING) {
            if (youtube_g.hasEnded === true) {
                //tracking.google('Video', 'started', youtube_g.videoTitle);
                //tracking.sizmek(1057225);
            }
            youtube_g.hasEnded = false;
            var temp = event.target.a.src;
            var tempPlayers = $("iframe.yt_players");
            for (var i = 0; i < youtube_g.players.length; i++) {
                if (youtube_g.players[i].a.src != temp) youtube_g.players[i].pauseVideo();
            }
        }
    },

    resetVideo: function(video) {
        var which = video.split('player'),
            player = which[1];

        this.players[player].seekTo(0);
        setTimeout(function() {
            this.players[player].pauseVideo();
        }, 100);
    },
    apiReady: function() {
        this.videos = $('.yt');

        this.videos.each(function() {
            var video = $(this),
                YTid = video.data('youtube'),
                VidTitle = video.data('title'),
                vidPlay,
                ytMovie;

            youtube_g.videoTitle = VidTitle;

            var playerName = 'player' + youtube_g.videoCount;
            video.attr('data-YT', playerName);
            video.append('<div id="' + playerName + '" class="video-player"/>');

            var player_video = new YT.Player(playerName, {
                height: '529',
                width: '940',
                videoId: YTid,
                playerVars: {
                    rel: 0,
                    loop: 1,
                    html5: 1
                },
                events: {
                    'onStateChange': youtube_g.onPlayerStateChange,
                    'onReady': function() {
                        youtube_g.ready = true;
                    }
                }
            });
            youtube_g.players.push(player_video);
            youtube_g.videoCount++;
        });
    },
    stopAllVideos: function() {
        for (var i = 0; i < youtube_g.players.length; i++) {
            youtube_g.players[i].pauseVideo();
        }
    }
};

    //YouTube
global.onYouTubeIframeAPIReady =  function (){
    var $body = document.querySelector('body');
    $body.classList.add('yt-api-ready');
}

youtube_g.initialize();
module.exports = youtube_g;