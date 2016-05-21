//patient_exam.jsp body onload function
function patientExamDefaults() {
    userValidation(); //if user is invalid it redirects to index
    window.history.forward(-1);
//    if (checkUserPrivelege("ChangeResumePin") == true) {
//        checkResumePin();
//    }
    getPatientSessionElements();//getting session elements
    patientDisplayElements(); //for displaying user information
    hideAllDivs();
    patientFieldsDataOnload(); //to get all displaying data from backend
    comments($("#pid").val());
    if (getUserSessionElement("patientId") == null || getUserSessionElement("patientId") == undefined || getUserSessionElement("patientId") == "") {
        callDashboard();
    }

    setTimeout(function() {
        $("#jcBeforeSuccessMsg").text("");
        $("#jcAfterSuccessMsg").text("");
    }, 3000);

    var divs = getUserSessionElement("divs");
    if (divs == "Labs") {
        disableAllMenus();
        showLabs();
        $("#importLabsId").remove();
    } else if (divs == "PatientAssessment") {
        if (checkUserRole("Provider") == false && checkUserRole("Nurse") == false) {
            showPatientSelfAssessment();
        }
    } else {
        sessionStorage.removeItem("divs");
        if (checkUserPrivelege("JointCount") == true) {
            showJointCount();
        }
    }
}

//storing data into hidden fields
function getPatientSessionElements() {
    var patientId = getUserSessionElement("patientId");
    var encno = getUserSessionElement("encno");
    var encId = getUserSessionElement("encId");
    $("#patientInfo").append("<input id='pid' type='hidden' value='" + patientId + "' />");
    $("#patientInfo").append("<input id='encno' type='hidden' value='" + encno + "' />");
    $("#patientInfo").append("<input id='encid' type='hidden' value='" + encId + "' />");
}

function patientDisplayElements() {
    prepareLeftSideMenus();
    $.post(server_base_url + "/irheum-server/patientinfo", {
        patientid: $("#pid").val()
    }).done(function(data) {
        if (data == invalidSession) {
            callSessionTimeout();
        } else if (data != fail || data != unauthorized) {
            var fname = "";
            var lname = "";
            var dob = "";
            var gender = "";
            if (data.fname != "undefined" && data.fname != undefined && data.fname != "") {
                fname = data.fname;
            }
            if (data.lname != "undefined" && data.lname != undefined && data.lname != "") {
                lname = data.lname;
            }
            if (data.dob != "undefined" && data.dob != undefined && data.dob != "") {
                dob = getAge(data.dob) + "yrs\t\t";
            }
            if (data.gender != "undefined" && data.gender != undefined && data.gender != "") {
                gender = data.gender;
            }
            $("#patientDispId").text("").append("<span style='text-transform:capitalize;margin-left:10px;color:green;font-size:18px;'>\t" + fname + "\t" + lname + "</span>\t&nbsp;" + dob + gender);
        }
    });
    $("#pat-currentUserId").text("").append(getUserSessionElement("LoginId"));
    $("#pat-currentOrgId").text("").append(" " + getUserSessionElement("user_selected_org"));

//creating menus
    $("#patientExamMenus").text("").append("<li class='divider'></li>");
    $("#patientExamMenus").append("<li><a href='javascript:logout()'><i class='glyphicon glyphicon-log-out'></i>Logout</a></li>");

    $("#patientExamMenus").prepend("<li id='showProfileMenu'><a href='javascript:callMyProfile()'><i class='glyphicon glyphicon-user'></i> My Profile</a></li>");

    if (checkUserPrivelege("RegisterUser") == true) {
        $("#addUserMenu").remove();
        $("#patientExamMenus").prepend("<li id='addUserMenu'><a href='javascript:callUserManagement();'><i class='glyphicon glyphicon-star' /><span>User Management</span></a></li>");
    } else {
        $("#addUserMenu").remove();
    }

    if (checkUserPrivelege("PhysicianPreference") == true) {
        $("#showPreferencesMenu").remove();
        $("#patientExamMenus").prepend("<li id='showPreferencesMenu'><a href='javascript:callPhysicianPreference();'><i class='glyphicon glyphicon-cog'></i> Preferences</a></li>");
    } else {
        $("#showPreferencesMenu").remove();
    }
}

//onload calling all functions to get data from backend start
function patientFieldsDataOnload() {
    getLeftSideMenusData();
    $("#completeExamMenu").text("").append("<a href='javascript:completeExam()'><i class='glyphicon glyphicon-ok'></i><span>Complete Exam</span></a>");
}//onload calling all functions to get data from backend end

//return to dashboard
function callDashboard() {
    sessionStorage.removeItem("divs");
    sessionStorage.removeItem("patientId");
    sessionStorage.removeItem("encno");
    sessionStorage.removeItem("encId");
    sessionStorage.removeItem("reviseFlag");
    location.href = "dashboard.jsp";
}

function callPatientDashboard() {
    sessionStorage.setItem("dashboard-div", "patient");
    sessionStorage.removeItem("divs");
    sessionStorage.removeItem("patientId");
    sessionStorage.removeItem("encno");
    sessionStorage.removeItem("encId");
    sessionStorage.removeItem("reviseFlag");
    sessionStorage.setItem("patientId", $("#pid").val());
    location.href = "dashboard.jsp";
}

function callPhysicianPreference() {
    sessionStorage.setItem("dashboard-div", "preferences");
    callDashboard();
}
function callUserManagement() {
    sessionStorage.setItem("dashboard-div", "usermanagement");
    callDashboard();
}
function callMyProfile() {
    sessionStorage.setItem("dashboard-div", "profile");
    callDashboard();
}

