function campaignSettingForm() {
    $("#mainSettingTabMenuSub3Div").text("").append("<div id='campaignSettingFormId'  />");
    $("#campaignSettingFormId").append("<br/><br/><div id='campaignSettingFormSubId' class='form-control' style='width:70%;margin-left:4.7%;'/>")
    $("#campaignSettingFormSubId").append("<table id='campaignSettingAddTable' class='table' style='border:none;'/>");
    $("#campaignSettingAddTable").append("<tbody id='campaignSettingAddTableBody' />");
    $("#campaignSettingAddTableBody").append("<tr ><td style='border:none;width:30%'>Campaign Name *</td><td style='border:none;'><input type='text' class='form-control' placeholder='Campaign Name' id='camp_cname'></td></tr>");
    $("#campaignSettingAddTableBody").append("<tr><td style='border:none;width:30%'>Campaign Text *</td><td style='border:none;'><textarea class='form-control' placeholder='Campaign Text' id='camp_ctext'/></td></tr>");
    $("#campaignSettingAddTableBody").append("<tr><td style='border:none;width:30%'>Select Keywords *</td><td  style='border:none;'><select id='selectCampaignKeywords' multiple class='width100p'/></td></tr>");
    jQuery("#select-basic, #selectCampaignKeywords").select2();
    fetchChannels();
    $("#campaignSettingAddTableBody").append("<tr><td style='border:none;width:30%'>Date *</td><td style='border:none;'><input type='text' class='form-control' placeholder='Start Date' id='campaignStartDate' style='display:inline;width:49%;max-width:100%;' /><input type='text' class='form-control' placeholder='End Date' id='campaignEndDate' style='display:inline;width:49%;max-width:100%;margin-left:2%;' /></td></tr>");
    jQuery("#campaignStartDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
//        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    });
    $("#campaignStartDate").mask("99/99/9999");
    jQuery("#campaignEndDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: datePickerRange,
//        maxDate: new Date,
        minDate: new Date(1900, 0, 1)
    });
    $("#campaignEndDate").mask("99/99/9999");

    $("#campaignSettingAddTableBody").append("<tr><td style='border:none;width:30%'>Time *</td><td style='border:none;'><input type='text' class='form-control' placeholder='Start Time' id='campaignStartTime' style='display:inline;width:49%;max-width:100%;' /><input type='text' class='form-control' placeholder='End Time' id='campaignEndTime' style='display:inline;width:49%;max-width:100%;margin-left:2%;' /></td></tr>");
    jQuery('#campaignStartTime').mask("99:99");
    jQuery('#campaignEndTime').mask("99:99");

    $("#campaignSettingAddTableBody").append("<tr><td style='border:none;width:30%'>Select Country *</td><td  style='border:none;'><select id='selectCampaignCountry' multiple class='width100p'><option>India</option><option>USA</option><option>UK</option></select></td></tr>");
    jQuery("#select-basic, #selectCampaignCountry").select2();

    $("#campaignSettingFormSubId").append("<div id='campaignSubmitId'><button class='btn btn-primary' id='campaignSettingAddCampaignId' style='margin-left:32%;' onclick='campaignSettingAddFormSubmit()'>Submit</button><span id='campaignAddMessage' style='margin-left:2px;'></span></div>");
//    $("#campaignSubmitId").append("<br/><br/><span id='campaignAddMessage' style='float:right;'></span>");
    fetchCampaign();
}

function campaignSettingAddFormSubmit() {
    var cname = $("#camp_cname").val();
    var ctext = $("#camp_ctext").val();
    var ckeywords = $("#selectCampaignKeywords").val();
    var csdate = $("#campaignStartDate").val();
    var cedate = $("#campaignEndDate").val();
    var cstime = $("#campaignStartTime").val();
    var cetime = $("#campaignEndTime").val();
    var ccountry = $("#selectCampaignCountry").val();
    var orgId = getUserSessionElement("OrgId");
    var userid = getUserSessionElement("id");
    var campaignJson = "";
    if (cname == "" || ctext == "" || ckeywords == "" || csdate == "" || cedate == "" || cstime == "" || cetime == "" || ccountry == "" || ckeywords == null || ccountry == null) {
        $("#camp_cname").focus();
        addSomeClass("campaignAddMessage", "has-error");
        displaySmallErrorMessages("campaignAddMessage", "Please enter all the fields.");
        setTimeout(function() {
            $("#campaignAddMessage").text("");
        }, 5000);
        return false;
    }
    campaignJson = "{\"campaignname\":\"" + cname + "\",\"campaigntext\":\"" + ctext + "\",\"channel\":[" + ckeywords + "],\"startdate\":\"" + csdate + "\",\"enddate\":\"" + cedate + "\",\"starttime\":\"" + cstime + "\",\"endtime\":\"" + cetime + "\",\"userid\":\"" + userid + "\",\"orgid\":\"" + orgId + "\",\"countrylist\":[" + ccountry + "]}";

    $.get(server_base_url + "/AddCampaign", {
        CampaignJson: campaignJson
    }).done(function(data) {
        if (data == success) {
            campaignSettingForm();
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            displaySmallErrorMessages("campaignAddMessage", "Fail to add comment.");
        }
    });
}

