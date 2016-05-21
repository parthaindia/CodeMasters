//add hover to selected item in dashboard
function addHover(obj) {
    $("li").removeClass("active");
    $("#" + obj).addClass("active");
}




function prepareCommonPrivileges() {
    getProfileMenu(); //for profile
}
function prepareUserManagement() {
    getUserManagementMenu(); //for user registration
}
function preparePatientManagement() {
    getRegisterPatientMenu(); //for patient registration
    getSearchPatientMenu(); //for search patient  
}
function preparePhysicianPreference() {
    getPhysicianPreferenceMenu(); //for physician preferences
}

function getOrgPreferences() {
    sessionStorage.removeItem("insurance");
    sessionStorage.removeItem("allergy");
    sessionStorage.removeItem("priormeds");
    sessionStorage.removeItem("medication");

    $.get(server_base_url + "/irheum-server/FetchOrgPreferences", {
    }).done(function(data) {
        if (data == fail) {
        } else if (data == unauthorized) {
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
        } else {
            $.each(data, function(i, v) {
//                alert(i + "\t" + v.type + "\t" + v.selection + "\t" + v.category);
                if (v.type == "insurance" && v.category == "Functional Control") {
                    sessionStorage.removeItem("insurance");
                    sessionStorage.setItem("insurance", v.selection);
                }
                if (v.type == "allergy" && v.category == "Functional Control") {
                    sessionStorage.removeItem("allergy");
                    sessionStorage.setItem("allergy", v.selection);
                }
                if (v.type == "priormeds" && v.category == "Functional Control") {
                    sessionStorage.removeItem("priormeds");
                    sessionStorage.setItem("priormeds", v.selection);
                }
                if (v.type == "medication" && v.category == "Functional Control") {
                    sessionStorage.removeItem("medication");
                    sessionStorage.setItem("medication", v.selection);
                }
            });
        }
    });
}

//profile management start-------------------------------------------------------------------------------------------
function getProfileMenu() {
    if (checkUserPrivelege("ProfileView") == true || checkUserPrivelege("ProfileUpdate") == true || checkUserPrivelege("ChangePassword") == true) {
        $("#showProfileMenu").remove();
        $("#dropdownMenu").prepend("<li id='showProfileMenu'><a href='javascript:myProfile()'><i class='glyphicon glyphicon-user'></i> My Profile</a></li>");
    } else {
        $("#showProfileMenu").remove();
    }
}
//user management start-------------------------------------------------------------------------------------------
function getUserManagementMenu() {
    if (true) {
        $("#addUserMenu").remove();
        $("#dropdownMenu").prepend("<li id='addUserMenu'><a href='javascript:addNewUser();'><i class='glyphicon glyphicon-star' /><span>User Management</span></a></li>");
    } else {
        $("#addUserMenu").remove();
    }
}
//patient management start-------------------------------------------------------------------------------------------
function getRegisterPatientMenu() {
    if (true) {
        alert("hj")
        $("#addPatientMenu").remove();
        $("#activeList").append("<li id='addPatientMenu'><a href='javascript:addNewPatient();'><i class='glyphicon glyphicon-user'/><span>Add Patient</span></a></li>");
    } else {
        $("#addPatientMenu").remove();
    }
}
function getSearchPatientMenu() {
    if (true) {
        $("#searchDisplay").show();
    } else {
        $("#searchDisplay").remove();
    }
}
//physician preferences start-------------------------------------------------------------------------------------------
function getPhysicianPreferenceMenu() {
    if (checkUserPrivelege("PhysicianPreference") == true) {
        $("#showPreferencesMenu").remove();
        $("#dropdownMenu").prepend("<li id='showPreferencesMenu'><a href='javascript:addPhysicianPreference();'><i class='glyphicon glyphicon-cog'></i> Preferences</a></li>");
    } else {
        $("#showPreferencesMenu").remove();
    }
}