function getLeftSideMenusData() {
    $.get(server_base_url + "/irheum-server/ResumeExamination", {
        patientid: $("#pid").val(),
        encno: $("#encno").val()
    }).done(function(data) {
        if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $.each(data, function(index, value) {
//            alert(index + "\t" + value);
                //for jointcount
                if (index == "jointCount") {
                    if (data.jointCount != "undefined") {
                        if (data.jointCount != undefined || data.jointCount != "") {
                            if (data.jointCount.tcount != undefined || data.jointCount.tcount != "undefined" || data.jointCount.tcount != "") {
                                $("#leftTender").text("").text(data.jointCount.tcount + "T/" + data.jointCount.scount + "S");
                            } else {
                                $("#leftTender").text("");
                            }
                        }
                    }
                }

                //for labs
                if (index == "labs") {
                    var comparator = "";
                    var flag = "";
                    var unit = "";
                    if (data.labs != "undefined") {
                        if (data.labs != undefined && data.labs != "") {
                            for (var i = 0; i < data.labs.length; i++) {
                                if (data.labs[i].name == "ESR" && data.labs[i].name != "undefined") {
                                    if (data.labs[i].comparator == "NA" || data.labs[i].comparator == undefined || data.labs[i].comparator == "") {
                                        comparator = "";
                                    } else {
                                        comparator = data.labs[i].comparator;
                                    }
                                    if (data.labs[i].value != "") {
                                        unit = data.labs[i].unit;
                                    } else {
                                        unit = "";
                                    }
                                    $("#leftEsr").text("").text(comparator + data.labs[i].value + " " + unit);
                                }
                                if (data.labs[i].name == "CRP" && data.labs[i].name != "undefined") {
                                    if (data.labs[i].comparator == "NA" || data.labs[i].comparator == undefined || data.labs[i].comparator == "") {
                                        comparator = "";
                                    } else {
                                        comparator = data.labs[i].comparator;
                                    }
                                    if (data.labs[i].value != "") {
                                        unit = data.labs[i].unit;
                                    } else {
                                        unit = "";
                                    }
                                    $("#leftCrp").text("").text(comparator + data.labs[i].value + " " + unit);
                                }
                                if (data.labs[i].name == "RF" && data.labs[i].name != "undefined") {
//                                    if (data.labs[i].flag == "NA" || data.labs[i].flag == undefined || data.labs[i].flag == "") {
                                    if (data.labs[i].flag == undefined || data.labs[i].flag == "") {
                                        flag = "";
                                    } else if (data.labs[i].flag == "NA" && data.labs[i].value != undefined && data.labs[i].value != "") {
                                        flag = "";
                                    } else {
                                        flag = data.labs[i].flag;
                                    }
                                    $("#leftRf").text("").text(flag + data.labs[i].value);
                                }
                                if (data.labs[i].name == "ANTI-CCP" && data.labs[i].name != "undefined") {
//                                    if (data.labs[i].flag == "NA" || data.labs[i].flag == undefined || data.labs[i].flag == "") {
                                    if (data.labs[i].flag == undefined || data.labs[i].flag == "") {
                                        flag = "";
                                    } else if (data.labs[i].flag == "NA" && data.labs[i].value != undefined && data.labs[i].value != "") {
                                        flag = "";
                                    } else {
                                        flag = data.labs[i].flag;
                                    }
                                    $("#leftAnticcp").text("").text(flag + data.labs[i].value);
                                }
                                if (data.labs[i].name == "VECTRA-DA" && data.labs[i].name != "undefined") {
                                    if (data.labs[i].flag == undefined || data.labs[i].flag == "") {
                                        flag = "";
                                    } else {
                                        flag = data.labs[i].flag;
                                    }
                                    $("#leftVectrada").text("").text(flag + " " + data.labs[i].value);
                                }
                            }
                        }
                    }
                }
                //for physician assessment
                if (index == "phyassessments") {
                    if (data.phyassessments != "undefined") {
                        if (data.phyassessments != undefined || data.phyassessments != "" || data.phyassessments != "null") {
                            $.each(data.phyassessments, function(c1, c2) {
                                if (c1.match("raSeverity")) {
                                    if (c2 != undefined && c2 != "undefined" && c2 != null && c2 != "null") {
                                        $("#leftRaseverity").text("").text(c2);
                                    } else {
                                        $("#leftRaseverity").text("");
                                    }
                                }
                            });
                        }
                    }
                }

                //for outcome measures
                if (index == "outcome") {
                    if (data.outcome != "undefined") {
                        if (data.outcome != undefined || data.outcome != "") {
                            if (data.outcome.sdai != "undefined") {
                                if (data.outcome.sdai != undefined && data.outcome.sdai != "" && data.outcome.sdai != "null") {
                                    $("#leftSdai").text("").text(data.outcome.sdai);

                                    $("#outcomeMeasuresTable").append("<tr id='sdaiTr' />");
                                    $("#sdaiTr").text("").append("<td style='width:40%;'>SDAI</td><td style='width:60%;'>" + data.outcome.sdai + "</td>");
                                } else {
                                    $("#leftSdai").text("");
                                    $("#outcomeMeasuresTable").append("<tr id='sdaiTr' />");
                                    $("#sdaiTr").text("").append("<td style='width:40%;'>SDAI</td><td style='width:60%;'>NA</td>");
                                }
                            }

                            if (data.outcome.cdai != "undefined") {
                                if (data.outcome.cdai != undefined && data.outcome.cdai != "" && data.outcome.cdai != "null") {
                                    $("#leftCdai").text("").text(data.outcome.cdai);

                                    $("#outcomeMeasuresTable").append("<tr id='cdaiTr' />");
                                    $("#cdaiTr").text("").append("<td>CDAI</td><td>" + data.outcome.cdai + "</td>");
                                } else {
                                    $("#leftCdai").text("");
                                    $("#outcomeMeasuresTable").append("<tr id='cdaiTr' />");
                                    $("#cdaiTr").text("").append("<td>CDAI</td><td>NA</td>");
                                }
                            }

                            if (data.outcome.dasesr != "undefined") {
                                if (data.outcome.dasesr != undefined && data.outcome.dasesr != "" && data.outcome.dasesr != "null") {
                                    $("#leftDasesr").text("").text(data.outcome.dasesr);

                                    $("#outcomeMeasuresTable").append("<tr id='dasesrTr' />");
                                    $("#dasesrTr").text("").append("<td>DAS28-ESR</td><td>" + data.outcome.dasesr + "</td>");
                                } else {
                                    $("#leftDasesr").text("");
                                    $("#outcomeMeasuresTable").append("<tr id='dasesrTr' />");
                                    $("#dasesrTr").text("").append("<td>DAS28-ESR</td><td>NA</td>");
                                }
                            }

                            if (data.outcome.dascrp != "undefined") {
                                if (data.outcome.dascrp != undefined && data.outcome.dascrp != "" && data.outcome.dascrp != "null") {
                                    $("#leftDascrp").text("").text(data.outcome.dascrp);

                                    $("#outcomeMeasuresTable").append("<tr id='dascrpTr' />");
                                    $("#dascrpTr").text("").append("<td>DAS28-CRP</td><td>" + data.outcome.dascrp + "</td>");
                                } else {
                                    $("#leftDascrp").text("");
                                    $("#outcomeMeasuresTable").append("<tr id='dascrpTr' />");
                                    $("#dascrpTr").text("").append("<td>DAS28-CRP</td><td>NA</td>");
                                }
                            }

                            if (data.outcome.rapid3 != "undefined") {
                                if (data.outcome.rapid3 != undefined && data.outcome.rapid3 != "" && data.outcome.rapid3 != "null") {
                                    $("#leftRapid3").text("").text(data.outcome.rapid3);

                                    $("#outcomeMeasuresTable").append("<tr id='rapid3Tr' />");
                                    $("#rapid3Tr").text("").append("<td>PAS2</td><td>" + data.outcome.rapid3 + "</td>");
                                } else {
                                    $("#leftRapid3").text("");
                                    $("#outcomeMeasuresTable").append("<tr id='rapid3Tr' />");
                                    $("#rapid3Tr").text("").append("<td>PAS2</td><td>NA</td>");
                                }
                            }
                        }
                    }
                }
            });
        }
    });
}

function viewPriorAssessmentReport(encid, encno) {
    hideAllDivs();
    $("#priorAssessmentReport").show();
    getReportDisplay("priorAssessmentReport", encid, $("#pid").val(), encno);
}

function showJointCount() {
    $('html,body').scrollTop(0);
    hideAllDivs();
    $("input").attr('disabled', false);
    $("button").attr('disabled', false);
    if (checkUserPrivelege("JointCount") == true) {
        addHover("jointCountMenu");
        $("#jointCountDiv").show();
        getJointCountData();
    }
}
function showLabs() {
    if (checkUserPrivelege("LabManagement") == true) {
        getPatientLabsForm();
        getLabsData();
        hideAllDivs();
        addHover("labsMenu");
        $("#labsDiv").show();
        enableLabFields();
        $("#labsSubmitButton").show();
        getLabAnalytics();
    }
}

