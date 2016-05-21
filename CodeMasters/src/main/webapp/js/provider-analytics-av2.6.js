function getPatientDetails(patientId) {
    getPatientExamDemographicsData(patientId);
    editPatientButton(patientId);
}

function getAnalytics() {
    if (analyticsFlag == "true") {
        if (checkUserPrivelege("PhysicianPreference") == true) {
            $("#dashboard-body").text("").append("<div id='displayAnalyticsMainDiv' class='row row-stat' /><div id='displayPatientsListMainDiv' />");

            //fetching incomplete exams count
            $.get(server_base_url + "/irheum-server/FetchIncompleteCount", {
            }).done(function(data) {
                if (data == fail) {
                    displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
                } else if (data == unauthorized) {
                    displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
                } else if (data == invalidSession) {
                    callSessionTimeout();
                } else if (data == statusException) {
                    displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
                } else {
                    var incompleteExamsCount = data.response.numFound;
                    $.get(server_base_url + "/irheum-server/FetchMissingFeaturesCount", {
                        outcomeKey: "labs", outcomeValue: "no"
                    }).done(function(data) {
                        var completeExamsLabsCount = data.response.numFound;
                        $.get(server_base_url + "/irheum-server/FetchMissingFeaturesCount", {
                            outcomeKey: "patassessments", outcomeValue: "no"
                        }).done(function(data) {
                            var completeExamsPACount = data.response.numFound;
                            prepareIncompleteExam("Incomplete Exams", incompleteExamsCount, "Missing Labs", completeExamsLabsCount, "Missing Assessments", completeExamsPACount);
                        });
                    });
                }
            });

            //improving/worsening
            $.get(server_base_url + "/irheum-server/FetchPatientStatusCount", {
                outcomeKey: "sdaiStatus", outcomeValue: "improving"
            }).done(function(patientStatusCountData) {
                if (patientStatusCountData == fail) {
                    displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
                } else if (patientStatusCountData == unauthorized) {
                    displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
                } else if (patientStatusCountData == invalidSession) {
                    callSessionTimeout();
                } else if (patientStatusCountData == statusException) {
                    displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
                } else {
                    var improvingPatientsCount = patientStatusCountData.response.numFound;
                    $.get(server_base_url + "/irheum-server/FetchPatientStatusCount", {
                        outcomeKey: "sdaiStatus", outcomeValue: "worsening"
                    }).done(function(patientStatusCountData1) {
                        var worseningPatientsCount = patientStatusCountData1.response.numFound;
                        prepareImprovingWorseningGraph(improvingPatientsCount, worseningPatientsCount);
                    });
                }
            });

            //patients seen
            $.get(server_base_url + "/irheum-server/FetchPatientsSeenCount", {
                pastDate: "0"
            }).done(function(patientsCountData) {
                if (patientsCountData == fail) {
                    displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
                } else if (patientsCountData == unauthorized) {
                    displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
                } else if (patientsCountData == invalidSession) {
                    callSessionTimeout();
                } else if (patientsCountData == statusException) {
                    displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
                } else {
                    var patientsSeenTodayCount = patientsCountData.response.numFound;
                    $.get(server_base_url + "/irheum-server/FetchPatientsSeenCount", {
                        pastDate: "7"
                    }).done(function(patientsCountData) {
                        var patientsSeenWeekCount = patientsCountData.response.numFound;
                        $.get(server_base_url + "/irheum-server/FetchPatientsSeenCount", {
                            pastDate: "30"
                        }).done(function(patientsCountData) {
                            var patientsSeenMonthCount = patientsCountData.response.numFound;
                            preparePatientsSeen("Patients Seen Today", patientsSeenTodayCount, "Last Week", patientsSeenWeekCount, "Last Month", patientsSeenMonthCount);
                        });//patients seen last month
                    });//patients seen last week
                }
            });//patients seen today
            prepareIncompletePatientList();
            $("#dashboard-body").prepend("<a href='javascript:getAnalytics()' style='float:right;margin-right:10px;margin-top:-5px;'><span class='glyphicon glyphicon-refresh'></span>&nbsp;&nbsp;<b>Refresh</b></a><br />");
        }
    }
}

function showLoader() {
    $("#displayPatientsListMainDiv").text("").append("<center><br /><br /><img src='../images/loaders/loader10.gif'><br /><h3>Please wait while loading...</h3><br></center>");
}

