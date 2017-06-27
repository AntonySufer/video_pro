$(document).ready(function() {
	//INITIALIZE
	var video = $('.use-video');
	var phone;


	/**
	 * [isMobile 判断平台]
	 * @param test: 0:iPhone    1:Android
	 */
	function ismobile(test) {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
			if(window.location.href.indexOf("?mobile") < 0) {
				try {
					if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
						return '0';
					} else {
						return '1';
					}
				} catch(e) {}
			}
		} else if(u.indexOf('iPad') > -1) {
			return '0';
		} else {
			return '1';
		}
	};
	phone = ismobile(1);
	if(phone == 0 || phone == "0") {
		$('.init').hide();
	} else {
		$('.init').show();
	}

	//before everything get started
	video.on('loadedmetadata', function() {

		//bind video events
		$('.videoContainer').each(function(i) {
			$(this).on('click', function() {
				    $(video).trigger("pause");//暂停所有
					$(this).find('.init').hide();
					$(this).find('.loading').fadeOut(200);
					video[i].play();
				});
			$(this).fadeIn(200);
		})

	});

	//CONTROLS EVENTS
	//video screen and play button clicked
	video.each(function(i) {
		$(this).on('click', function() {

			if(video[i].paused || video[i].ended) {
				video[i].play();
			} else {
				video[i].pause();
			}
		})
	})

	//VIDEO EVENTS
	//video canplay event
	video.on('canplay', function() {
		phone = ismobile(1);
		if(phone != 0 || phone != "0") {
			$(this).find('.loading').fadeOut(100);
		}

	});

	//video canplaythrough event
	//solve Chrome cache issue
	var completeloaded = false;
	video.on('canplaythrough', function() {
		completeloaded = true;
	});

	//video ended event
	video.each(function(i) {
	$(this).on('ended', function() {
		video[i].pause();
	});
});
	//video seeking event
	video.on('seeking', function() {
		if(!completeloaded) {
			phone = ismobile(1);
			if(phone != 0 || phone != "0") {
				$(this).find('.loading').fadeIn(100);
			}
		}
	});

	//video seeked event
	video.on('seeked', function() {
		if(!completeloaded) {
			phone = ismobile(1);
			if(phone != 0 || phone != "0") {
				$(this).find('.loading').fadeIn(100);
			}
		}
	});

	//video waiting for more data event
	video.on('waiting', function() {
		phone = ismobile(1);
		if(phone != 0 || phone != "0") {
			$(this).find('.loading').fadeIn(100);
		}
	});


	//离开页面 暂停所有
	window.onbeforeunload = function() {
		$(video).trigger("pause");//暂停所有
	}

});