//for patient registration start
function addNewPatient() {
    addHover("addPatientMenu");
    addPatientValidation();
}//for patient registration end

//to add new patient validating org is selected or not
function addPatientValidation() {
    var user_selected_org = getUserSessionElement("user_selected_org");
    if (user_selected_org == null || user_selected_org == "" || user_selected_org == "undefined") {
        orgSelection(); //if null for organization selection
    } else {
        getPatientRegistrationForm();
        resetPatientReg();
    }
}

//patient fields validation
function patientValidation() {
    var fname = $("#preg_fname").val();
    var mname = $("#preg_mname").val();
    var lname = $("#preg_lname").val();
    var homephone = $("#preg_homephone").val();
    var email = $("#preg_email").val();
    var dob = $("#preg_dob").val();
    var address1 = $("#preg_address1").val();
    var city = $("#preg_city").val();
    var state = $("#preg_state").val();

    if (fname == "") {
        $("#preg_fname").focus();
        addSomeClass("fnameFieldGroup", "has-error");
        displaySmallErrorMessages("pregfname", "Please enter full name.");
    } else if (fname != "") {
        if (!fname.match((cityExpression()))) {
            addSomeClass("fnameFieldGroup", "has-error");
            displaySmallErrorMessages("pregfname", "Please enter valid first name.");
            return false;
        }
        $("#pregfname").text("");
        removeSomeClass("fnameFieldGroup", "has-error");
    }

    if (mname != "") {
        if (!mname.match((cityExpression()))) {
            addSomeClass("mnameFieldGroup", "has-error");
            displaySmallErrorMessages("pregmname", "Please enter valid middle name.");
            return false;
        }
        $("#pregmname").text("");
        removeSomeClass("mnameFieldGroup", "has-error");
    }

    if (lname == "") {
        $("#preg_lname").focus();
        addSomeClass("lnameFieldGroup", "has-error");
        displaySmallErrorMessages("preglname", "Please enter last name.");
    } else if (lname != "") {
        if (!lname.match((cityExpression()))) {
            addSomeClass("lnameFieldGroup", "has-error");
            displaySmallErrorMessages("preglname", "Please enter valid last name.");
            return false;
        }
        $("#preglname").text("");
        $("#fnameFieldGroup").removeClass("has-error");
    }

    if (dob == "") {
        addSomeClass("dobFieldGroup", "has-error");
        displaySmallErrorMessages("pregdob", "Please enter Date of Birth.");
    } else if (dob != "") {
        if (validateDate(dob) != true) {
            addSomeClass("dobFieldGroup", "has-error");
            displaySmallErrorMessages("pregdob", "Please enter valid date.");
            return false;
        }
        if (checkFutureDate(dob) != true) {
            addSomeClass("dobFieldGroup", "has-error");
            displaySmallErrorMessages("pregdob", "Please enter valid date.");
            return false;
        }
        $("#pregdob").text("");
        removeSomeClass("dobFieldGroup", "has-error");
    }

//    if (address1 == "") {
//        $("#preg_address1").focus();
//        addSomeClass("addr1FieldGroup", "has-error");
//        displaySmallErrorMessages("pregadd1", "Please enter address.");
//    }

    if (city == "") {
//        $("#preg_city").focus();
//        addSomeClass("cityFieldGroup", "has-error");
//        displaySmallErrorMessages("pregcity", "Please enter city.");
    } else if (city != "") {
        if (!city.match((cityExpression()))) {
            $("#preg_city").focus();
            addSomeClass("cityFieldGroup", "has-error");
            displaySmallErrorMessages("pregcity", "Please enter valid city.");
            return false;
        }
        $("#pregcity").text("");
        removeSomeClass("cityFieldGroup", "has-error");
    }

//    if (state == "") {
//        $("#preg_state").focus();
//        addSomeClass("stateFieldGroup", "has-error");
//        displaySmallErrorMessages("pregstate", "Please select state.");
//    }
//
//    if (homephone == "") {
//        $("#preg_homephone").focus();
//        addSomeClass("hphoneFieldGroup", "has-error");
//        displaySmallErrorMessages("pregphone", "Please enter phone number.");
//    }

    if (email != "") {
        if (!email.match((ValidateEmail()))) {
            $("#preg_email").focus();
            addSomeClass("emailFieldGroup", "has-error");
            displaySmallErrorMessages("pregemail", "Invalid email address.");
            return false;
        }
        $("#pregemail").text("");
        removeSomeClass("emailFieldGroup", "has-error");
    }
    else if (email == "") {
        $("#pregemail").text("");
        removeSomeClass("emailFieldGroup", "has-error");
    }

//    if (fname == "" || lname == "" || homephone == "" || dob == "" || address1 == "" || city == "" || state == "") {
    if (fname == "" || lname == "" || dob == "") {
        displayLargeErrorMessages("pregsuccessBefore", "Please fill all * marked fields.<br /><br />");
        displayLargeErrorMessages("pregsuccessAfter", "Please fill all * marked fields.<br /><br />");
        return false;
    } else {
        $("#pregsuccessBefore").text("");
        $("#pregsuccessAfter").text("");
        sendPatientData();
    }
}//patient fields validation end

