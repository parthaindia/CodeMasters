///////////////////////////////Medication start/////////////////////////////////////////////////

function displayMeds(bioMedsStatus, dmardsMedsStatus) {
    if (!bioMedsStatus) {
        $("#medicationDisplyDivBiologics").text("").append("<div class='table-responsive' id='patientBioMedTableDiv' />");
        $("#patientBioMedTableDiv").append("<div id='bioMedsStatusMsg'/>");
        $("#patientBioMedTableDiv").append("<table class='table table-primary mb30' id='patientBioMedTableMain' />");
        $("#patientBioMedTableMain").append("<thead><tr><th>Drug name</th><th>Strength</th><th>Sig/Direction</th><th>Qty</th><th>Refil</th></tr></thead>");
        $("#patientBioMedTableMain").append("<tbody id='patientBioMedTableMainBody' />");
        $("#patientBioMedTableMainBody").append("<tr id='patientBioMedTableMainBodyTr'/>");
        $("#patientBioMedTableMainBodyTr").append("<td style='width:20%'><form name='bioMedsDrugNameForm' id='bioMedsDrugNameForm'><table id='medBioDrugNamesTable'/></form></td>");
        $("#patientBioMedTableMainBodyTr").append("<td style='width:20%'><form name='bioMedsStrengthForm' id='bioMedsStrengthForm'><table id='medBioStrengthTable'/></form></td>");
        $("#patientBioMedTableMainBodyTr").append("<td style='width:30%'><form name='bioMedsSigForm' id='bioMedsSigForm'><table id='medBioSigTable'/></form></td>");
        $("#patientBioMedTableMainBodyTr").append("<td style='width:20%'><form name='bioMedsQtyForm' id='bioMedsQtyForm'><table id='medBioQtyTable'/></form></td>");
        $("#patientBioMedTableMainBodyTr").append("<td style='width:10%'><form name='bioMedsRefilForm' id='bioMedsRefilForm'><table id='medBioRefilTable'/></form></td>");
        for (var index = 0; index <= 11; index++) {
            $("#medBioRefilTable").append("<tr id='biorefil" + index + "'><td><label id='medBioRefilLableVal" + index + "' for='medBioRefilVal" + index + "' class='btn quest btn-default' style='text-align:center;font-weight:bold;min-width:50px;max-width:70px;' ><input type='radio' name='medBioRefilValue' id='medBioRefilVal" + index + "' style='display:none;' onclick=biologicsRefilSelect('" + index + "') >" + index + "</label></td></tr>");
        }
    }
    //for save button of biologics
    $("#patientBioMedTableDiv").append("<table id='patientBioMedTableSave' />");
    if (!dmardsMedsStatus) {
        $("#medicationDisplyDivDMards").text("").append("<div class='table-responsive' id='patientDMardMedTableDiv' />");
        $("#patientDMardMedTableDiv").append("<div id='dmardMedsStatusMsg'/>");
        $("#patientDMardMedTableDiv").append("<table class='table table-primary mb30' id='patientDMardMedTableMain' />");
        $("#patientDMardMedTableMain").append("<thead><tr><th>Drug name</th><th>Strength</th><th>Sig/Direction</th><th>Qty</th><th>Refil</th></tr></thead>");
        $("#patientDMardMedTableMain").append("<tbody id='patientDMardMedTableMainBody' />");
        $("#patientDMardMedTableMainBody").append("<tr id='patientDMardMedTableMainBodyTr'/>");
        $("#patientDMardMedTableMainBodyTr").append("<td style='width:20%'><form name='dmardMedsDrugNameForm' id='dmardMedsDrugNameForm'><table id='medDMardDrugNamesTable'/></form></td>");
        $("#patientDMardMedTableMainBodyTr").append("<td style='width:20%'><form name='dmardMedsStrengthForm' id='dmardMedsStrengthForm'><table id='medDMardStrengthTable'/></form></td>");
        $("#patientDMardMedTableMainBodyTr").append("<td style='width:30%'><form name='dmardMedsSigForm' id='dmardMedsSigForm'><table id='medDMardSigTable'/></form></td>");
        $("#patientDMardMedTableMainBodyTr").append("<td style='width:20%'><form name='dmardMedsQtyForm' id='dmardMedsQtyForm'><table id='medDMardQtyTable'/></form></td>");
        $("#patientDMardMedTableMainBodyTr").append("<td style='width:10%'><form name='dmardMedsRefilForm' id='dmardMedsRefilForm'><table id='medDMardRefilTable'/></form></td>");
        for (var index = 0; index <= 11; index++) {
            $("#medDMardRefilTable").append("<tr id='refil" + index + "'><td><label id='medDMardRefilLableVal" + index + "' for='medDMardRefilVal" + index + "' class='btn quest btn-default' style='text-align:center;font-weight:bold;min-width:50px;max-width:70px;' ><input type='radio' name='medDmardRefilValue' id='medDMardRefilVal" + index + "'  style='display:none;' onclick=dmardRefilSelect('" + index + "') >" + index + "</label></td></tr>");
        }
    }
    //for save button of dmards
    $("#patientDMardMedTableDiv").append("<table id='patientDMardsMedTableSave' />");
    $.post(server_base_url + "/irheum-server/FetchDefaultMedication", {
    }).done(function(data) {
        if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $.each(data, function(index, value) {
                sessionStorage.setItem("meds", JSON.stringify(value));
                if (index == "MedFavorites") {
                    $("#patientBioMedTableSave").text("");
                    $("#bioMedsStatusMsg").text("");
                    $.each(value, function(index, value) {
                        if (!bioMedsStatus && value.type == "Biologics") {
                            $("#medBioDrugNamesTable").append("<tr id='biologicstr" + value.drugname + "'><td id='biologicstd1" + value.drugname + "'><label id='medsDiv" + ((replaceString(value.drugname)).replace('^', '')) + "' for='biomedsDiv" + index + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:200px;max-width:220px;'><input type='radio' name='bioDrug' id='biomedsDiv" + index + "'  value='" + value.drugname + "' style='display:none;' onclick=biologicsDisp('" + value.drugname + "')>" + value.drugname + "</label></td></tr><tr><td>&nbsp;</td></tr>");
                        }
                        if (!dmardsMedsStatus && value.type == "DMards") {
                            $("#medDMardDrugNamesTable").append("<tr id='dmardstr" + replaceString(value.drugname) + "'><td id='dmardstd1" + replaceString(value.drugname) + "'><label id='medsDiv" + ((replaceString(value.drugname)).replace('^', '')) + "' for='dmardmedsDiv" + index + "'  class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:200px;max-width:220px;' ><input type='radio' name='dmardDrug' id='dmardmedsDiv" + index + "'  value='" + replaceString(value.drugname) + "' style='display:none;' onclick=dmardsDisp('" + replaceString(value.drugname) + "')>" + value.drugname + "</label></td></tr><tr><td>&nbsp;</td></tr>");
                        }
                    });
                }
            });
        }
    });
}

