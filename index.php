<?php ?>
<!DOCTYPE html>
<htmL>
<head>
    <title>SASS In The Browser</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/farbtastic.css">
    <link rel="stylesheet" href="css/jquery-ui.min.css">
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">

        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</nav>
<div class="container main-container">
    <div></div>
    <div class="starter-template">
        <h1>Bootstrap starter template</h1>
        <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text and a mostly barebones HTML document.</p>
    </div>

    <form action="" style="width: 400px;">
        <div class="form-item"><label for="color">Navbar Color:</label><input type="text" id="color" name="color" value="#534D64" /></div><div id="picker"></div>
    </form>
    <label for="slider">Navbar Height:</label>
    <div id="slider"></div>
</div>
<div class="container console-container">
    <p>&nbsp;</p>
    <div class="row">
        <div class="col-xs-12">
            <label>Console</label>
            <textarea id="console" class="form-control"></textarea>
        </div>
    </div>
</div>
<div class="container source-container">
    <p>&nbsp;</p>
    <div class="row">
        <div class="col-xs-4">
            <label>Variables</label>
            <textarea id="variables" class="form-control"></textarea>
        </div>
        <div class="col-xs-4">
            <label>Sass</label>
            <textarea id="sass" class="form-control">
.navbar-inverse {
    background-color: $navbar-bg-color;
    border-bottom-color: $navbar-bg-color;
    min-height: $navbar-height;
}
.navbar-nav>li>a {
    padding-top: ($navbar-height / 2);
    padding-bottom: ($navbar-height / 2);
}
.navbar-brand {
    padding-top: ($navbar-height / 2);
    padding-bottom: ($navbar-height / 2);
}
.main-container {
    margin-top: $navbar-height + 30px;
}
.navbar-inverse .navbar-nav>.active>a,
.navbar-inverse .navbar-nav>.active>a:focus,
.navbar-inverse .navbar-nav>.active>a:hover {
    background-color: saturate( $navbar-bg-color, 20%);
}
            </textarea>
        </div>
        <div class="col-xs-4">
            <label>CSS</label>
            <textarea id="css" class="form-control"></textarea>
        </div>
    </div>
</div>
<style>
    .source-container textarea {
        min-height: 200px;
    }

    .source-container textarea {
        min-height: 100px;
    }
</style>
<style id="scss_result"></style>

<script src="js/jquery-3.1.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/farbtastic.js"></script>
<script src="dist/sass.js"></script>
<script>
    var sass = new Sass();
    var variables = [
        {name: "navbar-bg-color", value: "#534D64" },
        {name: "navbar-height", value: "30px" }
    ];

    function ColorCallback(color) {
        $('#color').val(color);
        $.each(variables, function(i, v) {
            if(v.name == 'navbar-bg-color') {
                variables[i].value = color;
            }
        });
        Compile();
    }

    function BuildVariables() {
        var variables_txt = '';
        $.each(variables, function(i, v) {
            var variable = '$' + v.name +': '+ v.value + ';';
            variables_txt = variables_txt + variable + '\n';
        });
        $('#variables').val(variables_txt);
    }

    function Compile() {
        BuildVariables();

        sass.compile($('#variables').val() + $('#sass').val(), function(result) {
            if(result.status != 0) {
                $('console').val(result.formatted);
            }
            $('#scss_result').html(result.text)

            $('#css').text(result.text);
        });
    }


        $('#color').farbtastic('#picker');
        $.farbtastic('#picker').linkTo(ColorCallback);
        $.farbtastic('#picker').setColor($('#color').val());

        $( "#slider" ).slider({
            value: 30,
            min: 30,
            max: 120,
            step: 8,
            slide: function( event, ui ) {
                $.each(variables, function(i, v) {
                    if(v.name == 'navbar-height') {
                        variables[i].value = ui.value +'px'
                    }
                });
                Compile();
            }
        });


    // first compile
   Compile();



</script>
</body>
</html>