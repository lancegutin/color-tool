
// console.log("id: " + id);
// console.log("sColor: " + sColor);
// console.log(elem);





var COLOR = {
	rgbToHex: function (R,G,B) {
		var toHex =  function (n) {
			n = parseInt(n,10);
			if (isNaN(n)) return "00";
			n = Math.max(0,Math.min(n,255));
			return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
		};

		return toHex(R)+toHex(G)+toHex(B);
	},

	setup: function() {
		this.vars();
		this.binds();
	},

	vars: function() {
		this.$body = $('body');
		this.$options = $('.color-picker-option');
	},

	binds: function() {
		var self = this;

		this.$options.on('blur', this.updateColor.bind(this));
	},

	updateColor: function(e) {
		var $item = $(e.currentTarget);
		var className = $item.attr('class');
		var targetClassName = '.'+className.substr(className.lastIndexOf(" ") + 1);
		var $targets = $(targetClassName);
		var $closestColorBox = $targets.eq(0).parents('.form-group').find('.colorblock');
		var color = this.rgbToHex($targets.eq(0).val(), $targets.eq(1).val(), $targets.eq(2).val());

		// Assign color values to other inputs
		$targets.val($item.val());

		// Assign color to closest color box
		$closestColorBox.css('background-color', '#'+color);
	}

};

COLOR.setup();