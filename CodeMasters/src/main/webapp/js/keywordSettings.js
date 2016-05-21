function twitterKeywordForm() {
    $("#mainSettingTabMenuSub1Div").text("").append("<br/><br/><button id='twitterKeywordFormId' class='btn btn' onclick='twitterKeywordForm()' style='margin-left:5%;'><b>Twitter Keyword</b></button>\n\
<button id='facebookKeywordFormId' class='btn btn' style='margin-left:3%;' onclick='facebookKeywordForm()'><b>FaceBook Keyword</b></button>");
    $("#twitterKeywordFormId").removeClass("btn btn").addClass("btn btn-success");
    $("#mainSettingTabMenuSub1Div").append("<div id='twitterKeywordformId'  />");
    $("#twitterKeywordformId").append("<br/><br/><div id='twitterKeywordformsubId' class='form-control' style='width:70%;margin-left:4.7%;'/>")
    $("#twitterKeywordformsubId").text("").append("<table id='twitterKeywordAddTable' class='table' style='border:none;'/>");
    $("#twitterKeywordAddTable").append("<tbody id='twitterKeywordAddTableBody' />");
    $("#twitterKeywordAddTableBody").append("<tr ><td style='border:none;width:30%'>Keyword *</td><td style='border:none;'><input type='text' class='form-control' placeholder='Keyword' id='tw_keyword_keyword'></td></tr>");
    $("#twitterKeywordAddTableBody").append("<tr><td style='border:none;width:30%'>Status *</td><td  style='border:none;'><select class='form-control' id='tw_status_keyword'><option>active</option><option>inactive</option></td></tr>");
    $("#twitterKeywordformsubId").append("<div id='twKeysettingButtonsDiv'><button class='btn btn-primary' id='twitterKeywordAddKeywordId' style='margin-left:32%;' onclick='twitterKeywordAddFormSubmit()'>Add</button><span id='twKeywordAddMessage' style='margin-left:2px;'></span></div>");
    fetchAllKeywordsTable();
}

function facebookKeywordForm() {
    $("#mainSettingTabMenuSub1Div").text("").append("<br/><br/><button id='twitterKeywordFormId' class='btn btn-success' onclick='twitterKeywordForm()' style='margin-left:5%;'><b>Twitter Keyword</b></button>\n\
<button id='facebookKeywordFormId' class='btn btn-success' style='margin-left:3%;' onclick='facebookKeywordForm()'><b>FaceBook Keyword</b></button>");
    $("#twitterKeywordFormId").removeClass("btn btn-success").addClass("btn btn");
    $("#facebookKeywordFormId").removeClass("btn btn").addClass("btn btn-success");
    $("#mainSettingTabMenuSub1Div").append("<div id='facebookKeywordformId'  />");
    $("#facebookKeywordformId").append("<br/><br/><div id='facebookKeywordformsubId' class='form-control' style='width:70%;margin-left:4.7%;'/>")
    $("#facebookKeywordformsubId").append("<table id='facebookKeywordAddTable' class='table' style='border:none;'/>");
    $("#facebookKeywordAddTable").append("<tbody id='facebookKeywordAddTableBody' />");
    $("#facebookKeywordAddTableBody").append("<tr ><td style='border:none;width:30%'>Page Alias *</td><td style='border:none;'><input type='text' class='form-control' placeholder='Page Alias' id='fb_pagealias_keyword'></td></tr>");
    $("#facebookKeywordAddTableBody").append("<tr><td style='border:none;width:30%'>Keyword List *</td><td  style='border:none;'><input type='text' class='form-control' placeholder='Keyword List (Ex: accure,hadoop,bigdata,...)' id='fb_keywordlist_keyword'></td></tr>");
    $("#facebookKeywordAddTableBody").append("<tr><td style='border:none;width:30%'>Status *</td><td  style='border:none;'><select class='form-control' id='fb_status_keyword'><option>active</option><option>inactive</option></td></tr>");
    $("#facebookKeywordformsubId").append("<div id='fbKeysettingButtonsDiv'><button class='btn btn-primary' id='facebookKeywordAddKeywordId' style='margin-left:32%;' onclick='facebookKeywordAddFormSubmit()'>Add</button><span id='fbKeywordAddMessage' style='margin-left:2px;'></span></div>");
    fetchAllKeywordsTable();
}


