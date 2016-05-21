function getUserSessionElement(element) {
    var elementResult = sessionStorage.getItem(element);
    return elementResult;
}


function displaySmallErrorMessages(divId, dispMessage) {
    $("#" + divId).text("").append("<span class='smallErrorMsg'>" + dispMessage + "</span>");
}

function displaySmallSuccessMessages(divId, dispMessage) {
    $("#" + divId).text("").append("<span class='smallSuccessMsg'>" + dispMessage + "</span>");
}

function displayLargeErrorMessages(divId, dispMessage) {
    $("#" + divId).text("").append("<span class='largeErrorMsg'>" + dispMessage + "</span>");
}

function displayLargeSuccessMessages(divId, dispMessage) {
    $("#" + divId).text("").append("<span class='largeSuccessMsg'>" + dispMessage + "</span>");
}

function addSomeClass(divId, className) {
    $("#" + divId).addClass(className);
}

function removeSomeClass(divId, className) {
    $("#" + divId).removeClass(className);
}