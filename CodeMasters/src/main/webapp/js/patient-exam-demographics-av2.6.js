function getPatientExamDemographicsData(patientId) {
    $('#searchId').val("");
    $("#searchMsg").text("");
    $('html,body').scrollTop(0);
    comments(patientId);
    $("#dashboard-body").text("").append("<div class='contentpanel' id='patientDemographicsDisplay'>");
    if (checkUserPrivelege("ViewPatientInformation") == true) {
        $("#patientDemographicsDisplay").text("").append("<div id = 'firstTable' class = 'panel panel-success-head' />");
    } else {
        $("#firstTable").remove();
    }

    if (getUserSessionElement("allergy") == "no") {
        $("#allergyTable").remove();
    } else {
        if (checkUserPrivelege("Allergy") == true) {
            $("#patientDemographicsDisplay").append("<div id = 'allergyTable' class = 'panel panel-success-head' />");
        } else {
            $("#allergyTable").remove();
        }
    }

    if (checkUserPrivelege("ViewExamInformation") == true) {
//        $("#patientDemographicsDisplay").append("<div id = 'secondTable' class = 'panel panel-primary-head' />");
        $("#patientDemographicsDisplay").append("<div id = 'mainIncompleteDiv' />");
        $("#patientDemographicsDisplay").append("<div id='mainCompleteDiv' />");
    } else {
        $("#secondTable").remove();
        $("#thirdTable").remove();
    }

    $("#firstTable").text("").append("<div class = 'panel-heading' id='patientDemogDisplayT1Heading' style='height:14px;' />");
    $("#patientDemogDisplayT1Heading").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:16px;'><b>Patient Detail</b></h3></center>");
    $("#firstTable").append("<div id='patientDemogDisplayT1' />");
    $("#firstTable").append("<div id='patientDemogDisplayTableFooter' />");
    $("#patientDemogDisplayTableFooter").append("<center><table id='patientDemogDisplayTableFooterT1' /></center>");
    $("#patientDemogDisplayT1").append("<table class = 'table table-striped table-bordered responsive dataTable no-footer dtr-inline' role = 'grid' aria - describedby = 'basicTable_info' id='patientDemogDisplayTable' />");
    $("#patientDemogDisplayTable").append("<tbody id='patientDemogDisplayTableBody' />");
    $("#patientDemogDisplayTableBody").append("<tr><td>Name</td><td id='pdispname'></td></tr>");
    $("#patientDemogDisplayTableBody").append("<tr><td>Gender</td><td id='pdispgender'></td></tr>");
    $("#patientDemogDisplayTableBody").append("<tr><td>Date Of Birth</td><td id='pdispdob'></td></tr>");
    $("#patientDemogDisplayTableBody").append("<tr><td>SSN</td><td><span id='pdispssn' title='' style='cursor: pointer;'></td></tr>");
    $("#patientDemogDisplayTableBody").append("<tr><td>Email</td><td id='pdispemail'></td></tr>");
    $("#patientDemogDisplayTableBody").append("<tr><td>Phone</td><td id='pdisphphone'></td></tr>");
    $("#patientDemogDisplayTableFooterT1").append("<tr id='patientDisplayButtons' />");

    if (checkUserPrivelege("BeginExam") == true) {
        $("#patientDisplayButtons").append("<td id='beginNewExamBtnTd'>&nbsp;</td>");
    } else {
        $("#beginNewExamBtnTd").text("");
    }

    if (checkUserPrivelege("UpdatePatientInformation") == true) {
        $("#patientDisplayButtons").append("<td id='editPatientBtn'><button class = 'btn btn-warning'><b>Edit Patient<b></button></td>");
    } else {
        $("#editPatientBtn").text("");
    }

    var beginNewExamFlag = "true";
    $.post(server_base_url + "/irheum-server/PatientInformation", {
        patientid: patientId
    }).done(function(data) {
        if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $.each(data, function(index, value) {
//            alert(index + "\t" + value);
//            alert(value.examstatus);
//checking incomplete exam details
                if (value.examstatus == "incomplete") {
                    $("#beginNewExamBtnTd").text("");
                    beginNewExamFlag = "false";
                    var incompleteProviderName = "";
                    if (value.providername != undefined) {
                        incompleteProviderName = value.providername;
                    }
                    var incompleteVisitedDate = "";
                    if (value.createdate != "undefined") {
                        incompleteVisitedDate = dateConversion(value.createdate);
                    }
                    var incompleteLabs = "";
                    var incompleteComparator = "";
                    var incompleteFlag = "";
                    var incompleteUnit = "";
                    if (value.labs != undefined) {
                        var ldata = value.labs;
                        for (var i = 0; i < ldata.length; i++) {
                            if (ldata[i].name != "undefined") {
                                if (ldata[i].name == "ESR" && ldata[i].name != undefined) {
                                    if (ldata[i].comparator == "NA" || ldata[i].comparator == undefined) {
                                        incompleteComparator = "";
                                    } else {
                                        incompleteComparator = ldata[i].comparator;
                                    }
                                    if (ldata[i].value != "") {
                                        incompleteUnit = ldata[i].unit;
                                    }
                                    if (ldata[i].value == "") {
                                    } else {
                                        incompleteLabs = incompleteLabs + ldata[i].name + ': ' + incompleteComparator + ldata[i].value + " " + incompleteUnit + "<br />";
                                    }
                                }

                                if (ldata[i].name == "CRP" && ldata[i].name != undefined) {
                                    if (ldata[i].comparator == "NA" || ldata[i].comparator == undefined) {
                                        incompleteComparator = "";
                                    } else {
                                        incompleteComparator = ldata[i].comparator;
                                    }
                                    if (ldata[i].value != "") {
                                        incompleteUnit = ldata[i].unit;
                                    }
                                    if (ldata[i].value == "") {
                                    } else {
                                        incompleteLabs = incompleteLabs + ldata[i].name + ': ' + incompleteComparator + ldata[i].value + " " + incompleteUnit + "<br />";
                                    }
                                }

                                if (ldata[i].name == "RF" && ldata[i].name != undefined) {
                                    if (ldata[i].flag == "NA" || ldata[i].flag == undefined) {
                                        incompleteFlag = "";
                                    }
                                    else {
                                        incompleteFlag = ldata[i].flag;
                                    }
                                    if (ldata[i].value == "") {
                                        if (incompleteFlag != "") {
                                            incompleteLabs = incompleteLabs + ldata[i].name + ': ' + incompleteFlag + "<br />";
                                        }
                                    } else {
                                        incompleteLabs = incompleteLabs + ldata[i].name + ': ' + incompleteFlag + ldata[i].value + "<br />";
                                    }
                                }

                                if (ldata[i].name == "ANTI-CCP" && ldata[i].name != undefined) {
                                    if (ldata[i].flag == "NA" || ldata[i].flag == undefined) {
                                        incompleteFlag = "";
                                    }
                                    else {
                                        incompleteFlag = ldata[i].flag;
                                    }
                                    if (ldata[i].value == "") {
                                        if (incompleteFlag != "") {
                                            incompleteLabs = incompleteLabs + ldata[i].name + ': ' + incompleteFlag + "<br />";
                                        }
                                    } else {
                                        incompleteLabs = incompleteLabs + ldata[i].name + ': ' + incompleteFlag + ldata[i].value + "<br />";
                                    }
                                }
                                if (ldata[i].name == "VECTRA-DA" && ldata[i].name != undefined) {
                                    if (ldata[i].flag == undefined) {
                                        incompleteFlag = "";
                                    } else {
                                        incompleteFlag = ldata[i].flag;
                                    }
                                    if (ldata[i].value == "") {
                                        if (incompleteFlag != "") {
                                            incompleteLabs = incompleteLabs + ldata[i].name + ': ' + incompleteFlag + "<br />";
                                        }
                                    } else {
                                        incompleteLabs = incompleteLabs + ldata[i].name + ': ' + incompleteFlag + " " + ldata[i].value + "<br />";
                                    }
                                }
                            }//for end
                        }
                    }
                    var incompleteJointCount = "";
                    if (value.jointCount != undefined) {
                        incompleteJointCount = "Tender Count: " + value.jointCount.tcount + "<br>Swollen Count: " + value.jointCount.scount;
                    }

                    $("#mainIncompleteDiv").prepend("<div id = 'secondTable" + index + "' class = 'panel panel-primary-head' />");
                    $("#secondTable" + index).append("<div class = 'panel-heading' style='height:14px;' id='patientDemogDisplayT2Heading' />");

                    $("#patientDemogDisplayT2Heading").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Incomplete Exam</b></h3></center>");
                    $("#secondTable" + index).append("<table id = 'basicTable' class = 'table table-striped table-bordered responsive incomepleteExamData' />");
                    $('.incomepleteExamData').append("<thead class='' id='basicTableThread' />");
                    $('#basicTableThread').append("<tr><th>Doctor Name</th><th>Visited Date</th><th>Labs</th><th>Joint Count</th><th>Status</th></tr>");
                    $('.incomepleteExamData').append("<tbody id='patientDemogDisplayTable2Body' />");

                    if (incompleteProviderName == "") {
                        incompleteProviderName = "&nbsp;";
                    }
                    if (incompleteVisitedDate == "") {
                        incompleteVisitedDate = "&nbsp;";
                    }
                    if (incompleteLabs == "") {
//                        incompleteLabs = "&nbsp;";
                        incompleteLabs = "N/A";
                    }
                    if (incompleteJointCount == "") {
//                        incompleteJointCount = "&nbsp;";
                        incompleteJointCount = "N/A";
                    }

                    $('#patientDemogDisplayTable2Body').append("<tr><td style='width:15%;'>" + incompleteProviderName + "</td><td style='width:15%;'>" + incompleteVisitedDate + "</td><td style='width:25%;'>" + incompleteLabs + "</td><td style='width:25%;'>" + incompleteJointCount + "</td><td  style='width:20%;' id='resumeExamTd'></td></tr>");
                    if (checkUserPrivelege("ResumeExam") == true) {
                        $("#resumeExamTd").append("<button class = 'btn btn-success' onclick=resumeExistingExam('" + patientId + "','" + value.encno + "','" + value._id.$oid + "')><b>Resume</b></button>");
                    }
                    //newly added by somesh
                    if (beginNewExamFlag == "false") {
                        //$("#beginNewExamBtnTd").text("").prepend("<button id='beginNewExamBtn' class = 'btn btn-success' style = 'margin-right:10px;' onclick=beginNewExam('" + patientId + "') > <b> Begin New Exam <b> </button>");
                        $("#beginNewExamBtnTd").text("").prepend("<button id='beginNewExamBtn' class = 'btn btn-success' style = 'margin-right:10px;' onclick=beginExamConfirmationPopup('" + patientId + "') > <b> Begin New Exam <b> </button>");
                    }
                }

//checking completed exam details
                if (value.examstatus == "complete") {
                    beginNewExamFlag = "true";
                    var completeProviderName = "";
                    if (value.providername != undefined) {
                        completeProviderName = value.providername;
                    }
//                alert(value.providername);
                    var completeVisitedDate = "";
                    if (value.createdate != undefined) {
                        completeVisitedDate = dateConversion(value.createdate);
                    }
                    var completeLabs = "";
                    var completeComparator = "";
                    var completeFlag = "";
                    var completeUnit = "";
//                alert(value.labs);
                    if (value.labs != undefined) {
                        var ldata = value.labs;
                        for (var i = 0; i < ldata.length; i++) {
                            if (ldata[i].name != "undefined") {
                                if (ldata[i].name == "ESR" && ldata[i].name != undefined) {
                                    if (ldata[i].comparator == "NA" || ldata[i].comparator == undefined) {
                                        completeComparator = "";
                                    } else {
                                        completeComparator = ldata[i].comparator;
                                    }
                                    if (ldata[i].value != "") {
                                        completeUnit = ldata[i].unit;
                                    }
                                    if (ldata[i].value == "") {
                                    } else {
                                        completeLabs = completeLabs + ldata[i].name + ': ' + completeComparator + ldata[i].value + " " + completeUnit + "<br />";
                                    }
                                }
                                if (ldata[i].name == "CRP" && ldata[i].name != undefined) {
                                    if (ldata[i].comparator == "NA" || ldata[i].comparator == undefined) {
                                        completeComparator = "";
                                    } else {
                                        completeComparator = ldata[i].comparator;
                                    }
                                    if (ldata[i].value != "") {
                                        completeUnit = ldata[i].unit;
                                    }
                                    if (ldata[i].value == "") {
                                    } else {
                                        completeLabs = completeLabs + ldata[i].name + ': ' + completeComparator + ldata[i].value + " " + completeUnit + "<br />";
                                    }
                                }
                                if (ldata[i].name == "RF" && ldata[i].name != undefined) {
                                    if (ldata[i].flag == "NA" || ldata[i].flag == undefined) {
                                        completeFlag = "";
                                    }
                                    else {
                                        completeFlag = ldata[i].flag;
                                    }
                                    if (ldata[i].value == "") {
                                        if (completeFlag != "") {
                                            completeLabs = completeLabs + ldata[i].name + ': ' + completeFlag + "<br />";
                                        }
                                    } else {
                                        completeLabs = completeLabs + ldata[i].name + ': ' + completeFlag + ldata[i].value + "<br />";
                                    }
                                }
                                if (ldata[i].name == "ANTI-CCP" && ldata[i].name != undefined) {
                                    if (ldata[i].flag == "NA" || ldata[i].flag == undefined) {
                                        completeFlag = "";
                                    }
                                    else {
                                        completeFlag = ldata[i].flag;
                                    }
                                    if (ldata[i].value == "") {
                                        if (completeFlag != "") {
                                            completeLabs = completeLabs + ldata[i].name + ': ' + completeFlag + "<br />";
                                        }
                                    } else {
                                        completeLabs = completeLabs + ldata[i].name + ': ' + completeFlag + ldata[i].value + "<br />";
                                    }

                                }
                                if (ldata[i].name == "VECTRA-DA" && ldata[i].name != undefined) {
                                    if (ldata[i].flag == undefined) {
                                        completeFlag = "";
                                    }
                                    else {
                                        completeFlag = ldata[i].flag;
                                    }
                                    if (ldata[i].value == "") {
                                        if (completeFlag != "") {
                                            completeLabs = completeLabs + ldata[i].name + ': ' + completeFlag + "<br />";
                                        }
                                    } else {
                                        completeLabs = completeLabs + ldata[i].name + ': ' + completeFlag + " " + ldata[i].value + "<br />";
                                    }
                                }
                            }//for end
                        }
                    }
                    var completeJointCount = "";
                    if (value.jointCount != undefined) {
                        var jointCount = value.jointCount;
                        completeJointCount = "Tender Count: " + jointCount.tcount + "<br>Swollen Count: " + jointCount.scount;
                    }
                    var completeOutcomeMeasures = "";
                    if (value.outcome != undefined) {
                        $.each(value.outcome, function(index, output) {
                            if (index.match("sdai")) {
                                if (value.outcome.sdai != undefined && value.outcome.sdai != "undefined" && value.outcome.sdai != "" && value.outcome.sdai != "null") {
                                    completeOutcomeMeasures = completeOutcomeMeasures + "SDAI: " + value.outcome.sdai + "<br />";
                                }
                            }
                            if (index.match("cdai")) {
                                if (value.outcome.cdai != undefined && value.outcome.cdai != "undefined" && value.outcome.cdai != "" && value.outcome.cdai != "null") {
                                    completeOutcomeMeasures = completeOutcomeMeasures + "CDAI: " + value.outcome.cdai + "<br />";
                                }
                            }
                            if (index.match("dasesr")) {
                                if (value.outcome.dasesr != undefined && value.outcome.dasesr != "undefined" && value.outcome.dasesr != "" && value.outcome.dasesr != "null") {
                                    completeOutcomeMeasures = completeOutcomeMeasures + "DAS28-ESR: " + value.outcome.dasesr + "<br />";
                                }
                            }
                            if (index.match("dascrp")) {
                                if (value.outcome.dascrp != undefined && value.outcome.dascrp != "undefined" && value.outcome.dascrp != "" && value.outcome.dascrp != "null") {
                                    completeOutcomeMeasures = completeOutcomeMeasures + "DAS28-CRP: " + value.outcome.dascrp + "<br />";
                                }
                            }
                            if (index.match("rapid3")) {
                                if (value.outcome.rapid3 != undefined && value.outcome.rapid3 != "undefined" && value.outcome.rapid3 != "" && value.outcome.rapid3 != "null" && value.outcome.rapid3.length != 0) {
                                    completeOutcomeMeasures = completeOutcomeMeasures + "PAS2: " + value.outcome.rapid3 + "<br />";
                                }
                            }
                        });
                    }
//                alert(completeProviderName + "\t" + completeVisitedDate + "\t" + completeLabs + "\t" + completeJointCount + "\t" + completeOutcomeMeasures);
                    $("#mainCompleteDiv").prepend("<div id = 'thirdTable" + index + "' class = 'panel panel-primary-head' />");
                    $("#thirdTable" + index).append("<div class='panel-heading' style='height:50px;' id='thirdTableHeading" + index + "' />");
//                    $("#thirdTableHeading" + index).append("<div class='pull-right' id='thirdTableHeading1Div" + index + "' />");
//                    $("#thirdTableHeading1Div" + index).append("<div class='btn-group' id='thirdTableHeading2Div" + index + "' />");
//                    $("#thirdTableHeading2Div" + index).append("<button data-toggle='dropdown' class='btn btn-sm mt5 btn-white noborder dropdown-toggle' type='button'>Show/Hide Columns <span class='caret'></span></button>");
//                    $("#thirdTableHeading2Div" + index).append("<ul role='menu' id='shCol" + index + "' class='dropdown-menu dropdown-menu-sm pull-right' />");
//                    $("#shCol" + index).append("<li><div class='ckbox ckbox-primary'><input type='checkbox' style='height:10px;' checked='checked' id='checkName" + index + "' value='0'><label for='checkName" + index + "'><b>Doctor Name</b></label></div></li>");
//                    $("#shCol" + index).append("<li><div class='ckbox ckbox-primary'><input type='checkbox' style='height:10px;' checked='checked' id='checkPosition" + index + "' value='1'><label for='checkPosition" + index + "'><b>Visited Date</b></label></div></li>");
//                    $("#shCol" + index).append("<li><div class='ckbox ckbox-primary'><input type='checkbox' style='height:10px;' checked='checked' id='checkOffice" + index + "' value='2'><label for='checkOffice" + index + "'><b>Labs</b></label></div></li>");
//                    $("#shCol" + index).append("<li><div class='ckbox ckbox-primary'><input type='checkbox' style='height:10px;' checked='checked' id='checkAge" + index + "' value='3'><label for='checkAge" + index + "'><b>Joint Count</b></label></div></li>");
//                    $("#shCol" + index).append("<li><div class='ckbox ckbox-primary'><input type='checkbox' style='height:10px;' checked='checked' id='checkDate" + index + "' value='4'><label for='checkDate" + index + "'><b>Outcome</b></label></div></li>");

                    //heading start
                    $("#thirdTableHeading" + index + "").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Complete Exam</b><span style='font-size:13px;'><br />Please click on column header to sort.</span></h3></center>");
                    $("#thirdTable" + index).append("<table id='shTable" + index + "' class='table table-striped table-bordered'>");
                    $("#shTable" + index).append("<thead class=''><tr><th>Doctor Name</th><th>Visited Date</th><th>Labs</th><th>Joint Count</th><th>Outcome Measures</th><th>Status</th></tr></thead>");
                    $("#shTable" + index).append("<tbody id='thirdTableBody" + index + "' />");

                    if (completeProviderName == "") {
                        completeProviderName = "N/A";
                    }
                    if (completeVisitedDate == "") {
                        completeVisitedDate = "N/A";
                    }
                    if (completeLabs == "") {
                        completeLabs = "N/A";
                    }
                    if (completeJointCount == "") {
                        completeJointCount = "N/A";
                    }
                    if (completeOutcomeMeasures == "") {
                        completeOutcomeMeasures = "N/A";
                    }


                    $("#thirdTableBody" + index).prepend("<tr><td style='width:15%;'>" + completeProviderName + "</td><td style='width:15%;'>" + completeVisitedDate + "</td><td style='width:20%;'>" + completeLabs + "</td><td style='width:15%;'>" + completeJointCount + "</td><td style='width:20%;'>" + completeOutcomeMeasures + "</td><td style='width:25%;'><button class='btn btn-primary' style='min-width:100%;width:auto;' onclick=reviewReport('" + patientId + "','" + value.encno + "','" + value._id.$oid + "')><b>Review<b></button><br/><br/><button class='btn btn-warning' style='min-width:100%;width:auto;' onclick=reviseLabs('" + value._id.$oid + "','" + patientId + "','" + value.encno + "')><b>Revise Labs<b></button></td></tr>");
//getting multiple lab values.
                    $.get(server_base_url + "/irheum-server/LabHistory", {
                        encounterid: value._id.$oid
                    }).done(function(data) {
                        if (data == invalidSession) {
                            callSessionTimeout();
                        } else {
                            var multipleLabs = data;
                            $.each(multipleLabs, function(index2, value) {
                                var ProviderName = "";
                                if (value.providername != undefined) {
                                    if (value.providername != "")
                                        ProviderName = value.providername;
                                }
                                var VisitedDate = "";
                                if (completeVisitedDate != "") {
                                    VisitedDate = completeVisitedDate;
                                }

                                var Labs = "";
                                var Comparator = "";
                                var Flag = "";
                                var Unit = "";
                                if (value.labs != "undefined") {
                                    var ldata = value.labs;
                                    for (var i = 0; i < ldata.length; i++) {
                                        if (ldata[i].name != "undefined") {
                                            if (ldata[i].name == "ESR" && ldata[i].name != undefined) {
                                                if (ldata[i].comparator == "NA" || ldata[i].comparator == undefined) {
                                                    Comparator = "";
                                                } else {
                                                    Comparator = ldata[i].comparator;
                                                }
                                                if (ldata[i].value != "") {
                                                    Unit = ldata[i].unit;
                                                }
                                                if (ldata[i].value == "") {
                                                } else {
                                                    Labs = Labs + ldata[i].name + ': ' + Comparator + ldata[i].value + " " + Unit + "<br />";
                                                }
                                            }

                                            if (ldata[i].name == "CRP" && ldata[i].name != undefined) {
                                                if (ldata[i].comparator == "NA" || ldata[i].comparator == undefined) {
                                                    Comparator = "";
                                                } else {
                                                    Comparator = ldata[i].comparator;
                                                }
                                                if (ldata[i].value != "") {
                                                    Unit = ldata[i].unit;
                                                }
                                                if (ldata[i].value == "") {
                                                } else {
                                                    Labs = Labs + ldata[i].name + ': ' + Comparator + ldata[i].value + " " + Unit + "<br />";
                                                }
                                            }

                                            if (ldata[i].name == "RF" && ldata[i].name != undefined) {
                                                if (ldata[i].flag == "NA" || ldata[i].flag == undefined) {
                                                    Flag = "";
                                                }
                                                else {
                                                    Flag = ldata[i].flag;
                                                }
                                                if (ldata[i].value == "") {
                                                    if (Flag != "") {
                                                        Labs = Labs + ldata[i].name + ': ' + Flag + "<br />";
                                                    }
                                                } else {
                                                    Labs = Labs + ldata[i].name + ': ' + Flag + ldata[i].value + "<br />";
                                                }
                                            }

                                            if (ldata[i].name == "ANTI-CCP" && ldata[i].name != undefined) {
                                                if (ldata[i].flag == "NA" || ldata[i].flag == undefined) {
                                                    Flag = "";
                                                }
                                                else {
                                                    Flag = ldata[i].flag;
                                                }
                                                if (ldata[i].value == "") {
                                                    if (Flag != "") {
                                                        Labs = Labs + ldata[i].name + ': ' + Flag + "<br />";
                                                    }
                                                } else {
                                                    Labs = Labs + ldata[i].name + ': ' + Flag + ldata[i].value + "<br />";
                                                }
                                            }

                                            if (ldata[i].name == "VECTRA-DA" && ldata[i].name != undefined) {
                                                if (ldata[i].flag == undefined) {
                                                    Flag = "";
                                                }
                                                else {
                                                    Flag = ldata[i].flag;
                                                }
                                                if (ldata[i].value == "") {
                                                    if (Flag != "") {
                                                        Labs = Labs + ldata[i].name + ': ' + Flag + "<br />";
                                                    }
                                                } else {
                                                    Labs = Labs + ldata[i].name + ': ' + Flag + " " + ldata[i].value + "<br />";
                                                }
                                            }

                                        }//for end
                                    }
                                }
                                var JointCount = "";
                                if (value.jointCount != undefined && value.jointCount != "undefined") {
                                    if (value.jointCount != "")
                                        var jointCount = value.jointCount;
                                    JointCount = "Tender Count: " + jointCount.tcount + "<br>Swollen Count: " + jointCount.scount;
                                }

                                var OutcomeMeasures = "";
                                if (value.outcome != undefined && value.outcome != "undefined") {
                                    if (value.outcome != "")
                                        $.each(value.outcome, function(index, output) {
                                            if (index.match("sdai")) {
                                                if (value.outcome.sdai != undefined && value.outcome.sdai != "undefined" && value.outcome.sdai != "" && value.outcome.sdai != "null") {
                                                    OutcomeMeasures = OutcomeMeasures + "SDAI: " + value.outcome.sdai + "<br />";
                                                }
                                            }
                                            if (index.match("cdai")) {
                                                if (value.outcome.cdai != undefined && value.outcome.cdai != "undefined" && value.outcome.cdai != "" && value.outcome.cdai != "null") {
                                                    OutcomeMeasures = OutcomeMeasures + "CDAI: " + value.outcome.cdai + "<br />";
                                                }
                                            }
                                            if (index.match("dasesr")) {
                                                if (value.outcome.dasesr != undefined && value.outcome.dasesr != "undefined" && value.outcome.dasesr != "" && value.outcome.dasesr != "null") {
                                                    OutcomeMeasures = OutcomeMeasures + "DAS28-ESR: " + value.outcome.dasesr + "<br />";
                                                }
                                            }
                                            if (index.match("dascrp")) {
                                                if (value.outcome.dascrp != undefined && value.outcome.dascrp != "undefined" && value.outcome.dascrp != "" && value.outcome.dascrp != "null") {
                                                    OutcomeMeasures = OutcomeMeasures + "DAS28-CRP: " + value.outcome.dascrp + "<br />";
                                                }
                                            }
                                            if (index.match("rapid3")) {
                                                if (value.outcome.rapid3 != undefined && value.outcome.rapid3 != "undefined" && value.outcome.rapid3 != "" && value.outcome.rapid3 != "null") {
                                                    OutcomeMeasures = OutcomeMeasures + "PAS2: " + value.outcome.rapid3 + "<br />";
                                                }
                                            }
                                        });
                                }

                                var RevisedDate = "";
                                if (value.createdate != undefined) {
                                    if (value.createdate != "")
                                        RevisedDate = "<b>Labs Revised on: <b>" + dateConversion(value.createdate);
                                }

                                if (ProviderName == "") {
                                    ProviderName = "N/A";
                                }
                                if (VisitedDate == "") {
                                    VisitedDate = "N/A";
                                }
                                if (Labs == "") {
                                    Labs = "N/A";
                                }
                                if (JointCount == "") {
                                    JointCount = "N/A";
                                }
                                if (OutcomeMeasures == "") {
                                    OutcomeMeasures = "N/A";
                                }

                                $("#thirdTableBody" + index).append("<tr><td>" + ProviderName + "</td><td>" + VisitedDate + "</td><td>" + Labs + "</td><td>" + JointCount + "</td><td>" + OutcomeMeasures + "</td><td>" + RevisedDate + "</td></tr>");
                            });
//jquery start -------------------------------------------------------------------------------------------------
//                    jQuery('#basicTable').DataTable({
//                        responsive: true
//                    });

                            var shTable = jQuery('#shTable' + index).DataTable({
                                "fnDrawCallback": function(oSettings) {
                                    jQuery('#shTable_paginate ul' + index).addClass('pagination-active-dark');
                                },
                                responsive: true
                            });
                            // Show/Hide Columns Dropdown
                            jQuery('#shCol' + index).click(function(event) {
                                event.stopPropagation();
                            });
                            jQuery('#shCol' + index + ' input').on('click', function() {

// Get the column API object
                                var column = shTable.column($(this).val());
                                // Toggle the visibility
                                if ($(this).is(':checked'))
                                    column.visible(true);
                                else
                                    column.visible(false);
                            });
                            // DataTables Length to Select2
                            jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                            jQuery('div.dataTables_length select').css({width: '60px'});
                            jQuery('div.dataTables_length select').select2({
                                minimumResultsForSearch: -1
                            });
//jquery end -------------------------------------------------------------------------------------------------
                        }
                    });
                }
            }); //main foreach end
        }
    }); //servlet end
    if (beginNewExamFlag == "true") {
        $("#beginNewExamBtnTd").text("").prepend("<button id='beginNewExamBtn' class = 'btn btn-success' style = 'margin-right:10px;' onclick=beginNewExam('" + patientId + "') > <b> Begin New Exam <b> </button>");
    }
}