function fetchCampaign() {
    $.get(server_base_url + "/FetchCampaign", {
        OrgId: getUserSessionElement("OrgId")
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("userInsertionStatus", failMessage);
            displayLargeErrorMessages("userMessage", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("userInsertionStatus", unauthorizedMessage);
            displayLargeErrorMessages("userMessage", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            if (data == null) {
            } else {
                $("#mainSettingTabMenuSub3Div").append("<br/><table id='campaigndisplayTable' class='table table-striped table-bordered'/>");
                $("#campaigndisplayTable").text("").append("<thead class=''><tr><th>Name</th><th>Text</th><th>Keywords</th><th>Date</th></th><th>Time</th></th><th>Status</th><th>Countries *</th><th>Edit</th></tr>");
                $("#campaigndisplayTable").append("<tbody id='campaignDataTableBody' />");
                $.each(data, function(index, value) {
                    $("#campaignDataTableBody").append("<tr><td>" + value.campaignname + "</td><td>" + value.campaigntext + "</td><td>" + value.channel + "</td><td>" + value.startdate + " to " + value.enddate + "</td><td>" + value.starttime + " to " + value.endtime + "</td><td>" + value.status + "</td><td>" + value.countrylist + "</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;cursor:pointer;' onclick=fetchCampByidForm('" + value._id.$oid + "')></span></td></tr>");
                });
                var shTable = jQuery('#campaigndisplayTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#campaigndisplayTable ul').addClass('pagination-active-dark');
                    },
                    responsive: false
                });
                jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                jQuery('div.dataTables_length select').css({width: '60px'});
                jQuery('div.dataTables_length select').select2({
                    minimumResultsForSearch: -1
                });
            }
        }
    });
}

function fetchCampByidForm(campid) {
    campaignSettingForm();
    $.get(server_base_url + "/FetchCampaignById", {
        campId: campid
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
            $("#camp_cname").val(data[i].campaignname);
            $("#camp_ctext").val(data[i].campaigntext);
            if (data[i].channel != undefined && data[i].channel != "undefined") {
                $("#selectCampaignKeywords").select2('val', data[i].channel);
            }
            $("#campaignStartDate").val(data[i].startdate);
            $("#campaignEndDate").val(data[i].enddate);
            $("#campaignStartTime").val(data[i].starttime);
            $("#campaignEndTime").val(data[i].endtime);
            $("#selectCampaignCountry").select2('val', data[i].countrylist);
            $("#campaignSubmitId").text("").append("<button class='btn btn-primary' id='campaignSettingAddCampaignId' style='margin-left:32%;' onclick=updateCampaignById('" + data[i]._id.$oid + "')>Update</button><button class='btn btn-primary' style='margin-left:1%;'onclick=campaignSettingForm()>Cancel</button><span id='campaignAddMessage' style='margin-left:2px;'></span>");
//            $("#campaignSubmitId").append("<br/><br/><span id='campaignAddMessage' style='margin-left:2px;'></span>");
        }
    });
}


function updateCampaignById(campid) {
    var cname = $("#camp_cname").val();
    var ctext = $("#camp_ctext").val();
    var ckeywords = $("#selectCampaignKeywords").val();
    var csdate = $("#campaignStartDate").val();
    var cedate = $("#campaignEndDate").val();
    var cstime = $("#campaignStartTime").val();
    var cetime = $("#campaignEndTime").val();
    var ccountry = $("#selectCampaignCountry").val();
    var campaignJson = "";
    var orgId = getUserSessionElement("OrgId");
//    var userid = "54c78fe8e4b0010403f610c5";
    var userid = getUserSessionElement("id");
    if (cname == "" || ctext == "" || ckeywords == "" || csdate == "" || cedate == "" || cstime == "" || cetime == "" || ccountry == "" || ckeywords == null || ccountry == null) {
        $("#camp_cname").focus();
        addSomeClass("campaignAddMessage", "has-error");
        displaySmallErrorMessages("campaignAddMessage", "Please enter all the fields.");
        setTimeout(function() {
            $("#campaignAddMessage").text("");
        }, 5000);
        return false;
    }

    campaignJson = "{\"campaignname\":\"" + cname + "\",\"campaigntext\":\"" + ctext + "\",\"channel\":[" + ckeywords + "],\"startdate\":\"" + csdate + "\",\"enddate\":\"" + cedate + "\",\"starttime\":\"" + cstime + "\",\"endtime\":\"" + cetime + "\",\"userid\":\"" + userid + "\",\"orgid\":\"" + orgId + "\",\"countrylist\":[" + ccountry + "]}";
//    alert(campaignJson);
    $.get(server_base_url + "/UpdateCampaign", {
        CampaignJson: campaignJson,
        campId: campid
//        userid: "54c78fe8e4b0010403f610c5",
//        orgid : "54c78fe8e4b0010403f610c4"
    }).done(function(data) {
        if (data == success) {
            campaignSettingForm();
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            displaySmallErrorMessages("campaignAddMessage", "Fail to add comment.");
        }
    });
}

function fetchChannels() {
    var channels = "";
    $("#selectCampaignKeywords").text("");
    $.get(server_base_url + "/FetchAllKeywords", {
        orgid: getUserSessionElement("OrgId")
    }).done(function(data) {
        $.each(data, function(index, value) {
            channels = channels + "<option>" + value.channel + "</option>";
        });
        $("#selectCampaignKeywords").append(channels);
    });
}