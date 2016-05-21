function loadSearchData() {
    if ($('#searchId').val() == "") {
        $("#dashboard-body").text("");
        $("#searchMsg").text("");
        getAnalytics();
    }
    if ($('#searchId').val() != "") {
        $("#searchMsg").text("").append("<img src='../images/loaders/loader10.gif' style='margin-top:15px;margin-left:8px;' />");
        $.post(server_base_url + "/irheum-server/searchpi", {
            name: $('#searchId').val(), sindex: "0", limit: "1000"
        }).done(function(pdata) {
            $("#searchMsg").text("");
            if (pdata == fail) {
                displayLargeErrorMessages("dashboard-body", "<center><span style='margin-left:10px;'>No matches found.</span></center>");
            } else if (pdata == unauthorized) {
                $('#searchId').val("");
                displayLargeErrorMessages("dashboard-body", "<center><span style='margin-left:10px;'>" + unauthorizedMessage + "</span></center>");
            } else if (pdata == invalidSession) {
                callSessionTimeout();
            } else if (pdata == statusException) {
                $('#searchId').val("");
                displayLargeErrorMessages("dashboard-body", "<center><span style='margin-left:10px;'>" + statusExceptionMessage + "</span></center>");
            } else if (pdata == null) {
                displayLargeErrorMessages("dashboard-body", "<center><span style='margin-left:10px;'>No matches found.</span></center>");
            } else {
                $("#searchMsg").text("");
                $("#dashboard-body").text("");
                if (pdata != null) {
                    if (pdata.length > 0) {
                        $("#dashboard-body").text("").append("<div id='displayPatientSearchDiv' />");
                        $("#displayPatientSearchDiv").text("").append("<div id = 'displayPatientSearchSubDiv' class = 'panel panel-primary-head' />");
                        $("#displayPatientSearchSubDiv").text("").append("<div class='panel-heading' style='height:50px;' id='displayPatientsSubDivHeading' />");

                        //heading start
                        $("#displayPatientsSubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Patients List</b><span style='font-size:13px;'><br />Please click on column header to sort.</span></h3></center>");
                        $("#displayPatientSearchSubDiv").append("<table id='displayPatientSearchTable' class='table table-striped table-bordered'>");
                        $("#displayPatientSearchTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i> Patient Name</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i> DOB</th><th style='min-width:15%;width:auto;'><i class='fa fa-mobile' style='font-size:21px;'></i> Phone</th></tr></thead>");
                        $("#displayPatientSearchTable").append("<tbody id='displayPatientSearchTableBody' />");

                        for (var i = 0; i < pdata.length; i++) {
                            $("#displayPatientSearchTableBody").append("<tr id='" + pdata[i].patientid + "' style='cursor:pointer;' onclick=displayPatientDetails('" + pdata[i].patientid + "') />");
                            var phone = "N/A";
                            if (pdata[i].phone != "") {
                                phone = pdata[i].phone;
                            }
                            $("#" + pdata[i].patientid).text("").append("<td>" + pdata[i].name + "</td><td>" + pdata[i].dob + "</td><td>" + phone + "</td>");
                        }

                        var shTable = jQuery('#displayPatientSearchTable').DataTable({
                            "fnDrawCallback": function(oSettings) {
                                jQuery('#displayPatientSearchTable ul').addClass('pagination-active-dark');
                            },
                            responsive: false
                        });

                        jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                        jQuery('div.dataTables_length select').css({width: '60px'});
                        jQuery('div.dataTables_length select').select2({
                            minimumResultsForSearch: -1
                        });
                    }
                }
            }
        }); //search servlet part end    
    }
}

function displayPatientDetails(patientId) {
    getPatientExamDemographicsData(patientId);
    editPatientButton(patientId);
}