function prepareIncompleteExam(incompleteExamsLabel, incompleteExamsCount, completeExamsLabsLabel, completeExamsLabsCount, completeExamsPALabel, completeExamsPACount) {
    $("#analyticsFirstBoxMainDiv").remove();
    $("#displayAnalyticsMainDiv").prepend("<div class='col-md-4' id='analyticsFirstBoxMainDiv' />");
    $("#analyticsFirstBoxMainDiv").text("").append("<div class='panel panel-primary noborder'><div id='analyticsFirstBoxBody' class='panel-heading noborder'></div></div>");
    $("#analyticsFirstBoxBody").text("").append("<div class='panel-icon'><i class='glyphicon glyphicon-stats' style='font-size:40px; padding: 10px 0 0 8px;color:black;'></i></div>");
    $("#analyticsFirstBoxBody").append("<div class='media-body'><h5 class='nomargin'><a href='javascript:prepareIncompletePatientList()' style='text-decoration:none;color:#fff;font-weight:bold;'>" + incompleteExamsLabel + "</a></h5><h1 class='mt5'><a href='javascript:prepareIncompletePatientList()' style='text-decoration:none;color:#fff;font-weight:bold;'>" + incompleteExamsCount + "</a></h1></div><hr>");
    $("#analyticsFirstBoxBody").append("<div class='clearfix mt10' id='analyticsFirstBoxFooter' />");
    $("#analyticsFirstBoxFooter").text("").append("<center><span style='color:#fff;font-weight:bold;'></span></center><br /><div class='pull-left'><h5 class='nomargin'><a href='javascript:prepareMissingLabsPatientList()' style='text-decoration:none;color:#fff;font-weight:bold;'>" + completeExamsLabsLabel + "</a></h5><h4 class='nomargin'><center><a href='javascript:prepareMissingLabsPatientList()' style='text-decoration:none;color:#fff;font-weight:bold;'>" + completeExamsLabsCount + "</a></h4></center></div>");
    $("#analyticsFirstBoxFooter").append("<div class='pull-right'><h5 class='nomargin'><a href='javascript:prepareMissingPAPatientList()' style='text-decoration:none;color:#fff;font-weight:bold;'>" + completeExamsPALabel + "</a></h5><h4 class='nomargin'><center><a href='javascript:prepareMissingPAPatientList()' style='text-decoration:none;color:#fff;font-weight:bold;'>" + completeExamsPACount + "</a></center></h4></div>");
}

function prepareIncompletePatientList() {
    $.get(server_base_url + "/irheum-server/FetchIncompleteCount", {
    }).done(function(solrData) {
        if (solrData == fail) {
            displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
        } else if (solrData == unauthorized) {
            displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
        } else if (solrData == invalidSession) {
            callSessionTimeout();
        } else if (solrData == statusException) {
            displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
        } else {
            showLoader();
            var solrOutput = solrData.response.docs;
            var incompleteExamPatientIds = new Array();

            $.each(solrOutput, function(index, value) {
                incompleteExamPatientIds[index] = value.patientid;
            });//solr data for each

            if (solrData.response.numFound > 0) {
                $.get(server_base_url + "/irheum-server/FetchPatientsDetailList", {
                    patientIdsList: incompleteExamPatientIds
                }).done(function(mongoData) {
                    if (mongoData == fail) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
                    } else if (mongoData == unauthorized) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
                    } else if (mongoData == invalidSession) {
                        callSessionTimeout();
                    } else if (mongoData == statusException) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
                    } else {
                        //display patients list
                        $("#displayPatientsListMainDiv").text("").append("<div id = 'displayPatientsSubDiv' class = 'panel panel-success-head' />");
                        $("#displayPatientsSubDiv").append("<div class='panel-heading' style='height:50px;' id='displayPatientsSubDivHeading' />");

                        //heading start
                        $("#displayPatientsSubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Incomplete Exams List</b><span style='font-size:13px;'><br />Please click on column header to sort.</span></h3></center>");
                        $("#displayPatientsSubDiv").append("<table id='displayPatientsTable' class='table table-striped table-bordered'>");
                        $("#displayPatientsTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i> Patient Name</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i> DOB</th><th style='min-width:15%;width:auto;'><i class='fa fa-mobile'></i> Phone</th><th style='min-width:15%;width:auto;'>Encounter Date</th></tr></thead>");
                        $("#displayPatientsTable").append("<tbody id='displayPatientsTableBody' />");

                        $.each(solrOutput, function(index, value) {
                            $.each(mongoData, function(i, v) {
                                if (v._id.$oid == value.patientid) {
                                    var phone = "N/A";
                                    if (v.address[0].phone != "") {
                                        phone = v.address[0].phone;
                                    }
                                    $("#displayPatientsTableBody").append("<tr id='" + value.id + "' style='cursor:pointer;' onclick=resumeExistingExam('" + value.patientid + "','" + value.encno + "','" + value.id + "')><td>" + v.fname + " " + v.mname + " " + v.lname + "</td><td>" + v.dob + "</td><td>" + phone + "</td><td>" + dateConversion(value.createdate) + "</td></tr>");
                                }
                            });//mongo data for each
                        });

                        var shTable = jQuery('#displayPatientsTable').DataTable({
                            "fnDrawCallback": function(oSettings) {
                                jQuery('#displayPatientsTable ul').addClass('pagination-active-dark');
                            },
                            responsive: false
                        });

                        jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                        jQuery('div.dataTables_length select').css({width: '60px'});
                        jQuery('div.dataTables_length select').select2({
                            minimumResultsForSearch: -1
                        });
                    }
                });//mongo data
            } else {
                $("#displayPatientsListMainDiv").text("").append(noDataAvailable);
            }
        }
    }); //solr data
}

