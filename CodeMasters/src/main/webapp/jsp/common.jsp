<!--head start-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<meta name="viewport" content="initial-scale=1.0, width=device-height">
<meta name="description" content="">
<meta name="author" content="">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<title>codemasters</title>
<!--head end-->

<!--disable right click start-->
<!--<script type="text/javascript" src="../js/jquery-1.9.1.js"></script>
<script>
    $(document).bind('contextmenu', function(e) {
        e.preventDefault();
        alert('Right Click is not allowed');
    });
</script>-->
<!--disable right click end-->

<!--disable F5 start-->
<!--<script>
    document.onkeydown = function() {
        if (event.keyCode == 116) {
            event.returnValue = false;
            event.keyCode = 0;
            return false;
        }
    }
</script>-->
<!--disable F5 end--> 

<!----Css start--->
<link href="../css/style.default.css" rel="stylesheet">
<link href="../css/jquery.gritter.css" rel="stylesheet">
<link href="../css/jquery.tagsinput.css" rel="stylesheet" />
<link href="../css/toggles.css" rel="stylesheet" />
<link href="../css/bootstrap-timepicker.min.css" rel="stylesheet" />
<link href="../css/select2.css" rel="stylesheet" />
<link href="../css/style.datatables.css" rel="stylesheet">
<link href="../css/dataTables.responsive.css" rel="stylesheet">
<link href="../css/colorpicker.css" rel="stylesheet" />
<link href="../css/dropzone.css" rel="stylesheet" />
<link href="../css/jquery-ui-slider-pips.css" rel="stylesheet" />

<!--patient search related css files start-->
<link rel="stylesheet" type="text/css" media="all" href="../css/style.css">
<link rel="stylesheet" href="../css/signature.css">
<!--patient search related css files end-->
<!--Css end-->

<!--to connect js to servlet-->
<script type="text/javascript" src="../js/jquery-latest.js"></script>
<script type="text/javascript" src="../js/jquery-1.8.2.js"></script>
<script type="text/javascript" src="../js/jquery.min.js"></script>
<script type="text/javascript" src="../js/jquery-1.10.2.js"></script>
<script type="text/javascript" src="../js/jquery.flot.min.js"></script>
<script type="text/javascript" src="../js/jquery.flot.time.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/toggle.js"></script>

<!--local js files start-->
<script type="text/javascript" src="../js/authentication-av2.6.js"></script>
<script type="text/javascript" src="../js/dashboard-defaults-av2.6.js"></script>
<script type="text/javascript" src="../js/prepare-dashboard-av2.6.js"></script>


<script type="text/javascript" src="../js/commonutilities.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/accure-chart.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/accure.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/highcharts.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/map.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/highmaps.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/world.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/data.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/keywordlist.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/autoreplySetting.js"></script>

<link href="../css/newcss.css" rel="stylesheet" type="text/css" /> 

<script type="text/javascript" src="../js/organization-selection-av2.6.js"></script>
<script type="text/javascript" src="../js/provider-analytics-av2.6.js"></script>
<script type="text/javascript" src="../js/user-display-forms-av2.6.js"></script>
<script type="text/javascript" src="../js/user-management-av2.6.js"></script>
<script type="text/javascript" src="../js/user-demographic-av2.6.js"></script>
<script type="text/javascript" src="../js/physician-preferences-av2.6.js"></script>
<script type="text/javascript" src="../js/patient-demographic-av2.6.js"></script>
<script type="text/javascript" src="../js/forgot-password-av2.6.js"></script>
<script type="text/javascript" src="../js/recovery-password-av2.6.js"></script>

<script type="text/javascript" src="../js/patient-display-forms-av2.6.js"></script>
<script type="text/javascript" src="../js/patientdata-autocomplete-av2.6.js"></script>
<script type="text/javascript" src="../js/patient-exam-demographics-av2.6.js"></script>
<script type="text/javascript" src="../js/patient-report-av2.6.js"></script>
<script type="text/javascript" src="../js/patient-exam-forms-av2.6.js"></script>
<script type="text/javascript" src="../js/patient-exam-defaults-av2.6.js"></script>
<script type="text/javascript" src="../js/icure-av2.6.js"></script>
<script type="text/javascript" src="../js/patient-labs-av2.6.js"></script>
<script type="text/javascript" src="../js/patient-assessment-av2.6.js"></script>
<script type="text/javascript" src="../js/crypto-av2.6.js"></script>
<script type="text/javascript" src="../js/patient-assessment-radam-av2.6.js"></script>
<script type="text/javascript" src="../js/physician-assessment-av2.6.js"></script>
<script type="text/javascript" src="../js/patient-medication-av2.6.js"></script>
<!--local js files end-->