function reviewReport(patientId, encNo, encId) {
    $('#searchId').val("");
    $("#searchMsg").text("");
    $("#dashboard-body").text("").append("<div id='showPdf' />");
    getReportDisplay("showPdf", encId, patientId, encNo);
}

function beginNewExam(patientId) {
    sessionStorage.removeItem("patientId");
    sessionStorage.setItem("patientId", patientId);

    if (!sessionStorage.getItem("RoleNames").match("Provider")) {
        getProviderListPopup(patientId);
    } else {
        $.get(server_base_url + "/irheum-server/BeginExamination", {
            patientid: patientId
        }).done(function(data) {
            if (data == fail) {
                location.href = "dashboard.jsp";
            } else if (data == unauthorized) {
                location.href = "dashboard.jsp";
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == statusException) {
                location.href = "dashboard.jsp";
            } else {
                sessionStorage.removeItem("patientId");
                sessionStorage.removeItem("encno");
                sessionStorage.removeItem("encId");
                sessionStorage.setItem("patientId", data.patientid);
                sessionStorage.setItem("encno", data.encno);
                sessionStorage.setItem("encId", data._id);
                location.href = "patientExam.jsp";
            }
        });
    }
}

function providerpopupmsg() {
    $("#providerPopupMsg").text("");
}

