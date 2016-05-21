//for PhysicianPreference
function addPhysicianPreference() {
    $('#searchId').val("");
    $("#searchMsg").text("");
    $("#globalCommentsDivId").text("");
    $("#dashboard-body").text("").append("<div id='physicianPreferenceMainDiv' />");
    $("#physicianPreferenceMainDiv").append("<div id='physicianPreferenceTabMenu' class='col-md-6' style='min-width:75%;max-width:100%;' />");
    $("#physicianPreferenceTabMenu").append("<ul id='physicianPreferenceAllTabMenus' class='nav nav-tabs nav-justified nav-metro nav-primary' />");
    $("#physicianPreferenceAllTabMenus").append("<li class='active' id='credentialsMenu'><a href='#physicianCredentialsDiv' data-toggle='tab'><strong>Credentials</strong></a></li>");
    $("#physicianPreferenceAllTabMenus").append("<li class='' id='outcomemeasureMenu'><a href='#physicianOutcomeMeasuresDiv' data-toggle='tab'><strong>Outcome measures</strong></a></li>");
    $("#physicianPreferenceAllTabMenus").append("<li class='' id='licenseMenu'><a href='#physicianLicenseDiv' data-toggle='tab'><strong>License</strong></a></li>");
    $("#physicianPreferenceTabMenu").append("<div id='physicianPreferenceBodyDiv' class='tab-content tab-content-primary mb30' />");

    getphysicianCredentialsForm();//for reset pin tab
    getphysicianOutcomeMeasuresForm();//for outcome measures tab
    getphysicianLicenseForm();//for license tab
    loadPreferencesData();

    $("#credentialsMenu").click(function() {
        $("#preferenceSuccessMsg").text("");
    });
    $("#outcomemeasureMenu").click(function() {
        $("#phyOutcomeMsg").text("");
    });
    $("#licenseMenu").click(function() {
        $("#licenseSuccessMsg").text("");
    });
}

