//preparing all patient assessment menus start
function getPatientAssementMenus() {
    $('html,body').scrollTop(0);
    getPatientAssessmentForm();//creating form
    getHaq2Questions();
    getPainQuestions();
    getFatigueQuestions();
    getStiffnessQuestions();
    getPgaQuestions();
    getHistoryQuestions();
    getPriorMedsQuestions();

//    $('#painClick').attr('class', 'disabled');
//    $('#fatigueClick').attr('class', 'disabled');
//    $('#stiffnessClick').attr('class', 'disabled');
//    $('#pgaClick').attr('class', 'disabled');
//    $('#historyClick').attr('class', 'disabled');
//    $('#priorMedsClick').attr('class', 'disabled');
//    $('#radamClick').attr('class', 'disabled');
//
//    $('#haq2Click > a > strong').css('color', '#636E7B');
//    $('#painClick > a > strong').css('color', 'white');
//    $('#fatigueClick > a > strong').css('color', 'white');
//    $('#stiffnessClick > a > strong').css('color', 'white');
//    $('#pgaClick > a > strong').css('color', 'white');
//    $('#historyClick > a > strong').css('color', 'white');
//    $('#priorMedsClick > a > strong').css('color', 'white');
//    $('#radamClick > a > strong').css('color', 'black');

    $('#haq2Click').click(function() {
        $('html,body').scrollTop(0);
        getHaq2Answers();
        $("#beforePatientAssessmentMessage").text("");
        $("#afterPatientAssessmentMessage").text("");
//        return false;
    });
    $('#painClick').click(function() {
        $('html,body').scrollTop(0);
        getPainAnswers();
        $("#beforePatientAssessmentMessage").text("");
        $("#afterPatientAssessmentMessage").text("");
//        return false;
    });
    $('#fatigueClick').click(function() {
        $('html,body').scrollTop(0);
        getFatigueAnswers();
        $("#beforePatientAssessmentMessage").text("");
        $("#afterPatientAssessmentMessage").text("");
//        return false;
    });
    $('#stiffnessClick').click(function() {
        $('html,body').scrollTop(0);
        getStiffnessAnswers();
        $("#beforePatientAssessmentMessage").text("");
        $("#afterPatientAssessmentMessage").text("");
//        return false;
    });
    $('#pgaClick').click(function() {
        $('html,body').scrollTop(0);
        getPgaAnswers();
        $("#beforePatientAssessmentMessage").text("");
        $("#afterPatientAssessmentMessage").text("");
//        return false;
    });
    $('#historyClick').click(function() {
        $('html,body').scrollTop(0);
        getHistoryAnswers();
        $("#beforePatientAssessmentMessage").text("");
        $("#afterPatientAssessmentMessage").text("");
//        return false;
    });
    $('#priorMedsClick').click(function() {
        $('html,body').scrollTop(0);
        getPriorMedsAnswers();
        $("#beforePatientAssessmentMessage").text("");
        $("#afterPatientAssessmentMessage").text("");
//        return false;
    });
    $('#radamClick').click(function() {
        getPatientAssementRadamMenus();
        $("#beforePatientAssessmentMessage").text("");
        $("#afterPatientAssessmentMessage").text("");
//        return false;
    });
}//preparing all patient assessment menus end

