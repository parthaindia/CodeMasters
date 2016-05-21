//fetch radam questions
function getPatientAssementRadamMenus() {
    $('html,body').scrollTop(0);
    getPatientAssessmentRadamForm();//creating menus      
    getRadamFunctionQuestions();
    getRadamPainQuestions();
    getRadamFatigueQuestions();
    getRadamGlobalQuestions();
    getRadamSleepQuestions();
    getRadamStiffnessQuestions();
    getRadamOtherQuestions();
//    getRadamCatQuestions();
}
//--------------------------------------------radam-function start--------------------------------------
function getRadamFunctionQuestions() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
    $.get(server_base_url + "/irheum-server/PatientAssessMentQuestion", {
        groupname: "RADAM-Function", patientid: $("#pid").val()
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            if (data != null && data.length != null) {
                $("#radamFunction1-2").text("");
                $("#radamFunction2-2").text("");
                $("#radamFunction3-2").text("");
//            $("#radamFunction4-2").text("");
//            $("#radamFunction1-2").append("<span style='font-size:18px;'><b>No Difficulty &nbsp; Some Difficulty &nbsp; Much Difficulty &nbsp; Unable To Do</b></span><br /><br /><br />");
//            $("#radamFunction2-2").append("<span style='font-size:18px;'><b>No Difficulty &nbsp; Some Difficulty &nbsp; Much Difficulty &nbsp; Unable To Do</b></span><br /><br /><br />");

                var tabs = data.length / 2;
                var tab = Math.round(tabs);
                var prev = tab;
                var m = 1;
                var flag = true;
                for (var i = 0; i <= tab; i++) {
                    if (i < tab) {
                        var uniqueId = data[i]._id.$oid;
//                    if (data[i].category == "HAQII") {
//                        $("#radamFunction1-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamFunctionQuestionFieldGroup" + i + "' class='btn-group' /><br />");
//                        $("#functionCategory1").text("").append("HAQII");
//                        $("#radamFunctionQuestionFieldGroup" + i).prepend("<label id='radamFunctionQuestion" + uniqueId + "' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>" + data[i].question + "</label><br />");
//                        $("#radamFunctionQuestionFieldGroup" + i).append("<input id='hiddenRadamFunctionId" + i + "' type='hidden' value='" + uniqueId + "' />");
//
//                        $("#radamFunctionQuestionFieldGroup" + i).append("<label for='firstradamFunctionId" + uniqueId + "' id='radamFunctionLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('0','" + uniqueId + "') value='0' />Without Any Difficulty</label>");
//                        $("#radamFunctionQuestionFieldGroup" + i).append("<label for='secondradamFunctionId" + uniqueId + "' id='radamFunctionLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('1','" + uniqueId + "') value='1' />With Some Difficulty</label>");
//                        $("#radamFunctionQuestionFieldGroup" + i).append("<label for='thirdradamFunctionId" + uniqueId + "' id='radamFunctionLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('2','" + uniqueId + "') value='2' />With Much Difficulty</label>");
//                        $("#radamFunctionQuestionFieldGroup" + i).append("<label for='fourthradamFunctionId" + uniqueId + "' id='radamFunctionLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('3','" + uniqueId + "') value='3' />Unable To Do</label></form>");
//                    }
                        if (data[i].category == "MDHAQII") {
                            $("#radamFunction1-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamFunctionQuestionFieldGroup" + i + "' class='btn-group' /><br />");
                            $("#functionCategory1").text("").append("MDHAQII");
                            $("#radamFunctionQuestionFieldGroup" + i).prepend("<label id='radamFunctionQuestion" + uniqueId + "' class='col-sm-12 control-label' style='margin-left:10px;text-align:left;font-weight:bold;font-size:22px;'>" + data[i].question + "</label><br />");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<input id='hiddenRadamFunctionId" + i + "' type='hidden' value='" + uniqueId + "' />");

                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='firstradamFunctionId" + uniqueId + "' id='radamFunctionLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('0','" + uniqueId + "') value='0' />Without Any Difficulty</label>");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='secondradamFunctionId" + uniqueId + "' id='radamFunctionLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('1','" + uniqueId + "') value='1' />With Some Difficulty</label>");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='thirdradamFunctionId" + uniqueId + "' id='radamFunctionLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('2','" + uniqueId + "') value='2' />With Much Difficulty</label>");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='fourthradamFunctionId" + uniqueId + "' id='radamFunctionLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:80px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('3','" + uniqueId + "') value='3' />Unable To Do</label></form>");
                        }
                        if (data[i].category == "PROMIS-FUNCTION1") {
                            $("#radamFunction2-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamFunctionQuestionFieldGroup" + i + "' class='btn-group' /><br />");
                            $("#functionCategory2").text("").append("PROMIS-FUNCTION");
                            $("#radamFunctionQuestionFieldGroup" + i).prepend("<label id='radamFunctionQuestion" + uniqueId + "' class='col-sm-12 control-label' style='margin-left:10px;text-align:left;font-weight:bold;font-size:22px;'>" + data[i].question + "</label><br />");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<input id='hiddenRadamFunctionId" + i + "' type='hidden' value='" + uniqueId + "' />");

                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='firstradamFunctionId" + uniqueId + "' id='radamFunctionLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('0','" + uniqueId + "') value='0' />Not At All</label>");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='secondradamFunctionId" + uniqueId + "' id='radamFunctionLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('1','" + uniqueId + "') value='1' />Very Little</label>");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='thirdradamFunctionId" + uniqueId + "' id='radamFunctionLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('2','" + uniqueId + "') value='2' />Some What</label>");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='fourthradamFunctionId" + uniqueId + "' id='radamFunctionLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('3','" + uniqueId + "') value='3' />Quite A Lot</label>");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='fifthradamFunctionId" + uniqueId + "' id='radamFunctionLabel4" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='fifthradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('4','" + uniqueId + "') value='4' />Cannot Do</label></form>");
                        }
                        if (data[i].category == "PROMIS-FUNCTION2") {
                            $("#radamFunction2-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamFunctionQuestionFieldGroup" + i + "' class='btn-group' /><br />");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<label id='radamFunctionQuestion" + uniqueId + "' class='col-sm-12 control-label' style='margin-left:10px;text-align:left;font-weight:bold;font-size:22px;'>" + data[i].question + "</label><br />");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<input id='hiddenRadamFunctionId" + i + "' type='hidden' value='" + uniqueId + "' />");

                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='firstradamFunctionId" + uniqueId + "' id='radamFunctionLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('0','" + uniqueId + "') value='0' />Without Any Difficulty</label>");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='secondradamFunctionId" + uniqueId + "' id='radamFunctionLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('1','" + uniqueId + "') value='1' />With A Little Difficulty</label>");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='thirdradamFunctionId" + uniqueId + "' id='radamFunctionLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('2','" + uniqueId + "') value='2' />With Some Difficulty</label>");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='fourthradamFunctionId" + uniqueId + "' id='radamFunctionLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('3','" + uniqueId + "') value='3' />With Much Difficulty</label>");
                            $("#radamFunctionQuestionFieldGroup" + i).append("<label for='fifthradamFunctionId" + uniqueId + "' id='radamFunctionLabel4" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:10px;width:80px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='fifthradamFunctionId" + uniqueId + "' name='radamFunctionAnswer' onclick=radamFunctionOnClick('4','" + uniqueId + "') value='4' />Unable To Do</label></form>");
                        }
                    }

                    $("#radamFunction3-2").text("").append("<div id='radamFunctionLast1' class='form-group' />");
                    $("#functionCategory3").text("").append("Physical limitations");
                    $("#radamFunctionLast1").text("").append("<label id='radamFunctionLastQuestionSlider1' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>We are interested in learning how your illness affects your ability to function in daily life. Please rate your functional limitations OVER THE PAST WEEK on a scale of 0-10.</label>");
                    //slider start
                    prepareSmileys("radamFunctionLast1");
                    $("#radamFunction3-2").append("<table class='sliderTable'><tr><td id='radamFunctionLeftLabel' class='sliderLabelTd' /><td class='sliderTd'><div id='radamFunctionSlider1' class='slider-primary' /></td><td id='radamFunctionRightLabel' class='sliderLabelTd' /><td class='spinnerTd'><input type='text' id='radamFunctionSpinner1' size='3' maxlength='3' class='form-control'></td></tr></table><br />");
                    prepareSlider("radamFunctionSlider1", "radamFunctionSpinner1");
                    prepareSpinner("radamFunctionSlider1", "radamFunctionSpinner1");
                    prepareSliderLeftLabel("radamFunctionLeftLabel", "No functional limitations");
                    prepareSliderRightLabel("radamFunctionRightLabel", "Severe functional limitations");
                    //slider end     

                    if (i == tab - 1) {
                        tab = tab + prev;
                        m++;
                        if (m > 2) {
                            break;
                        }
                        if (flag == true && m == 2) {
                            tab = tab + 1;
                            flag = false;
                        }
                    }
                }
            }
        }
    });
}
function radamFunctionOnClick(labelVal, uniqueId) {
    for (var i = 0; i < 5; i++) {
        $("#radamFunctionLabel" + i + uniqueId).removeClass("active");
    }
    $("#radamFunctionLabel" + labelVal + uniqueId).addClass("active");
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
}

//to fetch radamFunction answers start
function getRadamFunctionAnswers() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val()}).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "radam-function") {
                    $.each(assessments, function(index, value) {
//                    alert(value.qid + "\t" + value.question + "\t" + value.answer);
                        if (value.answer == "0") {
                            $('#firstradamFunctionId' + value.qid).attr('checked', true);
                            $('#radamFunctionLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "1") {
                            $('#secondradamFunctionId' + value.qid).attr('checked', true);
                            $('#radamFunctionLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "2") {
                            $('#thirdradamFunctionId' + value.qid).attr('checked', true);
                            $('#radamFunctionLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "3") {
                            $('#fourthradamFunctionId' + value.qid).attr('checked', true);
                            $('#radamFunctionLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "4") {
                            $('#fifthradamFunctionId' + value.qid).attr('checked', true);
                            $('#radamFunctionLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "undefined" || value.answer == undefined || value.answer == "") {
                            $('#radamFunctionLabel' + value.answer + value.qid).removeClass("active");
                        }
                        if (value.question == "We are interested in learning how your illness affects your ability to function in daily life. Please rate your functional limitations OVER THE PAST WEEK on a scale of 0-10.") {
                            if (value.answer != "" || value.answer != undefined) {
                                $("#radamFunctionSlider1").slider("value", value.answer);
                                $("#radamFunctionSpinner1").val(value.answer);
                            }
                        }
                    });
                }
            });
        }
    });
}//to fetch radamFunction answers end

