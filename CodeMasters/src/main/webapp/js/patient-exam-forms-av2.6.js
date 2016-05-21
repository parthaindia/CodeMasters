function prepareLeftSideMenus() {
    $("#patientExamLeftPanelId").text("").append("<div class='media' style='height:49px;'><div class='media-body'><h4 id='pat-ufname-disp' style='text-transform: capitalize;' class='media-heading' title='Patient First Name'></h4><small id='pat-ulname-disp' style='text-transform: capitalize;' class='text-muted' title='Patient Last Name'></small></div></div>");
//menus start
    $("#patientExamLeftPanelId").append("<ul id='patientExamLeftPanelUl' class='nav nav-pills nav-stacked' />");

//dashboard
    $("#patientExamLeftPanelUl").text("").append("<li id='dashboardMenu' class='leftMenus'><a href='javascript:callDashboard()'><i class='glyphicon glyphicon-home'></i><span>Dashboard</span></a></li>");

//patient dsahboard
    $("#patientExamLeftPanelUl").append("<li id='patientDashboardMenu' class='leftMenus'><a href='javascript:callPatientDashboard()'><i class='glyphicon glyphicon-backward'></i><span>Patient Demographics</span></a></li>");

//labs
    if (checkUserPrivelege("LabManagement") == true) {
        $("#patientExamLeftPanelUl").append("<li id='labsMenu' class='leftMenus'><a href='javascript:showLabs()'><i class='glyphicon glyphicon-plus-sign'></i><span>Labs</span></a></li>");
        $("#patientExamLeftPanelUl").append("<li id='leftEsrMenu'><a href='javascript:showLabs()'><span class='pull-right' id='leftEsr'></span><span>ESR</span></a></li>");
        $("#patientExamLeftPanelUl").append("<li id='leftCrpMenu'><a href='javascript:showLabs()'><span class='pull-right' id='leftCrp'></span><span>CRP</span></a></li>");
        $("#patientExamLeftPanelUl").append("<li id='leftRfMenu'><a href='javascript:showLabs()'><span class='pull-right' id='leftRf' style='font-size:15px;'></span><span>RF</span></a></li>");
        $("#patientExamLeftPanelUl").append("<li id='leftAnticcpMenu'><a href='javascript:showLabs()'><span class='pull-right' id='leftAnticcp' style='font-size:15px;'></span><span>Anti-CCP</span></a></li>");
        $("#patientExamLeftPanelUl").append("<li id='leftVectradaMenu'><a href='javascript:showLabs()'><span class='pull-right' id='leftVectrada'></span><span>Vectra-DA</span></a></li>");
    } else {
        $("#labsMenu").remove();
        $("#leftEsrMenu").remove();
        $("#leftCrpMenu").remove();
        $("#leftRfMenu").remove();
        $("#leftAnticcpMenu").remove();
        $("#leftVectradaMenu").remove();
    }

//patient assessment    
    if (checkUserPrivelege("PatientAssessment") == true) {
        $("#patientExamLeftPanelUl").append("<li id='patientAssessmentMenu' class='leftMenus'><a href='javascript:showPatientAssessmentMode()'><i class='fa fa-user-md'></i><span>Patient Assessment</span></a></li>");
    } else {
        $("#patientAssessmentMenu").remove();
    }

//joint count    
    if (checkUserPrivelege("JointCount") == true) {
        $("#patientExamLeftPanelUl").append("<li class='active leftMenus' id='jointCountMenu'><a href='javascript:showJointCount()'><i class='glyphicon glyphicon-user'></i><span class='pull-right' id='leftTender'></span><span>Joint Count</span></a></li>");
    } else {
        $("#jointCountMenu").remove();
    }

//physician assessment
    if (checkUserPrivelege("PhysicianGlobalAssessment") == true) {
        $("#patientExamLeftPanelUl").append("<li id='physicianAssessmentMenu' class='leftMenus'><a href='javascript:showPhysicianAssessment()'><i class='fa fa-stethoscope'></i><span>Physician Assessment</span></a></li>");
        $("#patientExamLeftPanelUl").append("<li id='leftRaseverityMenu'><a href='javascript:showPhysicianAssessment()'><span class='pull-right' id='leftRaseverity'></span><span>RA Severity</span></a></li>");
    } else {
        $("#physicianAssessmentMenu").remove();
        $("#leftRaseverityMenu").remove();
    }

//outcome measures
    $("#patientExamLeftPanelUl").append("<li id='outcomeMeasuresMenu' class='leftMenus'><a href='javascript:showOutcomeMeasures()'><i class='glyphicon glyphicon-file'></i><span>Outcome Measures</span></a></li>");
    $("#patientExamLeftPanelUl").append("<li id='leftSdaiMenu'><a href='javascript:showOutcomeMeasures()'><span class='pull-right' id='leftSdai'></span><span>SDAI</span></a></li>");
    $("#patientExamLeftPanelUl").append("<li id='leftCdaiMenu'><a href='javascript:showOutcomeMeasures()'><span class='pull-right' id='leftCdai'></span><span>CDAI</span></a></li>");
    $("#patientExamLeftPanelUl").append("<li id='leftDasesrMenu'><a href='javascript:showOutcomeMeasures()'><span class='pull-right' id='leftDasesr'></span><span>DAS28-ESR</span></a></li>");
    $("#patientExamLeftPanelUl").append("<li id='leftDascrpMenu'><a href='javascript:showOutcomeMeasures()'><span class='pull-right' id='leftDascrp'></span><span>DAS28-CRP</span></a></li>");
//    $("#patientExamLeftPanelUl").append("<li id='leftRapid3Menu'><a href='javascript:showRapidPopup()'><span class='pull-right' id='leftRapid3'></span><span>PAS2</span></a></li>");
    $("#patientExamLeftPanelUl").append("<li id='leftRapid3Menu'><a href='javascript:showOutcomeMeasures()'><span class='pull-right' id='leftRapid3'></span><span>PAS2</span></a></li>");
    $("#patientExamLeftPanelUl").append("<li id='reviewPatientHistoryMenu' class='leftMenus'><a href='javascript:showReviewPatientHistory()'><i class='fa fa-history'></i><span>Review Patient History</span></a></li>");

//medication
    if (getUserSessionElement("medication") == "no") {
        $("#medicationMenu").remove();
    } else {
        if (checkUserPrivelege("Medication") == true) {
            $("#patientExamLeftPanelUl").append("<li id='medicationMenu' class='leftMenus'><a href='javascript:showMedication();getprescriptionQuesionare();getMedicationComment();'><i class='glyphicon glyphicon-file'></i><span>Rx</span></a></li>");
        } else {
            $("#medicationMenu").remove();
        }
    }

//complete exam
    if (checkUserRole("Provider") == true) {
        $("#patientExamLeftPanelUl").append("<li id='completeExamMenu' class='leftMenus'></li>");
    } else {
        $("#completeExamMenu").remove();
    }
}