function prepareMissingLabsPatientList() {
    $.get(server_base_url + "/irheum-server/FetchMissingFeaturesCount", {
        outcomeKey: "labs", outcomeValue: "no"
    }).done(function(solrData) {
        if (solrData == fail) {
            displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
        } else if (solrData == unauthorized) {
            displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
        } else if (solrData == invalidSession) {
            callSessionTimeout();
        } else if (solrData == statusException) {
            displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
        } else {
            showLoader();
            var solrOutput = solrData.response.docs;
            var missingLabsPatientIds = new Array();

            $.each(solrOutput, function(index, value) {
                missingLabsPatientIds[index] = value.patientid;
            });//solr data for each

            if (solrData.response.numFound > 0) {
                $.get(server_base_url + "/irheum-server/FetchPatientsDetailList", {
                    patientIdsList: missingLabsPatientIds
                }).done(function(mongoData) {
                    if (mongoData == fail) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
                    } else if (mongoData == unauthorized) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
                    } else if (mongoData == invalidSession) {
                        callSessionTimeout();
                    } else if (mongoData == statusException) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
                    } else {
                        //display patients list
                        $("#displayPatientsListMainDiv").text("").append("<div id = 'displayPatientsSubDiv' class = 'panel panel-primary-head' />");
                        $("#displayPatientsSubDiv").append("<div class='panel-heading' style='height:50px;' id='displayPatientsSubDivHeading' />");

                        //heading start
                        $("#displayPatientsSubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Missing Labs List</b><span style='font-size:13px;'><br />Please click on column header to sort.</span></h3></center>");
                        $("#displayPatientsSubDiv").append("<table id='displayPatientsTable' class='table table-striped table-bordered'>");
                        $("#displayPatientsTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i> Patient Name</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i> DOB</th><th style='min-width:15%;width:auto;'><i class='fa fa-mobile'></i> Phone</th><th style='min-width:15%;width:auto;'>Encounter Date</th></tr></thead>");
                        $("#displayPatientsTable").append("<tbody id='displayPatientsTableBody' />");

                        $.each(solrOutput, function(index, value) {
                            $.each(mongoData, function(i, v) {
                                if (v._id.$oid == value.patientid) {
                                    var phone = "N/A";
                                    if (v.address[0].phone != "") {
                                        phone = v.address[0].phone;
                                    }
                                    $("#displayPatientsTableBody").append("<tr id='" + value.id + "' style='cursor:pointer;' onclick=getPatientDetails('" + value.patientid + "')><td>" + v.fname + " " + v.mname + " " + v.lname + "</td><td>" + v.dob + "</td><td>" + phone + "</td><td>" + dateConversion(value.createdate) + "</td></tr>");
                                }
                            });//mongo data for each
                        });

                        var shTable = jQuery('#displayPatientsTable').DataTable({
                            "fnDrawCallback": function(oSettings) {
                                jQuery('#displayPatientsTable ul').addClass('pagination-active-dark');
                            },
                            responsive: false
                        });

                        jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                        jQuery('div.dataTables_length select').css({width: '60px'});
                        jQuery('div.dataTables_length select').select2({
                            minimumResultsForSearch: -1
                        });
                    }
                });//mongo data
            } else {
                $("#displayPatientsListMainDiv").text("");
            }
        }
    }); //solr data
}

