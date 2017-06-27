# video_pro
videojs 视频播放，支持移动端

#js代码

---js
var video_page ={
      init:function(){
		  var _this = this ;
	     var vodeoUrl =_this.GetQueryString('videoUrl');
		 var imghref =_this.GetQueryString('imghref');
		 var heights =window.screen.height-100;
		 var widths =window.screen.width;
		 //填充视频video
		 var inhtml =' <video id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered " controls  poster="'+imghref+'" data-setup="{}">'
		         	+'  <source src="'+vodeoUrl+'" type="video/mp4" /></video>';
		 $('#con').html(inhtml);			 
		 var myPlayer = videojs('example_video_1');
		$('#con').height(window.screen.height-200+"px");
		$('#example_video_1').height(heights+"px");
		$('#example_video_1').width(widths+"px");
		$('#example_video_1').attr('poster',imghref);
	    var myPlayers;
        videojs("example_video_1").ready(function(){
            myPlayers = this;
			myPlayers.width(widths);
			myPlayers.height(heights);
			myPlayers.src(vodeoUrl);
			myPlayers.load(vodeoUrl);
            myPlayers.play();
        });
        
		//播放按钮
		$('.vjs-big-play-button').css('top','50%');

		$('.top').on('click',function(){
		 $("#example_video_1").remove();//暂停所有
		   myPlayers.pause();
		   history.back();
	    })

		//离开页面 暂停所有
		window.onbeforeunload = function() {
			myPlayers.pause();
			$("#example_video_1").remove();//暂停所有
		
		}
	  },
	  GetQueryString:function(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
		 if(r!=null)return  unescape(r[2]); return null;
	  }
 }

 //执行
 video_page.init();

---js