//patient fields validation keypress
function patientreg_keypress(event) {
    var fname = $("#preg_fname").val();
    var mname = $("#preg_mname").val();
    var lname = $("#preg_lname").val();
    var homephone = $("#preg_homephone").val();
    var email = $("#preg_email").val();
    var dob = $("#preg_dob").val();
    var address1 = $("#preg_address1").val();
    var city = $("#preg_city").val();
    var state = $("#preg_state").val();

//    $('#preg_email').val($('#preg_email').val().replace(/\s/g, ''));

    if (fname != "") {
//        $("#preg_fname").val(capitalize($("#preg_fname").val()));
        if (!fname.match((cityExpression()))) {
            $("#preg_fname").focus();
            addSomeClass("fnameFieldGroup", "has-error");
            displaySmallErrorMessages("pregfname", "Please enter valid first name.");
            return false;
        }
        $("#pregfname").text("");
        removeSomeClass("fnameFieldGroup", "has-error");
    }

    if (mname != "") {
//        $("#preg_mname").val(capitalize($("#preg_mname").val()));
        if (!mname.match((cityExpression()))) {
            $("#preg_mname").focus();
            addSomeClass("mnameFieldGroup", "has-error");
            displaySmallErrorMessages("pregmname", "Please enter valid middle name.");
            return false;
        }
        $("#pregmname").text("");
        removeSomeClass("mnameFieldGroup", "has-error");
    }

    if (lname != "") {
//        $("#preg_lname").val(capitalize($("#preg_lname").val()));
        if (!lname.match((cityExpression()))) {
            addSomeClass("lnameFieldGroup", "has-error");
            displaySmallErrorMessages("preglname", "Please enter valid last name.");
            return false;
        }
        $("#preglname").text("");
        $("#lnameFieldGroup").removeClass("has-error");
    }

    if (dob != "") {
        if (validateDate(dob) != true) {
            addSomeClass("dobFieldGroup", "has-error");
            displaySmallErrorMessages("pregdob", "Please enter valid date.");
            return false;
        }
        if (checkFutureDate(dob) != true) {
            addSomeClass("dobFieldGroup", "has-error");
            displaySmallErrorMessages("pregdob", "Please enter valid date.");
            return false;
        }
        $("#pregdob").text("");
        removeSomeClass("dobFieldGroup", "has-error");
    }

    if (address1 != "") {
//        $("#preg_address1").val(capitalize($("#preg_address1").val()));
        $("#pregadd1").text("");
        removeSomeClass("addr1FieldGroup", "has-error");
    }

    if ($("#preg_address2").val() != "") {
//        $("#preg_address2").val(capitalize($("#preg_address2").val()));
    }

    if (city != "") {
//        $("#preg_city").val(capitalize($("#preg_city").val()));
        if (!city.match((cityExpression()))) {
            $("#preg_city").focus();
            addSomeClass("cityFieldGroup", "has-error");
            displaySmallErrorMessages("pregcity", "Please enter valid city.");
            return false;
        }
        $("#pregcity").text("");
        removeSomeClass("cityFieldGroup", "has-error");
    }

    if (state != "") {
        $("#pregstate").text("");
        removeSomeClass("stateFieldGroup", "has-error");
    }

    if (homephone != "") {
        $("#pregphone").text("");
        removeSomeClass("hphoneFieldGroup", "has-error");
    }

    if (email != "") {
        if (!email.match((ValidateEmail()))) {
            $("#preg_email").focus();
            addSomeClass("emailFieldGroup", "has-error");
            displaySmallErrorMessages("pregemail", "Invalid email address.");
            return false;
        }
        $("#pregemail").text("");
        removeSomeClass("emailFieldGroup", "has-error");
    } else if (email == "") {
        $("#pregemail").text("");
        removeSomeClass("emailFieldGroup", "has-error");
    }

//    if (fname != "" && lname != "" && homephone != "" && dob != "" && address1 != "" && city != "" && state != "") {
    if (fname != "" && lname != "" && dob != "") {
        $("#pregsuccessBefore").text("");
        $("#pregsuccessAfter").text("");
    }

//    if (event.which == 13) {
//        $('#patientRegSubmitBtn').click();
//        return false;
//    }
}//patient fields validation keypress end