//-------------------------patient assessment mode-----------------------------------------------
function showPatientAssessmentMode() {
    var divs = getUserSessionElement("divs");
    if (divs == "PatientAssessment") {
        if (checkUserRole("Provider") == false && checkUserRole("Nurse") == false) {
            showPatientSelfAssessment();
        }
    } else {
        removeBeforePopup();
        $("#patientAssessmentPopup").text("").append("<div id='patientSelectionPopupDiv' />");
        $("#patientSelectionPopupDiv").text("").append("<div id='patientSelection' data-toggle='modal' data-target='.bs-example-modal-sm' />");
        $("#patientSelectionPopupDiv").append("<div id='popupPatientInside' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' data-backdrop='static' data-keyboard='false' />");
        $("#popupPatientInside").append("<div id='modalSmPatientAssessment' class='modal-dialog modal-sm' />");
        $("#modalSmPatientAssessment").append("<div id='modalContentPatientAssessment' class='modal-content' />");
        $("#modalContentPatientAssessment").append("<div class='modal-header' id='closePatientBtn' />");
        $("#closePatientBtn").text("").append("<h4 class='modal-title'>Select Assessment</h4>");
        $("#modalContentPatientAssessment").append("<div class='modal-body' id='selectPatient' />");
        $("#selectPatient").text("").append("<button class='btn btn-success' style='width:100%;' onclick='showPatientAssessment()'><b>Office Assessment</b></button><br /><br /><button id='selfAssessmentButton' class='btn btn-success' style='width:100%;' onclick='showPatientSelfAssessment()'><b>Self Assessment</b></button><br /><br /><center><a href='javascript:closePatientAssessment()' style='font-size:16px;'>Cancel</a></center>");
        $("#patientSelection").click();
    }
}

function closePatientAssessment() {
    $("#closePatientBtn").append("<button aria-hidden='true' id='closePatientOnclickBtn' data-dismiss='modal' class='close' type='button'></button>")
    $("#closePatientOnclickBtn").click();
    $("#closePatientOnclickBtn").remove();
}

function showPatientAssessment() {
    closePatientAssessment();
    hideAllDivs();
    $("#patientAssesmentDiv").show();
    $("#patientAssessmentMenu").show();
    addHover("patientAssessmentMenu");
    getPatientAssementMenus();
    $("#radamClick").hide();
    setTimeout(function() {
        $("#haq2Click").click();
    }, 500);
//    $('#haq2Click').attr('class', 'disabled active');
}

function setRolesAndPriveleges(data) {
    var orgNames = "";
    var privileges = "";
    var roleNames = "";
    var orgrole = data.orgRole;

    for (var m = 0; m < orgrole.length; m++) {
        var orgnames = orgrole[m];
        $.each(orgnames, function(index, value) {
            if (index == "role") {
                var data = value;
                $.each(data, function(index, value) {
                    var data = value;
                    $.each(data, function(index, value) {
                        if (index == "rolename") {
                            roleNames = roleNames + value + ",";
                        }
                        if (index == "privilege") {
                            var data1 = value;
                            $.each(data1, function(index, value) {
                                var data2 = value;
                                $.each(data2, function(index, value) {
                                    if (index == "name") {
                                        privileges = privileges + value + ",";
                                    }//for priveleges names end
                                });
                            });
                        }//for privelege end
                    });//for rolenames end
                });
            }//for role end
            if (index == "org") {
                var data = value;
                $.each(data, function(index, value) {
                    if (index == "orgname") {
                        orgNames = orgNames + value + ",";
                    }
                    if (index == "radamflag") {
                        sessionStorage.setItem("Questionere", value);
                    }
                });
            }//for orgnames end
        });
    }//for end
    privileges = privileges.substring(0, privileges.length - 1);
    roleNames = roleNames.substring(0, roleNames.length - 1);
//for roles,orgs,priveleges end
//        alert(privileges + "\tprivs");
    //        alert(roleNames + "\troles");
    sessionStorage.setItem("Privileges", privileges);
    sessionStorage.setItem("RoleNames", roleNames);
}

function showPatientSelfAssessment() {
    $("#selfAssessmentButton").remove();
    closePatientAssessment();
    $("#firstDoneClick").hide();

    if (checkUserPrivelege("ChangeResumePin") == true) {
        checkResumePin();
    }

    $.get(server_base_url + "/irheum-server/PatientSelfAssessment", {
    }).done(function(data) {
        if (data == invalidSession) {
            callSessionTimeout();
        } else if (data != unauthorized || data != fail || data != null || data != "" || data != undefined) {
            setRolesAndPriveleges(data);
        }
    });
    if (checkUserPrivelege("PatientAssessment") == true) {
        hideAllDivs();
        hideAllMenus();
        $("#patientAssesmentDiv").show();
        $("#patientAssessmentMenu").show();
        addHover("patientAssessmentMenu");
        $("#reviewPatientHistoryMenu").show();
        $("#logoutMenu").show();
        $("#showPreferencesMenu").remove();
        $("#showProfileMenu").remove();
        sessionStorage.setItem("divs", "PatientAssessment");

        jQuery.gritter.add({
            title: '<span style="font-size:16px;color:white;">Self assessment activated.</span>',
            text: '<span style="font-size:15px;color:white;"><b>Please answer all questions.</b></span>',
            class_name: 'growl-success',
            sticky: false,
            time: '2000',
            before_open: function() {
                if ($('.gritter-item-wrapper').length == 1) {
                    return false;
                }
            }
        });

        getPatientAssementMenus();
        setTimeout(function() {
            $("#haq2Click").click();
        }, 500);
//        $('#haq2Click').attr('class', 'disabled active');
        $.get(server_base_url + "/irheum-server/FetchRadamConsent", {
            patientid: $("#pid").val()
        }).done(function(data) {
            if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == "Pending") {
                $("#radamClick").hide();
                $("#firstDoneClick").show();
            } else if (data == "yes") {
                if (getUserSessionElement("Questionere") == "no") {
                    $("#firstDoneClick").show();
                } else {
                    $("#firstDoneClick").remove();
                }
                $("#radamClick").show();
                $("#radamClick").click();
            } else if (data == "no") {
                $("#radamClick").remove();
                $("#firstDoneClick").show();
            } else {
                $("#radamClick").hide();
                $("#firstDoneClick").show();
            }
            if (getUserSessionElement("Questionere") == "no") {
                $("#firstDoneClick").show();
            }
        });
    }
}

function donePatientAssessment() {
    getPendingAssessments();
    getLeftSideMenusData();
}