function getphysicianCredentialsForm() {
    $("#physicianPreferenceBodyDiv").append("<div id='physicianCredentialsDiv' class='tab-pane active' />");
    $("#physicianCredentialsDiv").prepend("<center><span id='preferenceSuccessMsg' /></center>");
//table starts
    $("#physicianCredentialsDiv").append("<table id='physicianCredentialsTable' class='table userTable responsive no-footer' role = 'grid' aria - describedby = 'basicTable_info' />");
    $("#physicianCredentialsTable").append("<tbody id='physicianCredentialsTableBody' />");

    $("#physicianCredentialsTableBody").append("<tr><td><label class='control-label'>PDF Password</label><span style='padding-left:5px;font-size:10px;color:blue;cursor:pointer;font-size:12px;' onclick='whatIsPDFPINPopup()'>[?]</span></td><td><label id='u_pdfPin_u' class='control-label'></label></td></tr>");

    $("#physicianCredentialsTableBody").append("<tr id='u_prescribingPin_error'><td><label class='control-label'>Prescribing PIN *</label></td><td><input type='password' onkeyup='physicianCredentialsKeyup(event)' class='form-control' placeholder='Enter 4 digit prescribing pin' id='u_prescribingPin_u' size=4 maxlength=4><span id='u_prescribingPin_msg' /></td></tr>");

    $("#physicianCredentialsTableBody").append("<tr id='u_npi_error'><td><label class='control-label'>NPI *</label></td><td><input type='text' onkeyup='physicianCredentialsKeyup(event)' class='form-control' placeholder='NPI' id='u_npi_u'><span id='u_npi_msg' /></td></tr>");
    jQuery("#u_npi_u").mask("9999999999");

    $("#physicianCredentialsTableBody").append("<tr id='u_dea_error'><td><label class='control-label'>DEA *</label></td><td><input type='text' onkeyup='physicianCredentialsKeyup(event)' class='form-control' placeholder='DEA' size=10 maxlength=10 id='u_dea_u'><span id='u_dea_msg' /></td></tr>");
//    jQuery("#u_dea_u").mask("9999999999");

    $("#physicianCredentialsTableBody").append("<tr id='u_medicaidNo_error'><td><label class='control-label'>Medicaid Number</label></td><td><input type='text' class='form-control' placeholder='Medicaid number' id='u_medicaidNo_u' size=13 maxlength=13><span id='u_medicaidNo_msg' /></td></tr>");
    jQuery("#u_medicaidNo_u").mask("9999999999999");

//    $("#physicianCredentialsTableBody").append("<tr id='displayTd'><td><label class='control-label'>Display</label></td>");
//    $("#displayTd").append("<div id='displayDiv' class='btn-group' /><br />");
//    $("#displayDiv").append("<label id='TenderLabel' class='btn quest btn-default' style='margin-left:10px;font-weight:bold;min-width:50px;max-width:100px;'><input type = 'checkbox' style='display:none;' id='displayTender' value='Tender' onclick=credentialsOnClick('displayTender','TenderLabel') />Tender</label>");
//    $("#displayDiv").append("<label id='SwollenLabel' class='btn quest btn-default' style='margin-left:10px;font-weight:bold;min-width:50px;max-width:100px;'><input type = 'checkbox' style='display:none;' id='displaySwollen' value='Swollen' onclick=credentialsOnClick('displaySwollen','SwollenLabel') />Swollen</label>");
//    $("#displayDiv").append("<label id='SDAILabel' class='btn quest btn-default' style='margin-left:10px;font-weight:bold;min-width:50px;max-width:100px;'><input type = 'checkbox' style='display:none;' id='displaySDAI' value='SDAI' onclick=credentialsOnClick('displaySDAI','SDAILabel') />SDAI</label>");
//    $("#displayDiv").append("<label id='DASLabel' class='btn quest btn-default' style='margin-left:10px;font-weight:bold;min-width:50px;max-width:100px;'><input type = 'checkbox' style='display:none;' id='displayDAS' value='DAS' onclick=credentialsOnClick('displayDAS','DASLabel') />DAS</label>");

    $("#physicianCredentialsTableBody").append("<tr id='credentialsTd'><td><label class='control-label'>Credentials</label></td>");
    $("#credentialsTd").append("<div id='credentialsDiv' class='btn-group' /><br />");
    $("#credentialsDiv").append("<label id='MDLabel' class='btn quest btn-default' style='margin-left:10px;font-weight:bold;min-width:50px;max-width:100px;'><input type = 'checkbox' style='display:none;' id='credentialsMD' value='MD' onclick=credentialsOnClick('credentialsMD','MDLabel') />MD</label>");
    $("#credentialsDiv").append("<label id='DOLabel' class='btn quest btn-default' style='margin-left:10px;font-weight:bold;min-width:50px;max-width:100px;'><input type = 'checkbox' style='display:none;' id='credentialsDO' value='DO' onclick=credentialsOnClick('credentialsDO','DOLabel') />DO</label>");
    $("#credentialsDiv").append("<label id='PhDLabel' class='btn quest btn-default' style='margin-left:10px;font-weight:bold;min-width:50px;max-width:100px;'><input type = 'checkbox' style='display:none;' id='credentialsPhD' value='PhD' onclick=credentialsOnClick('credentialsPhD','PhDLabel') />PhD</label>");

    $("#physicianCredentialsTableBody").append("<tr><td>&nbsp;</td><td id='prefBtnTd'></td>");
    $("#prefBtnTd").text("").append("<button class='btn btn-primary' id='saveCredentialsButton' onclick='saveCredentials()'><b>Save</b></button>");
}


function whatIsPDFPINPopup() {
    $("#beginExamCnfpopup").text("");
    $("#PINPopup").text("").append("<div class='modal fade' id='PINModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' data-backdrop='static' data-keyboard='false' />");
    $("#PINModal").text("").append("<div id='chooseRadam' data-toggle='modal' data-target='#PINModal' />");
    $("#PINModal").append("<div id='PINModalDialog' class='modal-dialog' />");
    $("#PINModalDialog").append("<div id='PINModalContent' class='modal-content' />");
    $("#PINModalContent").append("<div class='modal-header'><h4 id='myModalLabel'>This password is useful to view the patient reports from your mail inbox.</h4></div>");
    $("#PINModalContent").append("<div class='modal-footer'><button class='btn btn-primary' onclick='closePDFPINPopup()'>Close</button></div>");
    $("#chooseRadam").click();
}

function closePDFPINPopup() {
    $("#PINModal").append("<div id='closeRadamPopup' class='btn btn-default' data-dismiss='modal' />");
    $("#closeRadamPopup").click();
    $("#closeRadamPopup").remove();
}

function credentialsOnClick(id, label) {
    if ($("#" + id).is(":checked") == true) {
        $("#" + label).addClass("active");
    } else {
        $("#" + label).removeClass("active");
    }
}