//patient demographic register and display and edit and update
function sendPatientData() {
    $('button').attr('disabled', true);
    var patientAddress =
            "[{\"address1\":\"" + $("#preg_address1").val() +
            "\",\"address2\":\"" + $("#preg_address2").val() +
            "\",\"city\":\"" + $("#preg_city").val() +
            "\",\"state\":\"" + $("#preg_state").val() +
            "\",\"country\":\"" + $("#preg_country").val() +
            "\",\"zipcode\":\"" + $("#preg_postcode").val() +
            "\",\"phone\":\"" + $("#preg_homephone").val() +
            "\",\"email\":\"" + $("#preg_email").val() + "\"}]";
    var patientInsurance =
            "[{\"company\":\"" + $("#preg_pinscompany").val() +
            "\",\"member\":\"" + $("#preg_pinsmember").val() +
            "\",\"group\":\"" + $("#preg_pinsgroup").val() +
            "\",\"plan\":\"" + $("#preg_pinsplan").val() +
            "\",\"deducible\":\"" + $("#preg_pinsdeduc").val() +
            "\",\"copay\":\"" + $("#preg_pinscopay").val() +
            "\",\"type\":\"primary\"}," +
            "{\"company\":\"" + $("#preg_sinscompany").val() +
            "\",\"member\":\"" + $("#preg_sinsmember").val() +
            "\",\"group\":\"" + $("#preg_sinsgroup").val() +
            "\",\"plan\":\"" + $("#preg_sinsplan").val() +
            "\",\"deducible\":\"" + $("#preg_sinsdeduc").val() +
            "\",\"copay\":\"" + $("#preg_sinscopay").val() +
            "\",\"type\":\"secondary\"}]";
    var patientJson =
            "{\"providerPatientId\":\"" + $("#preg_ppid").val() +
            "\",\"ssn\":\"" + $("#preg_ssn").val() +
            "\",\"fname\":\"" + $("#preg_fname").val() +
            "\",\"mname\":\"" + $("#preg_mname").val() +
            "\",\"lname\":\"" + $("#preg_lname").val() +
            "\",\"gender\":\"" + $('input[name=pgender]:checked').val() +
            "\",\"race\":\"" + $("#preg_race").val() +
            "\",\"dob\":\"" + $("#preg_dob").val() +
            "\",\"address\":" + patientAddress +
            ",\"insurances\":" + patientInsurance + "}";
//    alert(patientJson);

    //displaying data function passing parmeters to view after submit
    displayAfterReg($("#preg_ppid").val(), $("#preg_ssn").val(), $("#preg_fname").val(), $("#preg_mname").val(), $("#preg_lname").val(), $('input[name=pgender]:checked').val(), $("#preg_race").val(), $("#preg_dob").val(),
            $("#preg_address1").val(), $("#preg_address2").val(), $("#preg_city").val(), $("#preg_state").val(), $("#preg_country").val(), $("#preg_postcode").val(), $("#preg_homephone").val(), $("#preg_email").val(),
            $("#preg_pinscompany").val(), $("#preg_pinsmember").val(), $("#preg_pinsgroup").val(), $("#preg_pinsplan").val(), $("#preg_pinsdeduc").val(), $("#preg_pinscopay").val(),
            $("#preg_sinscompany").val(), $("#preg_sinsmember").val(), $("#preg_sinsgroup").val(), $("#preg_sinsplan").val(), $("#preg_sinsdeduc").val(), $("#preg_sinscopay").val());

    //sending patient data to backend /patientregistration
    $.post(server_base_url + "/irheum-server/patientregistration", {
        patientJSON: patientJson,
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("pregsuccessBefore", "" + failMessage + "<br /><br />");
            displayLargeErrorMessages("pregsuccessAfter", "" + failMessage + "<br /><br />");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("pregsuccessBefore", "" + unauthorizedMessage + "<br /><br />");
            displayLargeErrorMessages("pregsuccessAfter", "" + unauthorizedMessage + "<br /><br />");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("pregsuccessBefore", "" + statusExceptionMessage + "<br /><br />");
            displayLargeErrorMessages("pregsuccessAfter", "" + statusExceptionMessage + "<br /><br />");
        } else {
            disablePatientFields();
            displayLargeSuccessMessages("pregsuccessBefore", "Successfully Registered.<br /><br />");
            displayLargeSuccessMessages("pregsuccessAfter", "Successfully Registered.<br /><br />");
            $("#patientid").val("").val(data._id);
            $("#addressid").val("").val(data.address[0]._id);
            $("#pinsuranceid").val("").val(data.insurances[0]._id);
            $("#sinsuranceid").val("").val(data.insurances[1]._id);
            $("#patientRegCancelBtn").hide();
            $("#patientRegSubmitBtn").hide();
            $("#updatePatientDetails").hide();

            $("#viewPatientId").remove();
            $("#editPatientId").remove();
            $("#addNewPatientId").remove();
            $("#backId").remove();
            $("#patRegBtnDiv").append("&nbsp;&nbsp;<button id='viewPatientId' class='btn btn-info'><b>View</b></button>&nbsp;&nbsp;<button class='btn btn-success'id='editPatientId'><b>Edit</b></button>&nbsp;&nbsp;<button class='btn btn-primary'id='addNewPatientId'><b>Add New</b></button>&nbsp;&nbsp;<button class='btn btn-warning'id='backId'><b>Exit</b></button>");
            editButtonDisplay();
            addNewButtonDisplay();
            backButtonDisplay();
            viewPatientInfo($("#patientid").val());
        }
    });
    $('button').attr('disabled', false);
}//view demographic end