//-------------------------------history start-------------------------------------
//load questions for history menu start
function getHistoryQuestions() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
    $.get(server_base_url + "/irheum-server/PatientAssessMentQuestion", {
        groupname: "History", patientid: $("#pid").val()
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            if (data != null && data.length != null) {
                $("#tab1-2").text("");
                $("#tab2-2").text("");
                $("#tab3-2").text("");
                $("#tab4-2").text("");
                $("#tab5-2").text("");
                $("#tab6-2").text("");
                $("#tab7-2").text("");
                $("#tab8-2").text("");

                for (var i = 0; i < data.length; i++) {
                    if (data[i].category == "General") {
                        var uniqueId = data[i]._id.$oid;
                        $("#tab1-2").append("<div id='firstBodyDiv" + i + "' class='btn-group' /><br />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryId" + i + "' type='hidden' value='" + uniqueId + "' />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryCategoryId" + i + "' type='hidden' value='" + data[i].category + "' />");
                        $("#firstBodyDiv" + i).append("<label for='id" + uniqueId + "' id='answerDiv" + uniqueId + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='id" + uniqueId + "' name='historyAnswers' value='" + data[i].question + "'onclick=historyOnClick('answerDiv" + uniqueId + "','id" + uniqueId + "') />" + data[i].question + "</label>");
                    }
                    if (data[i].category == "Head & Neck") {
                        var uniqueId = data[i]._id.$oid;
                        $("#tab2-2").append("<div id='firstBodyDiv" + i + "' class='btn-group' /><br />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryId" + i + "' type='hidden' value='" + uniqueId + "' />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryCategoryId" + i + "' type='hidden' value='" + data[i].category + "' />");
                        $("#firstBodyDiv" + i).append("<label for='id" + uniqueId + "' id='answerDiv" + uniqueId + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='id" + uniqueId + "' name='historyAnswers' value='" + data[i].question + "'onclick=historyOnClick('answerDiv" + uniqueId + "','id" + uniqueId + "') />" + data[i].question + "</label>");
                    }
                    if (data[i].category == "Heart & Breathing") {
                        var uniqueId = data[i]._id.$oid;
                        $("#tab3-2").append("<div id='firstBodyDiv" + i + "' class='btn-group' /><br />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryId" + i + "' type='hidden' value='" + uniqueId + "' />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryCategoryId" + i + "' type='hidden' value='" + data[i].category + "' />");
                        $("#firstBodyDiv" + i).append("<label for='id" + uniqueId + "' id='answerDiv" + uniqueId + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='id" + uniqueId + "' name='historyAnswers' value='" + data[i].question + "'onclick=historyOnClick('answerDiv" + uniqueId + "','id" + uniqueId + "') />" + data[i].question + "</label>");
                    }
                    if (data[i].category == "Skin") {
                        var uniqueId = data[i]._id.$oid;
                        $("#tab4-2").append("<div id='firstBodyDiv" + i + "' class='btn-group' /><br />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryId" + i + "' type='hidden' value='" + uniqueId + "' />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryCategoryId" + i + "' type='hidden' value='" + data[i].category + "' />");
                        $("#firstBodyDiv" + i).append("<label for='id" + uniqueId + "' id='answerDiv" + uniqueId + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='id" + uniqueId + "' name='historyAnswers' value='" + data[i].question + "'onclick=historyOnClick('answerDiv" + uniqueId + "','id" + uniqueId + "') />" + data[i].question + "</label>");
                    }
                    if (data[i].category == "Gastrointestinal") {
                        var uniqueId = data[i]._id.$oid;
                        $("#tab5-2").append("<div id='firstBodyDiv" + i + "' class='btn-group' /><br />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryId" + i + "' type='hidden' value='" + uniqueId + "' />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryCategoryId" + i + "' type='hidden' value='" + data[i].category + "' />");
                        $("#firstBodyDiv" + i).append("<label for='id" + uniqueId + "' id='answerDiv" + uniqueId + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='id" + uniqueId + "' name='historyAnswers' value='" + data[i].question + "'onclick=historyOnClick('answerDiv" + uniqueId + "','id" + uniqueId + "') />" + data[i].question + "</label>");
                    }
                    if (data[i].category == "GYN") {
                        var uniqueId = data[i]._id.$oid;
                        $("#tab6-2").append("<div id='firstBodyDiv" + i + "' class='btn-group' /><br />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryId" + i + "' type='hidden' value='" + uniqueId + "' />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryCategoryId" + i + "' type='hidden' value='" + data[i].category + "' />");
                        $("#firstBodyDiv" + i).append("<label for='id" + uniqueId + "' id='answerDiv" + uniqueId + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='id" + uniqueId + "' name='historyAnswers' value='" + data[i].question + "'onclick=historyOnClick('answerDiv" + uniqueId + "','id" + uniqueId + "') />" + data[i].question + "</label>");
                    }
                    if (data[i].category == "Neurology") {
                        var uniqueId = data[i]._id.$oid;
                        $("#tab7-2").append("<div id='firstBodyDiv" + i + "' class='btn-group' /><br />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryId" + i + "' type='hidden' value='" + uniqueId + "' />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryCategoryId" + i + "' type='hidden' value='" + data[i].category + "' />");
                        $("#firstBodyDiv" + i).append("<label for='id" + uniqueId + "' id='answerDiv" + uniqueId + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='id" + uniqueId + "' name='historyAnswers' value='" + data[i].question + "'onclick=historyOnClick('answerDiv" + uniqueId + "','id" + uniqueId + "') />" + data[i].question + "</label>");
                    }
                    if (data[i].category == "Other") {
                        var uniqueId = data[i]._id.$oid;
                        $("#tab8-2").append("<div id='firstBodyDiv" + i + "' class='btn-group' /><br />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryId" + i + "' type='hidden' value='" + uniqueId + "' />");
                        $("#firstBodyDiv" + i).append("<input id='hiddenHistoryCategoryId" + i + "' type='hidden' value='" + data[i].category + "' />");
                        $("#firstBodyDiv" + i).append("<label for='id" + uniqueId + "' id='answerDiv" + uniqueId + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='id" + uniqueId + "' name='historyAnswers' value='" + data[i].question + "'onclick=historyOnClick('answerDiv" + uniqueId + "','id" + uniqueId + "') />" + data[i].question + "</label>");
                    }
                }

                $("#tab1-2").append("<div class='btn-group'><label for='noneOfAboveId1' id='noneOfAboveLabel1' class='btn quest btn-default' style='text-align:left;font-size:16px;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='noneOfAboveId1' onclick=historyNoneOnClick('noneOfAboveLabel1','noneOfAboveId1','1') />None of the above</label></div>");
                $("#tab2-2").append("<div class='btn-group'><label for='noneOfAboveId2' id='noneOfAboveLabel2' class='btn quest btn-default' style='text-align:left;font-size:16px;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='noneOfAboveId2' onclick=historyNoneOnClick('noneOfAboveLabel2','noneOfAboveId2','2') />None of the above</label></div>");
                $("#tab3-2").append("<div class='btn-group'><label for='noneOfAboveId3' id='noneOfAboveLabel3' class='btn quest btn-default' style='text-align:left;font-size:16px;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='noneOfAboveId3' onclick=historyNoneOnClick('noneOfAboveLabel3','noneOfAboveId3','3') />None of the above</label></div>");
                $("#tab4-2").append("<div class='btn-group'><label for='noneOfAboveId4' id='noneOfAboveLabel4' class='btn quest btn-default' style='text-align:left;font-size:16px;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='noneOfAboveId4' onclick=historyNoneOnClick('noneOfAboveLabel4','noneOfAboveId4','4') />None of the above</label></div>");
                $("#tab5-2").append("<div class='btn-group'><label for='noneOfAboveId5' id='noneOfAboveLabel5' class='btn quest btn-default' style='text-align:left;font-size:16px;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='noneOfAboveId5' onclick=historyNoneOnClick('noneOfAboveLabel5','noneOfAboveId5','5') />None of the above</label></div>");
                $("#tab6-2").append("<div class='btn-group'><label for='noneOfAboveId6' id='noneOfAboveLabel6' class='btn quest btn-default' style='text-align:left;font-size:16px;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='noneOfAboveId6' onclick=historyNoneOnClick('noneOfAboveLabel6','noneOfAboveId6','6') />None of the above</label></div>");
                $("#tab7-2").append("<div class='btn-group'><label for='noneOfAboveId7' id='noneOfAboveLabel7' class='btn quest btn-default' style='text-align:left;font-size:16px;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='noneOfAboveId7' onclick=historyNoneOnClick('noneOfAboveLabel7','noneOfAboveId7','7') />None of the above</label></div>");
                $("#tab8-2").append("<div class='btn-group'><label for='noneOfAboveId8' id='noneOfAboveLabel8' class='btn quest btn-default' style='text-align:left;font-size:16px;font-weight:bold;min-width:250px;max-width:300px;'><input type='checkbox' style='display:none;' id='noneOfAboveId8' onclick=historyNoneOnClick('noneOfAboveLabel8','noneOfAboveId8','8') />None of the above</label></div>");
            }
        }
    });
}//load questions for history menu end

function historyOnClick(labelId, cbxId) {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");

    if ($("#" + cbxId).is(":checked") == true) {
        $('#' + labelId).addClass("active");
    } else {
        $('#' + labelId).removeClass("active");
    }
}

function historyNoneOnClick(labelId, cbxId, count) {
//    alert(labelId + "\t" + cbxId + "\t" + count);
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
    var form1 = document.getElementById("progressWizard");
//    var cbx = form1.historyAnswers.length / 4;

    var cbx = 0;
//for last tab
    if (count == 1) {
        cbx = cbx + 5;
        if ($("#" + cbxId).is(":checked") == true) {
            $('#' + labelId).addClass("active");
            for (var i = 0; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#id" + qid).attr('checked', false);
                $("#answerDiv" + qid).attr('disabled', true);
                $("#answerDiv" + qid).removeClass("active");
            }
        } else {
            $('#' + labelId).removeClass("active");
            for (var i = 0; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#answerDiv" + qid).attr('disabled', false);
            }
        }
    }

    if (count == 2) {
        cbx = cbx + 10;
        if ($("#" + cbxId).is(":checked") == true) {
            $('#' + labelId).addClass("active");
            for (var i = 5; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#id" + qid).attr('checked', false);
                $("#answerDiv" + qid).attr('disabled', true);
                $("#answerDiv" + qid).removeClass("active");
            }
        } else {
            $('#' + labelId).removeClass("active");
            for (var i = 5; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#answerDiv" + qid).attr('disabled', false);
            }
        }
    }

    if (count == 3) {
        cbx = cbx + 15;
        if ($("#" + cbxId).is(":checked") == true) {
            $('#' + labelId).addClass("active");
            for (var i = 10; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#id" + qid).attr('checked', false);
                $("#answerDiv" + qid).attr('disabled', true);
                $("#answerDiv" + qid).removeClass("active");
            }
        } else {
            $('#' + labelId).removeClass("active");
            for (var i = 10; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#answerDiv" + qid).attr('disabled', false);
            }
        }
    }

    if (count == 4) {
        cbx = cbx + 21;
        if ($("#" + cbxId).is(":checked") == true) {
            $('#' + labelId).addClass("active");
            for (var i = 15; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#id" + qid).attr('checked', false);
                $("#answerDiv" + qid).attr('disabled', true);
                $("#answerDiv" + qid).removeClass("active");
            }
        } else {
            $('#' + labelId).removeClass("active");
            for (var i = 15; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#answerDiv" + qid).attr('disabled', false);
            }
        }
    }

    if (count == 5) {
        cbx = cbx + 27;
        if ($("#" + cbxId).is(":checked") == true) {
            $('#' + labelId).addClass("active");
            for (var i = 21; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#id" + qid).attr('checked', false);
                $("#answerDiv" + qid).attr('disabled', true);
                $("#answerDiv" + qid).removeClass("active");
            }
        } else {
            $('#' + labelId).removeClass("active");
            for (var i = 21; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#answerDiv" + qid).attr('disabled', false);
            }
        }
    }

    if (count == 6) {
        cbx = cbx + 30;
        if ($("#" + cbxId).is(":checked") == true) {
            $('#' + labelId).addClass("active");
            for (var i = 27; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#id" + qid).attr('checked', false);
                $("#answerDiv" + qid).attr('disabled', true);
                $("#answerDiv" + qid).removeClass("active");
            }
        } else {
            $('#' + labelId).removeClass("active");
            for (var i = 27; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#answerDiv" + qid).attr('disabled', false);
            }
        }
    }

    if (count == 7) {
        cbx = cbx + 33;
        if ($("#" + cbxId).is(":checked") == true) {
            $('#' + labelId).addClass("active");
            for (var i = 30; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#id" + qid).attr('checked', false);
                $("#answerDiv" + qid).attr('disabled', true);
                $("#answerDiv" + qid).removeClass("active");
            }
        } else {
            $('#' + labelId).removeClass("active");
            for (var i = 30; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#answerDiv" + qid).attr('disabled', false);
            }
        }
    }

    if (count == 8) {
        cbx = cbx + 36;
        if ($("#" + cbxId).is(":checked") == true) {
            $('#' + labelId).addClass("active");
            for (var i = 33; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#id" + qid).attr('checked', false);
                $("#answerDiv" + qid).attr('disabled', true);
                $("#answerDiv" + qid).removeClass("active");
            }
        } else {
            $('#' + labelId).removeClass("active");
            for (var i = 33; i < cbx; i++) {
                var qid = $("#hiddenHistoryId" + i).val();
                $("#answerDiv" + qid).attr('disabled', false);
            }
        }
    }
}

//to fetch history answers start
function getHistoryAnswers() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val(),
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                var answeredCount1 = 0;
                var answeredCount2 = 0;
                var answeredCount3 = 0;
                var answeredCount4 = 0;
                var answeredCount5 = 0;
                var answeredCount6 = 0;
                var answeredCount7 = 0;
                var answeredCount8 = 0;

                if (value.type.toLowerCase() == "history") {
                    $.each(assessments, function(index, value) {

                        if (index >= 0 && index <= 4) {
                            if (value.answer == "no") {
                                answeredCount1 = answeredCount1 + 1;
                            } else if (value.answer == "yes") {
                                $("#id" + value.qid).prop("checked", true);
                                $("#answerDiv" + value.qid).addClass("active");

                            }
                            if (answeredCount1 == 5) {
                                $("#noneOfAboveId1").attr('checked', true);
                                $("#noneOfAboveLabel1").addClass("active");
                                historyNoneOnClick('noneOfAboveLabel1', 'noneOfAboveId1', '1');
                            }
                        }

                        if (index >= 5 && index <= 9) {
                            if (value.answer == "no") {
                                answeredCount2 = answeredCount2 + 1;
                            } else if (value.answer == "yes") {
                                $("#id" + value.qid).prop("checked", true);
                                $("#answerDiv" + value.qid).addClass("active");

                            }
                            if (answeredCount2 == 5) {
                                $("#noneOfAboveId2").attr('checked', true);
                                $("#noneOfAboveLabel2").addClass("active");
                                historyNoneOnClick('noneOfAboveLabel2', 'noneOfAboveId2', '2');
                            }
                        }

                        if (index >= 10 && index <= 14) {
                            if (value.answer == "no") {
                                answeredCount3 = answeredCount3 + 1;
                            } else if (value.answer == "yes") {
                                $("#id" + value.qid).prop("checked", true);
                                $("#answerDiv" + value.qid).addClass("active");

                            }
                            if (answeredCount3 == 5) {
                                $("#noneOfAboveId3").attr('checked', true);
                                $("#noneOfAboveLabel3").addClass("active");
                                historyNoneOnClick('noneOfAboveLabel3', 'noneOfAboveId3', '3');
                            }
                        }

                        if (index >= 15 && index <= 20) {
                            if (value.answer == "no") {
                                answeredCount4 = answeredCount4 + 1;
                            } else if (value.answer == "yes") {
                                $("#id" + value.qid).prop("checked", true);
                                $("#answerDiv" + value.qid).addClass("active");
                            }
                            if (answeredCount4 == 6) {
                                $("#noneOfAboveId4").attr('checked', true);
                                $("#noneOfAboveLabel4").addClass("active");
                                historyNoneOnClick('noneOfAboveLabel4', 'noneOfAboveId4', '4');
                            }
                        }

                        if (index >= 21 && index <= 26) {
                            if (value.answer == "no") {
                                answeredCount5 = answeredCount5 + 1;
                            } else if (value.answer == "yes") {
                                $("#id" + value.qid).prop("checked", true);
                                $("#answerDiv" + value.qid).addClass("active");
                            }
                            if (answeredCount5 == 6) {
                                $("#noneOfAboveId5").attr('checked', true);
                                $("#noneOfAboveLabel5").addClass("active");
                                historyNoneOnClick('noneOfAboveLabel5', 'noneOfAboveId5', '5');
                            }
                        }

                        if (index >= 27 && index <= 29) {
                            if (value.answer == "no") {
                                answeredCount6 = answeredCount6 + 1;
                            } else if (value.answer == "yes") {
                                $("#id" + value.qid).prop("checked", true);
                                $("#answerDiv" + value.qid).addClass("active");
                            }
                            if (answeredCount6 == 3) {
                                $("#noneOfAboveId6").attr('checked', true);
                                $("#noneOfAboveLabel6").addClass("active");
                                historyNoneOnClick('noneOfAboveLabel6', 'noneOfAboveId6', '6');
                            }
                        }

                        if (index >= 30 && index <= 32) {
                            if (value.answer == "no") {
                                answeredCount7 = answeredCount7 + 1;
                            } else if (value.answer == "yes") {
                                $("#id" + value.qid).prop("checked", true);
                                $("#answerDiv" + value.qid).addClass("active");
                            }
                            if (answeredCount7 == 3) {
                                $("#noneOfAboveId7").attr('checked', true);
                                $("#noneOfAboveLabel7").addClass("active");
                                historyNoneOnClick('noneOfAboveLabel7', 'noneOfAboveId7', '7');
                            }
                        }

                        if (index >= 33 && index <= 35) {
                            if (value.answer == "no") {
                                answeredCount8 = answeredCount8 + 1;
                            } else if (value.answer == "yes") {
                                $("#id" + value.qid).prop("checked", true);
                                $("#answerDiv" + value.qid).addClass("active");
                            }
                            if (answeredCount8 == 3) {
                                $("#noneOfAboveId8").attr('checked', true);
                                $("#noneOfAboveLabel8").addClass("active");
                                historyNoneOnClick('noneOfAboveLabel8', 'noneOfAboveId8', '8');
                            }
                        }
                    });
                }
            });
        }
    });
}//to fetch history answers end

