var SassThemeEditor = function () {
  var self = this;

  self.id = '';
  self.sassVariablesModel = [];
  self.sassVariablesChanged = [];
  self.sassStylesheetIndex = [];
  self.sassStylesheetFiles = [];
  self.sassSelectedVariable = 0;
  self.controls = {};
  self.uiTimeout = null;
  self.uiUpdateTimeout = 50;
  self.isCompiling = false;
  self.isSettingCurrentVariable = true;

  self.construct = function (options) {
    self.id = self.generateUUID();

    // Construct User Interface
    self.controls.editor_container = $("<div></div>");
    self.controls.editor_container.attr('id', self.id);
    self.controls.editor_container.addClass('sass-theme-editor');
    if(typeof options.parent_container !== 'undefined') {
      self.controls.editor_container.appendTo(options.parent_container);
    } else {
      self.controls.editor_container.appendTo('body');
    }

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

    // Get Data
    // Populate User Interface
    self.getVariables();
    self.getSassFiles();

    // Construct UI Dependencies
    self.constructUIDependencies();
  };

  self.destruct = function () {
    // remove the elements from the DOM which were created by this class
  };

  self.compile = function () {
    // Performance guard
    if(self.isCompiling !== false) {
      return;
    }
    console.log('SassThemeEditor.compile(): Compiling Sass.');
    self.isCompiling = true;
    self.controls.editor_loader_container.removeClass('hidden');
    var sassCompiler = new Sass();
    // Build Variabless.css
    var variables = '\n';
    $.each(self.sassVariablesModel, function(i, variable) {
      variables += variable.name + ': ' + variable.current_value + ';\n';
    });

    // Check which variables have changed
    // Process only the values that have changed
    if(self.sassVariablesChanged.indexOf(self.sassSelectedVariable) === -1) {
      self.sassVariablesChanged.push(self.sassSelectedVariable);
    }

    // TODO: include only the files which the changed variables are kept in
    var stylesheets = '';
    $(self.sassStylesheetFiles).each(function (iStylesheet, stylesheet) {
      $(self.sassVariablesChanged).each(function (iVariable, variable) {
        if(stylesheet.sass.indexOf(self.sassVariablesModel[variable].name) !== -1) {
          stylesheets += stylesheet.sass;
        }
      });
    });
    // Compile
    sassCompiler.compile(variables + stylesheets, function (result) {
      self.isCompiling = false;
      self.controls.editor_loader_container.addClass('hidden');

      if(result.status == 0) {
        console.log('SassThemeEditor.compile(): Compiled Sass.');
      } else {
        console.error(result);
        return false;
      }
      self.controls.editor_apply_style.text( result.text );
      return result;
    });

  };

  self.getVariables = function () {
    self.controls.editor_variable_select_input.empty();

    $.ajax({
      url: 'themes/SuiteP/css/variables.scss',
      async: false,
      dataType: "text"
    }).done(function (variable_data) {
      var variables  = variable_data.split('\n');
      // Iterate over the each line
      for (var i = 0; i < variables.length; i++) {
        if (variables[i].indexOf('$') !== -1) {
          // found variable
          var variable =  variables[i].replace(/;/g, '').split(':');

          // Work out variable type
          var variable_type = '';
          if (variable[1].trim().indexOf('#') === 0) {
            variable_type = 'color_hex';
          } else if (/px$/.test(variable[1].trim())) {
            variable_type = 'size_px';
          } else {
            variable_type = 'undefined';
          }

            self.sassVariablesModel.push(jQuery.parseJSON(
            '{'+
            '"name":' + '"'+ variable[0].trim() + '",' +
            '"default_value":"' + variable[1].trim() + '",' +
            '"current_value":"' + variable[1].trim() + '",' +
            '"type":"'+variable_type+'",' +
            '"label":"'+variable[0].trim().replace(/\$/g, 'lbl_theme_editor_').replace(/\-/g, '_').toUpperCase() +'"' +
            '}'
          ));

          $('<option value="'+ variable[0].trim() +'">' +
            variable[0].trim().replace(/\$/g, 'lbl_theme_editor_').replace(/\-/g, '_').toUpperCase()+
          '</option>').appendTo(self.controls.editor_variable_select_input);
        }
      }
    });
    // TODO: load custom
     $.ajax({
      url: 'custom/themes/SuiteP/css/variables.scss',
      async: false,
      dataType: "text"
    }).done(function (variable_data) {
      var variables  = variable_data.split('\n');
      // Iterate over the each line
      for (var i = 0; i < variables.length; i++) {
        if (variables[i].indexOf('$') !== -1) {
          // found variable
          var variable =  variables[i].replace(/;/g, '').split(':');

          // Work out variable type
          var variable_type = '';
          if (variable[1].trim().indexOf('#') === 0) {
            variable_type = 'color_hex';
          } else if (/px$/.test(variable[1].trim())) {
            variable_type = 'size_px';
          } else {
            variable_type = 'undefined';
          }

          // TODO find duplicate

          if(self.variablesIndexOf(variable[0].trim()) === -1) {
            var v = self.variablesIndexOf(variable[0].trim());
            self.sassVariablesModel[v] =
            jQuery.parseJSON(
              '{'+
              '"name":' + '"'+ variable[0].trim() + '",' +
              '"default_value":"' + variable[1].trim() + '",' +
              '"current_value":"' + variable[1].trim() + '",' +
              '"type":"'+variable_type+'",' +
              '"label":"'+variable[0].trim().replace(/\$/g, 'lbl_theme_editor_').replace(/\-/g, '_').toUpperCase() +'"' +
              '}'
            )
          } else {
              self.sassVariablesModel.push(jQuery.parseJSON(
              '{'+
              '"name":' + '"'+ variable[0].trim() + '",' +
              '"default_value":"' + variable[1].trim() + '",' +
              '"current_value":"' + variable[1].trim() + '",' +
              '"type":"'+variable_type+'",' +
              '"label":"'+variable[0].trim().replace(/\$/g, 'lbl_theme_editor_').replace(/\-/g, '_').toUpperCase() +'"' +
              '}'
            ));
          }

          $('<option value="'+ variable[0].trim() +'">' +
            variable[0].trim().replace(/\$/g, 'lbl_theme_editor_').replace(/\-/g, '_').toUpperCase()+
          '</option>').appendTo(self.controls.editor_variable_select_input);
        }
      }
    });
  };

  self.variablesIndexOf = function(name) {
    for(var i = 0; i < self.sassVariablesModel.length; i++) {
      if(self.sassVariablesModel[i].name == name) {
        return i;
      }
    }

    return -1;
  };

  self.getSassFiles = function () {
    $.ajax({
      url: 'themes/SuiteP/css/style.scss',
      async: false,
      dataType: "text"
    }).done(function (style_data) {
      var sass_style = style_data;
      // Strip out any unneeded characters
      sass_style = sass_style.replace(/@import/g, '');
      sass_style = sass_style.replace(/;/g, '.scss');
      sass_style = sass_style.replace(/'/g, '');
      // Iterate over the each line
      // Filter the file names
      var sass_file = sass_style.split('\n');

      for (var i = 0; i < sass_file.length; i++) {

        if (sass_file[i].indexOf('.scss') !== -1) {

          self.sassStylesheetIndex.push(sass_file[i].trim());
          // get the sass file
          $.ajax({
            url: 'themes/SuiteP/css/' + sass_file[i].trim(),
            async: false,
            dataType: "text"
          }).done(function (sass_file_data) {
            var file = {
              "file": sass_file[i].trim(),
              "sass": sass_file_data.replace(/@import 'variables';/g, ''),
              "compiler_output": '',
            };

            self.sassStylesheetFiles.push(file);
          });

        }

      }

    });
    // TODO: load custom
  };

  self.constructUIDependencies = function () {
    $(self.controls.editor_size_slider).slider({
      value: self.sassVariablesModel[self.sassSelectedVariable].current_value.replace('px', '').replace('%', '').replace('em', ''),
      // min: 30,
      // max: 120,
      step: 1,
      slide: self.handlerOnChangeSlider
    });

    $(self.controls.editor_color_picker).farbtastic(self.controls.editor_color_picker);
    $(self.controls.editor_color_value).keyup(function () {
      $.farbtastic(self.controls.editor_color_picker).setColor($(self.controls.editor_color_value).val());
    });
    $.farbtastic(self.controls.editor_color_picker).linkTo(self.handlerOnChangeColor);
    $.farbtastic(self.controls.editor_color_picker).setColor($(self.controls.editor_color_value).val());

    self.controls.editor_variable_select_input.change(self.handleOnVariableChange);
    self.controls.editor_color_picker_reset.click(function () {
      $.farbtastic(self.controls.editor_color_picker).setColor(self.sassVariablesModel[self.sassSelectedVariable].default_value);
    });
    self.controls.editor_size_reset.click(function () {
      self.sassVariablesModel[self.sassSelectedVariable].current_value = self.sassVariablesModel[self.sassSelectedVariable].default_value
      $(self.controls.editor_size_slider).slider({
        value: self.sassVariablesModel[self.sassSelectedVariable].current_value.replace('px', '').replace('%', '').replace('em', ''),
      });

      self.controls.editor_size_value.val(self.sassVariablesModel[self.sassSelectedVariable].current_value);
    });
    self.controls.editor_size_value.change(self.handlerOnChangeSize);
    self.controls.editor_size_refresh.click(self.handlerOnChangeSize);
    self.controls.editor_color_preview.click(function () {
      self.handleUIUpdated();
    });
  };

  self.handleOnVariableChange = function() {
    self.isSettingCurrentVariable = true;
    // TODO Handle when user selects a variable
   self.sassSelectedVariable = self.controls.editor_variable_select_input.prop('selectedIndex');
   switch (self.sassVariablesModel[self.sassSelectedVariable].type) {
     case "color_hex":
       self.controls.editor_color_picker_container.removeClass('hidden');
       self.controls.editor_size_slider_container.addClass('hidden');
       self.controls.editor_color_value.val(self.sassVariablesModel[self.sassSelectedVariable].current_value);
       $.farbtastic(self.controls.editor_color_picker).setColor($(self.controls.editor_color_value).val());
       break;
     case "size_px":
       self.controls.editor_size_slider_container.removeClass('hidden');
       self.controls.editor_color_picker_container.addClass('hidden');
       self.controls.editor_size_value.val(self.sassVariablesModel[self.sassSelectedVariable].current_value);
       break;
     default:
       self.controls.editor_size_slider_container.addClass('hidden');
       self.controls.editor_color_picker_container.addClass('hidden');
       break;
   }
   self.isSettingCurrentVariable = false;
  };

  self.handlerOnChangeSlider = function (event, ui) {
    // TODO Wait for the user to stop and then compile change
    var unit = '';
    switch (self.sassVariablesModel[self.sassSelectedVariable].type) {
      case "size_px":
        unit = 'px';
        break;
      default:
        break;
    }
    $(self.controls.editor_size_value).val( ui.value + unit );
  };

  self.handlerOnChangeColor = function (color) {
    // TODO Wait for the user to stop and then compile change
    self.sassVariablesModel[self.sassSelectedVariable].current_value = color;
    $(self.controls.editor_color_value).val(color);
    $(self.controls.editor_color_picker).css('background-color', color);
    $(self.controls.editor_color_preview).css('background-color', color);
    self.handleUIUpdated();
  };

  self.handlerOnChangeSize = function () {
    self.sassVariablesModel[self.sassSelectedVariable].current_value = self.controls.editor_size_value.val();
    self.handleUIUpdated();
  }

  self.handleUIUpdated = function () {
    if(self.isSettingCurrentVariable === true) {
      return false;
    }
      clearTimeout(self.uiTimeout);
      self.uiTimeout = setTimeout(self.compile, self.uiUpdateTimeout);
  }

  self.generateUUID = function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };

  self.getLabel = function (label) {
    return label;
  }


  /**
   * Generates php language file for developers.
   *
   * You need to run construct() first before using this method.
   */
  self.generateLanguageFile = function() {
    var labels = '';
    $.each(self.sassVariablesModel, function(i, variable) {
      labels += '$app_strings[\'' + variable.label + '\'] => \''+ self.getLabel(variable.label) + '\';';
    });
   
    console.log(labels);
  }
};

/* inline svgs */
$(function(){
  jQuery('.sass-icon-editor-place img').each(function(i,v){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    if(imgURL.indexOf('svg') !== -1) {
      jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');


        // Replace image with new SVG
        $img.replaceWith($svg);

      }, 'xml');
    }
  });
});