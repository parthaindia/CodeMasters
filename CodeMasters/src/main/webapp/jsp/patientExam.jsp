<html lang="en">
    <head>
        <%@include file="common.jsp"%>
    </head>
    <body class="pace-done" onload="patientExamDefaults();">
        <div id="patientAssessmentPopup"></div>
        <div id="radamPopup"></div>
        <div id="pendingAssessmentsPopup"></div>
        <div id="resumePinPopup"></div>
        <div id="rapid3Popup"></div>
        <div id="bioMedsPopup"></div>
        <div id="medicationPopup"></div>
        <div id="completeExamPopup"></div>
        <div id="jointCountPopup"></div>
        <div id="clearMedsPopup"></div>
        <div id="PINPopup"></div>
        <header>
            <div class="headerwrapper">
                <div class="header-left">
                    <a href="dashboard.jsp" class="logo"><img class="irheum_logo" src="../images/logo-primary.png" alt="iRheum" /></a>
                    <div class="pull-right">
                        <a href="" class="menu-collapse">
                            <i class="fa fa-bars"></i>
                        </a>
                    </div>
                </div><!-- header-left -->

                <div class="header-right">
                    <div class="pull-right">

                        <!--for displaying global comments option-->
                        <div id="globalCommentsDivId" class="btn-group btn-group-list btn-group-messages"></div>

                        <!--for org-->
                        <div class="btn-group btn-group-list btn-group-notification" id="orgDisplay">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                <span id="pat-currentOrgId" class="fa fa-users" title="Current Organization"></span>
                            </button>
                        </div>

                        <!--for user display-->
                        <div class="btn-group btn-group-list btn-group-messages" id="userDisplay">
                            <button type="button" class="btn btn-default dropdown-toggle">
                                <span id="pat-currentUserId" class="glyphicon glyphicon-user" title="Current User"></span>
                            </button>
                        </div>

                        <!--for dropdown-->
                        <div id="logoutMenu" class="btn-group btn-group-option">
                            <button id='dropDownButton' type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-caret-down"></i>
                            </button>
                            <ul class="dropdown-menu pull-right" role="menu" id="patientExamMenus"></ul>
                        </div><!-- btn-group -->
                    </div><!-- pull-right -->
                </div><!-- header-right -->
            </div><!-- headerwrapper -->
        </header>
        <div id="patientInfo"></div>
        <section>
            <div class="mainwrapper">
                <div class="leftpanel" id="patientExamLeftPanelId"></div>

                <div class="mainpanel">
                    <div class="pageheader" style="height:50px;">
                        <div class="media">                            
                            <i class="glyphicon glyphicon-user" style="font-size:20px;"></i>
                            <span id="patientDispId"></span>
                            <span id="jcBeforeSuccessMsg"></span>
                        </div><!-- media -->
                    </div>

                    <div class="contentpanel">

                        <!-- CONTENT GOES HERE -->  

                        <!-- Humanculus Part start -->
                        <div class="tab-pane active" id="jointCountDiv" style="width:1040px;"><br />
                            <div class="panel panel-primary">                                
                                <div class="panel-heading" style="height:50px;" id="jointBtnsDiv1">                                                                                                          
                                    <center>
                                        <span style="float:left;font-size: 26px;margin-top:-10px;"><b>Current Assessment</b></span>
                                        <button style="margin-left:-27%;margin-top:-16px;" class="btn btn-default" onclick="save()"><b>Save</b></button>&nbsp;
                                        <a href="javascript:clearAll()" style="font-size:18px;color:#FFF;margin-left:20px;"><u><b>Clear</b></u></a>
                                    </center>                                    
                                </div><!-- panel-heading -->

                                <!--panel body start-->
                                <div class="panel-body" style="width:100%;">
                                    <form name="myForm" id="myForm">
                                        <div class="db-content-full">
                                            <div id="examcanvas" class="db-content-box db-jointcount ui-corner-all ui-bar-c ui-shadow rel">
                                                <div class="jc-abs jc-check" data-target="TenderNeck" data-pos="1,6">
                                                    <input type="checkbox"  class="chkbox" id="tNeck" onchange="calCount()"name="Tender" value="tNeck" >
                                                    <label for="tNeck" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderShoulderRight" data-pos="2,4">
                                                    <input type="checkbox" id="tShoulderRight" class="chkbox" onchange="calCount()"  name="Tender" value="tShoulderRight" >
                                                    <label for="tShoulderRight" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderShoulderLeft" data-pos="2,8">
                                                    <input type="checkbox" id="tShoulderLeft"  class="chkbox" onchange="calCount()"  name="Tender" value="tShoulderLeft" >
                                                    <label for="tShoulderLeft" class="chk-label">&nbsp;</label>&nbsp; 
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderElbowRight" data-pos="3,4">
                                                    <input type="checkbox" id="tElbowRight" class="chkbox" onchange="calCount()"  name="Tender" value="tElbowRight" >
                                                    <label for="tElbowRight" class="chk-label">&nbsp;</label>&nbsp; 
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderElbowLeft" data-pos="3,8">
                                                    <input type="checkbox" id="tElbowLefft" class="chkbox" onchange="calCount()"  name="Tender" value="tElbowLefft" >
                                                    <label for="tElbowLefft" class="chk-label">&nbsp;</label>&nbsp; 
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderWristRight2" data-pos="4,4">
                                                    <input type="checkbox" id="tWristRight2"  class="chkbox" onchange="calCount()"  name="Tender" value="tWristRight2" >
                                                    <label for="tWristRight2" class="chk-label">&nbsp;</label>&nbsp; 
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderWristRight1" data-pos="4,5">
                                                    <input type="checkbox" id="tWristRight1" class="chkbox" onchange="calCount()"  name="Tender" value="tWristRight1" >
                                                    <label for="tWristRight1" class="chk-label">&nbsp;</label>&nbsp; 
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderWristLeft2" data-pos="4,8">
                                                    <input type="checkbox" id="tWristLeft2" class="chkbox" onchange="calCount()"  name="Tender" value="tWristLeft2" >
                                                    <label for="tWristLeft2" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderWristLeft1" data-pos="4,7">
                                                    <input type="checkbox" id="tWristlLeft1" class="chkbox" onchange="calCount()"  name="Tender" value="tWristlLeft1" >
                                                    <label for="tWristlLeft1" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMcpRight1" data-pos="5,5">
                                                    <input type="checkbox" id="tMCPRight1" class="chkbox" onchange="calCount()"  name="Tender" value="tMCPRight1" >
                                                    <label for="tMCPRight1" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMcpRight2" data-pos="5,4">
                                                    <input type="checkbox" id="tMCPRight2" class="chkbox" onchange="calCount()"  name="Tender" value="tMCPRight2" >
                                                    <label for="tMCPRight2" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMcpRight3" data-pos="5,3">
                                                    <input type="checkbox" id="tMCPRight3" class="chkbox" onchange="calCount()"  name="Tender" value="tMCPRight3" >
                                                    <label for="tMCPRight3" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMcpRight4" data-pos="5,2">
                                                    <input type="checkbox" id="tMCPRight4" class="chkbox" onchange="calCount()"  name="Tender" value="tMCPRight4" > 
                                                    <label for="tMCPRight4" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMcpRight5" data-pos="5,1">
                                                    <input type="checkbox" id="tMCPRight5" class="chkbox" onchange="calCount()"  name="Tender" value="tMCPRight5" >
                                                    <label for="tMCPRight5" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMcpLeft1" data-pos="5,7">
                                                    <input type="checkbox" id="tMCPLeft1" class="chkbox" onchange="calCount()"  name="Tender" value="tMCPLeft1" >
                                                    <label for="tMCPLeft1" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMcpLeft2" data-pos="5,8">
                                                    <input type="checkbox" id="tMCPLeft2" class="chkbox" onchange="calCount()"  name="Tender" value="tMCPLeft2" >
                                                    <label for="tMCPLeft2" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMcpLeft3" data-pos="5,9">
                                                    <input type="checkbox" id="tMCPLeft3" class="chkbox" onchange="calCount()"  name="Tender" value="tMCPLeft3" >
                                                    <label for="tMCPLeft3" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMcpLeft4" data-pos="5,10">
                                                    <input type="checkbox" id="tMCPLeft4" class="chkbox" onchange="calCount()"  name="Tender" value="tMCPLeft4" >
                                                    <label for="tMCPLeft4" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMcpLeft5" data-pos="5,11">
                                                    <input type="checkbox" id="tMCPLeft5" class="chkbox" onchange="calCount()"  name="Tender" value="tMCPLeft5" >
                                                    <label for="tMCPLeft5" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderPipRight1" data-pos="6,5">
                                                    <input type="checkbox" id="tPIPRight1" class="chkbox" onchange="calCount()"  name="Tender" value="tPIPRight1" > 
                                                    <label for="tPIPRight1" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderPipRight2" data-pos="6,4">
                                                    <input type="checkbox" id="tPIPRight2" class="chkbox" onchange="calCount()"  name="Tender" value="tPIPRight2" > 
                                                    <label for="tPIPRight2" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderPipRight3" data-pos="6,3">
                                                    <input type="checkbox" id="tPIPRight3" class="chkbox" onchange="calCount()"  name="Tender" value="tPIPRight3" > 
                                                    <label for="tPIPRight3" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderPipRight4" data-pos="6,2">
                                                    <input type="checkbox" id="tPIPRight4" class="chkbox" onchange="calCount()"  name="Tender" value="tPIPRight4" >
                                                    <label for="tPIPRight4" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderPipRight5" data-pos="6,1">
                                                    <input type="checkbox" id="tPIPRight5" class="chkbox" onchange="calCount()"  name="Tender" value="tPIPRight5" >  
                                                    <label for="tPIPRight5" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderPipLeft1" data-pos="6,7">
                                                    <input type="checkbox" id="tPIPLeft1" class="chkbox" onchange="calCount()"  name="Tender" value="tPIPLeft1" > 
                                                    <label for="tPIPLeft1" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderPipLeft2" data-pos="6,8">
                                                    <input type="checkbox" id="tPIPLeft2" class="chkbox" onchange="calCount()"  name="Tender" value="tPIPLeft2" > 
                                                    <label for="tPIPLeft2" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderPipLeft3" data-pos="6,9">
                                                    <input type="checkbox" id="tPIPLeft3" class="chkbox" onchange="calCount()"  name="Tender" value="tPIPLeft3" > 
                                                    <label for="tPIPLeft3" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderPipLeft4" data-pos="6,10">
                                                    <input type="checkbox" id="tPIPLeft4" class="chkbox" onchange="calCount()"  name="Tender" value="tPIPLeft4" > 
                                                    <label for="tPIPLeft4" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderPipLeft5" data-pos="6,11">
                                                    <input type="checkbox" id="tPIPLeft5" class="chkbox" onchange="calCount()"  name="Tender" value="tPIPLeft5" > 
                                                    <label for="tPIPLeft5" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderDipRight1" data-pos="7,4">
                                                    <input type="checkbox" id="tDIPRight1" class="chkbox" onchange="calCount()"  name="Tender" value="tDIPRight1" > 
                                                    <label for="tDIPRight1" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderDipRight2" data-pos="7,3">
                                                    <input type="checkbox" id="tDIPRight2" class="chkbox" onchange="calCount()"  name="Tender" value="tDIPRight2" > 
                                                    <label for="tDIPRight2" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderDipRight3" data-pos="7,2">
                                                    <input type="checkbox" id="tDIPRight3" class="chkbox" onchange="calCount()"  name="Tender" value="tDIPRight3" > 
                                                    <label for="tDIPRight3" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderDipRight4" data-pos="7,1">
                                                    <input type="checkbox"id="tDIPRight4"  class="chkbox" onchange="calCount()"  name="Tender" value="tDIPRight4" > 
                                                    <label for="tDIPRight4" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderDipLeft1" data-pos="7,8">
                                                    <input type="checkbox" id="tDIPLeft1" class="chkbox" onchange="calCount()"  name="Tender" value="tDIPLeft1" > 
                                                    <label for="tDIPLeft1" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderDipLeft2" data-pos="7,9">
                                                    <input type="checkbox" id="tDIPLeft2" class="chkbox" onchange="calCount()"  name="Tender" value="tDIPLeft2" > 
                                                    <label for="tDIPLeft2" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderDipLeft3" data-pos="7,10">
                                                    <input type="checkbox" id="tDIPLeft3" class="chkbox" onchange="calCount()"  name="Tender" value="tDIPLeft3" > 
                                                    <label for="tDIPLeft3" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderDipLeft4" data-pos="7,11">
                                                    <input type="checkbox" id="tDIPLeft4" class="chkbox" onchange="calCount()"  name="Tender" value="tDIPLeft4" > 
                                                    <label for="tDIPLeft4" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderHipRight" data-pos="8,5">
                                                    <input type="checkbox" id="tHIPRight" class="chkbox" onchange="calCount()"  name="Tender" value="tHIPRight" > 
                                                    <label for="tHIPRight" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderHipLeft" data-pos="8,7">
                                                    <input type="checkbox" id="tHIPLeft" class="chkbox" onchange="calCount()"  name="Tender" value="tHIPLeft" > 
                                                    <label for="tHIPLeft" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderKneeRight" data-pos="9,5">
                                                    <input type="checkbox" id="tKneeRight" class="chkbox" onchange="calCount()"  name="Tender" value="tKneeRight" > 
                                                    <label for="tKneeRight" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderKneeLeft" data-pos="9,7">
                                                    <input type="checkbox" id="tKneeLeft" class="chkbox" onchange="calCount()"  name="Tender" value="tKneeLeft" > 
                                                    <label for="tKneeLeft" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderAnkleRight" data-pos="10,5">
                                                    <input type="checkbox" id="tAnkleRight" class="chkbox" onchange="calCount()"  name="Tender" value="tAnkleRight" > 
                                                    <label for="tAnkleRight" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderAnkleLeft" data-pos="10,7">
                                                    <input type="checkbox" id="tAnkleLeft" class="chkbox" onchange="calCount()"  name="Tender" value="tAnkleLeft" > 
                                                    <label for="tAnkleLeft" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMtpRight1" data-pos="11,5">
                                                    <input type="checkbox" id="tMTPRight1" class="chkbox" onchange="calCount()"  name="Tender" value="tMTPRight1" > 
                                                    <label for="tMTPRight1" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMtpRight2" data-pos="11,4">
                                                    <input type="checkbox" id="tMTPRight2" class="chkbox" onchange="calCount()"  name="Tender" value="tMTPRight2" > 
                                                    <label for="tMTPRight2" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMtpRight3" data-pos="11,3">
                                                    <input type="checkbox" id="tMTPRight3" class="chkbox" onchange="calCount()"  name="Tender" value="tMTPRight3" > 
                                                    <label for="tMTPRight3" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMtpRight4" data-pos="11,2">
                                                    <input type="checkbox" id="tMTPRight4" class="chkbox" onchange="calCount()"  name="Tender" value="tMTPRight4" > 
                                                    <label for="tMTPRight4" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMtpRight5" data-pos="11,1">
                                                    <input type="checkbox" id="tMTPRight5" class="chkbox" onchange="calCount()"  name="Tender" value="tMTPRight5" > 
                                                    <label for="tMTPRight5" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMtpLeft1" data-pos="11,7">
                                                    <input type="checkbox" id="tMTPLeft1" class="chkbox" onchange="calCount()"  name="Tender" value="tMTPLeft1" > 
                                                    <label for="tMTPLeft1" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMtpLeft2" data-pos="11,8">
                                                    <input type="checkbox" id="tMTPLeft2" class="chkbox" onchange="calCount()"  name="Tender" value="tMTPLeft2" >
                                                    <label for="tMTPLeft2" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMtpLeft3" data-pos="11,9">
                                                    <input type="checkbox" id="tMTPLeft3" class="chkbox" onchange="calCount()"  name="Tender" value="tMTPLeft3" > 
                                                    <label for="tMTPLeft3" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMtpLeft4" data-pos="11,10">
                                                    <input type="checkbox" id="tMTPLeft4" class="chkbox" onchange="calCount()"  name="Tender" value="tMTPLeft4" > 
                                                    <label for="tMTPLeft4" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="TenderMtpLeft5" data-pos="11,11">
                                                    <input type="checkbox" id="tMTPLeft5" class="chkbox" onchange="calCount()"  name="Tender" value="tMTPLeft5" > 
                                                    <label for="tMTPLeft5" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check jc-na" data-target="SwollenNeck" data-pos="1,17">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenShoulderRight" data-pos="2,15">
                                                    <input type="checkbox" id="sShoulderRight" class="chkbox" onchange="calCount()"  name="Swollen" value="sShoulderRight" >
                                                    <label for="sShoulderRight" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenShoulderLeft" data-pos="2,19">
                                                    <input type="checkbox" id="sShoulderLeft" class="chkbox" onchange="calCount()"  name="Swollen" value="sShoulderLeft" >
                                                    <label for="sShoulderLeft" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenElbowRight" data-pos="3,15">
                                                    <input type="checkbox" id="sElbowRight" class="chkbox" onchange="calCount()"  name="Swollen" value="sElbowRight" > 
                                                    <label for="sElbowRight" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenElbowLeft" data-pos="3,19">
                                                    <input type="checkbox" id="sElbowLefft" class="chkbox" onchange="calCount()"  name="Swollen" value="sElbowLefft" > 
                                                    <label for="sElbowLefft" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenWristRight2" data-pos="4,15">
                                                    <input type="checkbox" id="sWristRight2" class="chkbox" onchange="calCount()"  name="Swollen" value="sWristRight2" > 
                                                    <label for="sWristRight2" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenWristRight1" data-pos="4,16">
                                                    <input type="checkbox" id="sWristRight1" class="chkbox" onchange="calCount()"  name="Swollen" value="sWristRight1" > 
                                                    <label for="sWristRight1" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenWristLeft2" data-pos="4,19">
                                                    <input type="checkbox" id="sWristLeft2" class="chkbox" onchange="calCount()"  name="Swollen" value="sWristLeft2" > 
                                                    <label for="sWristLeft2"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenWristLeft1" data-pos="4,18">
                                                    <input type="checkbox" id="sWristLeft1" class="chkbox" onchange="calCount()" name="Swollen" value="sWristLeft1" >
                                                    <label for="sWristLeft1"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMcpRight1" data-pos="5,16">
                                                    <input type="checkbox" id="sMCPRight1" class="chkbox" onchange="calCount()"  name="Swollen" value="sMCPRight1" >  
                                                    <label for="sMCPRight1"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMcpRight2" data-pos="5,15">
                                                    <input type="checkbox" id="sMCPRight2" class="chkbox" onchange="calCount()"  name="Swollen" value="sMCPRight2" > 
                                                    <label for="sMCPRight2"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMcpRight3" data-pos="5,14">
                                                    <input type="checkbox" id="sMCPRight3" class="chkbox" onchange="calCount()"  name="Swollen" value="sMCPRight3" >
                                                    <label for="sMCPRight3"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMcpRight4" data-pos="5,13">
                                                    <input type="checkbox" id="sMCPRight4" class="chkbox" onchange="calCount()"  name="Swollen" value="sMCPRight4" >
                                                    <label for="sMCPRight4"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMcpRight5" data-pos="5,12">
                                                    <input type="checkbox" id="sMCPRight5" class="chkbox" onchange="calCount()"  name="Swollen" value="sMCPRight5" > 
                                                    <label for="sMCPRight5"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMcpLeft1" data-pos="5,18">
                                                    <input type="checkbox" id="sMCPLeft1" class="chkbox" onchange="calCount()"  name="Swollen" value="sMCPLeft1" > 
                                                    <label for="sMCPLeft1"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMcpLeft2" data-pos="5,19">
                                                    <input type="checkbox" id="sMCPLeft2" class="chkbox" onchange="calCount()"  name="Swollen" value="sMCPLeft2" > 
                                                    <label for="sMCPLeft2"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMcpLeft3" data-pos="5,20">
                                                    <input type="checkbox" id="sMCPLeft3" class="chkbox" onchange="calCount()"  name="Swollen" value="sMCPLeft3" > 
                                                    <label for="sMCPLeft3"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMcpLeft4" data-pos="5,21">
                                                    <input type="checkbox" id="sMCPLeft4" class="chkbox" onchange="calCount()"  name="Swollen" value="sMCPLeft4" > 
                                                    <label for="sMCPLeft4"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMcpLeft5" data-pos="5,22">
                                                    <input type="checkbox" id="sMCPLeft5" class="chkbox" onchange="calCount()"  name="Swollen" value="sMCPLeft5" > 
                                                    <label for="sMCPLeft5"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenPipRight1" data-pos="6,16">
                                                    <input type="checkbox" id="sPIPRight1" class="chkbox" onchange="calCount()"  name="Swollen" value="sPIPRight1" > 
                                                    <label for="sPIPRight1"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenPipRight2" data-pos="6,15">
                                                    <input type="checkbox" id="sPIPRight2" class="chkbox" onchange="calCount()"  name="Swollen" value="sPIPRight2" >  
                                                    <label for="sPIPRight2"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenPipRight3" data-pos="6,14">
                                                    <input type="checkbox" id="sPIPRight3" class="chkbox" onchange="calCount()"  name="Swollen" value="sPIPRight3" > 
                                                    <label for="sPIPRight3"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenPipRight4" data-pos="6,13">
                                                    <input type="checkbox" id="sPIPRight4" class="chkbox" onchange="calCount()"  name="Swollen" value="sPIPRight4" > 
                                                    <label for="sPIPRight4"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenPipRight5" data-pos="6,12">
                                                    <input type="checkbox" id="sPIPRight5" class="chkbox" onchange="calCount()"  name="Swollen" value="sPIPRight5" > 
                                                    <label for="sPIPRight5"class="chk-label">&nbsp;</label> &nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenPipLeft1" data-pos="6,18">
                                                    <input type="checkbox" id="sPIPLeft1" class="chkbox" onchange="calCount()"  name="Swollen" value="sPIPLeft1" > 
                                                    <label for="sPIPLeft1"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenPipLeft2" data-pos="6,19">
                                                    <input type="checkbox" id="sPIPLeft2" class="chkbox" onchange="calCount()"  name="Swollen" value="sPIPLeft2" >  
                                                    <label for="sPIPLeft2"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenPipLeft3" data-pos="6,20">
                                                    <input type="checkbox" id="sPIPLeft3" class="chkbox" onchange="calCount()"  name="Swollen" value="sPIPLeft3" > 
                                                    <label for="sPIPLeft3"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenPipLeft4" data-pos="6,21">
                                                    <input type="checkbox" id="sPIPLeft4" class="chkbox" onchange="calCount()"  name="Swollen" value="sPIPLeft4" > 
                                                    <label for="sPIPLeft4"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenPipLeft5" data-pos="6,22">
                                                    <input type="checkbox" id="sPIPLeft5" class="chkbox" onchange="calCount()"  name="Swollen" value="sPIPLeft5" > 
                                                    <label for="sPIPLeft5"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenDipRight1" data-pos="7,15">
                                                    <input type="checkbox" id="sDIPRight1" class="chkbox" onchange="calCount()"  name="Swollen" value="sDIPRight1" > 
                                                    <label for="sDIPRight1"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenDipRight2" data-pos="7,14">
                                                    <input type="checkbox" id="sDIPRight2" class="chkbox" onchange="calCount()"  name="Swollen" value="sDIPRight2" > 
                                                    <label for="sDIPRight2"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenDipRight3" data-pos="7,13">
                                                    <input type="checkbox" id="sDIPRight3" class="chkbox" onchange="calCount()"  name="Swollen" value="sDIPRight3" > 
                                                    <label for="sDIPRight3"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenDipRight4" data-pos="7,12">
                                                    <input type="checkbox" id="sDIPRight4" class="chkbox" onchange="calCount()"  name="Swollen" value="sDIPRight4" > 
                                                    <label for="sDIPRight4"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenDipLeft1" data-pos="7,19">
                                                    <input type="checkbox" id="sDIPLeft1" class="chkbox" onchange="calCount()"  name="Swollen" value="sDIPLeft1" > 
                                                    <label for="sDIPLeft1"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenDipLeft2" data-pos="7,20">
                                                    <input type="checkbox" id="sDIPLeft2" class="chkbox" onchange="calCount()"  name="Swollen" value="sDIPLeft2" > 
                                                    <label for="sDIPLeft2"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenDipLeft3" data-pos="7,21">
                                                    <input type="checkbox" id="sDIPLeft3" class="chkbox" onchange="calCount()"  name="Swollen" value="sDIPLeft3" > 
                                                    <label for="sDIPLeft3"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenDipLeft4" data-pos="7,22">
                                                    <input type="checkbox" id="sDIPLeft4" class="chkbox" onchange="calCount()"  name="Swollen" value="sDIPLeft4" > 
                                                    <label for="sDIPLeft4"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check jc-na" data-target="SwollenHipRight" data-pos="8,16">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-check jc-na" data-target="SwollenHipLeft" data-pos="8,18">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenKneeRight" data-pos="9,16">
                                                    <input type="checkbox" id="sKneeRight" class="chkbox" onchange="calCount()"  name="Swollen" value="sKneeRight" > 
                                                    <label for="sKneeRight"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenKneeLeft" data-pos="9,18">
                                                    <input type="checkbox" id="sKneeLeft" class="chkbox" onchange="calCount()"  name="Swollen" value="sKneeLeft" > 
                                                    <label for="sKneeLeft"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenAnkleRight" data-pos="10,16">
                                                    <input type="checkbox" id="sAnkleRight" class="chkbox" onchange="calCount()"  name="Swollen" value="sAnkleRight" >
                                                    <label for="sAnkleRight"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenAnkleLeft" data-pos="10,18">
                                                    <input type="checkbox" id="sAnkleLeft" class="chkbox" onchange="calCount()"  name="Swollen" value="sAnkleLeft" > 
                                                    <label for="sAnkleLeft"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMtpRight1" data-pos="11,16">
                                                    <input type="checkbox" id="sMTPRight1" class="chkbox" onchange="calCount()"  name="Swollen" value="sMTPRight1" >
                                                    <label for="sMTPRight1" class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMtpRight2" data-pos="11,15">
                                                    <input type="checkbox" id="sMTPRight2" class="chkbox" onchange="calCount()"  name="Swollen" value="sMTPRight2" > 
                                                    <label for="sMTPRight2"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMtpRight3" data-pos="11,14">
                                                    <input type="checkbox" id="sMTPRight3" class="chkbox" onchange="calCount()"  name="Swollen" value="sMTPRight3" > 
                                                    <label for="sMTPRight3"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMtpRight4" data-pos="11,13">
                                                    <input type="checkbox" id="sMTPRight4" class="chkbox" onchange="calCount()"  name="Swollen" value="sMTPRight4" > 
                                                    <label for="sMTPRight4"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMtpRight5" data-pos="11,12">
                                                    <input type="checkbox" id="sMTPRight5" class="chkbox" onchange="calCount()"  name="Swollen" value="sMTPRight5" > 
                                                    <label for="sMTPRight5"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>

                                                <div class="jc-abs jc-check" data-target="SwollenMtpLeft1" data-pos="11,18">
                                                    <input type="checkbox" id="sMTPLeft1" class="chkbox" onchange="calCount()"  name="Swollen" value="sMTPLeft1" > 
                                                    <label for="sMTPLeft1"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMtpLeft2" data-pos="11,19">
                                                    <input type="checkbox" id="sMTPLeft2" class="chkbox" onchange="calCount()"  name="Swollen" value="sMTPLeft2" >  
                                                    <label for="sMTPLeft2"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMtpLeft3" data-pos="11,20">
                                                    <input type="checkbox" id="sMTPLeft3" class="chkbox" onchange="calCount()"  name="Swollen" value="sMTPLeft3" > 
                                                    <label for="sMTPLeft3"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMtpLeft4" data-pos="11,21">
                                                    <input type="checkbox" id="sMTPLeft4" class="chkbox" onchange="calCount()"  name="Swollen" value="sMTPLeft4" > 
                                                    <label for="sMTPLeft4"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>
                                                <div class="jc-abs jc-check" data-target="SwollenMtpLeft5" data-pos="11,22">
                                                    <input type="checkbox" id="sMTPLeft5" class="chkbox" onchange="calCount()"  name="Swollen" value="sMTPLeft5" > 
                                                    <label for="sMTPLeft5"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>

                                                <div class="jc-abs jc-check NA" data-target="NotJointsAffected" data-pos="m,d">
                                                    <input type="checkbox" id="nja" class="chkbox" onchange="calCount()"  name="nja" value="nja" > 
                                                    <label for="nja"class="chk-label">&nbsp;</label>&nbsp;
                                                </div>

                                                <div class="jc-abs jc-vguide" data-guide="TenderTrunk">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="TenderArmRight">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="TenderArmLeft">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="TenderForearmRight">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="TenderForearmLeft">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="TenderWristRight">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="TenderWristLeft">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="TenderThighRight">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="TenderThighLeft">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="TenderShinRight">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="TenderShinLeft">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-hguide" data-guide="TenderPelvis">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-hguide" data-guide="TenderCollars">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="TenderHandRight">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="TenderHandLeft">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="SwollenTrunk">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="SwollenArmRight">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="SwollenArmLeft">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="SwollenForearmRight">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="SwollenForearmLeft">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="SwollenWristRight">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="SwollenWristLeft">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="SwollenThighRight">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="SwollenThighLeft">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="SwollenShinRight">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-vguide" data-guide="SwollenShinLeft">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-hguide" data-guide="SwollenPelvis">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-hguide" data-guide="SwollenCollars">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="SwollenHandRight">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="SwollenHandLeft">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprTenderD1Left">
                                                    1
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprTenderD2Left">
                                                    2
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprTenderD3Left">
                                                    3
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprTenderD4Left">
                                                    4
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprTenderD5Left">
                                                    5
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprTenderD1Right">
                                                    1
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprTenderD2Right">
                                                    2
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprTenderD3Right">
                                                    3
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprTenderD4Right">
                                                    4
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprTenderD5Right">
                                                    5
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprSwollenD1Left">
                                                    1
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprSwollenD2Left">
                                                    2
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprSwollenD3Left">
                                                    3
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprSwollenD4Left">
                                                    4
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprSwollenD5Left">
                                                    5
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprSwollenD1Right">
                                                    1
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprSwollenD2Right">
                                                    2
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprSwollenD3Right">
                                                    3
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprSwollenD4Right">
                                                    4
                                                </div>
                                                <div class="jc-abs jc-label" data-label="UprSwollenD5Right">
                                                    5
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrTenderD1Left">
                                                    1
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrTenderD2Left">
                                                    2
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrTenderD3Left">
                                                    3
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrTenderD4Left">
                                                    4
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrTenderD5Left">
                                                    5
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrTenderD1Right">
                                                    1
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrTenderD2Right">
                                                    2
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrTenderD3Right">
                                                    3
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrTenderD4Right">
                                                    4
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrTenderD5Right">
                                                    5
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrSwollenD1Left">
                                                    1
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrSwollenD2Left">
                                                    2
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrSwollenD3Left">
                                                    3
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrSwollenD4Left">
                                                    4
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrSwollenD5Left">
                                                    5
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrSwollenD1Right">
                                                    1
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrSwollenD2Right">
                                                    2
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrSwollenD3Right">
                                                    3
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrSwollenD4Right">
                                                    4
                                                </div>
                                                <div class="jc-abs jc-label" data-label="LwrSwollenD5Right">
                                                    5
                                                </div>
                                                <div class="jc-ctr jc-label" data-label="Neck">
                                                    Neck
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="Neck">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-ctr jc-label" data-label="Shoulders">
                                                    Shoulders
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="Shoulders">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-ctr jc-label" data-label="Elbows">
                                                    Elbows
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="Elbows">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-ctr jc-label" data-label="Wrists">
                                                    Wrists
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="Wrists">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-ctr jc-label jc-mini" data-label="MCPs">
                                                    MCPs
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="MCPs">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-ctr jc-label jc-mini" data-label="PIPs">
                                                    PIPs
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="PIPs">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-ctr jc-label jc-mini" data-label="DIPs">
                                                    DIPs
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="DIPs">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-ctr jc-label" data-label="Hips">
                                                    Hips
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="Hips">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-ctr jc-label" data-label="Knees">
                                                    Knees
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="Knees">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-ctr jc-key" data-label="No Joints Affected" data-key="NJA">
                                                    No Joints Affected
                                                </div>
                                                <div class="jc-ctr jc-label" data-label="Ankles">
                                                    Ankles
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="Ankles">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-ctr jc-label jc-mini" data-label="MTPs">
                                                    MTPs
                                                </div>
                                                <div class="jc-abs jc-hguide jc-light" data-guide="MTPs">
                                                    &nbsp;
                                                </div>
                                                <div class="jc-abs jc-key" data-key="Tender">
                                                    Tender
                                                </div>
                                                <div class="jc-abs jc-key" data-key="Swollen">
                                                    Swollen
                                                </div>
                                                <div class="jc-abs jc-subkey" data-key="TenderRight">
                                                    Right
                                                </div>
                                                <div class="jc-abs jc-subkey" data-key="TenderLeft">
                                                    Left
                                                </div>
                                                <div class="jc-abs jc-subkey" data-key="SwollenRight">
                                                    Right
                                                </div>
                                                <div class="jc-abs jc-subkey" data-key="SwollenLeft">
                                                    Left
                                                </div>
                                                <div class="jc-count-box ui-corner-all ui-shadow" data-for="tender">
                                                    <div>
                                                        Tender
                                                    </div>
                                                    <div class="jc-count jc-value-tendercount" id="TenderCount">0</div>
                                                </div>
                                                <div class="jc-count-box ui-corner-all ui-shadow" data-for="swollen">
                                                    <div>
                                                        Swollen
                                                    </div>
                                                    <div class="jc-count jc-value-swollencount" id="SwollenCount">0</div>
                                                </div>
                                                <div class="jc-count-box ui-corner-all ui-shadow" data-for="esr">
                                                    <div>
                                                        DAS 28
                                                        <br>
                                                        3V ESR
                                                    </div><div class="jc-count jc-wideval jc-value-esr" id="dasesr">NA</div><div class="jc-count-error"></div>
                                                </div>
                                                <div class="jc-count-box ui-corner-all ui-shadow" data-for="crp">
                                                    <div>
                                                        DAS 28
                                                        <br>
                                                        3V CRP
                                                    </div><div class="jc-count jc-wideval jc-value-crp" id="dascrp">NA</div><div class="jc-count-error"></div>
                                                </div>
                                                <div class="jc-abs jc-hsep" id="numsep">
                                                    &nbsp;
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                    <span id="jcAfterSuccessMsg" class="panel-title"></span> 
                                </div>
                                <div class="panel-footer" style="height:50px;" id="jointBtnsDiv2">                                    
                                    <center>
                                        <button class="btn btn-primary" style="margin-top:-16px;" onclick="save()"><b>Save</b></button>&nbsp;
                                        <a href="javascript:clearAll()" style="font-size:18px;color:#357ebd;margin-left:20px;"><u><b>Clear</b></u></a>
                                    </center>                                     
                                </div><!-- panel-heading -->
                            </div>                         
                            <div id="priorAssessmentsDiv"></div>
                        </div><!-- Humanculus part ends -->                        
                        <!-- tab-pane -->



                        <!-- Lab form starts-->
                        <div class="tab-pane" id="labsDiv"></div>
                        <div class="tab-pane" id="physicianAssesmentDiv"></div>
                        <div class="tab-pane" id="outcomeMeasuresDiv"></div>
                        <div id="patientAssesmentDiv"></div>

                        <table style="width:100%;">
                            <tr><td><div id="medicationDiv"></div></td></tr>
                            <tr><td><div id="medCommentsDiv"></div></td></tr>
                            <tr><td><div id="PrescriptionQuestionsDiv"></div></td></tr>
                        </table>

                        <div id="reviewPatientHistoryDiv"></div>
                        <div id="priorAssessmentReport"></div>
                        <div id="completeExamDiv"></div>

                    </div><!-- contentpanel -->
                </div>
            </div><!-- mainwrapper -->
        </section>

    </body>
</html>