//search bar code start
//$(function() {
//    $(".tt-dropdown-menu").text("");
//    $("#searchId").keyup(function() {
//        if ($('#searchId').val() != "") {
//            var patientData = "";
//            $("#searchMsg").text("");
//            $.post(server_base_url + "/irheum-server/searchpi", {
//                name: $('#searchId').val(), sindex: "0", limit: "1000"
//            }).done(function(pdata) {
//                if ($('#searchId').val().length > 2 && pdata == fail) {
//                    $("#searchDisplay").css("height", "76px");
//                    displayLargeErrorMessages("searchMsg", "<span style='margin-left:10px;'>No matches found.</span>");
//                } else if (pdata == unauthorized) {
//                    $("#searchDisplay").css("height", "76px");
//                    displayLargeErrorMessages("searchMsg", "<span style='margin-left:10px;'>" + unauthorizedMessage + "</span>");
//                    $('#searchId').val("");
//                } else if (pdata == invalidSession) {
//                    callSessionTimeout();
//                } else if (pdata == statusException) {
//                    $("#searchDisplay").css("height", "76px");
//                    displayLargeErrorMessages("searchMsg", "<span style='margin-left:10px;'>" + statusExceptionMessage + "</span>");
//                    $('#searchId').val("");
//                } else if ($('#searchId').val().length > 2 && pdata == null) {
//                    $("#searchDisplay").css("height", "76px");
//                    displayLargeErrorMessages("searchMsg", "<span style='margin-left:10px;'>No matches found.</span>");
//                } else {
//                    $("#searchDisplay").css("height", "66px");
//                    $("#searchMsg").text("");
//                    //alert(pdata[0].name + "\t" + pdata[0].dob + "\t" + pdata[0].phone + "\t" + pdata[0].patientid);
//                    if (pdata != null) {
//                        if (pdata.length == 1) {
//                            patientData = "[{value: '" + replaceFromSingleQuote(pdata[0].name) + "\t" + pdata[0].dob + "\t" + pdata[0].phone + "',data: '" + pdata[0].patientid + "'}]";
//                        } else if (pdata.length > 1) {
//                            patientData = "[{";
//                            for (var i = 0; i < pdata.length; i++) {
//                                patientData = patientData + "value: '" + replaceFromSingleQuote(pdata[i].name) + "\t" + pdata[i].dob + "\t" + pdata[i].phone + "',data: '" + pdata[i].patientid + "'";
//                                if (i == pdata.length - 1) {
//                                    patientData = patientData + "}]";
//                                } else {
//                                    patientData = patientData + "},{";
//                                }
//                            }//for loop end
//                        }
////                alert(patientData);
//                        patientData = eval(patientData);
//                        for (var i = 0; i < patientData.length; i++) {
//                            patientData[i].value = replaceToSingleQuote(patientData[i].value);
//                        }
//                        if (patientData != undefined) {
//                            $('#searchId').typeahead({
//                                local: patientData,
//                                limit: 100
//                            }).bind('typeahead:selected', function(e, suggestion) {
//                                $('#searchId').val("");
//                                $("#searchMsg").text("");
//                                $('#searchId').focusout();
//                                $(".tt-dropdown-menu").remove();
//                                getPatientExamDemographicsData(suggestion.data);
//                                editPatientButton(suggestion.data);
//                                $('#searchId').typeahead().off('keyup');
//                            });
//                            $('#searchId').focus();
//                        }
//                    }
//                }
//            }); //search servlet part end    
//        }
//    }); //keyup end    
//}); //main function end
//search code end