//Medication designing dynamic
function showMedication() {
    $('html,body').scrollTop(0);
    hideAllDivs();
    $("#medicationDiv").show();
    $("#medCommentsDiv").show();
    $("#PrescriptionQuestionsDiv").show();
    addHover("medicationMenu");
    var bioMedsStatus = false;
    var dmardsMedsStatus = false;
    $("#medicationDiv").text("").append("<div class='col-md-6' id='medicationDisplyDiv' style='width:100%;margin-top:10px;'><ul class='nav nav-tabs nav-primary'><li id='biologicsLiId' class='active'><a href='#medicationDisplyDivBiologics' data-toggle='tab'><strong>Biologics</strong></a></li><li id='dmardsLiId' class=''><a href='#medicationDisplyDivDMards' data-toggle='tab'><strong>DMARD</strong></a></li></ul>");
    $("#medicationDisplyDiv").append("<div class='tab-content tab-content-primary mb30' id='medicationDisplyDiv1'>");
    $("#medicationDisplyDiv1").append("<div class='tab-pane active' id='medicationDisplyDivBiologics' />");
    $("#medicationDisplyDivBiologics").append("");
    $("#medicationDisplyDivBiologics").append("<table id='medicationDisplyDivBiologicsTable'/>");
    $("#medicationDisplyDiv1").append("<div class='tab-pane' id='medicationDisplyDivDMards' />");
    $("#medicationDisplyDivDMards").append("");
    $("#medicationDisplyDivBiologics").append("<div class='table-responsive' id='patientBioMedTableDiv' />");
    $("#patientBioMedTableDiv").append("<div id='bioMedsStatusMsg'/>");
    $("#patientBioMedTableDiv").append("<table class='table table-primary mb30' id='patientBioMedTableMain' />");
    $("#patientBioMedTableMain").append("<thead><tr><th>Drug name</th><th>Strength</th><th>Sig/Direction</th><th>Qty</th><th>Refil</th></tr></thead>");
    $("#patientBioMedTableMain").append("<tbody id='patientBioMedTableMainBody' />");
    $("#patientBioMedTableMainBody").append("<tr id='patientBioMedTableMainBodyTr'/>");
    $("#patientBioMedTableMainBodyTr").append("<td style='width:20%'><form name='bioMedsDrugNameForm' id='bioMedsDrugNameForm'><table id='medBioDrugNamesTable'/></form></td>");
    $("#patientBioMedTableMainBodyTr").append("<td style='width:20%'><form name='bioMedsStrengthForm' id='bioMedsStrengthForm'><table id='medBioStrengthTable'/></form></td>");
    $("#patientBioMedTableMainBodyTr").append("<td style='width:30%'><form name='bioMedsSigForm' id='bioMedsSigForm'><table id='medBioSigTable'/></form></td>");
    $("#patientBioMedTableMainBodyTr").append("<td style='width:20%'><form name='bioMedsQtyForm' id='bioMedsQtyForm'><table id='medBioQtyTable'/></form></td>");
    $("#patientBioMedTableMainBodyTr").append("<td style='width:10%'><form name='bioMedsRefilForm' id='bioMedsRefilForm'><table id='medBioRefilTable'/></form></td>");
    for (var index = 0; index <= 11; index++) {
        $("#medBioRefilTable").append("<tr id='biorefil" + index + "'><td><label id='medBioRefilLableVal" + index + "' for='medBioRefilVal" + index + "' class='btn quest btn-default' style='text-align:center;font-weight:bold;min-width:50px;max-width:70px;' ><input type='radio' name='medBioRefilValue' id='medBioRefilVal" + index + "' style='display:none;' onclick=biologicsRefilSelect('" + index + "') >" + index + "</label></td></tr>");
    }
    //for save button of biologics
    $("#patientBioMedTableDiv").append("<table id='patientBioMedTableSave' />");
    $("#medicationDisplyDivDMards").append("<div class='table-responsive' id='patientDMardMedTableDiv' />");
    $("#patientDMardMedTableDiv").append("<div id='dmardMedsStatusMsg'/>");
    $("#patientDMardMedTableDiv").append("<table class='table table-primary mb30' id='patientDMardMedTableMain' />");
    $("#patientDMardMedTableMain").append("<thead><tr><th>Drug name</th><th>Strength</th><th>Sig/Direction</th><th>Qty</th><th>Refil</th></tr></thead>");
    $("#patientDMardMedTableMain").append("<tbody id='patientDMardMedTableMainBody' />");
    $("#patientDMardMedTableMainBody").append("<tr id='patientDMardMedTableMainBodyTr'/>");
    $("#patientDMardMedTableMainBodyTr").append("<td style='width:20%'><form name='dmardMedsDrugNameForm' id='dmardMedsDrugNameForm'><table id='medDMardDrugNamesTable'/></form></td>");
    $("#patientDMardMedTableMainBodyTr").append("<td style='width:20%'><form name='dmardMedsStrengthForm' id='dmardMedsStrengthForm'><table id='medDMardStrengthTable'/></form></td>");
    $("#patientDMardMedTableMainBodyTr").append("<td style='width:30%'><form name='dmardMedsSigForm' id='dmardMedsSigForm'><table id='medDMardSigTable'/></form></td>");
    $("#patientDMardMedTableMainBodyTr").append("<td style='width:20%'><form name='dmardMedsQtyForm' id='dmardMedsQtyForm'><table id='medDMardQtyTable'/></form></td>");
    $("#patientDMardMedTableMainBodyTr").append("<td style='width:10%'><form name='dmardMedsRefilForm' id='dmardMedsRefilForm'><table id='medDMardRefilTable'/></form></td>");
    for (var index = 0; index <= 11; index++) {
        $("#medDMardRefilTable").append("<tr id='refil" + index + "'><td><label id='medDMardRefilLableVal" + index + "' for='medDMardRefilVal" + index + "' class='btn quest btn-default' style='text-align:center;font-weight:bold;min-width:50px;max-width:70px;' ><input type='radio' name='medDmardRefilValue' id='medDMardRefilVal" + index + "'  style='display:none;' onclick=dmardRefilSelect('" + index + "') >" + index + "</label></td></tr>");
    }
    //for save button of dmards
    $("#patientDMardMedTableDiv").append("<table id='patientDMardsMedTableSave' />");
    $.post(server_base_url + "/irheum-server/FetchMedication", {
        patientid: $("#pid").val(),
        encno: $("#encno").val()
    }).done(function(data) {
        if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $.each(data, function(index, value) {
                sessionStorage.setItem("meds", JSON.stringify(value));
                if (index == "MedFavorites") {
                    $("#patientBioMedTableSave").text("");
                    $("#patientDMardsMedTableSave").text("");
                    $("#bioMedsStatusMsg").text("");
                    $("#dmardMedsStatusMsg").text("");
                    $.each(value, function(index, value) {
                        if (value.type == "Biologics") {
                            $("#medBioDrugNamesTable").append("<tr id='biologicstr" + value.drugname + "'><td id='biologicstd1" + value.drugname + "'><label id='medsDiv" + ((replaceString(value.drugname)).replace('^', '')) + "' for='medsDiv" + index + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:200px;max-width:220px;'><input type='radio' name='Drug' id='medsDiv" + index + "'  value='" + value.drugname + "' style='display:none;' onclick=biologicsDisp('" + value.drugname + "')>" + value.drugname + "</label></td></tr><tr><td>&nbsp;</td></tr>");
                        }
                        if (value.type == "DMards") {
                            $("#medDMardDrugNamesTable").append("<tr id='dmardstr" + replaceString(value.drugname) + "'><td id='dmardstd1" + replaceString(value.drugname) + "'><label id='medsDiv" + ((replaceString(value.drugname)).replace('^', '')) + "' for='medsDiv" + index + "'  class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:200px;max-width:220px;' ><input type='radio' name='Drug' id='medsDiv" + index + "'  value='" + replaceString(value.drugname) + "' style='display:none;' onclick=dmardsDisp('" + replaceString(value.drugname) + "')>" + value.drugname + "</label></td></tr><tr><td>&nbsp;</td></tr>");
                        }
                    });
                } else if (index == "Encounter") {
                    $("#medicationDisplyDivBiologics").text("").append("<div class='table-responsive' id='patientBioMedTableDiv' />");
                    $("#patientBioMedTableDiv").append("<div id='bioMedsStatusMsg'/>");
                    $("#patientBioMedTableDiv").append("<table class='table table-primary mb30' id='patientBioMedTableMain' />");
                    $("#patientBioMedTableMain").append("<thead><tr><th>Drug name</th><th>Strength</th><th>Sig/Direction</th><th>Qty</th><th>Refil</th></tr></thead>");
                    $("#patientBioMedTableMain").append("<tbody id='patientBioMedTableMainBody' />");
                    $("#medicationDisplyDivDMards").text("").append("<div class='table-responsive' id='patientDMardMedTableDiv' />");
                    $("#patientDMardMedTableDiv").append("<div id='dmardMedsStatusMsg'/>");
                    $("#patientDMardMedTableDiv").append("<table class='table table-primary mb30' id='patientDMardMedTableMain' />");
                    $("#patientDMardMedTableMain").append("<thead><tr><th>Drug name</th><th>Strength</th><th>Sig/Direction</th><th>Qty</th><th>Refil</th></tr></thead>");
                    $("#patientDMardMedTableMain").append("<tbody id='patientDMardMedTableMainBody' />");
                    $.each(value, function(index, value) {
                        if (value.type == "Biologics") {
                            bioMedsStatus = true;
                            $("#patientBioMedTableMainBody").append("<tr id='patientBioMedTableMainBodyTr" + index + "'/>");
                            $("#patientBioMedTableMainBodyTr" + index).append("<td style='width:20%'>" + value.drugName + "</td>");
                            var StrengthData = "";
                            if (value.strength != undefined && value.strength != "undefined") {
                                StrengthData = StrengthData + value.strength;
                            }
                            StrengthData = StrengthData + " " + value.form;
                            if (value.strength != undefined && value.strength != "undefined") {
                                StrengthData = StrengthData + " " + value.route;
                            }
                            $("#patientBioMedTableMainBodyTr" + index).append("<td style='width:20%'>" + StrengthData + " " + "</td>");
                            $("#patientBioMedTableMainBodyTr" + index).append("<td style='width:30%'>" + value.direction + "</td>");
                            $("#patientBioMedTableMainBodyTr" + index).append("<td style='width:20%'>" + value.qty + "</td>");
                            $("#patientBioMedTableMainBodyTr" + index).append("<td style='width:10%'>" + value.refill + "</td>");
                        }
                        if (value.type == "DMards") {
                            dmardsMedsStatus = true;
                            $("#patientDMardMedTableMainBody").append("<tr id='patientDMardMedTableMainBodyTr" + index + "'/>");
                            $("#patientDMardMedTableMainBodyTr" + index).append("<td style='width:20%'>" + value.drugName + "</td>");
                            var StrengthData = "";
                            if (value.strength != undefined && value.strength != "undefined") {
                                StrengthData = StrengthData + value.strength;
                            }
                            StrengthData = StrengthData + " " + value.form;
                            if (value.strength != undefined && value.strength != "undefined") {
                                StrengthData = StrengthData + " " + value.route;
                            }
                            $("#patientDMardMedTableMainBodyTr" + index).append("<td style='width:20%'>" + StrengthData + " " + "</td>");
                            $("#patientDMardMedTableMainBodyTr" + index).append("<td style='width:30%'>" + value.direction + "</td>");
                            $("#patientDMardMedTableMainBodyTr" + index).append("<td style='width:20%'>" + value.qty + "</td>");
                            $("#patientDMardMedTableMainBodyTr" + index).append("<td style='width:10%'>" + value.refill + "</td>");
                        }
                    });
                    if (bioMedsStatus) {
                        $("#patientBioMedTableMainBody").append("<tr id='patientBioMedTableMainBodyTrBtns'/>");
                        $("#patientBioMedTableMainBodyTrBtns").append("<td colspan='5'><input type='button' class='btn btn-warning' value='Add More' onclick=displayMeds(false,true)><span  style='margin-left:20px;cursor:pointer;text-decoration:underline;'   onclick=clearMedication()>Clear/ Re-write prescription</span></td>");
                    }
                    if (dmardsMedsStatus) {
                        $("#patientDMardMedTableMainBody").append("<tr id='patientDmardMedTableMainBodyTrBtns'/>");
                        $("#patientDmardMedTableMainBodyTrBtns").append("<td colspan='5'><input type='button' class='btn btn-warning' value='Add More' onclick=displayMeds(true,false)><span style='margin-left:20px;cursor:pointer;text-decoration:underline;' onclick=clearMedication()>Clear/ Re-write prescription</span></td>");
                    }
                }
            });
            displayMeds(bioMedsStatus, dmardsMedsStatus);
        }
    });
}

