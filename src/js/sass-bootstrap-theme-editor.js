/**
 * @author Daniel Samson
 * @license MIT
 * @version 1.0
 * https://github.com/daniel-samson/sass-bootstrap-theme-editor
 */
(function ($) {
  /**
   * sassBootstrapThemeEditor
   * @param options
   * @returns {jQuery}
   */
  $.fn.sassBootstrapThemeEditor = function (options) {
    "use strict";
    var self = this;

    if (jQuery.fn.farbtastic === "undefined") {
      console.error('sassBootstrapThemeEditor - Missing Dependency Required: Farbtastic Color Picker 1.2');
      return self;
    }

    if (Sass === "undefined") {
      console.error('sassBootstrapThemeEditor - Missing Dependency Required: Sass.js');
      return self;
    }

    var opts = $.extend({}, $.fn.messageBox.defaults, options);

    self.construct = function () {
      "use strict";
    }

    self.destruct = function () {
      "use strict";
    }

    self.construct();
    $(self).on('remove', self.destruct);
  };

  /**
   * Defaults
   * @type {{}}
   */
  $.fn.sassBootstrapThemeEditor.defaults = {}
}(jQuery));