
var COLOR = {
	rgbToHex: function (R,G,B) {
		if (!R && !G && !B) return;

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
		this.$body    = $('body');
		this.$options = $('.color-picker-option');
		this.$submit  = $('.calculate');
		this.$reset   = $('.reset');
		this.$form    = $('form');
	},

	binds: function() {
		this.$options.on('blur focus', this.updateColor.bind(this));
		this.$submit.on('click', this.updateOverlayOpacity.bind(this));
		this.$reset.on('click', this.reset.bind(this));
	},

	reset: function() {
		this.$form.each(function(){
			this.reset();
		});
		$('.colorblock').css('background-color', '#fff');
	},

	updateColor: function(e) {
		var $item            = $(e.currentTarget);
		var className        = $item.attr('class');
		var targetClassName  = '.'+className.substr(className.lastIndexOf(" ") + 1);
		var $targets          = $(targetClassName);
		var $closestColorBox = $targets.eq(0).parents('.form-group').find('.colorblock');
		var color;

		if ($item.val() > 255) $item.val(255);
		if ($item.val() < 0) $item.val(0);

		// Assign color values to other inputs
		$targets.val($item.val());

		color = this.rgbToHex($targets.eq(0).val(), $targets.eq(1).val(), $targets.eq(2).val());

		$closestColorBox.css('background-color', '#'+color);
	},

	updateOverlayOpacity: function(e) {
		e.preventDefault();

		var $row1 = $('#background-color--r');
		var $row2 = $('#target-color--r');
		var $row3 = $('#overlay-color--r');
		var $row4 = $('#rgb-opacity');
		var result;

		if ($row1.val() && $row2.val() && $row3.val()) {
			$row4.val(100*(($row2.val() - $row1.val()) / ($row3.val() - $row1.val())));
		}
		else if ($row1.val() && $row2.val() && $row4.val()) {
			$row3.val(($row2.val() - (1 - ($row4.val()/100)) * $row1.val()) / ($row4.val()/100));
		}
		else if ($row1.val() && $row3.val() && $row4.val()) {
			$row2.val((($row4.val()/100) * $row3.val()) + (1 - ($row4.val()/100)) * $row1.val());
		}
		else if ($row2.val() && $row3.val() && $row4.val()) {
			$row1.val(($row2.val() - ($row4.val()/100) * $row3.val()) / (1 - ($row4.val()/100)));
		}
	}

};

COLOR.setup();