//patient labs form
function getPatientLabsForm() {
    $('html,body').scrollTop(0);
    $("#labsDiv").text("").append("<a id='importLabsId' href='javascript:populatePreviousLabs()' style='float:right;margin-right:10px;margin-top:-5px;'><span class='glyphicon glyphicon-import'></span>&nbsp;&nbsp;<b>Import previous labs</b></a><br /><div id='labsSubDiv' class='panel panel-primary' />");
    $("#labsSubDiv").text("").append("<div class='panel-heading' style='height:14px;'><center><h3 class='pt-label' style='margin-top:-7px;font-size:16px;'><b>Labs</b></h3></center></div>");
    $("#labsSubDiv").append("<div class='panel-body' id='labsDivId' />");

//first table
    $("#labsDivId").append("<center><span id='beforeLabsUpdateMsg' /></center><table id='labsTable' class='table table-striped table-bordered responsive dataTable no-footer dtr-inline' role='grid' />");
    $("#labsTable").text("").append("<tr><td class='col-md-2'><b>Labs Date</b></td><td><div class='col-md-6' style='min-width:58.5%;max-width:100%;'><input type='text' id='labsDate' placeholder='MM/DD/YYYY' class='form-control col-sm-3' onchange='labsDate_blur()'></div></td></tr>");
    jQuery("#labsDate").mask("99/99/9999");
    jQuery("#labsDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    }, "widget").css({"z-index": 100, "position": "relative"});

//----------------------ESR start----------------------------------
    $("#labsTable").append("<tr id='esrTr' />");
    $("#esrTr").append("<td><label style='float: left;'><b>ESR</b></label><div class='col-sm-7' style='float: left;'><select id='esrUnit' class='form-control'><option selected='selected'>(mm/hr)</option></select></div></td>");
//    $("#esrTr").append("<td><div class='col-md-2 labsBtnAlignment'><div class='btn-group' data-toggle='buttons'><button id='esrComparatorNaLabel' class='btn quest btn-default'><input type='radio' id='esrComparatorNa' name='esrComparator' value='NA'><label class='fa'><b>NA</b></label></button><button id='esrComparatorLessLabel' class='btn quest btn-default'><input type='radio' id='esrComparatorLess' name='esrComparator' value='<'><label class='fa fa-chevron-left'></label></button><button id='esrComparatorGreaterLabel' class='btn quest btn-default'><input type='radio' id='esrComparatorGreater' name='esrComparator' value='>'><label class='fa fa-chevron-right'></label></button></div></div><div class='col-sm-2'><input type='text' id='esrValue' class='form-control' onchange='labKeyUp()'></div><div class='col-md-2'><input type='text' id='esrDate' placeholder='MM/DD/YYYY' class='form-control' onchange='labKeyUp()'></div></td>");
    $("#esrTr").append("<td id='esrTd' />");

    //toggle buttons
    $("#esrTd").text("").append("<div class='col-md-2 labsBtnAlignment'><div class='btn-group'><label id='esrComparatorNaLabel' ondblclick=labsToggleDoubleClick('esr') class='btn quest btn-default'><input type='radio' id='esrComparatorNa' style='display:none;' onclick=labsToggleClick('esrComparatorNa','esrComparatorNaLabel','esrComparator','esr') name='esrComparator' value='NA' /><b>NA</b></label><label id='esrComparatorLessLabel' ondblclick=labsToggleDoubleClick('esr') style='font-size:20px;' class='btn quest btn-default'><input type='radio' id='esrComparatorLess' style='display:none;' onclick=labsToggleClick('esrComparatorLess','esrComparatorLessLabel','esrComparator','esr') name='esrComparator' value='<' /><b><</b></label><label id='esrComparatorGreaterLabel' ondblclick=labsToggleDoubleClick('esr') style='font-size:20px;' class='btn quest btn-default'><input type='radio' id='esrComparatorGreater' style='display:none;' onclick=labsToggleClick('esrComparatorGreater','esrComparatorGreaterLabel','esrComparator','esr') name='esrComparator' value='>' /><b>></b></label></div></div>");

    //spinner
    $("#esrTd").append("<div class='col-sm-2'><input type='text' id='esrValue' size=15 maxlength=15 class='form-control' onkeyup='labKeyUp()' onchange='labKeyUp()'><span id='esrValueMsg'/></div>");
    jQuery('#esrValue').spinner({min: 0, max: 150, step: 0.5, stop: function(event, ui) {
            labKeyUp();
        }}).spinner('value', "");

    //date field
    $("#esrTd").append("<div class='col-md-2' id='esrDateError'><input type='text' id='esrDate' placeholder='MM/DD/YYYY' class='form-control' onkeyup='labKeyUp()' onchange='labKeyUp()'><span id='esrDateMsg' /></div>");
    jQuery("#esrDate").mask("99/99/9999");
    jQuery("#esrDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    }, "widget").css({"z-index": 100, "position": "relative"});
//---------------------------------ESR end--------------------------

//----------------------CRP start-----------------------------------
    $("#labsTable").append("<tr id='crpTr' />");
    $("#crpTr").append("<td><label style='float: left;'><b>CRP</b></label><div class='col-sm-7' style='float: left;'><select id='crpUnit' class='form-control'><option selected='selected'>(mg/L)</option><option>(mg/dL)</option></select></div></td>");
//    $("#crpTr").append("<td><div class='col-md-2 labsBtnAlignment'><div class='btn-group' data-toggle='buttons'><button id='crpComparatorNaLabel' class='btn quest btn-default'><input type='radio' id='crpComparatorNa' name='crpComparator' value='NA'><label class='fa'><b>NA</b></label></button><button id='crpComparatorLessLabel' class='btn quest btn-default'><input type='radio' id='crpComparatorLess' name='crpComparator' value='<'><label class='fa fa-chevron-left'></label></button><button id='crpComparatorGreaterLabel' class='btn quest btn-default'><input type='radio' id='crpComparatorGreater' name='crpComparator' value='>'><label class='fa fa-chevron-right'></label></button></div></div><div class='col-md-2'><input type='text' id='crpValue' class='form-control'  onchange='labKeyUp()'></div><div class='col-md-2'><input type='text' id='crpDate' placeholder='MM/DD/YYYY' class='form-control' onchange='labKeyUp()'></div></td>");
    $("#crpTr").append("<td id='crpTd' />");

    //toggle buttons
    $("#crpTd").text("").append("<div class='col-md-2 labsBtnAlignment'><div class='btn-group'><label id='crpComparatorNaLabel' ondblclick=labsToggleDoubleClick('crp') class='btn quest btn-default'><input type='radio' style='display:none;' onclick=labsToggleClick('crpComparatorNa','crpComparatorNaLabel','crpComparator','crp') id='crpComparatorNa' name='crpComparator' value='NA'><b>NA</b></label><label id='crpComparatorLessLabel' style='font-size:20px;' ondblclick=labsToggleDoubleClick('crp') class='btn quest btn-default'><input type='radio' id='crpComparatorLess' style='display:none;' onclick=labsToggleClick('crpComparatorLess','crpComparatorLessLabel','crpComparator','crp') name='crpComparator' value='<'><b><</b></label><label id='crpComparatorGreaterLabel' style='font-size:20px;' ondblclick=labsToggleDoubleClick('crp') class='btn quest btn-default'><input type='radio' id='crpComparatorGreater' style='display:none;' onclick=labsToggleClick('crpComparatorGreater','crpComparatorGreaterLabel','crpComparator','crp') name='crpComparator' value='>'><b>></b></label></div></div>");

    //spinner
    $("#crpTd").append("<div class='col-md-2'><input type='text' id='crpValue' size=15 maxlength=15 class='form-control' onkeyup='labKeyUp()' onchange='labKeyUp()'><span id='crpValueMsg'/></div>");
    jQuery('#crpValue').spinner({min: 0, max: 150, step: 0.5, stop: function(event, ui) {
            labKeyUp();
        }}).spinner('value', "");

    //date field
    $("#crpTd").append("<div class='col-md-2' id='crpDateError'><input type='text' id='crpDate' placeholder='MM/DD/YYYY' class='form-control' onkeyup='labKeyUp()' onchange='labKeyUp()'><span id='crpDateMsg' /></div>");
    jQuery("#crpDate").mask("99/99/9999");
    jQuery("#crpDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    }, "widget").css({"z-index": 100, "position": "relative"});
//----------------------CRP end-----------------------------------

//----------------------RF start-----------------------------------        
    $("#labsTable").append("<tr id='rfTr' />");
    $("#rfTr").append("<td class='col-md-2'><b>RF</b></td>");
//    $("#rfTr").append("<td><div class='col-md-2 labsBtnAlignment'><div class='btn-group' data-toggle='buttons'><button id='rfFlagNaLabel' class='btn quest btn-default'><input type='radio' id='rfFlagNa' name='rfFlag' value='NA'><label class='fa'><b>NA</b></label></button><button id='rfFlagNegativeLabel' class='btn quest btn-default'><input type='radio' id='rfFlagNegative' name='rfFlag' value='-'><label class='fa fa-minus'></label></button><button id='rfFlagPositiveLabel' class='btn quest btn-default'><input type='radio' id='rfFlagPositive' name='rfFlag' value='+'><label class='fa fa-plus'></label></button></div></div><div class='col-md-2'><input type='text'id='rfValue' class='form-control'  onchange='labKeyUp()'></div><div class='col-md-2'><input type='text' id='rfDate' placeholder='MM/DD/YYYY' class='form-control' onchange='labKeyUp()'></div></td>");
    $("#rfTr").append("<td id='rfTd' />");

    //toggle buttons
    $("#rfTd").text("").append("<div class='col-md-2 labsBtnAlignment'><div class='btn-group'><label ondblclick=labsToggleDoubleClick('rf') id='rfFlagNaLabel' class='btn quest btn-default'><input type='radio' style='display:none;' onclick=labsToggleClick('rfFlagNa','rfFlagNaLabel','rfFlag','rf') id='rfFlagNa' name='rfFlag' value='NA'><b>NA</b></label><label style='font-size:35px;' ondblclick=labsToggleDoubleClick('rf') id='rfFlagNegativeLabel' class='btn quest btn-default'><input type='radio' style='display:none;' onclick=labsToggleClick('rfFlagNegative','rfFlagNegativeLabel','rfFlag','rf') id='rfFlagNegative' name='rfFlag' value='-'><b>-</b></label><label style='font-size:23px;' ondblclick=labsToggleDoubleClick('rf') id='rfFlagPositiveLabel' class='btn quest btn-default'><input type='radio' style='display:none;' onclick=labsToggleClick('rfFlagPositive','rfFlagPositiveLabel','rfFlag','rf') id='rfFlagPositive' name='rfFlag' value='+'><b>+</b></label></div></div>");

    //spinner
    $("#rfTd").append("<div class='col-md-2'><input type='text' id='rfValue' size=15 maxlength=15 class='form-control' onkeyup='labKeyUp()' onchange='labKeyUp()'><span id='rfValueMsg'/></div>");
    jQuery('#rfValue').spinner({min: 0, step: 0.5, stop: function(event, ui) {
            labKeyUp();
        }}).spinner('value', "");

    //date field
    $("#rfTd").append("<div class='col-md-2' id='rfDateError'><input type='text' id='rfDate' placeholder='MM/DD/YYYY' class='form-control' onkeyup='labKeyUp()' onchange='labKeyUp()'><span id='rfDateMsg' /></div>");
    jQuery("#rfDate").mask("99/99/9999");
    jQuery("#rfDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    }, "widget").css({"z-index": 100, "position": "relative"});
//----------------------RF end-----------------------------------

//----------------------ANTICCP start-----------------------------------
    $("#labsTable").append("<tr id='anticcpTr' />");
    $("#anticcpTr").append("<td class='col-md-2'><b>Anti-CCP</b></td>");
//    $("#anticcpTr").append("<td><div class='col-md-2 labsBtnAlignment'><div class='btn-group' data-toggle='buttons'><button id='anticcpFlagNaLabel' class='btn quest btn-default'><input type='radio' id='anticcpFlagNa' name='anticcpFlag' value='NA'><label class='fa'><b>NA</b></label></button><button id='anticcpFlagNegativeLabel' class='btn quest btn-default'><input type='radio' id='anticcpFlagNegative' name='anticcpFlag' value='-'><label class='fa fa-minus'></label></button><button id='anticcpFlagPositiveLabel' class='btn quest btn-default'><input type='radio' id='anticcpFlagPositive' name='anticcpFlag' value='+'><label class='fa fa-plus'></label></button></div></div><div class='col-md-2'><input type='text'id='anticcpValue' class='form-control'  onchange='labKeyUp()'></div><div class='col-md-2'><input type='text' id='anticcpDate' placeholder='MM/DD/YYYY' class='form-control' onchange='labKeyUp()'></div></td>");
    $("#anticcpTr").append("<td id='anticcpTd' />");

    //toggle buttons
    $("#anticcpTd").text("").append("<div class='col-md-2 labsBtnAlignment'><div class='btn-group'><label ondblclick=labsToggleDoubleClick('anticcp') id='anticcpFlagNaLabel' class='btn quest btn-default'><input type='radio' style='display:none;' onclick=labsToggleClick('anticcpFlagNa','anticcpFlagNaLabel','anticcpFlag','anticcp') id='anticcpFlagNa' name='anticcpFlag' value='NA'><b>NA</b></label><label ondblclick=labsToggleDoubleClick('anticcp') style='font-size:35px;' id='anticcpFlagNegativeLabel' class='btn quest btn-default'><input type='radio' style='display:none;' onclick=labsToggleClick('anticcpFlagNegative','anticcpFlagNegativeLabel','anticcpFlag','anticcp') id='anticcpFlagNegative' name='anticcpFlag' value='-'><b>-</b></label><label ondblclick=labsToggleDoubleClick('anticcp') style='font-size:23px;' id='anticcpFlagPositiveLabel' class='btn quest btn-default'><input type='radio' style='display:none;' onclick=labsToggleClick('anticcpFlagPositive','anticcpFlagPositiveLabel','anticcpFlag','anticcp') id='anticcpFlagPositive' name='anticcpFlag' value='+'><b>+</b></label></div></div>");

    //spinner
    $("#anticcpTd").append("<div class='col-md-2'><input type='text' id='anticcpValue' size=15 maxlength=15 class='form-control' onkeyup='labKeyUp()' onchange='labKeyUp()'><span id='anticcpValueMsg'/></div>");
    jQuery('#anticcpValue').spinner({min: 0, step: 0.5, stop: function(event, ui) {
            labKeyUp();
        }}).spinner('value', "");

    //date field
    $("#anticcpTd").append("<div class='col-md-2' id='anticcpDateError'><input type='text' id='anticcpDate' placeholder='MM/DD/YYYY' class='form-control' onkeyup='labKeyUp()' onchange='labKeyUp()'><span id='anticcpDateMsg' /></div>");
    jQuery("#anticcpDate").mask("99/99/9999");
    jQuery("#anticcpDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    }, "widget").css({"z-index": 100, "position": "relative"});
//----------------------ANTICCP end-----------------------------------

//second table   
//----------------------VECTRA-DA start-----------------------------------
    $("#labsDivId").append("<br /><br /><table id='vectraTable' class='table table-striped table-bordered responsive dataTable no-footer dtr-inline' role='grid' style='border-color:#428bca;' />");
    $("#vectraTable").text("").append("<tr id='vectraTr' />");
    $("#vectraTr").append("<td class='col-md-2'><b>Vectra-DA</b></td>");
//    $("#vectraTr").append("<td><div class='col-md-2 labsBtnAlignment'><div class='btn-group' data-toggle='buttons'><button id='vectradaFlagNaLabel' class='btn quest btn-default'><input type='radio' id='vectradaFlagNa' name='vectradaFlag' value='NA'><label class='fa'><b>NA</b></label></button><button id='vectradaFlagNegativeLabel' class='btn quest btn-default'><input type='radio' id='vectradaFlagNegative' name='vectradaFlag' value='-'><label class='fa fa-minus'></label></button><button id='vectradaFlagPositiveLabel' class='btn quest btn-default'><input type='radio' id='vectradaFlagPositive' name='vectradaFlag' value='+'><label class='fa fa-plus'></label></button></div></div><div class='col-md-2'><input type='text' id='vectradaValue' class='form-control'  onchange='labKeyUp()'></div><div class='col-md-2'><input type='text' id='vectradaDate' placeholder='MM/DD/YYYY' class='form-control' onchange='labKeyUp()'></div></td>");
    $("#vectraTr").append("<td id='vectraTd' />");

    //toggle buttons
    $("#vectraTd").text("").append("<div class='col-md-2 labsBtnAlignment'><div class='btn-group'><label style='font-size:12px;' ondblclick=labsToggleDoubleClick('vectrada') id='vectradaFlagNaLabel' class='btn quest btn-default'><input type='radio' style='display:none;' onclick=labsToggleClick('vectradaFlagNa','vectradaFlagNaLabel','vectradaFlag','vectrada') id='vectradaFlagNa' name='vectradaFlag' value='Low'><b>Low</b></label><label style='font-size:12px;' ondblclick=labsToggleDoubleClick('vectrada') id='vectradaFlagNegativeLabel' class='btn quest btn-default'><input type='radio' style='display:none;' onclick=labsToggleClick('vectradaFlagNegative','vectradaFlagNegativeLabel','vectradaFlag','vectrada') id='vectradaFlagNegative' name='vectradaFlag' value='Med'><b>Med</b></label><label style='font-size:12px;' ondblclick=labsToggleDoubleClick('vectrada') id='vectradaFlagPositiveLabel' class='btn quest btn-default'><input type='radio' style='display:none;' onclick=labsToggleClick('vectradaFlagPositive','vectradaFlagPositiveLabel','vectradaFlag','vectrada') id='vectradaFlagPositive' name='vectradaFlag' value='High'><b>High</b></label></div></div>");

    //spinner
    $("#vectraTd").append("<div class='col-md-2'><input type='text' id='vectradaValue' size=15 maxlength=15 class='form-control' onkeyup='labKeyUp()' onchange='labKeyUp()'><span id='vectradaValueMsg'/></div>");
    jQuery('#vectradaValue').spinner({min: 0, step: 0.5, stop: function(event, ui) {
            labKeyUp();
        }}).spinner('value', "");

    //date field
    $("#vectraTd").append("<div class='col-md-2' id='vectradaDateError'><input type='text' id='vectradaDate' placeholder='MM/DD/YYYY' class='form-control' onkeyup='labKeyUp()' onchange='labKeyUp()'><span id='vectradaDateMsg' /></div>");
    jQuery("#vectradaDate").mask("99/99/9999");
    jQuery("#vectradaDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    }, "widget").css({"z-index": 100, "position": "relative"});
//----------------------VECTRA-DA end-----------------------------------

//save button    
    $("#labsDivId").append("<center><button id='labsSubmitButton' class='btn btn-primary' onclick='labValidations()'><b>Save</b></button><a href=javascript:showLabs() id='labsCancelButton' style='margin-left:30px;'>Cancel</a></center><center><span id='afterLabsUpdateMsg'></span></center>");
    if ($("#encno").val() == 1) {
        $("#importLabsId").remove();
    }
}

function labsToggleClick(id, label, name, group) {
//    alert(id + "\t" + label + "\t" + name + "\t" + group);
    if ($('input:radio[name="' + name + '"]').is(":checked") == true) {
        if (group == "esr") {
            $("#" + group + "ComparatorNa").attr('checked', false);
            $("#" + group + "ComparatorNaLabel").removeClass("active");
            $("#" + group + "ComparatorLess").attr('checked', false);
            $("#" + group + "ComparatorLessLabel").removeClass("active");
            $("#" + group + "ComparatorGreater").attr('checked', false);
            $("#" + group + "ComparatorGreaterLabel").removeClass("active");

            $("#esrValueMsg").text("");
            $("#esrDateMsg").text("");
            removeSomeClass("esrDateError", "has-error");

            if ($("#" + id).val() == "NA") {
                $("#esrComparatorNa").attr('checked', true);
                $("#esrComparatorNaLabel").addClass("active");
            } else if ($("#" + id).val() == "<") {
                $("#esrComparatorLess").attr('checked', true);
                $("#esrComparatorLessLabel").addClass("active");
            } else if ($("#" + id).val() == ">") {
                $("#esrComparatorGreater").attr('checked', true);
                $("#esrComparatorGreaterLabel").addClass("active");
            }
        }
        if (group == "crp") {
            $("#" + group + "ComparatorNa").attr('checked', false);
            $("#" + group + "ComparatorNaLabel").removeClass("active");
            $("#" + group + "ComparatorLess").attr('checked', false);
            $("#" + group + "ComparatorLessLabel").removeClass("active");
            $("#" + group + "ComparatorGreater").attr('checked', false);
            $("#" + group + "ComparatorGreaterLabel").removeClass("active");

            $("#crpValueMsg").text("");
            $("#crpDateMsg").text("");
            removeSomeClass("crpDateError", "has-error");

            if ($("#" + id).val() == "NA") {
                $("#crpComparatorNa").attr('checked', true);
                $("#crpComparatorNaLabel").addClass("active");
            } else if ($("#" + id).val() == "<") {
                $("#crpComparatorLess").attr('checked', true);
                $("#crpComparatorLessLabel").addClass("active");
            } else if ($("#" + id).val() == ">") {
                $("#crpComparatorGreater").attr('checked', true);
                $("#crpComparatorGreaterLabel").addClass("active");
            }
        }
        if (group == "rf") {
            $("#" + group + "FlagNa").attr('checked', false);
            $("#" + group + "FlagNaLabel").removeClass("active");
            $("#" + group + "FlagNegative").attr('checked', false);
            $("#" + group + "FlagNegativeLabel").removeClass("active");
            $("#" + group + "FlagPositive").attr('checked', false);
            $("#" + group + "FlagPositiveLabel").removeClass("active");

            $("#rfValueMsg").text("");
            $("#rfDateMsg").text("");
            removeSomeClass("rfDateError", "has-error");

            if ($("#" + id).val() == "NA") {
                $("#rfFlagNa").attr('checked', true);
                $("#rfFlagNaLabel").addClass("active");
            } else if ($("#" + id).val() == "-") {
                $("#rfFlagNegative").attr('checked', true);
                $("#rfFlagNegativeLabel").addClass("active");
            } else if ($("#" + id).val() == "+") {
                $("#rfFlagPositive").attr('checked', true);
                $("#rfFlagPositiveLabel").addClass("active");
            }
        }
        if (group == "anticcp") {
            $("#" + group + "FlagNa").attr('checked', false);
            $("#" + group + "FlagNaLabel").removeClass("active");
            $("#" + group + "FlagNegative").attr('checked', false);
            $("#" + group + "FlagNegativeLabel").removeClass("active");
            $("#" + group + "FlagPositive").attr('checked', false);
            $("#" + group + "FlagPositiveLabel").removeClass("active");

            $("#anticcpValueMsg").text("");
            $("#anticcpDateMsg").text("");
            removeSomeClass("anticcpDateError", "has-error");

            if ($("#" + id).val() == "NA") {
                $("#anticcpFlagNa").attr('checked', true);
                $("#anticcpFlagNaLabel").addClass("active");
            } else if ($("#" + id).val() == "-") {
                $("#anticcpFlagNegative").attr('checked', true);
                $("#anticcpFlagNegativeLabel").addClass("active");
            } else if ($("#" + id).val() == "+") {
                $("#anticcpFlagPositive").attr('checked', true);
                $("#anticcpFlagPositiveLabel").addClass("active");
            }
        }
        if (group == "vectrada") {
            $("#" + group + "FlagNa").attr('checked', false);
            $("#" + group + "FlagNaLabel").removeClass("active");
            $("#" + group + "FlagNegative").attr('checked', false);
            $("#" + group + "FlagNegativeLabel").removeClass("active");
            $("#" + group + "FlagPositive").attr('checked', false);
            $("#" + group + "FlagPositiveLabel").removeClass("active");

            $("#vectradaValueMsg").text("");
            $("#vectradaDateMsg").text("");
            removeSomeClass("vectradaDateError", "has-error");

            if ($("#" + id).val() == "Low") {
                $("#vectradaFlagNa").attr('checked', true);
                $("#vectradaFlagNaLabel").addClass("active");
            } else if ($("#" + id).val() == "Med") {
                $("#vectradaFlagNegative").attr('checked', true);
                $("#vectradaFlagNegativeLabel").addClass("active");
            } else if ($("#" + id).val() == "High") {
                $("#vectradaFlagPositive").attr('checked', true);
                $("#vectradaFlagPositiveLabel").addClass("active");
            }
        }
    }
}

function labsToggleDoubleClick(group) {
    if (group == "esr") {
        $("#" + group + "ComparatorNa").attr('checked', false);
        $("#" + group + "ComparatorNaLabel").removeClass("active");
        $("#" + group + "ComparatorLess").attr('checked', false);
        $("#" + group + "ComparatorLessLabel").removeClass("active");
        $("#" + group + "ComparatorGreater").attr('checked', false);
        $("#" + group + "ComparatorGreaterLabel").removeClass("active");

        $("#" + group + "Value").val("");
        $("#" + group + "Date").val("");

        $("#esrValueMsg").text("");
        $("#esrDateMsg").text("");
        removeSomeClass("esrDateError", "has-error");
    }
    if (group == "crp") {
        $("#" + group + "ComparatorNa").attr('checked', false);
        $("#" + group + "ComparatorNaLabel").removeClass("active");
        $("#" + group + "ComparatorLess").attr('checked', false);
        $("#" + group + "ComparatorLessLabel").removeClass("active");
        $("#" + group + "ComparatorGreater").attr('checked', false);
        $("#" + group + "ComparatorGreaterLabel").removeClass("active");

        $("#" + group + "Value").val("");
        $("#" + group + "Date").val("");

        $("#crpValueMsg").text("");
        $("#crpDateMsg").text("");
        removeSomeClass("crpDateError", "has-error");
    }
    if (group == "rf") {
        $("#" + group + "FlagNa").attr('checked', false);
        $("#" + group + "FlagNaLabel").removeClass("active");
        $("#" + group + "FlagNegative").attr('checked', false);
        $("#" + group + "FlagNegativeLabel").removeClass("active");
        $("#" + group + "FlagPositive").attr('checked', false);
        $("#" + group + "FlagPositiveLabel").removeClass("active");

        $("#" + group + "Value").val("");
        $("#" + group + "Date").val("");

        $("#rfValueMsg").text("");
        $("#rfDateMsg").text("");
        removeSomeClass("rfDateError", "has-error");
    }
    if (group == "anticcp") {
        $("#" + group + "FlagNa").attr('checked', false);
        $("#" + group + "FlagNaLabel").removeClass("active");
        $("#" + group + "FlagNegative").attr('checked', false);
        $("#" + group + "FlagNegativeLabel").removeClass("active");
        $("#" + group + "FlagPositive").attr('checked', false);
        $("#" + group + "FlagPositiveLabel").removeClass("active");

        $("#" + group + "Value").val("");
        $("#" + group + "Date").val("");

        $("#anticcpValueMsg").text("");
        $("#anticcpDateMsg").text("");
        removeSomeClass("anticcpDateError", "has-error");
    }
    if (group == "vectrada") {
        $("#" + group + "FlagNa").attr('checked', false);
        $("#" + group + "FlagNaLabel").removeClass("active");
        $("#" + group + "FlagNegative").attr('checked', false);
        $("#" + group + "FlagNegativeLabel").removeClass("active");
        $("#" + group + "FlagPositive").attr('checked', false);
        $("#" + group + "FlagPositiveLabel").removeClass("active");

        $("#" + group + "Value").val("");
        $("#" + group + "Date").val("");

        $("#vectradaValueMsg").text("");
        $("#vectradaDateMsg").text("");
        removeSomeClass("vectradaDateError", "has-error");
    }
}

//patient assessment form
function getPatientAssessmentForm() {
    $("#patientAssesmentDiv").text("").append("<br /><ul id='patientAssessmentUl' class='nav nav-tabs nav-primary' />");
    $("#patientAssessmentUl").text("").append("<li id='haq2Click' class='active'><a href='#haq2' data-toggle='tab'><strong>HAQ II</strong></a></li>");
    $("#patientAssessmentUl").append("<li id='painClick'><a href='#pain' data-toggle='tab'><strong>Pain</strong></a></li>");
    $("#patientAssessmentUl").append("<li id='fatigueClick'><a href='#fatigue' data-toggle='tab'><strong>Fatigue</strong></a></li>");
    $("#patientAssessmentUl").append("<li id='stiffnessClick'><a href='#stiffness' data-toggle='tab'><strong>Stiffness</strong></a></li>");
    $("#patientAssessmentUl").append("<li id='pgaClick'><a href='#pga' data-toggle='tab'><strong>PGA</strong></a></li>");
    $("#patientAssessmentUl").append("<li id='historyClick'><a href='#history' data-toggle='tab'><strong>History</strong></a></li>");

    if (getUserSessionElement("priormeds") != "no") {
        $("#patientAssessmentUl").append("<li id='priorMedsClick'><a href='#priorMeds' data-toggle='tab'><strong>Prior Meds</strong></a></li>");
    } else {
        $("#priorMedsClick").remove();
    }
    $("#patientAssessmentUl").append("<li id='firstDoneClick'><a href='javascript:donePatientAssessment()'><strong>Done</strong></a></li>");

    if (getUserSessionElement("Questionere") == "yes") {
        $("#patientAssessmentUl").append("<li id='radamClick'><a href='#radam' data-toggle='tab'><strong>RADAM</strong></a></li>");
    }
//body
    $("#patientAssesmentDiv").append("<div id='patientAssessmentUlBody' class='tab-content tab-content-primary mb30' />");
    $("#patientAssessmentUlBody").text("").append("<span id='beforePatientAssessmentMessage' /><div class='tab-pane active' id='haq2'>");
    $("#patientAssessmentUlBody").append("<div class='tab-pane' id='pain' />");
    $("#patientAssessmentUlBody").append("<div class='tab-pane' id='fatigue' />");
    $("#patientAssessmentUlBody").append("<div class='tab-pane' id='stiffness' />");
    $("#patientAssessmentUlBody").append("<div class='tab-pane' id='pga' />");
    $("#patientAssessmentUlBody").append("<div class='tab-pane' id='history' />");
    if (getUserSessionElement("priormeds") != "no") {
        $("#patientAssessmentUlBody").append("<div class='tab-pane' id='priorMeds'>");
    } else {
        $("#priorMeds").remove();
    }
    $("#patientAssessmentUlBody").append("<div class='tab-pane' id='radam' /><span id='afterPatientAssessmentMessage' />");


//-----------------------------------------------------------------------------------

//haq2
    $("#haq2").append("<form name='progressWizard3' id='progressWizard3' class='panel-wizard' />");
    $("#progressWizard3").append("<ul class='nav nav-justified nav-wizard nav-disabled-click'><li class='active'><a href='#third1-2' data-toggle='tab'><strong>Page 1</strong></a></li><li><a href='#third2-2' data-toggle='tab'><strong>Page 2</strong></a></li><li><a href='#third3-2' data-toggle='tab'><strong>Page 3</strong></a></li></ul>");
    $("#progressWizard3").append("<div class='progress progress-xs'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='45' aria-valuemin='0' aria-valuemax='100' style='width: 33.3333333333333%;'></div></div>");
    $("#progressWizard3").append("<div class='tab-content'><div id='haq2Ques' /><div class='tab-pane active' id='third1-2' /><div class='tab-pane' id='third2-2' /><div class='tab-pane' id='third3-2' /></div>");
    $("#progressWizard3").append("<ul class='list-unstyled wizard'><li class='pull-left previous disabled'><button type='button' style='width:200px;font-weight:bold;' class='btn btn-default'>Previous</button></li><li class='pull-right next'><button type='button' style='width:200px;font-weight:bold;' class='btn btn-primary'>Continue</button></li><li class='pull-right finish hide'><button type='button' style='width:200px;font-weight:bold;' class='btn btn-primary'>Continue</button></li></ul>");

//-----------------------------------------------------------------------------------       
// for haq2
    jQuery('#progressWizard3').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
            tab.prevAll().addClass('done');
            tab.nextAll().removeClass('done');
            tab.removeClass('done');
            var $total = navigation.find('li').length;
            var $current = index + 1;
            if ($current == "1") {
                $('#progressWizard3').find('.wizard .previous').addClass('hide');
            } else {
                $('#progressWizard3').find('.wizard .previous').removeClass('hide');
            }
            if ($current >= $total) {
                $('#progressWizard3').find('.wizard .next').addClass('hide');
                $('#progressWizard3').find('.wizard .finish').removeClass('hide');
            } else {
                $('#progressWizard3').find('.wizard .next').removeClass('hide');
                $('#progressWizard3').find('.wizard .finish').addClass('hide');
            }
            var $percent = ($current / $total) * 100;
            $('#progressWizard3').find('.progress-bar').css('width', $percent + '%');
        },
        onTabClick: function(tab, navigation, index) {
            return false;
        },
        onPrevious: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            $("#beforePatientAssessmentMessage").text("");
            $("#afterPatientAssessmentMessage").text("");
            return true;
        }
//        onNext: function(tab, navigation, index) {
//            $('html,body').scrollTop(0);
//            var $valid = getHaq2Validation(index);
//            if (!$valid) {
//                displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>Please answer all questions.</center>");
//                displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>Please answer all questions.</center>");
//                return false;
//            }
//        }
    });

    $('#progressWizard3 .finish').click(function() {
//        var $valid = getHaq2Validation('3');
//        if (!$valid) {
//            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>Please answer all questions.</center>");
//            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>Please answer all questions.</center>");
//            $validator.focusInvalid();
//            return false;
//        } else {
        submitHaq2Questions();
//        }
    });


//validating history fields
    function getHaq2Validation(index) {
        $("#beforePatientAssessmentMessage").text("");
        $("#afterPatientAssessmentMessage").text("");

        var radios = $("form#progressWizard3 input[type='radio']").length / 4;
        for (var j = 0; j < radios; j++) {
            var qid = $("#hiddenHaq2Id" + j).val();
            if ($('form#' + qid + ' input:radio[name=haq2Answer]').is(':checked') == true) {
                if (index == 1) {
                    if (j == 2) {
                        return true;
                    }
                }
                if (index == 2) {
                    if (j == 5) {
                        return true;
                    }
                }
                if (index == 3) {
                    if (j == 9) {
                        return true;
                    }
                }
            } else {
                return false;
            }
        }
    }

//history
    $("#history").append("<form name='progressWizard' id='progressWizard' class='panel-wizard' />");
    $("#progressWizard").append("<ul class='nav nav-justified nav-wizard nav-disabled-click'><li id='historyStep1' class='active'><a href='#tab1-2' data-toggle='tab'><strong style='font-size:10px;'>General</strong></a></li><li id='historyStep2'><a href='#tab2-2' data-toggle='tab'><strong style='font-size:10px;'>Head &amp; Neck</strong></a></li><li id='historyStep3'><a href='#tab3-2' data-toggle='tab'><strong style='font-size:10px;'>Heart &amp; Breathing</strong></a></li><li id='historyStep4'><a href='#tab4-2' data-toggle='tab'><strong style='font-size:10px;'>Skin</strong></a></li><li id='historyStep5'><a href='#tab5-2' data-toggle='tab'><strong style='font-size:10px;'>Gastrointestinal</strong></a></li><li id='historyStep6'><a href='#tab6-2' data-toggle='tab'><strong style='font-size:10px;'>Urinary/GYN</strong></a></li><li id='historyStep7'><a href='#tab7-2' data-toggle='tab'><strong style='font-size:10px;'>Neurology</strong></a></li><li id='historyStep8'><a href='#tab8-2' data-toggle='tab'><strong style='font-size:10px;'>Other</strong></a></li></ul>");
    $("#progressWizard").append("<div class='progress progress-xs'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='45' aria-valuemin='0' aria-valuemax='100' style='width: 33.3333333333333%;'></div></div>");
    $("#progressWizard").append("<div class='tab-content'><div class='tab-pane active' id='tab1-2' /><div class='tab-pane' id='tab2-2' /><div class='tab-pane' id='tab3-2' /><div class='tab-pane' id='tab4-2' /><div class='tab-pane' id='tab5-2' /><div class='tab-pane' id='tab6-2' /><div class='tab-pane' id='tab7-2' /><div class='tab-pane' id='tab8-2' /></div>");
    $("#progressWizard").append("<ul class='list-unstyled wizard'><span /><li class='pull-left previous disabled'><button type='button' style='width:200px;font-weight:bold;' class='btn btn-default'>Previous</button></li><li class='pull-right next'><button type='button' style='width:200px;font-weight:bold;' class='btn btn-primary'>Continue</button></li><li class='pull-right finish hide'><button type='button' style='width:200px;font-weight:bold;' class='btn btn-primary'>Continue</button></li></ul>");

//-----------------------------------------------------------------------------------
//for history
    jQuery('#progressWizard').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
            tab.prevAll().addClass('done');
            tab.nextAll().removeClass('done');
            tab.removeClass('done');
            var $total = navigation.find('li').length;
            var $current = index + 1;
            if ($current == "1") {
                $('#progressWizard').find('.wizard .previous').addClass('hide');
            } else {
                $('#progressWizard').find('.wizard .previous').removeClass('hide');
            }
            if ($current >= $total) {
                $('#progressWizard').find('.wizard .next').addClass('hide');
                $('#progressWizard').find('.wizard .finish').removeClass('hide');
            } else {
                $('#progressWizard').find('.wizard .next').removeClass('hide');
                $('#progressWizard').find('.wizard .finish').addClass('hide');
            }

            var $percent = ($current / $total) * 100;
            $('#progressWizard').find('.progress-bar').css('width', $percent + '%');
        },
        onTabClick: function(tab, navigation, index) {
            return false;
        },
        onNext: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            var $valid = getHistoryValidation(index);
            if (!$valid) {
                displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>Please select at least one or none of the above.</center>");
                displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>Please select at least one or none of the above.</center>");
                $validator.focusInvalid();
                return false;
            }
            for (var i = 1; i < 9; i++) {
                $("#noneOfAboveLabel" + i).attr("disabled", false);
            }
        },
        onPrevious: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            $("#beforePatientAssessmentMessage").text("");
            $("#afterPatientAssessmentMessage").text("");
            return true;
        }
    });
    $('#progressWizard .finish').click(function() {
        var $valid = getHistoryValidation('8');
        if (!$valid) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>Please select at least one or none of the above.</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>Please select at least one or none of the above.</center>");
            $validator.focusInvalid();
            return false;
        } else {
            submitHistoryQuestions();
        }
    });