function viewPatientInfo(pid) {
    $('#viewPatientId').click(function() {
        getPatientExamDemographicsData(pid);
        editPatientButton(pid);
    });
    $('#cancelPatientDetails').click(function() {
        getPatientExamDemographicsData(pid);
        editPatientButton(pid);
    });
    $('#cancel1PatientDetails').click(function() {
        getPatientExamDemographicsData(pid);
        editPatientButton(pid);
    });
}

//displaying data to view after submit
function displayAfterReg(ppid, ssn, fname, mname, lname, pgender, race, dob, address1, address2, city, state, country, postcode, homephone, email, pinscompany, pinsmember, pinsgroup, pinsplan, pinsdeduc, pinscopay, sinscompany, sinsmember,
        sinsgroup, sinsplan, sinsdeduc, sinscopay) {
    //display after register
    $("#preg_ppid").val(ppid);
    $("#preg_fname").val(fname);
    $("#preg_mname").val(mname);
    $("#preg_lname").val(lname);
    if (pgender == "Male") {
        $('#pgenderM').attr('checked', true);
        $("#labelpgender2").removeClass("active");
        $("#labelpgender1").addClass("active");
    } else if (pgender == "Female") {
        $('#pgenderF').attr('checked', true);
        $("#labelpgender1").removeClass("active");
        $("#labelpgender2").addClass("active");
    } else {
        $("#labelpgender1").removeClass("active");
        $("#labelpgender2").removeClass("active");
    }//end if

    $("#preg_dob").val(dob);
    $("#preg_address1").val(address1);
    $("#preg_address2").val(address2);
    $("#preg_city").val(city);
    $("#preg_state").val(state);
    $("#preg_country").val(country);
    $("#preg_postcode").val(postcode);
    $("#preg_homephone").val(homephone);
    $("#preg_email").val(email);
    $("#preg_ssn").val(ssn);
    $("#preg_race").val(race);
    $("#preg_pinscompany").val(pinscompany);
    $("#preg_pinsmember").val(pinsmember);
    $("#preg_pinsgroup").val(pinsgroup);
    $("#preg_pinsplan").val(pinsplan);
    $("#preg_pinsdeduc").val(pinsdeduc);
    $("#preg_pinscopay").val(pinscopay);
    $("#preg_sinscompany").val(sinscompany);
    $("#preg_sinsmember").val(sinsmember);
    $("#preg_sinsgroup").val(sinsgroup);
    $("#preg_sinsplan").val(sinsplan);
    $("#preg_sinsdeduc").val(sinsdeduc);
    $("#preg_sinscopay").val(sinscopay);
}//displaying data to view after submit end