//submit history answers start
function submitHistoryQuestions() {
    $('html,body').scrollTop(0);
    var form1 = document.getElementById("progressWizard");
    var historyList = "";
    for (var j = 0; j < form1.historyAnswers.length; j++) {
        var qid = $("#hiddenHistoryId" + j).val();
        var historyQidValue = $("#id" + qid).val();
        var historyCategory = $("#hiddenHistoryCategoryId" + j).val();

        if (form1.historyAnswers[j].checked) {
            historyList = historyList + "{\"qid\":\"" + qid + "\",\"category\":\"" + historyCategory + "\",\"question\":\"" + historyQidValue + "\",\"answer\":\"yes\"},";
        } else {
            historyList = historyList + "{\"qid\":\"" + qid + "\",\"category\":\"" + historyCategory + "\",\"question\":\"" + historyQidValue + "\",\"answer\":\"no\"},";
        }
    }
    historyList = historyList.substr(0, historyList.length - 1);
    historyList = "[" + historyList + "]";
//    alert(historyList);
    $.get(server_base_url + "/irheum-server/UpdatePatientHistory", {
        encounterid: $("#encid").val(),
        PtHistoryJSON: historyList
    }).done(function(data) {
        if (data == success) {
            if (getUserSessionElement("priormeds") == "no") {
                if (getUserSessionElement("Questionere") == "yes" && checkUserRole("Patient") == true) {
                    $.get(server_base_url + "/irheum-server/FetchRadamConsent", {
                        patientid: $("#pid").val()
                    }).done(function(data) {
                        if (data == "yes") {
//                        $('#priorMedsClick > a > strong').css('color', 'white');
                            removeSomeClass("history", "active");
                            removeSomeClass("historyClick", "active");
                            addSomeClass("radam", "active");
                            addSomeClass("radamClick", "active");
                            if (getUserSessionElement("Questionere") == "no") {
                                $("#firstDoneClick").show();
                            } else {
                                $("#firstDoneClick").remove();
                            }
                            getRadamQuestions();
                            $("#radamClick").show();
                            $('#radamClick').click();
                        } else if (data == "Pending") {
                            getPendingAssessments();
                        } else if (data == "no") {
                            $("#radamClick").remove();
                            $("#firstDoneClick").show();
                            getPendingAssessments();
                        }
                    });
                } else {
                    displayLargeSuccessMessages("beforePatientAssessmentMessage", "<center>" + successMessage + "</center>");
                    displayLargeSuccessMessages("afterPatientAssessmentMessage", "<center>" + successMessage + "</center>");
                    getPendingAssessments();
                }
            } else {
//            $('#historyClick > a > strong').css('color', 'white');
                removeSomeClass("history", "active");
                removeSomeClass("historyClick", "active");
                addSomeClass("priorMeds", "active");
                addSomeClass("priorMedsClick", "active");
                $('#priorMedsClick').click();
//            $('#priorMedsClick > a > strong').css('color', '#636E7B');
            }
        } else if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}//submit history answers end
//-------------------------------history end-------------------------------------

//-------------------------------prior meds start--------------------------------

//load questions for prior meds menu start
function getPriorMedsQuestions() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
    $.get(server_base_url + "/irheum-server/PatientAssessMentQuestion", {
        groupname: "PriorMed", patientid: $("#pid").val()
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            if (data != null && data.length != null) {
                $("#second1-2").text("");
                $("#second2-2").text("");
                $("#second3-2").text("");
                $("#second4-2").text("");
                var tabs = data.length / 4;
                var tab = Math.round(tabs);
                var prev = tab;
                var m = 1;
                var flag = true;
                for (var i = 0; i <= tab; i++) {
                    if (i < tab) {
                        var uniqueId = data[i]._id.$oid;
                        $("#second" + m + "-2").append("<div id='priorMedsMainDiv" + i + "' class='form-group' />");

                        $("#priorMedsMainDiv" + i).append("<div id='buttonsDivision" + i + "' class='btn-group' style='width:100%;' />");
                        $("#buttonsDivision" + i).append("<input id='hiddenPriorMedsId" + i + "' type='hidden' value='" + uniqueId + "' />");
                        $("#buttonsDivision" + i).append("<label id='priorMedsQuestion" + uniqueId + "' style='font-weight:bold;font-size:20px;width:50%;float:left;' class='control-label'>" + data[i].question + "</label> ");
                        $("#buttonsDivision" + i).append("<label class='btn quest btn-default' for='yesPriorMedId" + uniqueId + "' id='firstPriorMedsLabel" + uniqueId + "' style='border-radius: 3px; float:left; min-width:10%;max-width:18%; font-weight: bold;'><input type='radio' name='priorMedsAnswers" + uniqueId + "' id='yesPriorMedId" + uniqueId + "' style='display:none;' value='yes' onchange=priorMedYes('" + i + "','" + uniqueId + "') />Yes</label>");
                        $("#buttonsDivision" + i).append("<label class='btn quest btn-default' for='noPriorMedId" + uniqueId + "' id='secondPriorMedsLabel" + uniqueId + "' style='margin-left: 20px; float:left; min-width:10%;max-width:18%; border-radius: 3px; font-weight: bold;'><input type='radio' name='priorMedsAnswers" + uniqueId + "' id='noPriorMedId" + uniqueId + "' style='display:none;' value='no' onchange=priorMedNo('" + i + "','" + uniqueId + "') />No</label>");
                        $("#priorMedsMainDiv" + i).append("<div id='subQuestionsDiv" + uniqueId + "'/>");
                    }
                    if (i == tab - 1) {
                        tab = tab + prev;
                        m++;
                        if (m > 4) {
                            break;
                        }
                        if (flag == true && m == 4) {
                            tab = tab - 1;
                            flag = false;
                        }
                    }
                }
            }
        }
    });
}//load questions for prior meds menu end