//validating history fields
    function getHistoryValidation(index) {
        $("#beforePatientAssessmentMessage").text("");
        $("#afterPatientAssessmentMessage").text("");
        var form1 = document.getElementById("progressWizard");
        //        var cbx = form1.historyAnswers.length/4;
        var cbx = 0;
        if (index == 1) {
            cbx = cbx + 5;
            for (var i = 0; i < cbx; i++) {
                if (form1.historyAnswers[i].checked == true) {
                    if (i >= 0 && i <= 4) {
                        return true;
                        break;
                    } else {
                        return false;
                    }
                } else if ($("#noneOfAboveId1").is(':checked') == true) {
                    return true;
                }
            }
        }
        if (index == 2) {
            cbx = cbx + 10;
            for (var i = 5; i < cbx; i++) {
                if (form1.historyAnswers[i].checked == true) {
                    if (i >= 5 && i <= 9) {
                        return true;
                        break;
                    } else {
                        return false;
                    }
                } else if ($("#noneOfAboveId2").is(':checked') == true) {
                    return true;
                }
            }
        }
        if (index == 3) {
            cbx = cbx + 15;
            for (var i = 10; i < cbx; i++) {
                if (form1.historyAnswers[i].checked == true) {
                    if (i >= 10 && i <= 14) {
                        return true;
                        break;
                    } else {
                        return false;
                    }
                } else if ($("#noneOfAboveId3").is(':checked') == true) {
                    return true;
                }
            }
        }
        if (index == 4) {
            cbx = cbx + 21;
            for (var i = 15; i < cbx; i++) {
                if (form1.historyAnswers[i].checked == true) {
                    if (i >= 15 && i <= 20) {
                        return true;
                        break;
                    } else {
                        return false;
                    }
                } else if ($("#noneOfAboveId4").is(':checked') == true) {
                    return true;
                }
            }
        }
        if (index == 5) {
            cbx = cbx + 27;
            for (var i = 21; i < cbx; i++) {
                if (form1.historyAnswers[i].checked == true) {
                    if (i >= 21 && i <= 26) {
                        return true;
                        break;
                    } else {
                        return false;
                    }
                } else if ($("#noneOfAboveId5").is(':checked') == true) {
                    return true;
                }
            }
        }
        if (index == 6) {
            cbx = cbx + 30;
            for (var i = 27; i < cbx; i++) {
                if (form1.historyAnswers[i].checked == true) {
                    if (i >= 27 && i <= 29) {
                        return true;
                        break;
                    } else {
                        return false;
                    }
                } else if ($("#noneOfAboveId6").is(':checked') == true) {
                    return true;
                }
            }
        }
        if (index == 7) {
            cbx = cbx + 33;
            for (var i = 30; i < cbx; i++) {
                if (form1.historyAnswers[i].checked == true) {
                    if (i >= 30 && i <= 32) {
                        return true;
                        break;
                    } else {
                        return false;
                    }
                } else if ($("#noneOfAboveId7").is(':checked') == true) {
                    return true;
                }
            }
        }
        if (index == 8) {
            cbx = cbx + 36;
            for (var i = 33; i < cbx; i++) {
                if (form1.historyAnswers[i].checked == true) {
                    if (i >= 33 && i <= 35) {
                        return true;
                        break;
                    } else {
                        return false;
                    }
                } else if ($("#noneOfAboveId8").is(':checked') == true) {
                    return true;
                }
            }
        }
    }
