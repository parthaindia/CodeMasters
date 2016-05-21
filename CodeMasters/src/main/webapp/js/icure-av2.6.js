//onload get jointcount data start
function getJointCountData() {
    $.get(server_base_url + "/irheum-server/ResumeExamination", {
        patientid: $("#pid").val(), encno: $("#encno").val()
    }).done(function(data) {
        if (data == fail) {
            $("#jcBeforeSuccessMsg").text("").append("<span style='font-weight:bold;color:brown;font-size:16px;margin-top:-60px;margin-left:20%;'>" + failMessage + "</span>");
            displayLargeErrorMessages("jcAfterSuccessMsg", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            $("#jcBeforeSuccessMsg").text("").append("<span style='font-weight:bold;color:brown;font-size:16px;margin-top:-60px;margin-left:20%;'>" + unauthorizedMessage + "</span>");
            displayLargeErrorMessages("jcAfterSuccessMsg", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            $("#jcBeforeSuccessMsg").text("").append("<span style='font-weight:bold;color:brown;font-size:16px;margin-top:-60px;margin-left:20%;'>" + statusExceptionMessage + "</span>");
            displayLargeErrorMessages("jcAfterSuccessMsg", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                if (index == "jointCount") {
                    var jointCountData = value;
                    $.each(jointCountData, function(index, value) {
                        if (value == "yes") {
                            if (index == "noJointsAffected") {
                                $("#nja").prop("checked", true);
                            } else {
                                $("#" + index).prop("checked", true);
                            }
                        }
                        if (index == "tcount") {
                            document.getElementById("TenderCount").innerHTML = value;
                        }
                        if (index == "scount") {
                            document.getElementById("SwollenCount").innerHTML = value;
                        }
                    });
                }
                if (index == "outcome") {
                    var outcomeData = value;
                    $.each(outcomeData, function(index, value) {
                        if (index == "dasesr") {
                            if (value != null && value != "") {
                                document.getElementById("dasesr").innerHTML = value;
                            }
                        }
                        if (index == "dascrp") {
                            if (value != null && value != "") {
                                document.getElementById("dascrp").innerHTML = value;
                            }
                        }
                    });
                }
            });
        }
    });
    $.get(server_base_url + "/irheum-server/PatientInformation", {
        patientid: $("#pid").val()
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("priorAssessmentsDiv", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("priorAssessmentsDiv", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("priorAssessmentsDiv", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $("#priorAssessmentsDiv").text("").append("<div id='priorAssessmentsMainDiv' class='table-responsive' />");
            $("#priorAssessmentsMainDiv").append("<table id='priorAssessmentsTable' class='table table-primary mb30' />");
            $("#priorAssessmentsMainDiv").prepend("<h1><span style='font-size:30px;'><b>Prior Assessment</b></span></h1>");
            $("#priorAssessmentsTable").append("<thead><th>Exam Date</th><th>Joint Counts</th><th>Das28 3v ESR</th><th>SDAI</th><th>&nbsp;</th></thead>");
            $.each(data, function(index, value) {
                if (value.examstatus == "complete") {
                    var visitedDateComplete = "";
                    var jointCountComplete = "NA";
                    var das28EsrComplete = "NA";
                    var sdaiComplete = "NA";
                    if (value.createdate != undefined) {
                        visitedDateComplete = dateConversion(value.createdate);
                    }
                    if (value.jointCount != undefined) {
                        jointCountComplete = value.jointCount.tcount + "T/" + value.jointCount.scount + "S";
                    }
                    if (value.outcome != undefined && value.outcome != "undefined") {
                        $.each(value.outcome, function(index, output) {
                            if (index.match("dasesr")) {
                                if (value.outcome.dasesr != undefined || value.outcome.dasesr != "undefined" || value.outcome.dasesr != "" || value.outcome.dasesr != "null") {
                                    das28EsrComplete = value.outcome.dasesr;
                                }
                            }
                            if (index.match("sdai")) {
                                if (value.outcome.sdai != undefined || value.outcome.sdai != "undefined" || value.outcome.sdai != "" || value.outcome.sdai != "null") {
                                    sdaiComplete = value.outcome.sdai;
                                }
                            }
                        });
                    }
//                alert(visitedDate + "\t" + jointCount + "\t" + das28Esr + "\t" + sdai);
                    $("#priorAssessmentsTable").append("<tbody id='priorBodyComplete" + index + "' />");
                    $("#priorBodyComplete" + index).append("<tr><td>" + visitedDateComplete + "</td><td>" + jointCountComplete + "</td><td>" + das28EsrComplete + "</td><td>" + sdaiComplete + "</td><td><button class='btn btn-primary' onclick=viewPriorAssessmentReport('" + value._id.$oid + "','" + value.encno + "')>View</button></td></tr>");
                    $.get(server_base_url + "/irheum-server/LabHistory", {
                        encounterid: value._id.$oid
                    }).done(function(data) {
                        $.each(data, function(index3, value) {
//                            alert(index3 + "\t" + value.encounterid + "\t");
                            var visitedDateRevise = "";
                            var jointCountRevise = "NA";
                            var das28EsrRevise = "NA";
                            var sdaiRevise = "NA";
                            if (value.createdate != undefined) {
                                visitedDateRevise = dateConversion(value.createdate);
                            }
                            if (value.jointCount != undefined) {
                                jointCountRevise = value.jointCount.tcount + "T/" + value.jointCount.scount + "S";
                            }
                            if (value.outcome != undefined && value.outcome != "undefined") {
                                $.each(value.outcome, function(index, output) {
                                    if (index.match("dasesr")) {
                                        if (value.outcome.dasesr != undefined || value.outcome.dasesr != "undefined" || value.outcome.dasesr != "" || value.outcome.dasesr != "null") {
                                            das28EsrRevise = value.outcome.dasesr;
                                        }
                                    }
                                    if (index.match("sdai")) {
                                        if (value.outcome.sdai != undefined || value.outcome.sdai != "undefined" || value.outcome.sdai != "" || value.outcome.sdai != "null") {
                                            sdaiRevise = value.outcome.sdai;
                                        }
                                    }
                                });
                            }
                            $("#priorAssessmentsTable").append("<tbody id='priorBodyRevise" + index3 + "' />");
                            if (value.encounterid != undefined) {
                                $("#priorBodyRevise" + index3).append("<tr><td>" + visitedDateRevise + "</td><td>" + jointCountRevise + "</td><td>" + das28EsrRevise + "</td><td>" + sdaiRevise + "</td><td><button class='btn btn-primary' onclick=viewPriorAssessmentReport('" + value.encounterid + "','" + value.encno + "')>View</button></td></tr>");
                            }
                        });
                    });
                }//complete end  
                if (value.examstatus == "incomplete") {
                    var visitedDate = "";
                    var jointCount = "NA";
                    var das28Esr = "NA";
                    var sdai = "NA";
                    if (value.createdate != undefined) {
                        visitedDate = dateConversion(value.createdate);
                    }
                    if (value.jointCount != undefined) {
                        jointCount = value.jointCount.tcount + "T/" + value.jointCount.scount + "S";
                    }
                    if (value.outcome != undefined && value.outcome != "undefined") {
                        $.each(value.outcome, function(index, output) {
                            if (index.match("dasesr")) {
                                if (value.outcome.dasesr != undefined && value.outcome.dasesr != "undefined" && value.outcome.dasesr != "" && value.outcome.dasesr != "null") {
                                    das28Esr = value.outcome.dasesr;
                                }
                            }
                            if (index.match("sdai")) {
                                if (value.outcome.sdai != undefined && value.outcome.sdai != "undefined" && value.outcome.sdai != "" && value.outcome.sdai != "null") {
                                    sdai = value.outcome.sdai;
                                }
                            }
                        });
                    }
//                alert(visitedDate + "\t" + jointCount + "\t" + das28Esr + "\t" + sdai);    
                    $("#priorAssessmentsTable").prepend("<tbody id='priorBodyIncomplete" + index + "' />");
                    if (value._id.$oid != undefined) {
                        $("#priorBodyIncomplete" + index).prepend("<tr><td>" + visitedDate + "</td><td>" + jointCount + "</td><td>" + das28Esr + "</td><td>" + sdai + "</td><td><button class='btn btn-primary' onclick=viewPriorAssessmentReport('" + value._id.$oid + "','" + value.encno + "')>View</button></td></tr>");
                    }
                }//incomplete end
            });
        }
    });//encounter service end
}//onload get jointcount data end


function calCount() {
    $("#jcBeforeSuccessMsg").text("");
    $("#jcAfterSuccessMsg").text("");
    var Tender = 0;
    var Swollen = 0;
    var frm = document.getElementById("myForm");

//For each checkbox see if it has been checked, record the value.
    for (j = 0; j < frm.Tender.length; j++)
        if (frm.Tender[j].checked) {
            Tender = Tender + 1;
        }
    //For each radio button if it is checked get the value and break.
    for (var i = 0; i < frm.Swollen.length; i++) {
        if (frm.Swollen[i].checked) {
            Swollen = Swollen + 1;
        }
    }
    document.getElementById("TenderCount").innerHTML = Tender;
    document.getElementById("SwollenCount").innerHTML = Swollen;
//    alert(frm.nja.checked);
    if (frm.nja.checked) {
        noJointsSelected();
    }
}

function save() {
    if (document.getElementById("TenderCount").innerHTML == 0 && document.getElementById("SwollenCount").innerHTML == 0 && $("#nja").prop('checked') == false) {
        $("#jcBeforeSuccessMsg").text("").append("<span style='font-weight:bold;color:brown;font-size:16px;margin-top:-60px;margin-left:20%;'>No Joints Selected.</span>");
        displayLargeErrorMessages("jcAfterSuccessMsg", "<center>No Joints Selected.</center>");
        setTimeout(function() {
            $("#jcBeforeSuccessMsg").text("");
            $("#jcAfterSuccessMsg").text("");
        }, 3000);
    } else {
        var patientId = $("#pid").val();
        var encno = $("#encno").val();
        var frm = document.getElementById("myForm");
        var tenderList = "";
        var swollenList = "";
        var totalList = "";

        for (j = 0; j < frm.Tender.length; j++) {
            if (frm.Tender[j].checked) {
                tenderList = tenderList + "\"" + frm.Tender[j].value + "\":\"yes\",";
            } else {
                tenderList = tenderList + "\"" + frm.Tender[j].value + "\":\"no\",";
            }
        }
        tenderList = tenderList.substr(0, tenderList.length - 1);

        for (var i = 0; i < frm.Swollen.length; i++) {
            if (frm.Swollen[i].checked) {
                swollenList = swollenList + "\"" + frm.Swollen[i].value + "\":\"yes\",";
            } else {
                swollenList = swollenList + "\"" + frm.Swollen[i].value + "\":\"no\",";
            }
        }
        var noJointsAffectedStatus = "\"noJointsAffected\":";

        if (frm.nja.checked) {
            noJointsAffectedStatus = noJointsAffectedStatus + "\"yes\"";
        } else {
            noJointsAffectedStatus = noJointsAffectedStatus + "\"no\"";
        }

        var counts = "\"tcount\":\"" + document.getElementById("TenderCount").innerHTML + "\",";
        counts = counts + "\"scount\":\"" + document.getElementById("SwollenCount").innerHTML + "\"";
        swollenList = swollenList.substr(0, swollenList.length - 1);
        totalList = "{" + tenderList + "," + swollenList + "," + counts + "," + noJointsAffectedStatus + "}";
//    alert(totalList);
//    alert(swollenList);
//    alert(patientId);
        $.get(server_base_url + "/irheum-server/JointCount", {
            patientid: patientId,
            encno: encno,
            totalList: totalList
        }).done(function(data) {
            if (data == fail) {
                $("#jcBeforeSuccessMsg").text("").append("<span style='font-weight:bold;color:brown;font-size:16px;margin-top:-60px;margin-left:20%;'>" + failMessage + "</span>");
                displayLargeErrorMessages("jcAfterSuccessMsg", "<center>" + failMessage + "</center>");
            } else if (data == unauthorized) {
                $("#jcBeforeSuccessMsg").text("").append("<span style='font-weight:bold;color:brown;font-size:16px;margin-top:-60px;margin-left:20%;'>" + unauthorizedMessage + "</span>");
                displayLargeErrorMessages("jcAfterSuccessMsg", "<center>" + unauthorizedMessage + "</center>");
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == statusException) {
                $("#jcBeforeSuccessMsg").text("").append("<span style='font-weight:bold;color:brown;font-size:16px;margin-top:-60px;margin-left:20%;'>" + statusExceptionMessage + "</span>");
                displayLargeErrorMessages("jcAfterSuccessMsg", "<center>" + statusExceptionMessage + "</center>");
            } else {
                $("#jcBeforeSuccessMsg").text("").append("<span style='font-weight:bold;color:green;font-size:16px;margin-top:-60px;margin-left:20%;'>" + successMessage + "</span>");
                displayLargeSuccessMessages("jcAfterSuccessMsg", "<center>" + successMessage + "</center>");
                patientExamDefaults();
            }
        });
    }
}

function clearAll() {
    $('input:checkbox').prop('checked', false);
    document.getElementById("TenderCount").innerHTML = 0;
    document.getElementById("SwollenCount").innerHTML = 0;
    $("#jcBeforeSuccessMsg").text("");
    $("#jcAfterSuccessMsg").text("");
}

function noJointsSelected() {
    //var selection = confirm("Selecting No Joints Effected will deselect all the other joints");
    //click Ok to select No Joints Affected or Cancel to select Other Joints
//    var selection = confirm("Click ok to select no joints affected or cancel to select other joints");

    //NoJointsAffected Popup
    removeBeforePopup();
    $("#jointCountPopup").text("").append("<div class='modal fade' id='jointCountModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' data-backdrop='static' data-keyboard='false' />");
    $("#jointCountModal").text("").append("<div id='njc' data-toggle='modal' data-target='#jointCountModal' />");
    $("#jointCountModal").append("<div id='jointCountModalDialog' class='modal-dialog' />");
    $("#jointCountModalDialog").append("<div id='jointCountModalContent' class='modal-content' />");
    $("#jointCountModalContent").append("<div class='modal-header'><h4 class='modal-title' id='myModalLabel'>Info</h4></div>");
    $("#jointCountModalContent").append("<div class='modal-body'>Click continue to select no joints affected or cancel to select other joints</div>");
    $("#jointCountModalContent").append("<div class='modal-footer'><button class='btn btn-primary' onclick='jointCountContinue();'>Continue</button><button class='btn btn-default' onclick='jointCountQuit();'>Cancel</button></div>");
    $("#njc").click();
}

function jointCountContinue() {
    $('input:checkbox').prop('checked', false);
    document.getElementById("TenderCount").innerHTML = 0;
    document.getElementById("SwollenCount").innerHTML = 0;
    $("#nja").prop('checked', true);
    $("#jointCountModal").append("<div id='closeNJCPopup' class='btn btn-default' data-dismiss='modal' />");
    $("#closeNJCPopup").click();
    $("#closeNJCPopup").remove();
}

function jointCountQuit() {
    $("#nja").prop('checked', false);
    $("#jointCountModal").append("<div id='closeNJCPopup' class='btn btn-default' data-dismiss='modal' />");
    $("#closeNJCPopup").click();
    $("#closeNJCPopup").remove();
}