function priorMedYes(count, qid) {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");

//    alert(count+"\t"+qid);
    $('#firstPriorMedsLabel' + qid).removeClass("active");
    $('#secondPriorMedsLabel' + qid).removeClass("active");
    $('#firstPriorMedsLabel' + qid).addClass("active");

    $("#priorMedsTable" + qid).remove();
    $("#subQuestionsDiv" + qid).text("").append("<table id='priorMedsTable" + qid + "' /><br /><br />");
    $("#priorMedsTable" + qid).text("");

    $("#priorMedsTable" + qid).append("<tr id='priorMedsCommon" + qid + "' ><td>&nbsp;</td><td><label style='font-weight:bold;color:brown;font-size:12px;' class='col-sm-12 control-label'>Please fill all * marked fields.</label></td></tr>");

    $("#priorMedsTable" + qid).append("<tr><td><label style='font-weight:bold;color:#428bca;font-size:18px;width:100%;' class='col-sm-6 control-label'>Start date *</label></td><td id='startDateAnswerError" + qid + "'><div class='form-group'><input type='text' id='startDateAnswer" + qid + "' class='form-control' placeholder='Start date' onchange=priorMedsChange('" + qid + "')><span id='startDateMsg" + qid + "' /></div></td></tr>");
    jQuery("#startDateAnswer" + qid).mask("99/99/9999");
    jQuery("#startDateAnswer" + qid).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    });

    $("#priorMedsTable" + qid).append("<tr><td><label style='font-weight:bold;color:#428bca;font-size:18px;width:100%;' class='col-sm-6 control-label'>End date *</label></td><td id='endDateAnswerError" + qid + "'><div class='form-group'><input type='text' id='endDateAnswer" + qid + "' class='form-control' placeholder='End date' onchange=priorMedsChange('" + qid + "')><span id='endDateMsg" + qid + "' /></div></td></tr>");
    jQuery("#endDateAnswer" + qid).mask("99/99/9999");
    jQuery("#endDateAnswer" + qid).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    });

    $("#priorMedsTable" + qid).append("<tr><td><label style='font-weight:bold;color:#428bca;font-size:18px;width:100%;' class='col-sm-6 control-label'>Years taken *</label></td><td id='yearsTakenError" + qid + "'><div class='form-group'><input type='text' id='yearsTakenAnswer" + qid + "' class='form-control' placeholder='Years taken' onkeyup=priorMedsChange('" + qid + "')><span id='yearsTakenMsg" + qid + "' /></div></td></tr>");
//    var yearsTakenAnswer = jQuery('#yearsTakenAnswer' + qid).spinner({min: 1});
//    yearsTakenAnswer.spinner('value', "");

    $("#priorMedsTable" + qid).append("<tr><td><label style='font-weight:bold;color:#428bca;font-size:18px;width:100%;' class='col-sm-6 control-label'>Dose *</label></td><td id='doseError" + qid + "'><div class='form-group'><input type='text' id='doseAnswer" + qid + "' class='form-control' placeholder='Dose' onkeyup=priorMedsChange('" + qid + "')><span id='doseMsg" + qid + "' /></div></td></tr>");
    $("#priorMedsTable" + qid).append("<tr><td><label style='font-weight:bold;color:#428bca;font-size:18px;width:100%;' class='col-sm-6 control-label'>Side effects *</label></td><td id='sideEffectsError" + qid + "'><div class='form-group'><input type='text' id='sideEffectsAnswer" + qid + "' class='form-control' placeholder='Side effects' onkeyup=priorMedsChange('" + qid + "')><span id='sideEffectsMsg" + qid + "' /></div></td></tr>");
    $("#priorMedsTable" + qid).append("<tr><td><label style='font-weight:bold;color:#428bca;font-size:18px;width:100%;' class='col-sm-6 control-label'>Why you stopped ? *</label></td><td id='stoppedError" + qid + "'><div class='form-group'><input type='text' id='whyYouStoppedAnswer" + qid + "' class='form-control' placeholder='Why you stopped ?' onkeyup=priorMedsChange('" + qid + "')><span id='stoppedMsg" + qid + "' /></div></td></tr>");
}