//submit radamFunction answers start
function submitRadamFunctionQuestions() {
    $('html,body').scrollTop(0);
    var radamFunctionList = "";
    var ckboxes = $("form#radamFunctionWizard input[type='radio']").length - 10;
    ckboxes = ckboxes / 4;
    for (var j = 0; j < ckboxes; j++) {
        var qid = $("#hiddenRadamFunctionId" + j).val();
        var question = $("#radamFunctionQuestion" + qid).text();
//        alert($('form#' + qid + ' input[name=radamFunctionAnswer]:checked').val());
        var answer = $('form#' + qid + ' input[name=radamFunctionAnswer]:checked').val();

        if (answer == "0") {
            radamFunctionList = radamFunctionList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"0\"},";
        } else if (answer == "1") {
            radamFunctionList = radamFunctionList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"1\"},";
        } else if (answer == "2") {
            radamFunctionList = radamFunctionList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"2\"},";
        } else if (answer == "3") {
            radamFunctionList = radamFunctionList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"3\"},";
        } else if (answer == "4") {
            radamFunctionList = radamFunctionList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"4\"},";
        } else if (answer == undefined || answer == "undefined" || answer == "") {
            radamFunctionList = radamFunctionList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"\"},";
        }
    }
    radamFunctionList = radamFunctionList + "{\"question\":\"" + $("#radamFunctionLastQuestionSlider1").text() + "\",\"answer\":\"" + $("#radamFunctionSlider1").slider("option", "value") + "\"}";
//    radamFunctionList = radamFunctionList.substr(0, radamFunctionList.length - 1);
    radamFunctionList = "[" + radamFunctionList + "]";
//    alert(radamFunctionList);
    $.get(server_base_url + "/irheum-server/UpdateRadamFunction", {
        encounterid: $("#encid").val(),
        PtRadamJSON: radamFunctionList
    }).done(function(data) {
        if (data == success) {
            getRadamCatQuestions("FunctionCatForm", "radamFunction");
        } else if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}//submit radamFunction answers end
//--------------------------------------------radam-function end--------------------------------------

//--------------------------------------------radam-pain start--------------------------------------

function getRadamPainQuestions() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
//slider1 start
    $("#radamPain1-2").text("").append("<div id='radamPainLast1' class='form-group' />");
    $("#radamPainLast1").text("").append("<label id='radamPainLastQuestionSlider1' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>We are also interested in learning whether or not you are affected by pain beacuse of your illness.How much pain have you had because of your illness in the past week? Rate how you are doing on the following scale of 0-10.</label>");

    prepareSmileys("radamPainLast1");
    $("#radamPain1-2").append("<table class='sliderTable'><tr><td id='radamPainLeftLabel' class='sliderLabelTd' /><td class='sliderTd'><div id='radamPainSlider1' class='slider-primary' /></td><td id='radamPainRightLabel' class='sliderLabelTd' /><td class='spinnerTd'><input type='text' id='radamPainSpinner1' size='3' maxlength='3' class='form-control'></td></tr></table><br />");
    prepareSlider("radamPainSlider1", "radamPainSpinner1");
    prepareSpinner("radamPainSlider1", "radamPainSpinner1");
    prepareSliderLeftLabel("radamPainLeftLabel", "Pain is <br />a problem");
    prepareSliderRightLabel("radamPainRightLabel", "Pain is <br />a major <br />problem");
//slider1 end
    $.get(server_base_url + "/irheum-server/PatientAssessMentQuestion", {
        groupname: "RADAM-Pain", patientid: $("#pid").val()
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            if (data != null && data.length != null) {
                $("#radamPain2-2").text("");
//            $("#radamPain2-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><span style='font-size:18px;'><b>Not at all &nbsp; A little bit &nbsp; Some what &nbsp; Quite a bit &nbsp; Very much</b></span><br /><br /><br />");
                var tabs = data.length / 1;
                var tab = Math.round(tabs);
                var prev = tab;
                var m = 1;
                var flag = true;
                for (var i = 0; i <= tab; i++) {
//                alert(data[i].question + "\t" + data[i].category + "\t" + i + "\t" + data[i].sequenceid);
                    if (i < tab) {
                        var uniqueId = data[i]._id.$oid;
                        $("#radamPain2-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamPainQuestionFieldGroup" + i + "' class='btn-group' /><br />");
                        $("#radamPainQuestionFieldGroup" + i).prepend("<label id='radamPainQuestion" + uniqueId + "' class='col-sm-12 control-label' style='margin-left:10px;text-align:left;font-weight:bold;font-size:20px;'>" + data[i].question + "</label><br />");
                        $("#radamPainQuestionFieldGroup" + i).append("<input id='hiddenRadamPainId" + i + "' type='hidden' value='" + uniqueId + "' />");
                        $("#radamPainQuestionFieldGroup" + i).append("<label for='firstradamPainId" + uniqueId + "' id='radamPainLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:100px;max-width:120px;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamPainId" + uniqueId + "' name='radamPainAnswer' onclick=radamPainOnClick('0','" + uniqueId + "') value='0' />Not at all</label>");
                        $("#radamPainQuestionFieldGroup" + i).append("<label for='secondradamPainId" + uniqueId + "' id='radamPainLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:100px;max-width:120px;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamPainId" + uniqueId + "' name='radamPainAnswer' onclick=radamPainOnClick('1','" + uniqueId + "') value='1' />A little bit</label>");
                        $("#radamPainQuestionFieldGroup" + i).append("<label for='thirdradamPainId" + uniqueId + "' id='radamPainLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:100px;max-width:120px;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamPainId" + uniqueId + "' name='radamPainAnswer' onclick=radamPainOnClick('2','" + uniqueId + "') value='2' />Some what</label>");
                        $("#radamPainQuestionFieldGroup" + i).append("<label for='fourthradamPainId" + uniqueId + "' id='radamPainLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:100px;max-width:120px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamPainId" + uniqueId + "' name='radamPainAnswer' onclick=radamPainOnClick('3','" + uniqueId + "') value='3' />Quite a bit</label>");
                        $("#radamPainQuestionFieldGroup" + i).append("<label for='fifthradamPainId" + uniqueId + "' id='radamPainLabel4" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:100px;max-width:120px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fifthradamPainId" + uniqueId + "' name='radamPainAnswer' onclick=radamPainOnClick('4','" + uniqueId + "') value='4' />Very much</label></form>");
                        if (i == tab - 1) {
                            tab = tab + prev;
                            m++;
                            if (m > 1) {
                                break;
                            }
                            if (flag == true && m == 1) {
                                tab = tab + 1;
                                flag = false;
                            }
                        }
                    }
                }
            }
        }
    });
}
function radamPainOnClick(labelVal, uniqueId) {
    for (var i = 0; i < 5; i++) {
        $("#radamPainLabel" + i + uniqueId).removeClass("active");
    }
    $("#radamPainLabel" + labelVal + uniqueId).addClass("active");
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
}

function getRadamPainAnswers() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val()}).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "radam-pain") {
                    $.each(assessments, function(index, value) {
                        if (value.question == "We are also interested in learning whether or not you are affected by pain beacuse of your illness.How much pain have you had because of your illness in the past week? Rate how you are doing on the following scale of 0-10.") {
                            if (value.answer != "" && value.answer != undefined) {
                                $("#radamPainSlider1").slider("value", value.answer);
                                $("#radamPainSpinner1").val(value.answer);
                            }
                        }
                        if (value.answer == "0") {
                            $('#firstradamPainId' + value.qid).attr('checked', true);
                            $('#radamPainLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "1") {
                            $('#secondradamPainId' + value.qid).attr('checked', true);
                            $('#radamPainLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "2") {
                            $('#thirdradamPainId' + value.qid).attr('checked', true);
                            $('#radamPainLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "3") {
                            $('#fourthradamPainId' + value.qid).attr('checked', true);
                            $('#radamPainLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "4") {
                            $('#fifthradamPainId' + value.qid).attr('checked', true);
                            $('#radamPainLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "undefined" || value.answer == undefined || value.answer == "") {
                            $('#radamPainLabel' + value.answer + value.qid).removeClass("active");
                        }
                    });
                }
            });
        }
    });
}

function submitRadamPainQuestions() {
    $('html,body').scrollTop(0);
    var radamPainList = "";
    var ckboxes = $("form#radamPainWizard input[type='radio']").length / 5;
    for (var j = 0; j < ckboxes; j++) {
        var qid = $("#hiddenRadamPainId" + j).val();
        var question = $("#radamPainQuestion" + qid).text();

        if ($('form#' + qid + ' input:radio[name=radamPainAnswer]').is(':checked') != true) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>Please answer all questions.</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>Please answer all questions.</center>");
            return false;
        } else if ($('form#' + qid + ' input:radio[name=radamPainAnswer]').is(':checked') == true) {
            $("#beforeRadamMessage").text("");
            $("#afterRadamMessage").text("");

//        alert($('form#' + qid + ' input[name=radamPainAnswer]:checked').val());
            var answer = $('form#' + qid + ' input:radio[name=radamPainAnswer]:checked').val();

            if (answer == "0") {
                radamPainList = radamPainList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"0\"},";
            } else if (answer == "1") {
                radamPainList = radamPainList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"1\"},";
            } else if (answer == "2") {
                radamPainList = radamPainList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"2\"},";
            } else if (answer == "3") {
                radamPainList = radamPainList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"3\"},";
            } else if (answer == "4") {
                radamPainList = radamPainList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"4\"},";
            } else if (answer == undefined || answer == "undefined" || answer == "") {
                radamPainList = radamPainList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"\"},";
            }
        }
    }
    radamPainList = radamPainList + "{\"question\":\"" + $("#radamPainLastQuestionSlider1").text() + "\",\"answer\":\"" + $("#radamPainSlider1").slider("option", "value") + "\"}";
    radamPainList = "[" + radamPainList + "]";