function getphysicianOutcomeMeasuresForm() {
    $("#physicianPreferenceBodyDiv").append("<div id='physicianOutcomeMeasuresDiv' class='tab-pane' />");
    $("#physicianOutcomeMeasuresDiv").prepend("<center><span id='phyOutcomeMsg' /></center>");
    $("#physicianOutcomeMeasuresDiv").append("<div id='physicianOutcomeDiv' class='btn-group' />");

    $("#physicianOutcomeDiv").append("<label id='dasesrLabel' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:200px;max-width:250px;'><input type = 'checkbox' style='display:none;' id='dasesrId' onclick=credentialsOnClick('dasesrId','dasesrLabel') /> DAS28-ESR </label><br />");
    $("#physicianOutcomeDiv").append("<label id='dascrpLabel' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:200px;max-width:250px;'><input type = 'checkbox' style='display:none;' id='dascrpId' onclick=credentialsOnClick('dascrpId','dascrpLabel') /> DAS28-CRP </label><br />");
    $("#physicianOutcomeDiv").append("<label id='sdaiLabel' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:200px;max-width:250px;'><input type = 'checkbox' style='display:none;' id='sdaiId' onclick=credentialsOnClick('sdaiId','sdaiLabel') /> SDAI </label><br />");
    $("#physicianOutcomeDiv").append("<label id='cdaiLabel' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:200px;max-width:250px;'><input type = 'checkbox' style='display:none;' id='cdaiId' onclick=credentialsOnClick('cdaiId','cdaiLabel') /> CDAI </label><br />");
    $("#physicianOutcomeDiv").append("<label id='rapid3Label' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:200px;max-width:250px;'><input type = 'checkbox' style='display:none;' id='rapid3Id' onclick=credentialsOnClick('rapid3Id','rapid3Label') /> PAS2 </label><br />");
    $("#physicianOutcomeDiv").append("<div id='outComBtnDiv' />");
    $("#outComBtnDiv").text("").append("<center><button class='btn btn-primary'id='savePhysicianOutcomeMeasure' onclick='savePhysicianOutcomeMeasures()'><b>Save</b></button></center>");
}

