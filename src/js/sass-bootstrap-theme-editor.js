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
    self.removeSingleLineComments = function (input) {
      "use strict";
      return input.replace(/^(\/{2,}[^]*?[\r\n])/gm, '')
        .replace(/(?!:|;).(\/{2,}[^]*?[\r\n])/gm, '')
        .replace(/(\;\/{2,}[^]*?[\r\n])/gm, ';');
      // return input.replace(/(\/\/[^]*?)([\r\n])/g, '');
    };

    /**
     *
     * @param input string
     * @returns {string|void}
     */
    self.removeMultiLineComments = function (input) {
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
      return input.replace(/^\s*[\r\n]/gm, '');
    };

    /**
     *
     * @param input
     * @returns {XML|void|string}
     */
    self.removeReturns = function (input) {
      "use strict";
      return input.replace(/[\r\n]/g, '');
    };

    self.removeWarnDirectives = function(input) {
      "use strict";
      return input.replace(/(@warn[^]*?[;])/gm, '');
    };

    self.removeErrorDirectives = function(input) {
      "use strict";
      return input.replace(/(@error[^]*?[;])/gm, '');
    };

    self.removeDebugDirectives = function(input) {
      "use strict";
      return input.replace(/(@debug[^]*?[;])/gm, '');
    };


    /**
     *
     * @param path
     * @param file
     * @returns {*}
     */
    self.loadSassFile = function (path, file) {
      "use strict";
      var response = $.ajax({"url": path, async: false});
      var parsedFile = self.parseSassFile(file, response.responseText);
      self.themeGraph.parsed.push(parsedFile);

    };

    /**
     * @param path string
     * @param data string
     * @returns boolean
     */
    self.parseSassFile = function (path, data) {
      "use strict";
      // "Minify"
      var sass_data = self.removeMultiLineComments(data);
      // This method is known to cause issues:
      sass_data = self.removeSingleLineComments(sass_data);
      sass_data = self.removeBlankLines(sass_data);
      sass_data = self.removeReturns(sass_data);
      sass_data = self.removeWarnDirectives(sass_data);
      sass_data = self.removeErrorDirectives(sass_data);
      sass_data = self.removeDebugDirectives(sass_data);

      // break file into scopes
      var preProcess = function (scope_data) {
        "use strict";
        // Pre processing
        var lines = scope_data.split(/([\{][\$][:a-zA-z\d\$\@\(\)\;\-\#\%\"\'\&\_\.\,\ \+\*]+\}|[:a-zA-z\d\$\@\(\)\;\!\-\#\%\"\'\&\_\.\,\ \+\*\/\=\>\<\~]+)/gm);
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
            // TODO: handle selectors like .t{$v} { and inline eg a { prop: val; }
            // Check to see if the selector name is inline with other properties
            // eg width: 100; .selector
            var selectorLine = lines[i - 1];

            if (selectorLine.match(/([;])/g) !== null) {
              // remove last element from retScopes
              // as it inclused the inline issue described earlier
              retScopes.pop();

              // split the properties from the selector
              var exploded = selectorLine.split(/([;])/g);
              // add each line to the result
              var seperatedProperties = exploded.splice(0, exploded.length - 1).join("");
              retScopes.push(seperatedProperties);
              var sepratedSelector = exploded[exploded.length - 1];
              retScopes.push(sepratedSelector);
              retScopes.push(lines[i]);
            } else {
              retScopes.push(lines[i]);
            }
          } else if (lines[i].trim().match(/([\{][\$])([:a-zA-z\d\$\@\(\)\;\-\#\%\"\'\&\_\.\,\ \+\*]+)(\})/g) !== null) {
            // debugger;
            // handle selectors like .t-{$variable} {
            // this mostly occurs with mix ins
            var sassVariable = lines[i].trim();
            // correct selector
            retScopes[retScopes.length - 1] = retScopes[retScopes.length - 1] + sassVariable;
            // check for stacked selectors
            // with ,
            var lastLine = retScopes[retScopes.length - 1];
            if (lastLine.trim().indexOf(',') == 0) {
              retScopes.pop();
              retScopes[retScopes.length - 1] = retScopes[retScopes.length - 1] + lastLine;
            }
          } else if (lines[i].trim() !== "") {
            retScopes.push(lines[i]);
          }
        }

        return retScopes;
      };

      // build scope
      var parseSass = function (scope_data_array, is_file, cache_level) {
        "use strict";
        // Process
        if (typeof is_file === "undefined") {
          is_file = false;
        }
        ;
        if (typeof cache_level === "undefined") {
          cache_level = 'property';
        }
        ;
        /**
         * @parm scope_data pass in scope_data_array
         * @parm starting_of_line = the line === '{'
         * @returns the line the with the correct }
         */
        var getClosureScope = function (scope_data, starting_of_line) {
          "use strict";
          var stack = 0;
          var line = starting_of_line;
          for (var i = starting_of_line; i < scope_data.length; i++) {
            if (scope_data[i] === '{') {
              stack++;
            } else if (scope_data[i] === '}') {
              stack--;
            }

            if (stack <= 0) {
              break;
            }
            line++;
          }
          return line;
        }

        var newScope = function () {
          "use strict";
          if (opts.debug === true) {
            return {
              "children": [],
              "path": "",
              "source": scope_data_array,
              "value": "",
              "is_file": is_file,
              "cache": "property"
            };
          } else {
            return {
              "path": "",
              "children": [],
              "value": "",
              "is_file": is_file,
              "cache": "property"
            };
          }
        }

        var returnScope = newScope();

        // Parse sass
        // @import = self.loadSassFile
        // // TODO: handle cache level options
        //
        // @mix-in = store like a scope
        // @include = reference @mix-in
        // detect css properties
        // ignore items with just whitespace in them
        // if ends in ; === property/properties
        // if has { create child scope parseSass(child_data)
        // break out properties and trim off the whitespasce at the beginning and ends.
        // TODO: when @ in a property is found, build them into a single value
        // as mixins and conditional statements require the entire scope to be processed
        // You cannot break them down on by property basis.
        // the exception perhaps is the @media query
        //
        for (var i = 0; i < scope_data_array.length; i++) {

          if (scope_data_array[i] === "") {
            continue;
          } else if (scope_data_array[i].indexOf(';') !== -1) {
            // Process properties
            var properties = scope_data_array[i].split(';');
            properties = properties.splice(0, properties.length - 1);

            for (var p = 0; p < properties.length; p++) {
              var property = properties[p].split(':');
              if (property !== "") {
                var propertyName = property[0].trim();
                var propertyValue = property[1];

                // Look for @import
                if(propertyName.indexOf('@import') !== -1) {
                  var importProperty = propertyName.trim().split(/(\s)/);
                  propertyName = importProperty[0];
                  propertyValue = importProperty.pop().replace(/(\")/g, '');
                  var fullSassFilePath = '';
                  if(propertyValue.indexOf('/') !== -1) {
                    // load subdirectory
                    var fileName = propertyValue.substring(propertyValue.lastIndexOf('/') + 1);

                    fullSassFilePath =
                      opts.paths.sass_path + propertyValue.substring(0, propertyValue.lastIndexOf('/')) + '/' +
                      opts.paths.file_prefix + fileName + opts.paths.file_extension;
                    // debugger;
                  } else {
                    fullSassFilePath = opts.paths.sass_path + opts.paths.file_prefix + propertyValue + opts.paths.file_extension;
                  }

                  var wait = self.loadSassFile(fullSassFilePath, propertyValue);
                }

                // add child object
                var childScope = newScope();
                childScope.path = propertyName;
                childScope.value = propertyValue;
                // catch edge case where @something is not handled
                if(childScope.children.length === 0 && typeof childScope.value == "undefined") {
                  childScope.path = " ";
                  childScope.value = propertyName;
                }
                returnScope.children.push(childScope);
              } else {
                // eg just has a variable name
                var propertyValue = properties[p];
                // add child object
                var childScope = newScope();
                childScope.path = " ";
                childScope.value = propertyValue;
                returnScope.children.push(childScope);
              }

            }
          } else if (scope_data_array[i] === '{') {

            // Process / Build Scope
            // TODO:chandle one liners like a {color: black;}
            var endOfClosure = getClosureScope(scope_data_array, i);
            var childScope = parseSass(scope_data_array.slice(i + 1, endOfClosure));
            childScope.path = scope_data_array[i - 1];
            returnScope.children.push(childScope);
            // since we have found the scope iterate i
            // to the end of the closure
            i = endOfClosure;
          }
        }
        // Return result


        return returnScope;
      };

      if (typeof self.themeGraph.parsed === "undefined") {
        self.themeGraph.parsed = [];
      }

      $('<div>'+path+'</div>').addClass('sass-file').appendTo(self.controls.editor_widget_cache_loader);
      var scopes = parseSass(preProcess(sass_data, true));
      scopes.path = path;
      scopes.is_file = true;
      return scopes;
    };

    /**
     * Search theme graph to generate a graph of variables for the select option
     */
    self.buildVariableGraph = function () {
      var searchVariables = function(node) {
        for(var n = 0; n < node.children.length; n++) {
          var childNode = node.children[n];
          // ignore mix-ins / functions
          if (childNode.path.indexOf('@mixin') !== -1) {
           continue;
          }

          if (childNode.path.indexOf('@function') !== -1) {
            continue;
          }

          if (childNode.path.trim().indexOf('$') === 0) {
            // it's a variable!
            if(typeof self.variables === "undefined") {
              self.variables = [];
            }

          var variable_type = 'value';
          if (childNode.value.trim().indexOf('#') === 0) {
            variable_type = 'color_hex';
          } else if (/px$/.test(childNode.value.trim())) {
            variable_type = 'size_px';
          }
          var variableObj = {};
          variableObj.name = childNode.path.trim();
          variableObj.default_value = childNode.value.trim();
          variableObj.current_value = childNode.value.trim();
          variableObj.type = variable_type;
          variableObj.label = childNode.path.trim().replace(/\$/g, 'lbl_theme_editor_').replace(/\-/g, '_').toUpperCase();
          // TODO build object from scratch so that you can use , in the values
            self.variables.push(variableObj);
            $('<option value="'+ variableObj.name +'">' +
           variableObj.label +
          '</option>').appendTo(self.controls.editor_variable_select_input);
          }
        }
      }
      for(var i = 0; i < self.themeGraph.parsed.length; i++) {
        if(self.themeGraph.parsed[i].path === opts.paths.variables) {
          self.controls.editor_widget_cache_loader.empty();
          $('<div>'+self.getLabel('LBL_BUILDING_VARIABLES')+'</div>').appendTo(self.controls.editor_widget_cache_loader);
          searchVariables(self.themeGraph.parsed[i]);
          self.controls.editor_widget_cache_loader.empty();
          self.controls.editor_widget.removeClass('hidden');
          self.controls.editor_widget.removeAttr('hidden');
        }
      }
    };

    /**
     * Builds a JSON structure
     * then stores it in sessionStorage
     * then initialises editor
     */
    self.buildThemeGraph = function () {
      "use strict";
      self.themeGraph = {};
      var sass_index_path = opts.paths.sass_path + opts.paths.index + opts.paths.file_extension;
      self.loadSassFile(sass_index_path, opts.paths.index);
      console.log('sassBootstrapThemeEditor - setting sessionStorage');
      sessionStorage.setItem('sassBootstrapThemeEditor', JSON.stringify(self.themeGraph));
      console.log('sassBootstrapThemeEditor themeGraph: ', self.themeGraph);
    };

    /**
     * loads themeGraph JSON in sessionStorage
     * then initialises editor
     */
    self.loadThemeGraph = function () {
      "use strict";
      if (opts.reloadSessionStorage === true) {
        self.buildThemeGraph();
      } else {
        self.themeGraph = $.parseJSON(sessionStorage.getItem('sassBootstrapThemeEditor'));
      }
      console.log("loaded themeGraph", self.themeGraph);
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
        if (typeof self.parent() !== 'undefined') {
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

        self.controls.editor_widget_cache_loader = $('<div></div>');
        self.controls.editor_widget_cache_loader.attr('id', 'editor_widget_cache_loader_' + self.id);
        self.controls.editor_widget_cache_loader.addClass('editor_widget');
        self.controls.editor_widget_cache_loader.html('<div>'+ self.getLabel('LBL_CACHING_FILES') + '</div>');
        self.controls.editor_widget_cache_loader.appendTo(self.controls.editor_container);

        self.controls.editor_widget = $('<div></div>');
        self.controls.editor_widget.attr('id', 'editor_widget_' + self.id);
        self.controls.editor_widget.addClass('editor_widget');
        self.controls.editor_widget.addClass('hidden'); // Bootstrap 3
        self.controls.editor_widget.attr('hidden', ''); // Bootstrap 4
        self.controls.editor_widget.appendTo(self.controls.editor_container);

        self.controls.editor_variable_select_container = $('<div></div>');
        self.controls.editor_variable_select_container.attr('id', 'editor_variable_select_container_' + self.id);
        self.controls.editor_variable_select_container.addClass('editor_variable_select_container');
        self.controls.editor_variable_select_container.appendTo(self.controls.editor_widget);

        self.controls.editor_variable_select_input = $('<select>');
        self.controls.editor_variable_select_input.attr('id', 'editor_variable_select_input_' + self.id);
        self.controls.editor_variable_select_input.addClass('editor_variable_select_input');
        self.controls.editor_variable_select_input.addClass('form_control');
        $('<label for="' + self.controls.editor_variable_select_input.attr('id') + '">' + self.getLabel('LBL_THEME_EDITOR_VARIABLE_SELECT_INPUT') + '</label>').appendTo(self.controls.editor_variable_select_container);
        self.controls.editor_variable_select_input.appendTo(self.controls.editor_variable_select_container);

        self.controls.editor_color_picker_container = $('<div></div>');
        self.controls.editor_color_picker_container.attr('id', 'editor_color_picker_container_' + self.id);
        self.controls.editor_color_picker_container.addClass('editor_color_picker_container');
        self.controls.editor_color_picker_container.appendTo(self.controls.editor_widget);

        self.controls.editor_color_value = $('<input>');
        self.controls.editor_color_value.attr('id', 'editor_color_value_' + self.id);
        self.controls.editor_color_value.addClass('editor_color_value');
        self.controls.editor_color_value.addClass('form-control');
        $('<label for="' + self.controls.editor_color_value.attr('id') + '">' + self.getLabel('LBL_THEME_EDITOR_COLOR_VALUE') + '</label>').appendTo(self.controls.editor_color_picker_container);
        self.controls.editor_color_value.appendTo(self.controls.editor_color_picker_container);

        self.controls.editor_color_preview = $('<div><span class="glyphicon glyphicon-refresh"></span></div>');
        self.controls.editor_color_preview.attr('id', 'editor_color_preview_' + self.id);
        self.controls.editor_color_preview.addClass('editor_color_preview');
        self.controls.editor_color_preview.appendTo(self.controls.editor_color_picker_container);

        self.controls.editor_color_picker = $('<div></div>');
        self.controls.editor_color_picker.attr('id', 'editor_color_picker_' + self.id);
        self.controls.editor_color_picker.addClass('editor_color_picker');
        self.controls.editor_color_picker.appendTo(self.controls.editor_color_picker_container);

        self.controls.editor_color_picker_reset = $('<button class="btn btn-danger">' + self.getLabel('LBL_THEME_EDITOR_RESET_COLOR') + '</button>');
        self.controls.editor_color_picker_reset.attr('id', 'editor_color_picker_reset_' + self.id);
        self.controls.editor_color_picker_reset.addClass('editor_color_picker_reset');
        self.controls.editor_color_picker_reset.appendTo(self.controls.editor_color_picker_container);

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
        $('<label for="' + self.controls.editor_size_value.attr('id') + '">' + self.getLabel('LBL_THEME_EDITOR_SIZE_VALUE') + '</label>').appendTo(self.controls.editor_size_value_container);
        self.controls.editor_size_value.appendTo(self.controls.editor_size_value_container);

        self.controls.editor_size_slider = $('<div></div>');
        self.controls.editor_size_slider.attr('id', 'editor_size_slider_' + self.id);
        self.controls.editor_size_slider.addClass('editor_size_slider');
        self.controls.editor_size_slider.appendTo(self.controls.editor_size_slider_container);

        self.controls.editor_size_reset = $('<button class="btn btn-danger">' + self.getLabel('LBL_THEME_EDITOR_RESET_SIZE') + '</button>');
        self.controls.editor_size_reset.attr('id', 'editor_size_reset_reset_' + self.id);
        self.controls.editor_size_reset.addClass('editor_size_reset_reset');
        self.controls.editor_size_reset.appendTo(self.controls.editor_size_slider_container);

        self.controls.editor_size_refresh = $('<button class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span></button>');
        self.controls.editor_size_refresh.attr('id', 'editor_size_refresh_' + self.id);
        self.controls.editor_size_refresh.addClass('editor_size_reset_reset');
        self.controls.editor_size_refresh.appendTo(self.controls.editor_size_slider_container);


        self.controls.editor_apply_style = $("<style></style>");
        self.controls.editor_apply_style.attr('id', 'editor_apply_style_' + self.id);
        self.controls.editor_apply_style.appendTo(self.controls.editor_container);

        self.controls.editor_loader_container = $('<div></div>');
        self.controls.editor_loader_container.attr('id', 'editor_loader_container_' + self.id);
        self.controls.editor_loader_container.addClass('editor_loader_container');
        self.controls.editor_loader_container.addClass('hidden');
        self.controls.editor_loader_container.appendTo(self.controls.editor_widget);

        self.controls.editor_loader = $('<div>' + self.getLabel('LBL_THEME_EDITOR_COMPILING') + '</div>');
        self.controls.editor_loader.attr('id', 'editor_loader_' + self.id);
        self.controls.editor_loader.addClass('editor_loader');
        self.controls.editor_loader.appendTo(self.controls.editor_loader_container);
      }

      if (sessionStorage.getItem('sassBootstrapThemeEditor') === null) {
        self.buildThemeGraph();
      } else {
        self.loadThemeGraph();
      }
      self.buildVariableGraph();
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
      "index": "bootstrap",
      // include in every compile
      "variables": "variables",
      // Always send the following files to the compiler
      "always-include": [
        "_variables",
        "_mixins",
        "_utilties",
      ],
      // cache level (file, property)
      // When sending sass to the compiler:
      // if (file) only include the files used but include the entire file and its @imports
      // if (property) only include the files used but only include the properties used
      "cache": {
        "level": "property",
        "exceptions": [
          {
            "path": "mixins/*",
            "level": "file"
          },
          {
            "path": "utilties/*",
            "level": "file"
          },
        ],
      },
      // options
      "file_prefix": '_',
      "file_extension": '.scss'
    },
    "debug": false,
    "reloadSessionStorage": false
  }
}(jQuery));