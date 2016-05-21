function twitterAccountForm() {
    $("#mainSettingTabMenuSubDiv").text("").append("<br/><br/><button id='twitterAccountFormId' class='btn btn' onclick='twitterAccountForm()' style='margin-left:5%;'><b>Twitter Account</b></button>\n\
<button id='facebookAccountFormId' class='btn btn' style='margin-left:3%;' onclick='facebookAccountForm()'><b>FaceBook Account</b></button>");
    $("#twitterAccountFormId").removeClass("btn btn").addClass("btn btn-success");
    $("#mainSettingTabMenuSubDiv").append("<div id='twitterAccountformId'  />");
    $("#twitterAccountformId").append("<br/><br/><div id='twitterAccountformsubId' class='form-control' style='width:70%;margin-left:4.7%;'/>");
    $("#twitterAccountformsubId").text("").append("<table id='twitterAccountAddTable' class='table' style='border:none;'/>");
    $("#twitterAccountAddTable").append("<tbody id='twitterAccountAddTableBody' />");
    $("#twitterAccountAddTableBody").append("<tr><td style='border:none;width:30%'>API Key *</td><td style='border:none;'><input type='text' class='form-control' placeholder='API Key' id='tw_apikey_account'></td></tr>");
    $("#twitterAccountAddTableBody").append("<tr><td style='border:none;width:30%'>API Secret *</td><td  style='border:none;'><input type='text' class='form-control' placeholder='API Secret' id='tw_apisecret_account'></td></tr>");
    $("#twitterAccountAddTableBody").append("<tr><td style='border:none;width:30%'>Access Token *</td><td  style='border:none;'><input type='text' class='form-control' placeholder='Access Token' id='tw_apitoken_account'></td></tr>");
    $("#twitterAccountAddTableBody").append("<tr><td style='border:none;width:30%'>Access Token Secret *</td><td style='border:none;'><input type='text' class='form-control' placeholder='Access Token Secret' id='tw_apitokensecret_account'></td></tr>");
    $("#twitterAccountformsubId").append("<div id='twaccMessagediv'><button class='btn btn-primary' id='twitterAccountAddAccountId' style='margin-left:32%;' onclick='twitterAccountAddFormSubmit()'>Add</button><span id='twaccountAddMessage' style='margin-left:2px;'></div>");
//    $("#twaccMessagediv").append("<br/><br/><span id='twaccountAddMessage' style='float:right;'></span>");
    fetchAllAccountTable();
}
function facebookAccountForm() {
    $("#mainSettingTabMenuSubDiv").text("").append("<br/><br/><button id='twitterAccountFormId' class='btn btn-success' onclick='twitterAccountForm()' style='margin-left:5%;'><b>Twitter Account</b></button>\n\
<button id='facebookAccountFormId' class='btn btn-success' style='margin-left:3%;' onclick='facebookAccountForm()'><b>FaceBook Account</b></button>");
    $("#twitterAccountFormId").removeClass("btn btn-success").addClass("btn btn");
    $("#facebookAccountFormId").removeClass("btn btn").addClass("btn btn-success");
    $("#mainSettingTabMenuSubDiv").append("<div id='facebookAccountformId'  />");
    $("#facebookAccountformId").append("<br/><br/><div id='facebookAccountformsubId' class='form-control' style='width:70%;margin-left:4.7%;'/>")
    $("#facebookAccountformsubId").append("<table id='facebookAccountAddTable' class='table' style='border:none;'/>");
    $("#facebookAccountAddTable").append("<tbody id='facebookAccountAddTableBody' />");
    $("#facebookAccountAddTableBody").append("<tr ><td style='border:none;width:30%'>App Id *</td><td style='border:none;'><input type='text' class='form-control' placeholder='App Id Key' id='fb_appkey_account'></td></tr>");
    $("#facebookAccountAddTableBody").append("<tr><td style='border:none;width:30%'>App Secret *</td><td  style='border:none;'><input type='text' class='form-control' placeholder='App Secret' id='fb_appsecret_account'></td></tr>");
    $("#facebookAccountAddTableBody").append("<tr><td style='border:none;width:30%'>Access Token *</td><td  style='border:none;'><input type='text' class='form-control' placeholder='Access Token' id='fb_apptoken_account'></td></tr>");
    $("#facebookAccountformsubId").append("<div id='fbaccMessagediv'><button class='btn btn-primary' id='facebookAccountAddAccountId' style='margin-left:32%;' onclick='facebookAccountAddFormSubmit()'>Add</button><span id='fbaccountAddMessage' style='margin-left:2px;'></div>");
//    $("#fbaccMessagediv").append("<br/><br/><span id='fbaccountAddMessage' style='float:right;'></span>");
    fetchAllAccountTable();
}