function getphysicianLicenseForm() {
    $("#physicianPreferenceBodyDiv").append("<div id='physicianLicenseDiv' class='tab-pane' />");
    $("#physicianLicenseDiv").prepend("<center><span id='licenseSuccessMsg' /></center>");

    $("#physicianLicenseDiv").append("<table id='physicianLicenseTable' class='table userTable responsive no-footer' role = 'grid' aria - describedby = 'basicTable_info' />");
    $("#physicianLicenseTable").append("<tbody id='physicianLicenseTableBody' />");

    $("#physicianLicenseTableBody").append("<tr id='u_licenseNo_error'><td><label class='control-label'>License no *</label></td><td><input type='text' onkeyup='physicianLicenseKeyup(event)' size=6 maxlength=6 class='form-control' placeholder='Enter your license' id='u_licenceNo_u'><span id='u_licenseNo_msg'/></td></tr>");
    jQuery("#u_licenceNo_u").mask("******");


    $("#physicianLicenseTableBody").append("<tr><td><label class='control-label'>State</label></td><td><select id='u_licenseState_u' class='form-control' /></td></tr>");
    $("#u_licenseState_u").append("<option value=''>Choose One</option><option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>");

    $("#physicianLicenseTableBody").append("<tr id='u_issuedDate_error'><td><label class='control-label'>Issued date *</label></td><td><input type='text' onchange='physicianLicenseKeyup(event)' class='form-control' placeholder='Enter your issued date' id='u_issuedDate_u'><span id='u_issuedDate_msg'/></td></tr>");
    jQuery("#u_issuedDate_u").mask("99/99/9999");
    jQuery("#u_issuedDate_u").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    });

    $("#physicianLicenseTableBody").append("<tr id='u_expiryDate_error'><td><label class='control-label'>Expiration date *</label></td><td><input type='text' onchange='physicianLicenseKeyup(event)' class='form-control' placeholder='Enter your expiration date' id='u_expiryDate_u'><span id='u_expiryDate_msg'/></td></tr>");
    jQuery("#u_expiryDate_u").mask("99/99/9999");
    jQuery("#u_expiryDate_u").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange
    });

    $("#physicianLicenseTableBody").append("<tr id='u_licenseStatus_error'><td><label class='control-label'>Status *</label></td><td><select id='u_licenseStatus_u' class='form-control' onchange='physicianLicenseKeyup(event)' /><span id='u_licenseStatus_msg'/></td></tr>");
    $("#u_licenseStatus_u").append("<option value=''>Choose One</option><option>Active</option><option>Inactive</option>");

    $("#physicianLicenseTableBody").append("<tr><td>&nbsp;</td><td id='licenseBtnTd'></td>");
    $("#licenseBtnTd").text("").append("<button class='btn btn-primary' id='saveLicenseButton' onclick='saveLicense()'><b>Save</b></button>");
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadPreferencesData() {
    $.get(server_base_url + "/irheum-server/PhysicianPreference", {
    }).done(function(data) {
        if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $.each(data, function(index, value) {
//            alert(index + "\t" + value);
                $("#u_" + index + "_u").val(value);
                if (index == "calcPrefs") {
                    for (var i = 0; i < value.length; i++) {
                        $("#" + value[i] + "Id").attr('checked', true);
                        $("#" + value[i] + "Label").addClass("active");
                    }
                }
//                else if (index == "displays") {
//                    for (var i = 0; i < value.length; i++) {
//                        $("#display" + value[i]).attr('checked', true);
//                        $("#" + value[i] + "Label").addClass("active");
//                    }
//                } 
                else if (index == "credentials") {
                    for (var i = 0; i < value.length; i++) {
                        $("#credentials" + value[i]).attr('checked', true);
                        $("#" + value[i] + "Label").addClass("active");
                    }
                } else if (index == "pins") {
                    var data = value;
                    $.each(data, function(index, value) {
                        $("#u_" + value.type + "_u").val(value.pin);
                        if (value.type = "pdfPin") {
                            $("#u_" + value.type + "_u").text(value.pin);
                        }
                    });
                } else if (index == "licences") {
                    var data = value;
                    $.each(data, function(index, value) {
                        var data = value;
                        $.each(data, function(index, value) {
                            $("#u_" + index + "_u").val(value);
                            if (index == "state") {
                                $("#u_licenseState_u").val(value);
                            }
                            if (index == "status") {
                                $("#u_licenseStatus_u").val(value);
                            }
                        });
                    });
                }
            });
        }
    });
}