//popup for providers list
function getProviderListPopup(patientId) {
    $(".modal-backdrop").removeClass("fade in");
    $(".modal-backdrop").addClass("fade out");
    $("body").removeClass("pace-done modal-open");
    $(".modal-backdrop").remove();

    removeBeforeDashboardPopup();
    $("#mainDashboardDiv").append("<div id='providerSelectionPopupDiv' />");
    $("#providerSelectionPopupDiv").append("<div id='providerSelection' data-toggle='modal' data-target='.bs-example-modal-sm' />");
    $("#providerSelectionPopupDiv").append("<div id='popupProviderInside' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' data-backdrop='static' data-keyboard='false' />");
    $("#popupProviderInside").append("<div id='modalSm3' class='modal-dialog modal-sm' />");
    $("#modalSm3").append("<div id='modalContent3' class='modal-content' />");
    $("#modalContent3").append("<div class='modal-header' id='provider_close_btn' />");
    $("#provider_close_btn").append("<h4 class='modal-title'>Select Provider</h4>");
    $("#modalContent3").append("<div class='modal-body' id='selectProvider' />");
    $("#selectProvider").append("<div id='providerPopupButtonField' class='form-group' />");
    $("#providerPopupButtonField").append("<select id='selProvider' name='selectedProvider' class='form-control' onchange='providerpopupmsg()' /><span id='providerPopupMsg' />");
    $("#selProvider").append("<option value=''>Choose provider</option>");
    $("#select_prov_btn_id").remove();
    $("#selectProvider").append("<center><input class='btn btn-primary mr5' type='button' id='select_prov_btn_id' value='Select'></center>");
    $("#selectProvider").append("<br /><center><a href='javascript:closeProvidersListPopup()' style='font-size:16px;'>Close</a></center>");
    $("#providerSelection").click();

    $.get(server_base_url + "/irheum-server/ProviderList", {
    }).done(function(data) {
        if (data == fail || data == statusException || data == unauthorized) {
            location.href = "dashboard.jsp";
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $.each(data, function(index, value) {
                $.each(value, function(i, v) {
                    $("#selProvider").append("<option value='" + i + "^" + v + "'>" + v + "</option>");
                });
            });
        }
    });

    $('#select_prov_btn_id').click(function() {
        var temp = $("#selProvider").val().split("^");
        var providerId = temp[0];
        var providername = temp[1];
        if (providerId == "") {
            $("#selectProvider").addClass("has-error");
            $("#providerPopupMsg").text("").append("<span class='smallErrorMsg'>Please select provider.</span>");
        } else {
            $("#selectProvider").removeClass("has-error");
            $("#providerPopupMsg").text("");
            $.get(server_base_url + "/irheum-server/BeginExamination", {
                patientid: patientId, providerid: providerId, providername: providername
            }).done(function(data) {
                if (data == fail || data == statusException || data == unauthorized) {
                    location.href = "dashboard.jsp";
                } else if (data == invalidSession) {
                    callSessionTimeout();
                } else {
                    closeProvidersListPopup();
                    sessionStorage.removeItem("patientId");
                    sessionStorage.removeItem("encno");
                    sessionStorage.removeItem("encId");
                    sessionStorage.setItem("patientId", data.patientid);
                    sessionStorage.setItem("encno", data.encno);
                    sessionStorage.setItem("encId", data._id);
                    location.href = "patientExam.jsp";
                }
            });
        }
    });
}

