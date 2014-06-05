
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

		// Assign color values to other inputs
		$targets.val($item.val());

		color = this.rgbToHex($targets.eq(0).val(), $targets.eq(1).val(), $targets.eq(2).val());

		$closestColorBox.css('background-color', '#'+color);
	},

	updateOverlayOpacity: function(e) {
		e.preventDefault();

		var $row1 = $('#background-color--r').val();
		var $row2 = $('#target-color--r').val();
		var $row3 = $('#overlay-color--r').val();
		var $row4 = $('#rgb-opacity').val();
		var result;

		if ($row1 && $row2 && $row3) {
			result = ($row2 - $row1) / ($row3 - $row1);
		}
		else if ($row1 && $row2 && $row4) {
			result = ($row2 - (1 - $row4) * $row1) / $row4;
		}
		else if ($row1 && $row3 && $row4) {
			result = ($row4 * $row3) + (1 - $row4) * $row1;
		}
		else if ($row2 && $row3 && $row4) {
			result = ($row2 - $row4 * row3) / (1 - $row4);
		}

		$row4.val(result * 100);
	}

};

COLOR.setup();