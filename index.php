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
        <h1>Proof of Concept</h1>
        <p class="lead">Use the controls to change the properties of the nav bar.</p>
        <p>This takes variables and css written in Sass and compiles them in the browser.</p>
    </div>
    <div class="row">
        <div class="col-xs-4">
            <form action="" style="width: 400px;">
                <div class="col-xs-12">
                    <div id="picker"></div>
                </div>
            </form>
        </div>
        <div class="col-xs-4">
            <div class="form-item">
                <div>
                    <label for="color">Navbar Color:</label>
                    <input type="text" id="color" name="color" value="#534D64" />
                </div>
                <div class="color-preview"></div>
            </div>
            <label for="slider">Navbar Height:</label>
            <div id="slider"></div>
        </div>
    </div>


</div>
<div class="container source-container">
    <p>&nbsp;</p>
    <div class="row">
        <div class="col-xs-4">
            <label>Variables (Sass)</label>
            <textarea id="variables" class="form-control"></textarea>
        </div>
        <div class="col-xs-4">
            <label>Style (Sass)</label>
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
            <label>Output (CSS)</label>
            <textarea id="css" class="form-control"></textarea>
        </div>
    </div>
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
<style>

    .color-preview {
        height: 64px;
        width: 64px;
        display: inline-block;
    }
    .source-container textarea {
        min-height: 200px;
    }

    .source-container textarea {
        min-height: 100px;
    }

    .navbar-inverse {
        background-color: #534D64;
        border-bottom-color: #534D64;
        min-height: 62px; }

    .navbar-nav > li > a {
        padding-top: 31px;
        padding-bottom: 31px; }

    .navbar-brand {
        padding-top: 31px;
        padding-bottom: 31px; }

    .main-container {
        margin-top: 92px; }

    .navbar-inverse .navbar-nav > .active > a,
    .navbar-inverse .navbar-nav > .active > a:focus,
    .navbar-inverse .navbar-nav > .active > a:hover {
        background-color: #4b3b76; }
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
        {name: "navbar-height", value: "72px" }
    ];

    function ColorCallback(color) {
        $('#color').val(color);
        $('.color-preview').css('background-color', color);
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
            value: 90,
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