function twitterKeywordAddFormSubmit() {
    var keyword = $("#tw_keyword_keyword").val();
    var status = $("#tw_status_keyword").val();
    var userId = getUserSessionElement("id");
//    var userId = "54c78fe8e4b0010403f610c5";
    var orgId = getUserSessionElement("OrgId");


    if (keyword == "" || status == "") {
        $("#tw_keyword_keyword").focus();
        addSomeClass("twKeywordAddMessage", "has-error");
        displaySmallErrorMessages("twKeywordAddMessage", "Please enter all the fields.");
        setTimeout(function() {
            $("#twKeywordAddMessage").text("");
        }, 5000);
        return false;
    }

    var keywordJson = "{\"status\":\"" + status + "\",\"source\":\"" + 'twitter' + "\",\"userid\":\"" + userId + "\",\"orgid\":\"" + orgId + "\",\"channel\":\"" + keyword + "\",\"keywords\":[" + keyword + "]}";
    $.get(server_base_url + "/KeywordCreate", {
        keywordJson: keywordJson
    }).done(function(data) {
        if (data == success) {
            twitterKeywordForm();
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            displaySmallErrorMessages("twKeywordAddMessage", "Fail to add comment.");
        }
    });
}

function facebookKeywordAddFormSubmit() {
    var keyword = $("#fb_keywordlist_keyword").val();
    var pagealias = $("#fb_pagealias_keyword").val();
    var status = $("#fb_status_keyword").val();
    var userId = getUserSessionElement("id");
//    var userId = "54c78fe8e4b0010403f610c5";
//    var orgId = "54c78fe8e4b0010403f610c4";
    var orgId = getUserSessionElement("OrgId");

    if (keyword == "" || status == "" || pagealias == "") {
        $("#fb_pagealias_keyword").focus();
        addSomeClass("fbKeywordAddMessage", "has-error");
        displaySmallErrorMessages("fbKeywordAddMessage", "Please enter all the fields.");
        setTimeout(function() {
            $("#fbKeywordAddMessage").text("");
        }, 5000);
        return false;
    }

    var keywordlist = keyword.split(",");
    for (var i = 0; i < keywordlist.length; i++) {
        if (keywordlist[i] == "") {
            $("#fb_keywordlist_keyword").focus();
            addSomeClass("fbKeywordAddMessage", "has-error");
            displaySmallErrorMessages("fbKeywordAddMessage", "Please Check the Input format");
            setTimeout(function() {
                $("#fbKeywordAddMessage").text("");
            }, 5000);
            return false;
        }
        else {
        }
    }

    var keywordJson = "{\"status\":\"" + status + "\",\"source\":\"" + 'facebook' + "\",\"userid\":\"" + userId + "\",\"orgid\":\"" + orgId + "\",\"alias\":\"" + pagealias + "\",\"channel\":\"" + pagealias + "\",\"keywords\":[" + keyword + "]}";
    $.get(server_base_url + "/KeywordCreate", {
        keywordJson: keywordJson
    }).done(function(data) {
        if (data == success) {
            twitterKeywordForm();
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            displaySmallErrorMessages("fbKeywordAddMessage", "Fail to add comment.");
        }
    });


}