function getRadamPopup() {
    removeBeforePopup();
    $("#radamPopup").text("").append("<div class='modal fade' id='radamModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' data-backdrop='static' data-keyboard='false' />");
    $("#radamModal").text("").append("<div id='chooseRadam' data-toggle='modal' data-target='#radamModal' />");
    $("#radamModal").append("<div id='radamModalDialog' class='modal-dialog' />");
    $("#radamModalDialog").append("<div id='radamModalContent' class='modal-content' />");
    $("#radamModalContent").append("<div class='modal-header'><h4 class='modal-title' id='myModalLabel'>Thank you for answering your clinical visit questionnaire.</h4></div>");
    $("#radamModalContent").append("<div class='modal-body'>If you have a moment, we would appreciate you answering some additional questions similar to those you just answered as part of a study sponsored by the Rheumatology Research Foundation. If you answer these, they will be asked during each of your rheumatology visits here until June 2016. The purpose of the study is to test what questions are most helpful to ask patients like you in rheumatology clinics around the US to better assess how you are doing.</div>");

//footer
    $("#radamModalContent").append("<div class='modal-footer' id='radamModalContentFooter' />");
    $("#radamModalContentFooter").text("").append("<span style='color:blue;float:left;'>Signature</span><br /><div><div id='content'><div id='signatureparent'><div id='signature'></div></div><div id='tools'></div><div><div id='displayarea' style='display:none'></div></div></div></div><br />");
    prepareSignaturePreload();
    prepareSignature();
    setTimeout(function() {
        prepareSignatureForm();
    }, 500);

//buttons    
    $("#radamModalContentFooter").append("<span id='displaySignatureMsg' /><hr><a href=javascript:closeRadam() style='float:left;margin-top:10px;'>Cancel</a>&nbsp;&nbsp;&nbsp;<button class='btn btn-danger' onclick=saveRadam('no')>No thanks i'm done.</button><button class='btn btn-success' onclick=saveRadam('yes')>Sure, ask away.</button>");
    $("#chooseRadam").click();
}

function closeRadam() {
    $("#radamModal").append("<div id='closeRadamPopup' class='btn btn-default' data-dismiss='modal' />");
    $("#closeRadamPopup").click();
    $("#closeRadamPopup").remove();
}

function saveRadam(status) {
    var sign = "";
    if (status == "yes") {
        $("#conversionOptionId").val("svgbase64").change();
        if ($('textarea#imageStringId').val() == "image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMCIgaGVpZ2h0PSIwIj48L3N2Zz4=") {
            displaySmallErrorMessages("displaySignatureMsg", "<center>Enter the signature.</center>");
            return false;
        } else {
            $("#displaySignatureMsg").text("");
            sign = "data:" + $('textarea#imageStringId').val();
        }
    }

    $.get(server_base_url + "/irheum-server/UpdateRadamConsent", {
        patientid: $("#pid").val(), RadamConsent: status, signature: sign
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", failMessage);
            displayLargeErrorMessages("afterRadamMessage", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", unauthorizedMessage);
            displayLargeErrorMessages("afterRadamMessage", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", statusExceptionMessage);
            displayLargeErrorMessages("afterRadamMessage", statusExceptionMessage);
        } else if (data == success) {
            closeRadam();
            if (status == "yes") {
                $("#historyClick").removeClass("active");
                $("#history").removeClass("active");
                $("#priorMedsClick").removeClass("active");
                $("#priorMeds").removeClass("active");
                $("#haq2Click").removeClass("active");
                $("#haq2").removeClass("active");
                $("#painClick").removeClass("active");
                $("#pain").removeClass("active");
                $("#fatigueClick").removeClass("active");
                $("#fatigue").removeClass("active");
                $("#pgaClick").removeClass("active");
                $("#pga").removeClass("active");
                $("#radamClick").removeClass("active");
                $("#radam").removeClass("active");
                $("#firstDoneClick").hide();
                $("#radamClick").show();
                $("#radamClick").addClass("active");
                $("#radam").addClass("active");
                $("#radamClick").click();
            } else if (status == "no") {
                $(".modal-backdrop").removeClass("fade in");
                $(".modal-backdrop").addClass("fade out");
                $("body").removeClass("pace-done modal-open");
                $(".modal-backdrop").remove();
                $("#radamClick").remove();
                $("#radam").remove();
                closePatientAssessmentsQuestions();
            }
        }
    });
}

function getPendingAssessments() {
    $.get(server_base_url + "/irheum-server/FetchPendingAssessments", {
        patientid: $("#pid").val(), encno: $("#encno").val()
    }).done(function(data) {
        if (data != fail && data != unauthorized && data != statusException) {
            if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == success) {
                if (getUserSessionElement("Questionere") == "yes" && checkUserRole("Patient") == true) {
                    $.get(server_base_url + "/irheum-server/FetchRadamConsent", {
                        patientid: $("#pid").val()
                    }).done(function(data) {
                        if (data == invalidSession) {
                            callSessionTimeout();
                        } else if (data == "Pending") {
                            getRadamPopup();
                        } else if (data == "yes") {
                            if (getUserSessionElement("Questionere") == "no") {
                                $("#firstDoneClick").show();
                            } else {
                                $("#firstDoneClick").remove();
                            }
                            $("#radamClick").show();
                            $("#radamClick").click();
                            closePatientAssessmentsQuestions();
                        } else if (data == "no") {
                            $("#radamClick").remove();
                            $("#firstDoneClick").show();
                            closePatientAssessmentsQuestions();
                        } else {
                            closePatientAssessmentsQuestions();
                        }
                    });
                } else {
                    closePatientAssessmentsQuestions();
                }
            } else if (data.length > 0) {
                removeBeforePopup();
                $("#pendingAssessmentsPopup").text("").append("<div class='modal fade' id='pendingAssessmentsModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' data-backdrop='static' data-keyboard='false' />");
                $("#pendingAssessmentsModal").text("").append("<div id='choosePendingAssessments' data-toggle='modal' data-target='#pendingAssessmentsModal' />");
                $("#pendingAssessmentsModal").append("<div id='pendingAssessmentsModalDialog' class='modal-dialog' />");
                $("#pendingAssessmentsModalDialog").append("<div id='pendingAssessmentsModalContent' class='modal-content' />");
                $("#pendingAssessmentsModalContent").append("<div class='modal-header'><h4 class='modal-title' id='myModalLabel'>" + pendingAssessmentsMessage + "</h4></div>");
                $("#pendingAssessmentsModalContent").append("<div class='modal-body' id='pendingAssessmentsModalContentBody' />");
                $("#pendingAssessmentsModalContentBody").text("");

                for (var i = 0; i < data.length; i++) {
                    $("#pendingAssessmentsModalContentBody").append("<a href=javascript:getPendingQuestionGroup('" + data[i] + "') style='color:blue;font-size:18px;'><b>" + data[i] + "</b></a><br /><br />");
                }

                //exit link
                $("#pendingAssessmentsModalContentBody").append("<br /><a href=javascript:exitPA() style='font-size:18px;float:right;'><b>Exit</b>&nbsp;<span class='glyphicon glyphicon-forward'></span></a><br />");

                $("#pendingAssessmentsModalContent").append("<div class='modal-footer' id='pendingAssessmentsModalContentFooter' />");
                $("#pendingAssessmentsModalContentFooter").text("").append("<center><a href=javascript:closePendingAssessments() style='margin-top:10px;font-size:16px;'>Close</a></center>");
                $("#choosePendingAssessments").click();
                return false;
            }
        }
    });
}