function priorMedsChange(qid) {
    if ($("#startDateAnswer" + qid).val() != "") {
        if (checkFutureDate($("#startDateAnswer" + qid).val()) != true) {
            $("#startDateAnswerError" + qid).addClass("has-error");
            $("#startDateMsg" + qid).text("").append("<span class='smallErrorMsg'>Enter valid start date.</span>");
        } else {
            $("#startDateAnswerError" + qid).removeClass("has-error");
            $("#startDateMsg" + qid).text("");
        }
    } else {
        $("#startDateAnswerError" + qid).addClass("has-error");
        $("#startDateMsg" + qid).text("").append("<span class='smallErrorMsg'>Enter start date.</span>");
    }

    if ($("#endDateAnswer" + qid).val() != "") {
        if (compareDates($("#startDateAnswer" + qid).val(), $("#endDateAnswer" + qid).val()) != true) {
            $("#endDateAnswerError" + qid).addClass("has-error");
            $("#endDateMsg" + qid).text("").append("<span class='smallErrorMsg'>End date must be greater than start date.</span>");
            return false;
        } else {
            $('#yearsTakenAnswer' + qid).val(getYears($("#startDateAnswer" + qid).val(), $("#endDateAnswer" + qid).val()));
            $("#endDateAnswerError" + qid).removeClass("has-error");
            $("#endDateMsg" + qid).text("");
        }
    } else {
        $("#endDateAnswerError" + qid).addClass("has-error");
        $("#endDateMsg" + qid).text("").append("<span class='smallErrorMsg'>Enter end date.</span>");
    }

    if ($('#yearsTakenAnswer' + qid).val() != "") {
        $('#yearsTakenAnswer' + qid).val($('#yearsTakenAnswer' + qid).val().replace(/[^\d]/, ''));
        $("#yearsTakenMsg" + qid).text("");
    } else {
        $("#yearsTakenMsg" + qid).text("").append("<br /><span class='smallErrorMsg'>Enter years taken.</span>");
    }

    if ($('#doseAnswer' + qid).val() != "") {
        $('#doseError' + qid).removeClass("has-error");
        $("#doseMsg" + qid).text("");
    } else {
        $('#doseError' + qid).addClass("has-error");
        $("#doseMsg" + qid).text("").append("<span class='smallErrorMsg'>Enter dose taken.</span>");
    }

    if ($('#sideEffectsAnswer' + qid).val() != "") {
        $('#sideEffectsError' + qid).removeClass("has-error");
        $("#sideEffectsMsg" + qid).text("");
    } else {
        $('#sideEffectsError' + qid).addClass("has-error");
        $("#sideEffectsMsg" + qid).text("").append("<span class='smallErrorMsg'>Enter side effects.</span>");
    }

    if ($('#whyYouStoppedAnswer' + qid).val() != "") {
        $('#stoppedError' + qid).removeClass("has-error");
        $("#stoppedMsg" + qid).text("");
    } else {
        $('#stoppedError' + qid).addClass("has-error");
        $("#stoppedMsg" + qid).text("").append("<span class='smallErrorMsg'>Enter why you stopped ?.</span>");
    }

    if ($("#startDateAnswer" + qid).val() != "" &&
            $("#endDateAnswer" + qid).val() != "" &&
            $('#yearsTakenAnswer' + qid).val() != "" &&
            $('#doseAnswer' + qid).val() != "" &&
            $('#sideEffectsAnswer' + qid).val() != "" &&
            $('#whyYouStoppedAnswer' + qid).val() != "") {
        $("#priorMedsCommon" + qid).text("");
        $("#beforePatientAssessmentMessage").text("");
        $("#afterPatientAssessmentMessage").text("");
    } else {
        $("#beforePatientAssessmentMessage").text("").append("<center><span style='font-weight:bold;color:brown;font-size:16px;'>Please fill all * marked fields.</span></center>");
        $("#afterPatientAssessmentMessage").text("").append("<center><span style='font-weight:bold;color:brown;font-size:16px;'>Please fill all * marked fields.</span></center>");
        $("#priorMedsCommon" + qid).text("").append("<td>&nbsp;</td><td><label style='font-weight:bold;color:brown;font-size:12px;' class='control-label'>Please fill all * marked fields.</label></td>");
    }
}

function priorMedNo(count, qid) {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");

    $("#subQuestionsDiv" + qid).text("");
    $('#firstPriorMedsLabel' + qid).removeClass("active");
    $('#secondPriorMedsLabel' + qid).removeClass("active");
    $('#secondPriorMedsLabel' + qid).addClass("active");
}

//to fetch prior meds answers start
function getPriorMedsAnswers() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val(),
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "priormed") {
                    $.each(assessments, function(index, value) {
// alert(value.question + "\t" + value.answer + "\t" + value.qid);
                        if (value.answer == "no") {
                            $('input[name=priorMedsAnswers' + value.qid + ']').val([value.answer]);
                            $('#secondPriorMedsLabel' + value.qid).addClass("active");
                        } else if (value.answer == "yes") {
                            $('input[name=priorMedsAnswers' + value.qid + ']').val([value.answer]);
                            $('#firstPriorMedsLabel' + value.qid).addClass("active");
                            priorMedYes(index, value.qid);
//                        alert(value.answer + "\t" + value.assessments);
                            $.each(value.assessments, function(index, sub) {
                                if (sub.question != undefined && sub.question != "undefined" && sub.question == "Start date") {
                                    $("#startDateAnswer" + value.qid).val("").val(sub.answer);
                                }
                                if (sub.question != undefined && sub.question != "undefined" && sub.question == "End date") {
                                    $("#endDateAnswer" + value.qid).val("").val(sub.answer);
                                }
                                if (sub.question != undefined && sub.question != "undefined" && sub.question == "Years taken") {
                                    $("#yearsTakenAnswer" + value.qid).val("").val(sub.answer);
                                }
                                if (sub.question != undefined && sub.question != "undefined" && sub.question == "Dose") {
                                    $("#doseAnswer" + value.qid).val("").val(sub.answer);
                                }
                                if (sub.question != undefined && sub.question != "undefined" && sub.question == "Side effects") {
                                    $("#sideEffectsAnswer" + value.qid).val("").val(sub.answer);
                                }
                                if (sub.question != undefined && sub.question != "undefined" && sub.question == "Why you stopped ?") {
                                    $("#whyYouStoppedAnswer" + value.qid).val("").val(sub.answer);
                                }
                                $("#priorMedsCommon" + value.qid).text("").append("<td>&nbsp;</td><td>&nbsp;</td>");
                            });
                        } else {
                            $('#firstPriorMedsLabel' + value.qid).removeClass("active");
                            $('#secondPriorMedsLabel' + value.qid).removeClass("active");
                        }
                    });
                }
            });
        }
    });
}//to fetch prior meds answers end