//-----------------------------------------------------------------------------------

//priorMeds
    $("#priorMeds").append("<form name='progressWizard2' id='progressWizard2' class='panel-wizard' />");
    $("#progressWizard2").append("<ul class='nav nav-justified nav-wizard nav-disabled-click'><li class='active'><a href='#second1-2' data-toggle='tab'><strong>Page 1</strong></a></li><li><a href='#second2-2' data-toggle='tab'><strong>Page 2</strong></a></li><li><a href='#second3-2' data-toggle='tab'><strong>Page 3</strong></a></li><li><a href='#second4-2' data-toggle='tab'><strong>Page 4</strong></a></li></ul>");
    $("#progressWizard2").append("<div class='progress progress-xs'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='45' aria-valuemin='0' aria-valuemax='100' style='width: 33.3333333333333%;'></div></div>");
    $("#progressWizard2").append("<div class='tab-content'><div class='tab-pane active' id='second1-2' /><div class='tab-pane' id='second2-2' /><div class='tab-pane' id='second3-2' /><div class='tab-pane' id='second4-2' /></div>");
    $("#progressWizard2").append("<ul class='list-unstyled wizard'><li class='pull-left previous disabled'><button type='button' style='width:200px;font-weight:bold;' class='btn btn-default'>Previous</button></li><li class='pull-right next'><button type='button' style='width:200px;font-weight:bold;' class='btn btn-primary'>Continue</button></li><li class='pull-right finish hide'><button type='button' style='width:200px;font-weight:bold;' class='btn btn-primary'>Continue</button></li></ul>");

    //-----------------------------------------------------------------------------------       
    // for prior meds
    jQuery('#progressWizard2').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
            tab.prevAll().addClass('done');
            tab.nextAll().removeClass('done');
            tab.removeClass('done');
            var $total = navigation.find('li').length;
            var $current = index + 1;
            if ($current == "1") {
                $('#progressWizard2').find('.wizard .previous').addClass('hide');
            } else {
                $('#progressWizard2').find('.wizard .previous').removeClass('hide');
            }
            if ($current >= $total) {
                $('#progressWizard2').find('.wizard .next').addClass('hide');
                $('#progressWizard2').find('.wizard .finish').removeClass('hide');
            } else {
                $('#progressWizard2').find('.wizard .next').removeClass('hide');
                $('#progressWizard2').find('.wizard .finish').addClass('hide');
            }
            var $percent = ($current / $total) * 100;
            $('#progressWizard2').find('.progress-bar').css('width', $percent + '%');
        },
        onTabClick: function(tab, navigation, index) {
            return false;
        },
        onNext: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            var $valid = getPriorMedsValidation(index);
            if (!$valid) {
                displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>Please answer all questions.</center>");
                displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>Please answer all questions.</center>");
                return false;
            }
        },
        onPrevious: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            $("#beforePatientAssessmentMessage").text("");
            $("#afterPatientAssessmentMessage").text("");
            return true;
        }
    });
    $('#progressWizard2 .finish').click(function() {
        var $valid = getPriorMedsValidation('4');
        if (!$valid) {
            displayLargeErrorMessages("beforePatientAssessmentMessage", "<center>Please answer all questions.</center>");
            displayLargeErrorMessages("afterPatientAssessmentMessage", "<center>Please answer all questions.</center>");
            $validator.focusInvalid();
            return false;
        } else {
            submitPriorMedsQuestions();
        }
    });


    //validating prior meds fields
    function getPriorMedsValidation(index) {
        $("#beforePatientAssessmentMessage").text("");
        $("#afterPatientAssessmentMessage").text("");

        var radios = $("form#progressWizard2 input[type='radio']").length / 2;
        for (var j = 0; j < radios; j++) {
            var qid = $("#hiddenPriorMedsId" + j).val();
            var priorMedsSelectedAnswer = $('input[name=priorMedsAnswers' + qid + ']:checked').val();
            var priorMedsAnswer = $('input:radio[name=priorMedsAnswers' + qid + ']').is(':checked');
            if (priorMedsAnswer == true) {
                if (index == 1) {
                    if (priorMedsSelectedAnswer == "yes") {
                        if (priorMedsValidation(qid) == true) {
                            if (j == 4) {
                                return true;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        if (j == 4) {
                            return true;
                        }
                    }
                }

                if (index == 2) {
                    if (priorMedsSelectedAnswer == "yes") {
                        if (priorMedsValidation(qid) == true) {
                            if (j == 9) {
                                return true;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        if (j == 9) {
                            return true;
                        }
                    }
                }

                if (index == 3) {
                    if (priorMedsSelectedAnswer == "yes") {
                        if (priorMedsValidation(qid) == true) {
                            if (j == 14) {
                                return true;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        if (j == 14) {
                            return true;
                        }
                    }
                }

                if (index == 4) {
                    if (priorMedsSelectedAnswer == "yes") {
                        if (priorMedsValidation(qid) == true) {
                            if (j == 18) {
                                return true;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        if (j == 18) {
                            return true;
                        }
                    }
                }

            } else {
                return false;
            }
        }
    }


//validation for yes answer
    function priorMedsValidation(qid) {
        if ($("#startDateAnswer" + qid).val() == "") {
            $("#startDateAnswer" + qid).focus();
            $("#startDateAnswerError" + qid).addClass("has-error");
            $("#startDateMsg" + qid).text("").append("<span class='smallErrorMsg'>Enter start date.</span>");
            return false;
        }

        if ($("#endDateAnswer" + qid).val() == "") {
            $("#endDateAnswer" + qid).focus();
            $("#endDateAnswerError" + qid).addClass("has-error");
            $("#endDateMsg" + qid).text("").append("<span class='smallErrorMsg'>Enter end date.</span>");
            return false;
        }

        if ($('#yearsTakenAnswer' + qid).val() == "") {
            $('#yearsTakenAnswer' + qid).focus();
            $("#yearsTakenMsg" + qid).text("").append("<br /><span class='smallErrorMsg'>Enter years taken.</span>");
            return false;
        }

        if ($('#doseAnswer' + qid).val() == "") {
            $('#doseAnswer' + qid).focus();
            $('#doseError' + qid).addClass("has-error");
            $("#doseMsg" + qid).text("").append("<span class='smallErrorMsg'>Enter dose taken.</span>");
            return false;
        }

        if ($('#sideEffectsAnswer' + qid).val() == "") {
            $('#sideEffectsAnswer' + qid).focus();
            $('#sideEffectsError' + qid).addClass("has-error");
            $("#sideEffectsMsg" + qid).text("").append("<span class='smallErrorMsg'>Enter side effects.</span>");
            return false;
        }

        if ($('#whyYouStoppedAnswer' + qid).val() == "") {
            $('#whyYouStoppedAnswer' + qid).focus();
            $('#stoppedError' + qid).addClass("has-error");
            $("#stoppedMsg" + qid).text("").append("<span class='smallErrorMsg'>Enter why you stopped ?.</span>");
            return false;
        }
        return true;
    }
}
//-----------------------------------------------------------------------------------

function getPatientAssessmentRadamForm() {
//radam   
    $("#radam").text("").append("<ul id='radamUl' class='nav nav-tabs nav-warning' />");
    $.get(server_base_url + "/irheum-server/FetchRadamGroupSequence", {
        patientid: $("#pid").val()
    }).done(function(data) {
        if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $("#radam").append("<input id='radamSequenceList' type='hidden' value='" + data + "' />");
            $("#radam").append("<input id='radamSequenceCount' type='hidden' value='1' />");
            $("#radamUl").text("");
            for (var i = 0; i < data.length; i++) {
                if (data[i].match("RADAM-Function")) {
                    $("#radamUl").append("<li id='radamFunctionClick'><a href='#radamFunction' style='cursor:not-allowed' data-toggle='tab'><strong>Function</strong></a></li>");
                }
                if (data[i].match("RADAM-Pain")) {
                    $("#radamUl").append("<li id='radamPainClick'><a href='#radamPain' style='cursor:not-allowed' data-toggle='tab'><strong>Pain</strong></a></li>");
                }
                if (data[i].match("RADAM-Fatigue")) {
                    $("#radamUl").append("<li id='radamFatigueClick'><a href='#radamFatigue' style='cursor:not-allowed' data-toggle='tab'><strong>Fatigue</strong></a></li>");
                }
                if (data[i].match("RADAM-Global")) {
                    $("#radamUl").append("<li id='radamGlobalClick'><a href='#radamGlobal' style='cursor:not-allowed' data-toggle='tab'><strong>Global</strong></a></li>");
                }
                if (data[i].match("RADAM-Sleep")) {
                    $("#radamUl").append("<li id='radamSleepClick'><a href='#radamSleep' style='cursor:not-allowed' data-toggle='tab'><strong>Sleep</strong></a></li>");
                }
                if (data[i].match("RADAM-Stiffness")) {
                    $("#radamUl").append("<li id='radamStiffnessClick'><a href='#radamStiffness' style='cursor:not-allowed' data-toggle='tab'><strong>Stiffness</strong></a></li>");
                }
                if (data[i].match("RADAM-Other")) {
                    $("#radamUl").append("<li id='radamOtherClick'><a href='#radamOther' style='cursor:not-allowed' data-toggle='tab'><strong>Flare</strong></a></li>");
                }
            }
            //        $("#radamUl").append("<li id='radamCatClick'><a href='#radamCat' style='cursor:not-allowed' data-toggle='tab'><strong>CAT</strong></a></li>");
            $("#radamUl").append("<li id='secondDoneClick'><a href='javascript:donePatientAssessment()'><strong>Done</strong></a></li>");
            //        $("#secondDoneClick").hide();
            getFirstSequence();

            //disabing li items start
            $('#radamFunctionClick').click(function(event) {
                return false;
            });
            $('#radamPainClick').click(function(event) {
                return false;
            });
            $('#radamFatigueClick').click(function(event) {
                return false;
            });
            $('#radamGlobalClick').click(function(event) {
                return false;
            });
            $('#radamSleepClick').click(function(event) {
                return false;
            });
            $('#radamStiffnessClick').click(function(event) {
                return false;
            });
            $('#radamOtherClick').click(function(event) {
                return false;
            });
//disabing li items end
        }
    });
//body
    $("#radam").append("<span id='beforeRadamMessage' /><div id='radamUlBody' class='tab-content tab-content-warning mb30' />");
    $("#radamUlBody").text("");
    //loading spinner
    $("#radamUlBody").append("<div id='radamSpinner'><center><br /><br /><br /><br /><img src='../images/loaders/loader10.gif'><br /><h3>Please wait while loading the questions...</h3><br></center></div>");

    $("#radamUlBody").append("<div class='tab-pane' id='radamFunction' />");
    $("#radamUlBody").append("<div class='tab-pane' id='radamPain' />");
    $("#radamUlBody").append("<div class='tab-pane' id='radamFatigue' />");
    $("#radamUlBody").append("<div class='tab-pane' id='radamGlobal' />");
    $("#radamUlBody").append("<div class='tab-pane' id='radamSleep' />");
    $("#radamUlBody").append("<div class='tab-pane' id='radamStiffness' />");
    $("#radamUlBody").append("<div class='tab-pane' id='radamOther' />");
    $("#radamUlBody").append("<div class='tab-pane' id='radamCat' /><div id='radamCatData' /><span id='afterRadamMessage' />");

//radamFunction
    $("#radamFunction").append("<form name='radamFunctionWizard' id='radamFunctionWizard' class='panel-wizard' />");
    $("#radamFunctionWizard").append("<ul class='nav nav-justified nav-wizard nav-disabled-click'><li class='active'><a href='#radamFunction1-2' data-toggle='tab'><strong id='functionCategory1'>Page 1</strong></a></li><li><a href='#radamFunction2-2' data-toggle='tab'><strong id='functionCategory2'>Page 2</strong></a></li><li><a href='#radamFunction3-2' data-toggle='tab'><strong id='functionCategory3'>Page 3</strong></a></li></ul>");
    $("#radamFunctionWizard").append("<div class='progress progress-xs'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='45' aria-valuemin='0' aria-valuemax='100' style='width: 33.3333333333333%;'></div></div>");
    $("#radamFunctionWizard").append("<div class='tab-content'><div id='radamFunctionQues' /><div class='tab-pane active' id='radamFunction1-2' /><div class='tab-pane' id='radamFunction2-2' /><div class='tab-pane' id='radamFunction3-2' /></div>");
    $("#radamFunctionWizard").append("<ul class='list-unstyled wizard'><li class='pull-left previous disabled'><button style='width:200px;font-weight:bold;' type='button' class='btn btn-default'>Previous</button></li><li class='pull-right next'><button style='width:200px;font-weight:bold;' type='button' class='btn btn-primary'>Continue</button></li><li class='pull-right finish hide'><button style='width:200px;font-weight:bold;' id='radamFunctionButton' type='button' onclick='submitRadamFunctionQuestions()' class='btn btn-primary'>Continue</button></li></ul>");

    //-----------------------------------------------------------------------------------       
    // for radamFunction
    jQuery('#radamFunctionWizard').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
            tab.prevAll().addClass('done');
            tab.nextAll().removeClass('done');
            tab.removeClass('done');
            var $total = navigation.find('li').length;
            var $current = index + 1;
            if ($current == "1") {
                $('#radamFunctionWizard').find('.wizard .previous').addClass('hide');
            } else {
                $('#radamFunctionWizard').find('.wizard .previous').removeClass('hide');
            }
            if ($current >= $total) {
                $('#radamFunctionWizard').find('.wizard .next').addClass('hide');
                $('#radamFunctionWizard').find('.wizard .finish').removeClass('hide');
            } else {
                $('#radamFunctionWizard').find('.wizard .next').removeClass('hide');
                $('#radamFunctionWizard').find('.wizard .finish').addClass('hide');
            }
            var $percent = ($current / $total) * 100;
            $('#radamFunctionWizard').find('.progress-bar').css('width', $percent + '%');
        },
        onTabClick: function(tab, navigation, index) {
            return false;
        },
        onNext: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            var $valid = getRadamFunctionValidation(index);
            if (!$valid) {
                displayLargeErrorMessages("beforeRadamMessage", "<center>Please answer all questions.</center>");
                displayLargeErrorMessages("afterRadamMessage", "<center>Please answer all questions.</center>");
                return false;
            }
        },
        onPrevious: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            $("#beforeRadamMessage").text("");
            $("#afterRadamMessage").text("");
            return true;
        }
    });

    function getRadamFunctionValidation(index) {
        $("#beforeRadamMessage").text("");
        $("#afterRadamMessage").text("");

        var radios = $("form#radamFunctionWizard input[type='radio']").length - 10;
        radios = radios / 4;

        for (var j = 0; j < radios; j++) {
            var qid = $("#hiddenRadamFunctionId" + j).val();
            if ($('form#' + qid + ' input:radio[name=radamFunctionAnswer]').is(':checked') == true) {
                if (index == 1) {
                    if (j == 9) {
                        return true;
                    }
                }
                if (index == 2) {
                    if (j == 19) {
                        return true;
                    }
                }
//                if (index == 3) {
//                    if (j == 29) {
                //                        return true;
//                    }
//                }
            } else {
                return false;
            }
        }
    }
//-----------------------------------------------------------------------------------   

//radamPain
    $("#radamPain").append("<form name='radamPainWizard' id='radamPainWizard' class='panel-wizard' />");
    $("#radamPainWizard").append("<ul class='nav nav-justified nav-wizard nav-disabled-click'><li class='active'><a href='#radamPain1-2' data-toggle='tab'><strong id='functionCategory1'>Page 1</strong></a></li><li><a href='#radamPain2-2' data-toggle='tab'><strong id='functionCategory2'>Page 2</strong></a></li></ul>");
    $("#radamPainWizard").append("<div class='progress progress-xs'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='45' aria-valuemin='0' aria-valuemax='100' style='width: 33.3333333333333%;'></div></div>");
    $("#radamPainWizard").append("<div class='tab-content'><div id='radamPainQues' /><div class='tab-pane active' id='radamPain1-2' /><div class='tab-pane' id='radamPain2-2' /></div>");
    $("#radamPainWizard").append("<ul class='list-unstyled wizard'><li class='pull-left previous disabled'><button style='width:200px;font-weight:bold;' type='button' class='btn btn-default'>Previous</button></li><li class='pull-right next'><button style='width:200px;font-weight:bold;' type='button' class='btn btn-primary'>Continue</button></li><li class='pull-right finish hide'><button style='width:200px;font-weight:bold;' id='radamPainButton' type='button' onclick='submitRadamPainQuestions()' class='btn btn-primary'>Continue</button></li></ul>");

    //-----------------------------------------------------------------------------------       
// for radamPain
    jQuery('#radamPainWizard').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
            tab.prevAll().addClass('done');
            tab.nextAll().removeClass('done');
            tab.removeClass('done');
            var $total = navigation.find('li').length;
            var $current = index + 1;
            if ($current == "1") {
                $('#radamPainWizard').find('.wizard .previous').addClass('hide');
            } else {
                $('#radamPainWizard').find('.wizard .previous').removeClass('hide');
            }
            if ($current >= $total) {
                $('#radamPainWizard').find('.wizard .next').addClass('hide');
                $('#radamPainWizard').find('.wizard .finish').removeClass('hide');
            } else {
                $('#radamPainWizard').find('.wizard .next').removeClass('hide');
                $('#radamPainWizard').find('.wizard .finish').addClass('hide');
            }
            var $percent = ($current / $total) * 100;
            $('#radamPainWizard').find('.progress-bar').css('width', $percent + '%');
        },
        onTabClick: function(tab, navigation, index) {
            return false;
        },
        onPrevious: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            $("#beforeRadamMessage").text("");
            $("#afterRadamMessage").text("");
            return true;
        }
    });
    //-----------------------------------------------------------------------------------   