function prepareMissingPAPatientList() {
    $.get(server_base_url + "/irheum-server/FetchMissingFeaturesCount", {
        outcomeKey: "patassessments", outcomeValue: "no"
    }).done(function(solrData) {
        if (solrData == fail) {
            displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
        } else if (solrData == unauthorized) {
            displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
        } else if (solrData == invalidSession) {
            callSessionTimeout();
        } else if (solrData == statusException) {
            displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
        } else {
            showLoader();
            var solrOutput = solrData.response.docs;
            var missingPAPatientIds = new Array();

            $.each(solrOutput, function(index, value) {
                missingPAPatientIds[index] = value.patientid;
            });//solr data for each

            if (solrData.response.numFound > 0) {
                $.get(server_base_url + "/irheum-server/FetchPatientsDetailList", {
                    patientIdsList: missingPAPatientIds
                }).done(function(mongoData) {
                    if (mongoData == fail) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
                    } else if (mongoData == unauthorized) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
                    } else if (mongoData == invalidSession) {
                        callSessionTimeout();
                    } else if (mongoData == statusException) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
                    } else {
                        //display patients list
                        $("#displayPatientsListMainDiv").text("").append("<div id = 'displayPatientsSubDiv' class = 'panel panel-warning-head' />");
                        $("#displayPatientsSubDiv").append("<div class='panel-heading' style='height:50px;' id='displayPatientsSubDivHeading' />");

                        //heading start
                        $("#displayPatientsSubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Missing Patient Assessments List</b><span style='font-size:13px;'><br />Please click on column header to sort.</span></h3></center>");
                        $("#displayPatientsSubDiv").append("<table id='displayPatientsTable' class='table table-striped table-bordered'>");
                        $("#displayPatientsTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i> Patient Name</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i> DOB</th><th style='min-width:15%;width:auto;'><i class='fa fa-mobile'></i> Phone</th><th style='min-width:15%;width:auto;'>Encounter Date</th></tr></thead>");
                        $("#displayPatientsTable").append("<tbody id='displayPatientsTableBody' />");

                        $.each(solrOutput, function(index, value) {
                            $.each(mongoData, function(i, v) {
                                if (v._id.$oid == value.patientid) {
                                    var phone = "N/A";
                                    if (v.address[0].phone != "") {
                                        phone = v.address[0].phone;
                                    }
                                    $("#displayPatientsTableBody").append("<tr id='" + value.id + "' style='cursor:pointer;' onclick=getPatientDetails('" + value.patientid + "')><td>" + v.fname + " " + v.mname + " " + v.lname + "</td><td>" + v.dob + "</td><td>" + phone + "</td><td>" + dateConversion(value.createdate) + "</td></tr>");
                                }
                            });//mongo data for each
                        });

                        var shTable = jQuery('#displayPatientsTable').DataTable({
                            "fnDrawCallback": function(oSettings) {
                                jQuery('#displayPatientsTable ul').addClass('pagination-active-dark');
                            },
                            responsive: false
                        });

                        jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                        jQuery('div.dataTables_length select').css({width: '60px'});
                        jQuery('div.dataTables_length select').select2({
                            minimumResultsForSearch: -1
                        });
                    }
                });//mongo data
            } else {
                $("#displayPatientsListMainDiv").text("");
            }
        }
    }); //solr data
}

function prepareImprovingWorseningGraph(improvingPatientsCount, worseningPatientsCount) {
//second box 
    $("#mainImpWorDiv").remove();
//    $("#displayAnalyticsMainDiv").append("<div id='mainImpWorDiv' class='col-md-4'><div class='panel panel-primary' style='border-width:2px;border-color:green;'><center><div id='analyticsSecondBoxBody' style='height:147px;' /><span class='label label-primary' style='font-size:12px;float:left;margin-left:5px;margin-top:-60px;font-weight:bold;'>Improving</span><span class='label label-danger' style='font-size:12px;float:right;margin-right:5px;margin-top:-60px;font-weight:bold;'><a href='javascript:prepareWorseningPatientList();'>Worsening</a></span><span class='label label-success' style='font-size:12px;font-weight:bold;margin-top:-10px;'>Improving vs Worsening patients based on SDAI</span><br /><br /></center></div></div>");

    $("#displayAnalyticsMainDiv").append("<div id='mainImpWorDiv' class='col-md-4'><div class='panel panel-primary' style='border-width:2px;border-color:green;'><center><div id='analyticsSecondBoxBody' style='height:141px;cursor:pointer;' /><span class='label label-primary' style='font-size:12px;float:left;margin-left:5px;font-weight:bold;'><a href='javascript:prepareImprovingPatientList();' style='text-decoration:none;color:white;'>Improving</a></span><span class='label label-danger' style='font-size:12px;float:right;margin-right:5px;font-weight:bold;'><a href='javascript:prepareWorseningPatientList();' style='text-decoration:none;color:white;'>Worsening</a></span><br /><br /></center></div></div>");


    var m6 = new Morris.Donut({
        element: 'analyticsSecondBoxBody',
        data: [{label: "Worsening", value: worseningPatientsCount}, {label: "Improving", value: improvingPatientsCount}],
        colors: ['#D9534F', '#428BCA']
    });
    m6.redraw();

//    $("#displayAnalyticsMainDiv").append("<div class='col-md-4'><div class='panel panel-primary noborder'><div id='analyticsSecondBoxBody' class='panel-heading noborder'></div></div></div>");
//    $("#analyticsSecondBoxBody").text("").append("<div class='panel-icon'><i class='fa fa-users'></i></div>");
//    $("#analyticsSecondBoxBody").append("<div class='media-body'><h5 class='md-title nomargin'>New User Accounts</h5><h1 class='mt5'>138,102</h1></div><hr>");
//    $("#analyticsSecondBoxBody").append("<div class='clearfix mt20' id='analyticsSecondBoxFooter' />");
//
//    $("#analyticsSecondBoxFooter").text("").append("<div class='pull-left'><h5 class='md-title nomargin'>Yesterday</h5><h4 class='nomargin'>10,009</h4></div>");
//    $("#analyticsSecondBoxFooter").append("<div class='pull-right'><h5 class='md-title nomargin'>This Week</h5><h4 class='nomargin'>178,222</h4></div>");
}