//submit prior meds answers start
function submitPriorMedsQuestions() {
    $('html,body').scrollTop(0);
    var priorMedsList = "";
    var radios = $("form#progressWizard2 input[type='radio']").length;
    var radiobuttonsLength = radios / 2;
    for (var j = 0; j < radiobuttonsLength; j++) {
        var qid = $("#hiddenPriorMedsId" + j).val();
        var priorMedsAnswer = $('input[name=priorMedsAnswers' + qid + ']:checked').val();
        var priorMedsQuestion = $("#priorMedsQuestion" + qid).text();
        if (priorMedsAnswer == "yes") {

            var subQuestions = "";
            var quest1 = "{\"qid\":\"" + qid + "\",\"question\":\"Start date\",\"answer\":\"" + $("#startDateAnswer" + qid).val() + "\"},";
            var quest2 = "{\"qid\":\"" + qid + "\",\"question\":\"End date\",\"answer\":\"" + $("#endDateAnswer" + qid).val() + "\"},";
            var quest3 = "{\"qid\":\"" + qid + "\",\"question\":\"Years taken\",\"answer\":\"" + $("#yearsTakenAnswer" + qid).val() + "\"},";
            var quest4 = "{\"qid\":\"" + qid + "\",\"question\":\"Dose\",\"answer\":\"" + $("#doseAnswer" + qid).val() + "\"},";
            var quest5 = "{\"qid\":\"" + qid + "\",\"question\":\"Side effects\",\"answer\":\"" + $("#sideEffectsAnswer" + qid).val() + "\"},";
            var quest6 = "{\"qid\":\"" + qid + "\",\"question\":\"Why you stopped ?\",\"answer\":\"" + $("#whyYouStoppedAnswer" + qid).val() + "\"}";
            subQuestions = "[" + quest1 + quest2 + quest3 + quest4 + quest5 + quest6 + "]";
//            alert(subQuestions);
            priorMedsList = priorMedsList + "{\"qid\":\"" + qid + "\",\"question\":\"" + priorMedsQuestion + "\",\"answer\":\"yes\",\"assessments\":" + subQuestions + "},";
        } else if (priorMedsAnswer == "no") {
            priorMedsList = priorMedsList + "{\"qid\":\"" + qid + "\",\"question\":\"" + priorMedsQuestion + "\",\"answer\":\"no\"},";
        } else {
            priorMedsList = priorMedsList + "{\"qid\":\"" + qid + "\",\"question\":\"" + priorMedsQuestion + "\",\"answer\":\"NA\"},";
        }
    }
    priorMedsList = priorMedsList.substr(0, priorMedsList.length - 1);
    priorMedsList = "[" + priorMedsList + "]";
//    alert(priorMedsList);
    $.get(server_base_url + "/irheum-server/UpdatePriorMedication", {
        encounterid: $("#encid").val(),
        ptPriorMedJSON: priorMedsList
    }).done(function(data) {
        if (data == success) {
            if (getUserSessionElement("Questionere") == "yes" && checkUserRole("Patient") == true) {
                $.get(server_base_url + "/irheum-server/FetchRadamConsent", {
                    patientid: $("#pid").val()
                }).done(function(data) {
                    if (data == "yes") {
//                        $('#priorMedsClick > a > strong').css('color', 'white');
                        removeSomeClass("priorMeds", "active");
                        removeSomeClass("priorMedsClick", "active");
                        addSomeClass("radam", "active");
                        addSomeClass("radamClick", "active");
                        if (getUserSessionElement("Questionere") == "no") {
                            $("#firstDoneClick").show();
                        } else {
                            $("#firstDoneClick").remove();
                        }
                        getRadamQuestions();
                        $("#radamClick").show();
                        $('#radamClick').click();
                    } else if (data == "Pending") {
                        getPendingAssessments();
                    } else if (data == "no") {
                        $("#radamClick").remove();
                        $("#firstDoneClick").show();
                        getPendingAssessments();
                    }
                });
            } else {
                displayLargeSuccessMessages("beforePatientAssessmentMessage", "<center>" + successMessage + "</center>");
                displayLargeSuccessMessages("afterPatientAssessmentMessage", "<center>" + successMessage + "</center>");
                getPendingAssessments();
            }
        } else if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}//submit prior meds answers end
//--------------------------------------prior meds end-------------------------------------

//--------------------------------------haq2 start-----------------------------------------
//load questions for Haq2 menu start
function getHaq2Questions() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
    $.get(server_base_url + "/irheum-server/PatientAssessMentQuestion", {
        groupname: "HAQII", patientid: $("#pid").val()
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            if (data != null && data.length != null) {
                $("#haq2Ques").text("").append("<span style='font-size:18px;'>Please select any of the following that you have experienced in the<strong><em> past month.</em></strong></span><br /><br />");
//            $("#haq2Ques").append("<span style='font-size:13px;margin-left:20px;'><b>No Difficulty &nbsp; Some Difficulty &nbsp; Much Difficulty &nbsp; Unable To Do</b></span><br /><br />");

                $("#third1-2").text("");
                $("#third2-2").text("");
                $("#third3-2").text("");
                var tabs = data.length / 3;
                var tab = Math.round(tabs);
                var prev = tab;
                var m = 1;
                var flag = true;
                for (var i = 0; i <= tab; i++) {
                    if (i < tab) {
                        var uniqueId = data[i]._id.$oid;
                        $("#third" + m + "-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='haq2QuestionFieldGroup" + i + "' class='btn-group' /><br />");
                        $("#haq2QuestionFieldGroup" + i).prepend("<label id='haq2Question" + uniqueId + "' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:18px;margin-left:10px;'>" + data[i].question + "</label><br />");
                        $("#haq2QuestionFieldGroup" + i).append("<input id='hiddenHaq2Id" + i + "' type='hidden' value='" + uniqueId + "' />");
                        $("#haq2QuestionFieldGroup" + i).append("<label for='firsthaq2Id" + uniqueId + "' id='haq2Label0" + uniqueId + "' class='btn quest btn-default' style='text-align:center;margin-left:20px;font-weight:bold;font-size:12px;min-width:90px;max-width:120px;border-radius:3px;'><input type = 'radio' style='display:none;' id='firsthaq2Id" + uniqueId + "' name='haq2Answer' onchange=haq2OnClick('0','" + uniqueId + "') onclick=haq2OnClick('0','" + uniqueId + "') value='0' />No Difficulty</label>");
                        $("#haq2QuestionFieldGroup" + i).append("<label for='secondhaq2Id" + uniqueId + "' id='haq2Label1" + uniqueId + "' class='btn quest btn-default' style='text-align:center;margin-left:20px;font-weight:bold;font-size:12px;min-width:90px;max-width:120px;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondhaq2Id" + uniqueId + "' name='haq2Answer' onchange=haq2OnClick('1','" + uniqueId + "') onclick=haq2OnClick('1','" + uniqueId + "') value='1' />Some Difficulty</label>");
                        $("#haq2QuestionFieldGroup" + i).append("<label for='thirdhaq2Id" + uniqueId + "' id='haq2Label2" + uniqueId + "' class='btn quest btn-default' style='text-align:center;margin-left:20px;font-weight:bold;font-size:12px;min-width:90px;max-width:120px;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdhaq2Id" + uniqueId + "' name='haq2Answer' onchange=haq2OnClick('2','" + uniqueId + "') onclick=haq2OnClick('2','" + uniqueId + "') value='2' />Much Difficulty</label>");
                        $("#haq2QuestionFieldGroup" + i).append("<label for='fourthhaq2Id" + uniqueId + "' id='haq2Label3" + uniqueId + "' class='btn quest btn-default' style='text-align:center;margin-left:20px;font-weight:bold;font-size:12px;min-width:90px;max-width:120px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthhaq2Id" + uniqueId + "' name='haq2Answer' onchange=haq2OnClick('3','" + uniqueId + "') onclick=haq2OnClick('3','" + uniqueId + "') value='3' />Unable To Do</label></form>");
                    }
                    if (i == tab - 1) {
                        tab = tab + prev;
                        m++;
                        if (m > 3) {
                            break;
                        }
                        if (flag == true && m == 3) {
                            tab = tab + 1;
                            flag = false;
                        }
                    }
                }
            }
        }
    });
}//load questions for Haq2 menu end

function haq2OnClick(labelVal, uniqueId) {
    for (var i = 0; i < 4; i++) {
        $("#haq2Label" + i + uniqueId).removeClass("active");
    }
    $("#haq2Label" + labelVal + uniqueId).addClass("active");
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
}

//to fetch haq2 answers start
function getHaq2Answers() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val(),
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "haqii") {
                    $.each(assessments, function(index, value) {
//                    alert(value.qid + "\t" + value.question + "\t" + value.answer);
                        if (value.answer == "0") {
                            haq2OnClick(value.answer, value.qid);
                            $('#firsthaq2Id' + value.qid).attr('checked', true);
//                            $('#haq2Label' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "1") {
                            haq2OnClick(value.answer, value.qid);
                            $('#secondhaq2Id' + value.qid).attr('checked', true);
//                            $('#haq2Label' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "2") {
                            haq2OnClick(value.answer, value.qid);
                            $('#thirdhaq2Id' + value.qid).attr('checked', true);
//                            $('#haq2Label' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "3") {
                            haq2OnClick(value.answer, value.qid);
                            $('#fourthhaq2Id' + value.qid).attr('checked', true);
//                            $('#haq2Label' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "undefined" || value.answer == undefined || value.answer == "") {
                            $('#haq2Label' + value.answer + value.qid).removeClass("active");
                        }
                    });
                }
            });
        }
    });
}//to fetch haq2 answers end