function exitPA() {
    $(".modal-backdrop").removeClass("fade in");
    $(".modal-backdrop").addClass("fade out");
    $("body").removeClass("pace-done modal-open");
    $(".modal-backdrop").remove();
    closePendingAssessments();
    closePatientAssessmentsQuestions();
}

function closePatientAssessmentsQuestions() {
    getLeftSideMenusData();
    if (checkUserRole("Patient") == true) {
        if (getUserSessionElement("divs") == "PatientAssessment") {
            getPatientAssessmentMode();
        } else {
            showAllMenus();
            showJointCount();
        }
    } else {
        showAllMenus();
        showJointCount();
    }
}

function closePendingAssessments() {
    $("#pendingAssessmentsModal").append("<div id='closePendingAssessmentsPopup' class='btn btn-default' data-dismiss='modal' />");
    $("#closePendingAssessmentsPopup").click();
    $("#closePendingAssessmentsPopup").remove();
}

function getPendingQuestionGroup(name) {
    $("#patientAssessmentUl li.active").removeClass('active');
    removeSomeClass("haq2", "active");
    removeSomeClass("pain", "active");
    removeSomeClass("fatigue", "active");
    removeSomeClass("stiffness", "active");
    removeSomeClass("pga", "active");
    removeSomeClass("history", "active");
    removeSomeClass("priorMeds", "active");
    removeSomeClass("radam", "active");

    if (name == "HAQII") {
        addSomeClass("haq2", "active");
        addSomeClass("haq2Click", "active");
    }
    if (name == "Pain") {
        addSomeClass("pain", "active");
        addSomeClass("painClick", "active");
    }
    if (name == "Fatigue") {
        addSomeClass("fatigue", "active");
        addSomeClass("fatigueClick", "active");
    }
    if (name == "Stiffness") {
        addSomeClass("stiffness", "active");
        addSomeClass("stiffnessClick", "active");
    }
    if (name == "Pga") {
        addSomeClass("pga", "active");
        addSomeClass("pgaClick", "active");
    }
    if (name == "History") {
        addSomeClass("history", "active");
        addSomeClass("historyClick", "active");
    }
    if (name == "PriorMed") {
        addSomeClass("priorMeds", "active");
        addSomeClass("priorMedsClick", "active");
    }
    closePendingAssessments();
}

function getPatientAssessmentMode() {
    removeBeforePopup();
    $("#resumePinPopup").text("").append("<div id='resumePinPopupMainDiv' class='locked' />");
    $("#resumePinPopupMainDiv").append("<div id='resumePinPopupSubDiv' class='lockedpanel' />");
    $("#resumePinPopupSubDiv").append("<div class='logged'><h4>Thank You!</h4><h5 class='text-muted'><b>Please notify the office staff.</b></h5></div>");
    $("#resumePinPopupSubDiv").append("<div id='resumePinPopupBodyDiv' />");
    $("#resumePinPopupBodyDiv").text("").append("<br /><br /><div id='resumePinInsideDiv' class='input-group' /><br /><br/>");
    $("#resumePinInsideDiv").append("<span class='input-group-addon'><i class='glyphicon glyphicon-lock'></i></span><input type='password' id='userResumePin' class='form-control' placeholder='Enter Pin' size=4 maxlength=4 onkeyup='resumePinKeyup(event)' />");
    $("#resumePinPopupBodyDiv").append("<button id='removeLockbutton' onclick='removeLock()' class='btn btn-success btn-block'><b>Verify PIN</b></button><br /><a href='javascript:closeResumePinPopup()'>Close</a>");
    $("#resumePinPopupSubDiv").append("<div id='resumePinMsg' />");
    $("#userResumePin").focus();
}

function closeResumePinPopup() {
    $('.locked').fadeOut(function() {
        $(this).remove();
    });
}

function resumePinKeyup(event) {
    if ($("#userResumePin").val() != "") {
        $("#resumePinMsg").text("");
    }
    if (event.which == 13) {
        removeLock();
        return false;
    }
}

function removeLock() {
//    alert($("#userResumePin").val().length);
    if ($("#userResumePin").val().length < 4) {
        displayLargeErrorMessages("resumePinMsg", "<br />Please enter valid pin.");
    } else if ($("#userResumePin").val().length > 3) {
        $.get(server_base_url + "/irheum-server/ResumePin", {
            resumePin: $("#userResumePin").val()
        }).done(function(data) {
            if (data == fail) {
                $("#userResumePin").val("");
                $("#userResumePin").focus();
                displayLargeErrorMessages("resumePinMsg", "<br />PIN is incorrect.");
            } else if (data == unauthorized) {
                displayLargeErrorMessages("resumePinMsg", "<br />" + unauthorizedMessage + "");
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == statusException) {
                displayLargeErrorMessages("resumePinMsg", "<br />" + statusExceptionMessage + "");
            } else {
                $("#resumePinPopupBodyDiv").remove();
                setRolesAndPriveleges(data);
                sessionStorage.removeItem("divs");
                $("#removeLockbutton").hide();
                $("#resumePinMsg").text("").append("<br /><button id='returnToPatDashId' onclick='goToPatientDashboard()' class='btn btn-primary btn-block'><b>Return to patient dashboard</b></button><button onclick='goToSelectPatient()' class='btn btn-primary btn-block'><b>Return to select patient</b></button>");
                if (checkUserRole("Provider") == false && checkUserRole("Nurse") == false) {
                    $("#returnToPatDashId").remove();
                } else {
                    $("#returnToPatDashId").show();
                }
            }
        });
    }
}

function goToPatientDashboard() {
    $('.locked').fadeOut(function() {
        $(this).remove();
    });
    location.href = "patientExam.jsp";
}
function goToSelectPatient() {
    $('.locked').fadeOut(function() {
        $(this).remove();
    });
    location.href = "dashboard.jsp";
}
//-------------------------patient assessment mode-----------------------------------------------

function showPhysicianAssessment() {
    $('html,body').scrollTop(0);
    hideAllDivs();
    if (checkUserPrivelege("PhysicianGlobalAssessment") == true) {
        addHover("physicianAssessmentMenu");
        getPhysicianAssesmentData();
        $("#physicianAssesmentDiv").show();
        $("select").attr('disabled', false);
        $("input").attr('disabled', false);
        $("button").attr('disabled', false);
    }
}
function showReviewPatientHistory() {
    getReviewPatientHistoryForm();
    getReviewPatientHistoryData();
    hideAllDivs();
    addHover("reviewPatientHistoryMenu");
    $("#reviewPatientHistoryDiv").show();
    patientFieldsDataOnload();
}
function showOutcomeMeasures() {
    getOutcomeMeasuresForm();
    hideAllDivs();
    addHover("outcomeMeasuresMenu");
    $("#outcomeMeasuresDiv").show();
    patientFieldsDataOnload();
}

//by default hiding all divs start
function hideAllDivs() {
    $("#jointCountDiv").hide();
    $("#labsDiv").hide();
    $("#patientAssesmentDiv").hide();
    $("#patientAssesmentTabsDiv").hide();
    $("#physicianAssesmentDiv").hide();
    $("#outcomeMeasuresDiv").hide();
    $("#medicationDiv").hide();
    $("#PrescriptionQuestionsDiv").hide();
    $("#reviewPatientHistoryDiv").hide();
    $("#priorAssessmentReport").hide();
    $("#medCommentsDiv").hide();
    $("#completeExamDiv").hide();
}//by default hiding all divs end