//------------------------------------------credentials start---------------
function saveCredentials() {
    if ($("#u_npi_u").val() == "") {
        $("#u_npi_error").addClass("has-error");
        $("#u_npi_msg").text("").append("<span class='smallErrorMsg'>Please enter NPI.</span>");
    }
    if ($("#u_dea_u").val() == "") {
        $("#u_dea_error").addClass("has-error");
        $("#u_dea_msg").text("").append("<span class='smallErrorMsg'>Please enter DEA.</span>");
    }
    if ($("#u_prescribingPin_u").val() == "") {
        $("#u_prescribingPin_error").addClass("has-error");
        $("#u_prescribingPin_msg").text("").append("<span class='smallErrorMsg'>Please enter prescribing PIN.</span>");
    }
    if ($("#u_npi_u").val() == "" || $("#u_dea_u").val() == "" || $("#u_prescribingPin_u").val() == "") {
        $("#preferenceSuccessMsg").text("").prepend("<span class='largeErrorMsg'>Please fill all * marked fields.</span><br /><br />");
        return false;
    } else {
        var pins = "[{\"pin\":\"" + $("#u_prescribingPin_u").val() +
                "\",\"type\":\"prescribingPin\"},{\"pin\":\"" + $("#u_pdfPin_u").text() +
                "\",\"type\":\"pdfPin\"}]";
        pins = "\"pins\":" + pins;

        var displays = "";
//        if ($('#displayTender').is(":checked") == true) {
//            displays = displays + "\"Tender\",";
//        }
//        if ($('#displaySwollen').is(":checked") == true) {
//            displays = displays + "\"Swollen\",";
//        }
//        if ($('#displaySDAI').is(":checked") == true) {
//            displays = displays + "\"SDAI\",";
//        }
//        if ($('#displayDAS').is(":checked") == true) {
//            displays = displays + "\"DAS\",";
//        }
//        displays = displays.substr(0, displays.length - 1);
        displays = "\"displays\":" + "[" + displays + "]";

        var credentials = "";
        if ($('#credentialsMD').is(":checked") == true) {
            credentials = credentials + "\"MD\",";
        } else {
        }
        if ($('#credentialsDO').is(":checked") == true) {
            credentials = credentials + "\"DO\",";
        } else {
        }
        if ($('#credentialsPhD').is(":checked") == true) {
            credentials = credentials + "\"PhD\",";
        } else {
        }
        credentials = credentials.substr(0, credentials.length - 1);
        credentials = "\"credentials\":" + "[" + credentials + "]";

        var npi = "\"npi\":" + "\"" + $("#u_npi_u").val() + "\"";
        var dea = "\"dea\":" + "\"" + $("#u_dea_u").val() + "\"";
        var medNo = "\"medicaidNo\":" + "\"" + $("#u_medicaidNo_u").val() + "\"";
        var phyJson = "[{" + pins + "," + npi + "," + dea + "," + medNo + "," + displays + "," + credentials + "}]";
//        alert(phyJson);
        $.get(server_base_url + "/irheum-server/PhysicianPreferenceUpdate", {
            phyPrefJSON: phyJson
        }).done(function(data) {
            if (data == success) {
                displayLargeSuccessMessages("preferenceSuccessMsg", successMessage);
                disablePreferencesFields();
                $("#prefBtnTd").text("").append("<button class='btn btn-warning' id='editCredentialsButton' onclick='updateCredentials()'><b>Edit</b></button>");
            } else if (data == fail) {
                displayLargeErrorMessages("preferenceSuccessMsg", failMessage);
            } else if (data == unauthorized) {
                displayLargeErrorMessages("preferenceSuccessMsg", unauthorizedMessage);
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == statusException) {
                displayLargeErrorMessages("preferenceSuccessMsg", statusExceptionMessage);
            }
        });
    }
}
function disablePreferencesFields() {
    $("#u_prescribingPin_u").attr('disabled', true);
    $("#u_npi_u").attr('disabled', true);
    $("#u_dea_u").attr('disabled', true);
    $("#u_medicaidNo_u").attr('disabled', true);

//    $("#displayTender").attr('disabled', true);
//    $("#TenderLabel").attr('disabled', true);
//
//    $("#displaySwollen").attr('disabled', true);
//    $("#SwollenLabel").attr('disabled', true);
//
//    $("#displaySDAI").attr('disabled', true);
//    $("#SDAILabel").attr('disabled', true);
//
//    $("#displayDAS").attr('disabled', true);
//    $("#DASLabel").attr('disabled', true);

    $("#credentialsMD").attr('disabled', true);
    $("#MDLabel").attr('disabled', true);

    $("#credentialsDO").attr('disabled', true);
    $("#DOLabel").attr('disabled', true);

    $("#credentialsPhD").attr('disabled', true);
    $("#PhDLabel").attr('disabled', true);
}

function enablePreferencesFields() {
    $("#u_prescribingPin_u").attr('disabled', false);
    $("#u_npi_u").attr('disabled', false);
    $("#u_dea_u").attr('disabled', false);
    $("#u_medicaidNo_u").attr('disabled', false);

//    $("#displayTender").attr('disabled', false);
//    $("#TenderLabel").attr('disabled', false);
//
//    $("#displaySwollen").attr('disabled', false);
//    $("#SwollenLabel").attr('disabled', false);
//
//    $("#displaySDAI").attr('disabled', false);
//    $("#SDAILabel").attr('disabled', false);
//
//    $("#displayDAS").attr('disabled', false);
//    $("#DASLabel").attr('disabled', false);

    $("#credentialsMD").attr('disabled', false);
    $("#MDLabel").attr('disabled', false);

    $("#credentialsDO").attr('disabled', false);
    $("#DOLabel").attr('disabled', false);

    $("#credentialsPhD").attr('disabled', false);
    $("#PhDLabel").attr('disabled', false);
}

function updateCredentials() {
    $("#preferenceSuccessMsg").text("");
    enablePreferencesFields();
    $("#prefBtnTd").text("").append("<button class='btn btn-primary' id='updateCredentialsButton' onclick='saveCredentials()'><b>Update</b></button>");
}