//radamFatigue
    $("#radamFatigue").append("<form name='radamFatigueWizard' id='radamFatigueWizard' class='panel-wizard' />");
    $("#radamFatigueWizard").append("<ul class='nav nav-justified nav-wizard nav-disabled-click'><li class='active'><a href='#radamFatigue1-2' data-toggle='tab'><strong id='functionCategory1'>Page 1</strong></a></li><li><a href='#radamFatigue2-2' data-toggle='tab'><strong id='functionCategory2'>Page 2</strong></a></li></ul>");
    $("#radamFatigueWizard").append("<div class='progress progress-xs'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='45' aria-valuemin='0' aria-valuemax='100' style='width: 33.3333333333333%;'></div></div>");
    $("#radamFatigueWizard").append("<div class='tab-content'><div id='radamFatigueQues' /><div class='tab-pane active' id='radamFatigue1-2' /><div class='tab-pane' id='radamFatigue2-2' /></div>");
    $("#radamFatigueWizard").append("<ul class='list-unstyled wizard'><li class='pull-left previous disabled'><button style='width:200px;font-weight:bold;' type='button' class='btn btn-default'>Previous</button></li><li class='pull-right next'><button style='width:200px;font-weight:bold;' type='button' class='btn btn-primary'>Continue</button></li><li class='pull-right finish hide'><button style='width:200px;font-weight:bold;' id='radamFatigueButton' type='button' onclick='submitRadamFatigueQuestions()' class='btn btn-primary'>Continue</button></li></ul>");

    //-----------------------------------------------------------------------------------       
    // for radamFatigue
    jQuery('#radamFatigueWizard').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
            tab.prevAll().addClass('done');
            tab.nextAll().removeClass('done');
            tab.removeClass('done');
            var $total = navigation.find('li').length;
            var $current = index + 1;
            if ($current == "1") {
                $('#radamFatigueWizard').find('.wizard .previous').addClass('hide');
            } else {
                $('#radamFatigueWizard').find('.wizard .previous').removeClass('hide');
            }
            if ($current >= $total) {
                $('#radamFatigueWizard').find('.wizard .next').addClass('hide');
                $('#radamFatigueWizard').find('.wizard .finish').removeClass('hide');
            } else {
                $('#radamFatigueWizard').find('.wizard .next').removeClass('hide');
                $('#radamFatigueWizard').find('.wizard .finish').addClass('hide');
            }
            var $percent = ($current / $total) * 100;
            $('#radamFatigueWizard').find('.progress-bar').css('width', $percent + '%');
        },
        onTabClick: function(tab, navigation, index) {
            return false;
        },
        onPrevious: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            $("#beforeRadamMessage").text("");
            $("#afterRadamMessage").text("");
            return true;
        }
    });
