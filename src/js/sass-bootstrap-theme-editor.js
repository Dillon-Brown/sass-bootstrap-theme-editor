/**
 * @author Daniel Samson
 * @license MIT
 * @version 1.0
 * https://github.com/daniel-samson/sass-bootstrap-theme-editor
 */
(function ($) {
  /**
   * sassBootstrapThemeEditor
   * @param options object
   * @returns {jQuery}
   */
  $.fn.sassBootstrapThemeEditor = function (options) {
    "use strict";
    var self = this;

    if (typeof jQuery.fn.farbtastic === "undefined") {
      console.error('sassBootstrapThemeEditor - Missing Dependency Required: Farbtastic Color Picker 1.2');
      return self;
    }

    if (typeof Sass === "undefined") {
      console.error('sassBootstrapThemeEditor - Missing Dependency Required: Sass.js');
      return self;
    }

    if (typeof $.fn.dialog === "undefined") {
      console.error('sassBootstrapThemeEditor - Missing Dependency Required: JQuery UI Dialog');
      return self;
    }
    if (typeof(Storage) === "undefined") {
      console.error('sassBootstrapThemeEditor - Missing Dependency Required: Local Storage');
    }

    self.id = '';
    self.controls = {};
    self.themeGraph = {};

    var opts = $.extend({}, $.fn.sassBootstrapThemeEditor.defaults, options);

    /**
     * Create a unique id
     * @returns {string}
     */
    self.generateUUID = function () {
      "use strict";
      var d = new Date().getTime();
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    };

    /**
     * Translate label
     * @param label string
     * @returns string
     */
    self.getLabel = function (label) {
      "use strict";
      return label;
    };

    /**
     *
     * @param input string
     * @returns {string|void}
     */
    self.removeSingleLineComments = function(input) {
      "use strict";
      return input.replace(/(\/\/*[^]*?)([\r\n])/g, '');
    };

    /**
     *
     * @param input string
     * @returns {string|void}
     */
    self.removeMultiLineComments = function(input) {
      "use strict";
      return input.replace(/\/\*[^]*?\*\//g, '');
    };

    /**
     *
     * @param input string
     * @returns {string|void}
     */
    self.removeBlankLines = function (input) {
      "use strict";
      return input.replace(/^\s*[\r\n]/gm,'');
    }

    self.removeReturns = function (input) {
      "use strict";
      return input.replace(/[\r\n]/g,'');
    }

    /**
     * @param path string
     */
    self.loadSassFile = function(path) {
      "use strict";
      $.when( $.ajax( path ) ).then(function( data, textStatus, jqXHR ) {
        if(jqXHR.status >= 200 && jqXHR.status < 300) {
          var sass_data = data;
          self.parseSassFile(path, sass_data);
        }
      });
    };

    /**
     * @param path string
     * @param data string
     * @returns boolean
    */
    self.parseSassFile = function(path, data) {
      "use strict";
      var sass_data = self.removeMultiLineComments(data);
      sass_data = self.removeSingleLineComments(sass_data);
      sass_data = self.removeBlankLines(sass_data);
      sass_data = self.removeReturns(sass_data);
      // break file into scopes
      var preProcess = function (scope_data) {
        "use strict";
          // Pre processing
          var lines = scope_data.split(/([:a-zA-z\d\$\@\(\)\;\-\#\%\"\'\&\_\.\,\ \+\*]+)/gm);
          var retScopes = [];
          // Fixes
          for (var i = 0; i < lines.length; i++) {
            
            lines[i] = lines[i].trim();

            if (lines[i].match(/^([\}]{2,})/g) !== null) {
              // handle multiple }} in the same item
              var torn = lines[i].match(/(\})/g);
              for (var t = 0; t < torn.length; t++) {
                retScopes.push('}');
              }
            } else if (lines[i] === '{') {
              // Check to see if the selector name is inline with other properties
              // eg width: 100; .selector 
              var selectorLine = lines[i - 1];

              if (selectorLine.match(/([;])/g) !== null) {
                // remove last elemtn from retScopes
                // as it inclused the inline issue described earlier
                retScopes.pop();

                // split the properties from the selector
                var exploded = selectorLine.split(/([;])/g);
                // add each line to the result
                var seperatedProperties = exploded.splice(0, exploded.length - 1).join("");
                retScopes.push(seperatedProperties);
                var sepratedSelector = exploded[exploded.length - 1];
                retScopes.push( sepratedSelector );
                retScopes.push(lines[i]);
              } else {
                retScopes.push(lines[i]);
              }
            } else if(lines[i].trim() !== "") {
              retScopes.push(lines[i]);
            }
          }

          return retScopes;
      };

      var scopes = [];
        // build scope
        var buildScopes = function (scope_data_array) {
          "use strict";
          // Process
          // ignore items with just whitespace in them
          // if ends in ; === property/properties
          // if has { create child scope buildScopes(child_data)
          // break out properties and trim off the whitespace at the beginning and ends.

          var stack = [];
          // for(var i = 0; i < scope_data_array.length; i++) {
          //   if(scope_data_array[i] === "") {
          //     continue;
          //   } else if(scope_data_array[i].indexOf('{') !== -1) {
          //     // Process / Build Scope
          //     // handle one liners like a {color: black;}
          //   } else if(scope_data_array[i].indexOf(';') !== -1) {
          //     // Process properties
          //   }
          // }
          // Return result
          var builtScope = {};
         if(opts.debug === true) {
           builtScope = {
             "children": [],
             "path": "",
             "source": scope_data_array,
           };
         } else {
           builtScope = {
             "path": "",
             "children": []
           };
         }

          return builtScope;
        };

        scopes.push(buildScopes(preProcess(sass_data)));


      // Parse sass
      // @import = self.loadSassFile
      // @mix-in = store like a scope
      // @include = reference @mix-in
      // detect css properties
      if(typeof self.themeGraph.parsed === "undefined") {
        self.themeGraph.parsed = [];
      }

      // Return result
      var result = {};
      if(opts.debug === true) {
        result = {
          "path": path,
          "source": sass_data,
          "children": scopes,
        };
      } else {
        result = {
          "path": path,
          "children": scopes
        };
      }

      self.themeGraph.parsed.push(result);
      console.log('sassBootstrapThemeEditor themeGraph: ', self.themeGraph);
      sessionStorage.setItem('sassBootstrapThemeEditor', JSON.stringify(self.themeGraph));
      return true;
    };
    
    /**
     * Builds a JSON structure
     * then stores it in sessionStorage
     * then initialises editor
     */
    self.buildThemeGraph = function() {
      "use strict";
      self.themeGraph = {};
      var sass_index_path = opts.paths.sass_path +  opts.paths.index + opts.paths.file_extension;
      self.loadSassFile(sass_index_path);
      console.log('sassBootstrapThemeEditor - setting sessionStorage');
    };

    /**
     * loads themeGraph JSON in sessionStorage
     * then initialises editor
     */
    self.loadThemeGraph = function() {
      "use strict";
      if(opts.debug === true) {
        self.buildThemeGraph();
      } else {
        self.themeGraph = $.parseJSON(sessionStorage.getItem('sassBootstrapThemeEditor'));
      }
      console.log("themeGraph", self.themeGraph);
      console.log('sassBootstrapThemeEditor - loading sessionStorage');
    };

    /**
     * @constructor
     */
    self.construct = function () {
      "use strict";
      var isSassBootstrapThemeEditor = $(self).attr('sassBootstrapThemeEditor');
      if (typeof isSassBootstrapThemeEditor === typeof undefined) {
        self.id = self.generateUUID();
        $(self).attr('sassBootstrapThemeEditor', self.id);

        // Construct User Interface
        self.controls.dialog = $('<div></div>');
        if(typeof self.parent() !== 'undefined') {
          self.controls.dialog.appendTo(self.parent());
        } else {
          self.controls.dialog.appendTo('body');
        }

        self.controls.editor_container = $("<div></div>");
        self.controls.editor_container.attr('id', self.id);
        self.controls.editor_container.addClass('sass-theme-editor');
        self.controls.editor_container.appendTo(self.controls.dialog);

        self.controls.dialog.dialog();
        self.controls.dialog.dialog("option", "width", 420);
        self.controls.dialog.dialog("option", "height", 380);

        self.controls.editor_widget = $('<div></div>');
        self.controls.editor_widget.attr('id', 'editor_widget_' + self.id);
        self.controls.editor_widget.addClass('editor_widget');
        self.controls.editor_widget.appendTo(self.controls.editor_container);

        self.controls.editor_variable_select_container = $('<div></div>');
        self.controls.editor_variable_select_container.attr('id', 'editor_variable_select_container_' + self.id);
        self.controls.editor_variable_select_container.addClass('editor_variable_select_container');
        self.controls.editor_variable_select_container.appendTo(self.controls.editor_widget);

        self.controls.editor_variable_select_input = $('<select>');
        self.controls.editor_variable_select_input.attr('id', 'editor_variable_select_input_' + self.id);
        self.controls.editor_variable_select_input.addClass('editor_variable_select_input');
        self.controls.editor_variable_select_input.addClass('form_control');
        $('<label for="'+self.controls.editor_variable_select_input.attr('id')+'">'+self.getLabel('LBL_THEME_EDITOR_VARIABLE_SELECT_INPUT')+'</label>').appendTo(self.controls.editor_variable_select_container);
        self.controls.editor_variable_select_input.appendTo(self.controls.editor_variable_select_container);

        self.controls.editor_color_picker_container = $('<div></div>');
        self.controls.editor_color_picker_container.attr('id', 'editor_color_picker_container_' + self.id);
        self.controls.editor_color_picker_container.addClass('editor_color_picker_container');
        self.controls.editor_color_picker_container.appendTo(self.controls.editor_widget);

        self.controls.editor_color_value = $('<input>');
        self.controls.editor_color_value.attr('id', 'editor_color_value_' + self.id);
        self.controls.editor_color_value.addClass('editor_color_value');
        self.controls.editor_color_value.addClass('form-control');
        $('<label for="'+self.controls.editor_color_value.attr('id')+'">'+self.getLabel('LBL_THEME_EDITOR_COLOR_VALUE')+'</label>').appendTo(self.controls.editor_color_picker_container);
        self.controls.editor_color_value.appendTo(self.controls.editor_color_picker_container);

        self.controls.editor_color_preview = $('<div><span class="glyphicon glyphicon-refresh"></span></div>');
        self.controls.editor_color_preview.attr('id', 'editor_color_preview_' + self.id);
        self.controls.editor_color_preview.addClass('editor_color_preview');
        self.controls.editor_color_preview.appendTo(self.controls.editor_color_picker_container);

        self.controls.editor_color_picker = $('<div></div>');
        self.controls.editor_color_picker.attr('id', 'editor_color_picker_' + self.id);
        self.controls.editor_color_picker.addClass('editor_color_picker');
        self.controls.editor_color_picker.appendTo(self.controls.editor_color_picker_container);

        self.controls.editor_color_picker_reset = $('<button class="btn btn-danger">'+self.getLabel('LBL_THEME_EDITOR_RESET_COLOR')+'</button>');
        self.controls.editor_color_picker_reset.attr('id', 'editor_color_picker_reset_' + self.id);
        self.controls.editor_color_picker_reset.addClass('editor_color_picker_reset');
        self.controls.editor_color_picker_reset.appendTo(self.controls.editor_color_picker_container );

        self.controls.editor_color_value_container = $('<div></div>');
        self.controls.editor_color_value_container.attr('id', 'editor_color_value_container_' + self.id);
        self.controls.editor_color_value_container.addClass('editor_color_value_container');
        self.controls.editor_color_value_container.appendTo(self.controls.editor_color_picker_container);

        self.controls.editor_size_slider_container = $('<div></div>');
        self.controls.editor_size_slider_container.attr('id', 'editor_size_slider_container_' + self.id);
        self.controls.editor_size_slider_container.addClass('editor_size_slider_container');
        self.controls.editor_size_slider_container.appendTo(self.controls.editor_widget);

        self.controls.editor_size_value_container = $('<div></div>');
        self.controls.editor_size_value_container.attr('id', 'editor_size_value_container_' + self.id);
        self.controls.editor_size_value_container.addClass('editor_size_value_container');
        self.controls.editor_size_value_container.appendTo(self.controls.editor_size_slider_container);

        self.controls.editor_size_value = $('<input>');
        self.controls.editor_size_value.attr('id', 'editor_size_value_' + self.id);
        self.controls.editor_size_value.addClass('editor_size_value');
        self.controls.editor_size_value.addClass('form-control');
        $('<label for="'+self.controls.editor_size_value.attr('id')+'">'+self.getLabel('LBL_THEME_EDITOR_SIZE_VALUE')+'</label>').appendTo(self.controls.editor_size_value_container);
        self.controls.editor_size_value.appendTo(self.controls.editor_size_value_container);

        self.controls.editor_size_slider = $('<div></div>');
        self.controls.editor_size_slider.attr('id', 'editor_size_slider_' + self.id);
        self.controls.editor_size_slider.addClass('editor_size_slider');
        self.controls.editor_size_slider.appendTo(self.controls.editor_size_slider_container);

        self.controls.editor_size_reset = $('<button class="btn btn-danger">'+self.getLabel('LBL_THEME_EDITOR_RESET_SIZE')+'</button>');
        self.controls.editor_size_reset.attr('id', 'editor_size_reset_reset_' + self.id);
        self.controls.editor_size_reset.addClass('editor_size_reset_reset');
        self.controls.editor_size_reset.appendTo(self.controls.editor_size_slider_container );

        self.controls.editor_size_refresh = $('<button class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span></button>');
        self.controls.editor_size_refresh.attr('id', 'editor_size_refresh_' + self.id);
        self.controls.editor_size_refresh.addClass('editor_size_reset_reset');
        self.controls.editor_size_refresh.appendTo(self.controls.editor_size_slider_container );


        self.controls.editor_apply_style = $("<style></style>");
        self.controls.editor_apply_style.attr('id', 'editor_apply_style_'+self.id);
        self.controls.editor_apply_style.appendTo(self.controls.editor_container);

        self.controls.editor_loader_container = $('<div></div>');
        self.controls.editor_loader_container.attr('id', 'editor_loader_container_' + self.id);
        self.controls.editor_loader_container.addClass('editor_loader_container');
        self.controls.editor_loader_container.addClass('hidden');
        self.controls.editor_loader_container.appendTo(self.controls.editor_widget);

        self.controls.editor_loader = $('<div>'+self.getLabel('LBL_THEME_EDITOR_COMPILING')+'</div>');
        self.controls.editor_loader.attr('id', 'editor_loader_' + self.id);
        self.controls.editor_loader.addClass('editor_loader');
        self.controls.editor_loader.appendTo(self.controls.editor_loader_container);
      }

      if(sessionStorage.getItem('sassBootstrapThemeEditor') === null) {
        self.buildThemeGraph();
      } else {
        self.loadThemeGraph();
      }
      console.log('sassBootstrapThemeEditor - config ', opts);
    };

    /**
     * @destructor
     */
    self.destruct = function () {
      "use strict";
    }

    self.construct();
    $(self).on('remove', self.destruct);
    return self;
  };

  /**
   * Defaults
   * @type {{}}
   */
  $.fn.sassBootstrapThemeEditor.defaults = {
    "paths": {
      "sass_path": "bower_components/bootstrap/scss/",
      "index": "_badge",
      "variables": "_variables",
      "file_prefix": '_',
      "file_extension": '.scss'
    },
    "debug": true
  }
}(jQuery));