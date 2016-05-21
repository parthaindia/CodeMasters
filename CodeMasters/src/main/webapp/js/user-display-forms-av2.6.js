
//function settings() {
//    $("#dashboard-body").text("").append("<div id='setting' />");
//    $("#setting").append("<div id='mainTabMenu2' class='col-md-6' style='width:100%;' />");
//    $("#mainTabMenu2").append("<ul id='allUserMenuTab2' class='nav nav-tabs nav-justified nav-metro nav-info' />");
////    if (checkUserPrivelege("RegisterUser") == true) {
//    $("#allUserMenuTab2").append("<li id='addNewUserTabId2' class='active'><a href='#addNewUser' data-toggle='tab'><strong>Twitter Account</strong></a></li>");
////    }
////    if (checkUserPrivelege("ViewUsers") == true) {
//    $("#allUserMenuTab2").append("<li id='viewEditUserTabId' class=''><a href='#viewUser' data-toggle='tab'><strong>FaceBook Account</strong></a></li>");
////    }
////    $("#viewEditUserTabId").click(function() {
////        viewUsersListTab().reload();
////    });
////
//    $("#mainTabMenu2").append("<div id='mainTabMenuDiv' class='tab-content tab-content-primary mb30' />");
//}

//for user profile view
function myProfile() {
    $("#dashboard-body").text("").append("<div id='viewProfileMainDiv' />");
    $("#viewProfileMainDiv").append("<div id='mainProfileTabMenu' class='col-md-6' style='min-width:65%;max-width:100%;' />");
    $("#mainProfileTabMenu").append("<ul id='allProfileMenuTab' class='nav nav-tabs nav-justified nav-metro nav-success' />");
    $("#allProfileMenuTab").append("<li class='active' id='viewProfileMenu'><a href='#viewFieldsDiv' data-toggle='tab'><strong>View profile</strong></a></li>");
    $("#allProfileMenuTab").append("<li class='' id='updateProfileMenu'><a href='#updateProfileDiv' data-toggle='tab'><strong>Update profile</strong></a></li>");
    $("#allProfileMenuTab").append("<li class='' id='changePasswordmenu'><a href='#changePasswordDiv' data-toggle='tab'><strong>Change password</strong></a></li>");
//    $("#allProfileMenuTab").append("<li class='' id='changePinMenu'><a href='#changePinDiv' data-toggle='tab'><strong>Change PIN</strong></a></li>");
    $("#mainProfileTabMenu").append("<div id='mainProfileTabMenuDiv' class='tab-content tab-content-success mb30' />");

    viewUserProfile();//for view user profile tab
    updateUserProfile();//for update user profile tab
    changeUserPassword();//for change user password tab
//    changeUserPin();//for change user pin tab


    $("#updateProfileMenu").click(function() {
        $("#updateBeforeSuccessMsg").text("");
        $("#updateAfterSuccessMsg").text("");
        $("#userUpdateButton").show();
        $("#u_gen_m").attr("disabled", false);
        $("#u_gen_f").attr("disabled", false);
        $("input[type='text']").attr('readonly', false);
        $("select").attr('disabled', false);
    });
    $("#changePasswordmenu").click(function() {
        $("#changeAfterSuccessMsg").text("");
    });
    $("#changePinMenu").click(function() {
        $("#changePinAfterSuccessMsg").text("");
        $("#u_resumePin_u").attr('readonly', false);
        $("#change_pin_btn").show();
    });
}


//view user profile form start
function getViewUserProfileForm() {
    $("#mainProfileTabMenuDiv").append("<div id='viewFieldsDiv' class='tab-pane active' />");
//table starts
    $("#viewFieldsDiv").text("").append("<table id='userDemogDisplayTable' class='table table-striped table-bordered responsive no-footer' role='grid' aria-describedby='basicTable_info' />");
    $("#userDemogDisplayTable").append("<tbody id='userDemogDisplayTableBody' />");
    $("#userDemogDisplayTableBody").append("<tr><td>Username</td><td id='u_loginid_v'></td></tr>");
    //$("#userDemogDisplayTableBody").append("<tr><td>Role</td><td id='u_role_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td style='width:30%;'>First Name</td><td id='u_fname_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Middle Name</td><td id='u_mname_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Last Name</td><td id='u_lname_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Organization*</td><td id='u_org_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Website</td><td id='u_web_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Gender</td><td id='u_gender_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Date Of Birth</td><td id='u_dob_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Email 1</td><td id='u_email1_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Email 2</td><td id='u_email2_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Address 1</td><td id='u_address1_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Address 2</td><td id='u_address2_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>City</td><td id='u_city_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>State</td><td id='u_state_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Country</td><td id='u_country_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Zip</td><td id='u_zipcode_v'></td></tr>");
    //$("#userDemogDisplayTableBody").append("<tr><td>Fax</td><td id='u_fax_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Home Phone</td><td id='u_homephone_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Work Phone</td><td id='u_workphone_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Mobile Phone</td><td id='u_mobilephone_v'></td></tr>");

//    $("#viewFieldsDiv").append("<center><button id='editUserButton' class='btn btn-primary mr5' onclick='updateUserProfile()'>Edit</button></center>");

//table end
}//view user profile form end


