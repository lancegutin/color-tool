
var COLOR = {
	showError: function() {
		this.$error.fadeIn();
	},

	hideError: function() {
		this.$error.fadeOut();
	},

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

		this.$error.hide();
	},

	vars: function() {
		this.$body    = $('body');
		this.$blocks  = $('.colorblock');
		this.$options = $('.color-picker-option');
		this.$submit  = $('.calculate');
		this.$reset   = $('.reset');
		this.$form    = $('form');
		this.$error   = $('.error');
	},

	binds: function() {
		this.$options.on('blur focus', this.updateColor.bind(this));
		this.$blocks.on('change', function(){alert('awesome');});
		this.$submit.on('click', this.calculate.bind(this));
		this.$reset.on('click', this.reset.bind(this));
	},

	reset: function() {
		this.$error.fadeOut();
		this.$form.each(function(){
			this.reset();
		});
		this.$blocks.css('background-color', '#fff');
	},

	updateColor: function(e) {
		var $item = $(e.currentTarget);

		if ($item.val() != '') {
			var className        = $item.attr('class');
			var targetClassName  = '.' + className.substr(className.lastIndexOf(" ") + 1);
			var $targets         = $(targetClassName);
			var $closestColorBox = $targets.eq(0).parents('.form-group').find('.colorblock');
			var color;

			if ($item.val() > 255) $item.val(255);
			if ($item.val() < 0) $item.val(0);

			// Assign color values to other inputs
			$targets.val(Math.round($item.val()));

			color = this.rgbToHex($targets.eq(0).val(), $targets.eq(1).val(), $targets.eq(2).val());

			$closestColorBox.css('background-color', '#'+color);
		}
	},

	calculate: function(e) {
		e.preventDefault();

		var $row1 = $('#background-color--r').parents('.form-group').find('.color-picker-option');
		var $row2 = $('#target-color--r').parents('.form-group').find('.color-picker-option');
		var $row3 = $('#overlay-color--r').parents('.form-group').find('.color-picker-option');
		var $row4 = $('#rgb-opacity');
		var result;

		if ($row1.val() && $row2.val() && $row3.val()) {
			$row4.val(100*(($row2.val() - $row1.val()) / ($row3.val() - $row1.val())));
		}
		else if ($row1.val() && $row2.val() && $row4.val()) {
			$row3.val(Math.round(($row2.val() - (1 - ($row4.val()/100)) * $row1.val()) / ($row4.val()/100)));
			$row3.trigger('blur');
		}
		else if ($row1.val() && $row3.val() && $row4.val()) {
			$row2.val(Math.round((($row4.val()/100) * $row3.val()) + (1 - ($row4.val()/100)) * $row1.val()));
			$row2.trigger('blur');
		}
		else if ($row2.val() && $row3.val() && $row4.val()) {
			$row1.val(Math.round(($row2.val() - ($row4.val()/100) * $row3.val()) / (1 - ($row4.val()/100))));
			$row1.trigger('blur');
		}

		if (
			($row1.val() > 255 || $row1.val() < 0) ||
			($row2.val() > 255 || $row2.val() < 0) ||
			($row3.val() > 255 || $row3.val() < 0) ||
			($row4.val() > 100 || $row4.val() < 0)
		) {
			this.showError();
		} else {
			this.hideError();
		}
	}

};

COLOR.setup();