//    alert(radamPainList);
    $.get(server_base_url + "/irheum-server/UpdateRadamPain", {
        encounterid: $("#encid").val(),
        PtRadamJSON: radamPainList
    }).done(function(data) {
        if (data == success) {
            getRadamCatQuestions("PainCatForm", "radamPain");
//            changeSequence();
        } else if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}
//--------------------------------------------radam-pain end--------------------------------------

//--------------------------------------------radam-fatigue start--------------------------------------

function getRadamFatigueQuestions() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
//slider1 start
    $("#radamFatigue1-2").text("").append("<div id='radamFatigueLast1' class='form-group' />");
    $("#radamFatigueLast1").text("").append("<label id='radamFatigueLastQuestionSlider1' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>We are interested in knowing about any problems that you may have been having with fatigue.How much of a problem has fatigue or tiredness been for you IN THE PAST WEEK? Rate how you are doing on the following scale of 0-10.</label>");

    prepareSmileys("radamFatigueLast1");
    $("#radamFatigue1-2").append("<table class='sliderTable'><tr><td id='radamFatigueLeftLabel' class='sliderLabelTd' /><td class='sliderTd'><div id='radamFatigueSlider1' class='slider-primary' /></td><td id='radamFatigueRightLabel' class='sliderLabelTd' /><td class='spinnerTd'><input type='text' id='radamFatigueSpinner1' size='3' maxlength='3' class='form-control'></td></tr></table><br />");
    prepareSlider("radamFatigueSlider1", "radamFatigueSpinner1");
    prepareSpinner("radamFatigueSlider1", "radamFatigueSpinner1");
    prepareSliderLeftLabel("radamFatigueLeftLabel", "Fatigue<br /> is no<br /> problem");
    prepareSliderRightLabel("radamFatigueRightLabel", "Fatigue is <br />a major problem");
//slider1 end
    $.get(server_base_url + "/irheum-server/PatientAssessMentQuestion", {
        groupname: "RADAM-Fatigue", patientid: $("#pid").val()
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            if (data != null && data.length != null) {
                $("#radamFatigue2-2").text("");
                $("#radamFatigue2-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><br />");
                //            $("#radamFatigue2-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><span style='font-size:18px;'><b>Not at all &nbsp; A little bit &nbsp; Some what &nbsp; Quite a bit &nbsp; Very much</b></span><br /><br /><br />");             var tabs = data.length / 1;             var tab = Math.round(tabs);
                var tabs = data.length / 1;
                var tab = Math.round(tabs);
                var prev = tab;
                var m = 1;
                var flag = true;
                for (var i = 0; i <= tab; i++) {
                    //                alert(data[i].question + "\t" + data[i].category + "\t" + i + "\t" + data[i].sequenceid);
                    if (i < tab) {
                        var uniqueId = data[i]._id.$oid;
                        $("#radamFatigue2-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamFatigueQuestionFieldGroup" + i + "' class='btn-group' /><br />");
                        $("#radamFatigueQuestionFieldGroup" + i).prepend("<label id='radamFatigueQuestion" + uniqueId + "' class='col-sm-12 control-label' style='margin-left:10px;text-align:left;font-weight:bold;font-size:22px;'>" + data[i].question + "</label><br />");
                        $("#radamFatigueQuestionFieldGroup" + i).append("<input id='hiddenRadamFatigueId" + i + "' type='hidden' value='" + uniqueId + "' />");
                        $("#radamFatigueQuestionFieldGroup" + i).append("<label for='firstradamFatigueId" + uniqueId + "' id='radamFatigueLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamFatigueId" + uniqueId + "' name='radamFatigueAnswer' onclick=radamFatigueOnClick('0','" + uniqueId + "') value='0' />Not At All</label>");
                        $("#radamFatigueQuestionFieldGroup" + i).append("<label for='secondradamFatigueId" + uniqueId + "' id='radamFatigueLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamFatigueId" + uniqueId + "' name='radamFatigueAnswer' onclick=radamFatigueOnClick('1','" + uniqueId + "') value='1' />A Little Bit</label>");
                        $("#radamFatigueQuestionFieldGroup" + i).append("<label for='thirdradamFatigueId" + uniqueId + "' id='radamFatigueLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamFatigueId" + uniqueId + "' name='radamFatigueAnswer' onclick=radamFatigueOnClick('2','" + uniqueId + "') value='2' />Some What</label>");
                        $("#radamFatigueQuestionFieldGroup" + i).append("<label for='fourthradamFatigueId" + uniqueId + "' id='radamFatigueLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamFatigueId" + uniqueId + "' name='radamFatigueAnswer' onclick=radamFatigueOnClick('3','" + uniqueId + "') value='3' />Quite A Bit</label>");
                        $("#radamFatigueQuestionFieldGroup" + i).append("<label for='fifthradamFatigueId" + uniqueId + "' id='radamFatigueLabel4" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fifthradamFatigueId" + uniqueId + "' name='radamFatigueAnswer' onclick=radamFatigueOnClick('4','" + uniqueId + "') value='4' />Very Much</label></form>");
                        if (i == tab - 1) {
                            tab = tab + prev;
                            m++;
                            if (m > 1) {
                                break;
                            }
                            if (flag == true && m == 1) {
                                tab = tab + 1;
                                flag = false;
                            }
                        }
                    }
                }
            }
        }
    });
}
function radamFatigueOnClick(labelVal, uniqueId) {
    for (var i = 0; i < 5; i++) {
        $("#radamFatigueLabel" + i + uniqueId).removeClass("active");
    }
    $("#radamFatigueLabel" + labelVal + uniqueId).addClass("active");
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
}

function getRadamFatigueAnswers() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val()}).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "radam-fatigue") {
                    $.each(assessments, function(index, value) {
                        if (value.question == "We are interested in knowing about any problems that you may have been having with fatigue.How much of a problem has fatigue or tiredness been for you IN THE PAST WEEK? Rate how you are doing on the following scale of 0-10.") {
                            if (value.answer != "" && value.answer != undefined) {
                                $("#radamFatigueSlider1").slider("value", value.answer);
                                $("#radamFatigueSpinner1").val(value.answer);
                            }
                        }
                        if (value.answer == "0") {
                            $('#firstradamFatigueId' + value.qid).attr('checked', true);
                            $('#radamFatigueLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "1") {
                            $('#secondradamFatigueId' + value.qid).attr('checked', true);
                            $('#radamFatigueLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "2") {
                            $('#thirdradamFatigueId' + value.qid).attr('checked', true);
                            $('#radamFatigueLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "3") {
                            $('#fourthradamFatigueId' + value.qid).attr('checked', true);
                            $('#radamFatigueLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "4") {
                            $('#fifthradamFatigueId' + value.qid).attr('checked', true);
                            $('#radamFatigueLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "undefined" || value.answer == undefined || value.answer == "") {
                            $('#radamFatigueLabel' + value.answer + value.qid).removeClass("active");
                        }
                    });
                }
            });
        }
    });
}

function submitRadamFatigueQuestions() {
    $('html,body').scrollTop(0);
    var radamFatigueList = "";
    var ckboxes = $("form#radamFatigueWizard input[type='radio']").length / 5;
    for (var j = 0; j < ckboxes; j++) {
        var qid = $("#hiddenRadamFatigueId" + j).val();
        var question = $("#radamFatigueQuestion" + qid).text();

        if ($('form#' + qid + ' input:radio[name=radamFatigueAnswer]').is(':checked') != true) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>Please answer all questions.</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>Please answer all questions.</center>");
            return false;
        } else if ($('form#' + qid + ' input:radio[name=radamFatigueAnswer]').is(':checked') == true) {
            $("#beforeRadamMessage").text("");
            $("#afterRadamMessage").text("");

            //        alert($('form#' + qid + ' input[name=radamFatigueAnswer]:checked').val());
            var answer = $('form#' + qid + ' input:radio[name=radamFatigueAnswer]:checked').val();

            if (answer == "0") {
                radamFatigueList = radamFatigueList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"0\"},";
            } else if (answer == "1") {
                radamFatigueList = radamFatigueList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"1\"},";
            } else if (answer == "2") {
                radamFatigueList = radamFatigueList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"2\"},";
            } else if (answer == "3") {
                radamFatigueList = radamFatigueList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"3\"},";
            } else if (answer == "4") {
                radamFatigueList = radamFatigueList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"4\"},";
            } else if (answer == undefined || answer == "undefined" || answer == "") {
                radamFatigueList = radamFatigueList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"\"},";
            }
        }
    }
    radamFatigueList = radamFatigueList + "{\"question\":\"" + $("#radamFatigueLastQuestionSlider1").text() + "\",\"answer\":\"" + $("#radamFatigueSlider1").slider("option", "value") + "\"}";
    radamFatigueList = "[" + radamFatigueList + "]";
