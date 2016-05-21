function fetchAllAutoReplyTable() {
    var replaytr = "";
    $.get(server_base_url + "/FetchAllKeywords", {
        orgid: getUserSessionElement("OrgId")
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
                $("#mainSettingTabMenuSub2Div").text("").append("<br/><table id='twitterAutoReplaydisplayTable' class='table table-striped table-bordered'/>");
                $("#twitterAutoReplaydisplayTable").text("").append("<thead class=''><tr><th>Keyword </th><th>Source </th><th>Channel </th><th>Replay text</th><th>Country </th><th>Status </th><th>Edit</th></tr>");
                $("#twitterAutoReplaydisplayTable").append("<tbody id='viewAutoReplayDataTableBody' />");
                $.each(data, function(index, value) {
                    $.each(value, function(i, v) {
                        replaytr = "<tr><td >" + value.keywords + "</td><td >" + value.source + "</td><td >" + value.channel + "</td><td >" + v.replytext + "</td><td >" + v.country + "</td><td >" + v.status + "</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;cursor:pointer;' onclick=updateAutoReplayDetails('" + value._id.$oid + "')></span></td></tr>";
                    });
                    $("#viewAutoReplayDataTableBody").append(replaytr);
                });
                var shTable = jQuery('#twitterAutoReplaydisplayTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#twitterAutoReplaydisplayTable ul').addClass('pagination-active-dark');
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
function updateAutoReplayDetails(keyId) {
    $.get(server_base_url + "/FetchKeyword", {
        keyword_id: keyId
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
            updateAutoReplyForm();
            $("#au_keyword_keyword").val(data.keywords);
            $("#au_source_keyword").val(data.source);
            $("#au_channel_keyword").val(data.channel);
            $.each(data, function(index, value) {
                $("#auto_replay_keyword").val(value.replytext);
                $("#selectAutoReplayCountry").select2('val', value.country);
                $("#au_status_keyword").val(value.status);
            });
            $("#auKeysettingButtonsDiv").text("").append("<button class='btn btn-primary' id='autoreplyKeywordUpdateKeywordId' style='margin-left:32%;' onclick=autoreplyKeywordAddFormSubmit('" + data._id.$oid + "')>Update</button><button class='btn btn-primary' style='margin-left:1%;'onclick=fetchAllAutoReplyTable()>Cancel</button><span id='autoreplysettingMessage' style='margin-left:2px;'></span></div>");
//            $("#auKeysettingButtonsDiv").append("<br/><br/><span id='autoreplysettingMessage' style='float:right;'></span>");
    }
    });
}


function updateAutoReplyForm() {
    $("#mainSettingTabMenuSub2Div").text("").append("<div id='autoReplayformId'  />");
    $("#autoReplayformId").append("<br/><br/><div id='autoReplayformsubId' class='form-control' style='width:70%;margin-left:4.7%;'/>")
    $("#autoReplayformsubId").text("").append("<table id='autoReplayAddTable' class='table' style='border:none;'/>");
    $("#autoReplayAddTable").append("<tbody id='autoReplayAddTableBody' />");
    $("#autoReplayAddTableBody").append("<tr ><td style='border:none;width:30%;'>Keyword *</td><td style='border:none;'><input type='text' class='form-control' placeholder='Keyword' id='au_keyword_keyword' readonly></td></tr>");
    $("#autoReplayAddTableBody").append("<tr ><td style='border:none;width:30%;'>Souce *</td><td style='border:none;'><input type='text' class='form-control' placeholder='Source' id='au_source_keyword' readonly></td></tr>");
    $("#autoReplayAddTableBody").append("<tr ><td style='border:none;width:30%;'>Channel *</td><td style='border:none;'><input type='text' class='form-control' placeholder='Channel' id='au_channel_keyword' readonly></td></tr>");
    $("#autoReplayAddTableBody").append("<tr><td style='border:none;width:30%;'>Replay Text *</td><td  style='border:none;'><textarea class='form-control' placeholder='replay text' id='auto_replay_keyword'/></td></tr>");
    $("#autoReplayAddTableBody").append("<tr><td style='border:none;width:30%;'>Select Country *</td><td  style='border:none;'><select id='selectAutoReplayCountry' placeholder='choose one...' multiple class='width100p'><option>India</option><option>USA</option><option>UK</option></select></td></tr>");
    jQuery("#select-basic, #selectAutoReplayCountry").select2();
    $("#autoReplayAddTableBody").append("<tr><td style='border:none;width:30%;'>Status *</td><td  style='border:none;'><select class='form-control' id='au_status_keyword' placeholder='choose one...'><option>active</option><option>inactive</option></select></td></tr>");
    $("#autoReplayformsubId").append("<div id='auKeysettingButtonsDiv'><button class='btn btn-primary' id='autoreplyKeywordUpdateKeywordId' style='margin-left:32%;' >Update</button></div>");
    
}

function autoreplyKeywordAddFormSubmit(keyid) {
    var replytext = $("#auto_replay_keyword").val();
    var country = $("#selectAutoReplayCountry").val();
    var status = $("#au_status_keyword").val();
    var replyJson = "";
    if (replytext == "" || country == "" || status == "" || status==null) {
        $("#auto_replay_keyword").focus();
        addSomeClass("autoreplysettingMessage", "has-error");
        displaySmallErrorMessages("autoreplysettingMessage", "Please enter all the fields.");
        setTimeout(function() {
            $("#autoreplysettingMessage").text("");
        }, 5000);
        return false;
    }
    replyJson = "{\"status\":\"" + status + "\",\"country\":[" + country + "],\"replytext\":\"" + replytext + "\"}";
    $.get(server_base_url + "/UpdateAutoReply", {
        replyJson: replyJson,
        keyword_id: keyid
    }).done(function(data) {
        if (data == success) {
            fetchAllAutoReplyTable();
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            displaySmallErrorMessages("autoreplysettingMessage", "Fail to add comment.");
        }
    });

}