/////////////////Biologics/////////////////

function biologicsDisp(drugName) {
//    $("#patientBioMedTableSave").text("");
    $("#patientBioMedTableSave").text("").append("<tr><td><input class='btn btn-primary' type='button' value='Prescribe' disabled='disabled'></td></tr>");
    $("#medBioRefilTable").text("");
    for (var index = 0; index <= 11; index++) {
        $("#medBioRefilTable").append("<tr id='biorefil" + index + "'><td><label id='medBioRefilLableVal" + index + "' for='medBioRefilVal" + index + "' class='btn quest btn-default' style='text-align:center;font-weight:bold;min-width:50px;max-width:70px;' ><input type='radio' name='medBioRefilValue' id='medBioRefilVal" + index + "' style='display:none;' onclick=biologicsRefilSelect('" + index + "') >" + index + "</label></td></tr>");
    }
    var data = sessionStorage.getItem("meds");
    $.each(JSON.parse(data), function(index, value) {
        if (value.type == "Biologics") {
            $("#medsDiv" + ((replaceString(value.drugname)).replace('^', ''))).removeClass("active");
            if (value.drugname == drugName) {
                $("#medsDiv" + ((replaceString(value.drugname)).replace('^', ''))).addClass("active");
                var drugPack = value.drugPack;
                $("#medBioStrengthTable").text("");
                $("#medBioSigTable").text("");
                $("#medBioQtyTable").text("");
//            $("#patientBioMedTableSave").text("");
                $("#bioMedsStatusMsg").text("");
                $.each(drugPack, function(index, value) {
                    var chkbx = "<label id='biomedsFormsDivLable" + ((replaceString(drugName)).replace('^', '')) + index + "' for='medsFormsDiv" + index + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:200px;max-width:220px;white-space:normal;'><input type='radio' name='Drug' id='medsFormsDiv" + index + "'  value='" + drugName + "' style='display:none;' onclick=biologicsStrengthDisp('" + replaceString(drugName) + "','" + replaceString(value.strength.trim()) + "','" + replaceString(value.form.trim().replace('\'', "&*&")) + "','" + replaceString(value.route.trim()) + "')>" + value.strength + " " + value.form + " " + value.route + "</label>";
                    $("#medBioStrengthTable").append("<tr id='" + drugName + "" + index + "'><td>" + chkbx + "</td></tr><tr><td>&nbsp;</td></tr>");
                });
            }
        }
    });
}

function biologicsStrengthDisp(drugName, strength, form, route) {
    drugName = replaceSpecialChar(drugName);
    strength = replaceSpecialChar(strength);
    form = replaceSpecialChar(form.replace('&*&', '\''));
    route = replaceSpecialChar(route);
    var data = sessionStorage.getItem("meds");
    $("#medBioSigTable").text("");
    $("#medBioQtyTable").text("");
//    $("#patientBioMedTableSave").text("");
    $("#patientBioMedTableSave").text("").append("<tr><td><input class='btn btn-primary' type='button' value='Prescribe' disabled='disabled'></td></tr>");
    $("#bioMedsStatusMsg").text("");
    $.each(JSON.parse(data), function(index, value) {
        var drug = value.drugname;
        var drugPack = value.drugPack;
        $.each(drugPack, function(index, value) {
            $("#biomedsFormsDivLable" + ((replaceString(drug)).replace('^', '')) + index).removeClass("active");
            if (drug.trim() == drugName.trim() && value.form.trim() == form.trim() && value.route.trim() == route.trim() && value.strength.trim() == strength.trim()) {
                $("#biomedsFormsDivLable" + ((replaceString(drug)).replace('^', '')) + index).addClass("active");
                if (value.sigDirectionsList.length == "0") {
                    $("#patientBioMedTableSave").text("").append("<tr><td><input class='btn btn-primary' type='button' value='Prescribe' onclick=saveBioMeds('" + replaceString(drugName) + "','" + replaceString(strength) + "','" + replaceString(form.replace('\'', "&*&")) + "','" + replaceString(route) + "','','')></td></tr>");
                }
                for (var m = 0; m < value.sigDirectionsList.length; m++) {
                    var chkbx = "<label id='medsFormsSigDivLable" + ((replaceString(drug)).replace('^', '')) + m + "' for='biomedsFormsSigDiv" + m + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:280px;max-width:300px;white-space:normal;'><input type='radio' name='Drug' id='biomedsFormsSigDiv" + m + "'  value='" + drug + "' style='display:none;' onclick=biologicsSigDisp('" + replaceString(drugName) + "','" + replaceString(strength) + "','" + replaceString(form.replace('\'', "&*&")) + "','" + replaceString(route) + "','" + replaceString(value.sigDirectionsList[m].replace('\'', "&*&").replace("<", "&lt;").replace(">", "&gt;")) + "','" + m + "')>" + value.sigDirectionsList[m] + "</label>";
                    $("#medBioSigTable").append("<tr id='" + ((replaceString(drug)).replace('^', '')) + "" + m + "'><td>" + chkbx + "</td></tr><tr><td>&nbsp;</td></tr>");
                }
            }
        });
    });
}

function biologicsSigDisp(drugName, strength, form, route, sigDirection, m) {
    biologicsStrengthDisp(drugName, strength, form, route);
    var sig = replaceSpecialChar(sigDirection.replace('&*&', '\'').replace("&lt;", "<").replace("&gt;", ">"));
    var sigList = sig.split("___");
    var count = 1;
    if (sigList.length == 1) {
        count = 1;
        addDosageBioMeds(drugName, strength, form, route, sigDirection, m, count);
    } else if (sigList.length == 2) {
        count = 2;
        //------------------------------------------------------------------------------------------------------------------------------
        removeBeforePopup();
        $("#bioMedsPopup").text("").append("<div id='BioMedsSigInputPopupDiv' />");
        $("#BioMedsSigInputPopupDiv").text("").append("<div id='BioMedsDrugDoseSelection' data-toggle='modal' data-target='.bs-example-modal-sm' />");
        $("#BioMedsSigInputPopupDiv").append("<div id='BioMedspopupMedicationInside' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' data-backdrop='static' data-keyboard='false' />");
        $("#BioMedspopupMedicationInside").append("<div id='modalSmBioMeds' class='modal-dialog modal-sm' />");
        $("#modalSmBioMeds").append("<div id='modalContentBioMeds' class='modal-content' />");
        $("#modalContentBioMeds").append("<div class='modal-header' id='bioMedscloseDosageBtn' />");
        $("#bioMedscloseDosageBtn").text("").append("<h4 class='modal-title'>Select Dosage</h4>");
        $("#modalContentBioMeds").append("<div class='modal-body' id='bioMedsselectDosageDiv' />");
        $("#bioMedsselectDosageDiv").text("").append("<input type='text' class='form-control' id='dosage" + ((replaceString(drugName)).replace('^', '')) + route + "' maxlength=4 size=4 placeholder='dosage in mg' onkeyup=removeMsgInPopup()><br /><center><input type='button' class='btn btn-primary' value='Add' onclick=addDosageBioMeds('" + drugName + "','" + strength + "','" + form + "','" + route + "','" + sigDirection + "','" + m + "','" + count + "')><br /><br /><a href='javascript:closeMedicationPopup()'>Close</a></center>");
        $("#bioMedsselectDosageDiv").append("<center><lable id='bioMedspopUperrormsg' class='smallErrorMsg' /></center>");
        $("#BioMedsDrugDoseSelection").click();
        //------------------------------------------------------------------------------------------------------------------------------
    } else if (sigList.length == 3) {
        count = 3;
        //------------------------------------------------------------------------------------------------------------------------------
        removeBeforePopup();
        $("#bioMedsPopup").text("").append("<div id='BioMedsSigInputPopupDiv' />");
        $("#BioMedsSigInputPopupDiv").text("").append("<div id='BioMedsDrugDoseSelection' data-toggle='modal' data-target='.bs-example-modal-sm' />");
        $("#BioMedsSigInputPopupDiv").append("<div id='BioMedspopupMedicationInside' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' data-backdrop='static' data-keyboard='false' />");
        $("#BioMedspopupMedicationInside").append("<div id='modalSmBioMeds' class='modal-dialog modal-sm' />");
        $("#modalSmBioMeds").append("<div id='modalContentBioMeds' class='modal-content' />");
        $("#modalContentBioMeds").append("<div class='modal-header' id='bioMedscloseDosageBtn' />");
        $("#bioMedscloseDosageBtn").text("").append("<h4 class='modal-title'>Select Dosage</h4>");
        $("#modalContentBioMeds").append("<div class='modal-body' id='bioMedsselectDosageDiv' />");
        $("#bioMedsselectDosageDiv").text("").append("<input type='text' class='form-control' id='dosage1" + ((replaceString(drugName)).replace('^', '')) + route + "' maxlength=4 size=4 placeholder='dosage in mg' onkeyup=removeMsgInPopup()><br /><br /><input type='text' maxlength=4 size=4 class='form-control' id='dosage2" + replaceString(drugName) + route + "' onkeyup=removeMsgInPopup() placeholder='Duration in weeks'><br /><br /><center><input type='button' class='btn btn-primary' value='Add' onclick=addDosageBioMeds('" + drugName + "','" + strength + "','" + form + "','" + route + "','" + sigDirection + "','" + m + "','" + count + "')><br /><br /><a href='javascript:closeMedicationPopup()'>Close</a></center>");
        $("#bioMedsselectDosageDiv").append("<center><lable id='bioMedspopUperrormsg' class='smallErrorMsg' /></center>");
        $("#BioMedsDrugDoseSelection").click();
//------------------------------------------------------------------------------------------------------------------------------

    }
}