//    alert(radamFatigueList);
    $.get(server_base_url + "/irheum-server/UpdateRadamFatigue", {
        encounterid: $("#encid").val(),
        PtRadamJSON: radamFatigueList
    }).done(function(data) {
        if (data == success) {
            getRadamCatQuestions("FatigueCatForm", "radamFatigue");
//            changeSequence();
        } else if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}
//--------------------------------------------radam-fatigue end--------------------------------------

//--------------------------------------------radam-global start--------------------------------------

function getRadamGlobalQuestions() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
//slider1 start
    $("#radamGlobal").text("").append("<div id='radamGlobalLast1' class='form-group' />");
    $("#radamGlobalLast1").text("").append("<label id='radamGlobalLastQuestionSlider1' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>Considering ALL THE WAYS THAT YOUR ILLNESS AFFECTS YOU, Rate how you are doing on the following scale of 0-10.</label>");

    prepareSmileys("radamGlobalLast1");
    $("#radamGlobal").append("<table class='sliderTable'><tr><td id='radamGlobalLeftLabel' class='sliderLabelTd' /><td class='sliderTd'><div id='radamGlobalSlider1' class='slider-primary' /></td><td id='radamGlobalRightLabel' class='sliderLabelTd' /><td class='spinnerTd'><input type='text' id='radamGlobalSpinner1' size='3' maxlength='3' class='form-control'></td></tr></table><br />");
    prepareSlider("radamGlobalSlider1", "radamGlobalSpinner1");
    prepareSpinner("radamGlobalSlider1", "radamGlobalSpinner1");
    prepareSliderLeftLabel("radamGlobalLeftLabel", "Very well");
    prepareSliderRightLabel("radamGlobalRightLabel", "Very poor");
//slider1 end

    $("#radamGlobal").append("<br /><br /><label id='radamGlobalQuestion1' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>Compared to your last visit, how woud you rate your rheumatoid arthritis?</label><br /><br /><br />");
    $("#radamGlobal").append("<div id='radamGlobalQuestion1FieldGroup' class='form-group' />");

    $("#radamGlobalQuestion1FieldGroup").append("<label for='0radamGlobalAnswerId1' class='btn quest btn-default' id='0RadamGlobalLabel1' style='text-align:left;min-width:250px;max-width:300px;;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamGlobalLabel1(0)' id='0radamGlobalAnswerId1' name='radamGlobalAnswer1' value='0' />Much better</label><br /><br />");
    $("#radamGlobalQuestion1FieldGroup").append("<label for='1radamGlobalAnswerId1' class='btn quest btn-default' id='1RadamGlobalLabel1' style='text-align:left;min-width:250px;max-width:300px;;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamGlobalLabel1(1)' id='1radamGlobalAnswerId1' name='radamGlobalAnswer1' value='1' />Some what better</label><br /><br />");
    $("#radamGlobalQuestion1FieldGroup").append("<label for='2radamGlobalAnswerId1' class='btn quest btn-default' id='2RadamGlobalLabel1' style='text-align:left;min-width:250px;max-width:300px;;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamGlobalLabel1(2)' id='2radamGlobalAnswerId1' name='radamGlobalAnswer1' value='2' />About the same</label><br /><br />");
    $("#radamGlobalQuestion1FieldGroup").append("<label for='3radamGlobalAnswerId1' class='btn quest btn-default' id='3RadamGlobalLabel1' style='text-align:left;min-width:250px;max-width:300px;;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamGlobalLabel1(3)' id='3radamGlobalAnswerId1' name='radamGlobalAnswer1' value='3' />Some what the worse</label><br /><br />");
    $("#radamGlobalQuestion1FieldGroup").append("<label for='4radamGlobalAnswerId1' class='btn quest btn-default' id='4RadamGlobalLabel1' style='text-align:left;min-width:250px;max-width:300px;;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamGlobalLabel1(4)' id='4radamGlobalAnswerId1' name='radamGlobalAnswer1' value='4' />Much worse</label><br /><br />");

    $("#radamGlobal").append("<div id='radamGlobalProviderQuestion' />");
    $("#radamGlobalProviderQuestion").text("").append("<label id='radamGlobalQuestion2' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>Compared to this patient's last visit, how would you rate his/her rheumatoid arthritis?</label><br /><br /><br />");
    $("#radamGlobalProviderQuestion").append("<div id='radamGlobalQuestion2FieldGroup' class='form-group' />");

    $("#radamGlobalQuestion2FieldGroup").append("<label for='0radamGlobalAnswerId2' class='btn quest btn-default' id='0RadamGlobalLabel2' style='text-align:left;min-width:250px;max-width:300px;;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamGlobalLabel2(0)' id='0radamGlobalAnswerId2' name='radamGlobalAnswer2' value='0' />Much better</label><br /><br />");
    $("#radamGlobalQuestion2FieldGroup").append("<label for='1radamGlobalAnswerId2' class='btn quest btn-default' id='1RadamGlobalLabel2' style='text-align:left;min-width:250px;max-width:300px;;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamGlobalLabel2(1)' id='1radamGlobalAnswerId2' name='radamGlobalAnswer2' value='1' />Some what better</label><br /><br />");
    $("#radamGlobalQuestion2FieldGroup").append("<label for='2radamGlobalAnswerId2' class='btn quest btn-default' id='2RadamGlobalLabel2' style='text-align:left;min-width:250px;max-width:300px;;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamGlobalLabel2(2)' id='2radamGlobalAnswerId2' name='radamGlobalAnswer2' value='2' />About the same</label><br /><br />");
    $("#radamGlobalQuestion2FieldGroup").append("<label for='3radamGlobalAnswerId2' class='btn quest btn-default' id='3RadamGlobalLabel2' style='text-align:left;min-width:250px;max-width:300px;;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamGlobalLabel2(3)' id='3radamGlobalAnswerId2' name='radamGlobalAnswer2' value='3' />Some what the worse</label><br /><br />");
    $("#radamGlobalQuestion2FieldGroup").append("<label for='4radamGlobalAnswerId2' class='btn quest btn-default' id='4RadamGlobalLabel2' style='text-align:left;min-width:250px;max-width:300px;;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamGlobalLabel2(4)' id='4radamGlobalAnswerId2' name='radamGlobalAnswer2' value='4' />Much worse</label><br /><br />");

    if (checkUserRole("Provider") == false) {
        $("#radamGlobalProviderQuestion").hide();
    } else {
        $("#radamGlobalProviderQuestion").show();
    }

    $("#radamGlobal").append("<br /><center><button style='width:200px;font-weight:bold;' class='btn btn-primary' onclick=submitRadamGlobalAnswers()>Continue</button><center><br />");
}
function getRadamGlobalLabel1(labelVal) {
    for (var i = 0; i < 11; i++) {
        $("#" + i + "RadamGlobalLabel1").removeClass("active");
    }
    $("#" + labelVal + "RadamGlobalLabel1").addClass("active");
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
}
function getRadamGlobalLabel2(labelVal) {
    for (var i = 0; i < 11; i++) {
        $("#" + i + "RadamGlobalLabel2").removeClass("active");
    }
    $("#" + labelVal + "RadamGlobalLabel2").addClass("active");
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
}

function getRadamGlobalAnswers() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val()}).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "radam-global") {
                    $.each(assessments, function(index, value) {
                        if (value.question == "Considering ALL THE WAYS THAT YOUR ILLNESS AFFECTS YOU, Rate how you are doing on the following scale of 0-10.") {
                            if (value.answer != "" || value.answer != undefined) {
                                $("#radamGlobalSlider1").slider("value", value.answer);
                                $("#radamGlobalSpinner1").val(value.answer);
                            }
                        }
                        if (value.question == "Compared to your last visit, how woud you rate your rheumatoid arthritis?") {
                            if (value.answer != "" || value.answer != undefined) {
                                $('#' + value.answer + 'radamGlobalAnswerId1').prop('checked', true);
                                $('#' + value.answer + 'RadamGlobalLabel1').addClass("active");
                            }
                        }
                        if (value.question == "Compared to this patient's last visit, how would you rate his/her rheumatoid arthritis?") {
                            if (value.answer != "" || value.answer != undefined) {
                                $('#' + value.answer + 'radamGlobalAnswerId2').prop('checked', true);
                                $('#' + value.answer + 'RadamGlobalLabel2').addClass("active");
                            }
                        }
                    });
                }
            });
        }
    });
}

function submitRadamGlobalAnswers() {
    $('html,body').scrollTop(0);
    if ($('input[name=radamGlobalAnswer1]').is(':checked') != true) {
        displayLargeErrorMessages("beforeRadamMessage", "<center>Please answer all questions.</center>");
        displayLargeErrorMessages("afterRadamMessage", "<center>Please answer all questions.</center>");
        return false;
    } else if ($('input[name=radamGlobalAnswer1]').is(':checked') == true) {
        $("#beforeRadamMessage").text("");
        $("#afterRadamMessage").text("");
    }

    var radamGlobalList = "";

    if ($('input[name=radamGlobalAnswer1]').is(':checked') == true) {
        radamGlobalList = radamGlobalList + "{\"question\":\"" + $("#radamGlobalQuestion1").text() + "\",\"answer\":\"" + $('input[name=radamGlobalAnswer1]:checked').val() + "\"},";
    } else {
        radamGlobalList = radamGlobalList + "{\"question\":\"" + $("#radamGlobalQuestion1").text() + "\",\"answer\":\"\"},";
    }
    if ($('input[name=radamGlobalAnswer2]').is(':checked') == true) {
        radamGlobalList = radamGlobalList + "{\"question\":\"" + $("#radamGlobalQuestion2").text() + "\",\"answer\":\"" + $('input[name=radamGlobalAnswer2]:checked').val() + "\"},";
    } else {
        radamGlobalList = radamGlobalList + "{\"question\":\"" + $("#radamGlobalQuestion2").text() + "\",\"answer\":\"\"},";
    }

    radamGlobalList = radamGlobalList + "{\"question\":\"" + $("#radamGlobalLastQuestionSlider1").text() + "\",\"answer\":\"" + $("#radamGlobalSlider1").slider("option", "value") + "\"}";
    radamGlobalList = "[" + radamGlobalList + "]"; //    alert(radamGlobalList);
    $.get(server_base_url + "/irheum-server/UpdateRadamGlobal", {
        encounterid: $("#encid").val(),
        PtRadamJSON: radamGlobalList
    }).done(function(data) {
        if (data == success) {
            changeSequence();
        } else if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}
//--------------------------------------------radam-global end--------------------------------------

//--------------------------------------------radam-sleep start--------------------------------------

function getRadamSleepQuestions() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
//slider1 start
    $("#radamSleep").text("").append("<div id='radamSleepLast1' class='form-group' />");
    $("#radamSleepLast1").text("").append("<label id='radamSleepLastQuestionSlider1' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>How much of a problem has sleep (i.e. resting at night) been for you in the past week? rate how you are doing on the following scale.</label>");

    prepareSmileys("radamSleepLast1");
    $("#radamSleep").append("<table class='sliderTable'><tr><td id='radamSleepLeftLabel' class='sliderLabelTd' /><td class='sliderTd'><div id='radamSleepSlider1' class='slider-primary' /></td><td id='radamSleepRightLabel' class='sliderLabelTd' /><td class='spinnerTd'><input type='text' id='radamSleepSpinner1' size='3' maxlength='3' class='form-control'></td></tr></table><br />");
    prepareSlider("radamSleepSlider1", "radamSleepSpinner1");
    prepareSpinner("radamSleepSlider1", "radamSleepSpinner1");
    prepareSliderLeftLabel("radamSleepLeftLabel", "Sleep is no problem");
    prepareSliderRightLabel("radamSleepRightLabel", "Sleep is <br />a major problem");
//slider1 end
    $("#radamSleep").append("<br /><center><button style='width:200px;font-weight:bold;' class='btn btn-primary' onclick=submitRadamSleepAnswers()>Continue</button><center><br />");
}
function getRadamSleepAnswers() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val()}).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "radam-sleep") {
                    $.each(assessments, function(index, value) {
                        if (value.question == "How much of a problem has sleep (i.e. resting at night) been for you in the past week? rate how you are doing on the following scale.") {
                            if (value.answer != "" || value.answer != undefined) {
                                $("#radamSleepSlider1").slider("value", value.answer);
                                $("#radamSleepSpinner1").val(value.answer);
                            }
                        }
                    });
                }
            });
        }
    });
}

