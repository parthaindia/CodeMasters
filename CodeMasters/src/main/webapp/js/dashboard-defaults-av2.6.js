//dashboard onload
function dashboardDefaults() {
    window.history.forward(-1);
    displayUserInfo();//displaying user related info in header
    prepareDashboard();


}//dashboard onload end

//user validation on dashboard
function userValidation() {
    var loginUser = getUserSessionElement("LoginJson");
    if (loginUser != "active" || loginUser == null || loginUser == "" || loginUser == undefined || loginUser == "undefined") {
        logout();
    }
}//user validation on dashboard end

//global comments
function addGlobalCommentInput(patientId) {
    if ($("#actualComment").val() == null || $("#actualComment").val().trim() == "") {
        displaySmallErrorMessages("commentStatus", "Enter the comments.");
        $("#actualComment").val("");
        return false;
    }
//    else if (true) {
//        var cflag = false;
//        if( /^[a-z]+$/.test($("#actualComment").val()) ||  /^[A-Z]+$/.test($("#actualComment").val())){
////        if ($("#actualComment").val().match(/^(?=.*[a-z])$/) || $("#actualComment").val().match(/^(?=.*[a-z])$/)) {
//            cflag = true;
//        }
//        if (!cflag) {
//            $("#commentStatus").text("").append("<span class='smallErrorMsg'>Comment should contain some characters.</span>");
//            $("#actualComment").val("");
//            return false;
//        }
//    }
    var commentsJson = "{\"comment\"=\"" + $("#actualComment").val() + "\"}";
    $.get(server_base_url + "/irheum-server/UpdateGlobalComments", {
        patientid: patientId,
        commentsJson: commentsJson
    }).done(function (data) {
        if (data == success) {
            $("#actualComment").val("");
            loadDefaultComments(patientId);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            displaySmallErrorMessages("commentStatus", "Fail to add comment.");
        }
    });
}
function loadDefaultComments(patientId) {
    $.get(server_base_url + "/irheum-server/FetchPatientComments", {
        patientid: patientId
    }).done(function (data) {
        if (data == "Empty Comments") {
            $("#commentListUlId").text("");
            $("#commentListUlId").prepend("<li class='media'><center><div class='media-body'><p style='font-size:16px;margin-bottom:8px;color:#999;'>No patient note history found.</p></div></center></li>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $("#commentListUlId").text("");
            $.each(data, function (index, value) {
                var date1 = value.createdDate / 1000;
                var d = new Date(0);
                d.setUTCSeconds(date1);
                var tempDate = new Date(d);
                var temp = (tempDate.getMonth() + 1) + "/" + tempDate.getDate() + "/" + tempDate.getFullYear() + "\t" + tempDate.getHours() + ":" + tempDate.getMinutes() + ":" + tempDate.getSeconds();
                d = temp;
                $("#commentListUlId").prepend("<li class='media'><div class='media-body'><p style='font-size:14px;margin-bottom:8px;color:#333;'>" + value.comment + "</p><small class='date'><strong style='color:#999'>by: " + value.commentBy + "</strong>&nbsp;&nbsp;<i class='fa fa-clock-o'> " + d + "</small></div></li>");
            });
            $("#patientCommentCountId").text("").append(data.length);
        }
    });
}

function clearCommentBox() {
    $("#commentStatus").text("");
}

function comments(patientId) {
//    alert(patientId);
    $("#globalCommentsDivId").text("").append("<button type='button' class='btn btn-dark dropdown-toggle'  data-toggle='dropdown' onclick=globalCommentsClear()>Patient Notes&nbsp;<span class='badge' id='patientCommentCountId'></span> </button>");//<i class='fa fa-plus'></i>
    $("#globalCommentsDivId").append("<div id='globalcommentsSubCommentsId' class='dropdown-menu pull-right'><a class='link-right'><button onclick=addGlobalCommentInput('" + patientId + "') class='btn btn-primary btn-xs'>Add Note</button></a><h5>Patient Notes</h5></div>");
    $("#globalcommentsSubCommentsId").append("<div id='textAreaBoxComments'><textarea style='width:100%;' rows=3 id='actualComment' placeholder='Add Note Here' onkeyup='clearCommentBox()'></textarea><span id='commentStatus'/></div>");
    $("#globalcommentsSubCommentsId").append("<center><div id='patientNotesHeaderId' style='color:#888;border-bottom:1px solid #ccc;background-color:#E4E7EA;'>Note History</div></center>");
    $("#globalcommentsSubCommentsId").append("<ul id='commentListUlId' class='media-list dropdown-list' style='overflow:scroll;height:200px;'></ul>");
    $("#globalcommentsSubCommentsId").click(function (e) {
        e.stopPropagation();
    });
    loadDefaultComments(patientId);
}

//to clear the error message of global comments
function globalCommentsClear() {
    $("#commentStatus").text("");
}

//displaying details in dashboard
function displayUserInfo() {
    var LoginId = getUserSessionElement("LoginId");
    var FullName = getUserSessionElement("FullName");
    var LastName = getUserSessionElement("LastName");

    $("#headerMainDiv").append("<div class='header-right' id='headerRightDiv' />");
    $("#headerRightDiv").append("<div id='pullRight' class='pull-right' />");
    $("#pullRight").append("<form class='form form-search' action=''><input type='search' class='form-control' placeholder='Search' >")
    $("#pullRight").prepend("<div id='globalCommentsDivId' class='btn-group btn-group-list btn-group-messages' />");

//for displaying loginid
    $("#pullRight").append("<div id='loginidDisplayDiv' class='btn-group btn-group-list btn-group-messages' />");
    $("#loginidDisplayDiv").append("<button type='button' class='btn btn-dark dropdown-toggle'><span id='currentUserId' class='glyphicon glyphicon-user' title='Current User' /></button>");

//for displaying dropdownmenu
    $("#pullRight").append("<div id='dropDownMenuDiv' class='btn-group btn-group-option' />");
    $("#dropDownMenuDiv").append("<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown'><i class='fa fa-caret-down' /></button>");
    $("#dropDownMenuDiv").append("<ul class='dropdown-menu pull-right' role='menu' id='dropdownMenu' />");

//    $("#dropdownMenu").append("<li><a href='javascript:addNewUser()'><i class='fa fa-user'></i>User Management</a></li>");
//    $("#dropdownMenu").append("<li><a href='javascript:myProfile();'><i class='glyphicon glyphicon-user'></i>My profile</a></li>");
//    $("#dropdownMenu").append("<li><a href='javascript:settings()'><i class='glyphicon glyphicon-cog'></i>Settings</a></li>");
    $("#dropdownMenu").append("<li class='divider' />");
    $("#dropdownMenu").append("<li><a href='javascript:logout()'><i class='glyphicon glyphicon-log-out'></i>Logout</a></li>");


//created left panel div for ul and li items start
//    $("#mainDashboardDiv").append("<div class='leftpanel' id='leftPanelDiv' />");
//    $("#leftPanelDiv").text("").append("<ul class='nav nav-pills nav-stacked' id='activeList2' />");
//    $("#activeList2").append("<li class='active'><a href='dashboard.jsp'><i class='glyphicon glyphicon-home'></i><span>Dashboard</span></a></li>");
//    $("#activeList").append("<li id='getreport'><a href='javascript:addNewPatient();'><i class='glyphicon glyphicon-user'/><span>Get Report</span></a></li>");
//    $("#activeList").append("<li id='dropdown1' class='parent' ><a><i class='fa fa-suitcase'/><span>Report Group</span></a></li>");
//    $("#dropdown1").append("<ul class='children' style='display: none;'id='ulid1'/>");
//    $("#ulid1").append("<li><a href=''>FCR-%</a></li>");
    $("#activeList2").append("<li id=''  ><a href=javascript:otherReports('db');><i class='glyphicon glyphicon-inbox'/><span>Dash Board report:</span></a></li>");
    $("#activeList2").append("<li id=''  ><a href=javascript:otherReports('aht');><i class='fa fa-edit'/><span>AHT Report</span></a></li>");
    $("#activeList2").append("<li id=''  ><a href=javascript:otherReports('pr');><i class='glyphicon glyphicon-file'/><span>Productivity report</span></a></li>");
    $("#activeList2").append("<li id=''  ><a href=javascript:otherReports('pen');><i class='fa fa-bitbucket'/><span>Pending Tickets</span></a></li>");
    $("#activeList2").append("<li id=''  ><a href=javascript:otherReports('csat');><i class='glyphicon glyphicon-qrcode'/><span>CSAT Survey:</span></a></li>");
    $("#activeList2").append("<li id=''  ><a href=javascript:otherReports('ad');><i class='glyphicon glyphicon-flag'/><span>AD/CM data discrepancy report</span></a></li>");
    $("#activeList2").append("<li id=''  ><a href=javascript:otherReports('top');><i class='glyphicon glyphicon-align-justify'/><span>Top 5 Incident</span></a></li>");
    $("#activeList2").append("<li id=''  ><a href=javascript:otherReports('inci');><i class='glyphicon glyphicon-folder-close'/><span>P1 Incident Report</span></a></li>");
    $("#activeList2").append("<li id=''  ><a href=javascript:otherReports('event');><i class='glyphicon glyphicon-gift'/><span>Event Management</span></a></li>");

//for user profile pic and display user name
    $("#leftPanelDiv").prepend("<div class='media profile-left' id='profilePicture' />");
    $("#profilePicture").text("").append("<a class='pull-left profile-thumb' href='#'><img class='img-circle profilePic' src='../images/currentUser.jpg'></a>");
    $("#profilePicture").append("<div class='media-body' id='nameDisplay' />");
    $("#nameDisplay").append("<h4 id='ufname-disp' style='text-transform: capitalize;' class='media-heading' title='User Full Name' /><small id='ulname-disp' class='text-muted' title='User Last Name' />");
    $("#ufname-disp").append(FullName); //to display username in dashboard left side
//    $("#ulname-disp").append(LastName);//to display username in dashboard left side
    $("#currentUserId").append(LoginId); //to display current loginid in dashboard right side   
    commondatePicker();
    SLMReport('fcr');
}

//preparing dashboard if priviliges is not available removing divs start
function prepareDashboard() {
//dashboard body div is created here
    $("#dashboard-body").remove();
    $("#mainPanelDiv").append("<div class='contentpanel' id='dashboard-body' />");
//    prepareCharts();

//
//    prepareCommonPrivileges();
//    prepareUserManagement();
//    preparePatientManagement();
//    preparePhysicianPreference();
//    getOrgPreferences();

}
function commondatePicker() {
    $("#mdbdid").append("<table id='DateAddTable' class='table' style='border:none;'/>");
    $("#DateAddTable").append("<tbody id='DateAddTableBody' />");
    $("#DateAddTableBody").append("<tr ><td id='tdid1'style='border:none;'></td><td id='tdid2'style='border:none;'></td><td id='tdid3'style='border:none;'></td><td id='tdid4'style='border:none;'></td></tr>");
    $("#tdid1").append("<div id='dobFieldGroup' class='form-group' />");
    $("#dobFieldGroup").append("<label class='col-sm-3 control-label'>Start Date</label>");
    $("#dobFieldGroup").append("<div id='FieldDiv' class='col-sm-9' />");
    $("#FieldDiv").append("<input type='text' id='preg_dob' class='form-control' placeholder='DD/MM/YYYY' onchange='patientreg_keypress(event)' size=10 maxlength=10 >");
    $("#FieldDiv").append("<span id='pregdob'></span>");
    jQuery("#preg_dob").mask("99/99/9999");
    jQuery("#preg_dob").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2020',
        maxDate: new Date,
        minDate: new Date(1900, 0, 1),
        dateFormat: dateformate
    });
    $("#tdid2").append("<div id='endFieldGroup' class='form-group' />");
    $("#endFieldGroup").append("<label class='col-sm-3 control-label'>End Date</label>");
    $("#endFieldGroup").append("<div id='endFieldDiv' class='col-sm-9' />");
    $("#endFieldDiv").append("<input type='text' id='preg_end' class='form-control' placeholder='DD/MM/YYYY' onchange='patientreg_keypress(event)' size=10 maxlength=10 >");
    $("#endFieldDiv").append("<span id='pregdob'></span>");
    jQuery("#preg_end").mask("99/99/9999");
    jQuery("#preg_end").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2020',
        maxDate: new Date,
        minDate: new Date(1900, 0, 1),
        dateFormat: dateformate
    });

}
function checkUserOrg(org) {
    var orgs = getUserSessionElement("user_selected_org");
    if (orgs.match(org)) {
        return true;
    } else {
        return false;
    }
}
function checkUserRole(role) {
    var roles = getUserSessionElement("RoleNames");
    if (roles.match(role)) {
        return true;
    } else {
        return false;
    }
}
function checkUserPrivelege(privilege) {
    var privileges = getUserSessionElement("Privileges");
    if (privileges.match(privilege)) {
        return true;
    } else {
        return false;
    }
}
function checkResumePin() {
    $.get(server_base_url + "/irheum-server/ResumePinFetch", {
    }).done(function (data) {
        if (data == "" || data == undefined || data == null) {
            getAlert();
        } else {
            $.each(data, function (i, v) {
                if (v.type == "resumePin") {
                    if (v.pin == null || v.pin == undefined || v.pin == "") {
                        getAlert();
                    }
                }
            });
        }
    });
}
function getAlert() {
    jQuery.gritter.add({
        title: 'You have not created PIN to unlock screens. Create resume PIN',
        class_name: 'growl-warning',
        sticky: false,
        time: '3000',
        before_open: function () {
            if ($('.gritter-item-wrapper').length == 1) {
                return false;
            }
        }
    });
}

