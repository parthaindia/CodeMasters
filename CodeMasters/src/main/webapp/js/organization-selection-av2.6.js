function removeBeforeDashboardPopup() {
    $("#orgSelectionPopupDiv").text("");
    $("#beginExamCnfpopup").text("");
    $("#providerSelectionPopupDiv").text("");
}

function getOrganizationForm() {
    removeBeforeDashboardPopup();
    $("#mainDashboardDiv").append("<div id='orgSelectionPopupDiv' />");
    $("#orgSelectionPopupDiv").append("<div id='orgSelection' data-toggle='modal' data-target='.bs-example-modal-sm' />");
    $("#orgSelectionPopupDiv").append("<div id='popupInside' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' data-backdrop='static' data-keyboard='false' />");
    $("#popupInside").append("<div id='modalSm' class='modal-dialog modal-sm' />");
    $("#modalSm").append("<div id='modalContent' class='modal-content' />");
    $("#modalContent").append("<div class='modal-header' id='close_btn' />");
    $("#close_btn").append("<h4 class='modal-title'>Select Organization</h4>");
    $("#modalContent").append("<div class='modal-body' id='selectOrg' />");
    $("#selectOrg").append("<div id='popupButtonField' class='form-group' />");
    $("#popupButtonField").append("<select id='selOrg' name='selOrg' class='form-control' />");
    userSelectedOrg();
}

//user selected organization
function userSelectedOrg() {
    var user_selected_org = getUserSessionElement("user_selected_org");
    if (user_selected_org == null || user_selected_org == "" || user_selected_org == undefined || user_selected_org == "undefined") {
        orgSelection();
    } else {
        sessionStorage.setItem("fetchAnalytics", "true");
        $("#currentOrgId").text("").append(" " + user_selected_org);
    }
}

//for org selection start
function orgSelection() {
    var selected_org;
    var OrgNames = getUserSessionElement("OrgNames");
    var totalOrgs = OrgNames.split(",");
    if (totalOrgs.length > 1) {
        $("#orgSelection").click();
        var tempOrgs = OrgNames.split(",");
        for (var i = 0; i < tempOrgs.length; i++) {
            var finalOrgs = tempOrgs[i].trim();
            $("#selOrg").append("<option>" + finalOrgs + "</option>");
        }
        $("#select_org_btn_id").remove();
        $("#selectOrg").append("<center><input class='btn btn-primary mr5' type='button' id='select_org_btn_id' value='Select'></center>");
//select button click
        $('#select_org_btn_id').click(function() {
            selected_org = $("#selOrg").val();
            sessionStorage.setItem("user_selected_org", selected_org);
            $.get(server_base_url + "/irheum-server/SessionUpdate", {
                user_Org: selected_org
            }).done(function(data) {
                if (data == fail || data == unauthorized || data == statusException) {
                    logout();
                } else if (data == invalidSession) {
                    callSessionTimeout();
                } else {
                    sessionStorage.setItem("fetchAnalytics", "true");
                    setRolesAndPriveleges(data);
                    prepareDashboard();
                    $("#currentOrgId").text("").append(" " + selected_org);
                    $("#close_btn").append("<button aria-hidden='true' id='close_onlick_btn' data-dismiss='modal' class='close' type='button'></button>")
                    $("#close_onlick_btn").click();
                }
            }); //servlet end
        });
    } else {
        sessionStorage.setItem("fetchAnalytics", "true");
        $("#orgSelectionPopupDiv").removeClass("locked");
        var totalOrgs = OrgNames.split(",");
        prepareDashboard();
        sessionStorage.setItem("user_selected_org", totalOrgs);
        $("#currentOrgId").text("").append(" " + totalOrgs);
    }
}//for org selection end