//for labs onload data function start
function getLabsData() {
    $("#labsSubmitButton").show();
    $("#beforeLabsUpdateMsg").text("");
    $("#afterLabsUpdateMsg").text("");
    $.get(server_base_url + "/irheum-server/FetchPatientLabs", {
        encounterid: $("#encid").val()
    }).done(function(data) {
        var editFlag = "false";
        if (data == fail) {
            displayLargeErrorMessages("beforeLabsUpdateMsg", failMessage);
            displayLargeErrorMessages("afterLabsUpdateMsg", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeLabsUpdateMsg", unauthorizedMessage);
            displayLargeErrorMessages("afterLabsUpdateMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeLabsUpdateMsg", statusExceptionMessage);
            displayLargeErrorMessages("afterLabsUpdateMsg", statusExceptionMessage);
        } else {
            $.each(data, function(index, value) {
                if (value.name == "ESR") {
                    if (value.unit != "") {
                        $("#esrUnit").val(value.unit);
                    }

                    if (value.value != "") {
                        $("#esrValue").val(value.value);
                        editFlag = "true";
                    }

                    if (value.comparator == "NA") {
                        $('#esrComparatorNa').attr('checked', true);
                        $('#esrComparatorNaLabel').addClass("active");
                    } else if (value.comparator == "<") {
                        $('#esrComparatorLess').attr('checked', true);
                        $('#esrComparatorLessLabel').addClass("active");
                    } else if (value.comparator == ">") {
                        $('#esrComparatorGreater').attr('checked', true);
                        $('#esrComparatorGreaterLabel').addClass("active");
                    }

                    if (value.resultDate == "" || value.resultDate == "undefined") {
                    } else {
                        $("#esrDate").val(value.resultDate);
                    }
                }

                if (value.name == "CRP") {
                    if (value.unit != "") {
                        $("#crpUnit").val(value.unit);
                    }

                    if (value.value != "") {
                        $("#crpValue").val(value.value);
                        editFlag = "true";
                    }

                    if (value.comparator == "NA") {
                        $('#crpComparatorNa').attr('checked', true);
                        $('#crpComparatorNaLabel').addClass("active");
                    } else if (value.comparator == "<") {
                        $('#crpComparatorLess').attr('checked', true);
                        $('#crpComparatorLessLabel').addClass("active");
                    } else if (value.comparator == ">") {
                        $('#crpComparatorGreater').attr('checked', true);
                        $('#crpComparatorGreaterLabel').addClass("active");
                    }

                    if (value.resultDate == "" || value.resultDate == "undefined") {
                    } else {
                        $("#crpDate").val(value.resultDate);
                    }
                }

                if (value.name == "RF") {
                    if (value.flag == "NA") {
                        editFlag = "true";
                        $('#rfFlagNa').attr('checked', true);
                        $('#rfFlagNaLabel').addClass("active");
                    } else if (value.flag == "-") {
                        editFlag = "true";
                        $('#rfFlagNegative').attr('checked', true);
                        $('#rfFlagNegativeLabel').addClass("active");
                    } else if (value.flag == "+") {
                        editFlag = "true";
                        $('#rfFlagPositive').attr('checked', true);
                        $('#rfFlagPositiveLabel').addClass("active");
                    }

                    if (value.value != "") {
                        $("#rfValue").val(value.value);
                        editFlag = "true";
                    }

                    if (value.resultDate == "" || value.resultDate == "undefined") {
                    } else {
                        $("#rfDate").val(value.resultDate);
                    }
                }

                if (value.name == "ANTI-CCP") {
                    if (value.flag == "NA") {
                        editFlag = "true";
                        $('#anticcpFlagNa').attr('checked', true);
                        $('#anticcpFlagNaLabel').addClass("active");
                    } else if (value.flag == "-") {
                        editFlag = "true";
                        $('#anticcpFlagNegative').attr('checked', true);
                        $('#anticcpFlagNegativeLabel').addClass("active");
                    } else if (value.flag == "+") {
                        editFlag = "true";
                        $('#anticcpFlagPositive').attr('checked', true);
                        $('#anticcpFlagPositiveLabel').addClass("active");
                    }

                    if (value.value != "") {
                        $("#anticcpValue").val(value.value);
                        editFlag = "true";
                    }

                    if (value.resultDate == "" || value.resultDate == "undefined") {
                    } else {
                        $("#anticcpDate").val(value.resultDate);
                    }
                }

                if (value.name == "VECTRA-DA") {
                    if (value.flag == "Low") {
                        editFlag = "true";
                        $('#vectradaFlagNa').attr('checked', true);
                        $('#vectradaFlagNaLabel').addClass("active");
                    } else if (value.flag == "Med") {
                        editFlag = "true";
                        $('#vectradaFlagNegative').attr('checked', true);
                        $('#vectradaFlagNegativeLabel').addClass("active");
                    } else if (value.flag == "High") {
                        editFlag = "true";
                        $('#vectradaFlagPositive').attr('checked', true);
                        $('#vectradaFlagPositiveLabel').addClass("active");
                    }

                    if (value.value != "") {
                        $("#vectradaValue").val(value.value);
                        editFlag = "true";
                    }

                    if (value.resultDate == "" || value.resultDate == "undefined") {
                    } else {
                        $("#vectradaDate").val(value.resultDate);
                    }
                }
            });
            if (editFlag == "true") {
                $("#labsSubmitButton").hide();
                disableLabFields();
                $("#labsDivId").append("<center><button id='labsEditButton' class='btn btn-success' onclick='editLabsData()'><b>Edit</b></button></center>");
            }
        }
    });
}//for labs onload data function end

//for labs date on blur start
function labsDate_blur() {
    var labsdate = $('#labsDate').val();
    if (validateDate(labsdate) != true) {
        return false;
    }
    $("#afterLabsUpdateMsg").text("");
    $("#beforeLabsUpdateMsg").text("");
    document.getElementById("esrDate").value = labsdate;
    document.getElementById("crpDate").value = labsdate;
    document.getElementById("rfDate").value = labsdate;
    document.getElementById("anticcpDate").value = labsdate;
}//for labs date on blur end


function callEsrValidation() {
    //esr value
    if ($("#esrValue").val() == "") {
        $("#esrValue").focus();
        displaySmallErrorMessages("esrValueMsg", "Enter lab value.");
        return false;
    } else if ($("#esrValue").val() != "") {
        $("#esrValueMsg").text("");
        if (isNaN($("#esrValue").val())) {
            displaySmallErrorMessages("esrValueMsg", "Enter number.");
            return false;
        } else if (($("#esrValue").val().indexOf('.') != -1) && ($("#esrValue").val().substring($("#esrValue").val().indexOf('.')).length > 3)) {
            displaySmallErrorMessages("esrValueMsg", "Enter only two digits after decimal.");
            return false;
        } else if ($("#esrValue").val() < 0 || $("#esrValue").val() > 150) {
            $("#esrValue").focus();
            displaySmallErrorMessages("esrValueMsg", "Invalid range.");
            return false;
        } else {
            $("#esrValueMsg").text("");
        }
    }

    //esr date
    if ($("#esrDate").val() == "") {
        displaySmallErrorMessages("esrDateMsg", "Enter date.");
        addSomeClass("esrDateError", "has-error");
        return false;
    } else if ($("#esrDate").val() != "") {
        removeSomeClass("esrDateError", "has-error");
        $("#esrDateMsg").text("");
        if (validateDate($("#esrDate").val()) != true) {
            displaySmallErrorMessages("esrDateMsg", "Enter valid date.");
            addSomeClass("esrDateError", "has-error");
            return false;
        }
        if (checkFutureDate($("#esrDate").val()) != true) {
            displaySmallErrorMessages("esrDateMsg", "Future date not allowed.");
            addSomeClass("esrDateError", "has-error");
            return false;
        } else if (checkFutureDate($("#esrDate").val()) == true) {
            removeSomeClass("esrDateError", "has-error");
            $("#esrDateMsg").text("");
        }
    }
    return true;
}

function callCrpValidation() {
    //crp value
    if ($("#crpValue").val() == "") {
        $("#crpValue").focus();
        displaySmallErrorMessages("crpValueMsg", "Enter lab value.");
        return false;
    } else if ($("#crpValue").val() != "") {
        $("#crpValueMsg").text("");
        if (isNaN($("#crpValue").val())) {
            displaySmallErrorMessages("crpValueMsg", "Enter number.");
            return false;
        } else if (($("#crpValue").val().indexOf('.') != -1) && ($("#crpValue").val().substring($("#crpValue").val().indexOf('.')).length > 3)) {
            displaySmallErrorMessages("crpValueMsg", "Enter only two digits after decimal.");
            return false;
        } else if ($("#crpValue").val() < 0 || $("#crpValue").val() > 150) {
            displaySmallErrorMessages("crpValueMsg", "Invalid range.");
            return false;
        } else {
            $("#crpValueMsg").text("");
        }
    }

    //crp date
    if ($("#crpDate").val() == "") {
        displaySmallErrorMessages("crpDateMsg", "Enter date.");
        addSomeClass("crpDateError", "has-error");
        return false;
    } else if ($("#crpDate").val() != "") {
        removeSomeClass("crpDateError", "has-error");
        $("#crpDateMsg").text("");
        if (validateDate($("#crpDate").val()) != true) {
            displaySmallErrorMessages("crpDateMsg", "Enter valid date.");
            addSomeClass("crpDateError", "has-error");
            return false;
        }
        if (checkFutureDate($("#crpDate").val()) != true) {
            displaySmallErrorMessages("crpDateMsg", "Future date not allowed.");
            addSomeClass("crpDateError", "has-error");
            return false;
        } else if (checkFutureDate($("#crpDate").val()) == true) {
            removeSomeClass("crpDateError", "has-error");
            $("#crpDateMsg").text("");
        }
    }
    return true;
}

function callRfValidation() {
    //rf value
    if ($("#rfValue").val() == "") {
        $("#rfValue").focus();
        displaySmallErrorMessages("rfValueMsg", "Enter lab value.");
        return false;
    } else if ($("#rfValue").val() != "") {
        $("#rfValueMsg").text("");
        if ($("#rfValue").val().match(allowNumbersCharacters())) {
            displaySmallErrorMessages("rfValueMsg", "No special characters allowed.");
            return false;
        } else if (!$("#rfValue").val().match(allowNumbersCharacters())) {
            $("#rfValueMsg").text("");
        }

        if (($("#rfValue").val().indexOf('.') != -1) && (isNaN($("#rfValue").val().substring($("#rfValue").val().indexOf('.'))))) {
            displaySmallErrorMessages("rfValueMsg", "Invalid input.");
            return false;
        } else if (($("#rfValue").val().indexOf('.') != -1) && ($("#rfValue").val().substring($("#rfValue").val().indexOf('.')).length > 3)) {
            displaySmallErrorMessages("rfValueMsg", "Enter only two digits after decimal.");
            return false;
        } else {
            $("#rfValueMsg").text("");
        }
    }

    //rf date
    if ($("#rfDate").val() == "") {
        displaySmallErrorMessages("rfDateMsg", "Enter date.");
        addSomeClass("rfDateError", "has-error");
        return false;
    } else if ($("#rfDate").val() != "") {
        removeSomeClass("rfDateError", "has-error");
        $("#rfDateMsg").text("");
        if (validateDate($("#rfDate").val()) != true) {
            displaySmallErrorMessages("rfDateMsg", "Enter valid date.");
            addSomeClass("rfDateError", "has-error");
            return false;
        }
        if (checkFutureDate($("#rfDate").val()) != true) {
            displaySmallErrorMessages("rfDateMsg", "Future date not allowed.");
            addSomeClass("rfDateError", "has-error");
            return false;
        } else if (checkFutureDate($("#rfDate").val()) == true) {
            removeSomeClass("rfDateError", "has-error");
            $("#rfDateMsg").text("");
        }
    }
    return true;
}


function callAnticcpValidation() {
    //anticcp value
    if ($("#anticcpValue").val() == "") {
        $("#anticcpValue").focus();
        displaySmallErrorMessages("anticcpValueMsg", "Enter lab value.");
        return false;
    } else if ($("#anticcpValue").val() != "") {
        $("#anticcpValueMsg").text("");
        if ($("#anticcpValue").val().match(allowNumbersCharacters())) {
            displaySmallErrorMessages("anticcpValueMsg", "No special characters allowed.");
            return false;
        } else if (!$("#anticcpValue").val().match(allowNumbersCharacters())) {
            $("#anticcpValueMsg").text("");
        }

        if (($("#anticcpValue").val().indexOf('.') != -1) && (isNaN($("#anticcpValue").val().substring($("#anticcpValue").val().indexOf('.'))))) {
            displaySmallErrorMessages("anticcpValueMsg", "Invalid input.");
            return false;
        } else if (($("#anticcpValue").val().indexOf('.') != -1) && ($("#anticcpValue").val().substring($("#anticcpValue").val().indexOf('.')).length > 3)) {
            displaySmallErrorMessages("anticcpValueMsg", "Enter only two digits after decimal.");
            return false;
        } else {
            $("#anticcpValueMsg").text("");
        }
    }

    //anticcp date
    if ($("#anticcpDate").val() == "") {
        displaySmallErrorMessages("anticcpDateMsg", "Enter date.");
        addSomeClass("anticcpDateError", "has-error");
        return false;
    } else if ($("#anticcpDate").val() != "") {
        removeSomeClass("anticcpDateError", "has-error");
        $("#anticcpDateMsg").text("");
        if (validateDate($("#anticcpDate").val()) != true) {
            displaySmallErrorMessages("anticcpDateMsg", "Enter valid date.");
            addSomeClass("anticcpDateError", "has-error");
            return false;
        }
        if (checkFutureDate($("#anticcpDate").val()) != true) {
            displaySmallErrorMessages("anticcpDateMsg", "Future date not allowed.");
            addSomeClass("anticcpDateError", "has-error");
            return false;
        } else if (checkFutureDate($("#anticcpDate").val()) == true) {
            removeSomeClass("anticcpDateError", "has-error");
            $("#anticcpDateMsg").text("");
        }
    }
    return true;
}

function callVectradaValidation() {
    //vectrada value
    if ($("#vectradaValue").val() == "") {
        $("#vectradaValue").focus();
        displaySmallErrorMessages("vectradaValueMsg", "Enter lab value.");
        return false;
    } else if ($("#vectradaValue").val() != "") {
        $("#vectradaValueMsg").text("");
        if (isNaN($("#vectradaValue").val())) {
            displaySmallErrorMessages("vectradaValueMsg", "Enter number.");
            return false;
        } else if (($("#vectradaValue").val().indexOf('.') != -1) && ($("#vectradaValue").val().substring($("#vectradaValue").val().indexOf('.')).length > 3)) {
            displaySmallErrorMessages("vectradaValueMsg", "Enter only two digits after decimal.");
            return false;
        } else {
            $("#vectradaValueMsg").text("");
        }
    }

    //vectrada date
    if ($("#vectradaDate").val() == "") {
        displaySmallErrorMessages("vectradaDateMsg", "Enter date.");
        addSomeClass("vectradaDateError", "has-error");
        return false;
    } else if ($("#vectradaDate").val() != "") {
        removeSomeClass("vectradaDateError", "has-error");
        $("#vectradaDateMsg").text("");
        if (validateDate($("#vectradaDate").val()) != true) {
            displaySmallErrorMessages("vectradaDateMsg", "Enter valid date.");
            addSomeClass("vectradaDateError", "has-error");
            return false;
        }
        if (checkFutureDate($("#vectradaDate").val()) != true) {
            displaySmallErrorMessages("vectradaDateMsg", "Future date not allowed.");
            addSomeClass("vectradaDateError", "has-error");
            return false;
        } else if (checkFutureDate($("#vectradaDate").val()) == true) {
            removeSomeClass("vectradaDateError", "has-error");
            $("#vectradaDateMsg").text("");
        }
    }
    return true;
}


//on submit calling function
function labValidations() {
    if (($('input[name=esrComparator]').is(":checked") == false &&
            $("#esrValue").val() == "" &&
            $("#esrDate").val() == "") &&
            ($('input[name=crpComparator]').is(":checked") == false &&
                    $("#crpValue").val() == "" &&
                    $("#crpDate").val() == "") &&
            ($('input[name=rfFlag]').is(":checked") == false &&
                    $("#rfValue").val() == "" &&
                    $("#rfDate").val() == "") &&
            ($('input[name=anticcpFlag]').is(":checked") == false &&
                    $("#anticcpValue").val() == "" &&
                    $("#anticcpDate").val() == "") &&
            ($('input[name=vectradaFlag]').is(":checked") == false &&
                    $("#vectradaValue").val() == "" &&
                    $("#vectradaDate").val() == "")) {
        $("#beforeLabsUpdateMsg").text("").append("<span class='largeErrorMsg'>Please enter any Lab.</span>");
        $("#afterLabsUpdateMsg").text("").append("<span class='largeErrorMsg'>Please enter any Lab.</span>");
        return false;
    }

    //for ESR start
    if ($('input:radio[name=esrComparator]').is(":checked") == true &&
            $("#esrValue").val() == "" &&
            $("#esrDate").val() == "") {
        callEsrValidation();
        return false;
    }

    if ($("#esrValue").val() != "" && $("#esrDate").val() == "") {
        callEsrValidation();
        return false;
    }

    if ($("#esrDate").val() != "" && $("#esrValue").val() == "") {
        callEsrValidation();
        return false;
    }

    if ($("#esrValue").val() != "" && $("#esrDate").val() != "") {
        if (callEsrValidation() == true) {
        } else {
            return false;
        }
    }
    //for ESR end

    //for CRP start
    if ($('input:radio[name=crpComparator]').is(":checked") == true &&
            $("#crpValue").val() == "" &&
            $("#crpDate").val() == "") {
        callCrpValidation();
        return false;
    }

    if ($("#crpValue").val() != "" && $("#crpDate").val() == "") {
        callCrpValidation();
        return false;
    }

    if ($("#crpDate").val() != "" && $("#crpValue").val() == "") {
        callCrpValidation();
        return false;
    }

    if ($("#crpValue").val() != "" && $("#crpDate").val() != "") {
        if (callCrpValidation() == true) {
        } else {
            return false;
        }
    }
    //for CRP end


    //for RF start
    if ($('input:radio[name=rfFlag]').is(":checked") == true && $("#rfDate").val() == "") {
        displaySmallErrorMessages("rfDateMsg", "Enter date.");
        addSomeClass("rfDateError", "has-error");
        return false;
    } else if ($("#rfDate").val() != "") {
        removeSomeClass("rfDateError", "has-error");
        $("#rfDateMsg").text("");
        if (validateDate($("#rfDate").val()) != true) {
            displaySmallErrorMessages("rfDateMsg", "Enter valid date.");
            addSomeClass("rfDateError", "has-error");
            return false;
        }
        if (checkFutureDate($("#rfDate").val()) != true) {
            displaySmallErrorMessages("rfDateMsg", "Future date not allowed.");
            addSomeClass("rfDateError", "has-error");
            return false;
        } else if (checkFutureDate($("#rfDate").val()) == true) {
            removeSomeClass("rfDateError", "has-error");
            $("#rfDateMsg").text("");
        }
    }

    if ($("#rfValue").val() != "" && $("#rfDate").val() == "") {
        callRfValidation();
        return false;
    }

    if ($("#rfDate").val() != "" && $("#rfValue").val() == "" && $('input:radio[name=rfFlag]').is(":checked") == false) {
        callRfValidation();
        return false;
    }

    if ($("#rfValue").val() != "" && $("#rfDate").val() != "" && $('input:radio[name=rfFlag]').is(":checked") == false) {
        if (callRfValidation() == true) {
        } else {
            return false;
        }
    }

    if ($("#rfValue").val() != "" && $("#rfDate").val() != "" && $('input:radio[name=rfFlag]').is(":checked") == true) {
        if (callRfValidation() == true) {
        } else {
            return false;
        }
    }
    //for RF end


    //for ANTI-CCP start
    if ($('input:radio[name=anticcpFlag]').is(":checked") == true && $("#anticcpDate").val() == "") {
        displaySmallErrorMessages("anticcpDateMsg", "Enter date.");
        addSomeClass("anticcpDateError", "has-error");
        return false;
    } else if ($("#anticcpDate").val() != "") {
        removeSomeClass("anticcpDateError", "has-error");
        $("#anticcpDateMsg").text("");
        if (validateDate($("#anticcpDate").val()) != true) {
            displaySmallErrorMessages("anticcpDateMsg", "Enter valid date.");
            addSomeClass("anticcpDateError", "has-error");
            return false;
        }
        if (checkFutureDate($("#anticcpDate").val()) != true) {
            displaySmallErrorMessages("anticcpDateMsg", "Future date not allowed.");
            addSomeClass("anticcpDateError", "has-error");
            return false;
        } else if (checkFutureDate($("#anticcpDate").val()) == true) {
            removeSomeClass("anticcpDateError", "has-error");
            $("#anticcpDateMsg").text("");
        }
    }

    if ($("#anticcpValue").val() != "" && $("#anticcpDate").val() == "") {
        callAnticcpValidation();
        return false;
    }

    if ($("#anticcpDate").val() != "" && $("#anticcpValue").val() == "" && $('input:radio[name=anticcpFlag]').is(":checked") == false) {
        callAnticcpValidation();
        return false;
    }

    if ($("#anticcpValue").val() != "" && $("#anticcpDate").val() != "" && $('input:radio[name=anticcpFlag]').is(":checked") == false) {
        if (callAnticcpValidation() == true) {
        } else {
            return false;
        }
    }

    if ($("#anticcpValue").val() != "" && $("#anticcpDate").val() != "" && $('input:radio[name=anticcpFlag]').is(":checked") == true) {
        if (callAnticcpValidation() == true) {
        } else {
            return false;
        }
    }
    //for ANTI-CCP end


    //for VECTRA-DA start
    if ($('input:radio[name=vectradaFlag]').is(":checked") == true && $("#vectradaDate").val() == "") {
        displaySmallErrorMessages("vectradaDateMsg", "Enter date.");
        addSomeClass("vectradaDateError", "has-error");
        return false;
    } else if ($("#vectradaDate").val() != "") {
        removeSomeClass("vectradaDateError", "has-error");
        $("#vectradaDateMsg").text("");
        if (validateDate($("#vectradaDate").val()) != true) {
            displaySmallErrorMessages("vectradaDateMsg", "Enter valid date.");
            addSomeClass("vectradaDateError", "has-error");
            return false;
        }
        if (checkFutureDate($("#vectradaDate").val()) != true) {
            displaySmallErrorMessages("vectradaDateMsg", "Future date not allowed.");
            addSomeClass("vectradaDateError", "has-error");
            return false;
        } else if (checkFutureDate($("#vectradaDate").val()) == true) {
            removeSomeClass("vectradaDateError", "has-error");
            $("#vectradaDateMsg").text("");
        }
    }

    if ($("#vectradaValue").val() != "" && $("#vectradaDate").val() == "") {
        callVectradaValidation();
        return false;
    }

    if ($("#vectradaDate").val() != "" && $("#vectradaValue").val() == "" && $('input:radio[name=vectradaFlag]').is(":checked") == false) {
        callVectradaValidation();
        return false;
    }

    if ($("#vectradaValue").val() != "" && $("#vectradaDate").val() != "" && $('input:radio[name=vectradaFlag]').is(":checked") == false) {
        if (callVectradaValidation() == true) {
        } else {
            return false;
        }
    }

    if ($("#vectradaValue").val() != "" && $("#vectradaDate").val() != "" && $('input:radio[name=vectradaFlag]').is(":checked") == true) {
        if (callVectradaValidation() == true) {
        } else {
            return false;
        }
    }
    //for VECTRA-DA end

    labsSubmitData();
}

function labsSubmitData() {
    labKeyUp();
    $("#labsUpdateButton").remove();
    $("#labsEditButton").remove();

    if (getUserSessionElement("reviseFlag") == "yes") {
        $.get(server_base_url + "/irheum-server/ReviseLabs", {
            encounterid: $("#encid").val()
        }).done(function(data) {
            if (data == invalidSession) {
                callSessionTimeout();
                return false;
            } else if (data == success || data == fail) {
                sessionStorage.removeItem("reviseFlag");
                callLabsSubmit();
            }
        });
    } else {
        callLabsSubmit();
    }
}

//for labs onclick submit data function start
function callLabsSubmit() {
    var esrComparator = "";
    if ($('input:radio[name=esrComparator]').is(":checked") == true) {
        esrComparator = "\"comparator\":\"" + $('input[name=esrComparator]:checked').val() + "\",";
    }
    var esrList = "{\"name\":\"ESR\",\"unit\":\"" + $("#esrUnit").val() + "\",\"value\":\"" + $("#esrValue").val() + "\"," + esrComparator + "\"resultDate\":\"" + $("#esrDate").val() + "\"}";

    var crpComparator = "";
    if ($('input:radio[name=crpComparator]').is(":checked") == true) {
        crpComparator = "\"comparator\":\"" + $('input[name=crpComparator]:checked').val() + "\",";
    }
    var crpList = "{\"name\":\"CRP\",\"unit\":\"" + $("#crpUnit").val() + "\",\"value\":\"" + $("#crpValue").val() + "\"," + crpComparator + "\"resultDate\":\"" + $("#crpDate").val() + "\"}";

    var rfFlag = "";
    if ($('input:radio[name=rfFlag]').is(":checked") == true) {
        rfFlag = "\"flag\":\"" + $('input[name=rfFlag]:checked').val() + "\",";
    }
    var rfList = "{\"name\":\"RF\",\"value\":\"" + $("#rfValue").val() + "\"," + rfFlag + "\"resultDate\":\"" + $("#rfDate").val() + "\"}";

    var anticcpFlag = "";
    if ($('input:radio[name=anticcpFlag]').is(":checked") == true) {
        anticcpFlag = "\"flag\":\"" + $('input[name=anticcpFlag]:checked').val() + "\",";
    }
    var anticcpList = "{\"name\":\"ANTI-CCP\",\"value\":\"" + $("#anticcpValue").val() + "\"," + anticcpFlag + "\"resultDate\":\"" + $("#anticcpDate").val() + "\"}";

    var vectradaFlag = "";
    if ($('input:radio[name=vectradaFlag]').is(":checked") == true) {
        vectradaFlag = "\"flag\":\"" + $('input[name=vectradaFlag]:checked').val() + "\",";
    }
    var vectradaList = "{\"name\":\"VECTRA-DA\",\"value\":\"" + $("#vectradaValue").val() + "\"," + vectradaFlag + "\"resultDate\":\"" + $("#vectradaDate").val() + "\"}";

    var labsObject = "[" + esrList + "," + crpList + "," + rfList + "," + anticcpList + "," + vectradaList + "]";
//    alert(labsObject);
    $.get(server_base_url + "/irheum-server/LabUpdate", {
        encounterid: $("#encid").val(), LabJSON: labsObject
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("beforeLabsUpdateMsg", failMessage);
            displayLargeErrorMessages("afterLabsUpdateMsg", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("beforeLabsUpdateMsg", unauthorizedMessage);
            displayLargeErrorMessages("afterLabsUpdateMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("beforeLabsUpdateMsg", statusExceptionMessage);
            displayLargeErrorMessages("afterLabsUpdateMsg", statusExceptionMessage);
        } else if (data == success) {
            getLeftSideMenusData();
            getLabAnalytics();
            $("#labsSubmitButton").hide();
            $("#labsCancelButton").hide();
            disableLabFields();
            displayLargeSuccessMessages("beforeLabsUpdateMsg", successMessage);
            displayLargeSuccessMessages("afterLabsUpdateMsg", successMessage);
            $("#labsDivId").append("<center><button id='labsEditButton' class='btn btn-success' onclick='editLabsData()'><b>Edit</b></button></center>");
        }
    });
}//for labs onclick submit data function end

function editLabsData() {
    enableLabFields();
    $("#labsDivId").append("<center><button id='labsUpdateButton' class='btn btn-primary' onclick='labValidations()'><b>Update</b></button><a href=javascript:showLabs() id='labsCancelButton' style='margin-left:30px;'>Cancel</a></center>");
}

function disableLabFields() {
    $("input[type='text']").attr('readonly', true);
    $("select").attr('disabled', true);
    $("label").attr('disabled', true);
    $("input").attr('disabled', true);
    jQuery('#esrValue').spinner("disable", true);
    jQuery('#crpValue').spinner("disable", true);
    jQuery('#rfValue').spinner("disable", true);
    jQuery('#anticcpValue').spinner("disable", true);
    jQuery('#vectradaValue').spinner("disable", true);
    $("#dropDownButton").attr('disabled', false);
}

function enableLabFields() {
    $("#beforeLabsUpdateMsg").text("");
    $("#afterLabsUpdateMsg").text("");
    $("#labsEditButton").remove();
    $("#labsUpdateButton").remove();
    $("#labsCancelButton").remove();
    $("input[type='text']").attr('readonly', false);
    $("select").attr('disabled', false);
    $("label").attr('disabled', false);
    $("input").attr('disabled', false);
    jQuery('#esrValue').spinner("enable", true);
    jQuery('#crpValue').spinner("enable", true);
    jQuery('#rfValue').spinner("enable", true);
    jQuery('#anticcpValue').spinner("enable", true);
    jQuery('#vectradaValue').spinner("enable", true);
}

function labKeyUp() {
    $("#afterLabsUpdateMsg").text("");
    $("#beforeLabsUpdateMsg").text("");

    //for esr
    $("#esrValueMsg").text("");
    $("#esrDateMsg").text("");
    removeSomeClass("esrDateError", "has-error");

    //for crp
    $("#crpValueMsg").text("");
    $("#crpDateMsg").text("");
    removeSomeClass("crpDateError", "has-error");

    //for rf
    $("#rfValueMsg").text("");
    $("#rfDateMsg").text("");
    removeSomeClass("rfDateError", "has-error");

    //for anticcp
    $("#anticcpValueMsg").text("");
    $("#anticcpDateMsg").text("");
    removeSomeClass("anticcpDateError", "has-error");

    //for vectrada
    $("#vectradaValueMsg").text("");
    $("#vectradaDateMsg").text("");
    removeSomeClass("vectradaDateError", "has-error");
}

//analytics for labs
function getLabAnalytics() {
    if (labAnalyticsFlag == "true") {
        $("#labFlowSheetDivId").remove();
        $("#labsDiv").append("<div id='labFlowSheetDivId' class = 'panel panel-primary-head' />");
        $("#labFlowSheetDivId").text("").append("<div class='panel-heading' style='height:50px;' id='labFlowSheetDivHeading' />");
        //heading start
        $("#labFlowSheetDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Previous Lab History</b><span style='font-size:13px;'><br />Please click on column header to sort.</span></h3></center>");
        $("#labFlowSheetDivId").append("<table id='labFlowSheetTable' class='table table-striped table-bordered'></table>");
        $("#labFlowSheetTable").text("").append("<thead class=''><tr><th>Result Date</th><th>ESR</th><th>CRP</th><th>RF</th><th>Anti-CCP</th><th>Vectra-DA</th></tr></thead>");
        $("#labFlowSheetTable").append("<tbody id='labFlowSheetTableBody' />");
        $("#labFlowSheetTableBody").text("");

//fetch all patient related previous labs
        $.post(server_base_url + "/irheum-server/PatientInformation", {
            patientid: $("#pid").val()
        }).done(function(data) {
            if (data == invalidSession) {
                callSessionTimeout();
            } else {
                var esrMCLabs = "";
                var crpMCLabs = "";
                var rfMCLabs = "";
                var anticcpMCLabs = "";
                var vectradaMCLabs = "";
                $.each(data, function(index, value) {
                    if (value.labs != undefined) {
                        var ldata = value.labs;

                        //creating table
                        for (var i = 0; i < ldata.length; i++) {
                            if (ldata[i].resultDate != "") {
                                var labsResultDate = ldata[i].resultDate.replace("/", "");
                                labsResultDate = labsResultDate.replace("/", "") + value.encno;
                                $("#" + labsResultDate).remove();
                                $("#labFlowSheetTableBody").append("<tr id='" + labsResultDate + "' />");
                                $("#" + labsResultDate).text("").append("<td>" + ldata[i].resultDate + "</td><td id='esr" + labsResultDate + "'>N/A</td><td id='crp" + labsResultDate + "'>N/A</td><td id='rf" + labsResultDate + "'>N/A</td><td id='anticcp" + labsResultDate + "'>N/A</td><td id='vectrada" + labsResultDate + "'>N/A</td>");
                            }
                        }

                        for (var i = 0; i < ldata.length; i++) {
                            if (ldata[i].name == "ESR" && ldata[i].name != undefined && ldata[i].name != "undefined") {
                                if (ldata[i].value != "" && ldata[i].resultDate != "") {
                                    esrMCLabs = esrMCLabs + "['" + ldata[i].resultDate + "'," + ldata[i].value + "],";

                                    var esrResultDate = ldata[i].resultDate.replace("/", "");
                                    esrResultDate = esrResultDate.replace("/", "") + value.encno;
                                    $("#esr" + esrResultDate).text("").append(ldata[i].value);
                                }
                            }//esr end

                            if (ldata[i].name == "CRP" && ldata[i].name != undefined && ldata[i].name != "undefined") {
                                if (ldata[i].value != "" && ldata[i].resultDate != "") {
                                    crpMCLabs = crpMCLabs + "['" + ldata[i].resultDate + "'," + ldata[i].value + "],";

                                    var crpResultDate = ldata[i].resultDate.replace("/", "");
                                    crpResultDate = crpResultDate.replace("/", "") + value.encno;
                                    $("#crp" + crpResultDate).text("").append(ldata[i].value);
                                }
                            }//crp end

                            if (ldata[i].name == "RF" && ldata[i].name != undefined && ldata[i].name != "undefined") {
                                if (ldata[i].value != "" && ldata[i].resultDate != "") {
                                    rfMCLabs = rfMCLabs + "['" + ldata[i].resultDate + "'," + ldata[i].value + "],";

                                    var rfResultDate = ldata[i].resultDate.replace("/", "");
                                    rfResultDate = rfResultDate.replace("/", "") + value.encno;
                                    $("#rf" + rfResultDate).text("").append(ldata[i].value);
                                }
                            }//rf end

                            if (ldata[i].name == "ANTI-CCP" && ldata[i].name != undefined && ldata[i].name != "undefined") {
                                if (ldata[i].value != "" && ldata[i].resultDate != "") {
                                    anticcpMCLabs = anticcpMCLabs + "['" + ldata[i].resultDate + "'," + ldata[i].value + "],";

                                    var anticcpResultDate = ldata[i].resultDate.replace("/", "");
                                    anticcpResultDate = anticcpResultDate.replace("/", "") + value.encno;
                                    $("#anticcp" + anticcpResultDate).text("").append(ldata[i].value);
                                }
                            }//anticcp end

                            if (ldata[i].name == "VECTRA-DA" && ldata[i].name != undefined && ldata[i].name != "undefined") {
                                if (ldata[i].value != "" && ldata[i].resultDate != "") {
                                    vectradaMCLabs = vectradaMCLabs + "['" + ldata[i].resultDate + "'," + ldata[i].value + "],";

                                    var vectradaResultDate = ldata[i].resultDate.replace("/", "");
                                    vectradaResultDate = vectradaResultDate.replace("/", "") + value.encno;
                                    $("#vectrada" + vectradaResultDate).text("").append(ldata[i].value);
                                }
                            }//vectrada end
                        }//for end
                    }
                });


                if (esrMCLabs != "") {
                    esrMCLabs = "[" + esrMCLabs.substring(0, esrMCLabs.length - 1) + "]";
                    esrMCLabs = eval(esrMCLabs);
                    prepareLabsTrend(esrMCLabs, "ESR", "#0000FF");
                }

                if (crpMCLabs != "") {
                    crpMCLabs = "[" + crpMCLabs.substring(0, crpMCLabs.length - 1) + "]";
                    crpMCLabs = eval(crpMCLabs);
                    prepareLabsTrend(crpMCLabs, "CRP", "#702963");
                }

                if (rfMCLabs != "") {
                    rfMCLabs = "[" + rfMCLabs.substring(0, rfMCLabs.length - 1) + "]";
                    rfMCLabs = eval(rfMCLabs);
                    prepareLabsTrend(rfMCLabs, "RF", "#FF8C00");
                }

                if (anticcpMCLabs != "") {
                    anticcpMCLabs = "[" + anticcpMCLabs.substring(0, anticcpMCLabs.length - 1) + "]";
                    anticcpMCLabs = eval(anticcpMCLabs);
                    prepareLabsTrend(anticcpMCLabs, "ANTI-CCP", "#9966CC");
                }

                if (vectradaMCLabs != "") {
                    vectradaMCLabs = "[" + vectradaMCLabs.substring(0, vectradaMCLabs.length - 1) + "]";
                    vectradaMCLabs = eval(vectradaMCLabs);
                    prepareLabsTrend(vectradaMCLabs, "VECTRA-DA", "#007FFF");
                }

                var shTable = jQuery('#labFlowSheetTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#labFlowSheetTable ul').addClass('pagination-active-dark');
                    },
                    responsive: false
                });

                jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                jQuery('div.dataTables_length select').css({width: '60px'});
                jQuery('div.dataTables_length select').select2({
                    minimumResultsForSearch: -1
                });
            }
        });

//    var esrData = [
//        ['04/12/2015', 3], ['06/18/2015', 2.3],
//        ['02/12/2015', 6], ['04/16/2015', 4.5],
//        ['02/12/2015', 6], ['04/16/2015', 4.5]
//    ];
//    prepareLabsTrend(esrData);
    }
}