function prepareImprovingPatientList() {
    $.get(server_base_url + "/irheum-server/FetchPatientStatusCount", {
        outcomeKey: "sdaiStatus", outcomeValue: "improving"
    }).done(function(solrData) {
        if (solrData == fail) {
            displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
        } else if (solrData == unauthorized) {
            displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
        } else if (solrData == invalidSession) {
            callSessionTimeout();
        } else if (solrData == statusException) {
            displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
        } else {
            showLoader();
            var solrOutput = solrData.response.docs;
            var improvingPatientIds = new Array();

            $.each(solrOutput, function(index, value) {
                improvingPatientIds[index] = value.id;
            });//solr data for each

            if (solrData.response.numFound > 0) {
                $.get(server_base_url + "/irheum-server/FetchPatientsDetailList", {
                    patientIdsList: improvingPatientIds
                }).done(function(mongoData) {
                    if (mongoData == fail) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
                    } else if (mongoData == unauthorized) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
                    } else if (mongoData == invalidSession) {
                        callSessionTimeout();
                    } else if (mongoData == statusException) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
                    } else {
                        //display patients list
                        $("#displayPatientsListMainDiv").text("").append("<div id = 'displayPatientsSubDiv' class = 'panel panel-primary-head' />");
                        $("#displayPatientsSubDiv").append("<div class='panel-heading' style='height:50px;' id='displayPatientsSubDivHeading' />");

                        //heading start
                        $("#displayPatientsSubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Improving Patients List</b><span style='font-size:13px;'><br />Please click on column header to sort.</span></h3></center>");
                        $("#displayPatientsSubDiv").append("<table id='displayPatientsTable' class='table table-striped table-bordered'>");
                        $("#displayPatientsTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i> Patient Name</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i> DOB</th><th style='min-width:15%;width:auto;'><i class='fa fa-mobile'></i> Phone</th></tr></thead>");
                        $("#displayPatientsTable").append("<tbody id='displayPatientsTableBody' />");

                        $.each(solrOutput, function(index, value) {
                            $.each(mongoData, function(i, v) {
                                if (v._id.$oid == value.id) {
                                    var phone = "N/A";
                                    if (v.address[0].phone != "") {
                                        phone = v.address[0].phone;
                                    }
                                    $("#displayPatientsTableBody").append("<tr id='" + value.id + "' style='cursor:pointer;' onclick=getPatientDetails('" + value.id + "')><td>" + v.fname + " " + v.mname + " " + v.lname + "</td><td>" + v.dob + "</td><td>" + phone + "</td></tr>");
                                }
                            });//mongo data for each
                        });

                        var shTable = jQuery('#displayPatientsTable').DataTable({
                            "fnDrawCallback": function(oSettings) {
                                jQuery('#displayPatientsTable ul').addClass('pagination-active-dark');
                            },
                            responsive: false
                        });

                        jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                        jQuery('div.dataTables_length select').css({width: '60px'});
                        jQuery('div.dataTables_length select').select2({
                            minimumResultsForSearch: -1
                        });
                    }
                });//mongo data
            } else {
                $("#displayPatientsListMainDiv").text("");
            }
        }
    }); //solr data
}


