<html>
    <%@include file="common.jsp"%>
    <body class="signin" onload="getReviseLabsDefaults()">
        <section>
            <div class="panel panel-signin" style="min-width:80%;max-width:100%;">

                <div class="panel-body">
                    <div class="tab-pane" id="labsDiv"><br>

                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <center><b><h4 class="panel-title">Labs</h4></b></center>
                            </div><!-- panel-heading -->

                            <!--panel body start-->
                            <div class="panel-body">
                                <center><span id="beforeLabsUpdateMsg1"></span></center>
                                <table class="table table-striped table-bordered responsive dataTable no-footer dtr-inline" role="grid">
                                    <tr>
                                        <td class="fields_f_td"><b>Labs Date</b></td>
                                        <td><div class="col-md-6"><input type="text" id="labsDate1" placeholder="mm/dd/yyyy" class="form-control col-sm-3" onblur="labsDate_blur1()"></div></td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label style="float: left;"><b>ESR</b></label>
                                            <div class="col-sm-7" style="float: left;">                                                    
                                                <select id="esrUnit1" class="form-control">
                                                    <option selected="selected">(mm/hr)</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="col-md-2">
                                                <div class="btn-group" data-toggle="buttons">
                                                    <button id="esrComparatorNaLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="esrComparatorNa1" name="esrComparator1" value="NA">
                                                        <label class="fa"><b>NA</b></label>
                                                    </button>                                                        
                                                    <button id="esrComparatorLessLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="esrComparatorLess1" name="esrComparator1" value="<">
                                                        <label class="fa fa-chevron-left"></label>
                                                    </button>
                                                    <button id="esrComparatorGreaterLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="esrComparatorGreater1" name="esrComparator1" value=">">
                                                        <label class="fa fa-chevron-right"></label>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-2"><input type="text" id="esrValue1" class="form-control"></div> 
                                            <div class="col-md-2"><input type="text" id="esrDate1" placeholder="mm/dd/yyyy" class="form-control"></div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label style="float: left;"><b>CRP</b></label>
                                            <div class="col-sm-7" style="float: left;">                                                    
                                                <select id="crpUnit1" class="form-control">
                                                    <option selected="selected">(mg/L)</option>
                                                    <option>(mg/dL)</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="col-md-2">
                                                <div class="btn-group" data-toggle="buttons">
                                                    <button id="crpComparatorNaLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="crpComparatorNa1" name="crpComparator1" value="NA">
                                                        <label class="fa"><b>NA</b></label>
                                                    </button>                                                        
                                                    <button id="crpComparatorLessLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="crpComparatorLess1" name="crpComparator1" value="<">
                                                        <label class="fa fa-chevron-left"></label>
                                                    </button>
                                                    <button id="crpComparatorGreaterLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="crpComparatorGreater1" name="crpComparator1" value=">">
                                                        <label class="fa fa-chevron-right"></label>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-md-2"><input type="text" id="crpValue1" class="form-control"></div>
                                            <div class="col-md-2"><input type="text" id="crpDate1" placeholder="mm/dd/yyyy" class="form-control"></div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><b>RF</b></td>
                                        <td>
                                            <div class="col-md-2">
                                                <div class="btn-group" data-toggle="buttons">
                                                    <button id="rfFlagNaLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="rfFlagNa1" name="rfFlag1" value="NA">
                                                        <label class="fa"><b>NA</b></label>
                                                    </button>
                                                    <button id="rfFlagNegativeLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="rfFlagNegative1" name="rfFlag1" value="-">
                                                        <label class="fa fa-minus"></label>
                                                    </button>
                                                    <button id="rfFlagPositiveLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="rfFlagPositive1" name="rfFlag1" value="+">
                                                        <label class="fa fa-plus"></label>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-md-2"><input type="text"id="rfValue1" class="form-control"></div>
                                            <div class="col-md-2"><input type="text" id="rfDate1" placeholder="mm/dd/yyyy" class="form-control"></div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><b>Anti-CCP</b></td>
                                        <td>
                                            <div class="col-md-2">
                                                <div class="btn-group" data-toggle="buttons">
                                                    <button id="anticcpFlagNaLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="anticcpFlagNa1" name="anticcpFlag1" value="NA">
                                                        <label class="fa"><b>NA</b></label>
                                                    </button>
                                                    <button id="anticcpFlagNegativeLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="anticcpFlagNegative1" name="anticcpFlag1" value="-">
                                                        <label class="fa fa-minus"></label>
                                                    </button>
                                                    <button id="anticcpFlagPositiveLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="anticcpFlagPositive1" name="anticcpFlag1" value="+">
                                                        <label class="fa fa-plus"></label>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-md-2"><input type="text"id="anticcpValue1" class="form-control"></div>
                                            <div class="col-md-2"><input type="text" id="anticcpDate1" placeholder="mm/dd/yyyy" class="form-control"></div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><b>Vectra-DA</b></td>
                                        <td>
                                            <div class="col-md-2">
                                                <div class="btn-group" data-toggle="buttons">
                                                    <button id="vectradaFlagNaLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="vectradaFlagNa1" name="vectradaFlag1" value="NA">
                                                        <label class="fa"><b>NA</b></label>
                                                    </button>
                                                    <button id="vectradaFlagNegativeLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="vectradaFlagNegative1" name="vectradaFlag1" value="-">
                                                        <label class="fa fa-minus"></label>
                                                    </button>
                                                    <button id="vectradaFlagPositiveLabel1" class="btn quest btn-default">
                                                        <input type="radio" id="vectradaFlagPositive1" name="vectradaFlag1" value="+">
                                                        <label class="fa fa-plus"></label>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-md-2"><input type="text" id="vectradaValue1" class="form-control"></div>
                                            <div class="col-md-2"><input type="text" id="vectradaDate1" placeholder="mm/dd/yyyy" class="form-control"></div>
                                        </td>
                                    </tr>
                                </table>
                                <center>
                                    <button class="btn btn-primary" onclick="reviseLabsBackBtn()">Back</button>
                                    <button id="labsSubmitButton1" class="btn btn-primary" onclick="labsSubmitData1()">Submit</button>
                                </center>
                                <center><span id="afterLabsUpdateMsg1"></span></center>
                            </div><!--panel body end-->

                        </div>
                    </div><!-- lab form ends -->                     
                </div><!-- panel-body -->

            </div><!-- panel -->
        </section>
    </body>
</html>