function getUpdateUserProfileForm() {
    $("#mainProfileTabMenuDiv").append("<div id='updateProfileDiv' class='tab-pane' />");
    //for message
    $("#updateProfileDiv").prepend("<center><span id='updateBeforeSuccessMsg' /></center>");
//table starts
    $("#updateProfileDiv").append("<table id='userDemogUpdateTable' class='table userTable responsive no-footer' role = 'grid' aria - describedby = 'basicTable_info' />");
    $("#userDemogUpdateTable").append("<tbody id='userDemogUpdateTableBody' />");

    $("#userDemogUpdateTableBody").append("<tr id='u_loginid_error'><td><label class='control-label'>Username</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' readonly='readonly' class='form-control' placeholder='Username' id='u_loginid_u'><span id='u_loginid_msg' /></td></tr>");
    $("#u_loginid_u").attr('disabled', true);

    $("#userDemogUpdateTableBody").append("<tr id='u_fname_error'><td style='width:30%;'><label class='control-label'>First Name *</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='First name' id='u_fname_u' /><span id='u_fname_msg' /></td></tr>");
    $("#userDemogUpdateTableBody").append("<tr id='u_mname_error'><td><label class='control-label'>Middle Name</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Middle name' id='u_mname_u' /><span id='u_mname_msg' /></td></tr>");
    $("#userDemogUpdateTableBody").append("<tr id='u_lname_error'><td><label class='control-label'>Last Name *</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Last name' id='u_lname_u'><span id='u_lname_msg' /></td></tr>");

    $("#userDemogUpdateTableBody").append("<tr><td><label class='control-label'>Organization*</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='organization name' id='u_org_u'></td></tr>");

    $("#userDemogUpdateTableBody").append("<tr><td><label class='control-label'>Website</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='website' id='u_web_u'></td></tr>");

    $("#userDemogUpdateTableBody").append("<tr><td><label class='control-label'>Gender</label></td><td><div id='u_genderButtonDiv' class='btn-group' data-toggle='buttons' /></td></tr>");
    $("#u_genderButtonDiv").append("<label class='btn blue btn-default' style='border-radius: 3px; font-weight: 600;' id='u_gen_m'><input type='radio' id='u_gender_m' name='u_gender_u' value='Male' />Male</label><label class='btn blue btn-default' style='margin-left: 15px; border-radius: 3px; font-weight: 600;' id='u_gen_f'><input type='radio' id='u_gender_f' name='u_gender_u' value='Female' />Female</label>");

    $("#userDemogUpdateTableBody").append("<tr id='u_dob_error'><td><label class='control-label'>Date Of Birth</label></td><td><input type='text' onchange='updateUserProfile_keypress(event)' class='form-control' placeholder='MM/DD/YYYY' id='u_dob_u' size=10 maxlength=10><span id='u_dob_msg' /></td></tr>");
    jQuery("#u_dob_u").mask("99/99/9999");
    jQuery("#u_dob_u").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    });

    $("#userDemogUpdateTableBody").append("<tr id='u_email1_error'><td><label class='control-label'>Email 1 *</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Email 1' readonly='readonly' id='u_email1_u'><span id='u_email1_msg' /></td></tr>");
    $("#u_email1_u").attr('disabled', true);

    $("#userDemogUpdateTableBody").append("<tr id='u_email2_error'><td><label class='control-label'>Email 2</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Email 2' id='u_email2_u'><span id='u_email2_msg' /></td></tr>");
    $("#userDemogUpdateTableBody").append("<tr id='u_address1_error'><td><label class='control-label'>Address 1 *</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Address 1' id='u_address1_u'><span id='u_address1_msg' /></td></tr>");
    $("#userDemogUpdateTableBody").append("<tr><td><label class='control-label'>Address 2</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Address 2' id='u_address2_u'></td></tr>");
    $("#userDemogUpdateTableBody").append("<tr id='u_city_error'><td><label class='control-label'>City *</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='City' id='u_city_u'><span id='u_city_msg' /></td></tr>");

    $("#userDemogUpdateTableBody").append("<tr id='u_state_error'><td><label class='control-label'>State *</label></td><td><select id='u_state_u' class='form-control' onchange='updateUserProfile_keypress(event)' /><span id='u_state_msg' /></td></tr>");
    //$("#u_state_u").append("<option value=''>Choose One</option><option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>");
    $("#u_state_u").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");

    $("#userDemogUpdateTableBody").append("<tr><td><label class='control-label'>Country</label></td><td><select id='u_country_u' class='form-control' onchange='updateUserProfile_keypress(event)' /><span id='u_country_msg' /></td></tr>");
    $("#u_country_u").append("<option>INDIA</option>");

    $("#userDemogUpdateTableBody").append("<tr><td><label class='control-label'>Zip</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Zip' id='u_zipcode_u'><span id='u_zipcode_msg' /></td></tr>");
    jQuery("#u_zipcode_u").mask('999999');

    $("#userDemogUpdateTableBody").append("<tr><td><label class='control-label'>Home Phone</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Home phone' id='u_homephone_u'></td></tr>");
    $("#userDemogUpdateTableBody").append("<tr><td><label class='control-label'>Work Phone</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Work phone' id='u_workphone_u'></td></tr>");
    $("#userDemogUpdateTableBody").append("<tr id='u_mobilephone_error'><td><label class='control-label'>Mobile Phone *</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Mobile phone' id='u_mobilephone_u'><span id='u_mobilephone_msg' /></td></tr>");

    jQuery("#u_homephone_u").mask("(999)999-9999");
    jQuery("#u_workphone_u").mask("(999)999-9999");
    jQuery("#u_mobilephone_u").mask("(999)999-9999");

    //for update button
    $("#updateProfileDiv").append("<center><span id='updateAfterSuccessMsg' /></center><br>");
    $("#updateProfileDiv").append("<center><button id='userUpdateButton' class='btn btn-primary mr5'>Update</button></center>");
}