function prepareWorseningPatientList() {
    $.get(server_base_url + "/irheum-server/FetchPatientStatusCount", {
        outcomeKey: "sdaiStatus", outcomeValue: "worsening"
    }).done(function(solrData) {
        if (solrData == fail) {
            displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
        } else if (solrData == unauthorized) {
            displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
        } else if (solrData == invalidSession) {
            callSessionTimeout();
        } else if (solrData == statusException) {
            displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
        } else {
            showLoader();
            var solrOutput = solrData.response.docs;
            var worseningPatientIds = new Array();

            $.each(solrOutput, function(index, value) {
                worseningPatientIds[index] = value.id;
            });//solr data for each

            if (solrData.response.numFound > 0) {
                $.get(server_base_url + "/irheum-server/FetchPatientsDetailList", {
                    patientIdsList: worseningPatientIds
                }).done(function(mongoData) {
                    if (mongoData == fail) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
                    } else if (mongoData == unauthorized) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
                    } else if (mongoData == invalidSession) {
                        callSessionTimeout();
                    } else if (mongoData == statusException) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
                    } else {
                        //display patients list
                        $("#displayPatientsListMainDiv").text("").append("<div id = 'displayPatientsSubDiv' class = 'panel panel-warning-head' />");
                        $("#displayPatientsSubDiv").append("<div class='panel-heading' style='height:50px;' id='displayPatientsSubDivHeading' />");

                        //heading start
                        $("#displayPatientsSubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Worsening Patients List</b><span style='font-size:13px;'><br />Please click on column header to sort.</span></h3></center>");
                        $("#displayPatientsSubDiv").append("<table id='displayPatientsTable' class='table table-striped table-bordered'>");
                        $("#displayPatientsTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i> Patient Name</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i> DOB</th><th style='min-width:15%;width:auto;'><i class='fa fa-mobile'></i> Phone</th></tr></thead>");
                        $("#displayPatientsTable").append("<tbody id='displayPatientsTableBody' />");

                        $.each(solrOutput, function(index, value) {
                            $.each(mongoData, function(i, v) {
                                if (v._id.$oid == value.id) {
                                    var phone = "N/A";
                                    if (v.address[0].phone != "") {
                                        phone = v.address[0].phone;
                                    }
                                    $("#displayPatientsTableBody").append("<tr id='" + value.id + "' style='cursor:pointer;' onclick=getPatientDetails('" + value.id + "')><td>" + v.fname + " " + v.mname + " " + v.lname + "</td><td>" + v.dob + "</td><td>" + phone + "</td></tr>");
                                }
                            });//mongo data for each
                        });

                        var shTable = jQuery('#displayPatientsTable').DataTable({
                            "fnDrawCallback": function(oSettings) {
                                jQuery('#displayPatientsTable ul').addClass('pagination-active-dark');
                            },
                            responsive: false
                        });

                        jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                        jQuery('div.dataTables_length select').css({width: '60px'});
                        jQuery('div.dataTables_length select').select2({
                            minimumResultsForSearch: -1
                        });
                    }
                });//mongo data
            } else {
                $("#displayPatientsListMainDiv").text("");
            }
        }
    }); //solr data
}

function preparePatientsSeen(patientsSeenTodayLabel, patientsSeenTodayCount, patientsSeenWeekLabel, patientsSeenWeekCount, patientsSeenMonthLabel, patientsSeenMonthCount) {
    $("#analyticsThirdBoxMainDiv").remove();
    $("#displayAnalyticsMainDiv").append("<div class='col-md-4' id='analyticsThirdBoxMainDiv' />");
    $("#analyticsThirdBoxMainDiv").text("").append("<div class='panel panel-dark noborder'><div id='analyticsThirdBoxBody' class='panel-heading noborder'></div></div>");
    $("#analyticsThirdBoxBody").text("").append("<div class='panel-icon'><i class='fa fa-users'></i></div>");
    $("#analyticsThirdBoxBody").append("<div class='media-body'><h5 class='nomargin'><a href='javascript:preparePatientSeenTodayList()' style='text-decoration:none;color:#fff;font-weight:bold;'>" + patientsSeenTodayLabel + "</a></h5><h1 class='mt5'><a href='javascript:preparePatientSeenTodayList()' style='text-decoration:none;color:#fff;font-weight:bold;'>" + patientsSeenTodayCount + "</a></h1></div><hr>");
    $("#analyticsThirdBoxBody").append("<div class='clearfix' id='analyticsThirdBoxFooter' style='margin-top:28px;' />");
    $("#analyticsThirdBoxFooter").text("").append("<div class='pull-left'><h5 class='nomargin'><a href='javascript:preparePatientSeenWeekList()' style='text-decoration:none;color:#fff;font-weight:bold;'>" + patientsSeenWeekLabel + "</a></h5><h4 class='nomargin'><center><a href='javascript:preparePatientSeenWeekList()' style='text-decoration:none;color:#fff;font-weight:bold;'>" + patientsSeenWeekCount + "</a></center></h4></div>");
    $("#analyticsThirdBoxFooter").append("<div class='pull-right'><h5 class='nomargin'><a href='javascript:preparePatientSeenMonthList()' style='text-decoration:none;color:#fff;font-weight:bold;'>" + patientsSeenMonthLabel + "</a></h5><h4 class='nomargin'><center><a href='javascript:preparePatientSeenMonthList()' style='text-decoration:none;color:#fff;font-weight:bold;'>" + patientsSeenMonthCount + "</a></center></h4></div>");
}