function submitRadamSleepAnswers() {
    var radamSleepList = "";
    radamSleepList = radamSleepList + "{\"question\":\"" + $("#radamSleepLastQuestionSlider1").text() + "\",\"answer\":\"" + $("#radamSleepSlider1").slider("option", "value") + "\"}";
    radamSleepList = "[" + radamSleepList + "]";
//    alert(radamSleepList);
    $.get(server_base_url + "/irheum-server/UpdateRadamSleep", {
        encounterid: $("#encid").val(),
        PtRadamJSON: radamSleepList
    }).done(function(data) {
        if (data == success) {
            changeSequence();
        } else if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}
//--------------------------------------------radam-sleep end--------------------------------------

//--------------------------------------------radam-stiffness start--------------------------------------

function getRadamStiffnessQuestions() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");

    $("#radamStiffness1-2").text("");
    $("#radamStiffness2-2").text("");

    $("#radamStiffness1-2").append("<div id='radamStiffnessQuestion2FieldGroup' class='form-group' />");
    $("#radamStiffness1-2").prepend("<label id='radamStiffnessQuestion2' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>In the past 7 days, how long does your stiffness last on average?</label><br /><br />");

    $("#radamStiffnessQuestion2FieldGroup").append("<label for='1radamStiffnessAnswerId2' class='btn quest btn-default' id='1RadamStiffnessLabel2' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamStiffnessLabel2(1)' id='1radamStiffnessAnswerId2' name='radamStiffnessAnswer2' value='1' />No stiffness</label><br /><br />");
    $("#radamStiffnessQuestion2FieldGroup").append("<label for='2radamStiffnessAnswerId2' class='btn quest btn-default' id='2RadamStiffnessLabel2' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamStiffnessLabel2(2)' id='2radamStiffnessAnswerId2' name='radamStiffnessAnswer2' value='2' />Less than 30 minutes</label><br /><br />");
    $("#radamStiffnessQuestion2FieldGroup").append("<label for='3radamStiffnessAnswerId2' class='btn quest btn-default' id='3RadamStiffnessLabel2' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamStiffnessLabel2(3)' id='3radamStiffnessAnswerId2' name='radamStiffnessAnswer2' value='3' />30 minutes - 1 hour</label><br /><br />");
    $("#radamStiffnessQuestion2FieldGroup").append("<label for='4radamStiffnessAnswerId2' class='btn quest btn-default' id='4RadamStiffnessLabel2' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamStiffnessLabel2(4)' id='4radamStiffnessAnswerId2' name='radamStiffnessAnswer2' value='4' />1 - 2 hours</label><br /><br />");
    $("#radamStiffnessQuestion2FieldGroup").append("<label for='5radamStiffnessAnswerId2' class='btn quest btn-default' id='5RadamStiffnessLabel2' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamStiffnessLabel2(5)' id='5radamStiffnessAnswerId2' name='radamStiffnessAnswer2' value='5' />2 - 4 hours</label><br /><br />");
    $("#radamStiffnessQuestion2FieldGroup").append("<label for='6radamStiffnessAnswerId2' class='btn quest btn-default' id='6RadamStiffnessLabel2' style='text-align:left;min-width:250px;max-width:300px;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamStiffnessLabel2(6)' id='6radamStiffnessAnswerId2' name='radamStiffnessAnswer2' value='6' />More than 4 hours</label><br /><br />");


//slider1 start
    $("#radamStiffness2-2").append("<div id='radamStiffnessLast1' class='form-group' />");
    $("#radamStiffnessLast1").text("").append("<label id='radamStiffnessLastQuestionSlider1' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>In the past 7 days, how would you rate your stiffness, on average?</label>");

    prepareSmileys("radamStiffnessLast1");
    $("#radamStiffness2-2").append("<table class='sliderTable'><tr><td id='radamStiffnessLeftLabel1' class='sliderLabelTd' /><td class='sliderTd'><div id='radamStiffnessSlider1' class='slider-primary' /></td><td id='radamStiffnessRightLabel1' class='sliderLabelTd' /><td class='spinnerTd'><input type='text' id='radamStiffnessSpinner1' size='3' maxlength='3' class='form-control'></td></tr></table><br />");
    prepareSlider("radamStiffnessSlider1", "radamStiffnessSpinner1");
    prepareSpinner("radamStiffnessSlider1", "radamStiffnessSpinner1");
    prepareSliderLeftLabel("radamStiffnessLeftLabel1", "No stiffness");
    prepareSliderRightLabel("radamStiffnessRightLabel1", "Very severe stiffness");
    //slider1 end

    //slider2 start
    $("#radamStiffness2-2").append("<div id='radamStiffnessLast2' class='form-group' />");
    $("#radamStiffnessLast2").text("").append("<br /><br /><br /><label id='radamStiffnessLastQuestionSlider2' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>In the past 7 days, how often did your stiffness interfere with or impact your activities?</label>");

    prepareSmileys("radamStiffnessLast2");
    $("#radamStiffness2-2").append("<table class='sliderTable'><tr><td id='radamStiffnessLeftLabel2' class='sliderLabelTd' /><td class='sliderTd'><div id='radamStiffnessSlider2' class='slider-primary' /></td><td id='radamStiffnessRightLabel2' class='sliderLabelTd' /><td class='spinnerTd'><input type='text' id='radamStiffnessSpinner2' size='3' maxlength='3' class='form-control'></td></tr></table><br />");
    prepareSlider("radamStiffnessSlider2", "radamStiffnessSpinner2");
    prepareSpinner("radamStiffnessSlider2", "radamStiffnessSpinner2");
    prepareSliderLeftLabel("radamStiffnessLeftLabel2", "Never");
    prepareSliderRightLabel("radamStiffnessRightLabel2", "Always");
    //slider2 end
}
function getRadamStiffnessLabel2(labelVal) {
    for (var i = 0; i < 11; i++) {
        $("#" + i + "RadamStiffnessLabel2").removeClass("active");
    }
    $("#" + labelVal + "RadamStiffnessLabel2").addClass("active");
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
}

function getRadamStiffnessAnswers() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val()}).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "radam-stiffness") {
                    $.each(assessments, function(index, value) {
                        if (value.question == "In the past 7 days, how long does your stiffness last on average?") {
                            if (value.answer != "" || value.answer != undefined) {
                                $('#' + value.answer + 'radamStiffnessAnswerId2').prop('checked', true);
                                $('#' + value.answer + 'RadamStiffnessLabel2').addClass("active");
                            }
                        }

                        if (value.question == "In the past 7 days, how would you rate your stiffness, on average?") {
                            if (value.answer != "" || value.answer != undefined) {
                                $("#radamStiffnessSlider1").slider("value", value.answer);
                                $("#radamStiffnessSpinner1").val(value.answer);
                            }
                        }
                        if (value.question == "In the past 7 days, how often did your stiffness interfere with or impact your activities?") {
                            if (value.answer != "" || value.answer != undefined) {
                                $("#radamStiffnessSlider2").slider("value", value.answer);
                                $("#radamStiffnessSpinner2").val(value.answer);
                            }
                        }
                    });
                }
            });
        }
    });
}