//edit button it passing 3ids getting whole patient data from service and displaying in fields
function editPatientButton(patientId) {
    $('#searchId').val("");
    $("#searchMsg").text("");
    $.post(server_base_url + "/irheum-server/patientinfo", {
        patientid: patientId
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("patientDemogDisplayTable", "<center>" + failMessage + "</center>");
            $("#patientDemogDisplayTableFooterT1").text("");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("patientDemogDisplayTable", "<center>" + unauthorizedMessage + "</center>");
            $("#patientDemogDisplayTableFooterT1").text("");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("patientDemogDisplayTable", "<center>" + statusExceptionMessage + "</center>");
            $("#patientDemogDisplayTableFooterT1").text("");
        } else {
            //display patient demographics
            $('#pdispname').text("").text(data.fname + '\t' + data.mname + '\t' + data.lname);
            $('#pdispdob').text("").text(data.dob);

            if (data.gender != "undefined") {
                $('#pdispgender').text("").text(data.gender);
            } else {
                $('#pdispgender').text("N/A");
            }

            if (data.ssn == "") {
                $('#pdispssn').text("").append("N/A");
            } else {
                $('#pdispssn').text("").append("<span title='" + data.ssn + "'>**********</span>");
            }

            if (data.address[0].email == "") {
                $('#pdispemail').text("").text("N/A");
            } else {
                $('#pdispemail').text("").text(data.address[0].email);
            }

            if (data.address[0].phone == "") {
                $('#pdisphphone').text("").text("N/A");
            } else {
                $('#pdisphphone').text("").text(data.address[0].phone);
            }

            //calling allergy
            if (getUserSessionElement("allergy") != "no") {
                if (checkUserPrivelege("Allergy") == true) {
                    getPatientAllergyData(data, patientId);
                }
            }

            //constructing edit button
            $('#editPatientBtn').click(function() {
                getPatientRegistrationForm();//it calls registration form to create
                $('#preg_ppid').val("").val(data.providerPatientId);
                $('#preg_ssn').val("").val(data.ssn);
                $('#preg_fname').val("").val(data.fname);
                $('#preg_mname').val("").val(data.mname);
                $('#preg_lname').val("").val(data.lname);

                if (data.gender == "Male") {
                    $('#pgenderM').attr('checked', true);
                    $("#labelpgender2").removeClass("active");
                    $("#labelpgender1").addClass("active");
                } else if (data.gender == "Female") {
                    $('#pgenderF').attr('checked', true);
                    $("#labelpgender1").removeClass("active");
                    $("#labelpgender2").addClass("active");
                } else {
                    $("#labelpgender1").removeClass("active");
                    $("#labelpgender2").removeClass("active");
                }

                $('#preg_race').val("").val(data.race);
                $('#preg_dob').val("").val(data.dob);
                $('#preg_address1').val("").val(data.address[0].address1);
                $('#preg_address2').val("").val(data.address[0].address2);
                $('#preg_city').val("").val(data.address[0].city);
                $('#preg_state').val("").val(data.address[0].state);
                $('#preg_country').val("").val(data.address[0].country);
                $('#preg_postcode').val("").val(data.address[0].zipcode);
                $('#preg_homephone').val("").val(data.address[0].phone);
                $('#preg_email').val("").val(data.address[0].email);
                //updating hidden fields
                $("#patientid").val("").val(data._id.$oid);
                $("#addressid").val("").val(data.address[0]._id);

                //getting data from primary insurance
                if (data.insurances != undefined && data.insurances.length > 0) {
                    if (data.insurances[0] != undefined) {
                        if (data.insurances[0].type != undefined && data.insurances[0].type == "primary") {
                            $('#preg_pinscompany').val("").val(data.insurances[0].company);
                            $('#preg_pinsmember').val("").val(data.insurances[0].member);
                            $('#preg_pinsgroup').val("").val(data.insurances[0].group);
                            $('#preg_pinsplan').val("").val(data.insurances[0].plan);
                            $('#preg_pinsdeduc').val("").val(data.insurances[0].deducible);
                            $('#preg_pinscopay').val("").val(data.insurances[0].copay);
                            //updating hidden field
                            $("#pinsuranceid").val("").val(data.insurances[0]._id);
                        }
                    }

                    //getting data from secondary insurance                
                    if (data.insurances[1] != undefined) {
                        if (data.insurances[1].type != undefined && data.insurances[1].type == "secondary") {
                            $('#preg_sinscompany').val("").val(data.insurances[1].company);
                            $('#preg_sinsmember').val("").val(data.insurances[1].member);
                            $('#preg_sinsgroup').val("").val(data.insurances[1].group);
                            $('#preg_sinsplan').val("").val(data.insurances[1].plan);
                            $('#preg_sinsdeduc').val("").val(data.insurances[1].deducible);
                            $('#preg_sinscopay').val("").val(data.insurances[1].copay);
                            //updating hidden field
                            $("#sinsuranceid").val("").val(data.insurances[1]._id);
                        }
                    }
                }

                //removing submit button displaying update button on registration form                
                $("#patientRegSubmitBtn").hide();
                $("#patientRegCancelBtn").hide();
                $("#updatePatientDetails").remove();
                $("#patRegBtnDiv").append("<button id='updatePatientDetails' class='btn btn-primary mr5'>Update</button><button style='margin-left:20px;' id='cancel1PatientDetails' class='btn btn-dark mr5'>Cancel</button>");
                updateAgainDetails();
            });
        }
    });
}//edit button it passing id getting whole data from service and displaying in fields end

//getting allergy data
function getPatientAllergyData(data, patientId) {
    $("#allergyTable").text("").append("<div><div class='panel-heading' style='height:10px;'><h3 style='margin-top:-7px;'class='panel-title'><center><b>Allergy Details</b></center></h3></div></div>");
    $("#allergyTable").append("<div class='panel-body' id='allergyPanelBodyDiv' />");
    $("#allergyPanelBodyDiv").append("<div id='allergyTableDiv' class='table-responsive' style='border:none;border-color:#FFF;' />");
    $("#allergyTableDiv").prepend("<center><span id='allergySuccessMsg1' /></center>");

    //buttons creating for add allergy and nkda
    if (data.allergies == undefined) {
        sessionStorage.setItem("ac", 0);
        $("#allergyPanelBodyDiv").prepend("<button id='addAllergyBtn' onclick=getAllergyFields('" + patientId + "') class = 'btn btn-primary' style = 'margin-right:10px;'><b>Add Allergy<b></button>");
        $("#allergyPanelBodyDiv").prepend("<button id='nkdaBtn' onclick=saveNkda('" + patientId + "') class='btn btn-default' title='No known drug allergies' style='margin-right:10px;'><b>NKDA<b></button>");
    } else {
        sessionStorage.setItem("allergyFlag", "true");
        fetchAllergyAnswers(data, patientId);
    }
}

//saving nkda start
function saveNkda(patientId) {
    var finalJson = "[{\"name\":\"NKDA\"}]";
    $.post(server_base_url + "/irheum-server/UpdateAllergy", {
        patientid: patientId, allergyData: finalJson
    }).done(function(data) {
        if (data == success) {
            editPatientButton(patientId);
            $("#nkdaBtn").remove();
            setTimeout(function() {
                displayLargeSuccessMessages("allergySuccessMsg1", "<center>" + successMessage + "</center>");
            }, 1000);
            setTimeout(function() {
                $("#allergySuccessMsg1").text("");
            }, 5000);
            var count = getUserSessionElement("ac");
            $("#allergyTableRow" + count).text("");
        } else if (data == invalidSession) {
            callSessionTimeout();
        }
    });
}//saving nkda end

