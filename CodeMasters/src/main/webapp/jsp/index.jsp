<html>
    <%@include file="common.jsp"%>
    <body class="signin" style="color:#D9B761;" onload="loadLoginPage()">
        <section>
            <div class="panel panel-signin" >

                <div class="panel-body">
                    <div class="logo text-center">
                        <a href="http://www.accuresoftware.com" target="_blank"><img src="../images/reconix.png" class="accureHeaderLogo"></a>
                    </div>
                    <!--<h4 class="text-center" style="font-size:20px;color:rgb(105, 195, 101);font-weight: 700;">Reconix</h4>-->
                    <p class="text-center" style="font-size:14px;color:rgb(56, 97, 75);">Please use your credentials to Sign in</p>
<!--#FFE298
#D9B761-->

<!--#F2EB9E-->
                    <div class="mb30"></div>

                    <div id="usernameDiv" class="input-group mb15">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input type="text" class="form-control" id="username_id" placeholder="Username" onkeyup="login_key(event)">
                    </div><!-- input-group -->

                    <div id="passwordDiv" class="input-group mb15">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                        <input type="password" class="form-control" id="password_id" placeholder="Password" onkeyup="login_key(event)">
                    </div><!-- input-group -->

                    <div class="clearfix">
                        <div class="pull-left">
                            <div class="mt10">
                                <a href="../jsp/forgot.jsp">Forgot your password?</a>
                            </div>
                        </div>
                        <div class="pull-right">
                            <button  id="login_btn" class="btn btn-success" style="font-weight: 700;font-size: 14px;" onclick="login()">Login</button>
                        </div>
                    </div><span id="uperror"></span>
                </div>
                <center><span class="badge badge-primary mb5" style="font-size: 15px;"></span></center>
                <div class="panel-footer" style="height:75px;">
                  
                    <center>
                        <a href="https://www.facebook.com" target="_blank" class="socialIcons"><i class="fa fa-facebook"></i></a>
                        <a href="https://twitter.com" target="_blank" class="socialIcons"><i class="fa fa-twitter"></i></a>
                        <a href="#" class="socialIcons"><i class="fa fa-google-plus" class="socialIcons"></i></a>
                        <a href="https://www.linkedin.com" target="_blank" class="socialIcons"><i class="fa fa-linkedin"></i></a>
                        <br>
                        <span style="color:black;">&copy; 2016 CodeMasters.</span>
                    </center>
                </div>

            </div>
        </section>        
    </body>
</html>