//-----------------------------------------------------------------------------------   

//radamStiffness
    $("#radamStiffness").append("<form name='radamStiffnessWizard' id='radamStiffnessWizard' class='panel-wizard' />");
    $("#radamStiffnessWizard").append("<ul class='nav nav-justified nav-wizard nav-disabled-click'><li class='active'><a href='#radamStiffness1-2' data-toggle='tab'><strong>Page 1</strong></a></li><li><a href='#radamStiffness2-2' data-toggle='tab'><strong>Page 2</strong></a></li></ul>");
    $("#radamStiffnessWizard").append("<div class='progress progress-xs'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='45' aria-valuemin='0' aria-valuemax='100' style='width: 33.3333333333333%;'></div></div>");
    $("#radamStiffnessWizard").append("<div class='tab-content'><div id='radamStiffnessQues' /><div class='tab-pane active' id='radamStiffness1-2' /><div class='tab-pane' id='radamStiffness2-2' /></div>");
    $("#radamStiffnessWizard").append("<ul class='list-unstyled wizard'><li class='pull-left previous disabled'><button style='width:200px;font-weight:bold;' type='button' class='btn btn-default'>Previous</button></li><li class='pull-right next'><button style='width:200px;font-weight:bold;' type='button' class='btn btn-primary'>Continue</button></li><li class='pull-right finish hide'><button style='width:200px;font-weight:bold;' id='radamStiffnessButton' type='button' onclick='submitRadamStiffnessQuestions()' class='btn btn-primary'>Continue</button></li></ul>");

    //-----------------------------------------------------------------------------------       
    // for radamStiffness
    jQuery('#radamStiffnessWizard').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
            tab.prevAll().addClass('done');
            tab.nextAll().removeClass('done');
            tab.removeClass('done');
            var $total = navigation.find('li').length;
            var $current = index + 1;
            if ($current == "1") {
                $('#radamStiffnessWizard').find('.wizard .previous').addClass('hide');
            } else {
                $('#radamStiffnessWizard').find('.wizard .previous').removeClass('hide');
            }
            if ($current >= $total) {
                $('#radamStiffnessWizard').find('.wizard .next').addClass('hide');
                $('#radamStiffnessWizard').find('.wizard .finish').removeClass('hide');
            } else {
                $('#radamStiffnessWizard').find('.wizard .next').removeClass('hide');
                $('#radamStiffnessWizard').find('.wizard .finish').addClass('hide');
            }
            var $percent = ($current / $total) * 100;
            $('#radamStiffnessWizard').find('.progress-bar').css('width', $percent + '%');
        },
        onTabClick: function(tab, navigation, index) {
            return false;
        },
        onNext: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            var $valid = getRadamStiffnessValidation(index);
            if (!$valid) {
                displayLargeErrorMessages("beforeRadamMessage", "<center>Please answer all questions.</center>");
                displayLargeErrorMessages("afterRadamMessage", "<center>Please answer all questions.</center>");
                return false;
            }
        },
        onPrevious: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            $("#beforeRadamMessage").text("");
            $("#afterRadamMessage").text("");
            return true;
        }
    });

    function getRadamStiffnessValidation(index) {
        $("#beforeRadamMessage").text("");
        $("#afterRadamMessage").text("");
        if (index == 1) {
            if ($('input[name=radamStiffnessAnswer2]').is(':checked') == true) {
                return true;
            }
        } else {
            return false;
        }
    }
