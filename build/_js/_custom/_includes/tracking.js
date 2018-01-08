global.tracking = {
    jacks:[],
    sizmek:function(conv){
        //let ebConversionImg = new Image(),
           // ebConversionURL = "//bs.serving-sys.com/Serving/ActivityServer.bs?", 
        let ebRand = Math.random() + ''
         
        ebRand = ebRand * 1000000;
     
       // ebConversionURL += "cn=as&ActivityID="+conv+"&rnd="+ebRand;
        //ebConversionImg.src = ebConversionURL;
        let sizmekScript = '<script src="//bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID='+conv+'&amp;rnd='+ebRand+'"></script>';
        $('body').append(sizmekScript);
    },
    google:function(category, action, label){
        ga('send', 'event', category, action, label);
    },
    email_form: function(position){
        tracking.sizmek(1057217);
        tracking.google('Email Capture', 'submit', position);
    },
    story: function(name, the_event){
        if(the_event === 'click'){
             tracking.sizmek(1057226);
        }
        tracking.google('MBA Stories', the_event, name);
    },
    jack_init:function(){
        $('.jack').each(function(){
            tracking.jacks.push(false);
        })
    },
    jack_attack:function(which) {
        let current_jack = tracking.jacks[which],
            current_section = 'Section '+(which+1);

        if(current_jack === false){
            tracking.jacks[which] = true;
            tracking.google('Section', 'entered', current_section);
        }
    },
    share:function() {
        $('.share__btn').on('click', function(){
            let which = $(this).data('share');
            tracking.google('Share Buttons', 'click', which);

            if(which === 'Twitter' || which === 'Facebook'){
                tracking.sizmek(1057222)
            }
        });

        $('.new-mag__link').on('click', function(){
            var text = $(this).text();
            tracking.google('Share Buttons', 'click', text); 
        });
    },
    downloads:function() {
        $('#download').on('click', function(){
            tracking.google('Download', 'click', 'Download Button');
            tracking.sizmek(1057224);
        });

        $(document).on("contextmenu", ".download-cover", function(e){
            tracking.google('Download', 'click', 'Right Click');
            tracking.sizmek(1057224);
        });
    },
    init:function(){
        tracking.facts();
        tracking.jack_init();
        tracking.share();
        tracking.downloads();
    }
};
tracking.init();
module.exports = tracking;