function submitRadamStiffnessQuestions() {
    var radamStiffnessList = "";
    if ($('input[name=radamStiffnessAnswer2]').is(':checked') == true) {
        radamStiffnessList = radamStiffnessList + "{\"question\":\"" + $("#radamStiffnessQuestion2").text() + "\",\"answer\":\"" + $('input[name=radamStiffnessAnswer2]:checked').val() + "\"},";
    } else {
        radamStiffnessList = radamStiffnessList + "{\"question\":\"" + $("#radamStiffnessQuestion2").text() + "\",\"answer\":\"\"},";
    }
    radamStiffnessList = radamStiffnessList + "{\"question\":\"" + $("#radamStiffnessLastQuestionSlider1").text() + "\",\"answer\":\"" + $("#radamStiffnessSlider1").slider("option", "value") + "\"},";
    radamStiffnessList = radamStiffnessList + "{\"question\":\"" + $("#radamStiffnessLastQuestionSlider2").text() + "\",\"answer\":\"" + $("#radamStiffnessSlider2").slider("option", "value") + "\"},";

    radamStiffnessList = radamStiffnessList.substr(0, radamStiffnessList.length - 1);
    radamStiffnessList = "[" + radamStiffnessList + "]";
    $.get(server_base_url + "/irheum-server/UpdateRadamStiffness", {
        encounterid: $("#encid").val(),
        PtRadamJSON: radamStiffnessList
    }).done(function(data) {
        if (data == success) {
            changeSequence();
        } else if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}
//--------------------------------------------radam-stiffness end--------------------------------------

//--------------------------------------------radam-other start--------------------------------------

function getRadamOtherQuestions() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
    $.get(server_base_url + "/irheum-server/PatientAssessMentQuestion", {
        groupname: "RADAM-Other", patientid: $("#pid").val()
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            if (data != null && data.length != null) {
                $("#radamOther1-2").text("");
                $("#radamOther2-2").text("");
                $("#radamOther3-2").text("");
                $("#radamOther4-2").text("");
                $("#radamOther5-2").text("");
                $("#radamOther6-2").text("");
                $("#radamOther7-2").text("");

//            $("#radamOther1-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><span style='font-size:18px;'><b>Without any difficulty &nbsp; With a little difficulty &nbsp; With some difficulty &nbsp; With much difficulty &nbsp; Unable to do</b></span><br /><br /><br />");
//            $("#radamOther2-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><span style='font-size:18px;'><b>Never &nbsp; Rarely &nbsp; Sometimes &nbsp; Often &nbsp; Always</b></span><br /><br /><br />");
//            $("#radamOther3-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><span style='font-size:18px;'><b>Never &nbsp; Rarely &nbsp; Sometimes &nbsp; Often &nbsp; Always</b></span><br /><br /><br />");
//            $("#radamOther4-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><span style='font-size:18px;'><b>Not at all &nbsp; A little bit &nbsp; Some what &nbsp; Quite a bit &nbsp; Very much</b></span><br /><br /><br />");
//            $("#radamOther5-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><span style='font-size:18px;'><b>Not at all &nbsp; A little bit &nbsp; Some what &nbsp; Quite a bit &nbsp; Very much</b></span><br /><br /><br />");
                //            $("#radamOther6-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><span style='font-size:18px;'><b>Never &nbsp; Rarely &nbsp; Sometimes &nbsp; Usually &nbsp; Always</b></span><br /><br /><br />");


                $("#radamOther1-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><br />");
                $("#radamOther2-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><br />");
                $("#radamOther3-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><br />");
                $("#radamOther4-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><br />");
                $("#radamOther5-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><br />");
                $("#radamOther6-2").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><br />");
                var tabs = data.length / 7;
                var tab = Math.round(tabs);
                var prev = tab;
                var m = 1;
                var flag = true;
                for (var i = 0; i <= tab; i++) {
                    //                alert(data[i].question + "\t" + data[i].category + "\t" + i + "\t" + data[i].sequenceid);
                    if (i < tab) {
                        var uniqueId = data[i]._id.$oid;
                        if (data[i].category == "Function") {
                            $("#radamOther1-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamOtherQuestionFieldGroup" + i + "' class='btn-group' /><br />");
                            $("#otherCategory1").text("").text("Function");
                            $("#radamOtherQuestionFieldGroup" + i).prepend("<label id='radamOtherQuestion" + uniqueId + "' class='col-sm-12 control-label' style='margin-left:10px;text-align:left;font-weight:bold;font-size:20px;'>" + data[i].question + "</label><br />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<input id='hiddenRadamOtherId" + i + "' type='hidden' value='" + uniqueId + "' />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='firstradamOtherId" + uniqueId + "' id='radamOtherLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;width:120px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('0','" + uniqueId + "') value='0' />Without Any Difficulty</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='secondradamOtherId" + uniqueId + "' id='radamOtherLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;width:120px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('1','" + uniqueId + "') value='1' />With A Little Difficulty</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='thirdradamOtherId" + uniqueId + "' id='radamOtherLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('2','" + uniqueId + "') value='2' />With Some Difficulty</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fourthradamOtherId" + uniqueId + "' id='radamOtherLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;width:100px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('3','" + uniqueId + "') value='3' />With Much Difficulty</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fifthradamOtherId" + uniqueId + "' id='radamOtherLabel4" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;width:80px;word-wrap:break-word;white-space:normal;border-radius:3px;'><input type = 'radio' style='display:none;' id='fifthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('4','" + uniqueId + "') value='4' />Unable To Do</label></form>");
                        }
                        if (data[i].category == "Anxiety") {
                            $("#radamOther2-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamOtherQuestionFieldGroup" + i + "' class='btn-group' /><br />");
                            $("#otherCategory2").text("").text("Anxiety");
                            $("#radamOtherQuestionFieldGroup" + i).prepend("<label id='radamOtherQuestion" + uniqueId + "' class='col-sm-12 control-label' style='margin-left:10px;text-align:left;font-weight:bold;font-size:20px;'>" + data[i].question + "</label><br />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<input id='hiddenRadamOtherId" + i + "' type='hidden' value='" + uniqueId + "' />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='firstradamOtherId" + uniqueId + "' id='radamOtherLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('0','" + uniqueId + "') value='0' />Never</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='secondradamOtherId" + uniqueId + "' id='radamOtherLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('1','" + uniqueId + "') value='1' />Rarely</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='thirdradamOtherId" + uniqueId + "' id='radamOtherLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('2','" + uniqueId + "') value='2' />Sometimes</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fourthradamOtherId" + uniqueId + "' id='radamOtherLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('3','" + uniqueId + "') value='3' />Often</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fifthradamOtherId" + uniqueId + "' id='radamOtherLabel4" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fifthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('4','" + uniqueId + "') value='4' />Always</label></form>");
                        }
                        if (data[i].category == "Depression") {
                            $("#radamOther3-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamOtherQuestionFieldGroup" + i + "' class='btn-group' /><br />");
                            $("#otherCategory3").text("").text("Depression");
                            $("#radamOtherQuestionFieldGroup" + i).prepend("<label id='radamOtherQuestion" + uniqueId + "' class='col-sm-12 control-label' style='margin-left:10px;text-align:left;font-weight:bold;font-size:20px;'>" + data[i].question + "</label><br />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<input id='hiddenRadamOtherId" + i + "' type='hidden' value='" + uniqueId + "' />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='firstradamOtherId" + uniqueId + "' id='radamOtherLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('0','" + uniqueId + "') value='0' />Never</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='secondradamOtherId" + uniqueId + "' id='radamOtherLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('1','" + uniqueId + "') value='1' />Rarely</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='thirdradamOtherId" + uniqueId + "' id='radamOtherLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('2','" + uniqueId + "') value='2' />Sometimes</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fourthradamOtherId" + uniqueId + "' id='radamOtherLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('3','" + uniqueId + "') value='3' />Often</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fifthradamOtherId" + uniqueId + "' id='radamOtherLabel4" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fifthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('4','" + uniqueId + "') value='4' />Always</label></form>");
                        }
                        if (data[i].category == "Fatigue") {
                            $("#radamOther4-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamOtherQuestionFieldGroup" + i + "' class='btn-group' /><br />");
                            $("#otherCategory4").text("").text("Fatigue");
                            $("#radamOtherQuestionFieldGroup" + i).prepend("<label id='radamOtherQuestion" + uniqueId + "' class='col-sm-12 control-label' style='margin-left:10px;text-align:left;font-weight:bold;font-size:20px;'>" + data[i].question + "</label><br />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<input id='hiddenRadamOtherId" + i + "' type='hidden' value='" + uniqueId + "' />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='firstradamOtherId" + uniqueId + "' id='radamOtherLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('0','" + uniqueId + "') value='0' />Not At All</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='secondradamOtherId" + uniqueId + "' id='radamOtherLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('1','" + uniqueId + "') value='1' />A Little Bit</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='thirdradamOtherId" + uniqueId + "' id='radamOtherLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('2','" + uniqueId + "') value='2' />Some What</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fourthradamOtherId" + uniqueId + "' id='radamOtherLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('3','" + uniqueId + "') value='3' />Quite A Bit</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fifthradamOtherId" + uniqueId + "' id='radamOtherLabel4" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fifthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('4','" + uniqueId + "') value='4' />Very Much</label></form>");
                        }
                        if (data[i].category == "Sleep Disturbance") {
                            $("#radamOther5-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamOtherQuestionFieldGroup" + i + "' class='btn-group' /><br />");
                            $("#otherCategory5").text("").text("Sleep Disturbance");
                            $("#radamOtherQuestionFieldGroup" + i).prepend("<label id='radamOtherQuestion" + uniqueId + "' class='col-sm-12 control-label' style='margin-left:10px;text-align:left;font-weight:bold;font-size:20px;'>" + data[i].question + "</label><br />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<input id='hiddenRadamOtherId" + i + "' type='hidden' value='" + uniqueId + "' />");
//                        if (data[i].question == "My sleep quality was") {
                            //                            $("#radamOtherQuestionFieldGroup" + i).prepend("<span style='font-size:18px;'><b>Very poor &nbsp; Poor &nbsp; Fair &nbsp; Good &nbsp; Very good</b></span><br /><br />");
//                        }

                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='firstradamOtherId" + uniqueId + "' id='radamOtherLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('0','" + uniqueId + "') value='0' />Not At All</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='secondradamOtherId" + uniqueId + "' id='radamOtherLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('1','" + uniqueId + "') value='1' />A Little Bit</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='thirdradamOtherId" + uniqueId + "' id='radamOtherLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('2','" + uniqueId + "') value='2' />Some What</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fourthradamOtherId" + uniqueId + "' id='radamOtherLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('3','" + uniqueId + "') value='3' />Quite A Bit</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fifthradamOtherId" + uniqueId + "' id='radamOtherLabel4" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fifthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('4','" + uniqueId + "') value='4' />Very Much</label></form>");
                        }
                        if (data[i].category == "Social Participation") {
                            $("#radamOther6-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamOtherQuestionFieldGroup" + i + "' class='btn-group' /><br />");
                            $("#otherCategory6").text("").text("Social Participation");
                            $("#radamOtherQuestionFieldGroup" + i).prepend("<label id='radamOtherQuestion" + uniqueId + "' class='col-sm-12 control-label' style='margin-left:10px;text-align:left;font-weight:bold;font-size:20px;'>" + data[i].question + "</label><br />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<input id='hiddenRadamOtherId" + i + "' type='hidden' value='" + uniqueId + "' />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='firstradamOtherId" + uniqueId + "' id='radamOtherLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('0','" + uniqueId + "') value='0' />Never</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='secondradamOtherId" + uniqueId + "' id='radamOtherLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('1','" + uniqueId + "') value='1' />Rarely</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='thirdradamOtherId" + uniqueId + "' id='radamOtherLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('2','" + uniqueId + "') value='2' />Sometimes</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fourthradamOtherId" + uniqueId + "' id='radamOtherLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('3','" + uniqueId + "') value='3' />Usually</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fifthradamOtherId" + uniqueId + "' id='radamOtherLabel4" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fifthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('4','" + uniqueId + "') value='4' />Always</label></form>");
                        }
//                    $("#lastQuestion").remove();
//                    $("#radamOther7-2").append("<span id='lastQuestion' />");
//                    $("#lastQuestion").text("").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><br />");
                        //                    $("#lastQuestion").text("").append("<span style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...</span><br /><br /><span style='font-size:18px;'><b>Not at all &nbsp; A little bit &nbsp; Some what &nbsp; Quite a bit &nbsp; Very much</b></span><br /><br /><br />");
                        if (data[i].category == "Pain Interference") {
                            $("#radamOther7-2").append("<form id='" + uniqueId + "' name='" + uniqueId + "'><div id='radamOtherQuestionFieldGroup" + i + "' class='btn-group' /><br />");
                            $("#otherLastDispId").remove();
                            $("#radamOther7-2").prepend("<span id='otherLastDispId' style='font-weight:bold;font-size:24px;color:blue;'>In the past 7 days...<br /><br /></span>");
                            $("#otherCategory7").text("").text("Pain Interference");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label id='radamOtherQuestion" + uniqueId + "' class='col-sm-12 control-label' style='margin-left:10px;text-align:left;font-weight:bold;font-size:20px;'>" + data[i].question + "</label><br />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<input id='hiddenRadamOtherId" + i + "' type='hidden' value='" + uniqueId + "' />");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='firstradamOtherId" + uniqueId + "' id='radamOtherLabel0" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='firstradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('0','" + uniqueId + "') value='0' />Not At All</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='secondradamOtherId" + uniqueId + "' id='radamOtherLabel1" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='secondradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('1','" + uniqueId + "') value='1' />A Little Bit</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='thirdradamOtherId" + uniqueId + "' id='radamOtherLabel2" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='thirdradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('2','" + uniqueId + "') value='2' />Some What</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fourthradamOtherId" + uniqueId + "' id='radamOtherLabel3" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fourthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('3','" + uniqueId + "') value='3' />Quite A Bit</label>");
                            $("#radamOtherQuestionFieldGroup" + i).append("<label for='fifthradamOtherId" + uniqueId + "' id='radamOtherLabel4" + uniqueId + "' class='btn quest btn-default' style='margin-left:20px;font-weight:bold;font-size:12px;min-width:80px;max-width:100px;border-radius:3px;'><input type = 'radio' style='display:none;' id='fifthradamOtherId" + uniqueId + "' name='radamOtherAnswer' onclick=radamOtherOnClick('4','" + uniqueId + "') value='4' />Very Much</label></form>");
                        }
                    }
                    //slider start
                    $("#radamOtherLast").remove();
                    $("#radamOther7-2").append("<div id='radamOtherLast' class='form-group' />");
                    $("#radamOtherLast").text("").append("<br /><br /><label id='radamOtherLastQuestionSlider' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>How would you rate your pain on average?</label>");

                    prepareSmileys("radamOtherLast");
                    $("#radamOtherLast").append("<table class='sliderTable'><tr><td id='radamOtherLeftLabel' class='sliderLabelTd' /><td class='sliderTd'><div id='radamOtherSlider' class='slider-primary' /></td><td id='radamOtherRightLabel' class='sliderLabelTd' /><td class='spinnerTd'><input type='text' id='radamOtherSpinner' size='3' maxlength='3' class='form-control'></td></tr></table><br />");
                    prepareSlider("radamOtherSlider", "radamOtherSpinner");
                    prepareSpinner("radamOtherSlider", "radamOtherSpinner");
                    prepareSliderLeftLabel("radamOtherLeftLabel", "No pain");
                    prepareSliderRightLabel("radamOtherRightLabel", "Worst pain");
                    //slider end

//                    $("#radamOtherLastQuestionFieldGroup").remove();
//                    $("#radamOther7-2").append("<div id='radamOtherLastQuestionFieldGroup' class='form-group' />");
//                    $("#radamOtherLastQuestionFieldGroup").text("").append("<br /><br /><label id='radamOtherLastQuestion' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>Are you currently experiencing a flare of your rheumatoid arthritis?</label>");
//                    $("#radamOtherLastQuestionFieldGroup").append("<label for='1radamOtherLastAnswerId' class='btn quest btn-default' id='1RadamOtherLastLabel' style='min-width:6%;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamOtherLastLabel(1)' id='1radamOtherLastAnswerId' name='radamOtherLastAnswer' value='yes' />Yes</label>&nbsp;");
//                    $("#radamOtherLastQuestionFieldGroup").append("<label for='2radamOtherLastAnswerId' class='btn quest btn-default' id='2RadamOtherLastLabel' style='min-width:6%;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamOtherLastLabel(2)' id='2radamOtherLastAnswerId' name='radamOtherLastAnswer' value='no' />No</label><br /><br />");

                    $("#otherCategory8").text("").text("Flare");
                    $("#radamOtherLastQuestionFieldGroup").remove();
                    $("#radamOther8-2").append("<div id='radamOtherLastQuestionFieldGroup' class='form-group' />");
                    $("#radamOtherLastQuestionFieldGroup").text("").append("<br /><br /><label id='radamOtherLastQuestion' class='col-sm-12 control-label' style='text-align:left;font-weight:bold;font-size:20px;'>Are you currently experiencing a flare of your rheumatoid arthritis?</label>");
                    $("#radamOtherLastQuestionFieldGroup").append("<label for='1radamOtherLastAnswerId' class='btn quest btn-default' id='1RadamOtherLastLabel' style='min-width:6%;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamOtherLastLabel(1)' id='1radamOtherLastAnswerId' name='radamOtherLastAnswer' value='yes' />Yes</label>&nbsp;");
                    $("#radamOtherLastQuestionFieldGroup").append("<label for='2radamOtherLastAnswerId' class='btn quest btn-default' id='2RadamOtherLastLabel' style='min-width:6%;margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' style='display:none;' onclick='getRadamOtherLastLabel(2)' id='2radamOtherLastAnswerId' name='radamOtherLastAnswer' value='no' />No</label><br /><br />");


                    if (i == tab - 1) {
                        tab = tab + prev;
                        m++;
                        if (m > 7) {
                            break;
                        }
                        if (flag == true && m == 7) {
                            tab = tab + 1;
                            flag = false;
                        }
                    }
                }
            }
        }
    });
}
function radamOtherOnClick(labelVal, uniqueId) {
    for (var i = 0; i < 5; i++) {
        $("#radamOtherLabel" + i + uniqueId).removeClass("active");
    }
    $("#radamOtherLabel" + labelVal + uniqueId).addClass("active");
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
}

function getRadamOtherLastLabel(labelVal) {
    for (var i = 0; i < 11; i++) {
        $("#" + i + "RadamOtherLastLabel").removeClass("active");
    }
    $("#" + labelVal + "RadamOtherLastLabel").addClass("active");
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
}

//to fetch radamOther answers start
function getRadamOtherAnswers() {
    $("#beforeRadamMessage").text("");
    $("#afterRadamMessage").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientAssessments", {
        encounterid: $("#encid").val()}).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        } else {
            $.each(data, function(index, value) {
                var assessments = value.assessments;
                if (value.type.toLowerCase() == "radam-other") {
                    $.each(assessments, function(index, value) {
                        //                    alert(value.qid + "\t" + value.question + "\t" + value.answer);
                        if (value.answer == "0") {
                            $('#firstradamOtherId' + value.qid).attr('checked', true);
                            $('#radamOtherLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "1") {
                            $('#secondradamOtherId' + value.qid).attr('checked', true);
                            $('#radamOtherLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "2") {
                            $('#thirdradamOtherId' + value.qid).attr('checked', true);
                            $('#radamOtherLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "3") {
                            $('#fourthradamOtherId' + value.qid).attr('checked', true);
                            $('#radamOtherLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "4") {
                            $('#fifthradamOtherId' + value.qid).attr('checked', true);
                            $('#radamOtherLabel' + value.answer + value.qid).addClass("active");
                        } else if (value.answer == "undefined" || value.answer == undefined || value.answer == "") {
                            $('#radamOtherLabel' + value.answer + value.qid).removeClass("active");
                        }

                        if (value.question == "How would you rate your pain on average?") {
                            if (value.answer != "" || value.answer != undefined) {
                                $("#radamOtherSlider").slider("value", value.answer);
                                $("#radamOtherSpinner").val(value.answer);
                            }
                        }
                        if (value.question == "Are you currently experiencing a flare of your rheumatoid arthritis?") {
                            if (value.answer == "yes") {
                                $('#1radamOtherLastAnswerId').prop('checked', true);
                                $('#1RadamOtherLastLabel').addClass("active");
                            } else if (value.answer == "no") {
                                $('#2radamOtherLastAnswerId').prop('checked', true);
                                $('#2RadamOtherLastLabel').addClass("active");
                            } else {
                                $('#1radamOtherLastAnswerId').prop('checked', false);
                                $('#1RadamOtherLastLabel').removeClass("active");
                                $('#2radamOtherLastAnswerId').prop('checked', false);
                                $('#2RadamOtherLastLabel').removeClass("active");
                            }
                        }
                    });
                }
            });
        }
    });
}//to fetch radamOther answers end

//submit radamOther answers start
function submitRadamOtherQuestions() {
    $('html,body').scrollTop(0);
    var radamOtherList = "";
    //    var ckboxes = $("form#progressWizard3 input[type='radio']").attr("checked", false).length / 4;
    var ckboxes = $("form#radamOtherWizard input[type='radio']").length - 2;
    ckboxes = ckboxes / 5;
    for (var j = 0; j < ckboxes; j++) {
        var qid = $("#hiddenRadamOtherId" + j).val();
        var question = $("#radamOtherQuestion" + qid).text();
//        alert($('form#' + qid + ' input[name=radamOtherAnswer]:checked').val());
        //        alert("Question:" + j + "\tAnswer:" + answer);
        var answer = $('form#' + qid + ' input[name=radamOtherAnswer]:checked').val();
        //        alert(j + "\t" + qid + "\t" + question + "\t" + answer);
        if (answer == "0") {
            radamOtherList = radamOtherList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"0\"},";
        } else if (answer == "1") {
            radamOtherList = radamOtherList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"1\"},";
        } else if (answer == "2") {
            radamOtherList = radamOtherList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"2\"},";
        } else if (answer == "3") {
            radamOtherList = radamOtherList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"3\"},";
        } else if (answer == "4") {
            radamOtherList = radamOtherList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"4\"},";
        } else if (answer == undefined || answer == "undefined" || answer == "") {
            radamOtherList = radamOtherList + "{\"qid\":\"" + qid + "\",\"question\":\"" + question + "\",\"answer\":\"\"},";
        }
    }
    radamOtherList = radamOtherList + "{\"question\":\"" + $("#radamOtherLastQuestionSlider").text() + "\",\"answer\":\"" + $("#radamOtherSlider").slider("option", "value") + "\"},";
    radamOtherList = radamOtherList + "{\"question\":\"" + $("#radamOtherLastQuestion").text() + "\",\"answer\":\"" + $('input[name=radamOtherLastAnswer]:checked').val() + "\"}";
    radamOtherList = "[" + radamOtherList + "]";
//    alert(radamOtherList);
    $.get(server_base_url + "/irheum-server/UpdateRadamFlare", {
        encounterid: $("#encid").val(),
        PtRadamJSON: radamOtherList
    }).done(function(data) {
        if (data == success) {
            changeSequence();
        } else if (data == fail) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + failMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + unauthorizedMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>" + statusExceptionMessage + "</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}//submit radamOther answers end
//--------------------------------------------radam-other end--------------------------------------

//--------------------------------------------radam-cat start--------------------------------------
function getRadamCatQuestions(catform, divId) {
    ///fetchCatToken
    $.get(server_base_url + "/irheum-server/FetchCatToken", {
        catForm: catform
    }).done(function(data) {
        startAssessment(data.catForm, data.catRegId, data.catToken, divId);
    });
}

function startAssessment(form, catRegId, catToken, divId) {
    $("#" + divId).text("").append("<center><br /><br /><br /><br /><img src='../images/loaders/loader10.gif'><br /><h3>Please wait while loading the questions...</h3><br></center>");
    $.ajax({
        url: "https://www.assessmentcenter.net/ac_api/2012-01/Assessments/" + form + ".json",
        cache: false,
        type: "POST",
        data: "UID=test",
        dataType: "json",
        beforeSend: function(xhr) {
            var Reg = catRegId;
            var Token = catToken;

            var bytes = Crypto.charenc.Binary.stringToBytes(Reg + ":" + Token);
            var base64 = Crypto.util.bytesToBase64(bytes);
            xhr.setRequestHeader("Authorization", "Basic " + base64);
        },
        success: function(data) {
            var container = document.getElementById(divId);
            for (var k = container.childNodes.length - 1; k > -1; k--) {
                container.removeChild(container.childNodes[k]);
            }
            $("#radamCatData").text("").append("<input type='hidden' id='UID' value='" + data.OID + "'>");
            renderScreen(catRegId, catToken, divId);
        }, error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function renderScreen(catRegId, catToken, divId) {
    sessionStorage.removeItem("catContinueAction");
    sessionStorage.setItem("radamCatList", "");
    sessionStorage.setItem("catCount", "0");
    $.ajax({
        url: "https://www.assessmentcenter.net/ac_api/2012-01/Participants/" + document.getElementById("UID").value + ".json",
        cache: false,
        type: "POST",
        data: "ItemResponseOID=" + "" + "&Response=" + "",
        dataType: "json",
        beforeSend: function(xhr) {
            var bytes = Crypto.charenc.Binary.stringToBytes(catRegId + ":" + catToken);
            var base64 = Crypto.util.bytesToBase64(bytes);
            xhr.setRequestHeader("Authorization", "Basic " + base64);
        },
        success: function(data) {
            if (data.DateFinished != '') {
                return;
            }
            var screen = "";
            for (var j = 0; j < data.Items[0].Elements.length; j++) {
                if (typeof (data.Items[0].Elements[j].Map) == 'undefined') {
                    screen = screen + "<span id='questionSpanId' style='font-weight:bold;font-size:18px;'>" + data.Items[0].Elements[j].Description + "</span>";
                } else {
                    var length = 0;
                    for (var k = 0; k < data.Items[0].Elements[j].Map.length; k++) {
                        if (k == data.Items[0].Elements[j].Map.length - 1) {
                            length = k + 1;
                        }
                        screen = screen + "<br /><br />" + "<button style='min-width:25%;max-width:50%;font-weight:bold;text-align:center;font-size:12px;border-radius:3px;color:#333;' class='btn btn-default' id=\'" + data.Items[0].Elements[j].Map[k].Value + "\' name=\'" + data.Items[0].Elements[j].Map[k].ItemResponseOID + "\' value=\'" + data.Items[0].Elements[j].Map[k].Description + "\' onclick=selectResponse(this,'" + catRegId + "','" + catToken + "','" + divId + "','" + data.Items[0].Elements[j].Map[k].Value + "') >" + data.Items[0].Elements[j].Map[k].Description + "</button>";
                    }
                    screen = screen + "<br /><br /><br /><br /><center><input type='button' style='font-weight:bold;' class='btn btn-primary' value='Continue' onclick=radamCatContinueFunction()><div id='hiddenCtSelectionBtnId' style='display:none;'></div><div id='hiddenCtSelectionLengthId' style='display:none;'>" + length + "</div><div id='catErrorMsg'></div></center>";
                }
            }
            document.getElementById(divId).innerHTML = screen;
        }, error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}
function radamCatContinueFunction() {
    var btnid = $("#hiddenCtSelectionBtnId").text();
    if (btnid == "") {
        displaySmallErrorMessages("catErrorMsg", "Please select at least one answer");
    } else {
        sessionStorage.setItem("catContinueAction", "yes");
        $("#" + btnid).click();
    }

}
function selectResponse(obj, catRegId, catToken, divId, btnid) {
    $("#hiddenCtSelectionBtnId").text("").append(btnid);
    var length = $("#hiddenCtSelectionLengthId").text();
    for (var k = 0; k <= length; k++) {
        $("#" + k).removeClass("btn-success");
    }
    $("#" + btnid).removeClass("btn-default");
    $("#" + btnid).addClass("btn-success");
    if (sessionStorage.getItem("catContinueAction") != "yes") {
        $("#catErrorMsg").text("");
        return;
    }
    var que = $("#questionSpanId").text();
    var ans = obj.value;
    var radamCatList = sessionStorage.getItem("radamCatList");
    var count = sessionStorage.getItem("catCount");
    count = parseInt(count) + 1;
    radamCatList = radamCatList + "{\"qid\":\"" + count + "\",\"category\":\"RADAM-CAT\",\"question\":\"" + que + "\",\"answer\":\"" + ans + "\"},";
    sessionStorage.setItem("radamCatList", radamCatList);
    sessionStorage.setItem("catCount", count);

    $("#" + divId).text("").append("<center><br /><br /><br /><br /><img src='../images/loaders/loader10.gif'><br /><h3>Please wait while loading the next question...</h3><br></center>");
    $.ajax({
        url: "https://www.assessmentcenter.net/ac_api/2012-01/Participants/" + document.getElementById("UID").value + ".json",
        cache: false,
        type: "POST",
        data: "ItemResponseOID=" + obj.name + "&Response=" + obj.id,
        dataType: "json", beforeSend: function(xhr) {
            var Reg = catRegId;
            var Token = catToken;
            var bytes = Crypto.charenc.Binary.stringToBytes(Reg + ":" + Token);
            var base64 = Crypto.util.bytesToBase64(bytes);
            xhr.setRequestHeader("Authorization", "Basic " + base64);
        },
        success: function(data) {
            if (data.DateFinished != '') {
                $("#secondDoneClick").show();
                $("#" + divId).text("").append("<center><h3>You have finished the assessment.<br /> Thank you.</h3></center>");

                var catJson = sessionStorage.getItem("radamCatList");
                catJson = catJson.substring(0, (catJson.length - 1));
                catJson = "[" + catJson + "]";
                //call the BE to save the date and then delete the radamCatList and catCount from session.
                $.get(server_base_url + "/irheum-server/UpdateCat", {
                    encounterid: $("#encid").val(),
                    RADAMCATJson: catJson,
                    AssessmentId: $("#UID").val()
                }).done(function(data) {
                    sessionStorage.removeItem("catContinueAction");
                    sessionStorage.removeItem("catCount");
                });
//                closePatientAssessmentsQuestions();
                changeSequence();
//                $("#radamSequenceCount").val("");
                return;
            }
            var screen = "";
            for (var j = 0; j < data.Items[0].Elements.length; j++) {
                if (typeof (data.Items[0].Elements[j].Map) == 'undefined') {
                    screen = screen + "<span id='questionSpanId' style='font-weight:bold;font-size:18px;'>" + data.Items[0].Elements[j].Description + "</span>";
                } else {
                    sessionStorage.setItem("catContinueAction", "no");
                    var length = 0;
                    for (var k = 0; k < data.Items[0].Elements[j].Map.length; k++) {
                        if (k == data.Items[0].Elements[j].Map.length - 1) {
                            length = k + 1;
                        }
                        screen = screen + "<br /><br />" + "<button style='min-width:25%;max-width:50%;font-weight:bold;text-align:center;font-size:12px;border-radius:3px;color:#333;' class='btn btn-default' id=\'" + data.Items[0].Elements[j].Map[k].Value + "\' name=\'" + data.Items[0].Elements[j].Map[k].ItemResponseOID + "\' value=\'" + data.Items[0].Elements[j].Map[k].Description + "\' onclick=selectResponse(this,'" + catRegId + "','" + catToken + "','" + divId + "','" + data.Items[0].Elements[j].Map[k].Value + "') >" + data.Items[0].Elements[j].Map[k].Description + "</button>";
                    }
                    screen = screen + "<br /><br /><br /><br /><center><input type='button' style='font-weight:bold;' class='btn btn-primary' value='Continue' onclick=radamCatContinueFunction('" + length + "')><div id='hiddenCtSelectionBtnId' style='display:none;'></div><div id='hiddenCtSelectionLengthId' style='display:none;'>" + length + "</div><div id='catErrorMsg'></div></center>";
                }
            }
            document.getElementById(divId).innerHTML = screen;
        }, error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}
//--------------------------------------------radam-cat end--------------------------------------

//getting first sequence
function getFirstSequence() {
//disabling all menus    
//    $('#radamFunctionClick').attr('class', 'disabled');
//    $('#radamPainClick').attr('class', 'disabled');
//    $('#radamFatigueClick').attr('class', 'disabled');
//    $('#radamGlobalClick').attr('class', 'disabled');
//    $('#radamSleepClick').attr('class', 'disabled');
//    $('#radamStiffnessClick').attr('class', 'disabled');
//    $('#radamOtherClick').attr('class', 'disabled');
//    $('#radamCatClick').attr('class', 'disabled');

    //removing all active
    for (var i = 0; i < 7; i++) {
        var sequenceNames = $("#radamSequenceList").val().split(",")[i].split("-")[1];
        removeSomeClass("radam" + sequenceNames, "active");
        removeSomeClass("radam" + sequenceNames + "Click", "active");
//        $("#radam" + sequenceNames + "Click > a > strong").css('color', 'white');
    }

//adding first group active
    var sequenceName = $("#radamSequenceList").val().split(",")[0].split("-")[1];
    addSomeClass("radam" + sequenceName, "active");
    addSomeClass("radam" + sequenceName + "Click", "active");
//    $("#radam" + sequenceName + "Click > a > strong").css('color', '#636E7B');
    callRadamAnswers(sequenceName);
    $("#radamSpinner").remove();
}
function changeSequence() {
    //removing active   
    if ($("#radamSequenceCount").val() != 7) {
        var sequenceCount1 = parseInt($("#radamSequenceCount").val());
        var sequenceName1 = $("#radamSequenceList").val().split(",")[sequenceCount1 - 1].split("-")[1];
        removeSomeClass("radam" + sequenceName1, "active");
        removeSomeClass("radam" + sequenceName1 + "Click", "active");
//        $("#radam" + sequenceName1 + "Click > a > strong").css('color', 'white');

//adding active
        var sequenceName2 = $("#radamSequenceList").val().split(",")[$("#radamSequenceCount").val()].split("-")[1];
        addSomeClass("radam" + sequenceName2, "active");
        addSomeClass("radam" + sequenceName2 + "Click", "active");
        callRadamAnswers(sequenceName2);
        var sequenceCount2 = parseInt($("#radamSequenceCount").val());
        $("#radamSequenceCount").val("").val(sequenceCount2 + 1);

    } else if ($("#radamSequenceCount").val() == 7) {
//        var sequenceCount1 = parseInt($("#radamSequenceCount").val());
//        var sequenceName1 = $("#radamSequenceList").val().split(",")[sequenceCount1 - 1].split("-")[1];
//        removeSomeClass("radam" + sequenceName1, "active");
//        removeSomeClass("radam" + sequenceName1 + "Click", "active");
////        $("#radam" + sequenceName1 + "Click > a > strong").css('color', 'white');
//
//        addSomeClass("radamCat", "active");
//        addSomeClass("radamCatClick", "active");
////        $("#radamCatClick > a > strong").css('color', '#636E7B');
        closePatientAssessmentsQuestions();
        $("#radamSequenceCount").val("");
    } else {
        closePatientAssessmentsQuestions();
        $("#radamSequenceCount").val("");
    }
}

function callRadamAnswers(name) {
    if (name == "Function") {
//        $("#radamFunctionClick > a > strong").css('color', '#636E7B');
        getRadamFunctionAnswers();
        $('html,body').scrollTop(0);
    }
    if (name == "Pain") {
//        $("#radamPainClick > a > strong").css('color', '#636E7B');
        getRadamPainAnswers();
        $('html,body').scrollTop(0);
    }
    if (name == "Fatigue") {
//        $("#radamFatigueClick > a > strong").css('color', '#636E7B');
        getRadamFatigueAnswers();
        $('html,body').scrollTop(0);
    }
    if (name == "Global") {
//        $("#radamGlobalClick > a > strong").css('color', '#636E7B');
        getRadamGlobalAnswers();
        $('html,body').scrollTop(0);
    }
    if (name == "Sleep") {
//        $("#radamSleepClick > a > strong").css('color', '#636E7B');
        getRadamSleepAnswers();
        $('html,body').scrollTop(0);
    }
    if (name == "Stiffness") {
//        $("#radamStiffnessClick > a > strong").css('color', '#636E7B');
        getRadamStiffnessAnswers();
        $('html,body').scrollTop(0);
    }
    if (name == "Other") {
//        $("#radamOtherClick > a > strong").css('color', '#636E7B');
        getRadamOtherAnswers();
        $('html,body').scrollTop(0);
    }
}