function SLMReport(tag) {
    $("#dashboard-body").text("").append("<div id='addingSettings'/>");
//    $("#addingSettings").append("<div id='mainSettingTabMenu' class='col-md-6' style='width:100%;' />");
    $("#dashboard-body").text("").append("<div id='slmSubDiv' class='panel panel-primary' />");
    $("#slmSubDiv").text("").append("<div class='panel-heading' style='height:14px;'><center><h3 class='pt-label' id='divforheading' style='margin-top:-7px;font-size:16px;'><b></b></h3></center></div>");
    $("#slmSubDiv").append("<div class='panel-body' id='panelDivId' />");

//first table
//    $("#labsDivId").append("<center><span id='beforeLabsUpdateMsg' /></center><table id='labsTable' class='table table-striped table-bordered responsive dataTable no-footer dtr-inline' role='grid' />");
//    $("#labsTable").text("").append("<tr><td class='col-md-2'><b>Labs Date</b></td><td><div class='col-md-6' style='min-width:58.5%;max-width:100%;'><input type='text' id='labsDate' placeholder='MM/DD/YYYY' class='form-control col-sm-3' onchange='labsDate_blur()'></div></td></tr>");

    if (tag == "fcr") {
        $("#divforheading").text("").append("<b>SLMReport: FCR-%");
//        fcr();
    }
    if (tag == "calldata") {
        $("#divforheading").text("").append("<b>SLMReport: Call Data");
    }
    if (tag == "survey") {
        $("#divforheading").text("").append("<b>SLMReport: Survey Report");
    }
    if (tag == "percentage") {
        $("#divforheading").text("").append("<b>SLMReport: Percentage of ticket logged through portal");
    }
    if (tag == "incident") {
        $("#divforheading").text("").append("<b>SLMReport: P1 to P3 incident SLA");
    }
    if (tag == "service") {
        $("#divforheading").text("").append("<b>SLMReport: P1 to P3 Service request SLA");
    }
    if (tag == "dsat") {
        $("#divforheading").text("").append("<b>SLMReport: DSAT Report");
    }

    if (tag == "db") {
        $("#divforheading").text("").append("<b>Dash Board report");
    }
    if (tag == "aht") {
        $("#divforheading").text("").append("<b>AHT Report");
    }
    if (tag == "pr") {
        $("#divforheading").text("").append("<b>Productivity report");
    }
    if (tag == "pen") {
        $("#divforheading").text("").append("<b>Pending Tickets");
    }
    if (tag == "csat") {
        $("#divforheading").text("").append("<b>CSAT Survey");
    }
    if (tag == "ad") {
        $("#divforheading").text("").append("<b>AD/CM data discrepancy report ");
    }

    if (tag == "top") {
        $("#divforheading").text("").append("<b>Top 5 Incident");
    }
    if (tag == "inci") {
        $("#divforheading").text("").append("<b>P1 Incident Report");
    }
    if (tag == "event") {
        $("#divforheading").text("").append("<b>Event Management");
    }

    $('html,body').scrollTop(0);
}
function otherReports(tag) {
    SLMReport(tag);
}
function fcr() {
    $("#panelDivId").append("<div id='contpanelId' class='contentpanel'>");
    $("#contpanelId").append("<div id='rowid1' class='row'>");
    $("#rowid1").append("<div id='bargraph'class='col-md-8'>");
    $("#rowid1").append("<div id='bargraphsidebar' class='col-md-4'>");

    $("#bargraph").append("<div id='barpanelid' class='panel panel-default'>");
    $("#barpanelid").append("<div id='barpanelbodyid' class='panel-body'>");
    $("#barpanelbodyid").append("<div id='barpanelrow' class='row'>");

    $("#barpanelrow").append("<div id='barpanelcol1' class='col-md-7'>");
    $("#barpanelrow").append("<div id='barpanelcol2' class='col-md-5'>");

    $("#barpanelcol1").append("<h5 class='lg-title'>Network Performance</h5>");
    $("#barpanelcol1").append("<p class='mb15'>GRAHICAL MODULE...</p>");
    $("#barpanelcol1").append("<div id='bar-chart' ></div>");

    $("#barpanelrow").append("<div id='barpanelcol2' class='col-md-5'>");
    $("#barpanelcol2").append("<h5 class='lg-title'>Server Status</h5>");
    $("#barpanelcol2").append("<span class='sublabel'>CPU Usage (40.05 - 32 cpus)</span>");
    $("#barpanelcol2").append("<div class='progress progress-xs progress-metro' id='row1'>");
    $("#row1").append("<div class ='progress-bar progress-bar-primary' role ='progressbar' aria - valuenow ='40' aria - valuemin = '0' aria - valuemax= '100' style ='width: 40%' ></div>");


    $("#barpanelcol2").append("<span class='sublabel'>Memory Usage (32.2%)</span>");
    $("#barpanelcol2").append("<div class='progress progress-xs progress-metro' id='row2'>");
    $("#row2").append("<div class ='progress-bar progress-bar-primary' role ='progressbar' aria - valuenow ='40' aria - valuemin = '0' aria - valuemax= '100' style ='width: 32%' ></div>");








}