//-----------------------------------------------------------------------------------  

//radamOther
    $("#radamOther").append("<form name='radamOtherWizard' id='radamOtherWizard' class='panel-wizard' />");
    $("#radamOtherWizard").append("<ul class='nav nav-justified nav-wizard nav-disabled-click'><li class='active'><a href='#radamOther1-2' data-toggle='tab'><strong style='font-size:10px;' id='otherCategory1'>Page 1</strong></a></li><li><a href='#radamOther2-2' data-toggle='tab'><strong style='font-size:10px;' id='otherCategory2'>Page 2</strong></a></li><li><a href='#radamOther3-2' data-toggle='tab'><strong style='font-size:10px;' id='otherCategory3'>Page 3</strong></a></li><li><a href='#radamOther4-2' data-toggle='tab'><strong style='font-size:10px;' id='otherCategory4'>Page 4</strong></a></li><li><a href='#radamOther5-2' data-toggle='tab'><strong style='font-size:10px;' id='otherCategory5'>Page 5</strong></a></li><li><a href='#radamOther6-2' data-toggle='tab'><strong style='font-size:10px;' id='otherCategory6'>Page 6</strong></a></li><li><a href='#radamOther7-2' data-toggle='tab'><strong style='font-size:10px;' id='otherCategory7'>Page 7</strong></a></li><li><a href='#radamOther8-2' data-toggle='tab'><strong style='font-size:10px;' id='otherCategory8'>Page 8</strong></a></li></ul>");
    $("#radamOtherWizard").append("<div class='progress progress-xs'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='45' aria-valuemin='0' aria-valuemax='100' style='width: 33.3333333333333%;'></div></div>");
    $("#radamOtherWizard").append("<div class='tab-content'><div id='radamOtherQues' /><div class='tab-pane active' id='radamOther1-2' /><div class='tab-pane' id='radamOther2-2' /><div class='tab-pane' id='radamOther3-2' /><div class='tab-pane' id='radamOther4-2' /><div class='tab-pane' id='radamOther5-2' /><div class='tab-pane' id='radamOther6-2' /><div class='tab-pane' id='radamOther7-2' /><div class='tab-pane' id='radamOther8-2' /></div>");
    $("#radamOtherWizard").append("<ul class='list-unstyled wizard'><li class='pull-left previous disabled'><button style='width:200px;font-weight:bold;' type='button' class='btn btn-default'>Previous</button></li><li class='pull-right next'><button style='width:200px;font-weight:bold;' type='button' class='btn btn-primary'>Continue</button></li><li class='pull-right finish hide'><button style='width:200px;font-weight:bold;' type='button' class='btn btn-primary'>Continue</button></li></ul>");

    //-----------------------------------------------------------------------------------       
    // for radamOther
    jQuery('#radamOtherWizard').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
            tab.prevAll().addClass('done');
            tab.nextAll().removeClass('done');
            tab.removeClass('done');
            var $total = navigation.find('li').length;
            var $current = index + 1;
            if ($current == "1") {
                $('#radamOtherWizard').find('.wizard .previous').addClass('hide');
            } else {
                $('#radamOtherWizard').find('.wizard .previous').removeClass('hide');
            }
            if ($current >= $total) {
                $('#radamOtherWizard').find('.wizard .next').addClass('hide');
                $('#radamOtherWizard').find('.wizard .finish').removeClass('hide');
            } else {
                $('#radamOtherWizard').find('.wizard .next').removeClass('hide');
                $('#radamOtherWizard').find('.wizard .finish').addClass('hide');
            }
            var $percent = ($current / $total) * 100;
            $('#radamOtherWizard').find('.progress-bar').css('width', $percent + '%');
        },
        onTabClick: function(tab, navigation, index) {
            return false;
        },
        onNext: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            var $valid = getRadamOtherValidation(index);
            if (!$valid) {
                displayLargeErrorMessages("beforeRadamMessage", "<center>Please answer all questions.</center>");
                displayLargeErrorMessages("afterRadamMessage", "<center>Please answer all questions.</center>");
                return false;
            }
        },
        onPrevious: function(tab, navigation, index) {
            $('html,body').scrollTop(0);
            $("#beforeRadamMessage").text("");
            $("#afterRadamMessage").text("");
            return true;
        }
    });

    $('#radamOtherWizard .finish').click(function() {
        var $valid = getRadamOtherValidation('8');
        if (!$valid) {
            displayLargeErrorMessages("beforeRadamMessage", "<center>Please answer the question.</center>");
            displayLargeErrorMessages("afterRadamMessage", "<center>Please answer the question.</center>");
            $validator.focusInvalid();
            return false;
        } else {
            submitRadamOtherQuestions();
        }
    });

    function getRadamOtherValidation(index) {
        $("#beforeRadamMessage").text("");
        $("#afterRadamMessage").text("");

        var radios = $("form#radamOtherWizard input[type='radio']").length - 2;
        radios = radios / 5;
        for (var j = 0; j < radios; j++) {
            var qid = $("#hiddenRadamOtherId" + j).val();
            if ($('form#' + qid + ' input:radio[name=radamOtherAnswer]').is(':checked') == true) {
                if (index == 1) {
                    if (j == 3) {
                        return true;
                    }
                }
                if (index == 2) {
                    if (j == 7) {
                        return true;
                    }
                }
                if (index == 3) {
                    if (j == 11) {
                        return true;
                    }
                }
                if (index == 4) {
                    if (j == 15) {
                        return true;
                    }
                }
                if (index == 5) {
                    if (j == 19) {
                        return true;
                    }
                }
                if (index == 6) {
                    if (j == 23) {
                        return true;
                    }
                }
                if (index == 7) {
                    if (j == 27) {
                        return true;
                    }
                }
                if (index == 8) {
                    if ($('input[name=radamOtherLastAnswer]:checked').val() == "yes") {
                        return true;
                    } else if ($('input[name=radamOtherLastAnswer]:checked').val() == "no") {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }
    }
    //-----------------------------------------------------------------------------------  
}

//physician assessment form
function getPhysicianAssessmentForm() {
    $("#physicianAssesmentDiv").text("").append("<br /><div class='panel panel-primary' id='phyAssPanel'/>");

    //loader created
    $("#physicianAssesmentDiv").append("<div id='phyAssessmentLoader'><center><br /><br /><br /><br /><img src='../images/loaders/loader7.gif'><br /><h3>Please wait while loading...</h3><br></center></div>");

    $("#phyAssPanel").append("<div class='panel-heading' style='height:14px;'><center><h3 class='pt-label' style='margin-top:-7px;font-size:16px;'><b>Physician Assessment</b></h3></center></div>");
    $("#phyAssPanel").append("<div class='panel-body' id='physicianAssesmentBodyDiv' />");
    $("#physicianAssesmentBodyDiv").append("<center><span id='beforePhysUpdateMsg'></span></center><table id='physicianAssesmentTableBody' class='table table-striped table-bordered responsive dataTable no-footer dtr-inline' role='grid' />");

    $("#physicianAssesmentTableBody").append("<tr><td class='col-sm-3'><b>Joint Exam Performed ?</b></td><td id='jointExamPerformed'></td></tr>");
    $("#physicianAssesmentTableBody").append("<tr><td><b>Tender Joints</b></td><td id='tenderJoints'></td></tr>");
    $("#physicianAssesmentTableBody").append("<tr><td><b>Swollen Joints</b></td><td id='swollenJoints'></td></tr>");
    $("#physicianAssesmentTableBody").append("<tr><td><b>Outcome Measures</b></td><td id='das283Variale'></td></tr>");
    $("#physicianAssesmentTableBody").append("<tr><td><b>RA Severity</b></td><td><div class='col-sm-8'><select id='raSeveritySelection' class='form-control'><option value=''>Choose...</option><option value='0'>0 - None</option><option value='1'>1 - Mild</option><option value='2'>2 - Mild</option><option value='3'>3 - Mild</option><option value='4'>4 - Moderate</option><option value='5'>5 - Moderate</option><option value='6'>6 - Moderate</option><option value='7'>7 - Moderate</option><option value='8'>8 - Severe</option><option value='9'>9 - Severe</option><option value='10'>10 - Severe</option></select></div></td></tr>");
    $("#physicianAssesmentTableBody").append("<tr><td><b>ICD9 Code</b></td><td><div id='icd9CodeOutput' class='has-success btn-bordered'><div class='col-sm-8'><select id='select-multi' data-placeholder='Choose One' multiple class='width100p'><option value=''>Choose Icd9 code</option></select></div></div></td></tr>");

    $("#physicianAssesmentBodyDiv").append("<center><button id='physicianAssessmentSubmitButton' class='btn btn-primary' onclick='submitPhysicianAssesmentData()'><b>Save</b></button></center><center><span id='afterPhysUpdateMsg'></span></center>");
    jQuery("#select-basic, #select-multi").select2();
    //loading icd9 codes
    if (checkUserPrivelege("SearchICDCode") == true) {
        var icd9code = "";
        $.get(server_base_url + "/irheum-server/searchicd", {
        }).done(function(idata) {
            if (idata == invalidSession) {
                callSessionTimeout();
            } else {
                for (var i = 0; i < idata.length; i++) {
                    icd9code = icd9code + "<option>" + idata[i] + "</option>";
                }
                $("#select-multi").text("").append(icd9code);
            }
        });
    }

    $("#phyAssPanel").hide();
}

//for outcome measures form
function getOutcomeMeasuresForm() {
    $('html,body').scrollTop(0);
    $("#outcomeMeasuresDiv").text("").append("<br /><div id='outcomeMeasuresSubDiv' class='panel panel-primary' />");
    $("#outcomeMeasuresSubDiv").append("<div class='panel-heading' style='height:14px;'><center><h3 class='pt-label' style='margin-top:-7px;font-size:16px;'><b>Outcome Measures</b></h3></center></div>");
    $("#outcomeMeasuresSubDiv").append("<div class='panel-body'><table id='outcomeMeasuresTable' class='table table-striped table-bordered responsive dataTable no-footer dtr-inline' role='grid'></table></div>");
}

function getReviewPatientHistoryForm() {
    $('html,body').scrollTop(0);
    $("#reviewPatientHistoryDiv").text("").append("<br /><div id='reviewPatientHistoryMainPanel' class='panel panel-primary' />");
    $("#reviewPatientHistoryMainPanel").append("<div class='panel-heading' style='height:14px;'><center><h3 class='pt-label' style='margin-top:-7px;font-size:16px;'><b>Patient History</b></h3></center></div>");
    $("#reviewPatientHistoryMainPanel").append("<div class='panel-body' id='reviewPatientHistoryPanelBody' />");

    //first table
    $("#reviewPatientHistoryPanelBody").text("").append("<span id='reviewPatientMsg' /><div class='table-responsive'><table id='reviewPatientHistoryTable' class='report-view table table-warning mb30' style='font-weight:bold;' /></div>");
    $("#reviewPatientHistoryTable").text("").append("<thead><tr><th><b>Pain</b></th><th><b>Fatigue</b></th><th><b>PGA</b></th></tr></thead>");
    $("#reviewPatientHistoryTable").append("<tbody><tr><td id='displayPainId' >N/A</td><td id='displayFatigueId' >N/A</td><td id='displayPgaId' >N/A</td></tr></tbody>");

    //second table
    if (getUserSessionElement("priormeds") != "no") {
        $("#reviewPatientHistoryPanelBody").append("<br /><div class='table-responsive'><table id='reviewPriorMedsTable' class='report-view table table-warning mb30' style='font-weight:bold;' /></div>");
        $("#reviewPriorMedsTable").text("").append("<thead><tr><th><b>Prior Meds</b></th><th>&nbsp;</th></tr></thead>");
    } else {
        $("#reviewPriorMedsTable").remove();
    }

    //third table
    $("#reviewPatientHistoryPanelBody").append("<br /><div class='table-responsive'><table id='reviewHistoryTable' class='report-view table table-warning mb30' style='font-weight:bold;' /></div>");
    $("#reviewHistoryTable").text("").append("<thead><tr><th><b>History</b></th><th>&nbsp;</th><th>&nbsp;</th></tr></thead>");
    $("#reviewHistoryTable").append("<tr><td id='categoryTd1' >N/A</td><td id='categoryTd2' /><td id='categoryTd3' /></tr>");

//fourth table
    $("#reviewPatientHistoryPanelBody").append("<br /><div class='table-responsive'><table id='reviewHaq2Table' class='report-view table table-warning mb30' style='font-weight:bold;' /></div>");
    $("#reviewHaq2Table").text("").append("<thead><tr><th><b>HAQ-II</b></th><th>&nbsp;</th><th>&nbsp;</th></tr></thead>");
    $("#reviewHaq2Table").append("<tr><td id='haq2Td1' >N/A</td></td><td id='haq2Td2' /></tr>");
}

//preparing smileys
function prepareSmileys(divId) {
    $("#" + divId).append("<br /><br /><br />");
//    $("#" + divId).append("<br /><br /><br /><div id='SmileysDiv" + divId + "' style='width:90%;float:left;' /><div style='width:10%;' />");
//    $("#SmileysDiv" + divId).append("<br /><br /><div class='slimey1' style='float:left;'><div style='left:15px;' class='eye' /><div style='right:15px;' class='eye' /><div class='nose1' /></div>");
    //    $("#SmileysDiv" + divId).append("<div class='slimey2' style='float:left;margin-left:16%;'><div style='left:15px' class='eye' /><div style='right:15px;' class='eye' /><div class='nose2' /></div>");
//    $("#SmileysDiv" + divId).append("<center><div class='slimey3' style='float:left;margin-left:18%;'><div style='left:15px;' class='eye' /><div style='right:15px;' class='eye' /><div class='nose3' /></div></center>");
    //    $("#SmileysDiv" + divId).append("<div class='slimey4' style='float:left;margin-left:19%;'><div style='left:15px;' class='eye' /><div style='right:15px;' class='eye' /><div class='nose4' /></div>");
    //    $("#SmileysDiv" + divId).append("<div class='slimey5' style='float:right;'><div style='left:15px;' class='eye' /><div style='right:15px;' class='eye' /><div class='drops2' /><div class='drops1' /><div class='drops4' /><div class='drops3' /><div class='nose5' /></div>");
}

//preparing slider
function prepareSlider(sliderId, spinnerId) {
    jQuery('#' + sliderId).slider({
        range: "min",
        min: 0,
        max: 10, step: 0.5,
        value: 0
    });
    jQuery('#' + sliderId).slider('pips', {
        rest: 'label',
        step: 2}).slider('float');
    jQuery('#' + sliderId).slider({stop: function(event, ui) {
            $("#" + spinnerId).val($("#" + sliderId).slider("option", "value"));
        }});
}

//preparing spinner
function prepareSpinner(sliderId, spinnerId) {
    jQuery('#' + spinnerId).spinner({min: 0, max: 10, step: 0.5, stop: function(event, ui) {
            if (/[^0-9\.]/g.test($("#" + spinnerId).val()))
                $("#" + spinnerId).val($("#" + spinnerId).val().replace(/[^0-9\.]/g, ''));

            $("#" + sliderId).slider("value", $("#" + spinnerId).val());
        }}).spinner('value', 0);
}

//preparing left label
function prepareSliderLeftLabel(tdId, Msg) {
    $("#" + tdId).text("").append("<span class='sliderLeftLabel'>" + Msg + "</span>");
}

//preparing right label
function prepareSliderRightLabel(tdId, Msg) {
    $("#" + tdId).text("").append("<span class='sliderRightLabel'>" + Msg + "</span>");
}