//submit haq2 answers start
function submitHaq2Questions() {
    $('html,body').scrollTop(0);
    var haq2List = "";
    var answeredCount = 0;
    var ckboxes = $("form#progressWizard3 input[type='radio']").length / 4;
    for (var j = 0; j < ckboxes; j++) {
        var qid = $("#hiddenHaq2Id" + j).val();
        var question = $("#haq2Question" + qid).text();
//        alert($('form#' + qid + ' input[name=haq2Answer]:checked').val());
        var answer = $('form#' + qid + ' input[name=haq2Answer]:checked').val();
        if (answer == "0") {
            answeredCount = answeredCount + 1;
            haq2List = haq2List + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"0\"},";
        } else if (answer == "1") {
            answeredCount = answeredCount + 1;
            haq2List = haq2List + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"1\"},";
        } else if (answer == "2") {
            answeredCount = answeredCount + 1;
            haq2List = haq2List + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"2\"},";
        } else if (answer == "3") {
            answeredCount = answeredCount + 1;
            haq2List = haq2List + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"3\"},";
        } else if (answer == undefined || answer == "undefined" || answer == "") {
            haq2List = haq2List + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"\"},";
        }
    }

    if (answeredCount < 7) {
        displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>Please answer atleast 7 questions.</center>");
        displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>Please answer atleast 7 questions.</center>");
        return false;
    } else if (answeredCount > 6) {
        haq2List = haq2List.substr(0, haq2List.length - 1);
        haq2List = "[" + haq2List + "]";
//    alert(haq2List);
        $.get(server_base_url + "/irheum-server/UpdatePatientHAQ", {
            encounterid: $("#encid").val(),
            ptHAQ2JSON: haq2List
        }).done(function(data) {
            if (data == success) {
//            $('#haq2Click > a > strong').css('color', 'white');
                removeSomeClass("haq2", "active");
                removeSomeClass("haq2Click", "active");
                addSomeClass("pain", "active");
                addSomeClass("painClick", "active");
                $("#painClick").click();
//            $('#painClick > a > strong').css('color', '#636E7B');
            } else if (data == fail) {
                displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
                displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
            } else if (data == unauthorized) {
                displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
                displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == statusException) {
                displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
                displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            }
        });
    }
}//submit haq2 answers end
//--------------------------------------haq2 end-------------------------------------

//--------------------------------------pain start-------------------------------------

//load questions for pain menu start
function getPainQuestions() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
//slider start
    $("#pain").text("").append("<div id='painQuestionFieldGroup' class='form-group' />");
    $("#painQuestionFieldGroup").text("").append("<label id='painQuestion' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>How much pain have you had because of your condition over the past week, rate how you are doing on the following scale.</label>");
    prepareSmileys("painQuestionFieldGroup");
    $("#painQuestionFieldGroup").append("<table class='sliderTable'><tr><td id='painLeftLabel' class='sliderLabelTd' /><td class='sliderTd'><div id='painSlider1' class='slider-primary' /></td><td id='painRightLabel' class='sliderLabelTd' /><td class='spinnerTd'><input type='text' id='painSpinner1' size='3' maxlength='3' class='form-control'></td></tr></table><br />");
    prepareSlider("painSlider1", "painSpinner1");
    prepareSpinner("painSlider1", "painSpinner1");
    prepareSliderLeftLabel("painLeftLabel", "No pain");
    prepareSliderRightLabel("painRightLabel", "Severe pain");
//slider end
    $("#pain").append("<center><button id='painButton' style='width:200px;font-weight:bold;' class='btn btn-primary' onclick=submitPainQuestions()>Continue</button><center>");
}//load questions for pain menu end

function getPainLabel(labelVal) {
    for (var i = 0; i < 11; i++) {
        $("#" + i + "PainLabel").removeClass("active");
    }
    $("#" + labelVal + "PainLabel").addClass("active");
}

//to fetch pain answers start
function getPainAnswers() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val()
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "pain") {
                    $.each(assessments, function(index, value) {
                        if (value.answer != "" || value.answer != undefined) {
                            $("#painSlider1").slider("value", value.answer);
                            $("#painSpinner1").val(value.answer);
                        }
                    });
                }
            });
        }
    });
}//to fetch pain answers end

//submit pain answer start
function submitPainQuestions() {
    var painList = "";
    painList = "{\"question\":\"" + $("#painQuestion").text() + "\",\"answer\":\"" + $("#painSlider1").slider("option", "value") + "\"}";
    painList = "[" + painList + "]";
//    alert(painList);
    $.get(server_base_url + "/irheum-server/PatientPainUpdate", {
        encounterid: $("#encid").val(),
        ptPainJSON: painList
    }).done(function(data) {
        if (data == success) {
//            $('#painClick > a > strong').css('color', 'white');
            removeSomeClass("pain", "active");
            removeSomeClass("painClick", "active");
            addSomeClass("fatigue", "active");
            addSomeClass("fatigueClick", "active");
            $("#fatigueClick").click();
//            $('#fatigueClick > a > strong').css('color', '#636E7B');
        } else if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}//submit pain answer end
//--------------------------------------pain end-------------------------------------

//--------------------------------------fatigue start-------------------------------------
//
//load questions for fatigue menu start
function getFatigueQuestions() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
//slider1 start
    $("#fatigue").text("").append("<div id='fatigueQuestionFieldGroup' class='form-group' />");
    $("#fatigueQuestionFieldGroup").text("").append("<label id='fatigueQuestion' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>How much of a problem has fatigue or tiredness been for you in the past week, rate how you are doing on the following scale.</label>");
    prepareSmileys("fatigueQuestionFieldGroup");
    $("#fatigueQuestionFieldGroup").append("<table class='sliderTable'><tr><td id='fatigueLeftLabel' class='sliderLabelTd' /><td class='sliderTd'><div id='fatigueSlider1' class='slider-primary' /></td><td id='fatigueRightLabel' class='sliderLabelTd' /><td class='spinnerTd'><input type='text' id='fatigueSpinner1' size='3' maxlength='3' class='form-control'></td></tr></table><br />");
    prepareSlider("fatigueSlider1", "fatigueSpinner1");
    prepareSpinner("fatigueSlider1", "fatigueSpinner1");
    prepareSliderLeftLabel("fatigueLeftLabel", "No fatigue");
    prepareSliderRightLabel("fatigueRightLabel", "Severe fatigue");
//slider1 end
    $("#fatigue").append("<center><button id='fatigueButton' style='width:200px;font-weight:bold;' class='btn btn-primary' onclick=submitFatigueQuestions()>Continue</button><center>");
}//load questions for fatigue menu end

function getFatigueLabel(labelVal) {
    for (var i = 0; i < 11; i++) {
        $("#" + i + "FatigueLabel").removeClass("active");
    }
    $("#" + labelVal + "FatigueLabel").addClass("active");
}

//to fetch fatigue answers start
function getFatigueAnswers() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val(),
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "fatigue") {
                    $.each(assessments, function(index, value) {
                        if (value.answer != "" || value.answer != undefined) {
                            $("#fatigueSlider1").slider("value", value.answer);
                            $("#fatigueSpinner1").val(value.answer);
                        }
                    });
                }
            });
        }
    });
}//to fetch fatigue answers end

