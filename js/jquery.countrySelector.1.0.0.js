(function ($) {
    var defaults = {
        countries: [],
        value: null,
        onSelected: function (country) { }
    };

    var methods = {
        init: function (options) {
            var opts = $.extend({}, $.fn.countrySelector.defaults, options);

            return this.each(function () {
                var $this = $(this);
                var data = $this.data('countrySelector');

                if (!data) {
                    $this.data('countrySelector', {
                        options: opts
                    });
                    $.each(opts.countries, function (i, country) {
                        $this.append($('<div class="cflag" title="' + country + '""></div>')
                            .css('background-image', 'url("css/country-flags/' + country + '.png")')
                            .data('country', country).click(function () {
                                if ($(this).hasClass('cflag-selected'))
                                    return;
                                $('.cflag-selected').removeClass('cflag-selected');
                                $(this).addClass('cflag-selected');
                                opts.onSelected.call(this, $(this).data('country'));
                            }));
                    });
                    if (opts.value)
                        $('.cflag-' + opts.value + '').addClass('cflag-selected');
                }
            });
        },

        value: function (country) {
            if (country) {
                return this.each(function () {
                    $('.cflag-selected').removeClass('cflag-selected');
                    $('.cflag-' + country + '').addClass('cflag-selected');
                });
            }
            else {
                return $('.cflag-selected').data('country');
            }
        }
    }

    $.fn.countrySelector = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.countrySelector');
        }
    }
})(jQuery);