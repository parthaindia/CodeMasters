//all panels for patient registration start
function getPatientRegistrationForm() {
    $('html,body').scrollTop(0);
    $('#searchId').val("");
    $("#searchMsg").text("");
    $("#globalCommentsDivId").text("");
    if (checkUserPrivelege("RegisterPatient") == true || checkUserPrivelege("UpdatePatientInformation") == true) {
//main div
        $("#dashboard-body").text("").append("<div id='patientReg' />");
//after main div
        $("#patientReg").text("").append("<div id='patientMainDiv' class='col-md-6' />");
//for panel group
        $("#patientMainDiv").append("<div class='panel-group' id='accordion2' />");

//for first panel
        $("#accordion2").append("<div id='patRegFirstPanel' class='panel panel-primary' />");

        $("#patRegFirstPanel").append("<div id='firstPanelHeading' class='panel-heading' />");
        $("#firstPanelHeading").append("<h4 id='firstHeader' class='panel-title' />");
        $("#firstHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#accordion2' href='#collapseOne2'><center>Patient Registration</center></a>");

        $("#patRegFirstPanel").append("<div id='collapseOne2' class='panel-collapse collapse in' />");
        $("#collapseOne2").append("<div id='panelMainBody' class = 'panel-body' />");
        $("#panelMainBody").append("<div id='panelRow' class='row' />");

        $("#panelRow").append("<center><span id='pregsuccessBefore'></span></center>");

//for panel row
        $("#panelRow").append("<div id='ppidFieldGroup' class='form-group' />");
        $("#ppidFieldGroup").append("<label class='col-sm-3 control-label'>Provider Patient Identifier</label>");
        $("#ppidFieldGroup").append("<div id='ppidFieldDiv' class='col-sm-9' />");
        $("#ppidFieldDiv").append("<input type='text' id='preg_ppid' class='form-control' placeholder='Patient Id' onkeyup='patientreg_keypress(event)' size=50 maxlength=50>");
        $("#ppidFieldDiv").append("<span id='pregppid'></span>");


        $("#panelRow").append("<div id='ssnFieldGroup' class='form-group' />");
        $("#ssnFieldGroup").append("<label class='col-sm-3 control-label'>SSN<span class='asterisk'></span></label>");
        $("#ssnFieldGroup").append("<div id='ssnFieldDiv' class='col-sm-9' />");
        $("#ssnFieldDiv").append("<input type='text' id='preg_ssn' class='form-control' placeholder='SSN' onkeyup='patientreg_keypress(event)'>");
        jQuery("#preg_ssn").mask("999-99-9999");


        $("#panelRow").append("<div id='fnameFieldGroup' class='form-group' />");
        $("#fnameFieldGroup").append("<label class='col-sm-3 control-label'>First name<span class='asterisk'> *</span></label>");
        $("#fnameFieldGroup").append("<div id='fnameFieldDiv' class='col-sm-9' />");
        $("#fnameFieldDiv").append("<input type='text' id='preg_fname' class='form-control' placeholder='First name' onkeyup='patientreg_keypress(event)'>");
        $("#fnameFieldDiv").append("<span id='pregfname'></span>");

        $("#panelRow").append("<div id='mnameFieldGroup' class='form-group' />");
        $("#mnameFieldGroup").append("<label class='col-sm-3 control-label'>Middle name</label>");
        $("#mnameFieldGroup").append("<div id='mnameFieldDiv' class='col-sm-9' />");
        $("#mnameFieldDiv").append("<input type='text' id='preg_mname' class='form-control' placeholder='Middle name' onkeyup='patientreg_keypress(event)'>");
        $("#mnameFieldDiv").append("<span id='pregmname'></span>");

        $("#panelRow").append("<div id='lnameFieldGroup' class='form-group' />");
        $("#lnameFieldGroup").append("<label class='col-sm-3 control-label'>Last name<span class='asterisk'> *</span></label>");
        $("#lnameFieldGroup").append("<div id='lnameFieldDiv' class='col-sm-9' />");
        $("#lnameFieldDiv").append("<input type='text' id='preg_lname' class='form-control' placeholder='Last name' onkeyup='patientreg_keypress(event)'>");
        $("#lnameFieldDiv").append("<span id='preglname'></span>");

        $("#panelRow").append("<div id='genderFieldGroup' class='form-group' />");
        $("#genderFieldGroup").append("<label class='col-sm-3 control-label'>Gender</label>");
        $("#genderFieldGroup").append("<div id='genderFieldDiv' class='col-sm-9' />");
        $("#genderFieldDiv").append("<div id='genderButtonDiv' class='btn-group' data-toggle='buttons' />");
        $("#genderButtonDiv").append("<label class='btn blue btn-default' style='border-radius: 3px; font-weight: 600;' id='labelpgender1'><input type='radio' id='pgenderM' name='pgender' value='Male'>Male</label><label class='btn blue btn-default' style='margin-left: 15px; border-radius: 3px; font-weight: 600;' id='labelpgender2'><input type='radio' id='pgenderF' name='pgender' value='Female'>Female</label>");

        $("#panelRow").append("<div id='raceFieldGroup' class='form-group' />");
        $("#raceFieldGroup").append("<label class='col-sm-3 control-label'>Race</label>");
        $("#raceFieldGroup").append("<div id='raceFieldDiv' class='col-sm-9' />");
        $("#raceFieldDiv").append("<select id='preg_race' class='form-control' />");
        $("#preg_race").append("<option value=''>Choose One</option><option>White / Caucasian</option><option>Hispanic / Latino</option><option>Black / African American</option><option>Asian</option><option>American Indian / Alaska Native</option><option>Native Hawaiian / Pacific Islander</option><option>Other Race</option><option>Unknown / Not Provided</option><option>Decline to State</option>");
        $("#raceFieldDiv").append("<span id='pregrace'></span>");

        $("#panelRow").append("<div id='dobFieldGroup' class='form-group' />");
        $("#dobFieldGroup").append("<label class='col-sm-3 control-label'>Date of Birth<span class='asterisk'> *</span></label>");
        $("#dobFieldGroup").append("<div id='dobFieldDiv' class='col-sm-9' />");
        $("#dobFieldDiv").append("<input type='text' id='preg_dob' class='form-control' placeholder='MM/DD/YYYY' onchange='patientreg_keypress(event)' size=10 maxlength=10 >");
        $("#dobFieldDiv").append("<span id='pregdob'></span>");
        jQuery("#preg_dob").mask("99/99/9999");
        jQuery("#preg_dob").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: datePickerRange,
            maxDate: new Date,
            minDate: new Date(1900, 0, 1)
        });

        $("#panelRow").append("<div id='addr1FieldGroup' class='form-group' />");
