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
            $('body').append(player);
            me.player = player;
            me.isPlaying = false;

            //events
            me.ePause = 'PlayerPause';
            me.ePlay = 'PlayerPlay';
            me.eStop = 'PlayerStop';

            me.player.on('play', function(){
                me.player.trigger(me.ePlay);
            });
            me.player.on('pause', function(){
                if(me.player[0].ended){
                    me.player.trigger(me.eStop);
                }else{
                    me.player.trigger(me.ePause);
                }
            });

            me.setSound('test.mp3');
        },
        pause: function(){
            this.isPlaying = false;
            this.player[0].pause();
        },
        play: function(){
            this.isPlaying = true;
            this.player[0].play();
        },
        setSound: function(soundSrc){
            this.player[0].src = soundSrc ? soundSrc : null;
            if(soundSrc){
                this.play();
            }
        }
    };

    $.player = new fh5player();
 })($);