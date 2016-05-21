var LoginId = getUserSessionElement("LoginId");

//view user profile display code
function viewUserProfile() {
    $.get(server_base_url + "/FetchUserDetails", {
        userId: getUserSessionElement("id")
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("userDemogDisplayTable", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("userDemogDisplayTable", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("userDemogDisplayTable", statusExceptionMessage);
        } else {
            getViewUserProfileForm();//calling function to create display form
            $("#u_loginid_v").text(data.loginid);
            $("#u_fname_v").text(data.fname);
            $("#u_mname_v").text(data.mname);
            $("#u_lname_v").text(data.lname);
            $("#u_gender_v").text(data.gender);
            $("#u_dob_v").text(data.dob);
            $("#u_email1_v").text(data.email1);
            $("#u_email2_v").text(data.email2);
            $("#u_address1_v").text(data.address1);
            $("#u_address2_v").text(data.address2);
            $("#u_city_v").text(data.city);
            $("#u_state_v").text(data.state);
            $("#u_country_v").text(data.country);
            $("#u_zipcode_v").text(data.zipcode);
            $("#u_homephone_v").text(data.homephone);
            $("#u_workphone_v").text(data.workphone);
            $("#u_mobilephone_v").text(data.mobilephone);


//            alert("hi");
//            $.each(data, function(index, value) {
//                alert(data);
//             $.each(value, function(i, v) {
//                 alert(i + " " + v);
//             });
//                alert(index + "\t" + value);




//                $("#u_" + index + "_v").text("").text(value);
//                $("#u_" + index + "_u").val("").val(value);
//                if (data.gender == "Male") {
//                    $('input[name=u_gender_u]').val([data.gender]);
//                    $("#u_gen_f").removeClass("active");
//                    $("#u_gen_m").addClass("active");
//                } else if (data.gender == "Female") {
//                    $('input[name=u_gender_u]').val([data.gender]);
//                    $("#u_gen_m").removeClass("active");
//                    $("#u_gen_f").addClass("active");
//                } else {
//                    $("#u_gen_m").removeClass("active");
//                    $("#u_gen_f").removeClass("active");
//                }//end if
//
//                var roleNames = "";
//                var orgrole = data.orgRole;
//                for (var m = 0; m < orgrole.length; m++) {
//                    var orgnames = orgrole[m];
//                    $.each(orgnames, function(index, value) {
//                        if (index == "role") {
//                            var data = value;
//                            $.each(data, function(index, value) {
//                                var data = value;
//                                $.each(data, function(index, value) {
//                                    if (index == "rolename") {
//                                        roleNames = roleNames + value + ",";
//                                    }
//                                });//for rolenames end
//                            });
//                        }//for role end            
//                    });
//                }
////                alert(roleNames);
//                $("#u_role_v").text("").text(roleNames.substring(0, roleNames.length - 1));
//                $("#u_role_u").val("").val(roleNames.substring(0, roleNames.length - 1));
//            });
        }
    });
}
//update user profile code start
function updateUserProfile() {
    getUpdateUserProfileForm(); //calling function to create update form
    $("#userUpdateButton").click(function() {
//getting data from fields
        var fname = $("#u_fname_u").val();
        var mname = $("#u_mname_u").val();
        var lname = $("#u_lname_u").val();
        var gender = $('input[name=u_gender_u]:checked').val();
        var orgname = $("#u_org_u").val();
        var website = $("u_web_u").val();
        var dob = $("#u_dob_u").val();
        var email1 = $("#u_email1_u").val();
        var email2 = $("#u_email2_u").val();
        var address1 = $("#u_address1_u").val();
        var address2 = $("#u_address2_u").val();
        var city = $("#u_city_u").val();
        var state = $("#u_state_u").val();
        var country = $("#u_country_u").val();
        var zipcode = $("#u_zipcode_u").val();
        var homephone = $("#u_homephone_u").val();
        var workphone = $("#u_workphone_u").val();
        var mobilephone = $("#u_mobilephone_u").val();
        if (fname == "") {
            $("#u_fname_error").addClass("has-error");
            $("#u_fname_u").focus();
            $("#u_fname_msg").text("").append("<span class='smallErrorMsg'>Please enter first name.</span>");
        } else if ($("#u_fname_u").val() != "") {
            if (!$("#u_fname_u").val().match((cityExpression()))) {
                $("#u_fname_error").addClass("has-error");
                $("#u_fname_u").focus();
                $("#u_fname_msg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
                return false;
            }
            $("#u_fname_error").removeClass("has-error");
            $("#u_fname_msg").text("");
        }

        if ($("#u_mname_u").val() != "") {
            if (!$("#u_mname_u").val().match((cityExpression()))) {
                $("#u_mname_error").addClass("has-error");
                $("#u_mname_u").focus();
                $("#u_mname_msg").text("").append("<span class='smallErrorMsg'>Please enter valid middle name.</span>");
                return false;
            }
            $("#u_mname_error").removeClass("has-error");
            $("#u_mname_msg").text("");
        }

        if (lname == "") {
            $("#u_lname_error").addClass("has-error");
            $("#u_lname_u").focus();
            $("#u_lname_msg").text("").append("<span class='smallErrorMsg'>Please enter last name.</span>");
        } else if ($("#u_lname_u").val() != "") {
            if (!$("#u_lname_u").val().match((cityExpression()))) {
                $("#u_lname_error").addClass("has-error");
                $("#u_lname_u").focus();
                $("#u_lname_msg").text("").append("<span class='smallErrorMsg'>Please enter valid last name.</span>");
                return false;
            }
            $("#u_lname_error").removeClass("has-error");
            $("#u_lname_msg").text("");
        }

        if ($("#u_dob_u").val() != "" && validateDate($("#u_dob_u").val()) != true) {
            $("#u_dob_error").addClass("has-error");
            $("#u_dob_msg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        } else {
            $("#u_dob_error").removeClass("has-error");
            $("#u_dob_msg").text("");
        }

//        if ($("#u_education_u").val() != "" && $("#u_education_u").val() != undefined) {
//            //if (!$("#u_education_u").val().match((cityExpression()))) {
//            if (!$("#u_education_u").val()) {
//                $("#u_education_u").focus();
//                $("#u_education_error").addClass("has-error");
//                $("#u_education_msg").text("").append("<span class='smallErrorMsg'>Numbers are not allowed here.</span>");
//                return false;
//            } else {
//                $("#u_education_msg").text("");
//                $("#u_education_error").removeClass("has-error");
//            }
//        }

        if (email1 == "") {
            $("#u_email1_error").addClass("has-error");
            $("#u_email1_u").focus();
            $("#u_email1_msg").text("").append("<span class='smallErrorMsg'>Please enter email address.</span>");
        } else if ($("#u_email1_u").val() != "") {
            if (!$("#u_email1_u").val().match((ValidateEmail()))) {
                $("#u_email1_error").addClass("has-error");
                $("#u_email1_u").focus();
                $("#u_email1_msg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
            }
            $("#u_email1_error").removeClass("has-error");
            $("#u_email1_msg").text("");
        }

        if (address1 == "") {
            $("#u_address1_error").addClass("has-error");
            $("#u_address1_u").focus();
            $("#u_address1_msg").text("").append("<span class='smallErrorMsg'>Please enter address.</span>");
        }

        if (city == "") {
            $("#u_city_error").addClass("has-error");
            $("#u_city_u").focus();
            $("#u_city_msg").text("").append("<span class='smallErrorMsg'>Please enter city.</span>");
        } else if ($("#u_city_u").val() != "") {
            if (!$("#u_city_u").val().match((cityExpression()))) {
                $("#u_city_error").addClass("has-error");
                $("#u_city_u").focus();
                $("#u_city_msg").text("").append("<span class='smallErrorMsg'>Please enter valid city.</span>");
                return false;
            }
            $("#u_city_error").removeClass("has-error");
            $("#u_city_msg").text("");
        }

        if (state == "") {
            $("#u_state_error").addClass("has-error");
            $("#u_state_u").focus();
            $("#u_state_msg").text("").append("<span class='smallErrorMsg'>Please select state.</span>");
        }
        if (mobilephone == "") {
            $("#u_mobilephone_error").addClass("has-error");
            $("#u_mobilephone_u").focus();
            $("#u_mobilephone_msg").text("").append("<span class='smallErrorMsg'>Please enter mobile phone.</span>");
        }

        if (fname == "" || lname == "" || address1 == "" || city == "" || state == "" || mobilephone == "") {
            $("#updateBeforeSuccessMsg").text("").prepend("<span class='largeErrorMsg'>Please fill all * marked fields.</span>");
            $("#updateAfterSuccessMsg").text("").append("<span class='largeErrorMsg'>Please fill all * marked fields.</span>");
        } else {
            $.get(server_base_url + "UserUpdate", {
                uerId: getUserSessionElement("id"),
                fname: fname,
                mname: mname,
                lname: lname,
                gender: gender,
                dob: dob,
                orgname: orgname,
                website: website,
                email1: email1,
                email2: email2,
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                country: country,
                zipcode: zipcode,
                homephone: homephone,
                workphone: workphone,
                mobilephone: mobilephone
            }).done(function(data) {
                if (data == fail) {
                    displayLargeErrorMessages("updateBeforeSuccessMsg", failMessage);
                    displayLargeErrorMessages("updateAfterSuccessMsg", failMessage);
                } else if (data == unauthorized) {
                    displayLargeErrorMessages("updateBeforeSuccessMsg", unauthorizedMessage);
                    displayLargeErrorMessages("updateAfterSuccessMsg", unauthorizedMessage);
                } else if (data == invalidSession) {
                    callSessionTimeout();
                } else if (data == statusException) {
                    displayLargeErrorMessages("updateBeforeSuccessMsg", statusExceptionMessage);
                    displayLargeErrorMessages("updateAfterSuccessMsg", statusExceptionMessage);
                } else {
                    $("#userUpdateButton").hide();
                    displayLargeSuccessMessages("updateBeforeSuccessMsg", successMessage);
                    displayLargeSuccessMessages("updateAfterSuccessMsg", successMessage);
                    $("#u_gen_m").attr("disabled", true);
                    $("#u_gen_f").attr("disabled", true);
                    $("input[type='text']").attr('readonly', true);
                    $("select").attr('disabled', true);
                    sessionStorage.setItem("FullName", data.fname); //for fname
                    sessionStorage.setItem("LastName", data.lname); //for lname    
                    viewUserProfile().reload();
                }
            }); //servlet end
        }
    });
}//update user profile code end  

//update user profile code keypress start
function updateUserProfile_keypress(event) {
    if ($("#u_fname_u").val() != "") {
//        $("#u_fname_u").val(capitalize($("#u_fname_u").val()));
        if (!$("#u_fname_u").val().match((cityExpression()))) {
            $("#u_fname_error").addClass("has-error");
            $("#u_fname_u").focus();
            $("#u_fname_msg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
            return false;
        }
        $("#u_fname_error").removeClass("has-error");
        $("#u_fname_msg").text("");
    }

    if ($("#u_mname_u").val() != "") {
//        $("#u_mname_u").val(capitalize($("#u_mname_u").val()));
        if (!$("#u_mname_u").val().match((cityExpression()))) {
            $("#u_mname_error").addClass("has-error");
            $("#u_mname_u").focus();
            $("#u_mname_msg").text("").append("<span class='smallErrorMsg'>Please enter valid middle name.</span>");
            return false;
        }
        $("#u_mname_error").removeClass("has-error");
        $("#u_mname_msg").text("");
    }

    if ($("#u_lname_u").val() != "") {
//        $("#u_lname_u").val(capitalize($("#u_lname_u").val()));
        if (!$("#u_lname_u").val().match((cityExpression()))) {
            $("#u_lname_error").addClass("has-error");
            $("#u_lname_u").focus();
            $("#u_lname_msg").text("").append("<span class='smallErrorMsg'>Please enter valid last name.</span>");
            return false;
        }
        $("#u_lname_error").removeClass("has-error");
        $("#u_lname_msg").text("");
    }
    if ($("#u_dob_u").val() != "" && validateDate($("#u_dob_u").val()) != true) {
        $("#u_dob_error").addClass("has-error");
        $("#u_dob_msg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
        return false;
    } else {
        $("#u_dob_error").removeClass("has-error");
        $("#u_dob_msg").text("");
    }

    if ($("#u_education_u").val() != "" && $("#u_education_u").val() != undefined) {
//        $("#u_education_u").val(capitalize($("#u_education_u").val()));
        if (!$("#u_education_u").val().match((cityExpression()))) {
            $("#u_education_u").focus();
            $("#u_education_error").addClass("has-error");
            $("#u_education_msg").text("").append("<span class='smallErrorMsg'>Numbers are not allowed here.</span>");
            return false;
        } else {
            $("#u_education_msg").text("");
            $("#u_education_error").removeClass("has-error");
        }
    }

    if ($("#u_email2_u").val() != "") {
        if ($("#u_email2_u").val().match((spaceExpression()))) {
            $('#u_email2_u').val($('#u_email2_u').val().replace(/\s/g, ''));
        }

        if (!$("#u_email2_u").val().match((ValidateEmail()))) {
            $("#u_email2_error").addClass("has-error");
            $("#u_email2_u").focus();
            $("#u_email2_msg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
            return false;
        }
        $("#u_email2_error").removeClass("has-error");
        $("#u_email2_msg").text("");
    } else {
        $("#u_email2_error").removeClass("has-error");
        $("#u_email2_msg").text("");
    }

    if ($("#u_address1_u").val() != "") {
        $("#u_address1_error").removeClass("has-error");
        $("#u_address1_msg").text("")
    }

    if ($("#u_city_u").val() != "") {
//        $("#u_city_u").val(capitalize($("#u_city_u").val()));
        if (!$("#u_city_u").val().match((cityExpression()))) {
            $("#u_city_error").addClass("has-error");
            $("#u_city_u").focus();
            $("#u_city_msg").text("").append("<span class='smallErrorMsg'>Please enter valid city.</span>");
            return false;
        }
        $("#u_city_error").removeClass("has-error");
        $("#u_city_msg").text("");
    }

    if ($("#u_state_u").val() != "") {
        $("#u_state_error").removeClass("has-error");
        $("#u_state_msg").text("");
    }

    if ($("#u_zipcode_u").val() != "") {
        $("#u_zipcode_error").removeClass("has-error");
        $("#u_zipcode_msg").text("");
    }

    if ($("#u_mobilephone_u").val() != "") {
        $("#u_mobilephone_error").removeClass("has-error");
        $("#u_mobilephone_msg").text("");
    }

    $("#updateBeforeSuccessMsg").text("");
    $("#updateAfterSuccessMsg").text("");
    if (event.which == 13) {
        $("#userUpdateButton").click();
        return false;
    }
}//update user profile code keypress end

//change user password
function changeUserPassword() {
    getChangeUserPasswordForm();
    $("#change_pass_btn").click(function() {
        var getOldPassword = $("#old_pass").val();
        var getNewPassword = $("#new_pass").val();
        var getConfirmPassword = $("#cnf_pass").val();
        if (getOldPassword == "") {
            $("#old_pass_error").addClass("has-error");
            $("#old_pass_msg").text("").append("<span class='smallErrorMsg'>Old password required</span>");
            $("#old_pass").focus();
        }

        if (getNewPassword == "") {
            $("#new_pass_error").addClass("has-error");
            $("#new_pass_msg").text("").append("<span class='smallErrorMsg'>New password required</span>");
            $("#new_pass").focus();
        } else if (!getNewPassword.match(passwordExpression())) {
            $("#new_pass_error").addClass("has-error");
            $("#new_pass_msg").text("").append("<span class='smallErrorMsg'>Please enter a password between 6-16 characters with 1 special character, 1 capital letter and 1 number, it should not contain any spaces.</span>");
            $("#new_pass").val("").focus();
            return false;
        }

        if (getConfirmPassword == "") {
            $("#cnf_pass_error").addClass("has-error");
            $("#cnf_pass_msg").text("").append("<span class='smallErrorMsg'>Confirm password required</span>");
            $("#cnf_pass").focus();
        } else if (getNewPassword != getConfirmPassword) {
            $("#cnf_pass_error").addClass("has-error");
            $("#cnf_pass_msg").text("").append("<span class='smallErrorMsg'>Password and Confirm Password must be same</span>");
            $("#cnf_pass").val("").focus();
            return false;
        }

        if (getOldPassword == "" || getNewPassword == "" || getConfirmPassword == "") {
            $("#changeAfterSuccessMsg").text("").prepend("<span id='updMsg' class='largeErrorMsg'>Please fill all * marked fields.</span>");
            return false;
        } else {
            $.get(server_base_url + "/irheum-server/ChangePassword", {
                oldpass: getOldPassword,
                newpass: getNewPassword
            }).done(function(data) {
                if (data == success) {
                    $("#change_pass_btn").hide();
                    displayLargeSuccessMessages("changeAfterSuccessMsg", "Password changed successfully.");
                    $("input[type='password']").attr('readonly', true);
                    $("input[type='password']").val("");
                    setTimeout(function() {
                        sessionStorage.clear();
                        location.href = "index.jsp";
                    }, 3000);
                } else if (data == fail) {
                    displayLargeErrorMessages("changeAfterSuccessMsg", failMessage);
                    $("#old_pass").val("").focus();
                } else if (data == unauthorized) {
                    displayLargeErrorMessages("changeAfterSuccessMsg", unauthorizedMessage);
                } else if (data == invalidSession) {
                    callSessionTimeout();
                } else if (data == statusException) {
                    displayLargeErrorMessages("changeAfterSuccessMsg", statusExceptionMessage);
                }
            });
        }
    });
}

//change user password keypress
function change_pass(event) {
    $('#old_pass').val($('#old_pass').val().replace(/\s/g, ''));
    $('#new_pass').val($('#new_pass').val().replace(/\s/g, ''));
    $('#cnf_pass').val($('#cnf_pass').val().replace(/\s/g, ''));
    if ($("#old_pass").val() != "") {
        $("#old_pass_error").removeClass("has-error");
        $("#old_pass_msg").text("");
    }
    if ($("#new_pass").val() != "") {
        $("#new_pass_error").removeClass("has-error");
        $("#new_pass_msg").text("");
    }
    if ($("#cnf_pass").val() != "") {
        $("#cnf_pass_error").removeClass("has-error");
        $("#cnf_pass_msg").text("");
    }
    $("#changeAfterSuccessMsg").text("");
    if (event.which == 13) {
        $('#change_pass_btn').click();
        return false;
    }
}//change password end


//change user password
function changeUserPin() {
    getChangeUserPinForm();
//fetching resume pin start
    $.get(server_base_url + "/irheum-server/ResumePinFetch", {
    }).done(function(data) {
        if (data == "" || data == undefined || data == null) {
            $("#u_resumePin_u").attr("placeholder", "Enter PIN");
        } else {
            $.each(data, function(i, v) {
                if (v.type == "resumePin") {
                    if (v.pin == null || v.pin == undefined || v.pin == "") {
                        $("#u_resumePin_u").attr("placeholder", "Enter PIN");
                    } else {
                        $("#u_resumePin_u").attr("placeholder", "Change PIN");
                    }
                }
            });
        }
    });
//fetching resume pin end

    $("#change_pin_btn").click(function() {
        if ($("#u_resumePin_u").val() == "") {
            $("#u_resumePin_error").addClass("has-error");
            $("#u_resumePin_u").focus();
            $("#u_resumePin_msg").text("").append("<span class='smallErrorMsg'>Please enter pin.</span>");
            return false;
        } else {
            var resumePin = "[{\"pin\":\"" + $("#u_resumePin_u").val() +
                    "\",\"type\":\"resumePin\"}]";
            $.get(server_base_url + "/irheum-server/ResumePinUpdate", {
                resumePinJSON: resumePin
            }).done(function(data) {
                if (data == success) {
                    $("#change_pin_btn").hide();
                    displayLargeSuccessMessages("changePinAfterSuccessMsg", "Pin successfully saved.");
                    $("#u_resumePin_u").attr('readonly', true);
                    $("input[type='password']").val("");
                    $("#u_resumePin_u").attr("placeholder", "Change PIN");
                } else if (data == fail) {
                    displayLargeErrorMessages("changePinAfterSuccessMsg", failMessage);
                    $("#u_resumePin_u").val("").focus();
                } else if (data == unauthorized) {
                    displayLargeErrorMessages("changePinAfterSuccessMsg", unauthorizedMessage);
                } else if (data == invalidSession) {
                    callSessionTimeout();
                } else if (data == statusException) {
                    displayLargeErrorMessages("changePinAfterSuccessMsg", statusExceptionMessage);
                }
            });
        }
    });
}

//change user password keypress
function changePinKeyup(event) {
    if ($("#u_resumePin_u").val() != "") {
        $("#u_resumePin_error").removeClass("has-error");
        $("#u_resumePin_msg").text("");
    }
    if (event.which == 13) {
        $('#change_pin_btn').click();
        return false;
    }
}//change password end