//for physician assessment onload data function start
function getPhysicianAssesmentData() {
    getPhysicianAssessmentForm();
    $("#beforePhysUpdateMsg").text("");
    $("#afterPhysUpdateMsg").text("");

    $.get(server_base_url + "/irheum-server/pga", {
        patientid: $("#pid").val(),
        encno: $("#encno").val()
    }).done(function(data) {
        if (data == invalidSession) {
            callSessionTimeout();
        } else {
            var phyassessments = data.phyassessments;
            var icd9code = phyassessments.icd9codeList;
            var raSeverity = phyassessments.raSeverity;
            var phyId = phyassessments._id;

            if (icd9code != "null") {
                $("#select-multi").select2('val', icd9code);
            }

            if (raSeverity != "null") {
                $("#raSeveritySelection").val("").val(raSeverity);
            }

            if (phyId != "null" && phyId != undefined) {
                $("#physicianAssesmentDiv").append("<input type='hidden' id='phyid' />");
                $("#phyid").val("").val(phyId);
            } else {
                $("#physicianAssesmentDiv").append("<input type='hidden' id='phyid' value='' />");
            }
            if (data.jointCount.status == "complete") {
                $("#jointExamPerformed").text("").text("Yes");
            } else {
                $("#jointExamPerformed").text("").text("No");
            }
            $("#tenderJoints").text("").text(data.jointCount.tcount);
            $("#swollenJoints").text("").text(data.jointCount.scount);
            $("#das283Variale").text("");
            $.each(data, function(index, value) {
                if (index.match("outcome")) {
                    var omeas = "";
                    $.each(value, function(i, v) {
//                    alert(i + "\t" + v);
                        if (i.match("sdai")) {
                            if (v != undefined || v != "undefined" || v != "" || v != "null") {
                                omeas = omeas + "SDAI: " + v + "<br />";
                            }
                        } else if (i.match("cdai")) {
                            if (v != undefined || v != "undefined" || v != "" || v != "null") {
                                omeas = omeas + "CDAI: " + v + "<br />";
                            }
                        } else if (i.match("dasesr")) {
                            if (v != undefined || v != "undefined" || v != "" || v != "null") {
                                omeas = omeas + "DAS28-ESR: " + v + "<br />";
                            }
                        } else if (i.match("dascrp")) {
                            if (v != undefined || v != "undefined" || v != "" || v != "null") {
                                omeas = omeas + "DAS28-CRP: " + v + "<br />";
                            }
                        } else if (i.match("rapid3")) {
                            if (v != undefined || v != "undefined" || v != "" || v != "null") {
                                omeas = omeas + "PAS2: " + v + "<br />";
                            }
                        }
                    });
                    $("#das283Variale").append(omeas);
                }
            });
        }
    });
    $('#phyAssessmentLoader').remove();
    $("#phyAssPanel").show();
}//for physician assessment onload data function end

//onclick submit button in physician assessment start
function submitPhysicianAssesmentData() {
    $("#physicianAssessmentEditButton").remove();
    $("#physicianAssessmentUpdateButton").remove();
    var selCodes = "";
    var icd9 = "";
    if ($("#select-multi").val() != null) {
        for (var i = 0; i < $("#select-multi").val().length; i++) {
            if ($("#select-multi").val() != "") {
                selCodes = selCodes + "\"" + $("#select-multi").val()[i] + "\",";
            }
        }
        icd9 = "[" + selCodes.substring(0, selCodes.length - 1) + "]";
    } else {
        icd9 = "[]";
    }
    var pgaJson =
            "[{\"_id\":\"" + $("#phyid").val() +
            "\",\"raSeverity\":\"" + $("#raSeveritySelection").val() +
            "\",\"icd9codeList\":" + icd9 + "}]";
//    alert(pgaJson);
    $.get(server_base_url + "/irheum-server/pgaupdate", {
        patientid: $("#pid").val(), encno: $("#encno").val(), pgaJSON: pgaJson
    }).done(function(data) {
        if (data == success) {
            getPhysicianAssesmentData();
            getLeftSideMenusData();
            displayLargeSuccessMessages("beforePhysUpdateMsg", successMessage);
            displayLargeSuccessMessages("afterPhysUpdateMsg", successMessage);
            $("#select-multi").attr('readonly', true);
            $("#raSeveritySelection").attr('disabled', true);
            $("#raSeveritySelection").attr('readonly', true);
            $("#physicianAssessmentSubmitButton").hide();
            $("#physicianAssesmentBodyDiv").append("<center><button id='physicianAssessmentEditButton' class='btn btn-success' onclick='editPhysicianAssessmentData()'><b>Edit</b></button></center>");
        } else if (data == fail) {
            $("#physicianAssessmentSubmitButton").show();
            displayLargeErrorMessages("beforePhysUpdateMsg", failMessage);
            displayLargeErrorMessages("afterPhysUpdateMsg", failMessage);
        } else if (data == unauthorized) {
            $("#physicianAssessmentSubmitButton").show();
            displayLargeErrorMessages("beforePhysUpdateMsg", unauthorizedMessage);
            displayLargeErrorMessages("afterPhysUpdateMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            $("#physicianAssessmentSubmitButton").show();
            displayLargeErrorMessages("beforePhysUpdateMsg", statusExceptionMessage);
            displayLargeErrorMessages("afterPhysUpdateMsg", statusExceptionMessage);
        }
    });
}//onclick submit button in physician assessment end

function editPhysicianAssessmentData() {
    $("#beforePhysUpdateMsg").text("");
    $("#afterPhysUpdateMsg").text("");
    $("#physicianAssessmentEditButton").remove();
    $("#select-multi").attr('readonly', false);
    $("#raSeveritySelection").attr('disabled', false);
    $("#raSeveritySelection").attr('readonly', false);
    $("button").attr('disabled', false);
    $("input").attr('disabled', false);
    $("#physicianAssesmentBodyDiv").append("<center><button id='physicianAssessmentUpdateButton' class='btn btn-primary' onclick='submitPhysicianAssesmentData()'><b>Update</b></button></center>");
}