<!--signature js files start-->
<script type="text/javascript" src="../js/libs/modernizr.js"></script>
<!--<script type="text/javascript" src="../js/libs/jquery.js"></script>-->
<script type="text/javascript" src="../js/jSignature.min.noconflict-av2.6.js"></script>
<script type="text/javascript" src="../js/patient-signature-av2.6.js"></script>
<!--signature js files end-->

<!-- template js files start -->
<!--<script type="text/javascript" src="../js/jquery-1.11.1.min.js"></script>-->
<script type="text/javascript" src="../js/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.10.3.min.js"></script>
<script type="text/javascript" src="../js/bootstrap.min.js"></script>
<script type="text/javascript" src="../js/modernizr.min.js"></script>
<script type="text/javascript" src="../js/pace.min.js"></script>
<script type="text/javascript" src="../js/retina.min.js"></script>
<script type="text/javascript" src="../js/jquery.cookies.js"></script><!--upto common for all-->
<script type="text/javascript" src="../js/jquery.gritter.min.js"></script>

<script type="text/javascript" src="../js/jquery.autogrow-textarea.js"></script>
<script type="text/javascript" src="../js/jquery.mousewheel.js"></script>
<script type="text/javascript" src="../js/toggles.min.js"></script>
<script type="text/javascript" src="../js/bootstrap-timepicker.min.js"></script>
<script type="text/javascript" src="../js/jquery.maskedinput.min.js"></script>

<script type="text/javascript" src="../js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="../js/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="../js/dataTables.responsive.js"></script>

<script type="text/javascript" src="../js/flot/jquery.flot.min.js"></script>
<script type="text/javascript" src="../js/flot/jquery.flot.resize.min.js"></script>
<script type="text/javascript" src="../js/flot/plugins/curvedLines.js"></script>
<script type="text/javascript" src="../js/jquery.sparkline.min.js"></script>
<script type="text/javascript" src="../js/morris.min.js"></script>
<script type="text/javascript" src="../js/raphael-2.1.0.min.js"></script>
<script type="text/javascript" src="../js/bootstrap-wizard.min.js"></script>
<script type="text/javascript" src="../js/jquery.validate.min.js"></script>
<script type="text/javascript" src="../js/select2.min.js"></script>

<script type="text/javascript" src="../js/colorpicker.js"></script>
<script type="text/javascript" src="../js/dropzone.min.js"></script>
<script type="text/javascript" src="../js/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript" src="../js/jquery-ui-slider-pips.js"></script>
<script type="text/javascript" src="../js/jquery-ui-slider-pips.min.js"></script>
<script type="text/javascript" src="../js/custom.js"></script>
<script type="text/javascript" src="../js/dashboard.js"></script>

<!--manually added-->
<script type="text/javascript" src="../js/tables.js"></script>
<script type="text/javascript" src="../js/form-validation.js"></script>
<script type="text/javascript" src="../js/general-forms.js"></script>
<!-- template js files end -->

<!--added new -->
<script type="text/javascript" src="../js/keywordSettings.js"></script>
<script type="text/javascript" src="../js/accountSettings.js"></script>
<script type="text/javascript" src="../js/campaignSetting.js"></script>

<script>
    var server_base_url = "/accure-sma-server/";
    var datePickerRange = "1950:2035";
    var success = "200";
    var fail = "Fail";
    var unauthorized = "401";
    var invalidSession = "403";
    var statusException = "500";
    var successMessage = "Successfully saved.";
    var failMessage = "Operation failed.";
    var unauthorizedMessage = "You have insufficient privilege to access this feature.";
    var invalidSessionMessage = "Your session has timed out.<br /> please wait while redirecting to login page...";
    var statusExceptionMessage = "Internal error occured please contact admin.";

    var catForm = "56296D2D-C919-40F1-AFC7-6F544FCA7772";
    var pendingAssessmentsMessage = "<strong>Please complete the below missed groups</strong> <br />Click on the link to redirect corresponding group.";
    var noDataAvailable = "No Data Available";
    var noDataFound = "No data available";
    var analyticsFlag = "true";
    var labAnalyticsFlag = "false";
     var dateformate = "dd/mm/yy";
    $.ajaxSetup({cache: false});
</script>