function twitterAccountAddFormSubmit() {

    var apikey = $("#tw_apikey_account").val();
    var apisecret = $("#tw_apisecret_account").val();
    var apitoken = $("#tw_apitoken_account").val();
    var apitokensecret = $("#tw_apitokensecret_account").val();
    var orgId = getUserSessionElement("OrgId");

    if (apikey == "" || apisecret == "" || apitoken == "" || apitokensecret == "") {
        $("#tw_apikey_account").focus();
        addSomeClass("twaccountAddMessage", "has-error");
        displaySmallErrorMessages("twaccountAddMessage", "Please enter all the fields.");
        setTimeout(function() {
            $("#twaccountAddMessage").text("");
        }, 5000);
        return false;
    }

    var accountJson = "{\"apikey\":\"" + apikey + "\",\"apisecret\":\"" + apisecret + "\",\"accesstoken\":\"" + apitoken + "\",\"accesstokensecret\":\"" + apitokensecret + "\",\"source\":\"" + 'twitter' + "\"}";
    $.get(server_base_url + "/AccountCreate", {
        accJson: accountJson,
        orgid: orgId
    }).done(function(data) {
        if (data == success) {
            displayLargeErrorMessages("twaccountAddMessage", "Successfully Added<br /><br />");
            twitterAccountForm();
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            addSomeClass("twaccountAddMessage", "has-error");
            displaySmallErrorMessages("twaccountAddMessage", "Fail to add.");
            setTimeout(function() {
                $("#twaccountAddMessage").text("");
            }, 5000);

        }
    });
}

function facebookAccountAddFormSubmit() {
    var apikey = $("#fb_appkey_account").val();
    var apisecret = $("#fb_appsecret_account").val();
    var apitoken = $("#fb_apptoken_account").val();
    if (apikey == "" || apisecret == "" || apitoken == "") {
        $("#fb_appkey_account").focus();
        addSomeClass("fbaccountAddMessage", "has-error");
        displaySmallErrorMessages("fbaccountAddMessage", "Please enter all the fields.");
        setTimeout(function() {
            $("#fbaccountAddMessage").text("");
        }, 5000);
        return false;
    }
    var orgId = getUserSessionElement("OrgId");
    var accountJson = "{\"apikey\":\"" + apikey + "\",\"apisecret\":\"" + apisecret + "\",\"accesstoken\":\"" + apitoken + "\",\"source\":\"" + 'facebook' + "\"}";
    $.get(server_base_url + "/AccountCreate", {
        accJson: accountJson,
        orgid: orgId
    }).done(function(data) {
        if (data == success) {
            displaySmallErrorMessages("fbaccountAddMessage", "Successfully added");
            facebookAccountForm();
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            addSomeClass("fbaccountAddMessage", "has-error");
            displaySmallErrorMessages("fbaccountAddMessage", "Fail to add.");
            setTimeout(function() {
                $("#fbaccountAddMessage").text("");
            }, 5000);
        }
    });
}


function fetchAllAccountTable() {
    $.get(server_base_url + "/AccountFetch", {
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
                $("#mainSettingTabMenuSubDiv").append("<br/><table id='facebookAccountdisplayTable' class='table table-striped table-bordered '/>");
                $("#facebookAccountdisplayTable").text("").append("<thead class=''><tr><th>Source</th><th>API Key</th><th>API Secret</th><th>Access Token</th><th>Access Token Secret</th></tr>");
                $("#facebookAccountdisplayTable").append("<tbody id='viewAccountDataTableBody'>");
                for (var i = 0; i < data.length; i++) {
                    if (data[i].source == "facebook") {
                        $("#viewAccountDataTableBody").append("<tr><td>" + data[i].source + "</td><td>" + data[i].apikey + "</td><td>" + data[i].apisecret + "</td><td>" + data[i].accesstoken + "</td><td>" + "" + "</td></tr>");
                    }
                    if (data[i].source == "twitter") {
                        $("#viewAccountDataTableBody").append("<tr><td>" + data[i].source + "</td><td>" + data[i].apikey + "</td><td>" + data[i].apisecret + "</td><td>" + data[i].accesstoken + "</td><td>" + data[i].accesstokensecret + "</td></tr>");
                    }
                }
//                var shTable = jQuery('#viewAccountDataTableBody').DataTable({
//                    "fnDrawCallback": function(oSettings) {
//                        jQuery('#viewAccountDataTableBody ul').addClass('pagination-active-dark');
//                    },
//                    responsive: false
//                });
//                jQuery('div.dataTables_length select').removeClass('form-control input-sm');
//                jQuery('div.dataTables_length select').css({width: '60px'});
//                jQuery('div.dataTables_length select').select2({
//                    minimumResultsForSearch: -1
//                });
            }
        }
    });
}