function fetchAllKeywordsTable() {
    $.get(server_base_url + "/FetchAllKeywords", {
        orgid:  getUserSessionElement("OrgId")
        
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
                $("#mainSettingTabMenuSub1Div").append("<br/><table id='twitterKeyworddisplayTable' class='table table-striped table-bordered'/>");
                $("#twitterKeyworddisplayTable").text("").append("<thead class=''><tr><th>Keyword</th><th>Source</th><th>Status</th><th>Edit</th></tr>");
                $("#twitterKeyworddisplayTable").append("<tbody id='viewKeywordDataTableBody' />");
                $.each(data, function(index, value) {
                    $("#viewKeywordDataTableBody").append("<tr><td>" + value.keywords + "</td><td>" + value.source + "</td><td>" + value.status + "</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;cursor:pointer;' onclick=updateKeywordDetails('" + value._id.$oid + "','" + value.source + "')></span></td></tr>");
                });

                var shTable = jQuery('#twitterKeyworddisplayTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#twitterKeyworddisplayTable ul').addClass('pagination-active-dark');
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
function updateKeywordDetails(id, source) {
    $.get(server_base_url + "/FetchKeyword", {
        keyword_id: id
    }).done(function(data) {
        if (source == "twitter") {
            twitterKeywordForm();
            $("#tw_keyword_keyword").val(data.keywords);
            $("#tw_status_keyword").val(data.status);
            $("#twKeysettingButtonsDiv").text("").append("<button class='btn btn-primary' id='twitterKeywordAddKeywordId' style='margin-left:32%;' onclick=KeywordAddFormUpdate('" + id + "','" + data.source + "')>Update</button><button class='btn btn-primary' style='margin-left:1%;' onclick=twitterKeywordForm()>Cancel</button><span id='twKeywordAddMessage' style='margin-left:2px;'></span></div>");
        }
        if (source == "facebook") {
            facebookKeywordForm();
            $("#fb_keywordlist_keyword").val(data.keywords);
            $("#fb_pagealias_keyword").val(data.alias);
            $("#fb_status_keyword").val(data.status);
            $("#fbKeysettingButtonsDiv").text("").append("<button class='btn btn-primary' id='facebookKeywordAddKeywordId' style='margin-left:32%;' onclick=KeywordAddFormUpdate('" + id + "','" + data.source + "')>Update</button><button class='btn btn-primary' style='margin-left:1%;'onclick=facebookKeywordForm()>Cancel</button><span id='fbKeywordAddMessage' style='margin-left:2px;'></span></div>");
        }
    });
}

function KeywordAddFormUpdate(id, source) {
    var twkeyword = $("#tw_keyword_keyword").val();
    var twstatus = $("#tw_status_keyword").val();

    var fbkeyword = $("#fb_keywordlist_keyword").val();
    var fbpagealias = $("#fb_pagealias_keyword").val();
    var fbstatus = $("#fb_status_keyword").val();

    var userId = getUserSessionElement("id");
//    var userId = "54c78fe8e4b0010403f610c5";
//    var orgId = "54c78fe8e4b0010403f610c4";
    var orgId = getUserSessionElement("OrgId");
    var keywordJson = "";
    if (source == "twitter") {
        if (twkeyword == "" || twstatus == "") {
            $("#tw_keyword_keyword").focus();
            addSomeClass("twKeywordAddMessage", "has-error");
            displaySmallErrorMessages("twKeywordAddMessage", "Please enter all the fields.");
            setTimeout(function() {
                $("#twKeywordAddMessage").text("");
            }, 5000);
            return false;
        }
    } else if(source=="facebook"){
        if (fbkeyword == "" || fbpagealias == "" || fbstatus == "") {
            $("#fb_pagealias_keyword").focus();
            addSomeClass("fbKeywordAddMessage", "has-error");
            displaySmallErrorMessages("fbKeywordAddMessage", "Please enter all the fields.");
            setTimeout(function() {
                $("#fbKeywordAddMessage").text("");
            }, 5000);
            return false;
        }

        var keywordlist = fbkeyword.split(",");
        for (var i = 0; i < keywordlist.length; i++) {
            if (keywordlist[i] == "") {
                $("#fb_keywordlist_keyword").focus();
                addSomeClass("fbKeywordAddMessage", "has-error");
                displaySmallErrorMessages("fbKeywordAddMessage", "Please Check the Input format");
                setTimeout(function() {
                    $("#fbKeywordAddMessage").text("");
                }, 5000);
                return false;
            }
            else {
            }
        }
    }


    if (source == "twitter") {
        keywordJson = "{\"status\":\"" + twstatus + "\",\"source\":\"" + 'twitter' + "\",\"userid\":\"" + userId + "\",\"orgid\":\"" + orgId + "\",\"keywords\":[" + twkeyword + "],\"channel\":\"" + twkeyword + "\"}";
    }
    if (source == "facebook") {
        keywordJson = "{\"status\":\"" + fbstatus + "\",\"source\":\"" + 'facebook' + "\",\"userid\":\"" + userId + "\",\"orgid\":\"" + orgId + "\",\"alias\":\"" + fbpagealias + "\",\"keywords\":[" + fbkeyword + "],\"channel\":\"" + fbpagealias + "\"}";
    }
    $.get(server_base_url + "/KeywordUpdate", {
        keywordJson: keywordJson,
        keywordId: id
    }).done(function(data) {
        if (data == success) {
            twitterKeywordForm();
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            displaySmallErrorMessages("commentStatus", "Fail to add comment.");
        }
    });


}