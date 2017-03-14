var SassThemeEditor = function () {
  var _sassThemeEditor = this;

  _sassThemeEditor.id = '';
  _sassThemeEditor.sassVariablesModel = [];
  _sassThemeEditor.sassVariablesChanged = [];
  _sassThemeEditor.sassStylesheetIndex = [];
  _sassThemeEditor.sassStylesheetFiles = [];
  _sassThemeEditor.sassSelectedVariable = 0;
  _sassThemeEditor.controls = {};
  _sassThemeEditor.uiTimeout = null;
  _sassThemeEditor.uiUpdateTimeout = 300;
  _sassThemeEditor.isCompiling = false;

  _sassThemeEditor.construct = function (options) {
    _sassThemeEditor.id = _sassThemeEditor.generateUUID();

    // Construct User Interface
    _sassThemeEditor.controls.editor_container = $("<div></div>");
    _sassThemeEditor.controls.editor_container.attr('id', _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_container.addClass('sass-theme-editor');
    if(typeof options.parent_container !== 'undefined') {
      _sassThemeEditor.controls.editor_container.appendTo(options.parent_container);
    } else {
      _sassThemeEditor.controls.editor_container.appendTo('body');
    }

    _sassThemeEditor.controls.editor_widget = $('<div></div>');
    _sassThemeEditor.controls.editor_widget.attr('id', 'editor_widget_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_widget.addClass('editor_widget');
    _sassThemeEditor.controls.editor_widget.appendTo(_sassThemeEditor.controls.editor_container);

    _sassThemeEditor.controls.editor_variable_select_container = $('<div></div>');
    _sassThemeEditor.controls.editor_variable_select_container.attr('id', 'editor_variable_select_container_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_variable_select_container.addClass('editor_variable_select_container');
    _sassThemeEditor.controls.editor_variable_select_container.appendTo(_sassThemeEditor.controls.editor_widget);

    _sassThemeEditor.controls.editor_variable_select_input = $('<select>');
    _sassThemeEditor.controls.editor_variable_select_input.attr('id', 'editor_variable_select_input_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_variable_select_input.addClass('editor_variable_select_input');
    _sassThemeEditor.controls.editor_variable_select_input.addClass('form_control');
    $('<label for="'+_sassThemeEditor.controls.editor_variable_select_input.attr('id')+'">'+_sassThemeEditor.getLabel('LBL_EDITOR_VARIABLE_SELECT_INPUT')+'</label>').appendTo(_sassThemeEditor.controls.editor_variable_select_container);
    _sassThemeEditor.controls.editor_variable_select_input.appendTo(_sassThemeEditor.controls.editor_variable_select_container);

    _sassThemeEditor.controls.editor_color_picker_container = $('<div></div>');
    _sassThemeEditor.controls.editor_color_picker_container.attr('id', 'editor_color_picker_container_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_color_picker_container.addClass('editor_color_picker_container');
    _sassThemeEditor.controls.editor_color_picker_container.appendTo(_sassThemeEditor.controls.editor_widget);

    _sassThemeEditor.controls.editor_color_value = $('<input>');
    _sassThemeEditor.controls.editor_color_value.attr('id', 'editor_color_value_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_color_value.addClass('editor_color_value');
    _sassThemeEditor.controls.editor_color_value.addClass('form-control');
    $('<label for="'+_sassThemeEditor.controls.editor_color_value.attr('id')+'">'+_sassThemeEditor.getLabel('LBL_EDITOR_COLOR_VALUE')+'</label>').appendTo(_sassThemeEditor.controls.editor_color_picker_container);
    _sassThemeEditor.controls.editor_color_value.appendTo(_sassThemeEditor.controls.editor_color_picker_container);

    _sassThemeEditor.controls.editor_color_preview = $('<div><span class="glyphicon glyphicon-refresh"></span></div>');
    _sassThemeEditor.controls.editor_color_preview.attr('id', 'editor_color_preview_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_color_preview.addClass('editor_color_preview');
    _sassThemeEditor.controls.editor_color_preview.appendTo(_sassThemeEditor.controls.editor_color_picker_container);

    _sassThemeEditor.controls.editor_color_picker = $('<div></div>');
    _sassThemeEditor.controls.editor_color_picker.attr('id', 'editor_color_picker_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_color_picker.addClass('editor_color_picker');
    _sassThemeEditor.controls.editor_color_picker.appendTo(_sassThemeEditor.controls.editor_color_picker_container);

    _sassThemeEditor.controls.editor_color_picker_reset = $('<button class="btn btn-danger">'+_sassThemeEditor.getLabel('LBL_EDITOR_RESET_COLOR')+'</button>');
    _sassThemeEditor.controls.editor_color_picker_reset.attr('id', 'editor_color_picker_reset_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_color_picker_reset.addClass('editor_color_picker_reset');
    _sassThemeEditor.controls.editor_color_picker_reset.appendTo(_sassThemeEditor.controls.editor_color_picker_container );

    _sassThemeEditor.controls.editor_color_value_container = $('<div></div>');
    _sassThemeEditor.controls.editor_color_value_container.attr('id', 'editor_color_value_container_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_color_value_container.addClass('editor_color_value_container');
    _sassThemeEditor.controls.editor_color_value_container.appendTo(_sassThemeEditor.controls.editor_color_picker_container);

    _sassThemeEditor.controls.editor_size_slider_container = $('<div></div>');
    _sassThemeEditor.controls.editor_size_slider_container.attr('id', 'editor_size_slider_container_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_size_slider_container.addClass('editor_size_slider_container');
    _sassThemeEditor.controls.editor_size_slider_container.appendTo(_sassThemeEditor.controls.editor_widget);

    _sassThemeEditor.controls.editor_size_value_container = $('<div></div>');
    _sassThemeEditor.controls.editor_size_value_container.attr('id', 'editor_size_value_container_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_size_value_container.addClass('editor_size_value_container');
    _sassThemeEditor.controls.editor_size_value_container.appendTo(_sassThemeEditor.controls.editor_size_slider_container);

    _sassThemeEditor.controls.editor_size_value = $('<input>');
    _sassThemeEditor.controls.editor_size_value.attr('id', 'editor_size_value_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_size_value.addClass('editor_size_value');
    _sassThemeEditor.controls.editor_size_value.addClass('form-control');
    $('<label for="'+_sassThemeEditor.controls.editor_size_value.attr('id')+'">'+_sassThemeEditor.getLabel('LBL_EDITOR_SIZE_VALUE')+'</label>').appendTo(_sassThemeEditor.controls.editor_size_value_container);
    _sassThemeEditor.controls.editor_size_value.appendTo(_sassThemeEditor.controls.editor_size_value_container);

    _sassThemeEditor.controls.editor_size_slider = $('<div></div>');
    _sassThemeEditor.controls.editor_size_slider.attr('id', 'editor_size_slider_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_size_slider.addClass('editor_size_slider');
    _sassThemeEditor.controls.editor_size_slider.appendTo(_sassThemeEditor.controls.editor_size_slider_container);

    _sassThemeEditor.controls.editor_size_reset = $('<button class="btn btn-danger">'+_sassThemeEditor.getLabel('LBL_EDITOR_RESET_SIZE')+'</button>');
    _sassThemeEditor.controls.editor_size_reset.attr('id', 'editor_size_reset_reset_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_size_reset.addClass('editor_size_reset_reset');
    _sassThemeEditor.controls.editor_size_reset.appendTo(_sassThemeEditor.controls.editor_size_slider_container );

    _sassThemeEditor.controls.editor_apply_style = $("<style></style>");
    _sassThemeEditor.controls.editor_apply_style.attr('id', 'editor_apply_style_'+_sassThemeEditor.id);
    _sassThemeEditor.controls.editor_apply_style.appendTo(_sassThemeEditor.controls.editor_container);

    _sassThemeEditor.controls.editor_loader_container = $('<div></div>');
    _sassThemeEditor.controls.editor_loader_container.attr('id', 'editor_loader_container_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_loader_container.addClass('editor_loader_container');
    _sassThemeEditor.controls.editor_loader_container.addClass('hidden');
    _sassThemeEditor.controls.editor_loader_container.appendTo(_sassThemeEditor.controls.editor_container);

    _sassThemeEditor.controls.editor_loader = $('<div>'+_sassThemeEditor.getLabel('LBL_LOADING')+'</div>');
    _sassThemeEditor.controls.editor_loader.attr('id', 'editor_loader_' + _sassThemeEditor.id);
    _sassThemeEditor.controls.editor_loader.addClass('editor_loader');
    _sassThemeEditor.controls.editor_loader.appendTo(_sassThemeEditor.controls.editor_loader_container);

    // Get Data
    // Populate User Interface
    _sassThemeEditor.getVariables();
    _sassThemeEditor.getSassFiles();

    // Construct UI Dependencies
    _sassThemeEditor.constructUIDependencies();
  };

  _sassThemeEditor.destruct = function () {
    // remove the elements from the DOM which were created by this class
  };

  _sassThemeEditor.compile = function () {
    // Performance guard
    if(_sassThemeEditor.isCompiling !== false) {
      return;
    }
    console.log('SassThemeEditor.compile(): Compiling Sass.');
    _sassThemeEditor.isCompiling = true;
    _sassThemeEditor.controls.editor_loader_container.removeClass('hidden');
    var sassCompiler = new Sass();
    // Build Variabless.css
    var variables = '\n';
    $.each(_sassThemeEditor.sassVariablesModel, function(i, variable) {
      variables += variable.name + ': ' + variable.current_value + ';\n';
    });

    // Check which variables have changed
    // Process only the values that have changed
    if(_sassThemeEditor.sassVariablesChanged.indexOf(_sassThemeEditor.sassSelectedVariable) === -1) {
      _sassThemeEditor.sassVariablesChanged.push(_sassThemeEditor.sassSelectedVariable);
    }

    // TODO: include only the files which the changed variables are kept in
    var stylesheets = '';
    $(_sassThemeEditor.sassStylesheetFiles).each(function (iStylesheet, stylesheet) {
      $(_sassThemeEditor.sassVariablesChanged).each(function (iVariable, variable) {
        if(stylesheet.sass.indexOf(_sassThemeEditor.sassVariablesModel[variable].name) !== -1) {
          stylesheets += stylesheet.sass;
        }
      });
    });
    // Compile
    sassCompiler.compile(variables + stylesheets, function (result) {
      _sassThemeEditor.isCompiling = false;
      _sassThemeEditor.controls.editor_loader_container.addClass('hidden');

      if(result.status == 0) {
        console.log('SassThemeEditor.compile(): Compiled Sass.');
      } else {
        console.error(result);
        return false;
      }
      _sassThemeEditor.controls.editor_apply_style.text( result.text );
      return result;
    });

  };

  _sassThemeEditor.getVariables = function () {
    _sassThemeEditor.controls.editor_variable_select_input.empty();

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

            _sassThemeEditor.sassVariablesModel.push(jQuery.parseJSON(
            '{'+
            '"name":' + '"'+ variable[0].trim() + '",' +
            '"default_value":"' + variable[1].trim() + '",' +
            '"current_value":"' + variable[1].trim() + '",' +
            '"type":"'+variable_type+'",' +
            '"label":"'+variable[0].trim().replace(/\$/g, 'lbl_').replace(/\-/g, '_').toUpperCase() +'",' +
            '"label_description":"'+variable[0].trim().replace(/\$/g, 'lbl_').replace(/\-/g, '_').toUpperCase() +'_DESCRIPTION"' +
            '}'
          ));

          $('<option value="'+ variable[0].trim() +'">' +
            variable[0].trim().replace(/\$/g, 'lbl_').replace(/\-/g, '_').toUpperCase()+
          '</option>').appendTo(_sassThemeEditor.controls.editor_variable_select_input);
        }
      }
    });
  };

  _sassThemeEditor.getSassFiles = function () {
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

          _sassThemeEditor.sassStylesheetIndex.push(sass_file[i].trim());
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

            _sassThemeEditor.sassStylesheetFiles.push(file);
          });

        }

      }

    });
  };

  _sassThemeEditor.constructUIDependencies = function () {
    $(_sassThemeEditor.controls.editor_size_slider).slider({
      value: _sassThemeEditor.sassVariablesModel[_sassThemeEditor.sassSelectedVariable].current_value.replace('px', '').replace('%', '').replace('em', ''),
      // min: 30,
      // max: 120,
      step: 1,
      slide: _sassThemeEditor.handlerOnChangeSlider
    });

    $(_sassThemeEditor.controls.editor_color_picker).farbtastic(_sassThemeEditor.controls.editor_color_picker);
    $(_sassThemeEditor.controls.editor_color_value).keyup(function () {
      $.farbtastic(_sassThemeEditor.controls.editor_color_picker).setColor($(_sassThemeEditor.controls.editor_color_value).val());
    });
    $.farbtastic(_sassThemeEditor.controls.editor_color_picker).linkTo(_sassThemeEditor.handlerOnChangeColor);
    $.farbtastic(_sassThemeEditor.controls.editor_color_picker).setColor($(_sassThemeEditor.controls.editor_color_value).val());

    _sassThemeEditor.controls.editor_variable_select_input.change(_sassThemeEditor.handleOnVariableChange);
    _sassThemeEditor.controls.editor_color_picker_reset.click(function () {
      $.farbtastic(_sassThemeEditor.controls.editor_color_picker).setColor(_sassThemeEditor.sassVariablesModel[_sassThemeEditor.sassSelectedVariable].default_value);
    });
    _sassThemeEditor.controls.editor_size_reset.click(function () {
      _sassThemeEditor.sassVariablesModel[_sassThemeEditor.sassSelectedVariable].current_value = _sassThemeEditor.sassVariablesModel[_sassThemeEditor.sassSelectedVariable].default_value
      $(_sassThemeEditor.controls.editor_size_slider).slider({
        value: _sassThemeEditor.sassVariablesModel[_sassThemeEditor.sassSelectedVariable].current_value.replace('px', '').replace('%', '').replace('em', ''),
      });

      _sassThemeEditor.controls.editor_size_value.val(_sassThemeEditor.sassVariablesModel[_sassThemeEditor.sassSelectedVariable].current_value);
    });
    _sassThemeEditor.controls.editor_color_preview.click(function () {
      _sassThemeEditor.handleUIUpdated();
    })
  };

  _sassThemeEditor.handleOnVariableChange = function() {
    // TODO Handle when user selects a variable
   _sassThemeEditor.sassSelectedVariable = _sassThemeEditor.controls.editor_variable_select_input.prop('selectedIndex');
   switch (_sassThemeEditor.sassVariablesModel[_sassThemeEditor.sassSelectedVariable].type) {
     case "color_hex":
       _sassThemeEditor.controls.editor_color_picker_container.removeClass('hidden');
       _sassThemeEditor.controls.editor_size_slider_container.addClass('hidden');
       _sassThemeEditor.controls.editor_color_value.val(_sassThemeEditor.sassVariablesModel[_sassThemeEditor.sassSelectedVariable].current_value);
       $.farbtastic(_sassThemeEditor.controls.editor_color_picker).setColor($(_sassThemeEditor.controls.editor_color_value).val());
       break;
     case "size_px":
       _sassThemeEditor.controls.editor_size_slider_container.removeClass('hidden');
       _sassThemeEditor.controls.editor_color_picker_container.addClass('hidden');
       _sassThemeEditor.controls.editor_size_value.val(_sassThemeEditor.sassVariablesModel[_sassThemeEditor.sassSelectedVariable].current_value);
       break;
     default:
       _sassThemeEditor.controls.editor_size_slider_container.addClass('hidden');
       _sassThemeEditor.controls.editor_color_picker_container.addClass('hidden');
       break;
   }
  };

  _sassThemeEditor.handlerOnChangeSlider = function (event, ui) {
    // TODO Wait for the user to stop and then compile change
    var unit = '';
    switch (_sassThemeEditor.sassVariablesModel[_sassThemeEditor.sassSelectedVariable].type) {
      case "size_px":
        unit = 'px';
        break;
      default:
        break;
    }
    $(_sassThemeEditor.controls.editor_size_value).val( ui.value + unit );
    _sassThemeEditor.handleUIUpdated();
  };

  _sassThemeEditor.handlerOnChangeColor = function (color) {
    // TODO Wait for the user to stop and then compile change
    _sassThemeEditor.sassVariablesModel[_sassThemeEditor.sassSelectedVariable].current_value = color;
    $(_sassThemeEditor.controls.editor_color_value).val(color);
    $(_sassThemeEditor.controls.editor_color_preview).css('background-color', color);
    _sassThemeEditor.handleUIUpdated();
  };

  _sassThemeEditor.handleUIUpdated = function () {
      clearTimeout(_sassThemeEditor.uiTimeout);
      _sassThemeEditor.uiTimeout = setTimeout(_sassThemeEditor.compile, _sassThemeEditor.uiUpdateTimeout);
  }
  _sassThemeEditor.generateUUID = function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };

  _sassThemeEditor.getLabel = function (label) {
    return label;
  }


  /**
   * Generates php language file for developers.
   *
   * You need to run construct() first before using this method.
   */
  _sassThemeEditor.generateLanguageFile = function() {
    var variables = '';
    $.each(_sassThemeEditor.sassVariablesModel, function(i, variable) {
      variables += '$app_strings[\'' + variable.label + '\'] => \''+ _sassThemeEditor.getLabel(variable.label) + '\';';
    });
    if($('.language-file').length == 0) {
      $('<p></p>').addClass('language-file').appendTo('.main-container');
    }

    $('.language-file').text(variables);
  }
};