function preparePatientSeenTodayList() {
    $.get(server_base_url + "/irheum-server/FetchPatientsSeenCount", {
        pastDate: "0"
    }).done(function(solrData) {
        if (solrData == fail) {
            displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
        } else if (solrData == unauthorized) {
            displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
        } else if (solrData == invalidSession) {
            callSessionTimeout();
        } else if (solrData == statusException) {
            displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
        } else {
            showLoader();
            var solrOutput = solrData.response.docs;
            var missingLabsPatientIds = new Array();

            $.each(solrOutput, function(index, value) {
                missingLabsPatientIds[index] = value.patientid;
            });//solr data for each

            if (solrData.response.numFound > 0) {
                $.get(server_base_url + "/irheum-server/FetchPatientsDetailList", {
                    patientIdsList: missingLabsPatientIds
                }).done(function(mongoData) {
                    if (mongoData == fail) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
                    } else if (mongoData == unauthorized) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
                    } else if (mongoData == invalidSession) {
                        callSessionTimeout();
                    } else if (mongoData == statusException) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
                    } else {
                        //display patients list
                        $("#displayPatientsListMainDiv").text("").append("<div id = 'displayPatientsSubDiv' class = 'panel panel-success-head' />");
                        $("#displayPatientsSubDiv").append("<div class='panel-heading' style='height:50px;' id='displayPatientsSubDivHeading' />");

                        //heading start
                        $("#displayPatientsSubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Patients Seen Today List</b><span style='font-size:13px;'><br />Please click on column header to sort.</span></h3></center>");
                        $("#displayPatientsSubDiv").append("<table id='displayPatientsTable' class='table table-striped table-bordered'>");
                        $("#displayPatientsTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i> Patient Name</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i> DOB</th><th style='min-width:15%;width:auto;'><i class='fa fa-mobile'></i> Phone</th><th style='min-width:15%;width:auto;'>Encounter Date</th></tr></thead>");
                        $("#displayPatientsTable").append("<tbody id='displayPatientsTableBody' />");

                        $.each(solrOutput, function(index, value) {
                            $.each(mongoData, function(i, v) {
                                if (v._id.$oid == value.patientid) {
                                    var phone = "N/A";
                                    if (v.address[0].phone != "") {
                                        phone = v.address[0].phone;
                                    }
                                    $("#displayPatientsTableBody").append("<tr id='" + value.id + "' style='cursor:pointer;' onclick=getPatientDetails('" + value.patientid + "')><td>" + v.fname + " " + v.mname + " " + v.lname + "</td><td>" + v.dob + "</td><td>" + phone + "</td><td>" + dateConversion(value.createdate) + "</td></tr>");
                                }
                            });//mongo data for each
                        });

                        var shTable = jQuery('#displayPatientsTable').DataTable({
                            "fnDrawCallback": function(oSettings) {
                                jQuery('#displayPatientsTable ul').addClass('pagination-active-dark');
                            },
                            responsive: false
                        });

                        jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                        jQuery('div.dataTables_length select').css({width: '60px'});
                        jQuery('div.dataTables_length select').select2({
                            minimumResultsForSearch: -1
                        });
                    }
                });//mongo data
            } else {
                $("#displayPatientsListMainDiv").text("");
//                $("#displayPatientsListMainDiv").text("").append("<center><span style='color:brown;font-size:18px;font-weight:bold;'>" + noDataFound + "</span></center>");
            }
        }
    }); //solr data
}

function preparePatientSeenWeekList() {
    $.get(server_base_url + "/irheum-server/FetchPatientsSeenCount", {
        pastDate: "7"
    }).done(function(solrData) {
        if (solrData == fail) {
            displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
        } else if (solrData == unauthorized) {
            displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
        } else if (solrData == invalidSession) {
            callSessionTimeout();
        } else if (solrData == statusException) {
            displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
        } else {
            showLoader();
            var solrOutput = solrData.response.docs;
            var missingLabsPatientIds = new Array();

            $.each(solrOutput, function(index, value) {
                missingLabsPatientIds[index] = value.patientid;
            });//solr data for each

            if (solrData.response.numFound > 0) {
                $.get(server_base_url + "/irheum-server/FetchPatientsDetailList", {
                    patientIdsList: missingLabsPatientIds
                }).done(function(mongoData) {
                    if (mongoData == fail) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
                    } else if (mongoData == unauthorized) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
                    } else if (mongoData == invalidSession) {
                        callSessionTimeout();
                    } else if (mongoData == statusException) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
                    } else {
                        //display patients list
                        $("#displayPatientsListMainDiv").text("").append("<div id = 'displayPatientsSubDiv' class = 'panel panel-primary-head' />");
                        $("#displayPatientsSubDiv").append("<div class='panel-heading' style='height:50px;' id='displayPatientsSubDivHeading' />");

                        //heading start
                        $("#displayPatientsSubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Patients Seen Last Week List</b><span style='font-size:13px;'><br />Please click on column header to sort.</span></h3></center>");
                        $("#displayPatientsSubDiv").append("<table id='displayPatientsTable' class='table table-striped table-bordered'>");
                        $("#displayPatientsTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i> Patient Name</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i> DOB</th><th style='min-width:15%;width:auto;'><i class='fa fa-mobile'></i> Phone</th><th style='min-width:15%;width:auto;'>Encounter Date</th></tr></thead>");
                        $("#displayPatientsTable").append("<tbody id='displayPatientsTableBody' />");

                        $.each(solrOutput, function(index, value) {
                            $.each(mongoData, function(i, v) {
                                if (v._id.$oid == value.patientid) {
                                    var phone = "N/A";
                                    if (v.address[0].phone != "") {
                                        phone = v.address[0].phone;
                                    }
                                    $("#displayPatientsTableBody").append("<tr id='" + value.id + "' style='cursor:pointer;' onclick=getPatientDetails('" + value.patientid + "')><td>" + v.fname + " " + v.mname + " " + v.lname + "</td><td>" + v.dob + "</td><td>" + phone + "</td><td>" + dateConversion(value.createdate) + "</td></tr>");
                                }
                            });//mongo data for each
                        });

                        var shTable = jQuery('#displayPatientsTable').DataTable({
                            "fnDrawCallback": function(oSettings) {
                                jQuery('#displayPatientsTable ul').addClass('pagination-active-dark');
                            },
                            responsive: false
                        });

                        jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                        jQuery('div.dataTables_length select').css({width: '60px'});
                        jQuery('div.dataTables_length select').select2({
                            minimumResultsForSearch: -1
                        });
                    }
                });//mongo data
            } else {
                $("#displayPatientsListMainDiv").text("");
            }
        }
    }); //solr data
}