function hideAllMenus() {
    $("#globalCommentsDivId").hide();
    $("#orgDisplay").hide();
    $("#userDisplay").hide();
    $("#profilePic").hide();
    $("#logoutMenu").hide();
    $("#addUserMenu").hide();
    $("#dashboardMenu").hide();
    $("#patientDashboardMenu").hide();
    $("#jointCountMenu").hide();
    $("#labsMenu").hide();
    $("#leftEsrMenu").hide();
    $("#leftCrpMenu").hide();
    $("#leftRfMenu").hide();
    $("#leftAnticcpMenu").hide();
    $("#leftVectradaMenu").hide();
    $("#patientAssessmentMenu").hide();
    $("#physicianAssessmentMenu").hide();
    $("#leftRaseverityMenu").hide();

    $("#outcomeMeasuresMenu").hide();
    $("#leftSdaiMenu").hide();
    $("#leftCdaiMenu").hide();
    $("#leftDasesrMenu").hide();
    $("#leftDascrpMenu").hide();
    $("#leftRapid3Menu").hide();
    $("#reviewPatientHistoryMenu").hide();
    $("#medicationMenu").hide();
    $("#completeExamMenu").hide();
}
function showAllMenus() {
    $("#globalCommentsDivId").show();
    $("#orgDisplay").show();
    $("#userDisplay").show();
    $("#profilePic").show();
    $("#logoutMenu").show();
    $("#addUserMenu").show();
    $("#dashboardMenu").show();
    $("#patientDashboardMenu").show();
    $("#jointCountMenu").show();
    $("#labsMenu").show();
    $("#leftEsrMenu").show();
    $("#leftCrpMenu").show();
    $("#leftRfMenu").show();
    $("#leftAnticcpMenu").show();
    $("#leftVectradaMenu").show();
    $("#patientAssessmentMenu").show();
    $("#physicianAssessmentMenu").show();
    $("#leftRaseverityMenu").show();

    $("#outcomeMeasuresMenu").show();
    $("#leftSdaiMenu").show();
    $("#leftCdaiMenu").show();
    $("#leftDasesrMenu").show();
    $("#leftDascrpMenu").show();
    $("#leftRapid3Menu").show();
    $("#reviewPatientHistoryMenu").show();
    $("#medicationMenu").show();
    $("#completeExamMenu").show();
}

function disableAllMenus() {
    $("#jointCountMenu").attr("class", "disabled leftMenus");
    $('#jointCountMenu').click(function(event) {
        return false;
    });

    $("#patientAssessmentMenu").remove();

//    $("#patientAssessmentMenu").attr("class", "disabled");
//    $('#patientAssessmentMenu').click(function(event) {
//        return false;
//    });

    $("#physicianAssessmentMenu").attr("class", "disabled leftMenus");
    $('#physicianAssessmentMenu').click(function(event) {
        return false;
    });

    $("#leftRaseverityMenu").attr("class", "disabled");
    $('#leftRaseverityMenu').click(function(event) {
        return false;
    });

    $("#medicationMenu").remove();
    $("#completeExamMenu").remove();

//    $("#medicationMenu").attr("class", "disabled");
//    $('#medicationMenu').click(function(event) {
//        return false;
//    });
//
//    $("#completeExamMenu").attr("class", "disabled");
//    $('#completeExamMenu').click(function(event) {
//        return false;
//    });
}


//Rapid3 Popup JS
function showRapidPopup() {
    removeBeforePopup();
    $("#rapid3Popup").text("").append("<div id='RapidPopupId' />");
    $("#RapidPopupId").text("").append("<div id='RapidScoreSelectionId' data-toggle='modal' data-target='.bs-example-modal-sm' />");
    $("#RapidPopupId").append("<div id='RapidScoreSelectionInsideId' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' data-backdrop='static' data-keyboard='false' />");
    $("#RapidScoreSelectionInsideId").append("<div id='modalSmRapid3' class='modal-dialog modal-sm' />");
    $("#modalSmRapid3").append("<div id='modalContentRapid' class='modal-content' />");
    $("#modalContentRapid").append("<div class='modal-header' id='RapidScoreBtn' />");
    $("#RapidScoreBtn").text("").append("<h4 class='modal-title'>Enter PAS2</h4>");
    $("#modalContentRapid").append("<div class='modal-body' id='RapidSelectScoreDiv' />");
    $("#RapidSelectScoreDiv").text("").append("<center><input type='text' class='form-control' size=3 maxlength=3 id='score' onkeyup='rapidKeyUp(event)' placeholder='Enter PAS2 score (in Range 0 - 10)'><br /><input type='button' class='btn btn-primary' value='Submit' onclick=addRapid3()><br /><br /><a href='javascript:closeRapid3()'>Close</a></center>");
    $("#RapidSelectScoreDiv").append("<br/><lable id='RapidValidationId'></lable>");
    $("#RapidScoreSelectionId").click();
}

function rapidKeyUp(event) {
    $("#RapidValidationId").text("");
    if (event.which == 13) {
        addRapid3();
        return false;
    }
}

function closeRapid3() {
    $("#RapidScoreBtn").append("<button aria-hidden='true' id='closeRapidOnclickBtn' data-dismiss='modal' class='close' type='button'></button>");
    $("#closeRapidOnclickBtn").click();
    $("#closeRapidOnclickBtn").remove();
}

//submit Rapid3 value JS
function addRapid3() {
    if ($("#score").val() == "") {
        $("#RapidValidationId").text("").append("<center><span class='smallErrorMsg'>Enter PAS2</span></center>");
        $("#score").text("");
    } else if (isNaN($("#score").val())) {
        $("#RapidValidationId").text("").append("<center>PAS2 should be a number</center>");
        $("#score").text("");
    } else if ($("#score").val() > 10 || $("#score").val() < 0) {
        $("#RapidValidationId").text("").append("<center>PAS2 value should be between 0 to 10</center>");
        $("#score").text("");
    } else {
        $.get(server_base_url + "/irheum-server/UpdateOutcomeMeasure", {
            patientid: $("#pid").val(),
            encno: $("#encno").val(),
            rapidScore: $("#score").val()
        }).done(function(data) {
            if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == success) {
                closeRapid3();
                getLeftSideMenusData();
                getPhysicianAssesmentData();
            }
        });
    }
}