function closeMedicationPopup() {
    $("#bioMedscloseDosageBtn").append("<button aria-hidden='true' id='closeDosageOnclickBtn' data-dismiss='modal' class='close' type='button'></button>");
    $("#closeDosageOnclickBtn").click();
    $("#closeDosageOnclickBtn").remove();
}

function validateDosage(dosage) {
    if (dosage == null || dosage.trim() == "") {
        return "Enter dosage value";
    } else if (isNaN(dosage)) {
        return "Dosage should contains digit only";
    } else if (dosage < 0) {
        return "Dosage should be positive";
    } else {
        return "valid";
    }
}

function validateDuration(dosage) {
    if (dosage == null || dosage.trim() == "") {
        return "Enter Duration";
    } else if (isNaN(dosage)) {
        return "Duration should contains digit only (#weeks)";
    } else if (dosage < 0) {
        return "Duration should be positive number";
    } else {
        return "valid";
    }
}

function addDosageBioMeds(drugName, strength, form, route, sigDirection, c, count) {
    drugName = replaceSpecialChar(drugName);
    strength = replaceSpecialChar(strength);
    form = replaceSpecialChar(form.replace('&*&', '\''));
    route = replaceSpecialChar(route);
    sigDirection = replaceSpecialChar(sigDirection.replace('&*&', '\'').replace("&lt;", "<").replace("&gt;", ">"));
    var strengthWithDosage = "";
    if (count == 1) {
        strengthWithDosage = replaceSpecialChar(sigDirection.replace('&*&', '\'').replace("&lt;", "<").replace("&gt;", ">"));
        $("#bioMedsStatusMsg").text("");
        closeMedicationPopup();
    } else if (count == 2) {
        var dosage = document.getElementById("dosage" + drugName + route).value;
        var status = validateDosage(dosage);
        if (status != "valid") {
            $("#bioMedspopUperrormsg").text("").append(status);
            return false;
        } else {
            $("#bioMedsStatusMsg").text("");
            closeMedicationPopup();
            strengthWithDosage = replaceSpecialChar(sigDirection.replace('&*&', '\'').replace("<", "&lt;").replace(">", "&gt;")).replace('___', dosage);
        }
    } else if (count == 3) {
        var dosage = document.getElementById("dosage1" + ((replaceString(drugName)).replace('^', '')) + route).value;
        var dosageDuration = document.getElementById("dosage2" + ((replaceString(drugName)).replace('^', '')) + route).value;
        var status1 = validateDosage(dosage);
        var status2 = validateDuration(dosageDuration);
        if (status1 != "valid") {
            $("#bioMedspopUperrormsg").text("").append(status1);
            return false;
        } else if (status2 != "valid") {
            $("#bioMedspopUperrormsg").text("").append(status2);
            return false;
        } else {
            $("#bioMedsStatusMsg").text("");
            closeMedicationPopup();
            strengthWithDosage = replaceSpecialChar(sigDirection.replace('&*&', '\'').replace("<", "&lt;").replace(">", "&gt;")).replace('___', dosage);
        }
        strengthWithDosage = replaceSpecialChar(sigDirection.replace('&*&', '\'').replace("<", "&lt;").replace(">", "&gt;")).replace('___mg/kg', dosage + " mg/kg").replace('___weeks', dosageDuration + " weeks");
    }

    var data = sessionStorage.getItem("meds");
    $("#medBioQtyTable").text("");
//    $("#patientBioMedTableSave").text("");
    $("#patientBioMedTableSave").text("").append("<tr><td><input class='btn btn-primary' type='button' value='Prescribe' disabled='disabled'></td></tr>");
    $.each(JSON.parse(data), function(index, value) {
        var drug = value.drugname;
        var drugPack = value.drugPack;
        $.each(drugPack, function(index, value) {
            if (drug.trim() == drugName.trim() && value.form.trim() == form.trim() && value.route.trim() == route.trim() && value.strength.trim() == strength.trim()) {
                for (var m = 0; m < value.sigDirectionsList.length; m++) {
                    if (value.sigDirectionsList[m] == sigDirection.replace("&lt;", "<").replace("&gt;", ">")) {
                        var chkbx = "<input type='radio' name='Drug' id='biomedsFormsSigDiv" + m + "'  value='" + drug + "' style='display:none;' onclick=biologicsSigDisp('" + replaceString(drugName) + "','" + replaceString(strength) + "','" + replaceString(form.replace('\'', "&*&")) + "','" + replaceString(route) + "','" + replaceString(value.sigDirectionsList[m].replace('\'', "&*&").replace("<", "&lt;").replace(">", "&gt;")) + "','" + m + "')>" + strengthWithDosage;
                        $("#medsFormsSigDivLable" + ((replaceString(drug)).replace('^', '')) + m).text("").append(chkbx);
//                        $("#medsFormsSigDivLable" + ((replaceString(drug)).replace('^', '')) + m).text(strengthWithDosage);
                        $("#medsFormsSigDivLable" + ((replaceString(drug)).replace('^', '')) + m).addClass("active");
                    } else {
                        $("#medsFormsSigDivLable" + ((replaceString(drug)).replace('^', '')) + m).removeClass("active");
                    }
                }
                for (var m = 0; m < value.qty.length; m++) {
                    var chkbx = "<label id='biomedsFormsQtyDivLable" + ((replaceString(drugName)).replace('^', '')) + m + "' for='biomedsFormsQtyDiv" + m + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:160px;max-width:190px;white-space:normal;'><input type='radio' name='Drug' id='biomedsFormsQtyDiv" + m + "'  value='" + drug + "' style='display:none;' onclick=biologicsQtySelect('" + replaceString(drugName) + "','" + replaceString(strength) + "','" + replaceString(form.replace('\'', "&*&")) + "','" + replaceString(route) + "','" + replaceString(sigDirection.replace('\'', "&*&").replace("<", "&lt;").replace(">", "&gt;")) + "','" + replaceString(value.qty[m]) + "','" + replaceString(strengthWithDosage.replace('\'', "&*&").replace("<", "&lt;").replace(">", "&gt;")) + "')>" + value.qty[m] + "</label>";
                    $("#medBioQtyTable").append("<tr id='Qty" + ((replaceString(drugName)).replace('^', '')) + "" + m + "'><td>" + chkbx + "</td></tr><tr><td>&nbsp;</td></tr>");
                }
            }
        });
    });
}

function biologicsQtySelect(drugName, strength, form, route, sigDirection, qty, sigModified) {
    drugName = replaceSpecialChar(drugName);
    strength = replaceSpecialChar(strength);
    form = replaceSpecialChar(form.replace('&*&', '\''));
    route = replaceSpecialChar(route);
    sigDirection = replaceSpecialChar(sigDirection.replace('&*&', '\'').replace("&lt;", "<").replace("&gt;", ">"));
    qty = replaceSpecialChar(qty);
    $("#bioMedsStatusMsg").text("");
    var data = sessionStorage.getItem("meds");
    $.each(JSON.parse(data), function(index, value) {
        var drug = value.drugname;
        var drugPack = value.drugPack;
        $.each(drugPack, function(index, value) {
            if (drug.trim() == drugName.trim() && value.form.trim() == form.trim() && value.route.trim() == route.trim() && value.strength.trim() == strength.trim()) {
                for (var m = 0; m < value.sigDirectionsList.length; m++) {
                    if (value.sigDirectionsList[m] == sigDirection) {
                        for (var c = 0; c < value.qty.length; c++) {
                            if (value.qty[c] == qty) {
                                $("#biomedsFormsQtyDivLable" + ((replaceString(drugName)).replace('^', '')) + c).addClass("active");
                            } else {
                                $("#biomedsFormsQtyDivLable" + ((replaceString(drugName)).replace('^', '')) + c).removeClass("active");
                            }
                        }
                    }
                }
            }
        });
    });
    $("#patientBioMedTableSave").text("").append("<tr><td><input class='btn btn-primary' type='button' value='Prescribe' onclick=saveBioMeds('" + replaceString(drugName) + "','" + replaceString(strength) + "','" + replaceString(form.replace('\'', "&*&")) + "','" + replaceString(route) + "','" + replaceString(sigModified.replace('\'', "&*&").replace("<", "&lt;").replace(">", "&gt;")) + "','" + replaceString(qty) + "')></td></tr>");
}