//creating allergy fields start
function getAllergyFields(patientId) {
    $("#nkdaDisplayDiv").remove();
    $("#addAllergyBtn").remove();
    $("#allergySuccessMsg1").text("");
    $("#nkdaBtn").remove();
    var count = getUserSessionElement("ac");
    if (count == 0 || !($("#allergenId" + (count - 1)).val() == "" && $("#severityId" + (count - 1)).val() == "" && $("#allergyTypeId" + (count - 1)).val() == "" && $("#onSetDateId" + (count - 1)).val() == "")) {
        $("#saveAllergyBtn").remove();
        $("#allergyTableDiv").prepend("<table id='allergyMainTable' style='border:none;border-color:#FFF;' class='table table-warning' />");
        $("#allergyMainTable").append("<tbody id='allergyTableBody' />");
        $("#allergyPanelBodyDiv").prepend("<button id='saveAllergyBtn' onclick=submitAllergyAnswers('" + patientId + "') class = 'btn btn-primary' style = 'margin-top:-10px;margin-right:10px;'><b>Save<b></button><a href=javascript:editPatientButton('" + patientId + "') style = 'margin-left:10px;'><b>Cancel<b></a>");
        $("#allergyMainTable").append("<tr  style='width:100%;' id='allergyTableRow" + count + "' />");

        $("#allergyTableRow" + count).append("<td style='width:16%;' id='allergenIdError" + count + "'><div style='margin-left:-8px;' class='form-group'><input type='text' id='allergenId" + count + "' class='form-control' onkeyup=allergyKeyup('" + count + "') placeholder='Allergy name *' /><span id='allergenIdMsg" + count + "' /></div></td>");
//        $("#allergyTableRow" + count).append("<td style='width:16px;' id='allergenIdError" + count + "'><div class='form-group'><select id='allergenId" + count + "' class='width300'><option value=''>Choose one</option><option>Allergen1</option><option>Allergen2</option><option>Allergen3</option></select><span id='allergenIdMsg" + count + "' /></div></td>");
//        jQuery("#allergenId" + count).select2();

        $("#allergyTableRow" + count).append("<td style='width:16%;'><div class='form-group'><select id='severityId" + count + "' class='form-control' /></div>");
        $("#severityId" + count).append("<option value=''>Choose Severity</option><option>Mild</option><option>Moderate</option><option>Severe</option><option>Unknown</option></td>");

        $("#allergyTableRow" + count).append("<td style='width:16%;'><div class='form-group'><select id='allergyTypeId" + count + "' class='form-control' /></div>");
        $("#allergyTypeId" + count).append("<option value=''>Choose Allergy Type</option><option>Allergy to substance</option><option>Drug allergy</option><option>Drug intolerance</option><option>Food allergy</option><option>Food intolerance</option><option>Propensity to adverse reactions</option><option>Propensity to adverse reactions to drug</option><option>Propensity to adverse reactions to food</option><option>Propensity to adverse reactions to substance</option></td>");

        $("#allergyTableRow" + count).append("<td style='width:16%;' id='onSetDateIdError" + count + "'><div class='form-group'><input type='text' id='onSetDateId" + count + "' class='form-control' onchange=allergyKeyup('" + count + "') onkeyup=allergyKeyup('" + count + "') placeholder='Onset date *'><span id='onSetDateIdMsg" + count + "' /></td></div>");
        jQuery("#onSetDateId" + count).datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1950:2015',
            maxDate: new Date,
            minDate: new Date(1900, 0, 1)
        });
        jQuery("#onSetDateId" + count).mask("99/99/9999");

        $("#statusButtonTd" + count).remove();
        $("#allergyTableRow" + count).append("<td id='statusButtonTd" + count + "' style='width:3%;'><div id='statusFieldGroup" + count + "' class='btn-group' data-toggle='buttons' />");
        $("#statusFieldGroup" + count).append("<label id='statusFieldLabel" + count + "' class='btn quest btn-default active' style='text-align:left;font-weight:bold;'><input type = 'checkbox' checked='checked' onchange=getAllergyStatus(" + count + ") id='statusId" + count + "' class = 'toggle' /><span id='buttonStatus" + count + "'>Click to inactive</span></label></td>");

        $("#statusButtonTd" + count).hide();
        sessionStorage.setItem("ac", ++count);
    }

    //disable edit buttons    
    var displayTableLength = $("#allergyDisplayTable tr").length - 1;
    for (var x = 0; x < displayTableLength; x++) {
        $("#editAllergyBtn" + x).attr('disabled', true);
    }
}//creating allergy fields end

