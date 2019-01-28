(function ($) {
	var body = $('body');
		var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	$(window).on("load", function () {

		if(!isMobile.any()) {
			$(".scrollon").mCustomScrollbar({
				axis: "y",
				scrollButtons: {
					enable: true
				},
				theme: "minimal-dark",
				//scrollbarPosition: "outside",
				setHeight: 640,
				alwaysShowScrollbar: 2,
				//	theme:"minimal-dark"
				//	scrollInertia: 300,
			});


		$("#accordion .panel-body").mCustomScrollbar({
			setHeight: 300,
			theme: "dark-3"
		});

		$("#myTab .tab-pane").mCustomScrollbar({
			setHeight: 280,
			theme: "inset-2-dark"
		});


		$(".scrollTo a").click(function () {
			if ($(this).attr('href') == "#top") {
				//this bit is for wordpress, where top is default: .entry-title
				var elID = ".entry-title";
				$(".scrollon").mCustomScrollbar("scrollTo", elID);
			} else {
				if ($(this).attr('href').indexOf("#") >= 0) {
					//this bit is for any other anchor
					$(".scrollon").mCustomScrollbar("scrollTo", $(this).attr('href'));
				}
			}
		});

		}//isMobile

		$('.delete, .modal-background').click(function () {
			$('.modal').removeClass('is-active');
		});
		
		$('.loading-spinner').css('display', 'none');

	}); //window on load

	function makeThumb(data) {
		console.log('dd');
		$(data).each(function (index, value) {
			var html = '<div class="mix ' + value.category + '" id="ctl-' + value.id + '">';
			html += '<div class="thumb-container"><img src="' + value.img1 + '" alt=""></div>';
			html += '<div class="portfolio-description">';
			html += '<p class="ti-subject">' + value.title + '</p>';
			html += '<p class="ti-period">' + value.period + '</p>';
			html += '<p class="ti-desc">' + value.category + '</p>';
			html += '</div>';
			html += '</div>';
			$('#port-folio').append(html);
		});
	}

	function makePop() {
		$('.mix').each(function (n) {
			var kid = $(this).attr('id').replace('ctl-', '');

			$(this).on('click', function (e) {
				$.ajax({
					url: 'data.json',
					dataType: 'json',
					type: 'get',
					cache: false,
					success: function (data) {
						$('.aja').remove();
						$(data).each(function (n, val) {
							if (val.id == kid) {
								$('.modal-card-title').text(val.title);

								var html = '<div class="aja">';
								html += '<p class="tech"><strong>기술:</strong><br>' + val.teck + '</p>';
								html += '<p class="tech"><strong>담당:</strong><br>' + val.charge + '</p>';
								html += '<p class="desc"><strong>내용:</strong><br>' + val.description + '</p>';
								html += (val.url.length != 0) ? '<p class="url"><strong>링크:</strong><br><a href="' + val.url + '" target="_blank">' + val.url + '</a></p>' : '<p><strong>서비스 종료(중지)</strong></p>';
								html += (val.img2.length != 0) ? '<p><img src="' + val.img2 + '"></p>' : '';
								html += (val.img3.length != 0) ? '<p><img src="' + val.img3 + '"></p>' : '';
								html += '';
								html += '</div>';

								$('.modal-card-body').append(html).animate({
									scrollTop: 0
								}, 100);
								$('.modal').addClass('is-active');

							}

						});

					}
				});

			});
		});
	}


	function mixin() {
		var containerEl = document.querySelector('.portfolio');
		var mixer = mixitup(containerEl, {
			animation: {
				effects: 'fade',
				animateResizeContainer: false
			}
		});
	}

	$.ajax({
		url: 'data.json',
		dataType: 'json',
		type: 'get',
		cache: false,
		success: function (data) {
			makeThumb(data);
			makePop();
			mixin();

		}
	});
	
	
	
	
	function alertTime() {
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		hours = (hours>12) ? hours - 12 : hours;
		hours = (hours<10) ? '0'+hours : hours;
		minutes = (minutes<10) ? '0'+minutes : minutes;
		seconds = (seconds<10) ? '0'+seconds : seconds;
		$('.kk3').text(hours +':'+ minutes +':'+ seconds);
	}

	setInterval(alertTime, 1000);
	
	
	
	

})(jQuery);