//submit fatigue answer start
function submitFatigueQuestions() {
    var fatigueList = "";
    fatigueList = "{\"question\":\"" + $("#fatigueQuestion").text() + "\",\"answer\":\"" + $("#fatigueSlider1").slider("option", "value") + "\"}";
    fatigueList = "[" + fatigueList + "]";
//    alert(fatigueList);
    $.get(server_base_url + "/irheum-server/PatientFatigueUpdate", {
        encounterid: $("#encid").val(),
        ptFatigueJSON: fatigueList
    }).done(function(data) {
        if (data == success) {
//            $('#fatigueClick > a > strong').css('color', 'white');
            removeSomeClass("fatigue", "active");
            removeSomeClass("fatigueClick", "active");
            addSomeClass("stiffness", "active");
            addSomeClass("stiffnessClick", "active");
            $("#stiffnessClick").click();
//            $('#stiffnessClick > a > strong').css('color', '#636E7B');
        } else if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}//submit fatigue answer end
//--------------------------------------fatigue start-------------------------------------

//--------------------------------------stiffness start-------------------------------------
function getStiffnessQuestions() {
    $("#stiffness").text("").append("<div id='stiffnessQuestion1FieldGroup' class='form-group' />");
    $("#stiffness").prepend("<label id='stiffnessQuestion' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>If you are stiff in the morning, about how long does the stiffness last?</label><br /><br /><br />");
    $("#stiffnessQuestion1FieldGroup").append("<label for='1stiffnessAnswerId1' class='btn quest btn-default' id='1stiffnessLabel1' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getStiffnessLabel(1)' id='1stiffnessAnswerId1' name='stiffnessAnswer' value='1' />No stiffness</label><br /><br />");
    $("#stiffnessQuestion1FieldGroup").append("<label for='2stiffnessAnswerId1' class='btn quest btn-default' id='2stiffnessLabel1' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getStiffnessLabel(2)' id='2stiffnessAnswerId1' name='stiffnessAnswer' value='2' />30 minutes or less</label><br /><br />");
    $("#stiffnessQuestion1FieldGroup").append("<label for='3stiffnessAnswerId1' class='btn quest btn-default' id='3stiffnessLabel1' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getStiffnessLabel(3)' id='3stiffnessAnswerId1' name='stiffnessAnswer' value='3' />>30 minutes - 1 hour</label><br /><br />");
    $("#stiffnessQuestion1FieldGroup").append("<label for='4stiffnessAnswerId1' class='btn quest btn-default' id='4stiffnessLabel1' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getStiffnessLabel(4)' id='4stiffnessAnswerId1' name='stiffnessAnswer' value='4' />>1 - 2 hours</label><br /><br />");
    $("#stiffnessQuestion1FieldGroup").append("<label for='5stiffnessAnswerId1' class='btn quest btn-default' id='5stiffnessLabel1' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getStiffnessLabel(5)' id='5stiffnessAnswerId1' name='stiffnessAnswer' value='5' />>2 - 4 hours</label><br /><br />");
    $("#stiffnessQuestion1FieldGroup").append("<label for='6stiffnessAnswerId1' class='btn quest btn-default' id='6stiffnessLabel1' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getStiffnessLabel(6)' id='6stiffnessAnswerId1' name='stiffnessAnswer' value='6' />>4 - 8 hours</label><br /><br />");
    $("#stiffnessQuestion1FieldGroup").append("<label for='7stiffnessAnswerId1' class='btn quest btn-default' id='7stiffnessLabel1' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getStiffnessLabel(7)' id='7stiffnessAnswerId1' name='stiffnessAnswer' value='7' />More than 8 hours</label><br /><br />");
    $("#stiffness").append("<center><button id='stiffnessButton' style='width:200px;font-weight:bold;' class='btn btn-primary' onclick=submitStiffnessQuestions()>Continue</button><center>");
}
function getStiffnessLabel(labelVal) {
    for (var i = 1; i < 8; i++) {
        $("#" + i + "stiffnessLabel1").removeClass("active");
    }
    $("#" + labelVal + "stiffnessLabel1").addClass("active");
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
}


//to fetch stiffness answers start
function getStiffnessAnswers() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val(),
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "stiffness") {
                    $.each(assessments, function(index, value) {
                        if (value.question == "If you are stiff in the morning, about how long does the stiffness last?") {
                            if (value.answer != "" || value.answer != undefined) {
                                getStiffnessLabel(value.answer);
                                $('#' + value.answer + 'stiffnessAnswerId1').prop('checked', true);
//                                $('#' + value.answer + 'stiffnessLabel1').addClass("active");
                            }
                        }
                    });
                }
            });
        }
    });
}//to fetch stiffness answers end

function submitStiffnessQuestions() {
    var stiffnessList = ""
    if ($('input:radio[name=stiffnessAnswer]').is(':checked') == true) {
        stiffnessList = stiffnessList + "{\"question\":\"" + $("#stiffnessQuestion").text() + "\",\"answer\":\"" + $('input:radio[name=stiffnessAnswer]:checked').val() + "\"}";
    } else {
        displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>Please answer the question.</center>");
        displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>Please answer the question.</center>");
        return false;
    }
    stiffnessList = "[" + stiffnessList + "]";
    $.get(server_base_url + "/irheum-server/PatientStiffnessUpdate", {
        encounterid: $("#encid").val(),
        PtStiffnessJSON: stiffnessList
    }).done(function(data) {
        if (data == success) {
//            $('#stiffnessClick > a > strong').css('color', 'white');
            removeSomeClass("stiffness", "active");
            removeSomeClass("stiffnessClick", "active");
            addSomeClass("pga", "active");
            addSomeClass("pgaClick", "active");
            $("#pgaClick").click();
//            $('#pgaClick > a > strong').css('color', '#636E7B');
        } else if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}
//--------------------------------------stiffness end-------------------------------------

//--------------------------------------pga start-----------------------------------------

//load questions for pga menu start
function getPgaQuestions() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
//slider1 start
    $("#pga").text("").append("<div id='pgaQuestionFieldGroup' class='form-group' />");
    $("#pgaQuestionFieldGroup").text("").append("<label id='pgaQuestion' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>Considering all of the ways your illness effects you, rate how your feeling on the following scale.</label>");
    prepareSmileys("pgaQuestionFieldGroup");
    $("#pgaQuestionFieldGroup").append("<table class='sliderTable'><tr><td id='pgaLeftLabel' class='sliderLabelTd' /><td class='sliderTd'><div id='pgaSlider1' class='slider-primary' /></td><td id='pgaRightLabel' class='sliderLabelTd' /><td class='spinnerTd'><input type='text' id='pgaSpinner1' size='3' maxlength='3' class='form-control'></td></tr></table><br />");
    prepareSlider("pgaSlider1", "pgaSpinner1");
    prepareSpinner("pgaSlider1", "pgaSpinner1");
    prepareSliderLeftLabel("pgaLeftLabel", "Very well");
    prepareSliderRightLabel("pgaRightLabel", "Very poorly");
//slider1 end
    $("#pga").append("<center><button id='pgaButton' style='width:200px;font-weight:bold;' class='btn btn-primary' onclick=submitPgaQuestions()>Continue</button><center>");
}//load questions for pga menu end

function getPgaLabel(labelVal) {
    for (var i = 0; i < 11; i++) {
        $("#" + i + "PgaLabel").removeClass("active");
    }
    $("#" + labelVal + "PgaLabel").addClass("active");
}

//to fetch pga answers start
function getPgaAnswers() {
    $("#beforePatientAssessmentMessage").text("");
    $("#afterPatientAssessmentMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val(),
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "pga") {
                    $.each(assessments, function(index, value) {
                        if (value.answer != "" || value.answer != undefined) {
                            $("#pgaSlider1").slider("value", value.answer);
                            $("#pgaSpinner1").val(value.answer);
                        }
                    });
                }
            });
        }
    });
}//to fetch pga answers end

//submit pga answer start
function submitPgaQuestions() {
    var pgaList = "";
    pgaList = "{\"question\":\"" + $("#pgaQuestion").text() + "\",\"answer\":\"" + $("#pgaSlider1").slider("option", "value") + "\"}";
    pgaList = "[" + pgaList + "]";
//    alert(pgaList);
    $.get(server_base_url + "/irheum-server/PatientPGAUpdate", {
        encounterid: $("#encid").val(),
        ptPGAJSON: pgaList
    }).done(function(data) {
        if (data == success) {
//            $('#pgaClick > a > strong').css('color', 'white');
            removeSomeClass("pga", "active");
            removeSomeClass("pgaClick", "active");
            addSomeClass("history", "active");
            addSomeClass("historyClick", "active");
            $("#historyClick").click();
//            $('#historyClick > a > strong').css('color', '#636E7B');
            getLeftSideMenusData();
        } else if (data == fail) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}//submit pga answer end
//--------------------------------------pga end-------------------------------------