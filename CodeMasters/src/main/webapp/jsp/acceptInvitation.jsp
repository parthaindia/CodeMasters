<html>
    <%@include file="common.jsp"%>
    <body class="signin" onload="setNewUserData();">
        <section>
            <div class="panel panel-signin">

                <div class="panel-body" id="panel-body">
                    <div class="logo text-center">
                        <img src="../images/logo-primary.png" alt="iRheum" >
                    </div>
                    <h4 class="text-center mb5">Please provide your credentials</h4>
                    <div class="mb30"></div>

                    <div id="physicianstatus"></div>

                    <div class="form-group">
                        <input type="text" class="form-control" id="username_inv" placeholder="Username" onkeyup="accept_inv_key(event)" required="required"> 
                        <input type="hidden" id="physicianemail1">
                        <input type="hidden" id="physicianRole">
                        <input type="hidden" id="physicianOrgId">
                        <input type="hidden" id="token">
                        <span id="invUname"></span>
                    </div><!-- form-group -->

                    <div class="form-group">
                        <input type="password" class="form-control" id="password_inv" placeholder="Password" onkeyup="accept_inv_key(event)" required="required">
                        <span id="invPass"></span>
                    </div><!-- form-group -->                    

                    <div class="form-group">
                        <div class="ckbox ckbox-primary col-sm-12">
                            <input type="checkbox" name="physicianinvi" value="yes" id="physicianinvitationlicense" style="height:10px;" onclick="accept_inv_key(event)">
                            <label for="physicianinvitationlicense">I Agree terms & conditions</label><a href="javascript:showLicenseDocument('showInvitationLicenseDiv')">  click here</a>
                            <br><span id="invlicenseMsg"></span>
                        </div>
                    </div>
                    <div id="showInvitationLicenseDiv"></div>

                    <div class="clearfix"><br>
                        <center><div><button id="forgot_btn" class="btn btn-success" onclick="addPhysicianToOrg()">Accept Invitation</button></div></center>
                    </div>
                </div><!-- panel-body -->
                <div class="panel-footer" style="height:50px;">
                    <center><span style="color:green;">Powered by <a href="http://www.accuresoftware.com" target="_blank"><img src="../images/accuresoftware.png" class="accureFooterLogo"></a></span></center>
                </div>
            </div><!-- panel -->
        </section>
    </body>
</html>