function preparePatientSeenMonthList() {
    $.get(server_base_url + "/irheum-server/FetchPatientsSeenCount", {
        pastDate: "30"
    }).done(function(solrData) {
        if (solrData == fail) {
            displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
        } else if (solrData == unauthorized) {
            displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
        } else if (solrData == invalidSession) {
            callSessionTimeout();
        } else if (solrData == statusException) {
            displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
        } else {
            showLoader();
            var solrOutput = solrData.response.docs;
            var missingLabsPatientIds = new Array();

            $.each(solrOutput, function(index, value) {
                missingLabsPatientIds[index] = value.patientid;
            });//solr data for each

            if (solrData.response.numFound > 0) {
                $.get(server_base_url + "/irheum-server/FetchPatientsDetailList", {
                    patientIdsList: missingLabsPatientIds
                }).done(function(mongoData) {
                    if (mongoData == fail) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + failMessage + "</center>");
                    } else if (mongoData == unauthorized) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + unauthorizedMessage + "</center>");
                    } else if (mongoData == invalidSession) {
                        callSessionTimeout();
                    } else if (mongoData == statusException) {
                        displayLargeErrorMessages("dashboard-body", "<center>" + statusExceptionMessage + "</center>");
                    } else {
                        //display patients list
                        $("#displayPatientsListMainDiv").text("").append("<div id = 'displayPatientsSubDiv' class = 'panel panel-warning-head' />");
                        $("#displayPatientsSubDiv").append("<div class='panel-heading' style='height:50px;' id='displayPatientsSubDivHeading' />");

                        //heading start
                        $("#displayPatientsSubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Patients Seen Last Month List</b><span style='font-size:13px;'><br />Please click on column header to sort.</span></h3></center>");
                        $("#displayPatientsSubDiv").append("<table id='displayPatientsTable' class='table table-striped table-bordered'>");
                        $("#displayPatientsTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i> Patient Name</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i> DOB</th><th style='min-width:15%;width:auto;'><i class='fa fa-mobile'></i> Phone</th><th style='min-width:15%;width:auto;'>Encounter Date</th></tr></thead>");
                        $("#displayPatientsTable").append("<tbody id='displayPatientsTableBody' />");

                        $.each(solrOutput, function(index, value) {
                            $.each(mongoData, function(i, v) {
                                if (v._id.$oid == value.patientid) {
                                    var phone = "N/A";
                                    if (v.address[0].phone != "") {
                                        phone = v.address[0].phone;
                                    }
                                    $("#displayPatientsTableBody").append("<tr id='" + value.id + "' style='cursor:pointer;' onclick=getPatientDetails('" + value.patientid + "')><td>" + v.fname + " " + v.mname + " " + v.lname + "</td><td>" + v.dob + "</td><td>" + phone + "</td><td>" + dateConversion(value.createdate) + "</td></tr>");
                                }
                            });//mongo data for each
                        });

                        var shTable = jQuery('#displayPatientsTable').DataTable({
                            "fnDrawCallback": function(oSettings) {
                                jQuery('#displayPatientsTable ul').addClass('pagination-active-dark');
                            },
                            responsive: false
                        });

                        jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                        jQuery('div.dataTables_length select').css({width: '60px'});
                        jQuery('div.dataTables_length select').select2({
                            minimumResultsForSearch: -1
                        });
                    }
                });//mongo data
            } else {
                $("#displayPatientsListMainDiv").text("");
            }
        }
    }); //solr data
}