//complete encounter start
function completeExam() {
    if (checkUserPrivelege("CloseEncounter") == true) {
        hideAllDivs();
        $("#completeExamDiv").show();
        $("#completeExamDiv").text("").append("<div id='completeExamMainDivId' />");
        $.get(server_base_url + "/irheum-server/FetchPrescriptionDetails", {
            patientid: $("#pid").val(), encno: $("#encno").val()
        }).done(function(data) {
            if (data == fail) {
                displayLargeErrorMessages("completeExamMainDivId", "<center>" + failMessage + "</center>");
            } else if (data == unauthorized) {
                displayLargeErrorMessages("completeExamMainDivId", "<center>" + unauthorizedMessage + "</center>");
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == statusException) {
                displayLargeErrorMessages("completeExamMainDivId", "<center>" + statusExceptionMessage + "</center>");
            } else {
                $("#completeExamMainDivId").append("<br /><table class='table table-primary' id='preCompletionTable' />");
                $("#completeExamMainDivId").append("<table class='table table-primary' id='preCompletionPatientTable' />");
                $("#completeExamMainDivId").append("<table class='table table-primary' id='preCompletionMedTable' />");
                $("#completeExamMainDivId").append("<div id='preCompletionConfirmDivId' />");
                var count = 0;
                $.each(data, function(index, value) {
                    if (index == "User") {
                        var faxVar = "NA";
                        var credentialsVar = "NA";
                        var deaVar = "NA";
                        var licenceNoVar = "NA";
                        if (value.fax != "") {
                            faxVar = value.fax;
                        }
                        if (value.phyPreferences != "" && value.phyPreferences != undefined) {
                            if (value.phyPreferences.credentials != "" && value.phyPreferences.credentials != undefined) {
                                credentialsVar = value.phyPreferences.credentials;
                            }
                            if (value.phyPreferences.dea != "" && value.phyPreferences.dea != undefined) {
                                deaVar = value.phyPreferences.dea;
                            }
                            if (value.phyPreferences.licences != "" && value.phyPreferences.licences != undefined) {
                                if (value.phyPreferences.licences[0].licenceNo != "" && value.phyPreferences.licences[0].licenceNo != undefined) {
                                    licenceNoVar = value.phyPreferences.licences[0].licenceNo;
                                }
                            }
                        }
                        $("#preCompletionTable").append("<thead><tr><th colspan='2' >User information</th></tr></thead>");
                        $("#preCompletionTable").append("<tbody id='preCompletionTableBody' />");
                        $("#preCompletionTableBody").append("<tr><td>Name</td><td>" + value.fname + " " + value.lname + "</td></tr>");
                        $("#preCompletionTableBody").append("<tr><td>Credentials</td><td>" + credentialsVar + "</td></tr>");
                        $("#preCompletionTableBody").append("<tr><td>Phone</td><td>" + value.mobilephone + "</td></tr>");
                        $("#preCompletionTableBody").append("<tr><td>Fax</td><td>" + faxVar + "</td></tr>");
                        $("#preCompletionTableBody").append("<tr><td>DEA</td><td>" + deaVar + "</td></tr>");
                        $("#preCompletionTableBody").append("<tr><td>Licence</td><td>" + licenceNoVar + "</td></tr>");
                    }
                    if (index == "Patient") {
                        var addressVar = "";
                        if (value.address[0].address1 != "" && value.address[0].address1 != undefined && value.address[0].address1 != "undefined") {
                            addressVar = addressVar + value.address[0].address1;
                        }
                        if (value.address[0].address2 != "" && value.address[0].address2 != undefined && value.address[0].address2 != "undefined") {
                            addressVar = addressVar + "&nbsp;&nbsp;" + value.address[0].address2;
                        }
                        if (addressVar == "") {
                            addressVar = "N/A";
                        }
                        var date = new Date();
                        var todayDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
                        $("#preCompletionPatientTable").append("<thead><tr><th>Patient information</th><th>Current date:" + todayDate + "</th></tr></thead>");
                        $("#preCompletionPatientTable").append("<tbody id='preCompletionPatientTableBody' />");
                        $("#preCompletionPatientTableBody").append("<tr><td>Name</td><td>" + value.fname + " " + value.lname + "</td></tr>");
                        $("#preCompletionPatientTableBody").append("<tr><td>DOB</td><td>" + value.dob + "</td></tr>");
                        $("#preCompletionPatientTableBody").append("<tr><td>Address</td><td>" + addressVar + "</td></tr>");
                    }
                    if (index == "Encounter") {
                        if (value.medications != undefined && value.medications != "") {
                            $("#preCompletionMedTable").append("<thead><tr><th>Drug name</th><th>Sig/Direction</th><th>Qty</th><th>Refil</th><th>Med preference</th></tr></thead>");
                            $("#preCompletionMedTable").append("<tbody id='preCompletionMedTableBody' />");
                            $.each(value.medications, function(index, value) {
                                count++;
                                var ans = "<div id='buttonsDivision" + index + "' class='btn-group col-sm-9' data-toggle='buttons'><label data-toggle='button' class='btn quest btn-default active' id='a1' style='border-radius: 3px; font-weight: bold; font-size:11px;white-space:normal;width:180px;'><input type='radio' name='s1" + index + "' id='d1' value='yes'  checked='checked'>Substitutions permitted</label>" +
                                        "<label data-toggle='button' class='btn quest btn-default' id='a2' style='border-radius: 3px; font-weight: bold; font-size:12px;white-space:normal;width:180px;'><input type='radio' name='s1" + index + "' id='d1' value='no'>Dispense as written</label><br /><br /><br /><br /><span id='medPreferenceStatus" + index + "'></span></div>";
                                $("#preCompletionMedTableBody").append("<tr><td id='drugname" + index + "' style='width:10%;'>" + value.drugName + "<input type='hidden' id='strength" + index + "' value='" + value.strength + "'></td><td id='direction" + index + "' style='width:40%;'>" + value.direction + "</td><td id='qty" + index + "' style='width:10%;'>" + value.qty + "</td><td id='refill" + index + "' style='width:5%;'>" + value.refill + "</td><td style='width:25%;'>" + ans + "</td></tr>");
                            });
                        } else {
                            //completeExamPopup
                            if (getUserSessionElement("medication") != "no") {
                                removeBeforePopup();
                                $("#completeExamPopup").text("").append("<div class='modal fade' id='completeExamModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' data-backdrop='static' data-keyboard='false' />");
                                $("#completeExamModal").text("").append("<div id='chooseRadam' data-toggle='modal' data-target='#completeExamModal' />");
                                $("#completeExamModal").append("<div id='completeExamModalDialog' class='modal-dialog' />");
                                $("#completeExamModalDialog").append("<div id='completeExamModalContent' class='modal-content' />");
                                $("#completeExamModalContent").append("<div class='modal-header'><h4 class='modal-title' id='myModalLabel'>Info</h4></div>");
                                $("#completeExamModalContent").append("<div class='modal-body'>It seems like there is no medication prescribed. Click continue to proceed or cancel to quit this process and prescribe medication.</div>");
                                $("#completeExamModalContent").append("<div class='modal-footer'><button class='btn btn-primary' onclick='completeExamContinue();'>Continue</button><button class='btn btn-default' onclick='completeExamQuit();'>Cancel</button></div>");
                                $("#chooseRadam").click();
                            }
                        }
                    }
                });
                $("#preCompletionConfirmDivId").append("<div id='confirmationDivId'>");
                $("#confirmationDivId").append("<table class='table table-primary' id='preCompletionConfirmTable' />");
//                $("#preCompletionConfirmTable").append("<tr id='verifyPinFieldTr'><td style='width:20%;'><span style='font-size:18px;font-weight:bold;'>Please enter your PIN for confirmation</span><span style='padding-left:5px;font-size:10px;color:blue;'>What is PIN?</span></td><td style='width:80%;'><input type='password' class='form-control' style='width:20%;' placeholder='Enter prescribing PIN' onkeyup='periscribePinKeyup(event)' id='pinField' maxlength=4 size=4><span id='pinValidationStatus'></span><a href='javascript:callPhysicianPreference();' style='font-size:14px;'>click to create</a></td></tr>");
                $("#preCompletionConfirmTable").append("<tr id='verifyPinFieldTr'><td style='width:0%;'><span style='font-size:18px;font-weight:bold;'>Please enter your PIN for confirmation</span><br/><span style='padding-left:5px;font-size:10px;color:blue;cursor:pointer;' onclick='whatIsPINPopup()'>[What is this PIN?]</span></td><td style='width:60%;'><input type='password' class='form-control' style='width:30%;' placeholder='Enter Confirmation PIN' onkeyup='periscribePinKeyup(event)' id='pinField' maxlength=4 size=4><span id='pinValidationStatus'></span></td></tr>");
                $("#preCompletionConfirmTable").append("<tr><td style='border:none;border-color:white;' id='verifyPinTd'><button class='btn btn-primary' onclick=verifyPin('" + count + "') ><b>Verify PIN</b></button></td><td style='border:none;border-color:white;'><span id='completeConfirmStatus' /></td></tr>");
            }
        });
    }
}//complete encounter end

