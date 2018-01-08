/* Start from Jake Group */
//require('./jake_plugins');
	// var slider = require("./slider"); 
	var events = require("./events");

	events.init();
/* ==========================================================================
	Init
	========================================================================= */

	$(function() {
		// Scrollclasses
		//$("html, body").scroll();

		// GA Event Framework
		events.attach();
	}); 

/* ==========================================================================
	Mobile Tester
	========================================================================= */

	var isSmall = function() {
		return $(window).width() < 1000;
	};

/* ==========================================================================
	Fixed Site Header // Fixed Carousel
	========================================================================= */

	//if (!isSmall()) {
		// $(".primary-header").scrollClass({
		// 	className: "fixed",
		// 	condition: function(scroll) {
		// 		return $(".utility-header").outerHeight() < scroll;
		// 	}
		// })
	
	// 	$("body.home").scrollClass({
	// 		className: "show-olark",
	// 		condition: function(scroll) {
	// 			return 150 < scroll;
	// 		}
	// 	});
	// }

/* ==========================================================================
	Slider Controls
	========================================================================= */

	// $(".slider-trigger").on("click", slider);
	// $(".slider-close").on("click", slider);
	// $(".slider-open").on("click", slider);

	$(".form-switcher .slider-trigger").on("click", function() {
		$(this).closest(".form-switcher").find(".active").removeClass("active");
		$(this).addClass("active");
	});

/* ==========================================================================
	Features Scroll
	========================================================================= */

	$("#features-scroll").on("click", function(event) {
		event.preventDefault();
		$(".scroll-over").elScroll({
			offset: $(".primary-header").outerHeight()
		});
	});

/* ==========================================================================
	Mobile
	========================================================================= */

	$(".collapsing-nav-trigger").on("click", function(event) {
		event.preventDefault();
		$(this).closest(".collapsing-nav").toggleClass("open");
	});

/* ==========================================================================
	Subnav
	========================================================================= */
	
	$(".subnav-toggle").on("click", function(event) {
		event.preventDefault();
		var $nav = $(this).next(".subnav")
		var toggle = function() {
			$(document).one("click.subnav", function(event) {
				$nav.removeClass("open");
			}); 
		}

		if ($nav.hasClass("open")) {
			$(document).off(".subnav");
			$nav.removeClass("open");
		} else {
			$nav.addClass("open");
			setTimeout(toggle, 0);
		}
	});

/* ==========================================================================
	Tooltips
	========================================================================= */
	// $(function () {
	// 	$('[data-toggle="tooltip"]').tooltip()
	// });
/* End from Jake Group */