function closeProvidersListPopup() {
    $("#provider_close_btn").append("<button aria-hidden='true' id='provider_close_onclick_btn' data-dismiss='modal' class='close' type='button'></button>")
    $("#provider_close_onlick_btn").click();
    $("#provider_close_onlick_btn").remove();

    $("#providerSelectionPopupDiv").remove();
    $(".modal-backdrop").removeClass("fade in");
    $(".modal-backdrop").addClass("fade out");
    $("body").removeClass("pace-done modal-open");
    $(".modal-backdrop").remove();
}

function resumeExistingExam(patientId, encno, encId) {
    if (patientId == null || patientId == "undefined" || patientId == "" || encno == null || encno == "undefined" || encno == "" || encId == "" || encId == null || encId == "undefined") {
        location.href = "dashboard.jsp";
    } else {
        sessionStorage.removeItem("patientId");
        sessionStorage.removeItem("encno");
        sessionStorage.removeItem("encId");
        sessionStorage.setItem("patientId", patientId);
        sessionStorage.setItem("encno", encno);
        sessionStorage.setItem("encId", encId);
        if (!sessionStorage.getItem("RoleNames").match("Provider") && !sessionStorage.getItem("RoleNames").match("Nurse")) {
            sessionStorage.setItem("divs", "PatientAssessment");
        } else {
            sessionStorage.removeItem("divs");
        }
        location.href = "patientExam.jsp";
    }
}

