<?php ?>
<!DOCTYPE html>
<htmL>
<head>
    <title>SASS In The Browser</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="vendor/twbs/bootstrap/dist/css/bootstrap-grid.min.css">
    <link rel="stylesheet" href="vendor/twbs/bootstrap/dist/css/bootstrap-reboot.min.css">
    <link rel="stylesheet" href="src/css/farbtastic.css">
    <link rel="stylesheet" href="src/css/jquery-ui.min.css">
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/jquery-ui/jquery-ui.js"></script>
    <script src="bower_components/tether/dist/js/tether.min.js"></script>
    <script src="vendor/twbs/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="src/js/farbtastic.js"></script>
    <script src="src/dist/sass.js"></script>
    <script src="src/js/sass-theme-editor.js"></script>
    <script src="src/js/sass-bootstrap-theme-editor.js"></script>
</head>
<body>
<?=file_get_contents(__DIR__.'/templates/index.html');?>
<script>
  $('body').sassBootstrapThemeEditor();
</script>
</body>
</html>