//for patient reg form to reset all fields
function resetPatientReg() {
    $("#pregsuccessBefore").text("");
    $("#pregsuccessAfter").text("");
    $("input[type='text']").val("");
    $("input[type='email']").val("");
    $('input[name=pgender]').attr('checked', false);
    $("#labelpgender1").removeClass("active");
    $("#labelpgender2").removeClass("active");
    $("select").val("");
    $("#preg_country").val("USA");
}//for patient reg form to reset all fields end

//for disable fields
function disablePatientFields() {
    $("#labelpgender1").attr("disabled", true);
    $("#labelpgender2").attr("disabled", true);
    $("input[type='text']").attr('readonly', true);
    $("input[type='email']").attr('readonly', true);
    $("input[type='text']").attr('disabled', true);
    $("input[type='email']").attr('disabled', true);
    $("select").attr('disabled', true);
}

//for enable fields     
function enablePatientFields() {
    $("#labelpgender1").attr("disabled", false);
    $("#labelpgender2").attr("disabled", false);
    $("input[type='text']").attr('readonly', false);
    $("input[type='email']").attr('readonly', false);
    $("input[type='text']").attr('disabled', false);
    $("input[type='email']").attr('disabled', false);
    $("select").attr('disabled', false);
}

//edit button will enable to change details start
function editButtonDisplay() {
    $('#editPatientId').click(function() {
        $("#pregsuccessBefore").text("");
        $("#pregsuccessAfter").text("");
        enablePatientFields();
        //removing submit button displaying update button on registration form
        $("#patientRegSubmitBtn").hide();
        $("#patientRegCancelBtn").hide();
        $("#updatePatientDetails").remove();
        $("#patRegBtnDiv").text("").append("<button id='updatePatientDetails' class='btn btn-primary mr5'>Update</button><button style='margin-left:20px;' id='cancelPatientDetails' class='btn btn-dark mr5'>Cancel</button>");
        $("#patRegBtnDiv").append("<span id='pregsuccessAfter'></span>");
        updateAgainDetails(); //if update button click on reg form it will calls this function
    });//edit button click end
}//edit button will enable to change details end