//prepareLabsTrend(labData,typeDivId,)

function prepareLabsTrend(labData, typeDivId, trendColor) {
    $("#labsAnalytics" + typeDivId + "DivId").remove();
    if (labData.length > 0) { //Div for analytics
        $("#labsDiv").append("<div id='labsAnalytics" + typeDivId + "DivId' class='panel panel-success-alt' />");
        $("#labsAnalytics" + typeDivId + "DivId").text("").append("<div class='panel-heading' style='height:14px;'><center><h3 class='pt-label' style='margin-top:-7px;font-size:16px;'><b>" + typeDivId + " Trend</b></h3></center></div>");
        $("#labsAnalytics" + typeDivId + "DivId").append("<div class='panel-body' id='labAnalytics" + typeDivId + "Div' />");
        $("#labAnalytics" + typeDivId + "Div").text("").append("<div id='container" + typeDivId + "' style='width:100%;' /><div id='container" + typeDivId + "Table'/>");

//Creating table
//        $("#container" + typeDivId + "Table").text("").append("<br /><div class='table-responsive'><table id='analyticsDisplay" + typeDivId + "Table' class='table table-bordered table-success' style='margin-bottom:0px;'></table></div>");
//        $("#analyticsDisplay" + typeDivId + "Table").text("").append("<thead><tr><th>#</th><th>Result Date</th><th>" + typeDivId + " Value</th></tr></thead>");
//        $("#analyticsDisplay" + typeDivId + "Table").append("<tbody id='analyticsDisplay" + typeDivId + "Tr' />");
//        $("#analyticsDisplay" + typeDivId + "Tr").text("");
//        $.each(labData, function(index, value) {
//            $("#analyticsDisplay" + typeDivId + "Tr").append("<tr><td>" + (parseFloat(index) + 1) + "</td><td>" + value[0] + "</td><td>" + value[1] + "</td></tr>");
//        });

        var options = {chart: {renderTo: 'container' + typeDivId, type: 'line'
            },
            title: {text: '',
                style: {color: '#428bca', fontSize: '22px', fontWeight: 'bold', fontFamily: 'Verdana, sans-serif'
                }
            },
            subtitle: {text: '',
                style: {fontSize: '10px', fontWeight: 'bold'
                }
            },
            xAxis: {type: 'category',
                labels: {style: {fontSize: '13px', fontWeight: 'bold', fontFamily: 'Verdana, sans-serif',
                    }
                }
            },
            yAxis: {title: {text: 'Values',
                    style: {color: '#5cb85c', fontSize: '18px', fontWeight: 'bold'}
                }
            },
            tooltip: {pointFormat: '<span style="font-size:16px;font-weight:bold">{series.name} : {point.y}</span>',
            },
            legend: {enabled: false
            },
            series: [{
                    name: 'ESR',
                    data: labData,
                    color: trendColor,
                    dataLabels: {enabled: true, color: '#000', format: '{point.y}', y: 25,
                        style: {fontSize: '13px', fontWeight: 'bold', fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
        };
        var chart = new Highcharts.Chart(options);
    }
}

//for labs import from previous encounter start
function populatePreviousLabs() {
    if ($("#encno").val() != 1) {
        var encno = (parseInt($("#encno").val()) - 1);
        $.get(server_base_url + "/irheum-server/ResumeExamination", {
            patientid: $("#pid").val(), encno: encno
        }).done(function(data) {
            if (data == invalidSession) {
                callSessionTimeout();
            } else {
                labsToggleDoubleClick("esr");
                labsToggleDoubleClick("crp");
                labsToggleDoubleClick("rf");
                labsToggleDoubleClick("anticcp");
                labsToggleDoubleClick("vectrada");

                if (data.labs != "" && data.labs != undefined && data.labs != "undefined") {
                    $("#labsDate").val("");
                    $.each(data.labs, function(index, value) {
                        if (value.name == "ESR") {
                            if (value.unit != "") {
                                $("#esrUnit").val(value.unit);
                            }

                            if (value.value != "") {
                                $("#esrValue").val(value.value);
                            }

                            if (value.comparator == "NA") {
                                $('#esrComparatorNa').attr('checked', true);
                                $('#esrComparatorNaLabel').addClass("active");
                            } else if (value.comparator == "<") {
                                $('#esrComparatorLess').attr('checked', true);
                                $('#esrComparatorLessLabel').addClass("active");
                            } else if (value.comparator == ">") {
                                $('#esrComparatorGreater').attr('checked', true);
                                $('#esrComparatorGreaterLabel').addClass("active");
                            }
                            $("#esrDate").val("");
                        }

                        if (value.name == "CRP") {
                            if (value.unit != "") {
                                $("#crpUnit").val(value.unit);
                            }

                            if (value.value != "") {
                                $("#crpValue").val(value.value);
                            }

                            if (value.comparator == "NA") {
                                $('#crpComparatorNa').attr('checked', true);
                                $('#crpComparatorNaLabel').addClass("active");
                            } else if (value.comparator == "<") {
                                $('#crpComparatorLess').attr('checked', true);
                                $('#crpComparatorLessLabel').addClass("active");
                            } else if (value.comparator == ">") {
                                $('#crpComparatorGreater').attr('checked', true);
                                $('#crpComparatorGreaterLabel').addClass("active");
                            }
                            $("#crpDate").val("");
                        }

                        if (value.name == "RF") {
                            if (value.flag == "NA") {
                                $('#rfFlagNa').attr('checked', true);
                                $('#rfFlagNaLabel').addClass("active");
                            } else if (value.flag == "-") {
                                $('#rfFlagNegative').attr('checked', true);
                                $('#rfFlagNegativeLabel').addClass("active");
                            } else if (value.flag == "+") {
                                $('#rfFlagPositive').attr('checked', true);
                                $('#rfFlagPositiveLabel').addClass("active");
                            }

                            if (value.value != "") {
                                $("#rfValue").val(value.value);
                            }
                            $("#rfDate").val("");
                        }

                        if (value.name == "ANTI-CCP") {
                            if (value.flag == "NA") {
                                $('#anticcpFlagNa').attr('checked', true);
                                $('#anticcpFlagNaLabel').addClass("active");
                            } else if (value.flag == "-") {
                                $('#anticcpFlagNegative').attr('checked', true);
                                $('#anticcpFlagNegativeLabel').addClass("active");
                            } else if (value.flag == "+") {
                                $('#anticcpFlagPositive').attr('checked', true);
                                $('#anticcpFlagPositiveLabel').addClass("active");
                            }

                            if (value.value != "") {
                                $("#anticcpValue").val(value.value);
                            }
                            $("#anticcpDate").val("");
                        }

                        if (value.name == "VECTRA-DA") {
                            if (value.flag == "Low") {
                                $('#vectradaFlagNa').attr('checked', true);
                                $('#vectradaFlagNaLabel').addClass("active");
                            } else if (value.flag == "Med") {
                                $('#vectradaFlagNegative').attr('checked', true);
                                $('#vectradaFlagNegativeLabel').addClass("active");
                            } else if (value.flag == "High") {
                                $('#vectradaFlagPositive').attr('checked', true);
                                $('#vectradaFlagPositiveLabel').addClass("active");
                            }

                            if (value.value != "") {
                                $("#vectradaValue").val(value.value);
                            }
                            $("#vectradaDate").val("");
                        }
                    });
                }
            }
        });
    }
}//for labs import from previous encounter start