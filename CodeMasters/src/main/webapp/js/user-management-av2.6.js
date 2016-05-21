var orgname = "";
var website = "";
var user_selected_org = getUserSessionElement("user_selected_org");
function addNewUserTab() {
//for add new user menu    
    $("#mainTabMenuDiv").append("<div class='tab-pane active' id='addNewUser' />");
    $("#addNewUser").append("<div id='newUserFormDiv' class='form-group' />");
    $("#newUserFormDiv").append("<label class='col-sm-3 control-label'>Select Role</label>");
    $("#newUserFormDiv").append("<div id='userSelectField' class='col-sm-9' />");
    $("#userSelectField").append("<select id='roleSelect' name='roleSelect' class='form-control' onchange='getRoleInfo()' />");
    $("#roleSelect").append("<option>Choose One</option><option>Provider</option><option>Nurse</option><option name='FrontDesk' value='FrontDesk'>Front Desk</option><option>Admin</option><option>Temp</option><option>Patient</option><option name='SuperAdmin' value='SuperAdmin'>Super Admin</option>");
    $('#allUserMenuTab').click(function() {
        getRoleInfo1();
    });
}

//user management start
function getRoleInfo1() {
    var roleIndex = document.getElementById("roleSelect").selectedIndex;
    document.getElementById("roleSelect").options[roleIndex].text = "Choose One";
    getRoleInfo();
}

//displying drop down in user management start
function getRoleInfo() {
    var roleIndex = document.getElementById("roleSelect").selectedIndex;
    var roleName = document.getElementById("roleSelect").options[roleIndex].text;
    if (roleName == "Choose One" || roleName == "") {
        $("#addNewUser").text("").append("<div class='form-group' id='roleSelection' />");
        $("#roleSelection").append("<lable class='col-sm-3 control-label'> Select Role </lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='roleSelectElement'/>");
        $("#roleSelectElement").append("<select id='roleSelect' class='form-control' onchange='getRoleInfo()'>");
        $("#roleSelect").append("<option>Choose One</option>");
        $("#roleSelect").append("<option>Provider</option>");
        $("#roleSelect").append("<option>Nurse</option>");
        $("#roleSelect").append("<option>FrontDesk</option>");
        $("#roleSelect").append("<option>Admin</option>");
        $("#roleSelect").append("<option>Temp</option>");
        $("#roleSelect").append("<option>Patient</option>");
        $("#roleSelect").append("<option>SuperAdmin</option>");
    } else if (roleName == "Provider") {
        $("#addNewUser").text("").append("<div class='form-group' id='roleSelection' />");
        $("#roleSelection").append("<center><span id='providerInsertionStatus'></span></center>");
        $("#roleSelection").append("<lable class='col-sm-3 control-label'> Select Role </lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='roleSelectElement'/>");
        $("#roleSelectElement").append("<select id='roleSelect' class='form-control' onchange='getRoleInfo()'> ");
        $("#roleSelect").append("<option value=''>Choose One</option>");
        $("#roleSelect").append("<option>Provider</option>");
        $("#roleSelect").append("<option>Nurse</option>");
        $("#roleSelect").append("<option name='FrontDesk' value='FrontDesk'>Front Desk</option>");
        $("#roleSelect").append("<option>Admin</option>");
        $("#roleSelect").append("<option>Temp</option>");
        $("#roleSelect").append("<option>Patient</option>");
        $("#roleSelect").append("<option name='SuperAdmin' value='SuperAdmin'>Super Admin</option>");
        $("#roleSelectElement").append("<br />");
        document.getElementById("roleSelect").value = roleName.replace(/\s/g, '');
        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Email *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='emailElement'/>");
        $("#emailElement").append("<input type='email' onkeyup='providerUser_keypress(event)' id='providerEmailElement' class='form-control' placeholder='Enter Email'><span id='providerEmailElementMsg' /><br />");
        $("#providerEmailElement").focus();

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Re-enter Email *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='retypeEmailElement'/>");
        $("#retypeEmailElement").append("<input type='email' onkeyup='providerUser_keypress(event)' id='providerRetypeEmailElement' class='form-control' placeholder='Re-enter Email'><span id='providerRetypeEmailElementMsg' /><br />");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>First name *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='fnameElement'/>");
        $("#fnameElement").append("<input type='text' onkeyup='providerUser_keypress(event)' id='providerFirstNameElement' class='form-control' placeholder='Enter First name'><span id='providerFirstNameElementMsg' /><br />");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Last name *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='lnameElement'/>");
        $("#lnameElement").append("<input type='text' onkeyup='providerUser_keypress(event)' id='providerLastNameElement' class='form-control' placeholder='Enter Last name'><span id='providerLastNameElementMsg' /><br />");

        $("#roleSelection").append("<div class='col-sm-9 col-sm-offset-3' id='submitButtonElement' />");
        $("#submitButtonElement").append("<button id='providerUserSubmitButton' class='btn btn-primary mr5' onclick='providerUserInsert()'>Submit</button>");
    } else {
        $("#addNewUser").text("").append("<div class='form-group' id='roleSelection' />");
        $("#roleSelection").append("<center><span id='providerInsertionStatus'></span></center>");
        $("#roleSelection").append("<lable class='col-sm-3 control-label'> Select Role </lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='roleSelectElement'/>");
        $("#roleSelectElement").append("<select id='roleSelect' class='form-control' onchange='getRoleInfo()'> ");
        $("#roleSelect").append("<option value=''>Choose One</option>");
        $("#roleSelect").append("<option>Provider</option>");
        $("#roleSelect").append("<option>Nurse</option>");
        $("#roleSelect").append("<option name='FrontDesk' value='FrontDesk'>Front Desk</option>");
        $("#roleSelect").append("<option>Admin</option>");
        $("#roleSelect").append("<option>Temp</option>");
        $("#roleSelect").append("<option>Patient</option>");
        $("#roleSelect").append("<option  name='SuperAdmin' value='SuperAdmin'>Super Admin</option>");
        $("#roleSelectElement").append("<br/>");
        document.getElementById("roleSelect").value = roleName.replace(/\s/g, '');

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Username *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='userNameElement'/>");
        $("#userNameElement").append("<input type='text' onkeyup='otherUser_keypress(event)' id='otherUserUserNameElement' size=10 maxlength=10 class='form-control popovers' placeholder='Enter Username' data-toggle='popover' data-placement='top' data-content='UserName : Please enter username between 4-10 characters and 0-9 Numbers.' data-trigger='blur'><a href='javascript:checkOtherUsername()' id='checkAvailabilityId'><b>Check Availability</b></a><span id='otherUserUserNameElementMsg' /><br /><br />");
        $("#checkAvailabilityId").show();

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>First name *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='fnameElement'/>");
        $("#fnameElement").append("<input type='text' onkeyup='otherUser_keypress(event)' id='otherUserFirstNameElement' class='form-control' placeholder='Enter First name'><span id='otherUserFirstNameElementMsg' /><br />");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Middle name</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='mnameElement'/>");
        $("#mnameElement").append("<input type='text' onkeyup='otherUser_keypress(event)' id='otherUserMiddleNameElement' class='form-control' placeholder='Enter Middle name'><span id='otherUserMiddleNameElementMsg' /><br />");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Last name *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='lnameElement'/>");
        $("#lnameElement").append("<input type='text' onkeyup='otherUser_keypress(event)' id='otherUserLastNameElement' class='form-control' placeholder='Enter Last name'><span id='otherUserLastNameElementMsg' /><br />");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Gender</lable>");
        $("#roleSelection").append("<div id='genderElementDiv' class='btn-group col-sm-9' data-toggle='buttons' />");
        $("#genderElementDiv").append("<label class='btn blue btn-default' style='border-radius: 3px; font-weight: 600;' id='r_gen_m'><input type='radio' id='r_gender_m' name='r_gender' value='Male' />Male</label><label class='btn blue btn-default' style='margin-left: 15px; border-radius: 3px; font-weight: 600;' id='r_gen_f'><input type='radio' id='r_gender_f' name='r_gender' value='Female' />Female</label><br />");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Date of Birth</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='dobElement'/>");
        $("#dobElement").append("<input type='text' id='otherUserDobElement' class='form-control' onchange='otherUser_keypress(event)' placeholder='MM/DD/YYYY'><span id='otherUserDobElementMsg' /><br />");
        jQuery("#otherUserDobElement").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: datePickerRange,
            maxDate: new Date,
            minDate: new Date(1900, 0, 1)
        });
        jQuery("#otherUserDobElement").mask("99/99/9999");

//hidden education field
        $("#roleSelection").append("<input type='hidden' id='otherUserEducationElement' value='' />");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Email 1 *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='email1Element'/>");
        $("#email1Element").append("<input type='email' onkeyup='otherUser_keypress(event)' id='otherUserEmail1Element' class='form-control' placeholder='Enter Email 1'><span id='otherUserEmail1ElementMsg' /><br />");
        $("#otherUserEmailElement").focus();

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Re-type Email 1 *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='retypeEmailElement'/>");
        $("#retypeEmailElement").append("<input type='email' onkeyup='otherUser_keypress(event)' id='otherUserRetypeEmailElement' class='form-control' placeholder='Re-type Email 1'><span id='otherUserRetypeEmailElementMsg' /><br />");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Email 2</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='email2Element'/>");
        $("#email2Element").append("<input type='email' onkeyup='otherUser_keypress(event)' id='otherUserEmail2Element' class='form-control' placeholder='Enter Email 2'><span id='otherUserEmail2ElementMsg' /><br />");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Address1 *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='address1Element'/>");
        $("#address1Element").append("<input type='text' onkeyup='otherUser_keypress(event)' id='otherUserAddress1Element' class='form-control' placeholder='Enter Address'><span id='otherUserAddress1ElementMsg' /><br />");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Address2</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='addressElement2'/>");
        $("#addressElement2").append("<input type='text' onkeyup='otherUser_keypress(event)' id='otherUserAddress2Element' class='form-control' placeholder='Enter Address'><br />");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>City *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='cityElement'/>");
        $("#cityElement").append("<input type='text' onkeyup='otherUser_keypress(event)' id='otherUserCityElement' class='form-control' placeholder='Enter City'><span id='otherUserCityElementMsg' /><br />");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>State *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='stateElement' onchange='otherUser_keypress(event)' />");
        $("#stateElement").append("<select id='otherUserStateElement' class='form-control' /><span id='otherUserStateElementMsg' /><br />");
        //$("#otherUserStateElement").append("<option value=''>Choose One</option><option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>");
        $("#otherUserStateElement").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Country</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='countryElement'/>");
        $("#countryElement").append("<select id='otherUserCountryElement' class='form-control' /><br />");
        $("#otherUserCountryElement").append("<option>USA</option>");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Zip</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='zipCodeElement'/>");
        $("#zipCodeElement").append("<input type='text' onkeyup='otherUser_keypress(event)' id='otherUserZipCodeElement' class='form-control' placeholder='Enter Zip'><br />");
        jQuery("#otherUserZipCodeElement").mask('99999');

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Fax</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='faxElement'/>");
        $("#faxElement").append("<input type='text' onkeyup='otherUser_keypress(event)' id='otherUserFaxElement' class='form-control' placeholder='Enter Fax'><br />");
        jQuery("#otherUserFaxElement").mask('999.999.9999');

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Home phone</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='homePhoneElement'/>");
        $("#homePhoneElement").append("<input type='text' onkeyup='otherUser_keypress(event)' id='otherUserHomePhoneElement' class='form-control' placeholder='Enter home phone'><br />");
        jQuery("#otherUserHomePhoneElement").mask("(999)999-9999");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Work phone</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='workPhoneElement'/>");
        $("#workPhoneElement").append("<input type='text' onkeyup='otherUser_keypress(event)' id='otherUserWorkPhoneElement' class='form-control' placeholder='Enter work phones'><br />");
        jQuery("#otherUserWorkPhoneElement").mask("(999)999-9999");

        $("#roleSelection").append("<lable class='col-sm-3 control-label'>Mobile phone *</lable>");
        $("#roleSelection").append("<div class='col-sm-9' id='MobileElement'/>");
        $("#MobileElement").append("<input type='text' onkeyup='otherUser_keypress(event)' id='otherUserMobilePhoneElement' class='form-control' placeholder='Enter mobile number'><span id='otherUserMobilePhoneElementMsg' /><br />");
        jQuery("#otherUserMobilePhoneElement").mask("(999)999-9999");

        $("#roleSelection").append("<div class='col-sm-9 col-sm-offset-3' id='submitButtonElement' />");
        $("#submitButtonElement").append("<button id='otherUserSubmitButton' class='btn btn-primary mr5' onclick='otherUserInsert()'>Submit</button>");
        $("#submitButtonElement").append("<span id='providerMessage'></span>");
    }
}//displying drop down in user management end