//for checkbox
function getAllergyStatus(count) {
    if ($('#statusId' + count).prop('checked') == false) {
        $("#buttonStatus" + count).text("").text("Click to active");
        $("#dateInactive" + count).remove();
        $("#allergyTableRow" + count).append("<td style='width:16%;' id='dateInactive" + count + "' />");
        $("#dateInactive" + count).text("").append("<div class='form-group'><input type='text' id='dateWhenInactiveId" + count + "' class='form-control' onchange=allergyKeyup('" + count + "') onkeyup=allergyKeyup('" + count + "') placeholder='Date when inactive'><span id='dateInactiveMsg" + count + "'></div>");
        jQuery("#dateWhenInactiveId" + count).datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1950:2015',
            maxDate: new Date,
            minDate: new Date(1900, 0, 1)
        });
        jQuery("#dateWhenInactiveId" + count).mask("99/99/9999");
    } else {
        $("#buttonStatus" + count).text("").text("Click to inactive");
        $("#dateInactive" + count).remove();
    }
}

function allergyKeyup(count) {
    if ($("#allergenId" + count).val() != "") {
        $("#allergenIdError" + count).removeClass("has-error");
        $("#allergenIdMsg" + count).text("");
    }

    if ($("#onSetDateId" + count).val() != "") {
        if (checkFutureDate($("#onSetDateId" + count).val()) != true) {
            $("#onSetDateIdError" + count).addClass("has-error");
            $("#onSetDateIdMsg" + count).text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        } else {
            $("#onSetDateIdError" + count).removeClass("has-error");
            $("#onSetDateIdMsg" + count).text("");
        }
    }

    if ($("#dateWhenInactiveId" + count).val() != "undefined" && $("#dateWhenInactiveId" + count).val() != undefined && $("#dateWhenInactiveId" + count).val() != "") {
        if (validateDate($("#dateWhenInactiveId" + count).val()) != true) {
            $("#dateInactive" + count).addClass("has-error");
            $("#dateInactiveMsg" + count).text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        if (checkFutureDate($("#dateWhenInactiveId" + count).val()) != true) {
            $("#dateInactive" + count).addClass("has-error");
            $("#dateInactiveMsg" + count).text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
            return false;
        }
        if ($("#onSetDateId" + count).val() != "" && $("#dateWhenInactiveId" + count).val() != "") {
            if (CompareDate(count, $("#onSetDateId" + count).val(), $("#dateWhenInactiveId" + count).val()) != true) {
                return false;
            }
        }
        $("#dateInactive" + count).removeClass("has-error");
        $("#dateInactiveMsg" + count).text("");
    }
}

//get answers
function fetchAllergyAnswers(data, patientId) {
    $("#addAllergyBtn").remove();
    $("#saveAllergyBtn").remove();
    $("#allergyPanelBodyDiv").prepend("<button id='addAllergyBtn' onclick=getAllergyFields('" + patientId + "') class = 'btn btn-primary' style = 'margin-top:-10px;margin-right:10px;'><b>Add Allergy<b></button>");
    $("#allergyTableDiv").append("<div id='allergyDisplayTableDiv' style='margin-top:10px;' class='table-responsive' />");
    $("#allergyDisplayTableDiv").text("").append("<table id='allergyDisplayTable' class='table table-success' />");
    $("#allergyDisplayTable").append("<thead id='allergyDispHeader' />");
    $.each(data.allergies, function(index, value) {
        if (value.name == "NKDA") {
            $("#allergyPanelBodyDiv").prepend("<div id='nkdaDisplayDiv'><span style='color:#428bca;font-size:18px;'>No known drug allergies.</span><br /><br /></div>");
            $("#allergyTableDiv").text("");
        } else {
            $("#nkdaDisplayDiv").remove();
            $("#allergyDispHeader").text("").append("<tr id='allergyDisplayTableHeadRow'><th>Allergen</th><th>Severity</th><th>Allergy Type</th><th>On set date</th><th>Status</th><th id='inactiveDateHead'>Inactivated date</th></tr>");
            $("#allergyDisplayTable").append("<tr id='allergyDisplayTableRow" + index + "' />");
            $("#allergyDisplayTableRow" + index).append("<td><label id='nameLabel" + index + "'>" + value.name + "</label></td>");
            if (value.severity == "") {
                $("#allergyDisplayTableRow" + index).append("<td><label id='severityLabel" + index + "'>N/A</label></td>");
            } else {
                $("#allergyDisplayTableRow" + index).append("<td><label id='severityLabel" + index + "'>" + value.severity + "</label></td>");
            }
            if (value.reactionType == "") {
                $("#allergyDisplayTableRow" + index).append("<td><label id='reactionTypeLabel" + index + "'>N/A</label></td>");
            } else {
                $("#allergyDisplayTableRow" + index).append("<td><label id='reactionTypeLabel" + index + "'>" + value.reactionType + "</label></td>");
            }
            $("#allergyDisplayTableRow" + index).append("<td><label id='onsetDateLabel" + index + "'>" + value.onsetDate + "</label></td>");
            $("#allergyDisplayTableRow" + index).append("<td><label style='text-transform:capitalize;' id='statusLabel" + index + "'>" + value.status + "</label></td>");
            if (value.status == "inactive") {
//                $("#inactiveDateHead").text("").append("Inactivated date");
                $("#allergyDisplayTableRow" + index).append("<td id='whenInactiveTd" + index + "'>&nbsp;</td>");
                if (value.inactiveDate == "") {
                    $("#whenInactiveTd" + index).text("").append("<label id='inactiveDateLabel" + index + "'>N/A</label>");
                } else {
                    $("#whenInactiveTd" + index).text("").append("<label id='inactiveDateLabel" + index + "'>" + value.inactiveDate + "</label>");
                }
            }
            if (value.status == "active") {
                $("#whenActiveTh").remove();
                $("#whenActiveTd").remove();
                $("#whenInactiveTd" + index).remove();
                $("#allergyDisplayTableRow" + index).append("<td id='whenInactiveTd" + index + "'>&nbsp;</td>");
                $("#whenInactiveTd" + index).text("").append("<label id='inactiveDateLabel" + index + "'>N/A</label>");
            }
            if (value.status != "inactive" && value.status != "active") {
                $("#whenActiveTh").remove();
                $("#whenActiveTd").remove();
                $("#whenInactiveTd" + index).remove();
                $("#allergyDisplayTableRow" + index).append("<td id='whenInactiveTd" + index + "'>&nbsp;</td>");
                $("#whenInactiveTd" + index).text("").append("<label id='inactiveDateLabel" + index + "'>N/A</label>");
            }

            $("#editAllergyBtn" + index).remove();
            $("#whenEditTh").remove();
            $("#allergyDisplayTableHeadRow").append("<th id='whenEditTh'>Option</th>");
            $("#allergyDisplayTableRow" + index).append("<td id='whenEditTd" + index + "'>&nbsp;</td>");
            $("#whenEditTd" + index).append("<button id='editAllergyBtn" + index + "' onclick=editAllergyAnswers('" + index + "','" + value.name.replace(/\s/g, '^') + "','" + value.severity.replace(/\s/g, '^') + "','" + value.reactionType.replace(/\s/g, '^') + "','" + value.onsetDate.replace(/\s/g, '^') + "','" + value.status.replace(/\s/g, '^') + "','" + value.inactiveDate + "','" + patientId + "') class = 'btn btn-primary' style = 'margin-right:10px;'><b>Edit<b></button>");
            sessionStorage.setItem("ac", ++index);
        }
    });
}


function editAllergyAnswers(i, name, severity, reactionType, onsetDate, status, inactiveDate, patientId) {
//    alert(i + "\t" + name.replace(new RegExp("\\^", "g"), ' ') + "\t" + severity + "\t" + reactionType.replace(new RegExp("\\^", "g"), ' ') + "\t" + onsetDate + "\t" + status + "\t" + inactiveDate);
    sessionStorage.setItem("ac", i);
    $("#allergyDisplayTableDiv").append("<input type='hidden' id='deletedAllergyRow' value='" + i + "'>");
    $("#editAllergyBtn" + i).remove();

    getAllergyFields(patientId);
    $("#statusButtonTd" + i).show();
    $("#saveAllergyBtn").remove();
    $("#addAllergyBtn").hide();
    $("#updateAllergyBtn").remove();
    $("#allergyPanelBodyDiv").prepend("<button id='updateAllergyBtn' onclick=submitAllergyAnswers('" + patientId + "') class = 'btn btn-primary' style = 'margin-top:-10px;margin-right:10px;'><b>Update<b></button>");
    $("#allergyDisplayTableRow" + i).text("");
    var displayTableLength = $("#allergyDisplayTable tr").length - 1;
    for (var x = 0; x < displayTableLength; x++) {
        if (x != i) {
            $("#editAllergyBtn" + x).attr('disabled', true);
        }
    }

    if (name.replace(new RegExp("\\^", "g"), ' ') == noDataAvailable) {
        $("#allergenId" + i).val("");
    } else if (name.replace(new RegExp("\\^", "g"), ' ') != undefined) {
//        $("#allergenId" + i).select2('val', name.replace(new RegExp("\\^", "g"), ' '));
        $("#allergenId" + i).val(name.replace(new RegExp("\\^", "g"), ' '));
    }

    if (severity.replace(new RegExp("\\^", "g"), ' ') == noDataAvailable) {
        $("#severityId" + i).val("");
    } else if (severity != undefined) {
        $("#severityId" + i).val(severity.replace(new RegExp("\\^", "g"), ' '));
    }

    if (reactionType.replace(new RegExp("\\^", "g"), ' ') == noDataAvailable) {
        $("#allergyTypeId" + i).val("");
    } else if (reactionType.replace(new RegExp("\\^", "g"), ' ') != undefined) {
        $("#allergyTypeId" + i).val(reactionType.replace(new RegExp("\\^", "g"), ' '));
    }

    if (onsetDate.replace(new RegExp("\\^", "g"), ' ') == noDataAvailable) {
        $("#onSetDateId" + i).val("");
    } else if (onsetDate != undefined) {
        $("#onSetDateId" + i).val(onsetDate.replace(new RegExp("\\^", "g"), ' '));
    }

    if (status != undefined) {
        $("#dateWhenInactiveId" + i).val(status.replace(new RegExp("\\^", "g"), ' '));
        $("#statusButtonTd" + i).remove();
        $("#allergyTableRow" + i).append("<td id='statusButtonTd" + i + "' style='width:3%;'><div id='statusFieldGroup" + i + "' class='btn-group' data-toggle='buttons' />");
        $("#statusFieldGroup" + i).text("").append("<label id='statusFieldLabel" + i + "' class='btn quest btn-default active' style='text-align:left;font-weight:bold;'><input type = 'checkbox' onchange=getAllergyStatus(" + i + ") id='statusId" + i + "' class = 'toggle' /><span id='buttonStatus" + i + "'>Click to inactive</span></label></td>");
    }
    if (status == "inactive") {
        $('#statusId' + i).prop('checked', false);
        $("#statusFieldLabel" + i).removeClass("active");
        getAllergyStatus(i);
        $("#buttonStatus" + i).text("").text("Click to active");
        if (inactiveDate != undefined) {
            $("#dateWhenInactiveId" + i).val("").val(inactiveDate.replace(new RegExp("\\^", "g"), ' '));
        }
    } else {
        $('#statusId' + i).prop('checked', true);
        $("#statusFieldLabel" + i).addClass("active");
        getAllergyStatus(i);
        $("#buttonStatus" + i).text("").text("Click to inactive");
    }
}


//submit allergy answers 
function submitAllergyAnswers(patientId) {
    var count = getUserSessionElement("ac") - 1;
    var finalJson = "";
    var status = "";
//////////////////////////json start
    if ($('#statusId' + count).prop('checked') == true) {
        status = "active";
    } else if ($('#statusId' + count).prop('checked') == false) {
        status = "inactive";
    }

    var json = "";
    var nameField = "";
    var severityField = "";
    var reactionTypeField = "";
    var onsetDateField = "";
    var statusField = status;
    var inactiveDateField = "";
    if ($("#allergenId" + count).val() != undefined) {
        nameField = $("#allergenId" + count).val();
    }
    if ($("#severityId" + count).val() != undefined) {
        severityField = $("#severityId" + count).val();
    }
    if ($("#allergyTypeId" + count).val() != undefined) {
        reactionTypeField = $("#allergyTypeId" + count).val();
    }
    if ($("#onSetDateId" + count).val() != undefined) {
        onsetDateField = $("#onSetDateId" + count).val();
    }
    if ($("#dateWhenInactiveId" + count).val() != undefined) {
        inactiveDateField = $("#dateWhenInactiveId" + count).val();
    }
//    alert(nameField + "\t" + severityField + "\t" + reactionTypeField + "\t" + onsetDateField + "\t" + statusField);
//    alert($("#onSetDateId" + count).val() + "\t" + $("#dateWhenInactiveId" + count).val());

    if ($("#allergenId" + count).val() == "") {
        $("#allergenIdError" + count).addClass("has-error");
        $("#allergenIdMsg" + count).text("").append("<span class='smallErrorMsg'>Please select allergy.</span>");
        return false;
    } else {
        $("#allergenIdError" + count).removeClass("has-error");
        $("#allergenIdMsg" + count).text("");
    }

    if (onsetDateField == "") {
        $("#onSetDateIdError" + count).addClass("has-error");
        $("#onSetDateIdMsg" + count).text("").append("<span class='smallErrorMsg'>Please enter date.</span>");
        return false;
    } else {
        $("#onSetDateIdError" + count).removeClass("has-error");
        $("#onSetDateIdMsg" + count).text("");
    }

    if (checkFutureDate(onsetDateField) != true) {
        $("#onSetDateIdError" + count).addClass("has-error");
        $("#onSetDateIdMsg" + count).text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
        return false;
    } else {
        $("#onSetDateIdError" + count).removeClass("has-error");
        $("#onSetDateIdMsg" + count).text("");
    }

    if (statusField == "inactive" && inactiveDateField == "") {
        $("#dateInactive" + count).addClass("has-error");
        $("#dateInactiveMsg" + count).text("").append("<span class='smallErrorMsg'>Please enter inactive date.</span>");
        return false;
    } else {
        $("#dateInactive" + count).removeClass("has-error");
        $("#dateInactiveMsg" + count).text("");
    }

    if (nameField != undefined || nameField != "") {
        json = json + "\"name\":\"" + nameField + "\",";
    }
    if (severityField != undefined || severityField != "") {
        json = json + "\"severity\":\"" + severityField + "\",";
    }
    if (reactionTypeField != undefined || reactionTypeField != "") {
        json = json + "\"reactionType\":\"" + reactionTypeField + "\",";
    }
    if (onsetDateField != undefined || onsetDateField != "") {
        json = json + "\"onsetDate\":\"" + onsetDateField + "\",";
    }
    if (statusField != undefined || statusField != "") {
        json = json + "\"status\":\"" + statusField + "\",";
    }
    if (statusField == "inactive") {
        if (inactiveDateField != undefined && inactiveDateField != "") {
            if (validateDate(inactiveDateField) != true) {
                $("#dateInactive" + count).addClass("has-error");
                $("#dateInactiveMsg" + count).text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
                return false;
            } else {
                if (onsetDateField != "" && inactiveDateField != "") {
                    if (CompareDate(count, onsetDateField, inactiveDateField) != true) {
                        return false;
                    }
                } else {
                    $("#dateInactive" + count).removeClass("has-error");
                    $("#dateInactiveMsg" + count).text("");
                }
            }
            json = json + "\"inactiveDate\":\"" + inactiveDateField + "\",";
        } else {
            json = json + "\"inactiveDate\":\"" + inactiveDateField + "\",";
        }
    }
    if (json !== "") {
        json = "{" + json.substring(0, json.length - 1) + "}";
        finalJson += json + ",";
    }
//////////////////////////json end

    var displayTableLength = $("#allergyDisplayTable tr").length - 1;

    for (var i = 0; i < displayTableLength; i++) {
        var dontRead = $("#deletedAllergyRow").val();
        if (i == dontRead) {
            continue;
        } else {
            $("#dateInactiveMsg" + i).text("");
            $("#dateInactive" + i).removeClass("has-error");
            $("#allergySuccessMsg").text("");
            if ($("#allergenId" + i).val() == "" && $("#severityId" + i).val() == "" && $("#allergyTypeId" + i).val() == "" && $("#onSetDateId" + i).val() == "") {
                continue;
            }
            if ($('#statusId' + i).prop('checked') == true) {
                status = "active";
            } else if ($('#statusId' + i).prop('checked') == false) {
                status = "inactive";
            }


//////////////////////////json1 start
            if (displayTableLength >= 1) {
                var json1 = "";
                var nameLabel = $("#nameLabel" + i).text();
                var severityLabel = $("#severityLabel" + i).text();
                var reactionTypeLabel = $("#reactionTypeLabel" + i).text();
                var onsetDateLabel = $("#onsetDateLabel" + i).text();
                var statusLabel = $("#statusLabel" + i).text();
                var inactiveDateLabel = $("#inactiveDateLabel" + i).text();
//        alert(nameLabel + "\t" + severityLabel + "\t" + reactionTypeLabel + "\t" + onsetDateLabel+"\t"+statusLabel);

                if (nameLabel != undefined || nameLabel != "") {
                    json1 = json1 + "\"name\":\"" + nameLabel + "\",";
                }
                if (severityLabel != undefined || severityLabel != "") {
                    json1 = json1 + "\"severity\":\"" + severityLabel + "\",";
                }
                if (reactionTypeLabel != undefined || reactionTypeLabel != "") {
                    json1 = json1 + "\"reactionType\":\"" + reactionTypeLabel + "\",";
                }
                if (onsetDateLabel != undefined || onsetDateLabel != "") {
                    json1 = json1 + "\"onsetDate\":\"" + onsetDateLabel + "\",";
                }
                if (statusLabel != undefined || statusLabel != "") {
                    json1 = json1 + "\"status\":\"" + statusLabel + "\",";
                }
                if (statusLabel == "inactive") {
                    if (inactiveDateLabel != undefined || inactiveDateLabel != "") {
                        json1 = json1 + "\"inactiveDate\":\"" + inactiveDateLabel + "\",";
                    }
                }
                if (json1 !== "") {
                    json1 = "{" + json1.substring(0, json1.length - 1) + "}";
                    finalJson += json1 + ",";
                }
            }
//////////////////////////json1 end
        }
    }//for end

    finalJson = "[" + finalJson.substring(0, finalJson.length - 1) + "]";
//    alert(finalJson);
    $.post(server_base_url + "/irheum-server/UpdateAllergy", {
        patientid: patientId, allergyData: finalJson
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("allergySuccessMsg1", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("allergySuccessMsg1", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("allergySuccessMsg1", "<center>" + statusExceptionMessage + "</center>");
        } else if (data == success) {
            editPatientButton(patientId);
            $("#updateAllergyBtn").remove();
            $("#saveAllergyBtn").remove();
            setTimeout(function() {
                displayLargeSuccessMessages("allergySuccessMsg1", "<center>" + successMessage + "</center>");
            }, 1000);
            setTimeout(function() {
                $("#allergySuccessMsg1").text("");
            }, 5000);
        }
    }); //servlet end
    sessionStorage.removeItem("allergyFlag");
}

function CompareDate(i, dateOne, dateTwo) {
    if (compareDates(dateOne, dateTwo) != true) {
        $("#dateInactive" + i).addClass("has-error");
        $("#dateInactiveMsg" + i).text("").append("<span class='smallErrorMsg'>Date should exceed the Onset date.</span>");
        return false;
    }
    return true;
}