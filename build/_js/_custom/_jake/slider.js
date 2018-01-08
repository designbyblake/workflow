module.exports = function(event) {

	var master = this;
	var runner = {};
	var action, prevent, alwaysOpen, $cntnr, $group, $open;

/* ==========================================================================
	Get Some Vars
	========================================================================= */

	// .is() over .hasClass() for SVG support :(
	action = $(this).is(".slider-trigger") ? "toggleClass" : false;
	action = !action && $(this).is(".slider-close") ? "removeClass" : action;
	action = !action && $(this).is(".slider-open") ? "addClass" : action;

	$cntnr = $(this).data("slider-cntnr") ? $( $(this).data("slider-cntnr") ) : $(this).closest(".slider-group");
	$group = $cntnr.data("group") ? $( $cntnr.data("group") ) : false;

	prevent    = $cntnr.is("[data-no-prevent]") ? false : true;
	alwaysOpen = $group && $group.is("[data-always-open]") ? true : false;

/* ==========================================================================
	Transition Detection
	========================================================================= */

	function whichTransitionEvent(){
		var t,
			el = document.createElement("fakeelement");

		var transitions = {
			"transition"      : "transitionend",
			"OTransition"     : "oTransitionEnd",
			"MozTransition"   : "transitionend",
			"WebkitTransition": "webkitTransitionEnd"
		}

		for (t in transitions){
			if (el.style[t] !== undefined){
				return transitions[t];
			}
		}
	}

	var transitionEvent = whichTransitionEvent();

/* ==========================================================================
	Runner
	========================================================================= */

	runner.run = function($cntnr, action) {

		var self = this;
	
/* ==========================================================================
	Var Setup
	========================================================================= */

		this.action  = action;
		this.prevent = prevent;
		this.$cntnr  = $cntnr;
		this.type    = this.$cntnr.data("slide");
		this.$target = this.$cntnr.find("> .slider-target");

/* ==========================================================================
	Make a Clone for Size Comparisons
	========================================================================= */

		this.makeClone = function() {
			self.$clone = self.$cntnr.clone();
			self.$clone.css({
				display:    'block',
				position:   'fixed',
				visibility: 'hidden',
			});

			self.$clone.appendTo("body");
			self.$cloneTarget = self.$clone.find(".slider-target");
		};

/* ==========================================================================
	Animation Types
	========================================================================= */

		this.vertical = function() {
			// First explicitly set our current height
			self.$target.height(self.$cloneTarget.outerHeight());
			
			self.$clone.css({
				width: self.$cntnr.width(),
			});

			// Then toggle the class, and set our new height
			self.$clone[self.action]("open");
			var height = self.$cloneTarget.outerHeight();
			self.$target.height(height);
		};

		this.horizontal = function() {
			// First explicitly set our current width
			self.$target.width(self.$cloneTarget.outerWidth());
			
			// Then toggle the class, and set our new width
			self.$clone[self.action]("open");
			var width = self.$cloneTarget.outerWidth();
			self.$target.width(width);
		};

/* ==========================================================================
	Callable Funcs
	========================================================================= */

		this.toggle = function() {
			self.$cntnr.toggleClass("open");
		};

		this.open = function() {
			self.$cntnr.addClass("open");
		};

		this.close = function() {
			self.$cntnr.removeClass("open");
		};

/* ==========================================================================
	Utility
	========================================================================= */

		this.cleanup = function() {
			self.$clone.remove();
		};

/* ==========================================================================
	Do the thing.
	========================================================================= */

		this.prevent && event.preventDefault();

		self.$target.one(transitionEvent, function(event) {
			$(this).removeClass("animating").removeAttr("style");
		});

		this.makeClone();
		this.$target.addClass("animating");
		this[this.type].call();

		this.$cntnr[self.action]("open");
		this.$cntnr.trigger(self.action, [this.$target]);

		this.cleanup();

	};

/* ==========================================================================
	Do the Things
	========================================================================= */

	if ($group) {

		var $open = $group.find(".open");
		if (alwaysOpen) {
			if ($open.length && $open.get(0) !== $cntnr.get(0)) {
				runner.run($cntnr, action);
				runner.run($open, "removeClass");
			}
		} else {
			if ($open.length && $open.get(0) !== $cntnr.get(0)) {
				runner.run($open, "removeClass");
			}	
			runner.run($cntnr, action);
		}

	} else {
		runner.run($cntnr, action);
	}
};