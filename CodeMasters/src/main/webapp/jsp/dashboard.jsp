<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>Chain Responsive Bootstrap3 Admin</title>

        <link href="css/style.default.css" rel="stylesheet">
        <link href="css/morris.css" rel="stylesheet">
        <link href="css/select2.css" rel="stylesheet" />
        <%@include file="common.jsp"%>
    </head>
    <body class="pace-done" onload="dashboardDefaults();">
        <header>
            <div class="headerwrapper" id="headerMainDiv">

                <div class="header-left" id="headerLeftDiv">
                    <!--<div class="rounded-corners"style="height:40px;width:150px; background:cornsilk">-->
                        
                        <a href="#" class="logo" ><img class="irheum_logo" src="../images/reconix.png" /></a>
                        <div class="pull-right">
                            <a href="" class="menu-collapse"><i class="fa fa-bars"></i></a>
                        </div>
                        
                    <!--</div>-->
                </div> <!--header-left -->

            </div><!-- headerwrapper -->
        </header>

        <section>
            <div class="mainwrapper" id="mainDashboardDiv">
                <div class="leftpanel" id="leftPanelDiv" >
                    <ul class="nav nav-pills nav-stacked" id="activeList2" >
                        <li class="active"><a href="dashboard.jsp"><i class="fa fa-home"></i> <span>Dashboard</span></a></li>
                        <!--<li><a href=""><span class="pull-right badge"></span><i class="fa fa-envelope-o"></i> <span>Report</span></a></li>-->
                        <li class="parent"><a href=""><i class="fa fa-suitcase"></i> <span>SLM REPORTS</span></a>
                            <ul class="children">
                                <li><a onclick="SLMReport('fcr')">FCR-%</a></li>
                                <li><a onclick="SLMReport('calldata')" >Call Data</a></li>
                                <li><a onclick="SLMReport('survey')">Survey Report</a></li>
                                <li><a onclick="SLMReport('percentage')">Percentage of ticket logged through portal></a></li>
                                <li><a onclick="SLMReport('incident')">P1 to P3 incident SLA</a></li>
                                <li><a onclick="SLMReport('service')">P1 to P3 Service request SLA</a></li>
                                <li><a onclick="SLMReport('dsat')">DSAT Report:</a></li>
                            </ul>
                        </li>
                </div>
                <div id='mainPanelDiv' class='mainpanel'>
                    <div class="pageheader">
                        <div class="media">                            
                            <div class="media-body" id="mdbdid">
                                <!--<div class="has-success btn-bordered">-->
                                <!--<div class="col-sm-8 col-md-offset-2">-->

                                <center><span id="appmMsg"></span></center>
                            </div>
                        </div><!-- media -->
                    </div>
                </div>
            </div><!-- mainwrapper -->
        </section>
    </body>
</html>