function biologicsRefilSelect(ind) {
    $("#bioMedsStatusMsg").text("");
    for (var index = 0; index <= 11; index++) {
        if (index == ind) {
            $("#medBioRefilLableVal" + index).addClass("active");
        } else {
            $("#medBioRefilLableVal" + index).removeClass("active");
        }
    }
}

function saveBioMeds(drugName, strength, form, route, sigDirection, qty) {
    drugName = replaceSpecialChar(drugName);
    strength = replaceSpecialChar(strength);
    form = replaceSpecialChar(form.replace('&*&', '\''));
    route = replaceSpecialChar(route);
    sigDirection = replaceSpecialChar(sigDirection.replace('&*&', '\'').replace("&lt;", "<").replace("&gt;", ">"));
    qty = replaceSpecialChar(qty);
    var refil = "undefined";
    var frm = document.getElementById("bioMedsRefilForm");
    for (var a = 0; a < frm.medBioRefilValue.length; a++) {
        if (frm.medBioRefilValue[a].checked) {
            refil = a;
        }
    }
    if (refil == "undefined") {
        $("#bioMedsStatusMsg").text("").append("<center><span class='largeErrorMsg'>Please select the refill</span></center>");
    } else {
        $("#bioMedsStatusMsg").text("");
        var resultJson = "{\"drugName\":\"" + drugName
                + "\",\"form\":\"" + form
                + "\",\"type\":\"" + "Biologics"
                + "\",\"route\":\"" + route
                + "\",\"strength\":\"" + strength
                + "\",\"qty\":\"" + qty
                + "\",\"refill\":\"" + refil
                + "\",\"direction\":\"" + sigDirection
                + "\"}";
        $.post(server_base_url + "/irheum-server/UpdateMedication", {
            patientid: $("#pid").val(),
            encno: $("#encno").val(),
            medJson: resultJson
        }).done(function(data) {
            $("#patientBioMedTableSave").text("");
            if (data == success) {
                showMedication();
                $("#patientBioMedTableSave").text("").append("<tr><td><input type='button' class='btn btn-warning' value='Add More' onclick=displayMeds()></td><td><span  style='margin-left:20px;cursor:pointer;text-decoration:underline;text-decoration:underline;'  onclick=clearMedication()>Clear/ Re-write prescription</span></td></tr>");
                displayLargeSuccessMessages("bioMedsStatusMsg", "<center>" + successMessage + "</center>");
            } else if (data == fail) {
                displayLargeErrorMessages("bioMedsStatusMsg", "<center>" + failMessage + "</center>");
            } else if (data == unauthorized) {
                displayLargeErrorMessages("bioMedsStatusMsg", "<center>" + unauthorizedMessage + "</center>");
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == statusException) {
                displayLargeErrorMessages("bioMedsStatusMsg", "<center>" + statusExceptionMessage + "</center>");
            }
        });
    }
}

function clearMedication() {

    //clear medication Popup
    removeBeforePopup();
    $("#clearMedsPopup").text("").append("<div class='modal fade' id='clearMedsModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' data-backdrop='static' data-keyboard='false' />");
    $("#clearMedsModal").text("").append("<div id='clearAllMeds' data-toggle='modal' data-target='#clearMedsModal' />");
    $("#clearMedsModal").append("<div id='clearMedsModalDialog' class='modal-dialog' />");
    $("#clearMedsModalDialog").append("<div id='clearMedsModalContent' class='modal-content' />");
    $("#clearMedsModalContent").append("<div class='modal-header'><h4 class='modal-title' id='myModalLabel'>Info</h4></div>");
    $("#clearMedsModalContent").append("<div class='modal-body'>Click continue to clear all prescription and cancel to exit.</div>");
    $("#clearMedsModalContent").append("<div class='modal-footer'><button class='btn btn-primary' onclick='clearMedsContinue();'>Continue</button><button class='btn btn-default' onclick='clearMedsQuit();'>Cancel</button></div>");
    $("#clearAllMeds").click();
}