//        $("#addr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
        $("#addr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1</label>");
        $("#addr1FieldGroup").append("<div id='addr1FieldDiv' class='col-sm-9' />");
        $("#addr1FieldDiv").append("<input type='text' id='preg_address1' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
        $("#addr1FieldDiv").append("<span id='pregadd1'></span>");

        $("#panelRow").append("<div id='addr2FieldGroup' class='form-group' />");
        $("#addr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
        $("#addr2FieldGroup").append("<div id='addr2FieldDiv' class='col-sm-9' />");
        $("#addr2FieldDiv").append("<input type='text' id='preg_address2' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

        $("#panelRow").append("<div id='cityFieldGroup' class='form-group' />");
//        $("#cityFieldGroup").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
        $("#cityFieldGroup").append("<label class='col-sm-3 control-label'>City</label>");
        $("#cityFieldGroup").append("<div id='cityFieldDiv' class='col-sm-9' />");
        $("#cityFieldDiv").append("<input type='text' id='preg_city' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
        $("#cityFieldDiv").append("<span id='pregcity'></span>");

        $("#panelRow").append("<div id='stateFieldGroup' class='form-group' />");
//        $("#stateFieldGroup").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
        $("#stateFieldGroup").append("<label class='col-sm-3 control-label'>State</label>");
        $("#stateFieldGroup").append("<div id='stateFieldDiv' class='col-sm-9' />");
        $("#stateFieldDiv").append("<select id='preg_state' class='form-control' onchange='patientreg_keypress(event)' />");
        $("#preg_state").append("<option value=''>Choose One</option><option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>");
        $("#stateFieldDiv").append("<span id='pregstate'></span>");

        $("#panelRow").append("<div id='countryFieldGroup' class='form-group' />");
        $("#countryFieldGroup").append("<label class='col-sm-3 control-label'>Country</label>");
        $("#countryFieldGroup").append("<div id='countryFieldDiv' class='col-sm-9' />");
        $("#countryFieldDiv").append("<select id='preg_country' class='form-control' />");
        $("#preg_country").append("<option>USA</option>");
        $("#countryFieldDiv").append("<span id='pregcountry'></span>");

        $("#panelRow").append("<div id='pcodeFieldGroup' class='form-group' />");
        $("#pcodeFieldGroup").append("<label class='col-sm-3 control-label'>Zip</label>");
        $("#pcodeFieldGroup").append("<div id='pcodeFieldDiv' class='col-sm-9' />");
        $("#pcodeFieldDiv").append("<input type='text' id='preg_postcode' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
        $("#pcodeFieldDiv").append("<span id='pregpostcode'></span>");
        $('#preg_postcode').mask('99999');

        $("#panelRow").append("<div id='hphoneFieldGroup' class='form-group' />");
//        $("#hphoneFieldGroup").append("<label class='col-sm-3 control-label'>Phone<span class='asterisk'> *</span></label>");
        $("#hphoneFieldGroup").append("<label class='col-sm-3 control-label'>Phone</label>");
        $("#hphoneFieldGroup").append("<div id='hphoneFieldDiv' class='col-sm-9' />");
        $("#hphoneFieldDiv").append("<input type='text' id='preg_homephone' class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
        $("#hphoneFieldDiv").append("<span id='pregphone'></span>");
        jQuery("#preg_homephone").mask("(999)999-9999");

        $("#panelRow").append("<div id='emailFieldGroup' class='form-group' />");
        $("#emailFieldGroup").append("<label class='col-sm-3 control-label'>Email</label>");
        $("#emailFieldGroup").append("<div id='emailFieldDiv' class='col-sm-9' />");
        $("#emailFieldDiv").append("<input type='email' id='preg_email' class='form-control' placeholder='Email' onkeyup='patientreg_keypress(event)'>");
        $("#emailFieldDiv").append("<span id='pregemail'></span>");


//for second panel
        $("#accordion2").append("<div id='patRegSecondPanel' class='panel panel-primary' />");

        $("#patRegSecondPanel").append("<div id='secondPanelHeading' class='panel-heading' />");
        $("#secondPanelHeading").append("<h4 id='secondHeader' class='panel-title' />");
        $("#secondHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' class='collapsed' data-parent='#accordion2' href='#collapseTwo2'><center>Primary Insurance</center></a>");

        $("#patRegSecondPanel").append("<div id='collapseTwo2' class='panel-collapse collapse' />");
        $("#collapseTwo2").append("<div id='secondPanelMainBody' class = 'panel-body' />");
        $("#secondPanelMainBody").append("<div id='secondPanelRow' class='row' />");

//for second panel row
        $("#secondPanelRow").append("<div id='pinscomFieldGroup' class='form-group' />");
        $("#pinscomFieldGroup").append("<label class='col-sm-3 control-label'>Insurance Company<span class='asterisk'></span></label>");
        $("#pinscomFieldGroup").append("<div id='pinscomFieldDiv' class='col-sm-9' />");
        $("#pinscomFieldDiv").append("<input type='text' id='preg_pinscompany' class='form-control' placeholder='Insurance Company' onkeyup='patientreg_keypress(event)'>");

        $("#secondPanelRow").append("<div id='pmembFieldGroup' class='form-group' />");
        $("#pmembFieldGroup").append("<label class='col-sm-3 control-label'>Policy #<span class='asterisk'></span></label>");
        $("#pmembFieldGroup").append("<div id='pmembcomFieldDiv' class='col-sm-9' />");
        $("#pmembcomFieldDiv").append("<input type='text' id='preg_pinsmember' class='form-control' placeholder='Policy' onkeyup='patientreg_keypress(event)'>");

        $("#secondPanelRow").append("<div id='pgroupFieldGroup' class='form-group' />");
        $("#pgroupFieldGroup").append("<label class='col-sm-3 control-label'>Group #<span class='asterisk'></span></label>");
        $("#pgroupFieldGroup").append("<div id='pgroupFieldDiv' class='col-sm-9' />");
        $("#pgroupFieldDiv").append("<input type='text' id='preg_pinsgroup' class='form-control' placeholder='Group' onkeyup='patientreg_keypress(event)'>");

        $("#secondPanelRow").append("<div id='pplanFieldGroup' class='form-group' />");
        $("#pplanFieldGroup").append("<label class='col-sm-3 control-label'>Plan #<span class='asterisk'></span></label>");
        $("#pplanFieldGroup").append("<div id='pplanFieldDiv' class='col-sm-9' />");
        $("#pplanFieldDiv").append("<input type='text' id='preg_pinsplan' class='form-control' placeholder='Plan' onkeyup='patientreg_keypress(event)'>");

        $("#secondPanelRow").append("<div id='pdeducFieldGroup' class='form-group' />");
        $("#pdeducFieldGroup").append("<label class='col-sm-3 control-label'>Deductible<span class='asterisk'></span></label>");
        $("#pdeducFieldGroup").append("<div id='pdeducFieldDiv' class='col-sm-9' />");
        $("#pdeducFieldDiv").append("<input type='text' id='preg_pinsdeduc' class='form-control' placeholder='Deductible' onkeyup='patientreg_keypress(event)'>");

        $("#secondPanelRow").append("<div id='pcopayFieldGroup' class='form-group' />");
        $("#pcopayFieldGroup").append("<label class='col-sm-3 control-label'>Co-pay<span class='asterisk'></span></label>");
        $("#pcopayFieldGroup").append("<div id='pcopayFieldDiv' class='col-sm-9' />");
        $("#pcopayFieldDiv").append("<input type='text' id='preg_pinscopay' class='form-control' placeholder='Co-pay' onkeyup='patientreg_keypress(event)'>");



//for third panel
        $("#accordion2").append("<div id='patRegThirdPanel' class='panel panel-primary' />");

        $("#patRegThirdPanel").append("<div id='thirdPanelHeading' class='panel-heading' />");
        $("#thirdPanelHeading").append("<h4 id='thirdHeader' class='panel-title' />");
        $("#thirdHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' class='collapsed' data-parent='#accordion2' href='#collapseThree2'><center>Secondary Insurance</center></a>");

        $("#patRegThirdPanel").append("<div id='collapseThree2' class='panel-collapse collapse' />");
        $("#collapseThree2").append("<div id='thirdPanelMainBody' class = 'panel-body' />");
        $("#thirdPanelMainBody").append("<div id='thirdPanelRow' class='row' />");

//for third panel row
        $("#thirdPanelRow").append("<div id='sinscomFieldGroup' class='form-group' />");
        $("#sinscomFieldGroup").append("<label class='col-sm-3 control-label'>Insurance Company<span class='asterisk'></span></label>");
        $("#sinscomFieldGroup").append("<div id='sinscomFieldDiv' class='col-sm-9' />");
        $("#sinscomFieldDiv").append("<input type='text' id='preg_sinscompany' class='form-control' placeholder='Insurance Company' onkeyup='patientreg_keypress(event)'>");

        $("#thirdPanelRow").append("<div id='smembFieldGroup' class='form-group' />");
        $("#smembFieldGroup").append("<label class='col-sm-3 control-label'>Policy #<span class='asterisk'></span></label>");
        $("#smembFieldGroup").append("<div id='smembcomFieldDiv' class='col-sm-9' />");
        $("#smembcomFieldDiv").append("<input type='text' id='preg_sinsmember' class='form-control' placeholder='Policy' onkeyup='patientreg_keypress(event)'>");

        $("#thirdPanelRow").append("<div id='sgroupFieldGroup' class='form-group' />");
        $("#sgroupFieldGroup").append("<label class='col-sm-3 control-label'>Group #<span class='asterisk'></span></label>");
        $("#sgroupFieldGroup").append("<div id='sgroupFieldDiv' class='col-sm-9' />");
        $("#sgroupFieldDiv").append("<input type='text' id='preg_sinsgroup' class='form-control' placeholder='Group' onkeyup='patientreg_keypress(event)'>");

        $("#thirdPanelRow").append("<div id='splanFieldGroup' class='form-group' />");
        $("#splanFieldGroup").append("<label class='col-sm-3 control-label'>Plan #<span class='asterisk'></span></label>");
        $("#splanFieldGroup").append("<div id='splanFieldDiv' class='col-sm-9' />");
        $("#splanFieldDiv").append("<input type='text' id='preg_sinsplan' class='form-control' placeholder='Plan' onkeyup='patientreg_keypress(event)'>");

        $("#thirdPanelRow").append("<div id='sdeducFieldGroup' class='form-group' />");
        $("#sdeducFieldGroup").append("<label class='col-sm-3 control-label'>Deductible<span class='asterisk'></span></label>");
        $("#sdeducFieldGroup").append("<div id='sdeducFieldDiv' class='col-sm-9' />");
        $("#sdeducFieldDiv").append("<input type='text' id='preg_sinsdeduc' class='form-control' placeholder='Deductible' onkeyup='patientreg_keypress(event)'>");

        $("#thirdPanelRow").append("<div id='scopayFieldGroup' class='form-group' />");
        $("#scopayFieldGroup").append("<label class='col-sm-3 control-label'>Co-pay<span class='asterisk'></span></label>");
        $("#scopayFieldGroup").append("<div id='scopayFieldDiv' class='col-sm-9' />");
        $("#scopayFieldDiv").append("<input type='text' id='preg_sinscopay' class='form-control' placeholder='Co-pay' onkeyup='patientreg_keypress(event)'>");


        $("#thirdPanelRow").append("<input type='hidden' id='patientid' /><input type='hidden' id='addressid' /><input type='hidden' id='pinsuranceid' /><input type='hidden' id='sinsuranceid' />");

        if (getUserSessionElement("insurance") == "no") {
            $("#patRegSecondPanel").hide();
            $("#patRegThirdPanel").hide();
        } else {
            $("#patRegSecondPanel").show();
            $("#patRegThirdPanel").show();
        }
//for fourth panel
        $("#accordion2").append("<div id='patRegfourthPanel' class='panel panel-default' />");

        $("#patRegfourthPanel").append("<div id='fourthPanelHeading' class='panel-heading' />");
        $("#fourthPanelHeading").append("<center><h4 id='patRegBtnDiv' class='panel-title' /></center>");
        $("#patRegBtnDiv").append("<span id='pregsuccessAfter'></span>");
        $("#patRegBtnDiv").append("<button id='patientRegSubmitBtn' class='btn btn-primary mr5' onclick='patientValidation()'>Submit</button><button id='patientRegCancelBtn' style='margin-left:20px;' class='btn btn-dark' onclick='resetPatientReg()'>Cancel</button>");
        $("#preg_ppid").focus(); //focus on first text field
    }
}//all panels for patient registration end