//for change pssword form
function getChangeUserPasswordForm() {
    $("#mainProfileTabMenuDiv").append("<div id='changePasswordDiv' class='tab-pane' />");
    //for message
    $("#changePasswordDiv").prepend("<center><span id='changeAfterSuccessMsg' /></center>");
    $("#changePasswordDiv").append("<table id='changePasswordTable' class='table userTable responsive no-footer' role = 'grid' aria - describedby = 'basicTable_info' />");
    $("#changePasswordTable").append("<tbody id='changePasswordTableBody' />");
    $("#changePasswordTableBody").append("<tr id='old_pass_error'><td style='width:30%;'><label class='control-label'>Old Password *</label></td><td><input type='password' name='old_pass' id='old_pass' class='form-control' placeholder='Old password' onkeyup='change_pass(event)'><span id='old_pass_msg' /></td></tr>");
    $("#changePasswordTableBody").append("<tr id='new_pass_error'><td><label class='control-label'>New Password *</label></td><td><input type='password' name='new_pass' id='new_pass' class='form-control' placeholder='New password' onkeyup='change_pass(event)'><span id='new_pass_msg' /></td></tr>");
    $("#changePasswordTableBody").append("<tr id='cnf_pass_error'><td><label class='control-label'>Confirm Password *</label></td><td><input type='password' name='cnf_pass' id='cnf_pass' class='form-control' placeholder='Confirm password' onkeyup='change_pass(event)'><span id='cnf_pass_msg' /></td></tr>");

//for update button
    $("#changePasswordDiv").append("<center><button class='btn btn-primary mr5' id='change_pass_btn'>Update</button></center>");
    $("#change_pass_btn").show();
}

//for change pin form
function getChangeUserPinForm() {
    $("#mainProfileTabMenuDiv").append("<div id='changePinDiv' class='tab-pane' />");
    //for message
    $("#changePinDiv").prepend("<center><span id='changePinAfterSuccessMsg' /></center>");
    $("#changePinDiv").append("<table id='changePinTable' class='table userTable responsive no-footer' role = 'grid' aria - describedby = 'basicTable_info' />");
    $("#changePinTable").append("<tbody id='changePinTableBody' />");
    $("#changePinTableBody").append("<tr id='u_resumePin_error'><td style='width:30%;'><label class='control-label'>Resume PIN *</label></td><td><input type='password' class='form-control' placeholder='Enter your PIN' id='u_resumePin_u' onkeyup='changePinKeyup(event)' size=4 maxlength=4><span id='u_resumePin_msg' /></td></tr>");

    //for update button
    $("#changePinDiv").append("<center><button class='btn btn-primary mr5' id='change_pin_btn'>Save</button></center>");
}