function physicianCredentialsKeyup(event) {
    if ($("#u_npi_u").val() != "") {
        $("#u_npi_error").removeClass("has-error");
        $("#u_npi_msg").text("");
    }
    if ($("#u_dea_u").val() != "") {
//        if ($("#u_dea_u").val().match(allowNumbersCharacters())) {
//            displaySmallErrorMessages("u_dea_msg", "No special characters allowed.");
//        }
        $("#u_dea_error").removeClass("has-error");
        $("#u_dea_msg").text("");
    }
    if ($("#u_prescribingPin_u").val() != "") {
        if (/\D/g.test($("#u_prescribingPin_u").val()))
            $("#u_prescribingPin_u").val($("#u_prescribingPin_u").val().replace(/\D/g, ''))
        $("#u_prescribingPin_error").removeClass("has-error");
        $("#u_prescribingPin_msg").text("");
    }
    if ($("#u_npi_u").val() != "" && $("#u_dea_u").val() != "" && $("#u_prescribingPin_u").val() != "") {
        $("#preferenceSuccessMsg").text("");
    }
    if (event.which == 13) {
        saveCredentials();
        return false;
    }
}
//------------------------------------------credentials end---------------

//------------------------------------------outcome measures start---------------
function savePhysicianOutcomeMeasures() {
    var outcomeMeasuresSelected = "";
    if ($('#dasesrId').is(":checked") == true) {
        outcomeMeasuresSelected = outcomeMeasuresSelected + "\"dasesr\",";
    }
    if ($('#dascrpId').is(":checked") == true) {
        outcomeMeasuresSelected = outcomeMeasuresSelected + "\"dascrp\",";
    }
    if ($('#sdaiId').is(":checked") == true) {
        outcomeMeasuresSelected = outcomeMeasuresSelected + "\"sdai\",";
    }
    if ($('#cdaiId').is(":checked") == true) {
        outcomeMeasuresSelected = outcomeMeasuresSelected + "\"cdai\",";
    }
    if ($('#rapid3Id').is(":checked") == true) {
        outcomeMeasuresSelected = outcomeMeasuresSelected + "\"rapid3\",";
    }
    outcomeMeasuresSelected = outcomeMeasuresSelected.substr(0, outcomeMeasuresSelected.length - 1);
    outcomeMeasuresSelected = "\"calcPrefs\":" + "[" + outcomeMeasuresSelected + "]";
    outcomeMeasuresSelected = "[{" + outcomeMeasuresSelected + "}]";
//    alert(outcomeMeasuresSelected);
    $.get(server_base_url + "/irheum-server/PhyPrefOutcome", {
        phyOutcomeJSON: outcomeMeasuresSelected
    }).done(function(data) {
        if (data == success) {
            disablePhysicianOutcomeMeasuresFields();
            displayLargeSuccessMessages("phyOutcomeMsg", successMessage + "<br /><br />");
            $("#outComBtnDiv").text("").append("<center><button class='btn btn-warning' id='editOutcomeMeasuresButton' onclick='updateOutcomeMeasures()'><b>Edit</b></button></center>");
        } else if (data == fail) {
            displayLargeErrorMessages("phyOutcomeMsg", failMessage + "<br /><br />");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("phyOutcomeMsg", unauthorizedMessage + "<br /><br />");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("phyOutcomeMsg", statusExceptionMessage + "<br /><br />");
        }
    });
}
function updateOutcomeMeasures() {
    $("#phyOutcomeMsg").text("");
    enablePhysicianOutcomeMeasuresFields();
    $("#outComBtnDiv").text("").append("<center><button class='btn btn-primary' id='updateOutcomeMeasuresButton' onclick='savePhysicianOutcomeMeasures()'><b>Update</b></button></center>");
}
function disablePhysicianOutcomeMeasuresFields() {
    $("#dasesrId").attr('disabled', true);
    $("#dasesrLabel").attr('disabled', true);

    $("#dascrpId").attr('disabled', true);
    $("#dascrpLabel").attr('disabled', true);

    $("#sdaiId").attr('disabled', true);
    $("#sdaiLabel").attr('disabled', true);

    $("#cdaiId").attr('disabled', true);
    $("#cdaiLabel").attr('disabled', true);

    $("#rapid3Id").attr('disabled', true);
    $("#rapid3Label").attr('disabled', true);
}

function enablePhysicianOutcomeMeasuresFields() {
    $("#dasesrId").attr('disabled', false);
    $("#dasesrLabel").attr('disabled', false);

    $("#dascrpId").attr('disabled', false);
    $("#dascrpLabel").attr('disabled', false);

    $("#sdaiId").attr('disabled', false);
    $("#sdaiLabel").attr('disabled', false);

    $("#cdaiId").attr('disabled', false);
    $("#cdaiLabel").attr('disabled', false);

    $("#rapid3Id").attr('disabled', false);
    $("#rapid3Label").attr('disabled', false);
}
//------------------------------------------outcome measures end---------------


