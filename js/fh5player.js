/**
 * fh5player.js 
 *
 * @project fh5player
 * @version 0.1
 * @author Qu Yizhi, foprctogo@gmail.com
 * @copyright 2014
 * @license MIT
 */

 (function($){
    var fh5player = function(config){
        this.init(config);
    };

    fh5player.prototype = {
        init: function(config){
            var me = this;
            var player = $("<audio id='fh5player' />");
            
            me.player = player;
            me.isPlaying = false;
            me.timesnapInterval = null;

            //events
            me.ePause = 'PlayerPause';
            me.ePlay = 'PlayerPlay';
            me.eStop = 'PlayerStop';
            me.eTimer = 'PlayerTimebar';

            $('body').append(player);

            me.player.on('play', function(){
                me.player.trigger(me.ePlay);
                clearInterval(me.timesnapInterval);
                var ProcessYet = 0;
                var audio = me.player[0];
                me.timesnapInterval = setInterval(function () {
                    ProcessYet = (audio.currentTime / audio.duration)*100;
                    me.player.trigger(me.eTimer, [ProcessYet]);
                }, 1000);
            });
            me.player.on('pause', function(){
                clearInterval(me.timesnapInterval);

                if(me.player[0].ended){
                    me.player.trigger(me.eStop);
                    me.player.trigger(me.eTimer, [100]);
                }else{
                    me.player.trigger(me.ePause);
                }
            });

        },
        pause: function(){
            this.isPlaying = false;
            this.player[0].pause();
        },
        play: function(){
            this.isPlaying = true;
            this.player[0].play();
        },
        setSound: function(soundData){
            this.player[0].src = soundData ? soundData.src : null;
            if(soundData){
                this.play();
            }
        },
        getPlayStatus: function(){
            return this.isPlaying;
        }
    };

    function timeDispose(number) {
        var minute = parseInt(number / 60);
        var second = parseInt(number % 60);
        minute = minute >= 10 ? minute : "0" + minute;
        second = second >= 10 ? second : "0" + second;
         return minute + ":" + second;
    }

    $.player = new fh5player();
 })($);