//to display add new button in demographic display
function addNewButtonDisplay() {
    $('#addNewPatientId').click(function() {
        resetPatientReg();
        getPatientRegistrationForm();
    });
}//to display add new button in demographic display end

//to display back button in demographic display 
function backButtonDisplay() {
    $('#backId').click(function() {
        resetPatientReg();
        $("#dashboard-body").text("");
        prepareDashboard();
    });
}//to display back button in demographic display end

//demographic update getting values again from fields
function updateAgainDetails() {
    viewPatientInfo($("#patientid").val());
    $('#updatePatientDetails').click(function() {
        var fname = $("#preg_fname").val();
        var mname = $("#preg_mname").val();
        var lname = $("#preg_lname").val();
        var homephone = $("#preg_homephone").val();
        var email = $("#preg_email").val();
        var dob = $("#preg_dob").val();
        var address1 = $("#preg_address1").val();
        var city = $("#preg_city").val();
        var state = $("#preg_state").val();

        if (fname == "") {
            $("#preg_fname").focus();
            addSomeClass("fnameFieldGroup", "has-error");
            displaySmallErrorMessages("pregfname", "Please enter full name.");
        } else if (fname != "") {
            if (!fname.match((cityExpression()))) {
                addSomeClass("fnameFieldGroup", "has-error");
                displaySmallErrorMessages("pregfname", "Please enter valid first name.");
                return false;
            }
            $("#pregfname").text("");
            removeSomeClass("fnameFieldGroup", "has-error");
        }

        if (mname != "") {
            if (!mname.match((cityExpression()))) {
                addSomeClass("mnameFieldGroup", "has-error");
                displaySmallErrorMessages("pregmname", "Please enter valid middle name.");
                return false;
            }
            $("#pregmname").text("");
            removeSomeClass("mnameFieldGroup", "has-error");
        }

        if (lname == "") {
            $("#preg_lname").focus();
            addSomeClass("lnameFieldGroup", "has-error");
            displaySmallErrorMessages("preglname", "Please enter last name.");
        } else if (lname != "") {
            if (!lname.match((cityExpression()))) {
                addSomeClass("lnameFieldGroup", "has-error");
                displaySmallErrorMessages("preglname", "Please enter valid last name.");
                return false;
            }
            $("#preglname").text("");
            $("#fnameFieldGroup").removeClass("has-error");
        }

        if (dob == "") {
            addSomeClass("dobFieldGroup", "has-error");
            displaySmallErrorMessages("pregdob", "Please enter Date of Birth.");
        } else if (dob != "") {
            if (validateDate(dob) != true) {
                addSomeClass("dobFieldGroup", "has-error");
                displaySmallErrorMessages("pregdob", "Please enter valid date.");
                return false;
            }
            if (checkFutureDate(dob) != true) {
                addSomeClass("dobFieldGroup", "has-error");
                displaySmallErrorMessages("pregdob", "Please enter valid date.");
                return false;
            }
            $("#pregdob").text("");
            removeSomeClass("dobFieldGroup", "has-error");
        }

//        if (address1 == "") {
//            $("#preg_address1").focus();
//            addSomeClass("addr1FieldGroup", "has-error");
//            displaySmallErrorMessages("pregadd1", "Please enter address.");
//        }

        if (city == "") {
//            $("#preg_city").focus();
//            addSomeClass("cityFieldGroup", "has-error");
//            displaySmallErrorMessages("pregcity", "Please enter city.");
        } else if (city != "") {
            if (!city.match((cityExpression()))) {
                $("#preg_city").focus();
                addSomeClass("cityFieldGroup", "has-error");
                displaySmallErrorMessages("pregcity", "Please enter valid city.");
                return false;
            }
            $("#pregcity").text("");
            removeSomeClass("cityFieldGroup", "has-error");
        }

        if (state == "") {
//            $("#preg_state").focus();
//            addSomeClass("stateFieldGroup", "has-error");
//            displaySmallErrorMessages("pregstate", "Please select state.");
        }

        if (homephone == "") {
//            $("#preg_homephone").focus();
//            addSomeClass("hphoneFieldGroup", "has-error");
//            displaySmallErrorMessages("pregphone", "Please enter phone number.");
        }

//        if (email == "") {
//            $("#preg_email").focus();
//            addSomeClass("emailFieldGroup", "has-error");
//            displaySmallErrorMessages("pregemail", "Please enter email address.");
//        } else 
        if (email != "") {
            if (!email.match((ValidateEmail()))) {
                $("#preg_email").focus();
                addSomeClass("emailFieldGroup", "has-error");
                displaySmallErrorMessages("pregemail", "Invalid email address.");
                return false;
            }
            $("#pregemail").text("");
            removeSomeClass("emailFieldGroup", "has-error");
        }

//        if (fname == "" || lname == "" || homephone == "" || dob == "" || address1 == "" || city == "" || state == "") {
        if (fname == "" || lname == "" || dob == "") {
            displayLargeErrorMessages("pregsuccessBefore", "Please fill all * marked fields.<br /><br />");
            displayLargeErrorMessages("pregsuccessAfter", "Please fill all * marked fields.<br /><br />");
            return false;
        } else {
            $("#pregsuccessBefore").text("");
            $("#pregsuccessAfter").text("");
            //constructing json for update  
            var pid = "{\"$oid\"=\"" + $("#patientid").val() + "\"}";
            var patientAddress =
                    "[{\"_id\":\"" + $("#addressid").val() +
                    "\",\"address1\":\"" + $("#preg_address1").val() +
                    "\",\"address2\":\"" + $("#preg_address2").val() +
                    "\",\"city\":\"" + $("#preg_city").val() +
                    "\",\"state\":\"" + $("#preg_state").val() +
                    "\",\"country\":\"" + $("#preg_country").val() +
                    "\",\"zipcode\":\"" + $("#preg_postcode").val() +
                    "\",\"phone\":\"" + $("#preg_homephone").val() +
                    "\",\"email\":\"" + $("#preg_email").val() + "\"}]";

            var patientInsurance =
                    "[{\"_id\":\"" + $("#pinsuranceid").val() +
                    "\",\"company\":\"" + $("#preg_pinscompany").val() +
                    "\",\"member\":\"" + $("#preg_pinsmember").val() +
                    "\",\"group\":\"" + $("#preg_pinsgroup").val() +
                    "\",\"plan\":\"" + $("#preg_pinsplan").val() +
                    "\",\"deducible\":\"" + $("#preg_pinsdeduc").val() +
                    "\",\"copay\":\"" + $("#preg_pinscopay").val() +
                    "\",\"type\":\"primary\"}," +
                    "{\"_id\":\"" + $("#sinsuranceid").val() +
                    "\",\"company\":\"" + $("#preg_sinscompany").val() +
                    "\",\"member\":\"" + $("#preg_sinsmember").val() +
                    "\",\"group\":\"" + $("#preg_sinsgroup").val() +
                    "\",\"plan\":\"" + $("#preg_sinsplan").val() +
                    "\",\"deducible\":\"" + $("#preg_sinsdeduc").val() +
                    "\",\"copay\":\"" + $("#preg_sinscopay").val() +
                    "\",\"type\":\"secondary\"}]";

            var patientJson =
                    "{\"_id\":" + pid +
                    ",\"providerPatientId\":\"" + $("#preg_ppid").val() +
                    "\",\"ssn\":\"" + $("#preg_ssn").val() +
                    "\",\"fname\":\"" + $("#preg_fname").val() +
                    "\",\"mname\":\"" + $("#preg_mname").val() +
                    "\",\"lname\":\"" + $("#preg_lname").val() +
                    "\",\"gender\":\"" + $('input[name=pgender]:checked').val() +
                    "\",\"race\":\"" + $("#preg_race").val() +
                    "\",\"dob\":\"" + $("#preg_dob").val() +
                    "\",\"address\":" + patientAddress +
                    ",\"insurances\":" + patientInsurance + "}";

            //displaying data function passing parmeters to view after submit
            displayAfterReg($("#preg_ppid").val(), $("#preg_ssn").val(), $("#preg_fname").val(), $("#preg_mname").val(), $("#preg_lname").val(), $('input[name=pgender]:checked').val(), $("#preg_race").val(), $("#preg_dob").val(),
                    $("#preg_address1").val(), $("#preg_address2").val(), $("#preg_city").val(), $("#preg_state").val(), $("#preg_country").val(), $("#preg_postcode").val(), $("#preg_homephone").val(), $("#preg_email").val(),
                    $("#preg_pinscompany").val(), $("#preg_pinsmember").val(), $("#preg_pinsgroup").val(), $("#preg_pinsplan").val(), $("#preg_pinsdeduc").val(), $("#preg_pinscopay").val(),
                    $("#preg_sinscompany").val(), $("#preg_sinsmember").val(), $("#preg_sinsgroup").val(), $("#preg_sinsplan").val(), $("#preg_sinsdeduc").val(), $("#preg_sinscopay").val());

//        alert(patientJson);
            //sending patient data to backend
            $.post(server_base_url + "/irheum-server/patientinfoupdate", {
                patientJSON: patientJson
            }).done(function(data) {
                if (data == fail) {
                    displayLargeErrorMessages("pregsuccessBefore", "" + failMessage + "<br /><br />");
                    displayLargeErrorMessages("pregsuccessAfter", "" + failMessage + "<br /><br />");
                } else if (data == unauthorized) {
                    displayLargeErrorMessages("pregsuccessBefore", "" + unauthorizedMessage + "<br /><br />");
                    displayLargeErrorMessages("pregsuccessAfter", "" + unauthorizedMessage + "<br /><br />");
                } else if (data == invalidSession) {
                    callSessionTimeout();
                } else if (data == statusException) {
                    displayLargeErrorMessages("pregsuccessBefore", "" + statusExceptionMessage + "<br /><br />");
                    displayLargeErrorMessages("pregsuccessAfter", "" + statusExceptionMessage + "<br /><br />");
                } else {
                    disablePatientFields();
                    displayLargeSuccessMessages("pregsuccessBefore", "" + successMessage + "<br /><br />");
                    displayLargeSuccessMessages("pregsuccessAfter", "" + successMessage + "<br /><br />");
                    $("#patientid").val("").val(data._id.$oid);
                    $("#addressid").val("").val(data.address[0]._id);
                    $("#pinsuranceid").val("").val(data.insurances[0]._id);
                    $("#sinsuranceid").val("").val(data.insurances[1]._id);
                    $("#patientRegCancelBtn").hide();
                    $("#patientRegSubmitBtn").hide();
                    $("#updatePatientDetails").hide();

                    $("#viewPatientId").remove();
                    $("#editPatientId").remove();
                    $("#addNewPatientId").remove();
                    $("#backId").remove();
                    $("#cancelPatientDetails").remove();
                    $("#cancel1PatientDetails").remove();
                    $("#patRegBtnDiv").append("&nbsp;&nbsp;<button id='viewPatientId' class='btn btn-info'><b>View</b></button>&nbsp;&nbsp;<button class='btn btn-success'id='editPatientId'><b>Edit</b></button>&nbsp;&nbsp;<button class='btn btn-primary'id='addNewPatientId'><b>Add New</b></button>&nbsp;&nbsp;<button class='btn btn-warning'id='backId'><b>Exit</b></button>");
                    editButtonDisplay();
                    addNewButtonDisplay();
                    backButtonDisplay();
                    viewPatientInfo($("#patientid").val());
                }
            });
        }//end if
    });
}//demographic update getting values again from fields end