function reviseLabs(encId, patientId, encno) {
    sessionStorage.removeItem("patientId");
    sessionStorage.removeItem("encno");
    sessionStorage.removeItem("encId");
    sessionStorage.setItem("patientId", patientId);
    sessionStorage.setItem("encno", encno);
    sessionStorage.setItem("encId", encId);
    sessionStorage.setItem("reviseFlag", "yes");
    sessionStorage.setItem("divs", "Labs");
    location.href = "patientExam.jsp";
}

function beginExamConfirmationPopup(patientId) {
    $.get(server_base_url + "/irheum-server/BeginExaminationConfirmation", {
    }).done(function(data) {
        if (data == invalidSession) {
            callSessionTimeout();
        } else {
            removeBeforeDashboardPopup();
            $("#beginExamCnfpopup").text("").append("<div class='modal fade' id='beginExamConfirmationModel' tabindex='-1' role='dialog' aria-labelledby='mybeginExamConfirmationModelLabel' aria-hidden='true' data-backdrop='static' data-keyboard='false' />");
            $("#beginExamConfirmationModel").text("").append("<div id='chooseRadam' data-toggle='modal' data-target='#beginExamConfirmationModel' />");
            $("#beginExamConfirmationModel").append("<div id='beginExamConfirmationModelDialog' class='modal-dialog' />");
            $("#beginExamConfirmationModelDialog").append("<div id='beginExamConfirmationModelContent' class='modal-content' />");
            $("#beginExamConfirmationModelContent").append("<div id='mybeginExamConfirmationDivId' class='modal-header'><h4 class='modal-title' id='mybeginExamConfirmationModelLabel'>Info</h4></div>");
            $("#beginExamConfirmationModelContent").append("<div class='modal-body'>" + data + "</div>");
            $("#beginExamConfirmationModelContent").append("<div class='modal-footer'><button class='btn btn-default' onclick=cancelBeginExam() >No, Cancel</button><button class='btn btn-primary' onclick=beginNewExam('" + patientId + "')>Yes, Proceed</button></div>");
            $("#chooseRadam").click();
        }
    });
}

function cancelBeginExam() {
    $("#mybeginExamConfirmationDivId").append("<button aria-hidden='true' id='closeBigenExamConfiramtionOnclickBtn' data-dismiss='modal' class='close' type='button'></button>");
    $("#closeBigenExamConfiramtionOnclickBtn").click();
    $("#closeBigenExamConfiramtionOnclickBtn").remove();
}