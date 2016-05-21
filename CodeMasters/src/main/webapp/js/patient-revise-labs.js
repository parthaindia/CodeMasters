//patientReviseLabs.jsp onload function
function getReviseLabsDefaults() {
    var encId = getUserSessionElement("encId");
    $("#labsDiv").append("<input id='encid' type='hidden' value='" + encId + "' />");
    userValidation();
    loadLabsFields();
}


//for labs onload data function start
function loadLabsFields() {
//    jQuery('#labsDate').datepicker();
    jQuery("#labsDate1").mask("99/99/9999");
    jQuery("#esrDate1").mask("99/99/9999");
    jQuery("#crpDate1").mask("99/99/9999");
    jQuery("#rfDate1").mask("99/99/9999");
    jQuery("#anticcpDate1").mask("99/99/9999");
    jQuery("#vectradaDate1").mask("99/99/9999");
    var esrValue1 = jQuery('#esrValue1').spinner();
    esrValue1.spinner('value', "");
    var crpValue1 = jQuery('#crpValue1').spinner();
    crpValue1.spinner('value', "");
    var rfValue1 = jQuery('#rfValue1').spinner();
    rfValue1.spinner('value', "");
    var anticcpValue1 = jQuery('#anticcpValue1').spinner();
    anticcpValue1.spinner('value', "");
    var vectradaValue1 = jQuery('#vectradaValue1').spinner();
    vectradaValue1.spinner('value', "");
    $("#labsSubmitButton1").show();
    $("#beforeLabsUpdateMsg1").text("");
    $("#afterLabsUpdateMsg1").text("");
}

//for labs date on blur start in revise labs page
function labsDate_blur1() {
    var labsdate = $('#labsDate1').val();
    document.getElementById("esrDate1").value = labsdate;
    document.getElementById("crpDate1").value = labsdate;
    document.getElementById("rfDate1").value = labsdate;
    document.getElementById("anticcpDate1").value = labsdate;
    document.getElementById("vectradaDate1").value = labsdate;
}//for labs date on blur end in revise labs page

//for labs onclick submit data function start in revise labs page
function labsSubmitData1() {
    var esrList = "{\"name\":\"ESR\",\"unit\":\"" + $("#esrUnit1").val() + "\",\"value\":\"" + $("#esrValue1").val() + "\",\"comparator\":\"" + $('input[name=esrComparator1]:checked').val() + "\",\"resultDate\":\"" + $("#esrDate1").val() + "\"}";
    var crpList = "{\"name\":\"CRP\",\"unit\":\"" + $("#crpUnit1").val() + "\",\"value\":\"" + $("#crpValue1").val() + "\",\"comparator\":\"" + $('input[name=crpComparator1]:checked').val() + "\",\"resultDate\":\"" + $("#crpDate1").val() + "\"}";
    var rfList = "{\"name\":\"RF\",\"value\":\"" + $("#rfValue1").val() + "\",\"flag\":\"" + $('input[name=rfFlag1]:checked').val() + "\",\"resultDate\":\"" + $("#rfDate1").val() + "\"}";
    var anticcpList = "{\"name\":\"ANTI-CCP\",\"value\":\"" + $("#anticcpValue1").val() + "\",\"flag\":\"" + $('input[name=anticcpFlag1]:checked').val() + "\",\"resultDate\":\"" + $("#anticcpDate1").val() + "\"}";
    var vectradaList = "{\"name\":\"VECTRA-DA\",\"value\":\"" + $("#vectradaValue1").val() + "\",\"flag\":\"" + $('input[name=vectradaFlag1]:checked').val() + "\",\"resultDate\":\"" + $("#vectradaDate1").val() + "\"}";
    var labsObject1 = "[" + esrList + "," + crpList + "," + rfList + "," + anticcpList + "," + vectradaList + "]";
//    alert(labsObject1);
    $.get(server_base_url + "/irheum-server/LabUpdate", {
        encounterid: $("#encid").val(),
        LabJSON: labsObject1
    }).done(function(data) {
//        alert(data);
        if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == "unauthorized access" || data == "fail" || data == null || data == "" || data == undefined) {
            $("#beforeLabsUpdateMsg1").text("").append("<span style='font-weight:bold;color:brown;font-size:16px;'>Update fail.</span>");
            $("#afterLabsUpdateMsg1").text("").append("<span style='font-weight:bold;color:brown;font-size:16px;'>Update fail.</span>");
        } else if (data == "success") {
            $("#labsSubmitButton1").hide();
            $("#beforeLabsUpdateMsg1").text("").append("<span style='font-weight:bold;color:green;font-size:16px;'>Successfully updated.</span>");
            $("#afterLabsUpdateMsg1").text("").append("<span style='font-weight:bold;color:green;font-size:16px;'>Successfully updated.</span>");
        }
    });
}//for labs onclick submit data function end in revise labs page


function reviseLabsBackBtn() {
    location.href = "dashboard.jsp";
}