sugarThemesBuilder = function(a) {
  var _config = {};
  switch (typeof a) {
    case "object":
      _config = a;
      break;
    default:
      return {};
  }

  return {
    config : _config,
    sass : new Sass(),
    currentColorVariable : '',
    currentSliderVariable : '',
    buildVariables : function () {},
    compileSass : function () {},
    colorChanged : function (color) {},
    sliderChanged : function (uiEvent, ui) {},
    fetchLocalTheme : function () {},
    fetchRemoteTheme : function () {},
    persistLocalTheme : function () {},
    persistRemoteTheme : function () {}
  }
};