function whatIsPINPopup() {
    removeBeforePopup();
    $("#PINPopup").text("").append("<div class='modal fade' id='PINModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' data-backdrop='static' data-keyboard='false' />");
    $("#PINModal").text("").append("<div id='chooseRadam' data-toggle='modal' data-target='#PINModal' />");
    $("#PINModal").append("<div id='PINModalDialog' class='modal-dialog' />");
    $("#PINModalDialog").append("<div id='PINModalContent' class='modal-content' />");
    $("#PINModalContent").append("<div class='modal-header'><h5 class='modal-title' id='myModalLabel'>This confirmation PIN is the same as your prescription PIN.</h4></div>");
//    $("#PINModalContent").append("<div class='modal-body'></div>");
//    $("#PINModalContent").append("<div class='modal-footer'><a href=javascript:closePINPopup() style='float:left;margin-top:10px;'>Close</a></div>");
    $("#PINModalContent").append("<div class='modal-footer'><button class='btn btn-primary' onclick='closePINPopup()'>Close</button></div>");
    $("#chooseRadam").click();
}

function closePINPopup() {
    $("#PINModal").append("<div id='closeRadamPopup' class='btn btn-default' data-dismiss='modal' />");
    $("#closeRadamPopup").click();
    $("#closeRadamPopup").remove();
}

function completeExamContinue() {
    $("#completeExamModal").append("<div id='closeRadamPopup' class='btn btn-default' data-dismiss='modal' />");
    $("#closeRadamPopup").click();
    $("#closeRadamPopup").remove();
}

function completeExamQuit() {
    $("#completeExamModal").append("<div id='closeRadamPopup' class='btn btn-default' data-dismiss='modal' />");
    $("#closeRadamPopup").click();
    $("#closeRadamPopup").remove();
    addHover("medicationMenu");
    showMedication();
    getprescriptionQuesionare();
    getMedicationComment();
}

function periscribePinKeyup(event) {
    $("#pinValidationStatus").text("");
    if (event.which == 13) {
        verifyPin();
    }
}

function verifyPin(count) {
    $("#completeConfirmStatus").text("");
    for (var i = 0; i < count; i++) {
        $("#medPreferenceStatus" + i).text("");
    }
    var pin = $("#pinField").val();
    if (pin == "" || pin == undefined || pin == "undefined") {
        $("#pinValidationStatus").text("").append("<span class='smallErrorMsg'>Please enter the PIN</span>");
        return false;
    } else if (pin.length < 4) {
        $("#pinValidationStatus").text("").append("<span class='smallErrorMsg'>Please enter 4 digit PIN</span>");
        return false;
    }
    var flag = false;
    for (var i = 0; i < count; i++) {
        if ($("input[name=s1" + (i) + "]:checked").val() != "yes" && $("input[name=s1" + (i) + "]:checked").val() != "no") {
            flag = true;
            $("#medPreferenceStatus" + i).text("").append("<span class='smallErrorMsg'>Please select the preferences</span>");
        }
    }
    if (flag == true) {
        return false;
    } else {
        var finalJSON = "";
        for (var m = 0; m < count; m++) {
            var drugName = $("#drugname" + m).text();
            var strength = $("#strength" + m).val();
            var direction = $("#direction" + m).text();
            var qty = $("#qty" + m).text();
            var refill = $("#refill" + m).text();
            var preference = $("input[name=s1" + (m) + "]:checked").val();
            var json = "{\"drugName\":\"" + drugName + "\",\"strength\":\"" + strength + "\",\"direction\":\"" + direction + "\",\"qty\":\"" + qty + "\",\"refill\":\"" + refill + "\",\"substitutionAllowed\":\"" + preference + "\"}";
            finalJSON = finalJSON + json + ",";
        }
        finalJSON = finalJSON.substr(0, (finalJSON.length - 1));
        finalJSON = "[" + finalJSON + "]";
        $.get(server_base_url + "/irheum-server/MedicationConfirmation", {
            patientid: $("#pid").val(), encno: $("#encno").val(),
            medJson: finalJSON, prescribingPin: pin
        }).done(function(data) {
            if (data == "invalid input") {
                displayLargeErrorMessages("pinValidationStatus", "Invalid PIN.");
            } else if (data == fail) {
                displayLargeErrorMessages("completeConfirmStatus", failMessage);
            } else if (data == unauthorized) {
                displayLargeErrorMessages("completeConfirmStatus", unauthorizedMessage);
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == statusException) {
                displayLargeErrorMessages("completeConfirmStatus", statusExceptionMessage);
            } else if (data == "continue") {
                confirmPrescription();
            } else if (data == success) {
                verifyPinSuccess();
            }
        });
    }
}
function verifyPinContinue() {
    $("#verifyPinFieldTr").text("");
    $("#verifyPinTd").text("").append("<button onclick=confirmPrescription() class='btn btn-primary'><b>Save &amp; Continue</b></button><a href=javascript:showJointCount() style='margin-left:20px;'>Cancel</a>");
}

function verifyPinSuccess() {
    $("#verifyPinFieldTr").text("");
    $("#verifyPinTd").text("").append("<button onclick=confirmPrescription() class='btn btn-primary'><b>Confirm Prescription</b></button><a href=javascript:showJointCount() style='margin-left:20px;'>Cancel</a>");
}

function confirmPrescription() {
    hideAllDivs();
    $("#completeExamDiv").show();
    $("#completeExamDiv").text("").append("<div id='completeExamMainDivId' />");
    getReportDisplay("completeExamDiv", $("#encid").val(), $("#pid").val(), $("#encno").val());
    $("#normalReceptButton").remove();
}

function removeBeforePopup() {
    $("#patientAssessmentPopup").text("");
    $("#radamPopup").text("");
    $("#pendingAssessmentsPopup").text("");
    $("#resumePinPopup").text("");
    $("#rapid3Popup").text("");
    $("#bioMedsPopup").text("");
    $("#medicationPopup").text("");
    $("#completeExamPopup").text("");
    $("#jointCountPopup").text("");
    $("#PINPopup").text("");
}