function clearMedsContinue() {
    $("#clearMedsModal").append("<div id='clearMedicationsPopup' class='btn btn-default' data-dismiss='modal' />");
    $("#clearMedicationsPopup").click();
    $("#clearMedicationsPopup").remove();
    $.post(server_base_url + "/irheum-server/ClearMedication", {
        patientid: $("#pid").val(),
        encno: $("#encno").val()
    }).done(function(data) {
        if (data == success) {
//            $("#patientBioMedTableSave").text("");
            $("#patientBioMedTableSave").text("").append("<tr><td><input class='btn btn-primary' type='button' value='Prescribe' disabled='disabled'></td></tr>");
            displayLargeSuccessMessages("bioMedsStatusMsg", "<center>Successfully cleared medication.</center>");
            showMedication();
        } else if (data == fail) {
            displayLargeErrorMessages("bioMedsStatusMsg", "<center>Failed to clear medication.</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("bioMedsStatusMsg", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("bioMedsStatusMsg", "<center>" + statusExceptionMessage + "</center>");
        }
    });
}

function clearMedsQuit() {
    $("#clearMedsModal").append("<div id='clearMedicationsPopup' class='btn btn-default' data-dismiss='modal' />");
    $("#clearMedicationsPopup").click();
    $("#clearMedicationsPopup").remove();
}
/////////////////Biologics/////////////////

/////////////////DMards///////////////////

function dmardsDisp(drugName) {
    drugName = replaceSpecialChar(drugName);
    $("#medDMardRefilTable").text("");
    $("#dmardMedsStatusMsg").text("");
    $("#patientDMardsMedTableSave").text("").append("<tr><td><input class='btn btn-primary' type='button' value='Prescribe' disabled='disabled')></td></tr>");
    for (var index = 0; index <= 11; index++) {
        $("#medDMardRefilTable").append("<tr id='refil" + index + "'><td><label id='medDMardRefilLableVal" + index + "' for='medDMardRefilVal" + index + "' class='btn quest btn-default' style='text-align:center;font-weight:bold;min-width:50px;max-width:70px;' ><input type='radio' name='medDmardRefilValue' id='medDMardRefilVal" + index + "'  style='display:none;' onclick=dmardRefilSelect('" + index + "') >" + index + "</label></td></tr>");
    }
    var data = sessionStorage.getItem("meds");
    $.each(JSON.parse(data), function(index, value) {
        if (value.type == "DMards") {
            $("#medsDiv" + ((replaceString(value.drugname)).replace('^', ''))).removeClass("active");
            if (value.drugname == drugName) {
                $("#medsDiv" + (replaceString(value.drugname)).replace('^', '')).addClass("active");
                var drugPack = value.drugPack;
                $("#medDMardStrengthTable").text("");
                $("#medDMardSigTable").text("");
                $("#medDMardQtyTable").text("");
                $("#patientDMardMedTableSave").text("");
                $.each(drugPack, function(index, value) {
                    var chkbx = "<label id='dmardmedsFormsDivLable" + ((replaceString(drugName)).replace('^', '')) + index + "' for='dmardMedsFormsDiv" + index + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:200px;max-width:220px;white-space:normal;'><input type='radio' name='Drug' id='dmardMedsFormsDiv" + index + "'  value='" + value.drugname + "' style='display:none;' onclick=dmardsStrengthDisp('" + replaceString(drugName) + "','" + replaceString(value.strength.trim()) + "','" + replaceString(value.form.trim().replace('\'', "&*&")) + "','" + replaceString(value.route.trim()) + "')>" + value.strength + " " + value.form + " " + value.route + "</label>";
                    $("#medDMardStrengthTable").append("<tr><td>" + chkbx + "</td></tr><tr><td>&nbsp;</td></tr>");
                });
            }
        }
    });
}


function dmardsStrengthDisp(drugName, strength, form, route) {
    drugName = replaceSpecialChar(drugName);
    strength = replaceSpecialChar(strength);
    form = replaceSpecialChar(form.replace('&*&', '\''));
    route = replaceSpecialChar(route);
    var data = sessionStorage.getItem("meds");
    $("#medDMardSigTable").text("");
    $("#medDMardQtyTable").text("");
    $("#dmardMedsStatusMsg").text("");
//    $("#patientDMardMedTableSave").text("");
    $("#patientDMardsMedTableSave").text("").append("<tr><td><input class='btn btn-primary' type='button' value='Prescribe' disabled='disabled')></td></tr>");
    $.each(JSON.parse(data), function(index, value) {
        var drug = value.drugname;
        var drugPack = value.drugPack;
        $.each(drugPack, function(index, value) {
            $("#dmardmedsFormsDivLable" + ((replaceString(drug)).replace('^', '')) + index).removeClass("active");
            if (drug == drugName && value.form == form && value.route == route && value.strength == strength) {
                $("#dmardmedsFormsDivLable" + ((replaceString(drug)).replace('^', '')) + index).addClass("active");
                for (var m = 0; m < value.sigDirectionsList.length; m++) {
                    var chkbx = "<label id='medsFormsSigDivLable" + ((replaceString(drug)).replace('^', '')) + m + "' for='dmardmedsFormsSigDiv" + m + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:280px;max-width:300px;white-space:normal;'><input type='radio' name='Drug' id='dmardmedsFormsSigDiv" + m + "'  value='" + value.drugname + "' style='display:none;' onclick=dmardsSigDisp('" + replaceString(drugName) + "','" + replaceString(strength) + "','" + replaceString(form.replace('\'', "&*&")) + "','" + replaceString(route) + "','" + replaceString(value.sigDirectionsList[m].replace('\'', "&*&")) + "','" + m + "')>" + value.sigDirectionsList[m] + "</label>";
                    $("#medDMardSigTable").append("<tr id='" + replaceString(drugName).replace('^', '') + "" + m + "'><td>" + chkbx + "</td></tr><tr><td>&nbsp;</td></tr>");
                }
            }
        });
    });
}

function closeDmardPopup() {
    $("#closeDosageBtn").append("<button aria-hidden='true' id='closeDosageOnclickBtn' data-dismiss='modal' class='close' type='button'></button>");
    $("#closeDosageOnclickBtn").click();
    $("#closeDosageOnclickBtn").remove();
}

function addDosage(drugName, strength, form, route, sigDirection, m) {
    drugName = replaceSpecialChar(drugName);
    strength = replaceSpecialChar(strength);
    form = replaceSpecialChar(form.replace('&*&', '\''));
    route = replaceSpecialChar(route);
    sigDirection = replaceSpecialChar(sigDirection.replace('&*&', '\''));
    var dosage = document.getElementById("dosage" + ((replaceString(drugName)).replace('^', '')) + route).value;
    var status = validateDosage(dosage);
    if (status != "valid") {
        $("#dmardsPopupErrormsg").text("").append(status);
        return false;
    } else {
        closeDmardPopup();
        var strengthWithDosage = replaceSpecialChar(sigDirection.replace('&*&', '\'')).replace('___', dosage);
        var chkbx = "<label id='medsFormsSigDivLable" + ((replaceString(drugName)).replace('^', '')) + m + "' for='medsFormsSigDiv" + m + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:280px;max-width:300px;white-space:normal;'><input type='radio' name='Drug' id='medsFormsSigDiv" + m + "'  value='" + drugName + "' style='display:none;' onclick=dmardsSigDisp('" + replaceString(drugName) + "','" + replaceString(strength) + "','" + replaceString(form.replace('\'', "&*&")) + "','" + replaceString(route) + "','" + replaceString(sigDirection.replace('\'', "&*&")) + "','" + m + "')>" + strengthWithDosage + "</label>";
        $("#" + replaceString(drugName).replace('^', '') + m).text("").append("<td>" + chkbx + "</td></tr>");
        var data = sessionStorage.getItem("meds");
        $("#medDMardQtyTable").text("");
        $("#patientDMardMedTableSave").text("");
        $.each(JSON.parse(data), function(index, value) {
            var drug = value.drugname;
            var drugPack = value.drugPack;
            $.each(drugPack, function(index, value) {
                if (drug == drugName && value.form == form && value.route == route && value.strength == strength) {
                    for (var m = 0; m < value.sigDirectionsList.length; m++) {
                        if (value.sigDirectionsList[m] == sigDirection) {
                            $("#medsFormsSigDivLable" + ((replaceString(drug)).replace('^', '')) + m).val(sigDirection.replace("___", dosage));
                            $("#medsFormsSigDivLable" + ((replaceString(drug)).replace('^', '')) + m).addClass("active");
                        } else {
                            $("#medsFormsSigDivLable" + ((replaceString(drug)).replace('^', '')) + m).removeClass("active");
                        }
                    }
                    for (var m = 0; m < value.qty.length; m++) {
                        var chkbx = "<label id='dmardmedsFormsQtyDivLable" + ((replaceString(drug)).replace('^', '')) + m + "' for='dmardmedsFormsQtyDiv" + m + "' class='btn quest btn-default' style='text-align:left;font-weight:bold;min-width:160px;max-width:190px;white-space:normal;'><input type='radio' name='Drug' id='dmardmedsFormsQtyDiv" + m + "'  value='" + drug + "' style='display:none;' onclick=dmardsQtySelect('" + replaceString(drugName) + "','" + replaceString(strength) + "','" + replaceString(form.replace('\'', "&*&")) + "','" + replaceString(route) + "','" + replaceString(sigDirection.replace('\'', "&*&")) + "','" + replaceString(value.qty[m]) + "','" + dosage + "')>" + value.qty[m] + "</label>";
                        $("#medDMardQtyTable").append("<tr id='Qty" + drugName + "" + m + "'><td>" + chkbx + "</td></tr><tr><td>&nbsp;</td></tr>");
                    }
                }
            });
        });
    }
}


function dmardsSigDisp(drugName, strength, form, route, sigDirection, m) {
    dmardsStrengthDisp(drugName, strength, form, route);
    //------------------------------------------------------------------------------------------------------------------------------
    removeBeforePopup();
    $("#medicationPopup").text("").append("<div id='SigInputPopupDiv' />");
    $("#SigInputPopupDiv").text("").append("<div id='DrugDoseSelection' data-toggle='modal' data-target='.bs-example-modal-sm' />");
    $("#SigInputPopupDiv").append("<div id='popupMedicationInside' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' data-backdrop='static' data-keyboard='false' />");
    $("#popupMedicationInside").append("<div id='modalSmDmardMeds' class='modal-dialog modal-sm' />");
    $("#modalSmDmardMeds").append("<div id='modalContentDmardMeds' class='modal-content' />");
    $("#modalContentDmardMeds").append("<div class='modal-header' id='closeDosageBtn' />");
    $("#closeDosageBtn").text("").append("<h4 class='modal-title'>Select Dosage</h4>");
    $("#modalContentDmardMeds").append("<div class='modal-body' id='selectDosageDiv' />");
    $("#selectDosageDiv").text("").append("<input type='text' class='form-control' id='dosage" + ((replaceString(drugName)).replace('^', '')) + route + "' maxlength=4 size=4 placeholder='dosage in mg' onkeyup=removeMsgInPopup()><br /><center><input type='button' class='btn btn-primary' value='Add' onclick=addDosage('" + drugName + "','" + strength + "','" + form + "','" + route + "','" + sigDirection + "','" + m + "')><br /><br /><a href='javascript:closeDmardPopup()'>Close</a></center>");
    $("#selectDosageDiv").append("<lable id='dmardsPopupErrormsg' />");
    $("#DrugDoseSelection").click();
//------------------------------------------------------------------------------------------------------------------------------
}

function removeMsgInPopup() {
    $("#dmardsPopupErrormsg").text("");
    $("#bioMedspopUperrormsg").text("");
}

function dmardsQtySelect(drugName, strength, form, route, sigDirection, qty, dosage) {
    $("#dmardMedsStatusMsg").text("");
    drugName = replaceSpecialChar(drugName);
    strength = replaceSpecialChar(strength);
    form = replaceSpecialChar(form.replace('&*&', '\''));
    route = replaceSpecialChar(route);
    sigDirection = replaceSpecialChar(sigDirection.replace('&*&', '\''));
    qty = replaceSpecialChar(qty);
    var data = sessionStorage.getItem("meds");
    $.each(JSON.parse(data), function(index, value) {
        var drug = value.drugname;
        var drugPack = value.drugPack;
        $.each(drugPack, function(index, value) {
            if (drug == drugName && value.form == form && value.route == route && value.strength == strength) {
                for (var m = 0; m < value.sigDirectionsList.length; m++) {
                    if (value.sigDirectionsList[m] == sigDirection) {
                        for (var c = 0; c < value.qty.length; c++) {
                            if (value.qty[c] == qty) {
                                $("#dmardmedsFormsQtyDivLable" + ((replaceString(drug)).replace('^', '')) + c).addClass("active");
                            } else {
                                $("#dmardmedsFormsQtyDivLable" + ((replaceString(drug)).replace('^', '')) + index).removeClass("active");
                            }
                        }
                    }
                }
            }
        });
    });
    $("#patientDMardsMedTableSave").text("").append("<tr><td><input class='btn btn-primary' type='button' value='Prescribe' onclick=saveDmardMeds('" + replaceString(drugName) + "','" + replaceString(strength) + "','" + replaceString(form.replace('\'', "&*&")) + "','" + replaceString(route) + "','" + replaceString(sigDirection.replace('\'', "&*&").replace('___', dosage)) + "','" + replaceString(qty) + "')></td></tr>");
}

function saveDmardMeds(drugName, strength, form, route, sigDirection, qty) {
    $("#dmardMedsStatusMsg").text("");
    drugName = replaceSpecialChar(drugName);
    strength = replaceSpecialChar(strength);
    form = replaceSpecialChar(form.replace('&*&', '\''));
    route = replaceSpecialChar(route);
    sigDirection = replaceSpecialChar(sigDirection.replace('&*&', '\''));
    qty = replaceSpecialChar(qty);
    var refil = "undefined";
    var frm = document.getElementById("dmardMedsRefilForm");
    for (var a = 0; a < frm.medDmardRefilValue.length; a++) {
        if (frm.medDmardRefilValue[a].checked) {
            refil = a;
        }
    }
    if (refil == "undefined") {
        $("#dmardMedsStatusMsg").text("").append("<center><span class='LargeErrorMsg'>Please select the refil</span></center>");
    } else {
        $("#dmardMedsStatusMsg").text("");
        var resultJson = "{\"drugName\":\"" + drugName
                + "\",\"form\":\"" + form
                + "\",\"type\":\"" + "DMards"
                + "\",\"route\":\"" + route
                + "\",\"strength\":\"" + strength
                + "\",\"qty\":\"" + qty
                + "\",\"refill\":\"" + refil
                + "\",\"direction\":\"" + sigDirection
                + "\"}";
        $.post(server_base_url + "/irheum-server/UpdateMedication", {
            patientid: $("#pid").val(),
            encno: $("#encno").val(),
            medJson: resultJson
        }).done(function(data) {
            $("#patientDMardsMedTableSave").text("");
            if (data == success) {
                showMedication();
                $("#medicationDisplyDivDMards").click();
                $("#patientDMardsMedTableSave").text("").append("<tr><td><input type='button' class='btn btn-warning' value='Add More' onclick=displayMeds()></td><td><span  style='margin-left:20px;cursor:pointer;'  onclick=clearMedication()>Clear/ Re-write prescription</span></td></tr>");
                displayLargeSuccessMessages("dmardMedsStatusMsg", "<center>" + successMessage + "</center>");
                $("#biologicsLiId").removeClass("active");
                $("#medicationDisplyDivBiologics").removeClass("active");
                $("#dmardsLiId").addClass("active");
                $("#medicationDisplyDivDMards").addClass("active");
            } else if (data == fail) {
                displayLargeErrorMessages("dmardMedsStatusMsg", "<center>" + failMessage + "</center>");
            } else if (data == unauthorized) {
                displayLargeErrorMessages("dmardMedsStatusMsg", "<center>" + unauthorizedMessage + "</center>");
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == statusException) {
                displayLargeErrorMessages("dmardMedsStatusMsg", "<center>" + statusExceptionMessage + "</center>");
            }
        });
    }
}


function dmardRefilSelect(ind) {
    $("#dmardMedsStatusMsg").text("");
    for (var index = 0; index <= 11; index++) {
        if (index == ind) {
            $("#medDMardRefilLableVal" + index).addClass("active");
        } else {
            $("#medDMardRefilLableVal" + index).removeClass("active");
        }
    }
}

/////////////////DMards/////////////////
///////////////////////////////Medication Ends/////////////////////////////////////////////////


////////////////////////// Prescription Questionnaire & Medication comments starts//////////////////////////

//to fetch patient medication related questions
function getprescriptionQuesionare() {
    $('html,body').scrollTop(0);
    $.get(server_base_url + "/irheum-server/FetchPrescriptionQuestionare", {
        patientid: $("#pid").val(),
        encno: $("#encno").val()
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("PrescriptionQuestionsDiv", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("PrescriptionQuestionsDiv", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("PrescriptionQuestionsDiv", statusExceptionMessage);
        } else {
            $.each(data, function(index, value) {
                if (index == "Default") {
                    $("#PrescriptionQuestionsDiv").text("").append("<div class='table-responsive' id='patientQuestionsTableDiv' />");
                    $("#patientQuestionsTableDiv").append("<table class='table table-primary mb30' id='patientQuestionsTable' />");
                    $("#patientQuestionsTableDiv").append("<table class='table table-primary mb30' id='patientQuestionsTableBtns' />");
                    $("#patientQuestionsTable").append("<thead><tr><th>S.No.</th><th>Question</th><th>Answer</th><th>Date Of Test</th></tr></thead>");
                    $("#patientQuestionsTable").append("<tbody id='patientQuestionsTableBody' />");
                    var count = 0;
                    $.each(value, function(index, value) {
                        count++;
                        var dateNeeded = false;
                        if (value.category == "DATE") {
                            dateNeeded = true;
                        }
                        var ans = "<label for='ansYes" + index + "' class='btn quest btn-default' id='ansYesLable" + index + "' style='border-radius: 3px; font-weight: bold;'><input type='radio' name='s1" + index + "' id='ansYes" + index + "' value='yes' style='display:none;' onclick=selectRadioAns('ansYesLable','" + index + "','" + count + "')>Yes</label>" +
                                "<label for='ansNo" + index + "' class='btn quest btn-default' id='ansNoLable" + index + "' style='margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' name='s1" + index + "' id='ansNo" + index + "' value='no' style='display:none;' onclick=selectRadioAns('ansNoLable','" + index + "','" + count + "')>No</label>";
                        if (dateNeeded) {
                            $("#patientQuestionsTableBody").append("<tr><td id='sid" + count + "'>" + value.sequenceid + "</td><td id='question" + count + "'>" + value.question + "</td><td id='answer" + count + "'>" + ans + "</td><td id='date" + count + "'><div class='col-md-6'><input type='text' onchange=javascript:validateTestDate('" + count + "') id='testDate" + count + "' placeholder='Test date' class='form-control' disabled='disabled' /></div></td></tr>");
                            $("#testDate" + count).mask("99/99/9999");
                            $("#testDate" + count).datepicker({changeYear: true, changeMonth: true, yearRange: datePickerRange, maxDate: new Date()});
                        } else {
                            $("#patientQuestionsTableBody").append("<tr><td id='sid" + count + "'>" + value.sequenceid + "</td><td id='question" + count + "'>" + value.question + "</td><td id='answer" + count + "'>" + ans + "</td><td>&nbsp;</td></tr>");
                        }
                    });
                    $("#patientQuestionsTableBtns").append("<tr><td><input type='button' class='btn btn-primary' value='Submit' onclick=addPriscriptionQuestionare('" + count + "')></td><td id='prescriptionQuestionareMessage'></td></tr>");
                } else if (index == "Encounter") {
                    $("#PrescriptionQuestionsDiv").text("").append("<div class='table-responsive' id='patientQuestionsTableDiv' />");
                    $("#patientQuestionsTableDiv").append("<table class='table table-primary mb30' id='patientQuestionsTable' />");
                    $("#patientQuestionsTableDiv").append("<table class='table table-primary mb30' id='patientQuestionsTableBtns' />");
                    $("#patientQuestionsTable").append("<thead><tr><th>S.No.</th><th>Question</th><th>Answer</th><th>Date Of Test</th></tr></thead>");
                    $("#patientQuestionsTable").append("<tbody id='patientQuestionsTableBody' />");
                    var i = 0;
                    $.each(value, function(index, value) {
                        i++;
                        var count = value.qid;
                        $("#patientQuestionsTableBody").append("<tr id='medQues" + count + "' />");
                        $("#medQues" + count).append("<td id='sid" + count + "'>" + value.qid + "</td>");
                        $("#medQues" + count).append("<td id='question" + count + "'>" + value.question + "</td>");
                        var ans = "<label for='ansYes" + index + "' class='btn quest btn-default' id='ansYesLable" + index + "' style='margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' name='s1" + index + "' id='ansYes" + index + "' value='yes' style='display:none;' onclick=selectRadioAns('ansYesLable','" + index + "','" + count + "')>Yes</label>" +
                                "<label for='ansNo" + index + "' class='btn quest btn-default' id='ansNoLable" + index + "' style='margin-left: 20px; border-radius: 3px; font-weight: bold;'><input type='radio' name='s1" + index + "' id='ansNo" + index + "' value='no' style='display:none;' onclick=selectRadioAns('ansNoLable','" + index + "','" + count + "')>No</label>";
                        $("#medQues" + count).append("<td id='answer" + count + "'>" + ans + "</td>");
                        if (value.testDate != undefined) {
                            $("#medQues" + count).append("<td id='date" + count + "'><div class='col-md-6'><input type='text' class='form-control' onchange=javascript:validateTestDate('" + count + "') id='testDate" + count + "' value='" + value.testDate + "' placeholder='Test date' /></div></td>");
                            $("#testDate" + count).mask("99/99/9999");
                            $("#testDate" + count).datepicker({changeYear: true, changeMonth: true, yearRange: datePickerRange, maxDate: new Date()});
                        } else {
                            $("#medQues" + count).append("<td id='date" + count + "'>&nbsp;</td>");
                        }
                        if (value.answer == "yes") {
                            $("#ansYes" + index).prop('checked', true);
                            selectRadioAns("ansYesLable", index, count);
                        } else if (value.answer == "no") {
                            $("#ansNo" + index).prop('checked', true);
                            selectRadioAns("ansNoLable", index, count);
                        }
                    });
                    count = i;
                    $("#patientQuestionsTableBtns").append("<tr><td><input type='button' class='btn btn-primary' value='Save' onclick=addPriscriptionQuestionare('" + count + "')></td><td id='prescriptionQuestionareMessage'></td></tr>");
                }
            });
        }
    });
}

function selectRadioAns(id, count, ct) {
    $("#prescriptionQuestionareMessage").text("");
    $("#ansYesLable" + count).removeClass("active");
    $("#ansNoLable" + count).removeClass("active");
    $("#" + id + count).addClass("active");
    if (id == "ansNoLable") {
        $("#testDate" + ct).val("");
        $("#testDate" + ct).attr('readonly', true);
        $("#testDate" + ct).attr('disabled', true);
    }
    if (id == "ansYesLable") {
        $("#testDate" + ct).attr('readonly', false);
        $("#testDate" + ct).attr('disabled', false);
    }
}

function validateTestDate(count) {
    var todayDate = new Date();
    var date = (todayDate.getMonth() + 1) + "/" + todayDate.getDate() + "/" + todayDate.getFullYear();
    if (date < $("#testDate" + count).val()) {
        $("#prescriptionQuestionareMessage").text("").append("<span class='largeErrorMsg'>Test date should not be greater than current date.</span>");
        $("#testDate" + count).val("");
    } else {
        $("#prescriptionQuestionareMessage").text("");
    }
}


function selectRadio(id, count) {
    $("#ansYesLable" + count).removeClass("active");
    $("#ansNoLable" + count).removeClass("active");
    $("#" + id + count).addClass("active");
}

function addPriscriptionQuestionare(count) {
    $("#prescriptionQuestionareMessage").text("");
    var finalJson = "";
    var ansFlag = false;
    for (var m = 1; m <= count; m++) {
        var answer = $("input[name=s1" + (m - 1) + "]:checked").val();
        if (answer != undefined) {
            ansFlag = true;
        }
    }
    if (ansFlag) {
        for (var m = 1; m <= count; m++) {
            var answer = $("input[name=s1" + (m - 1) + "]:checked").val();
            if ($("#testDate" + m).val() != undefined && answer != undefined) {
                if ($("#testDate" + m).val() != "") {
                    var inputdate = $("#testDate" + m).val();
                    var status = checkFutureDate(inputdate);
                    if (!status) {
                        ansFlag = false;
                    }
                }
            }
        }
        if (ansFlag) {
            for (var m = 1; m <= count; m++) {
                var json = "";
                var answer = $("input[name=s1" + (m - 1) + "]:checked").val();
                if (answer == undefined) {
                    answer = "";
                }
                json = json + "\"qid\":\"" + $("#sid" + m).text() + "\"," + "\"question\":\"" + $("#question" + m).text() + "\"," +
                        "\"answer\":\"" + answer + "\",";
                var dateJson;
                if ($("#testDate" + m).val() == undefined) {
                    dateJson = json +
                            "\"category\":\"NONE\"";
                } else {
                    if ($("input[name=s1" + (m - 1) + "]:checked").val() == "yes" && $("#testDate" + m).val() == "") {
                        $("#prescriptionQuestionareMessage").text("").append("<span style='font-size:18px;color:#A52A2A;'>Please enter test date.</span>");
                        return;
                    }
                    if ($("input[name=s1" + (m - 1) + "]:checked").val() == "" && $("#testDate" + m).val() != "") {
                        $("#prescriptionQuestionareMessage").text("").append("<span style='font-size:18px;color:#A52A2A;'>Please enter test date.</span>");
                        return;
                    }
                    dateJson = json +
                            "\"category\":\"DATE\"," +
                            "\"testDate\":\"" + $("#testDate" + m).val() + "\"";
                }
                finalJson = finalJson + "{" + dateJson + "},";
            }
            finalJson = finalJson.substr(0, finalJson.length - 1);
            finalJson = "[" + finalJson + "]";
            $.get(server_base_url + "/irheum-server/UpdatePrescriptionQuestionare", {
                patientid: $("#pid").val(),
                encno: $("#encno").val(),
                prescqueJson: finalJson
            }).done(function(data) {
                if (data == success) {
                    displayLargeSuccessMessages("prescriptionQuestionareMessage", successMessage);
                } else if (data == fail) {
                    displayLargeErrorMessages("prescriptionQuestionareMessage", failMessage);
                } else if (data == unauthorized) {
                    displayLargeErrorMessages("prescriptionQuestionareMessage", unauthorizedMessage);
                } else if (data == invalidSession) {
                    callSessionTimeout();
                } else if (data == statusException) {
                    displayLargeErrorMessages("prescriptionQuestionareMessage", statusExceptionMessage);
                }
            });
        } else {
            displayLargeErrorMessages("prescriptionQuestionareMessage", "<center>Input date should not exceed current date.</center>");
        }
    } else {
        displayLargeErrorMessages("prescriptionQuestionareMessage", "<center>Select the answer.</center>");
    }
}

//to fetch and disply medicaiton related comments
function getMedicationComment() {
    $('html,body').scrollTop(0);
    $("#medCommentsDiv").append("<table id='medCommentsTable' style='width:100%;'>");
    $("#medCommentsTable").text("").append("<div class='panel panel-warning-head'><div class='panel-heading' style='height:14px;'><center><h3 class='pt-label' style='margin-top:-7px;font-size:16px;'><b>Medication Comments</b></h3></center></div></div>");
    $("#medCommentsTable").append("<div class='panel-body' id='MedicationCommentsPanelBodyDiv' />");
    $("#MedicationCommentsPanelBodyDiv").append("<div id='medCommentsTextAreaDiv'/>");
    $("#MedicationCommentsPanelBodyDiv").prepend("<button id='addCommentbtn' onclick='getCommentFields()' class = 'btn btn-primary' style = 'margin-right:10px;margin-left:10px;'><b>Add Comment<b></button><center><span id='medConmmentsStatus' /></center>");
    $("#MedicationCommentsPanelBodyDiv").append("<div id='medCommentsTableDiv' class='table-responsive' />");
    displayMedComments();
}

function displayMedComments() {
    $("#medCommentsTableDiv").text("").append("<br /><table id='medicationMainTable' class='table table-striped table-bordered responsive dataTable no-footer dtr-inline' />");
    $("#medicationMainTable").append("<tbody id='medCommentsTableBody' />");
    $.get(server_base_url + "/irheum-server/FetchEncounterComments", {
        patientid: $("#pid").val(),
        encno: $("#encno").val()
    }).done(function(data) {
        if (data == "Empty Comments") {
            $("#medConmmentsStatus").text("");
        } else if (data == fail) {
            displayLargeErrorMessages("medConmmentsStatus", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("medConmmentsStatus", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("medConmmentsStatus", statusExceptionMessage);
        } else {
            $("#medicationMainTable").append("<thead id='medCommentsHead'><tr><th>S.No.</th><th>Comment</th>><th>Date</th></tr></thead>");
            $.each(data, function(index, value) {
                //                alert(index+"\t"+value.comment);
                if (value.type == "Medication") {
                    var comment;
                    if (value.comment == "") {
                        comment = "N/A";
                    } else {
                        comment = value.comment;
                    }
                    $("#medCommentsTableBody").append("<tr><td>" + (index + 1) + "</td><td>" + comment + "</td><td>" + dateConversion(value.createdDate) + "</td></tr>");
                }
            });
        }
    });
}

//if clicks on add comment in medication then it will display text area
function getCommentFields() {
    $("#addCommentbtn").remove();
    $("#medConmmentsStatus").text("").remove();
    $("#MedicationCommentsPanelBodyDiv").prepend("<button id='savebtn' onclick='saveEncounterComments()' class = 'btn btn-primary' style = 'margin-right:10px;margin-left:10px;'><b>Save<b></button><center><span id='medConmmentsStatus' /></center>");
    $("#medCommentsTextAreaDiv").append("<textarea id='medCommentData' style='width:100%;height:8%;margin-top:5px;' placeholder='Add a comment here.'></textarea>");
}

function saveEncounterComments() {
    var commentText = $("#medCommentData").val();
    if (commentText == "" || commentText == "undefined") {
        $("#medConmmentsStatus").text("").append("<span class='largeErrorMsg'>Enter the comment.</span>");
        return false;
    }
    var comment = "{\"comment\"=\"" + commentText + "\"}";
    $.get(server_base_url + "/irheum-server/UpdateEncounterComments", {
        patientid: $("#pid").val(), encno: $("#encno").val(), commentsJson: comment
    }).done(function(data) {
        if (data == success) {
            $("#savebtn").remove();
            $("#medConmmentsStatus").text("").remove();
            $("#MedicationCommentsPanelBodyDiv").prepend("<button id='addCommentbtn' onclick='getCommentFields()' class = 'btn btn-primary' style = 'margin-right:10px;margin-left:10px;'><b>Add Comment<b></button><center><span id='medConmmentsStatus' /></center>");
            $("#medCommentData").remove();
            displayLargeSuccessMessages("medConmmentsStatus", successMessage);
            displayMedComments();
        } else if (data == fail) {
            displayLargeErrorMessages("medConmmentsStatus", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("medConmmentsStatus", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("medConmmentsStatus", statusExceptionMessage);
        }
    });
}
////////////////////////// Prescription Questionnaire & Medication comments ends//////////////////////////