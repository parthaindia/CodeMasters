<html lang="en">
    <head>
        <%@include file="common.jsp"%>
    </head>
    <body>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-6" style="width:700px;"><br><br><br><br><br><br><br><br>

                    <div id='slimey' style="float:left;">
                        <div id='leye' class='eye'></div>
                        <div id='reye' class='eye'></div>
                        <div id='nose1'></div>
                    </div>

                    <div id='slimey' style="float:left;margin-left:45px;">
                        <div id='leye' class='eye'></div>
                        <div id='reye' class='eye'></div>
                        <div id='nose2'></div>
                    </div>

                    <div id='slimey' style="float:left;margin-left:75px;">
                        <div id='leye' class='eye'></div>
                        <div id='reye' class='eye'></div>
                        <div id='nose3'></div>
                    </div>

                    <div id='slimey' style="float:left;margin-left:75px;">
                        <div id='leye' class='eye'></div>
                        <div id='reye' class='eye'></div>
                        <div id='nose4'></div>
                    </div>

                    <div id='slimey' style="float:left;margin-left:75px;">
                        <div id='leye' class='eye'></div>
                        <div id='reye' class='eye'></div>
                        <div id='nose5'></div>
                    </div>

                    <div id='slimey' style="float:left;margin-left:45px;">
                        <div id='leye' class='eye'></div>
                        <div id='reye' class='eye'></div>
                        <div id="drops2"></div>
                        <div id="drops1"></div>
                        <div id="drops4"></div>
                        <div id="drops3"></div>

                        <div id='nose6'></div>
                    </div>
                    <br><br><br>
                    <div id="slider1" class="slider-primary mb20"></div>
                    <div style="float:right;margin-right:-90px;margin-top: -58px;width:10%;;">
                        <input type="text" id="spinner1" size="3" maxlength="3" onkeyup="if (/[^0-9\.]/g.test(this.value))
                                    this.value = this.value.replace(/[^0-9\.]/g, '')" class="form-control">
                    </div>
                    <br><br><br>
                    <input type="button" onclick="getVal()" value="get"/>
                </div><!-- col-md-6 -->
            </div><!-- row -->
        </div><!-- panel-body -->

        <style>
            /*            #leye{
                            left:25%;
                        }
                        #reye{
                            right:25%;
                        }
                        .eye{
                            position:absolute;
                            background:black;
                            border-radius:100%;
                            height:10px;
                            width:10px;
                            top:13px;
                        }
                        #drops1{
                            position:absolute;
                            background:black;
                            border-radius:100%;
                            height:4px;
                            width:2px;
                            top:25px;
                            left:16.5px;
                        }
                        #drops2{
                            position:absolute;
                            background:black;
                            border-radius:100%;
                            height:2px;
                            width:3px;
                            top:27px;
                            left:16.2px;
                        }
                        #drops3{
                            position:absolute;
                            background:black;
                            border-radius:100%;
                            height:4px;
                            width:2px;
                            top:25px;
                            right:16.5px;
                        }
                        #drops4{
                            position:absolute;
                            background:black;
                            border-radius:100%;
                            height:2px;
                            width:3px;
                            top:27px;
                            right:16.2px;
                        }
                        #slimey {
                            margin:auto;
                            background:Yellow;
                            border-radius:100%;
                            height:60px;
                            width:60px;
                            position:relative;
                            top:-12px;
                        }
                        #lips {
                            width:50px;
                            height:20px;
                            position:absolute;
                            top:calc(80% - 10px);
                            left:calc(50% - 25px);
                            background:transparent;
                            border-top:2px black solid;
                            -webkit-transform:rotateX(0deg);
                            border-radius:100%;
                            transform:rotateX(0deg);
                        }
                        #nose1 {
                            width:60%;
                            height:40%;
                            position:absolute;
                            top:calc(60% - 10px);
                            left:calc(65% - 25px);
                            background:transparent;
                            border-top:3px black solid;
                            -webkit-transform:rotateX(15deg);
                            border-radius:100%;
                            transform:rotateX(180deg);
                        }
                        #nose2 {
                            width:30px;
                            height:20px;
                            position:absolute;
                            top:calc(70% - 10px);
                            left:calc(70% - 25px);
                            background:transparent;
                            border-top:2px black solid;
                            -webkit-transform:rotateX(10deg);
                            border-radius:100%;
                            transform:rotateX(140deg);
                        }
                        #nose3 {
                            width:30px;
                            height:20px;
                            position:absolute;
                            top:calc(68% - 10px);
                            left:calc(70% - 25px);
                            background:transparent;
                            border-top:1.5px black solid;
                            -webkit-transform:rotateX(5deg);
                            border-radius:60%;
                            transform:rotateX(160deg);
                        }
                        #nose4 {
                            width:30px;
                            height:20px;
                            position:absolute;
                            top:calc(80% - 10px);
                            left:calc(70% - 25px);
                            background:transparent;
                            border-top:1px black solid;
                            -webkit-transform:rotateX(0deg);
                            border-radius:100%;
                            transform:rotateX(-30deg);
                        }
                        #nose5 {
                            width:30px;
                            height:20px;
                            position:absolute;
                            top:calc(80% - 10px);
                            left:calc(70% - 25px);
                            background:transparent;
                            border-top:2px black solid;
                            -webkit-transform:rotateX(0deg);
                            border-radius:100%;
                            transform:rotateX(0deg);
                        }
                        #nose6 {
                            width:30px;
                            height:20px;
                            position:absolute;
                            top:calc(80% - 10px);
                            left:calc(70% - 25px);
                            background:transparent;
                            border-top:3px black solid;
                            -webkit-transform:rotateX(0deg);
                            border-radius:100%;
                            transform:rotateX(0deg);
                        }
                        #smileSlide {
                            width:100px;
                            position:absolute;
                            left:calc(50% - 50px);     
                        }*/
        </style>
        <script>

//            // Basic Slider
            jQuery('#slider1').slider({
                range: "min",
                min: 0,
                max: 10,
                step: 0.5,
                value: 0,
                rest: 'label'
//                orientation: 'vertical'
            });
            jQuery('#slider1').slider('pips', {
                rest: 'label'
            }).slider('float');

            jQuery('#slider1').slider({stop: function(event, ui) {
                    $("#spinner1").val($("#slider1").slider("option", "value"));
                }});

            var spinner1 = jQuery('#spinner1').spinner({min: 0, max: 10, step: 0.5, stop: function(event, ui) {
                    $("#slider1").slider("value", $("#spinner1").val());
                }});
            spinner1.spinner('value', 0);

            function getVal() {
                alert($("#slider1").slider("option", "value"));
            }
        </script>
    </body>
</html>