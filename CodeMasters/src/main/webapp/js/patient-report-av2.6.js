var rxFlag = "false";

//display report
function getReportDisplay(divId, encId, patientId, encNo) {
//    alert(divId + "\t" + encId + "\t" + patientId + "\t" + encNo);    
    $('html,body').scrollTop(0);
    $("#" + divId).append("<center><br /><br /><br /><br /><img src='../images/loaders/loader10.gif'><br /><h3>Please wait while loading the report...</h3><br></center>");
    $.post(server_base_url + "/irheum-server/FetchReport", {encounterid: encId}).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages(divId, "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages(divId, "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages(divId, "<center>" + statusExceptionMessage + "</center>");
        } else {
//report display div    
            $("#" + divId).text("").append("<br /><div style='width:63%;float:left;'><div id='reportDisplayDiv" + divId + "' class='panel panel-primary' /></div>");
            $("#reportDisplayDiv" + divId).append("<div class='panel-heading' style='height:14px;'><center><h3 class='pt-label' style='margin-top:-6px;font-size:14px;'><b>Patient Report</b></h3></center></div>");
            $("#reportDisplayDiv" + divId).append("<div class='panel-body' id='reportDisplayBody" + divId + "' />");
//    $("#reportDisplayBody" + divId).text("").append("<object type='application/pdf' data='/irheum-server/FetchReport?encounterid=" + encId + "' style='text-align:center;width:100%;height:100%;'></object>");
            $("#reportDisplayBody" + divId).text("").append("<iframe id='iframe" + divId + "' src='/irheum-server/FetchReport?encounterid=" + encId + "' height='100%' width='100%'></iframe>");

//checking role to display options
            if (checkUserRole("Provider") == true) {
//options div
                $("#" + divId).append("<div style='width:35%;float:right;'><div class='panel-group' id='reportaccordion2" + divId + "' /></div>");
                $("#reportaccordion2" + divId).append("<div id='reportSubDiv" + divId + "' class='panel panel-primary' />");
                $("#reportSubDiv" + divId).append("<div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#reportaccordion2" + divId + "' href='#reportcollapseOne2" + divId + "'><center>Summary & Rx Options</center></a></h4></div>");
                $("#reportSubDiv" + divId).append("<div id='reportcollapseOne2" + divId + "' class='panel-collapse collapse in'><div class='panel-body' id='reportOptionsBody" + divId + "'><div class='btn-group'><table id='reportOptionsTable" + divId + "' /></div></div></div>");

                $("#reportOptionsTable" + divId).text("").append("<tr id='reportOptionsLabelsTr" + divId + "' />");
                $("#reportOptionsLabelsTr" + divId).text("").append("<td>&nbsp;</td>");
                $("#reportOptionsLabelsTr" + divId).append("<td><label class='reportOptions' style='font-weight:bold;font-size:16px;margin-left:30%;'>Patient Summary</label></td>");
                $("#reportOptionsLabelsTr" + divId).append("<td><label id='displayReceptLabel" + divId + "' class='reportOptions' style='font-weight:bold;font-size:16px;margin-left:30%;'>Recept Rx Prescription</label></td>");

//save
                $("#reportOptionsTable" + divId).append("<tr id='reportOptionsSaveTr" + divId + "' />");
                $("#reportOptionsSaveTr" + divId).text("").append("<td><label style='font-weight:bold;font-size:16px;'>Save in iRheum</label></td>");
                $("#reportOptionsSaveTr" + divId).append("<td><label id='savePatientLabel" + divId + "' class='btn reportOptions quest btn-default active glyphicon glyphicon-ok' disabled='disabled' style='margin-left:30%;'><input type='checkbox' id='savePatientId" + divId + "' checked='checked' style='display:none' onclick=reportOptionsClick('savePatientLabel" + divId + "','savePatientId" + divId + "') /></label></td>");
                $("#reportOptionsSaveTr" + divId).append("<td><label id='saveReceptLabel" + divId + "' class='btn reportOptions quest btn-default active glyphicon glyphicon-ok' disabled='disabled' style='margin-left:30%;'><input type='checkbox' id='saveReceptId" + divId + "' checked='checked' style='display:none' onclick=reportOptionsClick('saveReceptLabel" + divId + "','saveReceptId" + divId + "') /></label></td>");

//print
                $("#reportOptionsTable" + divId).append("<tr id='reportOptionsPrintTr" + divId + "' />");
                $("#reportOptionsPrintTr" + divId).text("").append("<td><label style='font-weight:bold;font-size:16px;'>Print</label></td>");
                $("#reportOptionsPrintTr" + divId).append("<td><label id='printPatientLabel" + divId + "' class='btn reportOptions quest btn-default' style='margin-left:30%;'><input type='checkbox' id='printPatientId" + divId + "' style='display:none' onclick=reportOptionsClick('printPatientLabel" + divId + "','printPatientId" + divId + "') /></label></td>");
                $("#reportOptionsPrintTr" + divId).append("<td><label id='printReceptLabel" + divId + "' class='btn reportOptions quest btn-default' style='margin-left:30%;'><input type='checkbox' id='printReceptId" + divId + "' style='display:none' onclick=reportOptionsClick('printReceptLabel" + divId + "','printReceptId" + divId + "') /></label></td>");

//email
                $("#reportOptionsTable" + divId).append("<tr id='reportOptionsEmailTr" + divId + "' />");
                $("#reportOptionsEmailTr" + divId).text("").append("<td><label style='font-weight:bold;font-size:16px;'>Email to Me</label></td>");
                $("#reportOptionsEmailTr" + divId).append("<td><label id='emailPatientLabel" + divId + "' class='btn reportOptions quest btn-default' style='margin-left:30%;'><input type='checkbox' id='emailPatientId" + divId + "' style='display:none' onclick=reportOptionsClick('emailPatientLabel" + divId + "','emailPatientId" + divId + "') /></label></td>");
                $("#reportOptionsEmailTr" + divId).append("<td><label id='emailReceptLabel" + divId + "' class='btn reportOptions quest btn-default' style='margin-left:30%;'><input type='checkbox' id='emailReceptId" + divId + "' style='display:none' onclick=reportOptionsClick('emailReceptLabel" + divId + "','emailReceptId" + divId + "') /></label></td>");

//fax
                $("#reportOptionsTable" + divId).append("<tr id='reportOptionsFaxTr" + divId + "' />");
                $("#reportOptionsFaxTr" + divId).text("").append("<td><label style='font-weight:bold;font-size:16px;'>Fax to Me</label></td>");
                $("#reportOptionsFaxTr" + divId).append("<td><label id='faxPatientLabel" + divId + "' class='btn reportOptions quest btn-default' style='margin-left:30%;'><input type='checkbox' id='faxPatientId" + divId + "' style='display:none' onclick=reportOptionsClick('faxPatientLabel" + divId + "','faxPatientId" + divId + "') /></label></td>");
                $("#reportOptionsFaxTr" + divId).append("<td><label id='faxReceptLabel" + divId + "' class='btn reportOptions quest btn-default' style='margin-left:30%;'><input type='checkbox' id='faxReceptId" + divId + "' style='display:none' onclick=reportOptionsClick('faxReceptLabel" + divId + "','faxReceptId" + divId + "') /></label></td>");

//button
                $("#" + divId).append("<center><button id='normalReceptButton' style='width:35%;float:right;' class='btn btn-primary' onclick=submitReportOptions('" + encId + "','" + divId + "','" + patientId + "','" + encNo + "')><b>Save &amp; Continue</b></button></center>");

                if (divId == "completeExamDiv") {
                    $.get(server_base_url + "/irheum-server/ResumeExamination", {
                        patientid: patientId, encno: encNo
                    }).done(function(data) {
                        if (data == invalidSession) {
                            callSessionTimeout();
                        } else {
                            if (data.medications != undefined) {
                                rxFlag = "true";
//send to pharma
                                $("#reportOptionsTable" + divId).append("<tr id='reportOptionsSendToPharmaTr" + divId + "' />");
                                $("#reportOptionsSendToPharmaTr" + divId).text("").append("<td><label style='font-weight:bold;font-size:16px;'>Send To Pharma</label></td>");
                                $("#reportOptionsSendToPharmaTr" + divId).append("<td><label id='sendToPharmaPatientLabel" + divId + "' class='btn reportOptions quest btn-default' style='margin-left:30%;'><input type='checkbox' id='sendToPharmaPatientId" + divId + "' style='display:none' onclick=reportOptionsClick('sendToPharmaPatientLabel" + divId + "','sendToPharmaPatientId" + divId + "') /></label></td>");
                                $("#reportOptionsSendToPharmaTr" + divId).append("<td><label id='sendToPharmaReceptLabel" + divId + "' class='btn reportOptions quest btn-default' style='margin-left:30%;'><input type='checkbox' id='sendToPharmaReceptId" + divId + "' style='display:none' onclick=reportOptionsClick('sendToPharmaReceptLabel" + divId + "','sendToPharmaReceptId" + divId + "') /></label></td>");

//remember
//$("#reportOptionsBody" + divId).append("<label id='rememberTheseChoicesReceptLabel" + divId + "' class='btn quest btn-default' style='width:100%;font-weight:600;'><input type='checkbox' name='rememberChoices' id='rememberTheseChoicesReceptId" + divId + "' style='display:none' onclick=reportOptionsClick1('" + divId + "') />Remember these choices</label>");

//rx table start

                                $("#" + divId).append("<div style='width:35%;float:right;'><div class='panel-group' id='reportaccordion3" + divId + "' /></div>");
                                $("#reportaccordion3" + divId).append("<div id='reportSubDivRx" + divId + "' class='panel panel-primary' />");
                                $("#reportSubDivRx" + divId).append("<div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#reportaccordion3" + divId + "' href='#reportcollapseOne3" + divId + "'><center>Rx Delivery Options</center></a></h4></div>");
                                $("#reportSubDivRx" + divId).append("<div id='reportcollapseOne3" + divId + "' class='panel-collapse collapse in'><div class='panel-body' id='reportOptionsRxBody" + divId + "'><div class='btn-group'><table id='reportOptionsRxTable" + divId + "' /></div></div></div>");

                                $("#reportOptionsRxTable" + divId).append("<tr id='reportOptionsShipTr" + divId + "' />");
                                $("#reportOptionsShipTr" + divId).text("").append("<td><label style='font-weight:bold;font-size:16px;'>Ship Rx To</label></td>");
                                $("#reportOptionsShipTr" + divId).append("<td><label id='shipPatientLabel" + divId + "' class='btn quest btn-default' style='margin-left:30%;'><input type='radio' id='shipPatientId" + divId + "' style='display:none' name='shipTo' onclick=reportOptionsClick1('" + divId + "') value='Patient' /><b>Patient</b></label></td>");

                                $("#reportOptionsRxTable" + divId).append("<tr id='reportOptionsShipTr1" + divId + "' />");
                                $("#reportOptionsShipTr1" + divId).append("<td>&nbsp;</td>");
                                $("#reportOptionsShipTr1" + divId).append("<td><label id='shipPhysicianLabel" + divId + "' class='btn quest btn-default' style='margin-left:30%;'><input type='radio' id='shipPhysicianId" + divId + "' style='display:none' name='shipTo' onclick=reportOptionsClick1('" + divId + "') value='Physician' /><b>Physician</b></label></td>");

                                $("#reportOptionsRxBody" + divId).append("<br /><table><tr id='dateNeededTr" + divId + "'/></table>");
                                $("#dateNeededTr" + divId).append("<td><label style='font-weight:bold;font-size:16px;float:left;'>Date Needed</label></td>");
                                $("#dateNeededTr" + divId).append("<td><input type='text' style='text-align:left;float:left;margin-left:9%;' id='dateNeededId" + divId + "' class='form-control' placeholder='MM/DD/YYYY' size=10 maxlength=10 onchange=reportOptionsClick1('" + divId + "') /><span id='dataNeededMsg' /></td>");
                                jQuery("#dateNeededId" + divId).mask("99/99/9999");
                                jQuery("#dateNeededId" + divId).datepicker({
                                    changeMonth: true,
                                    changeYear: true,
                                    yearRange: datePickerRange,
                                    minDate: new Date
                                });
//rx table end
                            }

                            $("#normalReceptButton").remove();
                            $("#" + divId).append("<center><button id='saveAndSendExamButton' style='width:35%;float:right;' class='btn btn-primary' onclick=submitReportOptions('" + encId + "','" + divId + "','" + patientId + "','" + encNo + "')><b>Save &amp; Send</b></button></center>");
                            $("#" + divId).append("<center><button id='cancelExamButton' style='width:35%;float:right;margin-top:1%;' class='btn btn-warning' onclick='showJointCount()'><b>Cancel &amp; return to patient dashboard</b></button></center>");
                            $("#" + divId).append("<center><button id='selectPatientButton' style='width:35%;float:right;margin-top:1%;' class='btn btn-success' onclick='callDashboard()'><b>Return to select patient</b></button></center>");

                            $("#" + divId).append("<center><label style='width:35%;text-align:left;float:right;margin-left:2%;font-weight:600;margin-top:1%;'>After reviewing the patient evaluation summary and prescription form at left, please choose how you would like to deliver these documents (note: your patient evaluations are always saved in iRheum for future reference)</label></center>");
                        }
                    });
                }

//hiding all recept options when medication is not there for UNMC
                if (getUserSessionElement("medication") == "no") {
                    $("#displayReceptLabel" + divId).hide();
                    $("#saveReceptLabel" + divId).hide();
                    $("#printReceptLabel" + divId).hide();
                    $("#emailReceptLabel" + divId).hide();
                    $("#faxReceptLabel" + divId).hide();
                }

// getting already selected deliveryPrefs
                $.get(server_base_url + "/irheum-server/PhysicianPreference", {
                }).done(function(data) {
                    if (data == fail || data == statusException || data == unauthorized) {
                        location.href = "dashboard.jsp";
                    } else if (data == invalidSession) {
                        callSessionTimeout();
                    } else {
                        if (data != undefined) {
                            $.each(data, function(index, value) {
//            alert(index + "\t" + value);
                                if (index == "deliveryPrefs") {
                                    var data = value;
                                    if (data != undefined) {
                                        $.each(data, function(i, v) {
                                            if (v != undefined) {
                                                if (v.reportType == "PatientSummary") {
                                                    if (v.print == "yes") {
                                                        $("#printPatientLabel" + divId).addClass("active glyphicon glyphicon-ok");
                                                        $("#printPatientId" + divId).prop("checked", true);
                                                    }
                                                    if (v.emailMe == "yes") {
                                                        $("#emailPatientLabel" + divId).addClass("active glyphicon glyphicon-ok");
                                                        $("#emailPatientId" + divId).prop("checked", true);
                                                    }
                                                    if (v.faxMe == "yes") {
                                                        $("#faxPatientLabel" + divId).addClass("active glyphicon glyphicon-ok");
                                                        $("#faxPatientId" + divId).prop("checked", true);
                                                    }
                                                    if (divId == "completeExamDiv") {
                                                        if (rxFlag == "true") {
                                                            if (v.sendToPharma == "yes") {
                                                                $("#sendToPharmaPatientLabel" + divId).addClass("active glyphicon glyphicon-ok");
                                                                $("#sendToPharmaPatientId" + divId).prop("checked", true);
                                                            }
                                                        } else {
                                                        }
                                                    }
                                                }
                                                if (v.reportType == "Prescription") {
                                                    if (v.print == "yes") {
                                                        $("#printReceptLabel" + divId).addClass("active glyphicon glyphicon-ok");
                                                        $("#printReceptId" + divId).prop("checked", true);
                                                    }
                                                    if (v.emailMe == "yes") {
                                                        $("#emailReceptLabel" + divId).addClass("active glyphicon glyphicon-ok");
                                                        $("#emailReceptId" + divId).prop("checked", true);
                                                    }
                                                    if (v.faxMe == "yes") {
                                                        $("#faxReceptLabel" + divId).addClass("active glyphicon glyphicon-ok");
                                                        $("#faxReceptId" + divId).prop("checked", true);
                                                    }
                                                    if (divId == "completeExamDiv") {
                                                        if (rxFlag == "true") {
                                                            if (v.sendToPharma == "yes") {
                                                                $("#sendToPharmaReceptLabel" + divId).addClass("active glyphicon glyphicon-ok");
                                                                $("#sendToPharmaReceptId" + divId).prop("checked", true);
                                                            }
                                                        } else {
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}

function reportOptionsClick(labelId, buttonId) {
    if ($("#" + buttonId).prop("checked") == true) {
        $("#" + labelId).addClass("active glyphicon glyphicon-ok");
    } else {
        $("#" + labelId).removeClass("active glyphicon glyphicon-ok");
    }
}

function reportOptionsClick1(divId) {
    if ($('input[name=shipTo]:checked').val() == "Patient") {
        $("#shipPatientLabel" + divId).addClass("active");
        $("#shipPhysicianId" + divId).prop("checked", false);
        $("#shipPhysicianLabel" + divId).removeClass("active");
        $("#dataNeededMsg").text("");
    } else if ($('input[name=shipTo]:checked').val() == "Physician") {
        $("#shipPhysicianLabel" + divId).addClass("active");
        $("#shipPatientId" + divId).prop("checked", false);
        $("#shipPatientLabel" + divId).removeClass("active");
        $("#dataNeededMsg").text("");
    }
    if ($("#dateNeededId" + divId).val() != "") {
        $("#dataNeededMsg").text("");
    }

//    if ($('input[name=rememberChoices]').prop('checked') == true) {
//        $("#rememberTheseChoicesReceptLabel" + divId).addClass("active");
//    } else {
//        $("#rememberTheseChoicesReceptLabel" + divId).removeClass("active");
//    }
}

function submitReportOptions(encId, divId, patientId, encNo) {
    var reportOptions = "";
    var patientOptions = "";
    var receptOptions = "";
    var medShipTo = "";
    var medDateNeeded = "";
//patient json
    if ($("#savePatientId" + divId).prop("checked") == true) {
        patientOptions = patientOptions + "\"save\":\"yes\",";
    } else {
        patientOptions = patientOptions + "\"save\":\"no\",";
    }

    if ($("#printPatientId" + divId).prop("checked") == true) {
        patientOptions = patientOptions + "\"print\":\"yes\",";
    } else {
        patientOptions = patientOptions + "\"print\":\"no\",";
    }

    if ($("#emailPatientId" + divId).prop("checked") == true) {
        patientOptions = patientOptions + "\"emailMe\":\"yes\",";
    } else {
        patientOptions = patientOptions + "\"emailMe\":\"no\",";
    }

    if ($("#faxPatientId" + divId).prop("checked") == true) {
        patientOptions = patientOptions + "\"faxMe\":\"yes\",";
    } else {
        patientOptions = patientOptions + "\"faxMe\":\"no\",";
    }

    if (divId == "completeExamDiv") {
        if (rxFlag == "true") {
            if ($("#sendToPharmaPatientId" + divId).prop("checked") == true) {
                patientOptions = patientOptions + "\"sendToPharma\":\"yes\",";
            } else {
                patientOptions = patientOptions + "\"sendToPharma\":\"no\",";
            }
        } else {
            patientOptions = patientOptions + "\"sendToPharma\":\"no\",";
        }
    } else {
        patientOptions = patientOptions + "\"sendToPharma\":\"no\",";
    }

    patientOptions = patientOptions + "\"reportType\":\"PatientSummary\"";
    patientOptions = "{" + patientOptions + "}";

//recept json
    if ($("#saveReceptId" + divId).prop("checked") == true) {
        receptOptions = receptOptions + "\"save\":\"yes\",";
    } else {
        receptOptions = receptOptions + "\"save\":\"no\",";
    }

    if ($("#printReceptId" + divId).prop("checked") == true) {
        receptOptions = receptOptions + "\"print\":\"yes\",";
    } else {
        receptOptions = receptOptions + "\"print\":\"no\",";
    }

    if ($("#emailReceptId" + divId).prop("checked") == true) {
        receptOptions = receptOptions + "\"emailMe\":\"yes\",";
    } else {
        receptOptions = receptOptions + "\"emailMe\":\"no\",";
    }

    if ($("#faxReceptId" + divId).prop("checked") == true) {
        receptOptions = receptOptions + "\"faxMe\":\"yes\",";
    } else {
        receptOptions = receptOptions + "\"faxMe\":\"no\",";
    }

    if (divId == "completeExamDiv") {
        if (rxFlag == "true") {
            if ($("#sendToPharmaReceptId" + divId).prop("checked") == true) {
                receptOptions = receptOptions + "\"sendToPharma\":\"yes\",";
            } else {
                receptOptions = receptOptions + "\"sendToPharma\":\"no\",";
            }
        } else {
            receptOptions = receptOptions + "\"sendToPharma\":\"no\",";
        }
    } else {
        receptOptions = receptOptions + "\"sendToPharma\":\"no\",";
    }

    receptOptions = receptOptions + "\"reportType\":\"Prescription\"";
    receptOptions = "{" + receptOptions + "}";
    reportOptions = "[" + patientOptions + "," + receptOptions + "]";

    if (divId == "completeExamDiv") {
//        alert(rxFlag);
        if (rxFlag == "true") {
            if ($('input[name=shipTo]:checked').val() == "" || $('input[name=shipTo]:checked').val() == undefined) {
                $("#dataNeededMsg").text("").append("<br /><br /><span class='smallErrorMsg' style='margin-left:15px;'>Please select the shipping details.</span>");
                return false;
            }
            if ($('input[name=shipTo]:checked').val() != "" && $('input[name=shipTo]:checked').val() != undefined) {
                medShipTo = $('input[name=shipTo]:checked').val();
                if ($("#dateNeededId" + divId).val() == "") {
                    $("#dataNeededMsg").text("").append("<br /><br /><span class='smallErrorMsg' style='margin-left:15px;'>Please enter date.</span>");
                    return false;
                } else if ($("#dateNeededId" + divId).val() != "") {
                    if (checkPastDate($("#dateNeededId" + divId).val()) != true) {
                        $("#dataNeededMsg").text("").append("<br /><br /><span class='smallErrorMsg' style='margin-left:15px;'>Please enter valid date.</span>");
                        return false;
                    } else {
                        $("#dataNeededMsg").text("");
                        medDateNeeded = $("#dateNeededId" + divId).val();
                    }
                }
            }
        } else {
        }
    }
//    alert(reportOptions + "\t" + medShipTo + "\t" + medDateNeeded);

    $('button').attr('disabled', true);

    $.get(server_base_url + "/irheum-server/DeliverReports", {
        encounterid: encId, pharmaflag: "no", reportOptions: reportOptions,
        medShipTo: medShipTo, medDateNeeded: medDateNeeded
    }).done(function(data) {
//        alert(data);
        if (data == success) {
            $('button').attr('disabled', false);
//calling print function
            if ($("#printPatientId" + divId).prop("checked") == true || $("#printReceptId" + divId).prop("checked") == true) {
                callPrint("iframe" + divId);
            }

            if (divId == "showPdf") {
                getPatientExamDemographicsData(patientId);
                editPatientButton(patientId);
            } else if (divId == "priorAssessmentReport") {
                showJointCount();
            } else if (divId == "completeExamDiv") {
                closeEncounter(patientId, encNo);
            }
        } else if (data == fail) {
            $("#" + divId).prepend("<center><span class='largeErrorMsg'>" + failMessage + "</span></center>");
        } else if (data == statusException) {
            $("#" + divId).prepend("<center><span class='largeErrorMsg'>" + statusExceptionMessage + "</span></center>");
        } else if (data == unauthorized) {
            $("#" + divId).prepend("<center><span class='largeErrorMsg'>" + unauthorizedMessage + "</span></center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        }
    });
}

function closeEncounter(patientId, encNo) {
    $.get(server_base_url + "/irheum-server/CloseEncounter", {
        patientid: patientId, encno: encNo
    }).done(function(data) {
        if (data != undefined || data != fail || data != unauthorized) {
            callDashboard();
        } else if (data == invalidSession) {
            callSessionTimeout();
        }
    });
}

//calling print option
function callPrint(iframeId) {
    var PDF = document.getElementById(iframeId);
    PDF.focus();
    PDF.contentWindow.print();
}

//review Patient history
function getReviewPatientHistoryData() {
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val()
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("reviewPatientMsg", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("reviewPatientMsg", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("reviewPatientMsg", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $("#reviewPriorMedsTable").append("<tr id='priormedsnatrid'><td>N/A</td></tr>");
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type == "Pain") {
                    $.each(assessments, function(index, value) {
                        if (value.answer != "" || value.answer != undefined) {
                            $("#displayPainId").text("").append(value.answer);
                        } else {
                            $("#displayPainId").append("&nbsp;");
                        }
                    });
                }
                if (value.type == "Fatigue") {
                    $.each(assessments, function(index, value) {
                        if (value.answer != "" || value.answer != undefined) {
                            $("#displayFatigueId").text("").append(value.answer);
                        } else {
                            $("#displayFatigueId").append("&nbsp;");
                        }
                    });
                }
                if (value.type == "Pga") {
                    $.each(assessments, function(index, value) {
                        if (value.answer != "" || value.answer != undefined) {
                            $("#displayPgaId").text("").append(value.answer);
                        } else {
                            $("#displayPgaId").append("&nbsp;");
                        }
                    });
                }
                if (value.type == "PriorMed") {
                    $("#priormedsnatrid").text("");
                    $.each(assessments, function(index, value) {
                        $("#reviewPriorMedsTable").append("<tr id='takenTr" + index + "'><td style='width:5%;' id='takenFirstTd" + index + "' /><td style='width:95%;' id='takenSecondTd" + index + "' /></tr>");
                        if (value.answer != "" || value.answer != undefined) {
                            var Question = value.question.replace('Have you ever taken ', '').replace("?", '');
                            if (value.answer == "yes") {
                                $("#takenFirstTd" + index).append("<span style='font-size:20px;'>" + Question + "</span>");
                                $.each(value.assessments, function(j, k) {
                                    if (k.question == "Dose") {
                                        $("#takenSecondTd" + index).append("<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:#428bca;font-size:14px;'>" + k.question + ": </span><span style='color:#5cb85c;font-size:14px;'>" + k.answer + "</span>");
                                    } else {
                                        $("#takenSecondTd" + index).append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:#428bca;font-size:14px;'>" + k.question + ": </span><span style='color:#5cb85c;font-size:14px;'>" + k.answer + "</span>");
                                    }
                                });
                            } else {
                                $("#takenTr" + index).remove();
                            }
                        }
                    });
                }
                if (value.type == "History") {
                    $("#categoryTd1").text("");
                    $.each(assessments, function(index, value) {
                        $("#categoryTd1").append("<table style='font-weight:bold;'><tr><td id='categoryQTd1'></tr><tr><td id='categoryQTd4'></tr><tr><td id='categoryQTd7'></tr></table>");
                        $("#categoryTd2").append("<table style='font-weight:bold;'><tr><td id='categoryQTd2'></tr><tr><td id='categoryQTd5'></tr><tr><td id='categoryQTd8'></tr></table>");
                        $("#categoryTd3").append("<table style='font-weight:bold;'><tr><td id='categoryQTd3'></tr><tr><td id='categoryQTd6'></tr></table>");

                        if (value.category == "General") {
                            if (value.answer == "yes") {
                                $("#categoryQTd1").append("<span id='categoryHeader'></span>");
                                $("#categoryHeader").text("").append("<br /><u>" + value.category + "</u><br />");
                                $("#categoryQTd1").append("<br /><span id='question" + value.answer + "'>" + value.question + ": <span style='color:#5cb85c'>" + value.answer + "</span></span>");
                            } else if (value.answer == "no") {
                                $("#question" + value.answer).remove();
                            }
                        } else if (value.category == "Skin") {
                            if (value.answer == "yes") {
                                $("#categoryQTd2").append("<span id='categoryHeader2'></span>");
                                $("#categoryHeader2").text("").append("<br /><u>" + value.category + "</u><br />");
                                $("#categoryQTd2").append("<br /><span id='question" + value.answer + "'>" + value.question + ": <span style='color:#5cb85c'>" + value.answer + "</span></span>");
                            } else if (value.answer == "no") {
                                $("#question" + value.answer).remove();
                            }
                        } else if (value.category == "Neurology") {
                            if (value.answer == "yes") {
                                $("#categoryQTd3").append("<span id='categoryHeader3'></span>");
                                $("#categoryHeader3").text("").append("<br /><u>" + value.category + "</u><br />");
                                $("#categoryQTd3").append("<br /><span id='question" + value.answer + "'>" + value.question + ": <span style='color:#5cb85c'>" + value.answer + "</span></span>");
                            } else if (value.answer == "no") {
                                $("#question" + value.answer).remove();
                            }
                        } else if (value.category == "Head & Neck") {
                            if (value.answer == "yes") {
                                $("#categoryQTd4").append("<span id='categoryHeader4'></span>");
                                $("#categoryHeader4").text("").append("<br /><u>" + value.category + "</u><br />");
                                $("#categoryQTd4").append("<br /><span id='question" + value.answer + "'>" + value.question + ": <span style='color:#5cb85c'>" + value.answer + "</span></span>");
                            } else if (value.answer == "no") {
                                $("#question" + value.answer).remove();
                            }
                        } else if (value.category == "Gastrointestinal") {
                            if (value.answer == "yes") {
                                $("#categoryQTd5").append("<span id='categoryHeader5'></span>");
                                $("#categoryHeader5").text("").append("<br /><u>" + value.category + "</u><br />");
                                $("#categoryQTd5").append("<br /><span id='question" + value.answer + "'>" + value.question + ": <span style='color:#5cb85c'>" + value.answer + "</span></span>");
                            } else if (value.answer == "no") {
                                $("#question" + value.answer).remove();
                            }
                        } else if (value.category == "Other") {
                            if (value.answer == "yes") {
                                $("#categoryQTd6").append("<span id='categoryHeader6'></span>");
                                $("#categoryHeader6").text("").append("<br /><u>" + value.category + "</u><br />");
                                $("#categoryQTd6").append("<br /><span id='question" + value.answer + "'>" + value.question + ": <span style='color:#5cb85c'>" + value.answer + "</span></span>");
                            } else if (value.answer == "no") {
                                $("#question" + value.answer).remove();
                            }
                        } else if (value.category == "Heart & Breathing") {
                            if (value.answer == "yes") {
                                $("#categoryQTd7").append("<span id='categoryHeader7'></span>");
                                $("#categoryHeader7").text("").append("<br /><u>" + value.category + "</u><br />");
                                $("#categoryQTd7").append("<br /><span id='question" + value.answer + "'>" + value.question + ": <span style='color:#5cb85c'>" + value.answer + "</span></span>");
                            } else if (value.answer == "no") {
                                $("#question" + value.answer).remove();
                            }
                        } else if (value.category == "GYN") {
                            if (value.answer == "yes") {
                                $("#categoryQTd8").append("<span id='categoryHeader8'></span>");
                                $("#categoryHeader8").text("").append("<br /><u>" + value.category + "</u><br />");
                                $("#categoryQTd8").append("<br /><span id='question" + value.answer + "'>" + value.question + ": <span style='color:#5cb85c'>" + value.answer + "</span></span>");
                            } else if (value.answer == "no") {
                                $("#question" + value.answer).remove();
                            }
                        }
                    });
                }
                if (value.type == "HAQII") {
                    $("#haq2Td1").text("");
                    $.each(assessments, function(index, value) {
                        $("#haq2Td1").append("<table style='font-weight:bold;'><tr><td id='haq2TableTd1'></tr><tr><td id='haq2TableTd3'></tr></table>");
                        $("#haq2Td2").append("<table style='font-weight:bold;'><tr><td id='haq2TableTd2'></tr><tr><td id='haq2TableTd4'></tr><tr><td id='haq2TableTd5'></tr></table>");
                        if (value.answer == "0") {
                            $("#haq2TableTd1").append("<br />" + value.question + "<br /><span style='color:#5cb85c'>No Difficulty</span><br />");
                        } else if (value.answer == "1") {
                            $("#haq2TableTd2").append("<br />" + value.question + "<br /><span style='color:#5cb85c'>Some Difficulty</span><br />");
                        } else if (value.answer == "2") {
                            $("#haq2TableTd3").append("<br />" + value.question + "<br /><span style='color:#5cb85c'>Much Difficulty</span><br />");
                        } else if (value.answer == "3") {
                            $("#haq2TableTd4").append("<br />" + value.question + "<br /><span style='color:#5cb85c'>Unable to Do</span><br />");
                        } else {
                            $("#haq2TableTd5").append("<br />" + value.question + "<br /><span style='color:#5cb85c'>No Answer</span><br />");
                        }
                    });
                }
            });
        }
    });
}
