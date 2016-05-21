function loadLoginPage() {
    sessionStorage.clear();
    var cookies = $.cookie();
    for (var cookie in cookies) {
        $.removeCookie(cookie);
    }
    $("#username_id").val("");
    $("#password_id").val("");
}

//credentials validation in login page
function login() {

                location.href = "dashboard.jsp";
            
       
    


}//function end

//login page keypress
function login_key(event) {
    if ($("#username_id").val() != "") {
        $("#usernameDiv").removeClass("has-error");
        $("#uperror").text("");
    }
    if ($("#password_id").val() != "") {
        $("#passwordDiv").removeClass("has-error");
        $("#uperror").text("");
    }
    if ($("#username_id").val() != "" && $("#password_id").val() != "") {
        $("#uperror").text("");
    }
    if (event.which == 13) {
        $('#login_btn').click();
        return false;
    }
}

//all user related information
function loginUserData(data) {
    var flag = "active";
    sessionStorage.setItem("LoginJson", flag);
    sessionStorage.setItem("FullName", data.fname);//for fname
    sessionStorage.setItem("LastName", data.lname);//for lname
    sessionStorage.setItem("LoginId", data.loginid);//for loginid

//for roles,orgs,priveleges start
    var orgNames = "";
    var privileges = "";
    var roleNames = "";
    var orgrole = data.orgRole;

    for (var m = 0; m < orgrole.length; m++) {
        var orgnames = orgrole[m];
        $.each(orgnames, function(index, value) {
            if (index == "role") {
                var data = value;
                $.each(data, function(index, value) {
                    var data = value;
                    $.each(data, function(index, value) {
                        if (index == "rolename") {
                            roleNames = roleNames + value + ",";
                        }
                        if (index == "privilege") {
                            var data1 = value;
                            $.each(data1, function(index, value) {
                                var data2 = value;
                                $.each(data2, function(index, value) {
                                    if (index == "name") {
                                        privileges = privileges + value + ",";
                                    }//for priveleges names end
                                });
                            });
                        }//for privelege end
                    });//for rolenames end
                });
            }//for role end
            if (index == "org") {
                var data = value;
                $.each(data, function(index, value) {
                    if (index == "orgname") {
                        orgNames = orgNames + value + ",";
                    }
                    if (index == "radamflag") {
                        sessionStorage.setItem("Questionere", value);
                    }
                });
            }//for orgnames end
        });
    }//for end
    orgNames = orgNames.substring(0, orgNames.length - 1);
    privileges = privileges.substring(0, privileges.length - 1);
    roleNames = roleNames.substring(0, roleNames.length - 1);
//for roles,orgs,priveleges end

//    alert(orgNames);
//    alert(privileges);
//    alert(roleNames);
    sessionStorage.setItem("OrgNames", orgNames);
    sessionStorage.setItem("Privileges", privileges);
    sessionStorage.setItem("RoleNames", roleNames);
    location.href = "dashboard.jsp";
}

//logout
function logout() {
//    $.get(server_base_url + "/irheum-server/Logout", {
//    }).done(function(data) {
    sessionStorage.clear();
    location.href = "index.jsp";
//    });
}

function callSessionTimeout() {
    sessionStorage.clear();
    location.href = "timeOut.jsp";
}

function closeSession() {
    window.history.forward(-1);
    sessionStorage.clear();
    setTimeout(function() {
        location.href = "index.jsp";
    }, 3000);
}

//removing all session elements
function removeSessionElements() {
    sessionStorage.removeItem("FullName");
    sessionStorage.removeItem("LastName");
    sessionStorage.removeItem("LoginId");
    sessionStorage.removeItem("OrgNames");
    sessionStorage.removeItem("user_selected_org");
    sessionStorage.removeItem("Privileges");
    sessionStorage.removeItem("RoleNames");
    sessionStorage.clear();
    location.href = "index.jsp";
}