//if provider is selected submit button function start
function providerUserInsert() {
//validation start
    if ($("#providerEmailElement").val() == "") {
        $("#emailElement").addClass("has-error");
        $("#providerEmailElement").focus();
        $("#providerEmailElementMsg").text("").append("<span class='smallErrorMsg'>Please enter email address.</span>");
    } else if ($("#providerEmailElement").val() != "") {
        if (!$("#providerEmailElement").val().match((ValidateEmail()))) {
            $("#emailElement").addClass("has-error");
            $("#providerEmailElement").focus();
            $("#providerEmailElementMsg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
            return false;
        } else {
            $("#emailElement").removeClass("has-error");
            $("#providerEmailElementMsg").text("");
        }
    }

    if ($("#providerRetypeEmailElement").val() == "") {
        $("#retypeEmailElement").addClass("has-error");
        $("#providerRetypeEmailElement").focus();
        $("#providerRetypeEmailElementMsg").text("").append("<span class='smallErrorMsg'>Please enter retype email address.</span>");
    } else if ($("#providerRetypeEmailElement").val() != "") {
        if ($("#providerEmailElement").val() != $("#providerRetypeEmailElement").val()) {
            $("#retypeEmailElement").addClass("has-error");
            $("#providerRetypeEmailElement").focus();
            $("#providerRetypeEmailElementMsg").text("").append("<span class='smallErrorMsg'>Email and Retype Email must be same.</span>");
            return false;
        } else {
            $("#retypeEmailElement").removeClass("has-error");
            $("#providerRetypeEmailElementMsg").text("");
        }
    }

    if ($("#providerFirstNameElement").val() == "") {
        $("#fnameElement").addClass("has-error");
        $("#providerFirstNameElement").focus();
        $("#providerFirstNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter first name.</span>");
    } else if ($("#providerFirstNameElement").val() != "") {
        if (!$("#providerFirstNameElement").val().match((cityExpression()))) {
            $("#providerFirstNameElement").focus();
            $("#fnameElement").addClass("has-error");
            $("#providerFirstNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
            return false;
        } else {
            $("#fnameElement").removeClass("has-error");
            $("#providerFirstNameElementMsg").text("");
        }
    }

    if ($("#providerLastNameElement").val() == "") {
        $("#lnameElement").addClass("has-error");
        $("#providerLastNameElement").focus();
        $("#providerLastNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter last name.</span>");
    } else if ($("#providerLastNameElement").val() != "") {
        if (!$("#providerLastNameElement").val().match((cityExpression()))) {
            $("#providerLastNameElement").focus();
            $("#lnameElement").addClass("has-error");
            $("#providerLastNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid last name.</span>");
            return false;
        } else {
            $("#lnameElement").removeClass("has-error");
            $("#providerLastNameElementMsg").text("");
        }
    }

    if ($("#providerEmailElement").val() == "" || $("#providerRetypeEmailElement").val() == "" || $("#providerFirstNameElement").val() == "" || $("#providerLastNameElement").val() == "") {
        $("#providerInsertionStatus").text("").prepend("<span class='largeErrorMsg'>Please fill all * marked fields.</span>");
    } else {
        $("#providerUserSubmitButton").attr("disabled", true);
        $("#providerInsertionStatus").text("");
        $.get(server_base_url + "/irheum-server/PhysicianInvitation", {
            userroles: document.getElementById("roleSelect").value,
            email1: $("#providerEmailElement").val(),
            retypeemail: $("#providerRetypeEmailElement").val(),
            fname: $("#providerFirstNameElement").val(),
            lname: $("#providerLastNameElement").val()
        }).done(function(data) {
            if (data == "201" || data == "500") {
                $("input[type='text']").attr('readonly', true);
                $("input[type='email']").attr('readonly', true);
                $("input[type='text']").attr('disabled', true);
                $("input[type='email']").attr('disabled', true);
                $("#roleSelect").attr('disabled', true);
                displayLargeSuccessMessages("providerInsertionStatus", "Account creation successful and invitation sent to emailid.<br /><br />");
                $("#submitButtonElement").text("").append("<button class='btn btn-primary mr5' onclick='getRoleInfo1()'>Add New</button>");
            } else if (data == "Email is already registered") {
                $("#providerUserSubmitButton").attr("disabled", false);
                displaySmallErrorMessages("providerEmailElementMsg", "Email is already registered.");
                displayLargeErrorMessages("providerInsertionStatus", "Email is already registered.");
            } else if (data == "Email Must Match With Re-Type Email") {
                $("#providerUserSubmitButton").attr("disabled", false);
                displaySmallErrorMessages("providerRetypeEmailElementMsg", "Email and Retype Email must be same.");
                displayLargeErrorMessages("providerInsertionStatus", "Email and Retype Email must be same.");
            } else if (data == fail) {
                $("#providerUserSubmitButton").attr("disabled", false);
                displayLargeErrorMessages("providerInsertionStatus", failMessage);
            } else if (data == unauthorized) {
                $("#providerUserSubmitButton").attr("disabled", false);
                displayLargeErrorMessages("providerInsertionStatus", unauthorizedMessage);
            } else if (data == invalidSession) {
                callSessionTimeout();
            }
        });
    }//validation if end
}//if provider is selected submit button function end

//provider form keypress start
function providerUser_keypress(event) {
    if ($("#providerEmailElement").val() != "") {
        if ($("#providerEmailElement").val().match((spaceExpression()))) {
            $('#providerEmailElement').val($('#providerEmailElement').val().replace(/\s/g, ''));
        }
        if (!$("#providerEmailElement").val().match((ValidateEmail()))) {
            $("#emailElement").addClass("has-error");
            $("#providerEmailElement").focus();
            $("#providerEmailElementMsg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
            return false;
        } else {
            $("#emailElement").removeClass("has-error");
            $("#providerEmailElementMsg").text("");
        }
    }

    if ($("#providerRetypeEmailElement").val() != "") {
        if ($("#providerRetypeEmailElement").val().match((spaceExpression()))) {
            $('#providerRetypeEmailElement').val($('#providerRetypeEmailElement').val().replace(/\s/g, ''));
        }
        if ($("#providerEmailElement").val() != $("#providerRetypeEmailElement").val()) {
            $("#retypeEmailElement").addClass("has-error");
            $("#providerRetypeEmailElement").focus();
            $("#providerRetypeEmailElementMsg").text("").append("<span class='smallErrorMsg'>Email and Retype Email must be same.</span>");
            return false;
        } else {
            $("#retypeEmailElement").removeClass("has-error");
            $("#providerRetypeEmailElementMsg").text("");
        }
    }

    if ($("#providerFirstNameElement").val() != "") {
        if (!$("#providerFirstNameElement").val().match((cityExpression()))) {
            $("#providerFirstNameElement").focus();
            $("#fnameElement").addClass("has-error");
            $("#providerFirstNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
            return false;
        } else {
            $("#fnameElement").removeClass("has-error");
            $("#providerFirstNameElementMsg").text("");
        }
    }

    if ($("#providerLastNameElement").val() != "") {
        if (!$("#providerLastNameElement").val().match((cityExpression()))) {
            $("#providerLastNameElement").focus();
            $("#lnameElement").addClass("has-error");
            $("#providerLastNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid last name.</span>");
            return false;
        } else {
            $("#lnameElement").removeClass("has-error");
            $("#providerLastNameElementMsg").text("");
        }
    }

    if ($("#providerEmailElement").val() != "" && $("#providerRetypeEmailElement").val() != "" && $("#providerFirstNameElement").val() != "" && $("#providerLastNameElement").val() != "") {
        $("#providerInsertionStatus").text("");
    }

//    if (event.which == 13) {
//        providerUserInsert();
//        return false;
//    }
}//provider form keypress end


//if other roles is selected submit button function start
function otherUserInsert() {
//validation start
    if ($("#otherUserUserNameElement").val() == "") {
        $("#userNameElement").addClass("has-error");
        $("#otherUserUserNameElement").focus();
        $("#otherUserUserNameElementMsg").text("").append("<br /><span class='smallErrorMsg'>Please enter user name.</span>");
    } else if ($("#otherUserUserNameElement").val() != "") {
        $("#userNameElement").removeClass("has-error");
        $("#otherUserUserNameElementMsg").text("");
        if (!isNaN($("#otherUserUserNameElement").val()) == true) {
            $("#userNameElement").addClass("has-error");
            $('#otherUserUserNameElement').popover('show');
            $("#otherUserUserNameElement").focus();
            $("#otherUserUserNameElementMsg").text("").append("<br /><span class='smallErrorMsg'>Please enter valid user name.</span>");
            return false;
        } else if (!$("#otherUserUserNameElement").val().match(usernameExpression())) {
            $("#userNameElement").addClass("has-error");
            $('#otherUserUserNameElement').popover('show');
            $("#otherUserUserNameElement").focus();
            return false;
        } else if ($("#otherUserUserNameElement").val().match(usernameExpression())) {
            $("#userNameElement").removeClass("has-error");
            $('#otherUserUserNameElement').popover('hide');
        }
        checkOtherUsername();
    }

    if ($("#otherUserFirstNameElement").val() == "") {
        $("#fnameElement").addClass("has-error");
        $("#otherUserFirstNameElement").focus();
        $("#otherUserFirstNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter first name.</span>");
    } else if ($("#otherUserFirstNameElement").val() != "") {
        if (!$("#otherUserFirstNameElement").val().match((cityExpression()))) {
            $("#otherUserFirstNameElement").focus();
            $("#fnameElement").addClass("has-error");
            $("#otherUserFirstNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
            return false;
        } else {
            $("#fnameElement").removeClass("has-error");
            $("#otherUserFirstNameElementMsg").text("");
        }
    }

    if ($("#otherUserEmail1Element").val() == "") {

        $("#email1Element").addClass("has-error");
        $("#otherUserEmail1Element").focus();
        $("#otherUserEmail1ElementMsg").text("").append("<span class='smallErrorMsg'>Please enter email address.</span>");
    } else if ($("#otherUserEmail1Element").val() != "") {
        if (!$("#otherUserEmail1Element").val().match((ValidateEmail()))) {
            $("#email1Element").addClass("has-error");
            $("#otherUserEmail1Element").focus();
            $("#otherUserEmail1ElementMsg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
            return false;
        } else {
            $("#email1Element").removeClass("has-error");
            $("#otherUserEmail1ElementMsg").text("");
        }
    }

    if ($("#otherUserRetypeEmailElement").val() == "") {
        $("#retypeEmailElement").addClass("has-error");
        $("#otherUserRetypeEmailElement").focus();
        $("#otherUserRetypeEmailElementMsg").text("").append("<span class='smallErrorMsg'>Please enter retype email address.</span>");
    } else if ($("#otherUserRetypeEmailElement").val() != "") {
        if ($("#otherUserEmail1Element").val() != $("#otherUserRetypeEmailElement").val()) {
            $("#retypeEmailElement").addClass("has-error");
            $("#otherUserRetypeEmailElement").focus();
            $("#otherUserRetypeEmailElementMsg").text("").append("<span class='smallErrorMsg'>Email and Retype Email must be same.</span>");
            return false;
        } else {
            $("#retypeEmailElement").removeClass("has-error");
            $("#otherUserRetypeEmailElementMsg").text("");
        }
    }
    if ($("#otherUserEmail2Element").val() != "") {
        if (!$("#otherUserEmail2Element").val().match((ValidateEmail()))) {
            $("#email2Element").addClass("has-error");
            $("#otherUserEmail2Element").focus();
            $("#otherUserEmail2ElementMsg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
            return false;
        } else {
            $("#email2Element").removeClass("has-error");
            $("#otherUserEmail2ElementMsg").text("");
        }
    } else {
        $("#email2Element").removeClass("has-error");
        $("#otherUserEmail2ElementMsg").text("");
    }
    if ($("#otherUserOrganisationElement").val() == "") {

        $("#orgElement").addClass("has-error");
        $("#otherUserOrganisationElement").focus();
        $("#otherUserOrganisationElementMsg").text("").append("<span class='smallErrorMsg'>Please enter Organisation.</span>");
    }
    if ($("#otherUserAddress1Element").val() == "") {

        $("#address1Element").addClass("has-error");
        $("#otherUserAddress1Element").focus();
        $("#otherUserAddress1ElementMsg").text("").append("<span class='smallErrorMsg'>Please enter address.</span>");
    }

    if ($("#otherUserwebElement").val() == "") {

        $("#webElement").addClass("has-error");
        $("#otherUserwebElement").focus();
        $("#otherUserwebElementMsg").text("").append("<span class='smallErrorMsg'>Please enter Website.</span>");
    }


    if ($("#otherUserMobilePhoneElement").val() == "") {
        $("#MobileElement").addClass("has-error");
        $("#otherUserMobilePhoneElement").focus();
        $("#otherUserMobilePhoneElementMsg").text("").append("<span class='smallErrorMsg'>Please enter mobile phone.</span>");
    }

    if ($("#otherUserUserNameElement").val() == "" ||
            $("#otherUserFirstNameElement").val() == "" ||
            $("#otherUserEmail1Element").val() == "" ||
            $("#otherUserRetypeEmailElement").val() == "" ||
            $("#otherUserOrganisationElement").val() == "" ||
            $("#otherUserwebElement").val() == "" ||
            $("#otherUserAddress1Element").val() == "" ||
            $("#otherUserMobilePhoneElement").val() == "") {
        $("#providerInsertionStatus").text("").prepend("<span id='updMsg' class='largeErrorMsg'>Please fill all * marked fields.</span>");
        $("#providerMessage").text("").prepend("<span id='updMsg' class='largeErrorMsg'>Please fill all * marked fields.</span>");
    } else {
        $("#otherUserSubmitButton").attr("disabled", true);
        $("#providerMessage").text("");
        $("#providerInsertionStatus").text("");

        var fname = $("#otherUserFirstNameElement").val();
        var mname = $("#otherUserMiddleNameElement").val();
        if (mname == undefined) {
            mname = "";
        }
        var lname = $("#otherUserLastNameElement").val();
        var website = $("#otherUserwebElement").val();
        var orgname = $("#otherUserOrganisationElement").val();
        var gender = $('input[name=r_gender]:checked').val();
        if (gender == undefined) {
            gender = "";
        }

        var dob = $("#otherUserDobElement").val();
        if (dob == undefined) {
            dob = "";
        }
        var loginid = $("#otherUserUserNameElement").val();
        var email1 = $("#otherUserEmail1Element").val();
        var email2 = $("#otherUserEmail2Element").val();
        if (email2 == undefined) {
            email2 = "";
        }
        var address1 = $("#otherUserAddress1Element").val();
        var address2 = $("#otherUserAddress2Element").val();
        if (address2 == undefined) {
            address2 = "";
        }

        var city = $("#otherUserCityElement").val();
        if (city == undefined) {
            city = "";
        }
        var state = $("#otherUserStateElement").val();
        if (state == undefined) {
            state = "";
        }
        var country = $("#otherUserCountryElement").val();
        if (country == undefined) {
            country = "";
        }
        var zipcode = $("#otherUserZipCodeElement").val();
        if (zipcode == undefined) {
            zipcode = "";
        }
        var homephone = $("#otherUserHomePhoneElement").val();
        if (homephone == undefined) {
            homephone = "";
        }
        var workphone = $("#otherUserWorkPhoneElement").val();
        if (workphone == undefined) {
            workphone = "";
        }
        var mobilephone = $("#otherUserMobilePhoneElement").val();
        var orgJson = "{\"website\":\"" + website + "\",\"orgname\":\"" + orgname + "\"}";
        var userJson = "{\"fname\":\"" + fname + "\",\"mname\":\"" + mname + "\",\"lname\":\"" + lname + "\",\"gender\":\"" + gender + "\",\"dob\":\"" + dob + "\",\"address1\":\"" + address1 + "\",\"address2\":\"" + address2 + "\",\"loginid\":\"" + loginid + "\",\"email1\":\"" + email1 + "\",\"email2\":\"" + email2 + "\",\"city\":\"" + city + "\",\"state\":\"" + state + "\",\"country\":\"" + country + "\",\"zipcode\":\"" + zipcode + "\",\"homephone\":\"" + homephone + "\",\"workphone\":\"" + workphone + "\",\"mobilephone\":\"" + mobilephone + "\"}";
        $.get(server_base_url + "UserCreate", {
            userJson: userJson,
            orgJosn: orgJson
        }).done(function(data) {
            if (data == success) {
                $('input').blur();
                $("#otherUserSubmitButton").hide();
                $("#roleSelection").prepend("<button style='float:right;' class='btn btn-primary mr5' onclick='getRoleInfo1()'>Add New</button>");
                $("#submitButtonElement").append("<button style='float:right;' class='btn btn-primary mr5' onclick='getRoleInfo1()'>Add New</button>");
                $("#providerInsertionStatus").text("").append("<span class='largeSuccessMsg'>Account creation successful and Password has been successfully sent to emailid.</span><br /><br />");
                $("#providerMessage").text("").append("<span class='largeSuccessMsg'>Account creation successful and Password has been successfully sent to emailid.</span>");
                prepareDashboard();

            } else if (data == "Email is already registered") {
                $("#otherUserSubmitButton").attr("disabled", false);
                displayLargeErrorMessages("providerInsertionStatus", "Email is already registered.<br /><br />");
                displaySmallErrorMessages("otherUserEmail1ElementMsg", "Email is already registered.");
                displaySmallErrorMessages("providerMessage", "Email is already registered.");
            } else if (data == "Email2 is already registered") {
                $("#otherUserSubmitButton").attr("disabled", false);
                displayLargeErrorMessages("providerInsertionStatus", "Email is already registered.<br /><br />");
                displaySmallErrorMessages("otherUserEmail2ElementMsg", "Email is already registered.");
                displaySmallErrorMessages("providerMessage", "Email is already registered.");
            } else if (data == "Invalid Email") {
                $("#otherUserSubmitButton").attr("disabled", false);
                displayLargeErrorMessages("providerInsertionStatus", "Invalid email 1.<br /><br />");
                displaySmallErrorMessages("otherUserEmail1ElementMsg", "Invalid email 1.");
                displaySmallErrorMessages("providerMessage", "Invalid email 1.");
            } else if (data == fail) {
                $("#otherUserSubmitButton").attr("disabled", false);
                displayLargeErrorMessages("providerInsertionStatus", failMessage);
                displayLargeErrorMessages("providerMessage", failMessage);
            } else if (data == unauthorized) {
                $("#otherUserSubmitButton").attr("disabled", false);
                displayLargeErrorMessages("providerInsertionStatus", unauthorizedMessage);
                displayLargeErrorMessages("providerMessage", unauthorizedMessage);
            } else if (data == invalidSession) {
                callSessionTimeout();
            }
        });
    }//validation if end
}//if other roles is selected submit button function end

//provider form keypress start
function otherUser_keypress(event) {
    if ($("#otherUserUserNameElement").val() != "") {
//        $("#otherUserUserNameElement").val(capitalize($("#otherUserUserNameElement").val()));
        if ($("#otherUserUserNameElement").val().match((spaceExpression()))) {
            $('#otherUserUserNameElement').val($('#otherUserUserNameElement').val().replace(/\s/g, ''));
        }
        $("#userNameElement").removeClass("has-error");
        $("#otherUserUserNameElementMsg").text("");
        if (!isNaN($("#otherUserUserNameElement").val()) == true) {
            $("#userNameElement").addClass("has-error");
            $('#otherUserUserNameElement').popover('show');
            $("#otherUserUserNameElement").focus();
            $("#otherUserUserNameElementMsg").text("").append("<br /><span class='smallErrorMsg'>Please enter valid username.</span>");
            return false;
        } else if (!$("#otherUserUserNameElement").val().match(usernameExpression())) {
            $("#userNameElement").addClass("has-error");
            $('#otherUserUserNameElement').popover('show');
            $("#otherUserUserNameElement").focus();
            return false;
        } else if ($("#otherUserUserNameElement").val().match(usernameExpression())) {
            $("#userNameElement").removeClass("has-error");
            $('#otherUserUserNameElement').popover('hide');
        }
    }

    if ($("#otherUserFirstNameElement").val() != "") {
//        $("#otherUserFirstNameElement").val(capitalize($("#otherUserFirstNameElement").val()));
        if (!$("#otherUserFirstNameElement").val().match((cityExpression()))) {
            $("#otherUserFirstNameElement").focus();
            $("#fnameElement").addClass("has-error");
            $("#otherUserFirstNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
            return false;
        } else {
            $("#fnameElement").removeClass("has-error");
            $("#otherUserFirstNameElementMsg").text("");
        }
    }

    if ($("#otherUserOrganisationElement").val() != "") {
//        $("#otherUserMiddleNameElement").val(capitalize($("#otherUserMiddleNameElement").val()));
        if (!$("#otherUserOrganisationElement").val().match((cityExpression()))) {
            $("#otherUserOrganisationElement").focus();
            $("#orgElement").addClass("has-error");
            $("#otherUserOrganisationElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid Organisation name.</span>");
            return false;
        } else {
            $("#orgElement").removeClass("has-error");
            $("#otherUserOrganisationElementMsg").text("");
        }
    }

    if ($("#otherUserwebElement").val() != "") {
        $("#webElement").removeClass("has-error");
        $("#otherUserwebElementMsg").text("");
    }
    if ($("#otherUserLastNameElement").val() != "") {
//        $("#otherUserLastNameElement").val(capitalize($("#otherUserLastNameElement").val()));
        if (!$("#otherUserLastNameElement").val().match((cityExpression()))) {
            $("#otherUserLastNameElement").focus();
            $("#lnameElement").addClass("has-error");
            $("#otherUserLastNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid last name.</span>");
            return false;
        } else {
            $("#lnameElement").removeClass("has-error");
            $("#otherUserLastNameElementMsg").text("");
        }
    }

    if ($("#otherUserDobElement").val() != "") {
        if (validateDate($("#otherUserDobElement").val()) != true) {
            $("#dobElement").addClass("has-error");
            $("#otherUserDobElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        if (checkFutureDate($("#otherUserDobElement").val()) != true) {
            $("#dobElement").addClass("has-error");
            $("#otherUserDobElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        $("#dobElement").removeClass("has-error");
        $("#otherUserDobElementMsg").text("");
    }

    if ($("#otherUserEmail1Element").val() != "") {
        if ($("#otherUserEmail1Element").val().match((spaceExpression()))) {
            $('#otherUserEmail1Element').val($('#otherUserEmail1Element').val().replace(/\s/g, ''));
        }
        if (!$("#otherUserEmail1Element").val().match((ValidateEmail()))) {
            $("#email1Element").addClass("has-error");
            $("#otherUserEmail1Element").focus();
            $("#otherUserEmail1ElementMsg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
            return false;
        } else {
            $("#email1Element").removeClass("has-error");
            $("#otherUserEmail1ElementMsg").text("");
        }
    }

    if ($("#otherUserRetypeEmailElement").val() != "") {
        if ($("#otherUserRetypeEmailElement").val().match((spaceExpression()))) {
            $('#otherUserRetypeEmailElement').val($('#otherUserRetypeEmailElement').val().replace(/\s/g, ''));
        }
        if ($("#otherUserEmail1Element").val() != $("#otherUserRetypeEmailElement").val()) {
            $("#retypeEmailElement").addClass("has-error");
            $("#otherUserRetypeEmailElement").focus();
            $("#otherUserRetypeEmailElementMsg").text("").append("<span class='smallErrorMsg'>Email and Retype Email must be same.</span>");
            return false;
        } else {
            $("#retypeEmailElement").removeClass("has-error");
            $("#otherUserRetypeEmailElementMsg").text("");
        }
    }

    if ($("#otherUserEmail2Element").val() != "") {
        if ($("#otherUserEmail2Element").val().match((spaceExpression()))) {
            $('#otherUserEmail2Element').val($('#otherUserEmail2Element').val().replace(/\s/g, ''));
        }
        if (!$("#otherUserEmail2Element").val().match((ValidateEmail()))) {
            $("#email2Element").addClass("has-error");
            $("#otherUserEmail2Element").focus();
            $("#otherUserEmail2ElementMsg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
            return false;
        } else {
            $("#email2Element").removeClass("has-error");
            $("#otherUserEmail2ElementMsg").text("");
        }
    } else {
        $("#email2Element").removeClass("has-error");
        $("#otherUserEmail2ElementMsg").text("");
    }

    if ($("#otherUserAddress1Element").val() != "") {
//        $("#otherUserAddress1Element").val(capitalize($("#otherUserAddress1Element").val()));
        $("#address1Element").removeClass("has-error");
        $("#otherUserAddress1ElementMsg").text("");
    }

    if ($("#otherUserCityElement").val() != "") {
//        $("#otherUserCityElement").val(capitalize($("#otherUserCityElement").val()));
        if (!$("#otherUserCityElement").val().match((cityExpression()))) {
            $("#cityElement").addClass("has-error");
            $("#otherUserCityElement").focus();
            $("#otherUserCityElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid city.</span>");
            return false;
        }
        $("#cityElement").removeClass("has-error");
        $("#otherUserCityElementMsg").text("");
    }

    if ($("#otherUserStateElement").val() != "") {
        $("#stateElement").removeClass("has-error");
        $("#otherUserStateElementMsg").text("");
    }

    if ($("#otherUserMobilePhoneElement").val() != "") {
        $("#MobileElement").removeClass("has-error");
        $("#otherUserMobilePhoneElementMsg").text("");
    }

    if ($("#otherUserUserNameElement").val() != "" &&
            $("#otherUserFirstNameElement").val() != "" &&
            $("#otherUserLastNameElement").val() != "" &&
            $("#otherUserEmailElement").val() != "" &&
            $("#otherUserRetypeEmailElement").val() != "" &&
            $("#otherUserAddress1Element").val() != "" &&
            $("#otherUserCityElement").val() != "" &&
            $("#otherUserStateElement").val() != "" &&
            $("#otherUserMobilePhoneElement").val() != "") {
        $("#providerInsertionStatus").text("");
        $("#providerMessage").text("");
    }

//    if (event.which == 13) {
//        otherUserInsert();
//        return false;
//    }
}//provider form keypress end

//function viewUsersListTab() {
//    $("#mainTabMenuDiv").append("<div class='tab-pane' id='viewUser'/>");
//    $("#viewUser").text("").append("<div class='form-group' id='viewUserSelection' />");
//    $("#viewUserSelection").append("<div id='viewUserSelectionHeading'/>");
//    $("#viewUserSelection").append("<div class='col-md-6' id='viewUserSectionMainDiv' style='width:100%;'/>");
//    $("#viewUserSectionMainDiv").append("<div class='table-responsive' id='viewUserSectionTableDiv' />");
//    $("#viewUserSectionTableDiv").append("<table class='table table-success mb30' id='viewUserSectionTable' />");
//    $("#viewUserSectionTable").append("<thead><tr><th>Username</th><th>Name</th><th>Email</th><th>Roles</th></tr></thead>");
//    $("#viewUserSectionTable").append("<tbody>");
//
//}

function viewUsersListTab() {
    $("#mainTabMenuDiv").append("<div class='tab-pane' id='viewUser'/>");
    $("#viewUser").text("").append("<div class='form-group' id='viewUserSelection' />");
    $("#viewUser").append("<div class='form-group' id='viewUserEditSelection' />");
    $("#viewUserSelection").append("<div id='viewUserSelectionHeading'/>");
    $("#viewUserSelection").append("<div class='col-md-6' id='viewUserSectionMainDiv' style='width:100%;'/>");
    $("#viewUserSectionMainDiv").append("<div class='table-responsive' id='viewUserSectionTableDiv' />");
    $("#viewUserSectionTableDiv").append("<table class='table table-success mb30' id='viewUserSectionTable' />");
    $("#viewUserSectionTable").append("<thead><tr><th>Username</th><th>Name</th><th>Email</th><th>Phone</th></tr></thead>");
    $.get(server_base_url + "UserView", {
    }).done(function(data) {
        if (data == fail || data == unauthorized) {
            location.href = "dashboard.jsp";
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $.each(data, function(index, value) {

//                $("#viewUserSectionTable").append("<tr id='viewUserSectionTableTr" + index + "' onclick=viewSpecificUserDetails('" + replaceString(value.loginid) + "','" + replaceString(value.fname) + "','" + replaceString(value.mname) + "','" + replaceString(value.lname) + "','" + value.gender + "','" + value.dob + "','" + '' + "','" + value.email1 + "','" + value.email2 + "','" + replaceString(value.address1) + "','" + replaceString(value.address2) + "','" + replaceString(value.city) + "','" + replaceString(value.state) + "','" + replaceString(value.country) + "','" + value.zipcode + "','" + value.fax + "','" + value.homephone + "','" + value.workphone + "','" + value.mobilephone + "','" + value._id.$oid + "','" + roles + "') style='cursor:pointer;' />");
                if (value.fname != undefined) {
//                   $("#viewUserSectionTable").append("<tr id='viewUserSectionTableTr" + index + "' />");
                    $("#viewUserSectionTable").append("<tr id='viewUserSectionTableTr" + index + "' onclick=viewSpecificUserDetails('" + replaceString(value.loginid) + "','" + replaceString(value.fname) + "','" + replaceString(value.mname) + "','" + replaceString(value.lname) + "','" + value.gender + "','" + value.dob + "','" + value.email1 + "','" + value.email2 + "','" + replaceString(value.address1) + "','" + replaceString(value.address2) + "','" + replaceString(value.city) + "','" + replaceString(value.state) + "','" + replaceString(value.country) + "','" + value.zipcode + "','" + value.homephone + "','" + value.workphone + "','" + value.mobilephone + "','" + value._id.$oid + "') style='cursor:pointer;' />");
                    $("#viewUserSectionTableTr" + index).append("<input type ='hidden' value=" + value.loginid + " id=hiddencodeLogin" + index + " />");
                    $("#viewUserSectionTableTr" + index).append("<td>" + value.loginid + "</td><td>" + value.fname + " " + value.mname + " " + value.lname + "</td><td>" + value.email1 + "</td><td>" + value.mobilephone + "</td>");
                }
            });
        }
    });
}//view registered users end

//when clicks on user's link it will display a new form by removing existing data from viewUser div.
//when clicks on back to view users button thene it will disply users list again
function viewSpecificUserDetails(loginid, fname, mname, lname, gender, dob, email1, email2, address1, address2, city, state, country, zipcode, homephone, workphone, mobilephone, id) {
//    var roles = userroles.split(',');
    $("#viewUser").text("").append("<div class='form-group' id='viewUserSelection' />");
    $("#viewUserSelection").append("<div class='form-group' id='ViewUserSelectionMainDivHeader' />");
    $("#viewUserSelection").append("<div class='form-group' id='ViewUserSelectionMainDiv' />");
//    if (checkUserPrivelege("ResetUserPassword") == true) {
    $("#viewUserSelection").prepend("<a href=javascript:resetUserPassword('" + id + "') style='float:right;'><b>Reset password</b></a>");
//    }

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Username</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserUserNameElement'/>");
    $("#viewUserUserNameElement").append("<input type='text' id='viewUserUserName' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Username'><br />");
    $("#viewUserUserName").attr("readonly", true);
    if (loginid != 'undefined')
        $("#viewUserUserName").val(replaceSpecialChar(loginid));

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>First name *</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserFirstNameElement'/>");
    $("#viewUserFirstNameElement").append("<input type='text' id='viewUserFirstName' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter First name'><span id='viewUserFirstNameMsg' /><br />");
    if (fname != 'undefined')
        $("#viewUserFirstName").val(replaceSpecialChar(fname));

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Middle name</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserMiddleNameElement'/>");
    $("#viewUserMiddleNameElement").append("<input type='text' id='viewUserMiddleName' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Middle name'><span id='viewUserMiddleNameMsg' /><br />");
    if (mname != 'undefined')
        $("#viewUserMiddleName").val(replaceSpecialChar(mname));

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Last name *</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserLastNameElement'/>");
    $("#viewUserLastNameElement").append("<input type='text' id='viewUserLastName' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Last name'><span id='viewUserLastNameMsg' /><br />");
    if (id != 'undefined')
        $("#viewUserLastName").val(replaceSpecialChar(lname));

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Organisation *</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserOrgElement'/>");
    $("#viewUserOrgElement").append("<input type='text' id='viewUserOrg' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Organisation'><br />");
    if (lname != 'undefined')
        showOrgDetails(id);
    //$("#viewUserOrg").val(orgname);

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Website *</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserWebsiteElement'/>");
    $("#viewUserWebsiteElement").append("<input type='text' id='viewUserWebsite' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Website'><span id='viewUserEmail2ElementMsg' /><br />");
    if (lname != 'undefined')
        //$("#viewUserWebsite").val(website);


        $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Gender</lable>");
    $("#ViewUserSelectionMainDiv").append("<div id='viewGenderElementDiv' class='btn-group col-sm-9' data-toggle='buttons' />");
    $("#viewGenderElementDiv").append("<label class='btn blue btn-default' style='border-radius: 3px; font-weight: 600;' id='viewUsers_gen_m'><input type='radio' id='viewUsers_gender_m' name='viewUsers_gender' value='Male' />Male</label><label class='btn blue btn-default' style='margin-left: 15px; border-radius: 3px; font-weight: 600;' id='viewUsers_gen_f'><input type='radio' id='viewUsers_gender_f' name='viewUsers_gender' value='Female' />Female</label><br />");
    if (gender != 'undefined')
        if (gender == "Male") {
            $('input[name=viewUsers_gender]').val([gender]);
            $("#viewUsers_gen_f").removeClass("active");
            $("#viewUsers_gen_m").addClass("active");
        } else if (gender == "Female") {
            $('input[name=viewUsers_gender]').val([gender]);
            $("#viewUsers_gen_m").removeClass("active");
            $("#viewUsers_gen_f").addClass("active");
        } else {
            $("#viewUsers_gen_m").removeClass("active");
            $("#viewUsers_gen_f").removeClass("active");
        }//end if

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Date of Birth</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserDobElement'/>");
    $("#viewUserDobElement").append("<input type='email' id='viewUserDob' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='MM/DD/YYYY'><span id='viewUserDobMsg' /><br />");
    jQuery("#viewUserDob").mask("99/99/9999");
    jQuery("#viewUserDob").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    });
    if (dob != 'undefined')
        $("#viewUserDob").val(dob);

//    if (userroles.match('Provider')) {
//        $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Education</lable>");
//        $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserEducationElement'/>");
//        $("#viewUserEducationElement").append("<input type='text' id='viewUserEducation' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Education'><span id='viewUserDobMsg' /><br />");
//        if (education != 'undefined')
//            $("#viewUserEducation").val(education);
//    } else {
//        $("#ViewUserSelectionMainDiv").append("<input type='hidden' id='viewUserEducation' />");
//        $("#viewUserEducation").val(education);
//    }

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Email 1 *</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserEmail1Element'/>");
    $("#viewUserEmail1Element").append("<input type='email' id='viewUserEmail1' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Email 1'><br />");
    $("#viewUserEmail1").attr("readonly", true);
    if (email1 != 'undefined')
        $("#viewUserEmail1").val(email1);

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Email 2</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserEmail2Element'/>");
    $("#viewUserEmail2Element").append("<input type='email' id='viewUserEmail2' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Email 2'><span id='viewUserEmail2ElementMsg' /><br />");
    if (email2 != 'undefined')
        $("#viewUserEmail2").val(email2);

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Address 1 *</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserAddress1Element'/>");
    $("#viewUserAddress1Element").append("<input type='text' id='viewUserAddress1' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Address1'><span id='viewUserAddress1Msg' /><br />");
    if (address1 != 'undefined')
        $("#viewUserAddress1").val(replaceSpecialChar(address1));

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Address 2</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserAddress2Element'/>");
    $("#viewUserAddress2Element").append("<input type='text' id='viewUserAddress2' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Address2'><br />");
    if (address2 != 'undefined')
        $("#viewUserAddress2").val(replaceSpecialChar(address2));

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>City *</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserCityElement'/>");
    $("#viewUserCityElement").append("<input type='text' id='viewUserCity' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter City'><span id='viewUserCityMsg' /><br />");
    if (city != 'undefined')
        $("#viewUserCity").val(replaceSpecialChar(city));

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>State *</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserStateElement'/>");
    $("#viewUserStateElement").append("<select id='viewUserState' class='form-control' onchange='updateSpecificUserDetails_keypress(event)' /><span id='viewUserStateMsg' /><br />");
    //$("#viewUserState").append("<option value=''>Choose One</option><option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>");
    $("#viewUserState").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
    if (state != 'undefined')
        $("#viewUserState").val(replaceSpecialChar(state));

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Country</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserCountryElement'/>");
    $("#viewUserCountryElement").append("<select id='viewUserCountry' class='form-control' /><br />");
    $("#viewUserCountry").append("<option>INDIA</option>");
    if (country != 'undefined')
        $("#viewUserCountry").val(replaceSpecialChar(country));

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Zip</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserZipCodeElement'/>");
    $("#viewUserZipCodeElement").append("<input type='text' id='viewUserZipCode' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Zip'><br />");
    jQuery("#viewUserZipCode").mask('99999');
    if (zipcode != 'undefined')
        $("#viewUserZipCode").val(zipcode);

//    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Fax</lable>");
//    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserFaxElement'/>");
//    $("#viewUserFaxElement").append("<input type='text' id='viewUserFax' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Fax'><br />");
//    jQuery("#viewUserFax").mask('999.999.9999');
//    if (fax != 'undefined')
//        $("#viewUserFax").val(fax);

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Home phone</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserHomePhoneElement'/>");
    $("#viewUserHomePhoneElement").append("<input type='text' id='viewUserHomePhone' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Home phone'><br />");
    jQuery("#viewUserHomePhone").mask("(999)999-9999");
    if (homephone != 'undefined')
        $("#viewUserHomePhone").val(homephone);

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Work phone</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserWorkPhoneElement'/>");
    $("#viewUserWorkPhoneElement").append("<input type='text' id='viewUserWorkPhone' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Work phone'><br />");
    jQuery("#viewUserWorkPhone").mask("(999)999-9999");
    if (workphone != 'undefined')
        $("#viewUserWorkPhone").val(workphone);

    $("#ViewUserSelectionMainDiv").append("<lable class='col-sm-3 control-label'>Mobile phone *</lable>");
    $("#ViewUserSelectionMainDiv").append("<div class='col-sm-9' id='viewUserMobilePhoneElement'/>");
    $("#viewUserMobilePhoneElement").append("<input type='text' id='viewUserMobilePhone' class='form-control' onkeyup='updateSpecificUserDetails_keypress(event)' placeholder='Enter Mobile phone'><span id='viewUserMobilePhoneMsg' /><br />");
    jQuery("#viewUserMobilePhone").mask("(999)999-9999");
    if (mobilephone != 'undefined')
        $("#viewUserMobilePhone").val(mobilephone);

    $("#ViewUserSelectionMainDiv").append("<center><div id='ViewUserSelectionFooterDiv'/></center>");
//    if (checkUserPrivelege("UpdateUser") == true) {
    $("#ViewUserSelectionFooterDiv").append("<button class='btn btn-primary mr5' id='updateSpecificUserDetailsButton' onclick=updateSpecificUserDetails('" + id + "')>Update</button>");
//    }
    $("#ViewUserSelectionFooterDiv").append("<button style='margin-left:10px;' class='btn btn-primary mr5' onclick='viewUsersListTab()'>View users list</button>");
    $("#ViewUserSelectionFooterDiv").append("&nbsp;&nbsp;&nbsp;<span id='updateUserMsg'></span>");
}//users info edit end

//after edit update button for user information start
function updateSpecificUserDetails(id) {
    if ($("#viewUserFirstName").val() == "") {
        $("#viewUserFirstNameElement").addClass("has-error");
        $("#viewUserFirstName").focus();
        $("#viewUserFirstNameMsg").text("").append("<span class='smallErrorMsg'>Please enter first name.</span>");
    } else if ($("#viewUserFirstName").val() != "") {
        if (!$("#viewUserFirstName").val().match((cityExpression()))) {
            $("#viewUserFirstName").focus();
            $("#viewUserFirstNameElement").addClass("has-error");
            $("#viewUserFirstNameMsg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
        } else {
            $("#viewUserFirstNameElement").removeClass("has-error");
            $("#viewUserFirstNameMsg").text("");
        }
    }

    if ($("#viewUserMiddleName").val() != "") {
        if (!$("#viewUserMiddleName").val().match((cityExpression()))) {
            $("#viewUserMiddleName").focus();
            $("#viewUserMiddleNameElement").addClass("has-error");
            $("#viewUserMiddleNameMsg").text("").append("<span class='smallErrorMsg'>Please enter valid middle name.</span>");
        } else {
            $("#viewUserMiddleNameElement").removeClass("has-error");
            $("#viewUserMiddleNameMsg").text("");
        }
    }

    if ($("#viewUserLastName").val() == "") {
        $("#viewUserLastNameElement").addClass("has-error");
        $("#viewUserLastName").focus();
        $("#viewUserLastNameMsg").text("").append("<span class='smallErrorMsg'>Please enter last name.</span>");
    } else if ($("#viewUserLastName").val() != "") {
        if (!$("#viewUserLastName").val().match((cityExpression()))) {
            $("#viewUserLastName").focus();
            $("#viewUserLastNameElement").addClass("has-error");
            $("#viewUserLastNameMsg").text("").append("<span class='smallErrorMsg'>Please enter valid last name.</span>");
        } else {
            $("#viewUserLastNameElement").removeClass("has-error");
            $("#viewUserLastNameMsg").text("");
        }
    }

    if ($("#viewUserDob").val() != "") {
        if (validateDate($("#viewUserDob").val()) != true) {
            $("#viewUserDobElement").addClass("has-error");
            $("#viewUserDobMsg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        if (checkFutureDate($("#viewUserDob").val()) != true) {
            $("#viewUserDobElement").addClass("has-error");
            $("#viewUserDobMsg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        $("#viewUserDobElement").removeClass("has-error");
        $("#viewUserDobMsg").text("");
    }
    if ($("#viewUserEmail2").val() != "") {
        if (!$("#viewUserEmail2").val().match((ValidateEmail()))) {
            $("#viewUserEmail2Element").addClass("has-error");
            $("#viewUserEmail2").focus();
            $("#viewUserEmail2ElementMsg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
            return false;
        } else {
            $("#viewUserEmail2Element").removeClass("has-error");
            $("#viewUserEmail2ElementMsg").text("");
        }
    } else {
        $("#viewUserEmail2Element").removeClass("has-error");
        $("#viewUserEmail2ElementMsg").text("");
    }

    if ($("#viewUserAddress1").val() == "") {
        $("#viewUserAddress1Element").addClass("has-error");
        $("#viewUserAddress1").focus();
        $("#viewUserAddress1Msg").text("").append("<span class='smallErrorMsg'>Please enter address1.</span>");
    }

    if ($("#viewUserCity").val() == "") {
        $("#viewUserCityElement").addClass("has-error");
        $("#viewUserCity").focus();
        $("#viewUserCityMsg").text("").append("<span class='smallErrorMsg'>Please enter city.</span>");
    } else if ($("#viewUserCity").val() != "") {
        if (!$("#viewUserCity").val().match((cityExpression()))) {
            $("#viewUserCityElement").addClass("has-error");
            $("#viewUserCity").focus();
            $("#viewUserCityMsg").text("").append("<span class='smallErrorMsg'>Please enter valid city.</span>");
            return false;
        }
        $("#viewUserCityElement").removeClass("has-error");
        $("#viewUserCityMsg").text("");
    }

    if ($("#viewUserState").val() == "") {
        $("#viewUserStateElement").addClass("has-error");
        $("#viewUserState").focus();
        $("#viewUserStateMsg").text("").append("<span class='smallErrorMsg'>Please select state.</span>");
    }

    if ($("#viewUserMobilePhone").val() == "") {
        $("#viewUserMobilePhoneElement").addClass("has-error");
        $("#viewUserMobilePhone").focus();
        $("#viewUserMobilePhoneMsg").text("").append("<span class='smallErrorMsg'>Please enter mobile phone.</span>");
    }
    if ($("input[name='roles']:checked").val() == "" ||
            $("#viewUserMobilePhone").val() == "" ||
            $("#viewUserState").val() == "" ||
            $("#viewUserCity").val() == "" ||
            $("#viewUserAddress1").val() == "" ||
            $("#viewUserLastName").val() == "" ||
            $("#viewUserFirstName").val() == "") {
        $("#ViewUserSelectionMainDivHeader").text("").append("<center><span id='updMsg'class='largeErrorMsg'>Please fill all * marked fields.</span></center>");
        $("#updateUserMsg").text("").append("<center><span id='updMsg'class='largeErrorMsg'>Please fill all * marked fields.</span></center>");
        return false;
    } else {
        $("#updateUserMsg").text("");
        $("#ViewUserSelectionMainDivHeader").text("");
        $.get(server_base_url + "UserUpdate", {
            uerId: id,
            //_id: id,
            loginid: $("#viewUserUserName").val(),
            fname: $("#viewUserFirstName").val(),
            mname: $("#viewUserMiddleName").val(),
            lname: $("#viewUserLastName").val(),
            gender: $('input[name=viewUsers_gender]:checked').val(),
            dob: $("#viewUserDob").val(),
            email1: $("#viewUserEmail1").val(),
            email2: $("#viewUserEmail2").val(),
            orgname: $("#viewUserOrg").val(),
            website: $("#viewUserWebsite").val(),
            address1: $("#viewUserAddress1").val(),
            address2: $("#viewUserAddress2").val(),
            city: $("#viewUserCity").val(),
            state: $("#viewUserState").val(),
            country: $("#viewUserCountry").val(),
            zipcode: $("#viewUserZipCode").val(),
            homephone: $("#viewUserHomePhone").val(),
            workphone: $("#viewUserWorkPhone").val(),
            mobilephone: $("#viewUserMobilePhone").val()
        }).done(function(data) {

            if (data == success) {
                $("#updateSpecificUserDetailsButton").hide();
                $("#ViewUserSelectionMainDivHeader").text("").append("<center><span  class='largeSuccessMsg'>Successfully updated.</span></center>");
                $("#updateUserMsg").text("").append("<center><span   class='largeSuccessMsg'>Successfully updated.</span></center>");
                $("#viewUserFirstName").attr("disabled", true);
                $("#viewUserMiddleName").attr("disabled", true);
                $("#viewUserLastName").attr("disabled", true);
                $("#viewUsers_gen_m").attr("disabled", true);
                $("#viewUsers_gen_f").attr("disabled", true);
                $("#viewUserDob").attr("disabled", true);
                $("#viewUserEmail2").attr("disabled", true);
                $("#viewUserAddress1").attr("disabled", true);
                $("#viewUserAddress2").attr("disabled", true);
                $("#viewUserCity").attr("disabled", true);
                $("#viewUserState").attr("disabled", true);
                $("#viewUserCountry").attr("disabled", true);
                $("#viewUserZipCode").attr("disabled", true);
                $("#viewUserFax").attr("disabled", true);
                $("#viewUserHomePhone").attr("disabled", true);
                $("#viewUserWorkPhone").attr("disabled", true);
                $("#viewUserMobilePhone").attr("disabled", true);
                $("input[name='roles']").attr('disabled', true);
                $("#viewUserOrg").attr('disabled', true);
                $("#viewUserWebsite").attr('disabled', true);
            } else if (data == "Email2 is already registered") {
                $("#viewUserEmail2Element").addClass("has-error");
                $("#viewUserEmail2").focus();
                displaySmallErrorMessages("viewUserEmail2ElementMsg", "Email2 is already registered");
            } else if (data == fail) {
                displayLargeErrorMessages("ViewUserSelectionMainDivHeader", "<center>" + failMessage + "</center>");
                displayLargeErrorMessages("updateUserMsg", "<center>" + failMessage + "</center>");
            } else if (data == unauthorized) {
                displayLargeErrorMessages("ViewUserSelectionMainDivHeader", "<center>" + unauthorizedMessage + "</center>");
                displayLargeErrorMessages("updateUserMsg", "<center>" + unauthorizedMessage + "</center>");
            } else if (data == invalidSession) {
                callSessionTimeout();
            }
        });
    }
}//after edit update button for user information end

//provider form keypress start
function updateSpecificUserDetails_keypress(event) {
    if ($("#viewUserFirstName").val() != "") {
        if (!$("#viewUserFirstName").val().match((cityExpression()))) {
            $("#viewUserFirstName").focus();
            $("#viewUserFirstNameElement").addClass("has-error");
            $("#viewUserFirstNameMsg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
        } else {
            $("#viewUserFirstNameElement").removeClass("has-error");
            $("#viewUserFirstNameMsg").text("");
        }
    }

    if ($("#viewUserMiddleName").val() != "") {
        if (!$("#viewUserMiddleName").val().match((cityExpression()))) {
            $("#viewUserMiddleName").focus();
            $("#viewUserMiddleNameElement").addClass("has-error");
            $("#viewUserMiddleNameMsg").text("").append("<span class='smallErrorMsg'>Please enter valid middle name.</span>");
        } else {
            $("#viewUserMiddleNameElement").removeClass("has-error");
            $("#viewUserMiddleNameMsg").text("");
        }
    }

    if ($("#viewUserLastName").val() != "") {
        if (!$("#viewUserLastName").val().match((cityExpression()))) {
            $("#viewUserLastName").focus();
            $("#viewUserLastNameElement").addClass("has-error");
            $("#viewUserLastNameMsg").text("").append("<span class='smallErrorMsg'>Please enter valid last name.</span>");
        } else {
            $("#viewUserLastNameElement").removeClass("has-error");
            $("#viewUserLastNameMsg").text("");
        }
    }

    if ($("#viewUserDob").val() != "") {
        if (validateDate($("#viewUserDob").val()) != true) {
            $("#viewUserDobElement").addClass("has-error");
            $("#viewUserDobMsg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        if (checkFutureDate($("#viewUserDob").val()) != true) {
            $("#viewUserDobElement").addClass("has-error");
            $("#viewUserDobMsg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        $("#viewUserDobElement").removeClass("has-error");
        $("#viewUserDobMsg").text("");
    }

    if ($("#viewUserEmail2").val() != "") {
        if ($("#viewUserEmail2").val().match((spaceExpression()))) {
            $('#viewUserEmail2').val($('#viewUserEmail2').val().replace(/\s/g, ''));
        }
        if (!$("#viewUserEmail2").val().match((ValidateEmail()))) {
            $("#viewUserEmail2Element").addClass("has-error");
            $("#viewUserEmail2").focus();
            $("#viewUserEmail2ElementMsg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
            return false;
        } else {
            $("#viewUserEmail2Element").removeClass("has-error");
            $("#viewUserEmail2ElementMsg").text("");
        }
    } else {
        $("#viewUserEmail2Element").removeClass("has-error");
        $("#viewUserEmail2ElementMsg").text("");
    }

    if ($("#viewUserAddress1").val() != "") {
        $("#viewUserAddress1Element").removeClass("has-error");
        $("#viewUserAddress1Msg").text("");
    }

    if ($("#viewUserCity").val() != "") {
        if (!$("#viewUserCity").val().match((cityExpression()))) {
            $("#viewUserCityElement").addClass("has-error");
            $("#viewUserCity").focus();
            $("#viewUserCityMsg").text("").append("<span class='smallErrorMsg'>Please enter valid city.</span>");
            return false;
        }
        $("#viewUserCityElement").removeClass("has-error");
        $("#viewUserCityMsg").text("");
    }
    if ($("#viewUserState").val() != "") {
        $("#viewUserStateElement").removeClass("has-error");
        $("#viewUserStateMsg").text("");
    }
    if ($("#viewUserMobilePhone").val() != "") {
        $("#viewUserMobilePhoneElement").removeClass("has-error");
        $("#viewUserMobilePhoneMsg").text("");
    }

    if ($("input[name='roles']:checked").val() != "" &&
            $("#viewUserMobilePhone").val() != "" &&
            $("#viewUserState").val() != "" &&
            $("#viewUserCity").val() != "" &&
            $("#viewUserAddress1").val() != "" &&
            $("#viewUserLastName").val() != "" &&
            $("#viewUserFirstName").val() != "") {
        $("#ViewUserSelectionMainDivHeader").text("");
        $("#updateUserMsg").text("");
    }

    if (event.which == 13) {
        $("#updateSpecificUserDetailsButton").click();
        return false;
    }
}//provider form keypress end


//reset user password
function resetUserPassword(id) {
    $.get(server_base_url + "/irheum-server/ResetPassword", {loginId: id
    }).done(function(data) {
        if (data == success) {
            displayLargeSuccessMessages("ViewUserSelectionMainDivHeader", "<center>Password has been successfully sent to emailid.</center>");
        } else if (data == fail) {
            displayLargeErrorMessages("ViewUserSelectionMainDivHeader", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("ViewUserSelectionMainDivHeader", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        }
    });
}//reset user password end


//create new physician start
function createNewPhysician() {
//validation start    
    if ($("#physicianusername").val() == "") {
        $("#physicianusernameMsg").text("").append("<br /><span class='smallErrorMsg'>Please enter user name.</span>");
        $("#physicianusernameError").addClass("has-error");
        $("#physicianusername").focus();
    } else if ($("#physicianusername").val() != "") {
        $("#physicianusernameError").removeClass("has-error");
        $("#physicianusernameMsg").text("");
        if (!isNaN($("#physicianusername").val()) == true) {
            $("#physicianusernameError").addClass("has-error");
            $('#physicianusername').popover('show');
            $("#physicianusername").focus();
            $("#physicianusernameMsg").text("").append("<br /><span class='smallErrorMsg'>Please enter valid username.</span>");
            return false;
        } else if (!$("#physicianusername").val().match(usernameExpression())) {
            $("#physicianusernameError").addClass("has-error");
            $('#physicianusername').popover('show');
            $("#physicianusername").focus();
            return false;
        } else if ($("#physicianusername").val().match(usernameExpression())) {
            $("#physicianusernameError").removeClass("has-error");
            $('#physicianusername').popover('hide');
        }
        checkProviderUsername();
    }

    if ($("#physicianpassword").val() == "") {
        $("#physicianpasswordMsg").text("").append("<span class='smallErrorMsg'>Please enter password.</span>");
        $("#physicianpasswordError").addClass("has-error");
        $("#physicianpassword").focus();
    } else if ($("#physicianpassword").val() != "") {
        if (!$("#physicianpassword").val().match(passwordExpression())) {
            $("#physicianpasswordError").addClass("has-error");
            $('#physicianpassword').popover('show');
            $("#physicianpasswordMsg").text("").append("<span class='smallErrorMsg'>Please enter valid password.</span>");
            return false;
        } else if ($("#physicianpassword").val().match(passwordExpression())) {
            $('#physicianpassword').popover('hide');
            $("#physicianpasswordError").removeClass("has-error");
            $("#physicianpasswordMsg").text("");
        }
    }

    if ($("#physicianretypepassword").val() == "") {
        $("#physicianretypepasswordMsg").text("").append("<span class='smallErrorMsg'>Please enter retype password.</span>");
        $("#physicianretypepasswordError").addClass("has-error");
        $("#physicianretypepassword").focus();
    } else if ($("#physicianpassword").val() != $("#physicianretypepassword").val()) {
        $("#physicianretypepasswordMsg").text("").append("<span class='smallErrorMsg'>Password and Retype Password must be same.</span>");
        $("#physicianretypepasswordError").addClass("has-error");
        $("#physicianretypepassword").focus();
        return false;
    }

    if ($("#physicianfname").val() == "") {
        $("#physicianfnameError").addClass("has-error");
        $("#physicianfname").focus();
        $("#physicianfnameMsg").text("").append("<span class='smallErrorMsg'>Please enter first name.</span>");
    } else if ($("#physicianfname").val() != "") {
        if (!$("#physicianfname").val().match((cityExpression()))) {
            $("#physicianfname").focus();
            $("#physicianfnameError").addClass("has-error");
            $("#physicianfnameMsg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
            return false;
        } else {
            $("#physicianfnameMsg").text("");
            $("#physicianfnameError").removeClass("has-error");
        }
    }

    if ($("#physicianmname").val() != "") {
        if (!$("#physicianmname").val().match((cityExpression()))) {
            $("#physicianmname").focus();
            $("#physicianmnameError").addClass("has-error");
            $("#physicianmnameMsg").text("").append("<span class='smallErrorMsg'>Please enter valid middle name.</span>");
            return false;
        } else {
            $("#physicianmnameMsg").text("");
            $("#physicianmnameError").removeClass("has-error");
        }
    }

    if ($("#physicianlname").val() == "") {
        $("#physicianlnameError").addClass("has-error");
        $("#physicianlname").focus();
        $("#physicianlnameMsg").text("").append("<span class='smallErrorMsg'>Please enter last name.</span>");
    } else if ($("#physicianlname").val() != "") {
        if (!$("#physicianlname").val().match((cityExpression()))) {
            $("#physicianlname").focus();
            $("#physicianlnameError").addClass("has-error");
            $("#physiciannameMsg").text("").append("<span class='smallErrorMsg'>Please enter valid last name.</span>");
            return false;
        } else {
            $("#physicianlnameMsg").text("");
            $("#physicianlnameError").removeClass("has-error");
        }
    }

    if ($("#physiciandob").val() != "") {
        if (validateDate($("#physiciandob").val()) != true) {
            $("#physiciandobError").addClass("has-error");
            $("#physiciandobMsg").text("").append("<span class='smallErrorMsg'>Please enter vaid date.</span>");
            return false;
        }
        if (checkFutureDate($("#physiciandob").val()) != true) {
            $("#physiciandobError").addClass("has-error");
            $("#physiciandobMsg").text("").append("<span class='smallErrorMsg'>Please enter vaid date.</span>");
            return false;
        }
        $("#physiciandobError").removeClass("has-error");
        $("#physiciandobMsg").text("");
    }

    if ($("#physicianeducation").val() != "") {
        if (!$("#physicianeducation").val().match((cityExpression()))) {
            $("#physicianeducation").focus();
            $("#physicianeducationError").addClass("has-error");
            $("#physicianeducationMsg").text("").append("<span class='smallErrorMsg'>Numbers are not allowed here.</span>");
            return false;
        } else {
            $("#physicianeducationMsg").text("");
            $("#physicianeducationError").removeClass("has-error");
        }
    }

    if ($("#physicianemail2").val() != "") {
        if (!$("#physicianemail2").val().match((ValidateEmail()))) {
            $("#physicianemail2Error").addClass("has-error");
            $("#physicianemail2").focus();
            $("#physicianemail2Msg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
            return false;
        } else {
            $("#physicianemail2Error").removeClass("has-error");
            $("#physicianemail2Msg").text("");
        }
    }

    if ($("#physicianaddress1").val() == "") {
        $("#physicianaddress1Error").addClass("has-error");
        $("#physicianaddress1").focus();
        $("#physicianaddress1Msg").text("").append("<span class='smallErrorMsg'>Please enter address1.</span>");
    }

    if ($("#physiciancity").val() == "") {
        $("#physiciancityError").addClass("has-error");
        $("#physiciancity").focus();
        $("#physiciancityMsg").text("").append("<span class='smallErrorMsg'>Please enter city.</span>");
    } else if ($("#physiciancity").val() != "") {
        if (!$("#physiciancity").val().match((cityExpression()))) {
            $("#physiciancityError").addClass("has-error");
            $("#physiciancity").focus();
            $("#physiciancityMsg").text("").append("<span class='smallErrorMsg'>Please enter valid city.</span>");
            return false;
        }
        $("#physicianusernameMsg").text("");
        $("#physiciancityError").removeClass("has-error");
        $("#physiciancityMsg").text("");
    }

    if ($("#physicianstate").val() == "") {
        $("#physicianstateError").addClass("has-error");
        $("#physicianstate").focus();
        $("#physicianstateMsg").text("").append("<span class='smallErrorMsg'>Please select state.</span>");
    }

    if ($("#physicianmobilephone").val() == "") {
        $("#physicianmobilephoneError").addClass("has-error");
        $("#physicianmobilephone").focus();
        $("#physicianmobilephoneMsg").text("").append("<span class='smallErrorMsg'>Please enter mobile phone.</span>");
    }

    if ($('input[name=physicianLic]:checked').val() != "yes") {
        $("#physicianlicenseError").addClass("has-error");
        $("#physicianlicenseMsg").text("").append("<span class='smallErrorMsg'>Please click on terms & conditions.</span>");
    }

    if ($("#physicianusername").val() == "" ||
            $("#physicianpassword").val() == "" ||
            $("#physicianretypepassword").val() == "" ||
            $("#physicianfname").val() == "" ||
            $("#physicianlname").val() == "" ||
            $("#physicianaddress1").val() == "" ||
            $("#physiciancity").val() == "" ||
            $("#physicianstate").val() == "" ||
            $("#physicianmobilephone").val() == "" ||
            $('input[name=physicianLic]:checked').val() != "yes") {
        $("#physicianstatus").text("").prepend("<center><span id='providerInsertionStatus'class='largeErrorMsg'>Please fill all * marked fields.</span></center>");
        $("#createNewUserMsg").text("").prepend("<center><span id='providerInsertionStatus'class='largeErrorMsg'>Please fill all * marked fields.</span></center>");
        return false;
    } else {
        $("#physicianstatus").text("");
        $("#createNewUserMsg").text("");
        $.get(server_base_url + "/irheum-server/PhysicianCreation", {
            orgId: $("#physicianOrgId").val(),
            role: $("#physicianRole").val(),
            loginid: $("#physicianusername").val(),
            password: $("#physicianpassword").val(),
            reTypePassword: $("#physicianretypepassword").val(),
            fname: $("#physicianfname").val(),
            mname: $("#physicianmname").val(),
            lname: $("#physicianlname").val(),
            gender: $('input[name=phy_gender]:checked').val(),
            dob: $("#physiciandob").val(),
            education: $("#physicianeducation").val(),
            email1: $("#physicianemail1").val(),
            email2: $("#physicianemail2").val(),
            address1: $("#physicianaddress1").val(),
            address2: $("#physicianaddress2").val(),
            city: $("#physiciancity").val(), state: $("#physicianstate").val(),
            country: $("#physiciancountry").val(),
            zipcode: $("#physicianzipcode").val(),
            fax: $("#physicianfax").val(),
            homephone: $("#physicianhomephone").val(),
            workphone: $("#physicianworkphone").val(),
            mobilephone: $("#physicianmobilephone").val(),
            license: $('input[name=physicianLic]:checked').val(),
            token: $("#token").val()}).done(function(data) {
            if (data == success) {
                $("#panel-body").text("").prepend("<center><span id='providerInsertionStatus' class='largeSuccessMsg'></span></center>");
                $("#providerInsertionStatus").append("<br/> <br/> You are Successfuly Registered");
                $("#providerInsertionStatus").append("<br/> <br/> <a href='./index.jsp'>Click here to login</a>");
            } else if (data == fail) {
                displayLargeErrorMessages("physicianstatus", "<center>" + failMessage + "</center>");
                displayLargeErrorMessages("createNewUserMsg", "<center>" + failMessage + "</center>");
            } else if (data == unauthorized) {
                displayLargeErrorMessages("physicianstatus", "<center>" + unauthorizedMessage + "</center>");
                displayLargeErrorMessages("createNewUserMsg", "<center>" + unauthorizedMessage + "</center>");
            } else if (data == invalidSession) {
                callSessionTimeout();
            }
        });
    }
}//create new physician end

//create new physician form keypress start
function createNewPhysician_keypress(event) {
    $('#physicianusername').val($('#physicianusername').val().replace(/\s/g, ''));
    $('#physicianpassword').val($('#physicianpassword').val().replace(/\s/g, ''));
    $('#physicianemail2').val($('#physicianemail2').val().replace(/\s/g, ''));

    if ($("#physicianusername").val() != "") {
//        $("#physicianusername").val(capitalize($("#physicianusername").val()));
        $("#physicianusernameError").removeClass("has-error");
        $("#physicianusernameMsg").text("");
        if (!isNaN($("#physicianusername").val()) == true) {
            $("#physicianusernameError").addClass("has-error");
            $('#physicianusername').popover('show');
            $("#physicianusername").focus();
            $("#physicianusernameMsg").text("").append("<br /><span class='smallErrorMsg'>Please enter valid username.</span>");
            return false;
        } else if (!$("#physicianusername").val().match(usernameExpression())) {
            $("#physicianusernameError").addClass("has-error");
            $('#physicianusername').popover('show');
            $("#physicianusername").focus();
            return false;
        } else if ($("#physicianusername").val().match(usernameExpression())) {
            $("#physicianusernameError").removeClass("has-error");
            $('#physicianusername').popover('hide');
        }
    }

    if ($("#physicianpassword").val() != "") {
        if (!$("#physicianpassword").val().match(passwordExpression())) {
            $("#physicianpasswordError").addClass("has-error");
            $('#physicianpassword').popover('show');
            $("#physicianpasswordMsg").text("").append("<span class='smallErrorMsg'>Please enter valid password.</span>");
            return false;
        } else if ($("#physicianpassword").val().match(passwordExpression())) {
            $('#physicianpassword').popover('hide');
            $("#physicianpasswordError").removeClass("has-error");
            $("#physicianpasswordMsg").text("");
        }
    }

    if ($("#physicianretypepassword").val() != "") {
        if ($("#physicianpassword").val() != $("#physicianretypepassword").val()) {
            $("#physicianretypepasswordMsg").text("").append("<span class='smallErrorMsg'>Password and Retype Password must be same.</span>");
            $("#physicianretypepasswordError").addClass("has-error");
            $("#physicianretypepassword").focus();
            return false;
        } else {
            $("#physicianretypepasswordMsg").text("");
            $("#physicianretypepasswordError").removeClass("has-error");
        }
    }

    if ($("#physicianfname").val() != "") {
//        $("#physicianfname").val(capitalize($("#physicianfname").val()));
        if (!$("#physicianfname").val().match((cityExpression()))) {
            $("#physicianfname").focus();
            $("#physicianfnameError").addClass("has-error");
            $("#physicianfnameMsg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
            return false;
        } else {
            $("#physicianfnameMsg").text("");
            $("#physicianfnameError").removeClass("has-error");
        }
    }

    if ($("#physicianmname").val() != "") {
//        $("#physicianmname").val(capitalize($("#physicianmname").val()));
        if (!$("#physicianmname").val().match((cityExpression()))) {
            $("#physicianmname").focus();
            $("#physicianmnameError").addClass("has-error");
            $("#physicianmnameMsg").text("").append("<span class='smallErrorMsg'>Please enter valid middle name.</span>");
            return false;
        } else {
            $("#physicianmnameMsg").text("");
            $("#physicianmnameError").removeClass("has-error");
        }
    }

    if ($("#physicianlname").val() != "") {
//        $("#physicianlname").val(capitalize($("#physicianlname").val()));
        if (!$("#physicianlname").val().match((cityExpression()))) {
            $("#physicianlname").focus();
            $("#physicianlnameError").addClass("has-error");
            $("#physiciannameMsg").text("").append("<span class='smallErrorMsg'>Please enter valid last name.</span>");
            return false;
        } else {
            $("#physicianlnameMsg").text("");
            $("#physicianlnameError").removeClass("has-error");
        }
    }

    if ($("#physiciandob").val() != "") {
        if (validateDate($("#physiciandob").val()) != true) {
            $("#physiciandobError").addClass("has-error");
            $("#physiciandobMsg").text("").append("<span class='smallErrorMsg'>Please enter vaid date.</span>");
            return false;
        }
        if (checkFutureDate($("#physiciandob").val()) != true) {
            $("#physiciandobError").addClass("has-error");
            $("#physiciandobMsg").text("").append("<span class='smallErrorMsg'>Please enter vaid date.</span>");
            return false;
        }
        $("#physiciandobError").removeClass("has-error");
        $("#physiciandobMsg").text("");
    }

    if ($("#physicianeducation").val() != "") {
//        $("#physicianeducation").val(capitalize($("#physicianeducation").val()));
        if (!$("#physicianeducation").val().match((cityExpression()))) {
            $("#physicianeducation").focus();
            $("#physicianeducationError").addClass("has-error");
            $("#physicianeducationMsg").text("").append("<span class='smallErrorMsg'>Numbers are not allowed here.</span>");
            return false;
        } else {
            $("#physicianeducationMsg").text("");
            $("#physicianeducationError").removeClass("has-error");
        }
    }

    if ($("#physicianemail2").val() != "") {
        if (!$("#physicianemail2").val().match((ValidateEmail()))) {
            $("#physicianemail2Error").addClass("has-error");
            $("#physicianemail2").focus();
            $("#physicianemail2Msg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
            return false;
        } else if ($("#physicianemail2").val().match((ValidateEmail()))) {
            $("#physicianemail2Error").removeClass("has-error");
            $("#physicianemail2Msg").text("");
        }
    }

    if ($("#physicianaddress1").val() != "") {
//        $("#physicianaddress1").val(capitalize($("#physicianaddress1").val()));
        $("#physicianaddress1Error").removeClass("has-error");
        $("#physicianaddress1Msg").text("");
    }

    if ($("#physiciancity").val() != "") {
//        $("#physiciancity").val(capitalize($("#physiciancity").val()));
        if (!$("#physiciancity").val().match((cityExpression()))) {
            $("#physiciancityError").addClass("has-error");
            $("#physiciancity").focus();
            $("#physiciancityMsg").text("").append("<span class='smallErrorMsg'>Please enter valid city.</span>");
            return false;
        }
        $("#physiciancityError").removeClass("has-error");
        $("#physiciancityMsg").text("");
    }

    if ($("#physicianstate").val() != "") {
        $("#physicianstateError").removeClass("has-error");
        $("#physicianstateMsg").text("");
    }

    if ($("#physicianmobilephone").val() != "") {
        $("#physicianmobilephoneError").removeClass("has-error");
        $("#physicianmobilephoneMsg").text("");
    }
    if ($('input[name=physicianLic]:checked').val() == "yes") {
        $("#physicianlicenseError").removeClass("has-error");
        $("#physicianlicenseMsg").text("");
    } else {
        $("#physicianlicenseError").addClass("has-error");
        $("#physicianlicenseMsg").text("").append("<span class='smallErrorMsg'>Please click on terms & conditions.</span>");
    }

    if ($("#physicianusername").val() != "" &&
            $("#physicianpassword").val() != "" &&
            $("#physicianretypepassword").val() != "" &&
            $("#physicianfname").val() != "" &&
            $("#physicianlname").val() != "" &&
            $("#physicianaddress1").val() != "" &&
            $("#physiciancity").val() != "" &&
            $("#physicianstate").val() != "" &&
            $("#physicianmobilephone").val() != "" &&
            $('input[name=physicianLic]:checked').val() == "yes") {
        $("#physicianstatus").text("");
        $("#createNewUserMsg").text("");
    }

    if (event.which == 13) {
        createNewPhysician();
        return false;
    }
}//create new physician form keypress end

//in invitation.jsp body onload start
function processInvitation(param) {
    $.post(server_base_url + "/irheum-server/PhysicianInvitationAccept", {
        param: param
    }).done(function(data) {
        if (data == invalidSession) {
            callSessionTimeout();
        } else {
            sessionStorage.setItem("email1", data.email1);
            sessionStorage.setItem("orgid", data.orgId);
            sessionStorage.setItem("role", data.role);
            sessionStorage.setItem("token", data.token);
            if (data.flag == "0") {
                location.href = "./createNewUser.jsp";
            } else {
                location.href = "./acceptInvitation.jsp";
            }
        }
    });
}//in invitation.jsp body onload end

//for accept invitation start
function addPhysicianToOrg() {
    if ($("#username_inv").val() == "") {
        $("#invUname").text("").append("<span class='smallErrorMsg'>Please enter username.</span>");
        $("#username_inv").focus();
    }
    if ($("#password_inv").val() == "") {
        $("#invPass").text("").append("<span class='smallErrorMsg'>Please enter password.</span>");
        $("#password_inv").focus();
    }
    if ($('input[name=physicianinvi]:checked').val() == "yes") {
        $("#invlicenseMsg").text("");
    } else {
        $("#invlicenseMsg").text("").append("<span class='smallErrorMsg'>Please click on terms & conditions.</span>");
    }

    if ($("#username_inv").val() == "" || $("#password_inv").val() == "" || $('input[name=physicianinvi]:checked').val() != "yes") {
        $("#physicianstatus").text("").prepend("<center><span class='smallErrorMsg'>Please fill the fields.</span></center>");
    } else {
        //        alert($("#physicianemail1").val() + "\t" + $("#physicianOrgId").val() + "\t" + $("#physicianRole").val() + "\t" + $("#username_inv").val() + "\t" + $("#password_inv").val() + "\t" + $("#token").val());
        $.post(server_base_url + "/irheum-server/PhysicianOrgAdd", {
            email1: $("#physicianemail1").val(),
            orgId: $("#physicianOrgId").val(),
            role: $("#physicianRole").val(),
            username: $("#username_inv").val(),
            password: $("#password_inv").val(),
            token: $("#token").val()
        }).done(function(data) {
            if (data == invalidSession) {
                callSessionTimeout();
            } else {
                if (data.code == "201" && data != null) {
                    $("#panel-body").text("").prepend("<lable id='providerInsertionStatus' style='font-size:16;color:orange;'></lable>");
                    $("#providerInsertionStatus").text("").append("<br/> <br/> You are Successfuly Registered");
                    $("#providerInsertionStatus").append("<br/> <br/> <a href='./index.jsp'>Click here to login</a>");
                } else {
                    $("#panel-body").text("").prepend("<lable id='physicianstatus' style='font-size:16;color:orange;'></lable>");
                    $("#physicianstatus").text("").prepend("<lable id='providerInsertionStatus' style='font-size:16;color:orange;'></lable>");
                    $("#providerInsertionStatus").text("").text("Error " + data.code + ": " + data.msg);
                }
            }
        });
    }
}//for accept invitation end

//for accept invitation page keypress start
function accept_inv_key(event) {
    if ($("#username_inv").val() != "") {
//        $("#username_inv").val(capitalize($("#username_inv").val()));
        $("#invUname").text("");
    }
    if ($("#password_inv").val() != "") {
        $("#invPass").text("");
    }
    if ($('input[name=physicianinvi]:checked').val() == "yes") {
        $("#invlicenseMsg").text("");
    } else {
        $("#invlicenseMsg").text("").append("<span class='smallErrorMsg'>Please click on terms & conditions.</span>");
    }
    if ($("#username_inv").val() != "" && $("#password_inv").val() != "" && $('input[name=physicianinvi]:checked').val() == "yes") {
        $("#physicianstatus").text("");
    }
    if (event.which == 13) {
        addPhysicianToOrg();
        return false;
    }
}//for accept invitation page keypress end

//onload setting data in hidden fields
function setNewUserData() {
    jQuery("#physiciandob").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    });
    jQuery("#physiciandob").mask("99/99/9999");
    jQuery("#physicianzipcode").mask("99999");
    jQuery("#physicianfax").mask("999.999.9999");
    jQuery("#physicianhomephone").mask("(999)999-9999");
    jQuery("#physicianworkphone").mask("(999)999-9999");
    jQuery("#physicianmobilephone").mask("(999)999-9999");
    $("#physicianemail1").val(getUserSessionElement("email1"));
    $("#physicianRole").val(getUserSessionElement("role"));
    $("#physicianOrgId").val(getUserSessionElement("orgid"));
    $("#token").val(getUserSessionElement("token"));

    $("#physicianemail1").attr('disabled', true);
    $("#physicianRole").attr('disabled', true);
}

//checking username availability
function checkOtherUsername() {

    if ($("#otherUserUserNameElement").val().length >= 1) {
        $.post(server_base_url + "UserNameCheck", {
            loginId: $("#otherUserUserNameElement").val()
        }).done(function(data) {
            if (data == unauthorized) {
                displaySmallErrorMessages("otherUserUserNameElementMsg", unauthorizedMessage);
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == "501") {
                displaySmallErrorMessages("otherUserUserNameElementMsg", "<br />Username already exists.");
                displayLargeErrorMessages("providerInsertionStatus", "Please fill all * marked fields.");
                displayLargeErrorMessages("providerMessage", "Please fill all * marked fields.");
                $("#userNameElement").addClass("has-error");
                $('#otherUserUserNameElement').popover('show');
                $("#otherUserUserNameElement").focus();
                return false;
            } else if (data == success) {
                displaySmallSuccessMessages("otherUserUserNameElementMsg", "<br />Username available.");
                $("#userNameElement").removeClass("has-error");
                $('#otherUserUserNameElement').popover('hide');
                return true;
            }
        });
    }
}

//checking username availability
function checkProviderUsername() {
    if ($("#physicianusername").val().length >= 1) {
        $.post(server_base_url + "/irheum-server/UserNameCheck", {
            loginId: $("#physicianusername").val()
        }).done(function(data) {
            if (data == unauthorized) {
                displaySmallErrorMessages("physicianusernameMsg", unauthorizedMessage);
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == fail) {
                displaySmallErrorMessages("physicianusernameMsg", "<br />Username already exists.");
                displayLargeErrorMessages("physicianstatus", "<center>Please fill all * marked fields.</center>");
                displayLargeErrorMessages("createNewUserMsg", "<center>Please fill all * marked fields.</center>");
                $("#physicianusernameError").addClass("has-error");
                $('#physicianusername').popover('show');
                $("#physicianusername").focus();
                return false;
            } else if (data == success) {
                displaySmallSuccessMessages("physicianusernameMsg", "<br />Username available.");
                $("#physicianusernameError").removeClass("has-error");
                $('#physicianusername').popover('hide');
                return true;
            }
        });
    }
}
function showLicenseDocument(div) {
//    $("#showLicenseDiv").text("").append("<iframe src='../TermsAndConditions/TermsAndConditions.pdf' frameborder='1' scrolling='auto' toolbar='disabled' height='30%' width='100%' target='_blank'></iframe>");
    $("#" + div).text("").append("<object type='application/pdf' data='../TermsAndConditions/TermsAndConditions.pdf' width='100%' height='100%' />");
}
function  showOrgDetails(id) {
    $.post(server_base_url + "OrgView", {
        userId: id
    }).done(function(data) {
        $("#viewUserOrg").val(data.orgname);
        $("#viewUserWebsite").val(data.website);
    });
}