//------------------------------------------license start---------------
function saveLicense() {
    if ($("#u_licenceNo_u").val() == "") {
        $("#u_licenseNo_error").addClass("has-error");
        $("#u_licenseNo_msg").text("").append("<span class='smallErrorMsg'>Please enter license no.</span>");
    }

    if ($("#u_issuedDate_u").val() == "") {
        $("#u_issuedDate_error").addClass("has-error");
        $("#u_issuedDate_msg").text("").append("<span class='smallErrorMsg'>Please enter issued date.</span>");
    } else if ($("#u_issuedDate_u").val() != "") {
        if (validateDate($("#u_issuedDate_u").val()) != true) {
            $("#u_issuedDate_error").addClass("has-error");
            $("#u_issuedDate_msg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        if (checkFutureDate($("#u_issuedDate_u").val()) != true) {
            $("#u_issuedDate_error").addClass("has-error");
            $("#u_issuedDate_msg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        $("#u_issuedDate_error").removeClass("has-error");
        $("#u_issuedDate_msg").text("");
    }

    if ($("#u_expiryDate_u").val() == "") {
        $("#u_expiryDate_error").addClass("has-error");
        $("#u_expiryDate_msg").text("").append("<span class='smallErrorMsg'>Please enter expiry date.</span>");
    } else if ($("#u_expiryDate_u").val() != "") {
        if (validateDate($("#u_expiryDate_u").val()) != true) {
            $("#u_expiryDate_error").addClass("has-error");
            $("#u_expiryDate_msg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        $("#u_expiryDate_error").removeClass("has-error");
        $("#u_expiryDate_msg").text("");
    }

    if ($("#u_licenseStatus_u").val() == "") {
        $("#u_licenseStatus_error").addClass("has-error");
        $("#u_licenseStatus_msg").text("").append("<span class='smallErrorMsg'>Please select status.</span>");
    }

    if (compareDates($("#u_issuedDate_u").val(), $("#u_expiryDate_u").val()) == true) {
        $("#u_expiryDate_error").removeClass("has-error");
        $("#u_expiryDate_msg").text("");
    } else {
        $("#u_expiryDate_error").addClass("has-error");
        $("#u_expiryDate_msg").text("").append("<span class='smallErrorMsg'>Expiry date should be greater then issued date.</span>");
        return false;
    }

    var licenseJson = "";
    var json = "";
    var licenseNo = "";
    var licenseState = "";
    var issuedDate = "";
    var expiryDate = "";
    var licenseStatus = "";

    if ($("#u_licenceNo_u").val() != undefined) {
        licenseNo = $("#u_licenceNo_u").val();
    }
    if ($("#u_licenseState_u").val() != undefined) {
        licenseState = $("#u_licenseState_u").val();
    }
    if ($("#u_issuedDate_u").val() != undefined) {
        issuedDate = $("#u_issuedDate_u").val();
    }
    if ($("#u_expiryDate_u").val() != undefined) {
        expiryDate = $("#u_expiryDate_u").val();
    }
    if ($("#u_licenseStatus_u").val() != undefined) {
        licenseStatus = $("#u_licenseStatus_u").val();
    }

    if (licenseNo != undefined || licenseNo != "") {
        json = json + "\"licenceNo\":\"" + licenseNo + "\",";
    }
    if (licenseState != undefined || licenseState != "") {
        json = json + "\"state\":\"" + licenseState + "\",";
    }
    if (issuedDate != undefined || issuedDate != "") {
        json = json + "\"issuedDate\":\"" + issuedDate + "\",";
    }
    if (expiryDate != undefined || expiryDate != "") {
        json = json + "\"expiryDate\":\"" + expiryDate + "\",";
    }
    if (licenseStatus != undefined || licenseStatus != "") {
        json = json + "\"status\":\"" + licenseStatus + "\",";
    }

    if (json !== "") {
        json = "[{" + json.substring(0, json.length - 1) + "}]";
        json = "\"licences\":" + json;
    }

    if ($("#u_licenceNo_u").val() == "" || $("#u_issuedDate_u").val() == "" || $("#u_expiryDate_u").val() == "" || $("#u_licenseStatus_u").val() == "") {
        $("#licenseSuccessMsg").text("").prepend("<span class='largeErrorMsg'>Please fill all * marked fields.</span><br /><br />");
        return false;
    } else {
        $("#u_issuedDate_error").removeClass("has-error");
        licenseJson += "[{" + json + "}]";
//        alert(licenseJson);
        $.get(server_base_url + "/irheum-server/PhysicianLicence", {
            phyLicenseJSON: licenseJson
        }).done(function(data) {
            if (data == success) {
                disableLicenseFields();
                displayLargeSuccessMessages("licenseSuccessMsg", successMessage + "<br /><br />");
                $("#licenseBtnTd").text("").append("<button class='btn btn-warning' onclick='updateLicense()'><b>Edit</b></button>");
            } else if (data == fail) {
                displayLargeErrorMessages("licenseSuccessMsg", failMessage + "<br /><br />");
            } else if (data == unauthorized) {
                displayLargeErrorMessages("licenseSuccessMsg", unauthorizedMessage + "<br /><br />");
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == statusException) {
                displayLargeErrorMessages("licenseSuccessMsg", statusExceptionMessage + "<br /><br />");
            }
        });
    }
}

function updateLicense() {
    $("#licenseSuccessMsg").text("");
    enableLicenseFields();
    $("#licenseBtnTd").text("").append("<button class='btn btn-primary' onclick='saveLicense()'><b>Update</b></button>");
}

function disableLicenseFields() {
    $("#u_licenceNo_u").attr('disabled', true);
    $("#u_licenseState_u").attr('disabled', true);
    $("#u_issuedDate_u").attr('disabled', true);
    $("#u_expiryDate_u").attr('disabled', true);
    $("#u_licenseStatus_u").attr('disabled', true);
}
function enableLicenseFields() {
    $("#u_licenceNo_u").attr('disabled', false);
    $("#u_licenseState_u").attr('disabled', false);
    $("#u_issuedDate_u").attr('disabled', false);
    $("#u_expiryDate_u").attr('disabled', false);
    $("#u_licenseStatus_u").attr('disabled', false);
}

function physicianLicenseKeyup(event) {
    $("#preferenceSuccessMsg").text("");
    if ($("#u_licenceNo_u").val() != "") {
//        if (/\D/g.test($("#u_licenceNo_u").val()))
//            $("#u_licenceNo_u").val($("#u_licenceNo_u").val().replace(/\D/g, ''));
        $("#u_licenseNo_error").removeClass("has-error");
        $("#u_licenseNo_msg").text("");
    }

    if ($("#u_issuedDate_u").val() != "") {
        if (validateDate($("#u_issuedDate_u").val()) != true) {
            $("#u_issuedDate_error").addClass("has-error");
            $("#u_issuedDate_msg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        if (checkFutureDate($("#u_issuedDate_u").val()) != true) {
            $("#u_issuedDate_error").addClass("has-error");
            $("#u_issuedDate_msg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        $("#u_issuedDate_error").removeClass("has-error");
        $("#u_issuedDate_msg").text("");
    }

    if ($("#u_expiryDate_u").val() != "") {
        if (validateDate($("#u_expiryDate_u").val()) != true) {
            $("#u_expiryDate_error").addClass("has-error");
            $("#u_expiryDate_msg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        $("#u_expiryDate_error").removeClass("has-error");
        $("#u_expiryDate_msg").text("");
    }

    if ($("#u_licenseStatus_u").val() != "") {
        $("#u_licenseStatus_error").removeClass("has-error");
        $("#u_licenseStatus_msg").text("");
    }

    if ($("#u_expiryDate_u").val() != "" && $("#u_issuedDate_u").val() != "") {
        if (compareDates($("#u_issuedDate_u").val(), $("#u_expiryDate_u").val()) == true) {
            $("#u_expiryDate_error").removeClass("has-error");
            $("#u_expiryDate_msg").text("");
        } else {
            $("#u_expiryDate_error").addClass("has-error");
            $("#u_expiryDate_msg").text("").append("<span class='smallErrorMsg'>Expiry date should be greater then issued date.</span>");
            return false;
        }
    }

    if ($("#u_licenceNo_u").val() != "" && $("#u_issuedDate_u").val() != "" && $("#u_expiryDate_u").val() != "" && $("#u_licenseStatus_u").val() != "") {
        $("#licenseSuccessMsg").text("");
    }

    if (event.which == 13) {
        saveLicense();
        return false;
    }
}
//------------------------------------------license end---------------