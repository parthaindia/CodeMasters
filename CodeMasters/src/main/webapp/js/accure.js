var n = 0;
var count = 1;
var pollTime = null;
var previous_poll_time = 0;
var trigger;

////onload twitter feed on dashboard
//function getStatusFromServer(uuid) {
//    pollTime = (new Date()).getTime();
//    $.get(server_base_url + "TweetServlet", {
//        uuid: uuid
//    }).done(function(data) {
//        $("#comment-area").text("");
//        $("#comment-area").append("<ul id='install_status_id_inner' />");
//        var m = 1;
//        $.each(data, function(index, value) {
//            $("#install_status_id_inner").append("<li id=twitter_row_" + index + "" + m + "/>");
//            $("#twitter_row_" + index + "" + m).append("<div class='comment-details' id='comment-details" + m + "' />");
//            $("#comment-details" + m + "").append("<div class='commnet-user' id='commnet-user" + m + "' />");
//            $("#commnet-user" + m + "").append("<img src='../images/img/user" + m + ".jpg' />");
//            $("#comment-details" + m + "").append("<div class='commnet-desc' id='commnet-desc" + m + "' />");
//            $("#commnet-desc" + m + "").append("<h3><a href='http://www.twitter.com/@" + value.user_screen_name + "' target='new'>" + value.user_screen_name + "</a></h3>");
//            $("#commnet-desc" + m + "").append("<p>" + value.text + "</p>");
//            $("#commnet-desc" + m + "").append("<div class='commnetTxt' id='commnetTxt" + m + "'/>");
//            $("#commnet-desc" + m + "").append("<div class='commnetTxt' id='commnetText" + m + "'/>");
//            $("#commnetTxt" + m + "").append("Sentiment:  " + value.sentiment + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #followers: " + value.user_follower_count + "</p>");
////            if (value.replied == "YES") {
////                $("#commnetText" + m + "").append("");
////            } else {
//            $("#commnetText" + m + "").append("<div id='container" + index + "0' />");
//            $("#container" + index + "0").append("<div id='clickpopup" + index + "0' class='click' onclick=popupwindow1('" + value.id + "','" + index + "') />");
//            $("#clickpopup" + index + "0").append("Reply");
////            }
//            $("#comment-details" + m + "").append("<div class='clear' />");
//            m++;
//        });
//    });
//}
//onload twitter feed on dashboard end
//onload facebook feed on dashboard
//function getStatusFromServerFB(uuid) {
//    pollTime = (new Date()).getTime();
//    $.get(server_base_url + "FaceBookRealtimeFeed", {
//        uuid: uuid
//    }).done(function(data) {
//        var docs = data.response.docs;
//        if (docs == null || docs == "") {
//            $("#comment-area_fb").text("");
//            $("#comment-area_fb").append("<ul id='install_status_id_inner_fb' />");
//            var m = 1;
//
//            $.each(data, function(index, value) {
//                $("#install_status_id_inner_fb").append("<li id=fb_row_" + index + "" + m + "/>");
//                $("#fb_row_" + index + "" + m).append("<div class='comment-details' id='comment-details_fb" + m + "' />");
//                $("#comment-details_fb" + m + "").append("<div class='commnet-user' id='commnet-user_fb" + m + "' />");
//                $("#commnet-user_fb" + m + "").append("<img src='../images/img/user" + m + ".jpg' />");
//                $("#comment-details_fb" + m + "").append("<div class='commnet-desc' id='commnet-desc_fb" + m + "' />");
//                $("#commnet-desc_fb" + m + "").append("<h3><a href='http://www.facebook.com/" + value.id + "' target='new'>" + value.username + "Date" + value.created_time + "</h3>");
//                $("#commnet-desc_fb" + m + "").append("<p>" + value.text + "</p>");
//                $("#commnet-desc_fb" + m + "").append("<div class='commnetTxt' id='commnetText_fb" + m + "'/>");
//                $("#commnet-desc_fb" + m + "").append("<div class='commnetTxt' id='commnetTxt_fb" + m + "'/>");
//                $("#commnet-desc_fb" + m + "").append("Sentiment:  " + value.sentiment + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date: " + value.created_time + "</p>");
////                if (value.replied == "YES") {
////                    $("#commnetTetx_fb" + m).append("");
////                } else {
//                $("#commnetText_fb" + m).append("<div id='fbcontainer" + index + "0' />");
//                $("#fbcontainer" + index + "0").append("<div id='fbclickpopup" + index + "0' class='click' onclick=popupwindow2('" + value.id + "','" + index + "') />");
//                $("#fbclickpopup" + index + "0").append("Reply");
//                // }
//
//                $("#comment-details_fb" + m + "").append("<div class='clear' />");
//                m++;
//            });
//        } else {
//            $("#comment-area_fb").text("");
//            $("#comment-area_fb").append("<ul id='install_status_id_inner_fb' />");
//            var m = 1;
//            $.each(docs, function(index, value) {
//                $("#install_status_id_inner_fb").append("<li id=fb_row_" + index + "" + m + "/>");
//                $("#fb_row_" + index + "" + m).append("<div class='comment-details' id='comment-details_fb" + m + "' />");
//                $("#comment-details_fb" + m + "").append("<div class='commnet-user' id='commnet-user_fb" + m + "' />");
//                $("#commnet-user_fb" + m + "").append("<img src='../images/img/user" + m + ".jpg' />");
//                $("#comment-details_fb" + m + "").append("<div class='commnet-desc' id='commnet-desc_fb" + m + "' />");
//                $("#commnet-desc_fb" + m + "").append("<h3><a href='http://www.facebook.com/" + value.id + "' target='new'>" + value.username + "</h3>");
//                $("#commnet-desc_fb" + m + "").append("<p>" + value.text + "</p>");
//                $("#commnet-desc_fb" + m + "").append("<div class='commnetTxt' id='commnetText_fb" + m + "'/>");
//                $("#commnet-desc_fb" + m + "").append("<div class='commnetTxt' id='commnetTxt_fb" + m + "'/>");
//                $("#commnetText_fb" + m + "").append("Sentiment:  " + value.sentiment + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date: " + value.created_time + "</p>");
//
//
//                $("#commnetText_fb" + m).append("<div id='fbcontainer" + index + "0' />");
//                $("#fbcontainer" + index + "0").append("<div id='fbclickpopup" + index + "0' class='click' onclick=popupwindow2('" + value.id + "','" + index + "') />");
//                $("#fbclickpopup" + index + "0").append("Reply");
//                $("#comment-details_fb" + m + "").append("<div class='clear' />");
//                m++;
//            });
//        }
//    });
//}
//onload facebook feed on dashboard end


//onload facebook feed on dashboard end

////onclick twitter feed on dashboard
//function getRealtimeTwitterFeed(keywords, uuid) {
//    $.get(server_base_url + "GetRealtimeTwitterFeedOnDemand", {
//        keywords: keywords,
//        uuid: uuid,
//        source: "twitter"
//    }).done(function(data) {
//        if (data == null || data == "Fail" || data == "") {
//            $("#comment-area").text("");
//            $("#comment-area_empty").text("").append("<center><div style='font-size:20px;color:#769954'>No search results found</div></center>");
//        } else {
//            $("#comment-area_empty").text("")
//            $("#comment-area").text("");
//            $("#comment-area").append("<ul id='install_status_id_inner' />");
//
//            $("#twitter_sentiment_analysis_pagination_id").text("").append("<input type='button' style='margin-left:10%;float:left;' name='endRows' value='< prev' class='btnnxt' onclick='getBackFeedTwitter()'>&nbsp;<input type='button' name='startRows' value='next >' class='btnnxt' style='margin-right: 10%;float:right;' onclick='getNextFeedTwitter()'>");
//
//            var m = 1;
//            $.each(data, function(index, value) {
//                $("#install_status_id_inner").append("<li id=twitter_row_" + index + "" + m + "/>");
//                $("#twitter_row_" + index + "" + m).append("<div class='comment-details' id='comment-details" + m + "' />");
//                $("#comment-details" + m + "").append("<div class='commnet-user' id='commnet-user" + m + "' />");
//                $("#commnet-user" + m + "").append("<img src='../images/img/user" + m + ".jpg' />");
//                $("#comment-details" + m + "").append("<div class='commnet-desc' id='commnet-desc" + m + "' />");
//                $("#commnet-desc" + m + "").append("<h3><a href='http://www.twitter.com/@" + value.user_screen_name + "' target='new'>" + value.user_screen_name + "</a></h3>");
//                $("#commnet-desc" + m + "").append("<p>" + value.text + "</p>");
//                $("#commnet-desc" + m + "").append("<div class='commnetTxt' id='commnetTxt" + m + "'/>");
//                $("#commnetTxt" + m + "").append("Sentiment:  " + value.sentiment + "</p>");
//                if (value.replied == "YES") {
//                    $("#commnetTxt" + m + "").append("");
//                } else {
//                    $("#commnetTxt" + m + "").append("<div id='container" + index + "0' />");
//                    $("#container" + index + "0").append("<div id='clickpopup" + index + "0' class='click' onclick=popupwindow1('" + value.id + "','" + index + "') />");
//                    $("#clickpopup" + index + "0").append("Reply");
//                }
//                $("#comment-details" + m + "").append("<div class='clear' />");
//                m++;
//            });
//        }
//    });
//}
////onclick twitter feed on dashboard end



////onclick fb feed on dashboard
//function getRealtimeFBFeed(keywords, uuid) {
//    $.get(server_base_url + "GetRealtimeFbFeedOnDemand", {
//        keywords: keywords,
//        uuid: uuid,
//        source: "fb"
//    }).done(function(data) {
//        var docs = data.response.docs;
//        if (docs == null || docs == "") {
//            $("#comment-area_fb").text("");
//            $("#comment-area_fb_empty").text("").append("<center><div style='font-size:20px;color:#769954'>No search results found</div></center>");
//        } else {
//            $("#comment-area_fb_empty").text("");
//            $("#comment-area_fb").text("");
//            $("#comment-area_fb").append("<ul id='install_status_id_inner_fb' />");
//
//            $("#fb_sentiment_analysis_pagination_id").text("").append("<input type = 'button' style='margin-left:10%;float:left;' name = 'endRows' value = '< prev' class = 'btnnxt' onclick = 'getBackFeedFb()'>&nbsp;<input type = 'button' style='margin-right:10%;float:right;' name = 'startRows' value = 'next >' class = 'btnnxt' onclick = 'getNextFeedFb()'>");
//
//            var m = 1;
//            $.each(docs, function(index, value) {
//                if (value.text == null || value.text == "" || value.username == null || value.username == "" || value.text == undefined || value.username == undefined) {
//                } else {
//                    $("#install_status_id_inner_fb").append("<li id=fb_row_" + index + "" + m + "/>");
//                    $("#fb_row_" + index + "" + m).append("<div class='comment-details' id='comment-details_fb" + m + "' />");
//                    $("#comment-details_fb" + m + "").append("<div class='commnet-user' id='commnet-user_fb" + m + "' />");
//                    $("#commnet-user_fb" + m + "").append("<img src='../images/img/user" + m + ".jpg' />");
//                    $("#comment-details_fb" + m + "").append("<div class='commnet-desc' id='commnet-desc_fb" + m + "' />");
//                    $("#commnet-desc_fb" + m + "").append("<h3><a href='http://www.facebook.com/" + value.id + "' target='new'>" + value.username + "</h3>");
//                    $("#commnet-desc_fb" + m + "").append("<p>" + value.text + "</p>");
//                    $("#commnet-desc_fb" + m + "").append("<div class='commnetTxt' id='commnetTxt_fb" + m + "'/>");
//                    $("#commnetTxt_fb" + m + "").append("Sentiment:  " + value.sentiment + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #followers: " + value.user_follower_count + "</p>");
////                if (value.replied == "YES") {
////                    $("#commnetTxt_fb" + m).append("");
////                } else {
////                    $("#commnetTxt_fb" + m).append("<div id='fbcontainer" + index + "0' />");
////                    $("#fbcontainer" + index + "0").append("<div id='fbclickpopup" + index + "0' class='click' onclick=popupwindow2('" + value.id + "','" + index + "') />");
////                    $("#fbclickpopup" + index + "0").append("Reply");
////                }
//
//                    $("#commnetTxt_fb" + m).append("<div id='fbcontainer" + index + "0' />");
//                    $("#fbcontainer" + index + "0").append("<div id='fbclickpopup" + index + "0' class='click' onclick=popupwindow2('" + value.id + "','" + index + "','" + value.username.replace(/\s/g, '') + "') / > ");
//                    $("#fbclickpopup" + index + "0").append("Reply");
//                    $("#comment-details_fb" + m + "").append("<div class='clear' />");
//                    m++;
//                }
//            });
//        }
//    });
//}


//news feed
//function getStatusFromServerNews(uuid) {
//    pollTime = (new Date()).getTime();
//    $.get(server_base_url + "NewsRealtimeFeed", {
//        uuid: uuid
//    }).done(function(data) {
//        //value.__metadata.Title
//        var docs = data.d.results;
//        $("#comment-area_news").text("");
//        $("#comment-area_news").append("<ul id='install_status_id_inner_news' />");
//        var m = 0;
//        $.each(docs, function(index, value) {
//
//            $("#install_status_id_inner_news").append("<li id=news_row_" + index + "" + m + "/>");
//            $("#news_row_" + index + "" + m).append("<div class='comment-details' id='comment-details_news" + m + "' />");
//            $("#comment-details_news" + m + "").append("<div class='commnet-user' id='commnet-user_news" + m + "' />");
//            $("#commnet-user_news" + m + "").append("<img src='../images/img/user" + (m % 10 + 1) + ".jpg' />");
//            $("#comment-details_news" + m + "").append("<div class='commnet-desc' id='commnet-desc_news" + m + "' />");
//            $("#commnet-desc_news" + m + "").append("<h3><a href=" + value.Url + ">" + value.Title + "</h3>");
//            $("#commnet-desc_news" + m + "").append("<p>" + value.Description + "</p>");
//            $("#commnet-desc_news" + m + "").append("<div class='commnetTxt' id='commnetTxt_news" + m + "'/>");
//            $("#commnetTxt_news" + m + "").append("Date:  " + value.Date + "&nbsp;&nbsp;&nbsp;Source: " + value.Source + "</p>");
//            $("#comment-details_news" + m + "").append("<div class='clear' />");
//            m++;
//
//        });
//    });
//}


//onload twitter feed on dashboard
function getStatusFromServer(uuid) {
    pollTime = (new Date()).getTime();
    $.get(server_base_url + "TweetServlet", {
        uuid: uuid, compare_kws: getUserSessionElement("compare_kws")
    }).done(function(data) {
        if (data == null || data == "Fail" || data == "") {
            $("#twitterFeedDisplayDivId").text("").append("<center><span style='font-size:20px;color:brown;'>No search results found</span></center>");
        } else {
            $("#twitterFeedDisplayDivId").text("").append("<div id = 'twitterFeedDisplaySubDiv' class = 'panel panel-success-head' />");
            $("#twitterFeedDisplaySubDiv").append("<div class='panel-heading' style='height:30px;' id='twitterFeedDisplaySubDivHeading' />");

            //heading start
            $("#twitterFeedDisplaySubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Twitter Feed</b></h3></center>");
            $("#twitterFeedDisplaySubDiv").append("<table id='twitterFeedDisplayTableId' class='table table-striped table-bordered' />");
            $("#twitterFeedDisplayTableId").text("").append("<thead class=''><tr><th><center>Please click here to sort</center></th></thead>");
            $("#twitterFeedDisplayTableId").append("<tbody id='twitterFeedDisplayTableBodyId' />");
            $("#twitterFeedDisplayTableBodyId").text("");

            $.each(data, function(index, value) {
                $("#twitterFeedDisplayTableBodyId").append("<tr id='twitterFeedDisplayRowId" + index + "' />");
                var name = "<a href='http://www.twitter.com/@" + value.user_screen_name + "' target='new' style='font-size:20px;font-weight:700;'>" + value.user_screen_name + "</a><br />";
                var text = "<span title=" + value.text + ">" + value.text + "</span><br />";
                var sent = "<span style='font-size:18px;color:#7182e5;'>Sentiment : " + value.sentiment + "</span><br />";
                var followers = "<span style='font-size:18px;color:#7182e5;'>#Followers : " + value.user_follower_count + "</span>";
                var replyStatus = "";
                if (value.replied == "YES") {
                    replyStatus = "<span style='font-size:18px;color:#5cb85c;float:right;'>Replied</span>";
                } else {
                    replyStatus = "<a href='#' style='font-size:18px;float:right;'>Reply</a>";
                }
                $("#twitterFeedDisplayRowId" + index).text("").append("<td>" + name + text + sent + followers + replyStatus + "</td>");
            });

            var shTable = jQuery('#twitterFeedDisplayTableId').DataTable({
                "fnDrawCallback": function(oSettings) {
                    jQuery('#twitterFeedDisplayTableId ul').addClass('pagination-active-dark');
                },
                lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
                responsive: true
            });
            jQuery('div.dataTables_length select').removeClass('form-control input-sm');
            jQuery('div.dataTables_length select').css({width: '60px'});
            jQuery('div.dataTables_length select').select2({
                minimumResultsForSearch: -1
            });
//            $("div#twitterFeedDisplayTableId_filter").find("label").text("").append('<input type="search" class="form-control input-sm" placeholder="Search" aria-controls="twitterFeedDisplayTableId" style="padding-right:8px;">');
        }
    });
}

//onload fb feed on dashboard
function getStatusFromServerFB(uuid) {
    pollTime = (new Date()).getTime();
    $.get(server_base_url + "FaceBookRealtimeFeed", {
        uuid: uuid, compare_kws: getUserSessionElement("compare_kws")
    }).done(function(data) {
        if (data == null || data == "Fail" || data == "") {
            $("#facebookFeedDisplayDivId").text("").append("<center><span style='font-size:20px;color:brown;'>No search results found</span></center>");
        } else {
            var docs = data.response.docs;
            $("#facebookFeedDisplayDivId").text("").append("<div id='facebookFeedDisplaySubDiv' class = 'panel panel-primary-head' />");
            $("#facebookFeedDisplaySubDiv").append("<div class='panel-heading' style='height:30px;' id='facebookFeedDisplaySubDivHeading' />");

            //heading start
            $("#facebookFeedDisplaySubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Facebook Feed</b></h3></center>");
            $("#facebookFeedDisplaySubDiv").append("<table id='facebookFeedDisplayTableId' class='table table-striped table-bordered' />");
            $("#facebookFeedDisplayTableId").text("").append("<thead class=''><tr><th><center>Please click here to sort</center></th></thead>");
            $("#facebookFeedDisplayTableId").append("<tbody id='facebookFeedDisplayTableBodyId' />");
            $("#facebookFeedDisplayTableBodyId").text("");

            $.each(docs, function(index, value) {
                if (value.text == null || value.text == "" || value.username == null || value.username == "" || value.text == undefined || value.username == undefined) {
                } else {
                    $("#facebookFeedDisplayTableBodyId").append("<tr id='facebookFeedDisplayRowId" + index + "' />");
                    var name = "<a href='http://www.facebook.com/" + value.id + "' target='new' style='font-size:20px;font-weight:700;'>" + value.username + "</a><br />";
                    var text = "<span title=" + value.text + ">" + value.text + "</span><br />";
                    var sent = "<span style='font-size:18px;color:#7182e5;'>Sentiment : " + value.sentiment + "</span><br />";
                    var date = "<span style='font-size:18px;color:#7182e5;'>Date : " + value.created_time + "</span>";
                    var replyStatus = "<a href='#' style='font-size:18px;float:right;'>Reply</a>";
                    $("#facebookFeedDisplayRowId" + index).text("").append("<td>" + name + text + sent + date + replyStatus + "</td>");
                }
            });

            var shTable = jQuery('#facebookFeedDisplayTableId').DataTable({
                "fnDrawCallback": function(oSettings) {
                    jQuery('#facebookFeedDisplayTableId ul').addClass('pagination-active-dark');
                },
                lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
                responsive: false
            });
            jQuery('div.dataTables_length select').removeClass('form-control input-sm');
            jQuery('div.dataTables_length select').css({width: '60px'});
            jQuery('div.dataTables_length select').select2({
                minimumResultsForSearch: -1
            });
//            $("div#facebookFeedDisplayTableId_filter").find("label").text("").append('<input type="search" class="form-control input-sm" placeholder="Search" aria-controls="twitterFeedDisplayTableId" style="padding-right:8px;">');
        }
    });
}

//onclick twitter feed on dashboard
function getRealtimeTwitterFeed(keywords, uuid) {
    $.get(server_base_url + "GetRealtimeTwitterFeedOnDemand", {
        keywords: keywords, uuid: uuid, source: "twitter"
    }).done(function(data) {
        if (data == null || data == "Fail" || data == "") {
            $("#twitterFeedDisplayDivId").text("").append("<center><span style='font-size:20px;color:brown;'>No search results found</span></center>");
        } else {
            $("#twitterFeedDisplayDivId").text("").append("<div id = 'twitterFeedDisplaySubDiv' class = 'panel panel-success-head' />");
            $("#twitterFeedDisplaySubDiv").append("<div class='panel-heading' style='height:30px;' id='twitterFeedDisplaySubDivHeading' />");

            //heading start
            $("#twitterFeedDisplaySubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Twitter Feed</b></h3></center>");
            $("#twitterFeedDisplaySubDiv").append("<table id='twitterFeedDisplayTableId' class='table table-striped table-bordered' />");
            $("#twitterFeedDisplayTableId").text("").append("<thead class=''><tr><th><center>Please click here to sort</center></th></thead>");
            $("#twitterFeedDisplayTableId").append("<tbody id='twitterFeedDisplayTableBodyId' />");
            $("#twitterFeedDisplayTableBodyId").text("");

            $.each(data, function(index, value) {
                $("#twitterFeedDisplayTableBodyId").append("<tr id='twitterFeedDisplayRowId" + index + "' />");
                var name = "<a href='http://www.twitter.com/@" + value.user_screen_name + "' target='new' style='font-size:20px;font-weight:700;'>" + value.user_screen_name + "</a><br />";
                var text = "<span title=" + value.text + ">" + value.text + "</span><br />";
                var sent = "<span style='font-size:18px;color:#7182e5;'>Sentiment : " + value.sentiment + "</span><br />";
                var followers = "<span style='font-size:18px;color:#7182e5;'>#Followers : " + value.user_follower_count + "</span>";
                var replyStatus = "";
                if (value.replied == "YES") {
                    replyStatus = "<span style='font-size:18px;color:#5cb85c;float:right;'>Replied</span>";
                } else {
                    replyStatus = "<a href='#' style='font-size:18px;float:right;'>Reply</a>";
                }
                $("#twitterFeedDisplayRowId" + index).text("").append("<td>" + name + text + sent + followers + replyStatus + "</td>");
            });

            var shTable = jQuery('#twitterFeedDisplayTableId').DataTable({
                "fnDrawCallback": function(oSettings) {
                    jQuery('#twitterFeedDisplayTableId ul').addClass('pagination-active-dark');
                },
                lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
                responsive: false
            });
            jQuery('div.dataTables_length select').removeClass('form-control input-sm');
            jQuery('div.dataTables_length select').css({width: '60px'});
            jQuery('div.dataTables_length select').select2({
                minimumResultsForSearch: -1
            });
//            $("div#twitterFeedDisplayTableId_filter").find("label").text("").append('<input type="search" class="form-control input-sm" placeholder="Search" aria-controls="twitterFeedDisplayTableId" style="padding-right:8px;">');
        }
    });
}
//onclick twitter feed on dashboard end

//onclick fb feed on dashboard
function getRealtimeFBFeed(keywords, uuid) {
    $.get(server_base_url + "GetRealtimeFbFeedOnDemand", {
        keywords: keywords, uuid: uuid, source: "fb"
    }).done(function(data) {
        if (data == null || data == "Fail" || data == "") {
            $("#facebookFeedDisplayDivId").text("").append("<center><span style='font-size:20px;color:brown;'>No search results found</span></center>");
        } else {
            var docs = data.response.docs;
            $("#facebookFeedDisplayDivId").text("").append("<div id='facebookFeedDisplaySubDiv' class = 'panel panel-primary-head' />");
            $("#facebookFeedDisplaySubDiv").append("<div class='panel-heading' style='height:30px;' id='facebookFeedDisplaySubDivHeading' />");

            //heading start
            $("#facebookFeedDisplaySubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Facebook Feed</b></h3></center>");
            $("#facebookFeedDisplaySubDiv").append("<table id='facebookFeedDisplayTableId' class='table table-striped table-bordered' />");
            $("#facebookFeedDisplayTableId").text("").append("<thead class=''><tr><th><center>Please click here to sort</center></th></thead>");
            $("#facebookFeedDisplayTableId").append("<tbody id='facebookFeedDisplayTableBodyId' />");
            $("#facebookFeedDisplayTableBodyId").text("");

            $.each(docs, function(index, value) {
                if (value.text == null || value.text == "" || value.username == null || value.username == "" || value.text == undefined || value.username == undefined) {
                } else {
                    $("#facebookFeedDisplayTableBodyId").append("<tr id='facebookFeedDisplayRowId" + index + "' />");
                    var name = "<a href='http://www.facebook.com/" + value.id + "' target='new' style='font-size:20px;font-weight:700;'>" + value.username + "</a><br />";
                    var text = "<span title=" + value.text + ">" + value.text + "</span><br />";
                    var sent = "<span style='font-size:18px;color:#7182e5;'>Sentiment : " + value.sentiment + "</span><br />";
                    var date = "<span style='font-size:18px;color:#7182e5;'>Date : " + value.created_time + "</span>";
                    var replyStatus = "<a href='#' style='font-size:18px;float:right;'>Reply</a>";
                    $("#facebookFeedDisplayRowId" + index).text("").append("<td>" + name + text + sent + date + replyStatus + "</td>");
                }
            });

            var shTable = jQuery('#facebookFeedDisplayTableId').DataTable({
                "fnDrawCallback": function(oSettings) {
                    jQuery('#facebookFeedDisplayTableId ul').addClass('pagination-active-dark');
                },
                lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
                responsive: false
            });
            jQuery('div.dataTables_length select').removeClass('form-control input-sm');
            jQuery('div.dataTables_length select').css({width: '60px'});
            jQuery('div.dataTables_length select').select2({
                minimumResultsForSearch: -1
            });
//            $("div#facebookFeedDisplayTableId_filter").find("label").text("").append('<input type="search" class="form-control input-sm" placeholder="Search" aria-controls="twitterFeedDisplayTableId" style="padding-right:8px;">');
        }
    });
}

//news feed
function getStatusFromServerNews(uuid) {
    pollTime = (new Date()).getTime();
    $.get(server_base_url + "NewsRealtimeFeed", {
        uuid: uuid, news_search: getUserSessionElement("news_search"), company_name: getUserSessionElement("company_name")
    }).done(function(data) {
        if (data == null || data == "Fail" || data == "") {
            $("#newsFeedDisplayDivId").text("").append("<center><span style='font-size:20px;color:brown;'>No search results found</span></center>");
        } else {
            var docs = data.d.results;
            $("#newsFeedDisplayDivId").text("").append("<div id='newsFeedDisplaySubDiv' class = 'panel panel-warning-head' />");
            $("#newsFeedDisplaySubDiv").append("<div class='panel-heading' style='height:30px;' id='newsFeedDisplaySubDivHeading' />");

            //heading start
            $("#newsFeedDisplaySubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>News Feed</b></h3></center>");
            $("#newsFeedDisplaySubDiv").append("<table id='newsFeedDisplayTableId' class='table table-striped table-bordered' />");
            $("#newsFeedDisplayTableId").text("").append("<thead class=''><tr><th><center>Please click here to sort</center></th></thead>");
            $("#newsFeedDisplayTableId").append("<tbody id='newsFeedDisplayTableBodyId' />");
            $("#newsFeedDisplayTableBodyId").text("");

            $.each(docs, function(index, value) {
                $("#newsFeedDisplayTableBodyId").append("<tr id='newsFeedDisplayRowId" + index + "' />");
                var name = "<a href='" + value.Url + "' target='new' style='font-size:20px;font-weight:700;'>" + value.Title + "</a><br />";
                var text = "<span title=" + value.Description + ">" + value.Description + "</span><br />";
                var date = "<span style='font-size:18px;color:#7182e5;'>Date : " + value.Date + "</span><br />";
                var source = "<span style='font-size:18px;color:#7182e5;'>Source : " + value.Source + "</span>";
                $("#newsFeedDisplayRowId" + index).text("").append("<td>" + name + text + date + source + "</td>");
            });

            var shTable = jQuery('#newsFeedDisplayTableId').DataTable({
                "fnDrawCallback": function(oSettings) {
                    jQuery('#newsFeedDisplayTableId ul').addClass('pagination-active-dark');
                },
                lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
                responsive: false
            });
            jQuery('div.dataTables_length select').removeClass('form-control input-sm');
            jQuery('div.dataTables_length select').css({width: '60px'});
            jQuery('div.dataTables_length select').select2({
                minimumResultsForSearch: -1
            });
//            $("div#newsFeedDisplayTableId_filter").find("label").text("").append('<input type="search" class="form-control input-sm" placeholder="Search" aria-controls="twitterFeedDisplayTableId" style="padding-right:8px;">');
        }
    });
}

function getFBStat(uuid) {
    $.get(server_base_url + "FBStatService", {
        uuid: uuid
    }).done(function(data) {
        if (data == null || data == "Fail" || data == "") {
            $("#facebookPagesFeedDisplayDivId").text("").append("<center><div style='font-size:20px;color:brown;'>No Facebook Page Found</div></center>");
        } else {
            $("#facebookPagesFeedDisplayDivId").text("").append("<div id='facebookPagesFeedDisplaySubDiv' class = 'panel panel-warning-head' />");
            $("#facebookPagesFeedDisplaySubDiv").append("<div class='panel-heading' style='height:30px;' id='facebookPagesFeedDisplaySubDivHeading' />");

            //heading start
            $("#facebookPagesFeedDisplaySubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>Facebook Page Analysis</b></h3></center>");
            $("#facebookPagesFeedDisplaySubDiv").append("<table id='facebookPagesFeedDisplayTableId' class='table table-striped table-bordered' />");
            $("#facebookPagesFeedDisplayTableId").text("").append("<thead class=''><tr><th><center>Please click here to sort</center></th></thead>");
            $("#facebookPagesFeedDisplayTableId").append("<tbody id='facebookPagesFeedDisplayTableBodyId' />");
            $("#facebookPagesFeedDisplayTableBodyId").text("");

            $.each(data, function(index, value) {
                $("#facebookPagesFeedDisplayTableBodyId").append("<tr id='facebookPagesFeedDisplayRowId" + index + "' />");
                var name = "<a href='http://facebook.com/" + value.pageid + "' target='new' style='font-size:20px;font-weight:700;'>" + value.pagename + "</a><br />";
                var likes = "<span style='font-size:18px;color:#7182e5;'>Likes : " + value.pagelikes + "</span><br />";
                var posts = "<span style='font-size:18px;color:#7182e5;'>Posts : " + value.pageposts + "</span>";
                $("#facebookPagesFeedDisplayRowId" + index).text("").append("<td>" + name + likes + posts + "</td>");
            });
            var shTable = jQuery('#facebookPagesFeedDisplayTableId').DataTable({
                "fnDrawCallback": function(oSettings) {
                    jQuery('#facebookPagesFeedDisplayTableId ul').addClass('pagination-active-dark');
                },
                lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
                responsive: false
            });
            jQuery('div.dataTables_length select').removeClass('form-control input-sm');
            jQuery('div.dataTables_length select').css({width: '60px'});
            jQuery('div.dataTables_length select').select2({
                minimumResultsForSearch: -1
            });
//            $("div#newsFeedDisplayTableId_filter").find("label").text("").append('<input type="search" class="form-control input-sm" placeholder="Search" aria-controls="twitterFeedDisplayTableId" style="padding-right:8px;">');
        }
    });
}



//function getFBStat(uuid) {
//    $.get(server_base_url + "FBStatService", {
//        uuid: uuid
//    }).done(function(data) {
//        $.each(data, function(index, value) {
//            if (data == null || data == "Fail" || data == "") {
//                $("#stat-area").text("");
//                $("#stat-area_empty").text("").append("<center><div style='font-size:20px;color:#769954'>No Facebook Page Found</div></center>");
//            } else {
//                $("#stat-area_empty").text("")
//                $("#stat-area").text("");
//                $("#stat-area").append("<ul id='fb_stat_inner' />");
//
//                // $("#twitter_sentiment_analysis_pagination_id").text("").append("<input type='button' style='margin-left:10%;float:left;' name='endRows' value='< prev' class='btnnxt' onclick='getBackFeedTwitter()'>&nbsp;<input type='button' name='startRows' value='next >' class='btnnxt' style='margin-right: 10%;float:right;' onclick='getNextFeedTwitter()'>");
//
//                var m = 1;
//                $("#fb_stat_inner").append("<table id=stat_tbl  class='comment-area' style='width:100%;'>");
//                $("#stat_tbl").append("<tr id=stat_tr style='height:50px'>");
//                $("#stat_tr").append("<td id=stat_td1>");
//                $("#stat_td1").append("<h3>Page Name</h3>");
//                $("#stat_tr").append("<td id=stat_td2>");
//                $("#stat_td2").append("<h3>Page Likes</h3>");
//                $("#stat_tr").append("<td id=stat_td3>");
//                $("#stat_td3").append("<h3>Page Posts</h3>");
//                $.each(data, function(index, value) {
//
//                    $("#stat_tbl").append("<tr id=stat_tr" + m + " class='comment-area' style='height:40px; margin-top:30px;'>");
//
//                    $("#stat_tr" + m).append("<td id=stat_td1" + m + ">");
//                    $("#stat_td1" + m).append(m + ". " + "<a target=_blank href='http://facebook.com/" + value.pageid + "'>" + value.pagename + "</a>")
//                    $("#stat_tr" + m).append("<td id=stat_td2" + m + ">");
//                    $("#stat_td2" + m).text(value.pagelikes);
//                    $("#stat_tr" + m).append("<td id=stat_td3" + m + ">");
//                    $("#stat_td3" + m).text(value.pageposts);
//
//                    m++;
//                });
//            }
//        });
//    });
//}


////onclick fb feed on dashboard
//function getRealtimeFBFeed(keywords, uuid) {
//    $.get(server_base_url + "GetRealtimeFbFeedOnDemand", {
//        keywords: keywords,
//        uuid: uuid,
//        source: "fb"
//    }).done(function(data) {
////        $.each(data, function(index, value) {
//////            alert(index+"\t"+value);
////            if (index > 10) {
////                $("#facebookfeedcount").text("").text("5/" + index);
////            } else {
////                $("#facebookfeedcount").text("").text(index + "/" + index);
////                $("#comment-area_fb").text("");
////            }
////            var datafeed = value;
//////            alert(datafeed.response);
////            if(datafeed.response == undefined){
////                $("#facebookfeedcount").text("");
////                $("#comment-area_fb_empty").text("").append("<center><div style='font-size:20px;color:#769954'>No Data Available</div></center>");
////            }
//        if (data == "Fail" || data == "") {
//            $("#comment-area_fb").text("");
//            $("#comment-area_fb_empty").text("").append("<center><div style='font-size:20px;color:#769954'>No Data Available</div></center>");
//        } else {
//            if (data == null || data == "" || data == "[]") {
//                $("#comment-area_fb").text("");
//                $("#comment-area_fb_empty").text("").append("<center><div style='font-size:20px;color:#769954'>No Data Available</div></center>");
//            } else {
//                $("#comment-area_fb_empty").text("")
//                $("#comment-area_fb").text("");
//                $("#comment-area_fb").append("<ul id='install_status_id_inner_fb' />");
//
//                $("#fb_sentiment_analysis_pagination_id").text("").append("<input type = 'button' style='margin-left:10%;float:left;' name = 'endRows' value = '< prev' class = 'btnnxt' onclick = 'getBackFeedFb()'>&nbsp;<input type = 'button' style='margin-right:10%;float:right;' name = 'startRows' value = 'next >' class = 'btnnxt' onclick = 'getNextFeedFb()'>");
//
//                var m = 1;
//                $.each(data, function(index, value) {
//                    $("#install_status_id_inner_fb").append("<li id=fb_row_" + index + "" + m + "/>");
//                    $("#fb_row_" + index + "" + m).append("<div class='comment-details' id='comment-details_fb" + m + "' />");
//                    $("#comment-details_fb" + m + "").append("<div class='commnet-user' id='commnet-user_fb" + m + "' />");
//                    $("#commnet-user_fb" + m + "").append("<img src='../images/img/user" + m + ".jpg' />");
//                    $("#comment-details_fb" + m + "").append("<div class='commnet-desc' id='commnet-desc_fb" + m + "' />");
//                    $("#commnet-desc_fb" + m + "").append("<h3><a href='http://www.facebook.com/" + value.user_screen_name + "' target='new'>" + value.user_screen_name + "</h3>");
//                    $("#commnet-desc_fb" + m + "").append("<p>" + value.text + "</p>");
//                    $("#commnet-desc_fb" + m + "").append("<div class='commnetTxt' id='commnetTxt_fb" + m + "'/>");
//                    $("#commnetTxt_fb" + m + "").append("Sentiment:  " + value.sentiment + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #followers: " + value.user_follower_count + "</p>");
//                    if (value.replied == "YES") {
//                        $("#commnetTxt_fb" + m).append("");
//                    } else {
//                        $("#commnetTxt_fb" + m).append("<div id='fbcontainer" + index + "0' />");
//                        $("#fbcontainer" + index + "0").append("<div id='fbclickpopup" + index + "0' class='click' onclick=popupwindow2('" + value.id + "','" + index + "') />");
//                        $("#fbclickpopup" + index + "0").append("Reply");
//                    }
//                    $("#comment-details_fb" + m + "").append("<div class='clear' />");
//                    m++;
//                });
//            }
//        }
////        var docs = data.response.docs;
////        alert(docs);
////        if (docs != null || docs != "" || docs != "[]") {
////            if (docs == null || docs == "" || docs == "[]") {
////                $("#comment-area_fb").text("");
////                $("#comment-area_fb_empty").text("").append("<center><div style='font-size:20px;color:#769954'>No Data Available</div></center>");
////            } else {
////                $("#comment-area_fb_empty").text("")
////                $("#comment-area_fb").text("");
////                $("#comment-area_fb").append("<ul id='install_status_id_inner_fb' />");
////
////                $("#fb_sentiment_analysis_pagination_id").text("").append("<input type = 'button' style='margin-left:10%;float:left;' name = 'endRows' value = '< prev' class = 'btnnxt' onclick = 'getBackFeedFb()'>&nbsp;<input type = 'button' style='margin-right:10%;float:right;' name = 'startRows' value = 'next >' class = 'btnnxt' onclick = 'getNextFeedFb()'>");
////
////                var m = 1;
////                $.each(docs, function(index, value) {
////                    $("#install_status_id_inner_fb").append("<li id=fb_row_" + index + "" + m + "/>");
////                    $("#fb_row_" + index + "" + m).append("<div class='comment-details' id='comment-details_fb" + m + "' />");
////                    $("#comment-details_fb" + m + "").append("<div class='commnet-user' id='commnet-user_fb" + m + "' />");
////                    $("#commnet-user_fb" + m + "").append("<img src='../images/img/user" + m + ".jpg' />");
////                    $("#comment-details_fb" + m + "").append("<div class='commnet-desc' id='commnet-desc_fb" + m + "' />");
////                    $("#commnet-desc_fb" + m + "").append("<h3><a href='http://www.facebook.com/" + value.id + "' target='new'>" + value.username + "</h3>");
////                    $("#commnet-desc_fb" + m + "").append("<p>" + value.text + "</p>");
////                    $("#commnet-desc_fb" + m + "").append("<div class='commnetTxt' id='commnetTxt_fb" + m + "'/>");
////                    $("#commnetTxt_fb" + m + "").append("Sentiment:  " + value.sentiment + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #followers: " + value.user_follower_count + "</p>");
////                    if (value.replied == "YES") {
////                        $("#commnetTxt_fb" + m).append("");
////                    } else {
////                        $("#commnetTxt_fb" + m).append("<div id='fbcontainer" + index + "0' />");
////                        $("#fbcontainer" + index + "0").append("<div id='fbclickpopup" + index + "0' class='click' onclick=popupwindow2('" + value.id + "','" + index + "') />");
////                        $("#fbclickpopup" + index + "0").append("Reply");
////                    }
////                    $("#comment-details_fb" + m + "").append("<div class='clear' />");
////                    m++;
////                });
////            }
////        } else {
////            if (data == null || data == "" || data == "[]") {
////                $("#comment-area_fb").text("");
////                $("#comment-area_fb_empty").text("").append("<center><div style='font-size:20px;color:#769954'>No Data Available</div></center>");
////            } else {
////                $("#comment-area_fb_empty").text("")
////                $("#comment-area_fb").text("");
////                $("#comment-area_fb").append("<ul id='install_status_id_inner_fb' />");
////
////                $("#fb_sentiment_analysis_pagination_id").text("").append("<input type = 'button' style='margin-left:10%;float:left;' name = 'endRows' value = '< prev' class = 'btnnxt' onclick = 'getBackFeedFb()'>&nbsp;<input type = 'button' style='margin-right:10%;float:right;' name = 'startRows' value = 'next >' class = 'btnnxt' onclick = 'getNextFeedFb()'>");
////
////                var m = 1;
////                $.each(data, function(index, value) {
////                    $("#install_status_id_inner_fb").append("<li id=fb_row_" + index + "" + m + "/>");
////                    $("#fb_row_" + index + "" + m).append("<div class='comment-details' id='comment-details_fb" + m + "' />");
////                    $("#comment-details_fb" + m + "").append("<div class='commnet-user' id='commnet-user_fb" + m + "' />");
////                    $("#commnet-user_fb" + m + "").append("<img src='../images/img/user" + m + ".jpg' />");
////                    $("#comment-details_fb" + m + "").append("<div class='commnet-desc' id='commnet-desc_fb" + m + "' />");
////                    $("#commnet-desc_fb" + m + "").append("<h3><a href='http://www.facebook.com/" + value.user_screen_name + "' target='new'>" + value.user_screen_name + "</h3>");
////                    $("#commnet-desc_fb" + m + "").append("<p>" + value.text + "</p>");
////                    $("#commnet-desc_fb" + m + "").append("<div class='commnetTxt' id='commnetTxt_fb" + m + "'/>");
////                    $("#commnetTxt_fb" + m + "").append("Sentiment:  " + value.sentiment + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #followers: " + value.user_follower_count + "</p>");
////                    if (value.replied == "YES") {
////                        $("#commnetTxt_fb" + m).append("");
////                    } else {
////                        $("#commnetTxt_fb" + m).append("<div id='fbcontainer" + index + "0' />");
////                        $("#fbcontainer" + index + "0").append("<div id='fbclickpopup" + index + "0' class='click' onclick=popupwindow2('" + value.id + "','" + index + "') />");
////                        $("#fbclickpopup" + index + "0").append("Reply");
////                    }
////                    $("#comment-details_fb" + m + "").append("<div class='clear' />");
////                    m++;
////                });
////            }
////        }
//    });
////    });
//}
//onclick fb feed on dashboard end

function getNextFeedTwitter() {
    $("#comment-area").text("");
    $("#comment-area").append("<ul id='install_status_id_inner' />");
    $.get(server_base_url + "FeedPaginationNext", {
        type: 'twitter'
    }).done(function(data) {

        var m = 1;
        $.each(data, function(index, value) {
            $("#install_status_id_inner").append("<li id=twitter_row_" + index + "" + m + "/>");
            $("#twitter_row_" + index + "" + m).append("<div class='comment-details' id='comment-details" + m + "' />");
            $("#comment-details" + m + "").append("<div class='commnet-user' id='commnet-user" + m + "' />");
            $("#commnet-user" + m + "").append("<img src='../images/img/user" + m + ".jpg' />");
            $("#comment-details" + m + "").append("<div class='commnet-desc' id='commnet-desc" + m + "' />");
            $("#commnet-desc" + m + "").append("<h3><a href='http://www.twitter.com/@" + value.user_screen_name + "' target='new'>" + value.user_screen_name + "</a></h3>");
            $("#commnet-desc" + m + "").append("<p>" + value.text + "</p>");
            $("#commnet-desc" + m + "").append("<div class='commnetTxt' id='commnetTxt" + m + "'/>");
            $("#commnetTxt" + m + "").append("Sentiment:  " + value.sentiment + "</p>");
            if (value.replied == "YES") {
                $("#commnetTxt" + m + "").append("");
            } else {
                $("#commnetTxt" + m + "").append("<div id='container" + index + "0' />");
                $("#container" + index + "0").append("<div id='clickpopup" + index + "0' class='click' onclick=popupwindow1('" + value.id + "','" + index + "') />");
                $("#clickpopup" + index + "0").append("Reply");
            }
            $("#comment-details" + m + "").append("<div class='clear' />");
            m++;
        });
    });
}


function getBackFeedTwitter() {
    $("#comment-area").text("");
    $("#comment-area").append("<ul id='install_status_id_inner' />");
    $.get(server_base_url + "FeedPaginationBack", {
        type: 'twitter'
    }).done(function(data) {
        var m = 1;
        $.each(data, function(index, value) {
            $("#install_status_id_inner").append("<li id=twitter_row_" + index + "" + m + "/>");
            $("#twitter_row_" + index + "" + m).append("<div class='comment-details' id='comment-details" + m + "' />");
            $("#comment-details" + m + "").append("<div class='commnet-user' id='commnet-user" + m + "' />");
            $("#commnet-user" + m + "").append("<img src='../images/img/user" + m + ".jpg' />");
            $("#comment-details" + m + "").append("<div class='commnet-desc' id='commnet-desc" + m + "' />");
            $("#commnet-desc" + m + "").append("<h3><a href='http://www.twitter.com/@" + value.user_screen_name + "' target='new'>" + value.user_screen_name + "</a></h3>");
            $("#commnet-desc" + m + "").append("<p>" + value.text + "</p>");
            $("#commnet-desc" + m + "").append("<div class='commnetTxt' id='commnetTxt" + m + "'/>");
            $("#commnetTxt" + m + "").append("Sentiment:  " + value.sentiment + "</p>");
            if (value.replied == "YES") {
                $("#commnetTxt" + m + "").append("");
            } else {
                $("#commnetTxt" + m + "").append("<div id='container" + index + "0' />");
                $("#container" + index + "0").append("<div id='clickpopup" + index + "0' class='click' onclick=popupwindow1('" + value.id + "','" + index + "') />");
                $("#clickpopup" + index + "0").append("Reply");
            }
            $("#comment-details" + m + "").append("<div class='clear' />");
            m++;
        });
    });
}


function getNextFeedFb() {
    $("#comment-area_fb").text("");
    $("#comment-area_fb").append("<ul id='install_status_id_inner_fb' />");
    $.get(server_base_url + "FeedPaginationNext", {
        type: 'fb'
    }).done(function(data) {
        var docs = data.response.docs;
        if (docs == null || docs == "") {
            $("#comment-area_fb").text("");
            $("#comment-area_fb_empty").text("").append("<center><div style='font-size:20px;color:#769954'>No search results found</div></center>");
        } else {
            $("#comment-area_fb_empty").text("");
            $("#comment-area_fb").text("");
            $("#comment-area_fb").append("<ul id='install_status_id_inner_fb' />");

            $("#fb_sentiment_analysis_pagination_id").text("").append("<input type = 'button' style='margin-left:10%;float:left;' name = 'endRows' value = '< prev' class = 'btnnxt' onclick = 'getBackFeedFb()'>&nbsp;<input type = 'button' style='margin-right:10%;float:right;' name = 'startRows' value = 'next >' class = 'btnnxt' onclick = 'getNextFeedFb()'>");

            var m = 1;
            $.each(docs, function(index, value) {
                $("#install_status_id_inner_fb").append("<li id=fb_row_" + index + "" + m + "/>");
                $("#fb_row_" + index + "" + m).append("<div class='comment-details' id='comment-details_fb" + m + "' />");
                $("#comment-details_fb" + m + "").append("<div class='commnet-user' id='commnet-user_fb" + m + "' />");
                $("#commnet-user_fb" + m + "").append("<img src='../images/img/user" + m + ".jpg' />");
                $("#comment-details_fb" + m + "").append("<div class='commnet-desc' id='commnet-desc_fb" + m + "' />");
                $("#commnet-desc_fb" + m + "").append("<h3><a href='http://www.facebook.com/" + value.id + "' target='new'>" + value.username + "</h3>");
                $("#commnet-desc_fb" + m + "").append("<p>" + value.text + "</p>");
                $("#commnet-desc_fb" + m + "").append("<div class='commnetTxt' id='commnetTxt_fb" + m + "'/>");
                $("#commnetTxt_fb" + m + "").append("Sentiment:  " + value.sentiment + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #followers: " + value.user_follower_count + "</p>");
                if (value.replied == "YES") {
                    $("#commnetTxt_fb" + m).append("");
                } else {
                    $("#commnetTxt_fb" + m).append("<div id='fbcontainer" + index + "0' />");
                    $("#fbcontainer" + index + "0").append("<div id='fbclickpopup" + index + "0' class='click' onclick=popupwindow2('" + value.id + "','" + index + "','" + value.username.replace(/\s/g, '') + "') />");
                    $("#fbclickpopup" + index + "0").append("Reply");
                }
                $("#comment-details_fb" + m + "").append("<div class='clear' />");
                m++;
            });
        }
    });
}

function getBackFeedFb(source) {
    $("#comment-area_fb").text("");
    $("#comment-area_fb").append("<ul id='install_status_id_inner_fb' />");
    $.get(server_base_url + "FeedPaginationBack", {
        type: 'fb'
    }).done(function(data) {
        var docs = data.response.docs;
        if (docs == null || docs == "") {
            $("#comment-area_fb").text("");
            $("#comment-area_fb_empty").text("").append("<center><div style='font-size:20px;color:#769954'>No search results found</div></center>");
        } else {
            $("#comment-area_fb_empty").text("");
            $("#comment-area_fb").text("");
            $("#comment-area_fb").append("<ul id='install_status_id_inner_fb' />");

            $("#fb_sentiment_analysis_pagination_id").text("").append("<input type = 'button' style='margin-left:10%;float:left;' name = 'endRows' value = '< prev' class = 'btnnxt' onclick = 'getBackFeedFb()'>&nbsp;<input type = 'button' style='margin-right:10%;float:right;' name = 'startRows' value = 'next >' class = 'btnnxt' onclick = 'getNextFeedFb()'>");

            var m = 1;
            $.each(docs, function(index, value) {
                $("#install_status_id_inner_fb").append("<li id=fb_row_" + index + "" + m + "/>");
                $("#fb_row_" + index + "" + m).append("<div class='comment-details' id='comment-details_fb" + m + "' />");
                $("#comment-details_fb" + m + "").append("<div class='commnet-user' id='commnet-user_fb" + m + "' />");
                $("#commnet-user_fb" + m + "").append("<img src='../images/img/user" + m + ".jpg' />");
                $("#comment-details_fb" + m + "").append("<div class='commnet-desc' id='commnet-desc_fb" + m + "' />");
                $("#commnet-desc_fb" + m + "").append("<h3><a href='http://www.facebook.com/" + value.id + "' target='new'>" + value.username + "</h3>");
                $("#commnet-desc_fb" + m + "").append("<p>" + value.text + "</p>");
                $("#commnet-desc_fb" + m + "").append("<div class='commnetTxt' id='commnetTxt_fb" + m + "'/>");
                $("#commnetTxt_fb" + m + "").append("Sentiment:  " + value.sentiment + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #followers: " + value.user_follower_count + "</p>");
                if (value.replied == "YES") {
                    $("#commnetTxt_fb" + m).append("");
                } else {
                    $("#commnetTxt_fb" + m).append("<div id='fbcontainer" + index + "0' />");
                    $("#fbcontainer" + index + "0").append("<div id='fbclickpopup" + index + "0' class='click' onclick=popupwindow2('" + value.id + "','" + index + "','" + value.username.replace(/\s/g, '') + "') />");
                    $("#fbclickpopup" + index + "0").append("Reply");
                }
                $("#comment-details_fb" + m + "").append("<div class='clear' />");
                m++;
            });
        }
    });
}


function getInstallStatus(uuid) {
    getStatusFromServer(uuid);
    getStatusFromServerFB(uuid);
}

function getUpdatedTweets(uuid) {
//    $("#refresh_btn").val("0\t Updates \t Refresh");
    getInstallStatus(uuid);
    getConnectState(uuid);
    worldMap(uuid);
    getPositivePie();
    getNegativePie();
    getTweetCount(uuid);
}

//to change count every 15 seconds on updates and threat
function getTweetCount(uuid) {
    setInterval(function() {
        getLatestCounts(uuid);
        find_analysis(uuid);
    }, 8000);
}

function getLatestCounts(uuid) {
    $.get(server_base_url + "GetRegularCount", {
        uuid: uuid
    }).done(function(data) {
        if (data != null) {
            $("#updates").text(data + "  Updates");
        }
    });
}

//function login() {
//    if (document.getElementById("username_id").value == "") {
//        alert("User Name Should Not Be Empty");
//        document.getElementById("username_id").focus();
//        return false;
//    } else if (document.getElementById("password_id").value == "") {
//        alert("Password Should Not Be Empty");
//        document.getElementById("password_id").focus();
//        return false;
//    } else {
//        var get = $.get(server_base_url + "AuthenticationService", {
//            username: $("#username_id").val(),
//            password: $("#password_id").val()
//        }).done(function(data) {
//            if (data == "Fail") {
//                $("#errorMsg").append("<span style='font-size: 20px;font-family: killer;color: #dc5858'>Invalid username/password</span>")
//            } else {
//                location.href = "dashboard.jsp?u=" + data[0]._id + "&n=" + data[0].name + "&t=" + data[0].threat + "&k=" + get.getResponseHeader('compare_kws') + "&b1=" + get.getResponseHeader('bucket1') + "&b2=" + get.getResponseHeader('bucket2') + "&b3=" + get.getResponseHeader('bucket3');
//            }
//        });
//    }
//}

function getKeywords() {
    $.get(server_base_url + "Keyword", {
        userid: getUserSessionElement("id")
    }).done(function(data) {
        $.each(data, function(index, value) {
            $("#kwtable").append("<tr id=" + index + "_row />");
            $("#" + index + "_row").append("<td id=" + index + "_td onclick=addToSearchBar(" + index + "," + "\"" + value.replace(/ /g, '|') + "\"" + ") />");
            $("#" + index + "_td").append(value);
        });
    });
}

function add() {
    if (document.getElementById("keywordtextid").value == "") {
        alert("Keyword Name Should Not Be Empty");
        document.getElementById("keywordtextid").focus();
        return false;
    } else if (document.getElementById("campaigntextid").value.length > 100) {
        alert("Campaign message limit exceeded");
        document.getElementById("campaigntextid").focus();
        return false;
    } else {
        addTwitterKws("Twitter", $("#keywordtextid").val(), encodeURI($("#campaigntextid").val()));

        document.getElementById("keywordtextid").value = "";
        document.getElementById("campaigntextid").value = "";
    }
}


function addTwitterKws(source, product, campaign) {
    $.get(server_base_url + "KeywordSetting", {
        source: source,
        product: product,
        campaign: campaign
    }).done(function(data) {
        var var0 = data.split(' ');
        var var1 = var0[1].split('-');
        if (var0[0] == "success")
        {
            alert("Keyword Added Successfully");
            $("#kwtable").append("<tr id=key_row" + var0[1] + ">");
            $("#key_row" + var0[1]).append("<td class=key_td id=td_id" + var1[0] + " />");
            $("#key_row" + var0[1]).append("<td class=camp_td id=td_id" + var1[1] + "/>");
            $("#key_row" + var0[1]).append("<td class=camp_td id=td_id_11" + var1[1] + " class=keys_td />");
            $("#td_id" + var1[1]).append($("#campaigntextid").val());
            $("#td_id" + var1[0]).append($("#keywordtextid").val());
            $("#td_id_11" + var1[1]).append($("#keywordtextid").val());

        }
    });
}

function add1() {
    if (document.getElementById("aliastextid1").value == "") {
        alert("Alias Name Should Not Be Empty");
        document.getElementById("aliastextid1").focus();
        return false;
    } else if (document.getElementById("keywordtextidfb1").value == "") {
        alert("Keywords List Should Not Be Empty");
        document.getElementById("keywordtextidfb1").focus();
        return false;
    } else {
        addFBKws("FB", $("#aliastextid1").val(), $("#keywordtextidfb1").val(), encodeURI($("#campaigntextidfb1").val()));

        document.getElementById("aliastextid1").value = "";
        document.getElementById("keywordtextidfb1").value = "";
        document.getElementById("campaigntextidfb1").value = "";
    }
}

function addFBKws(source, alias, product, campaign) {
    $.get(server_base_url + "KeywordSettingFB", {
        contentType: "text/html; charset=UTF-8",
        source: source,
        alias: alias,
        product: product,
        campaign: campaign
    }).done(function(data) {
        var var0 = data.split(' ');
        var var1 = var0[1].split('-');
        if (var0[0] == "success") {
            alert("Channel Added Successfully");
            $("#kwtable").append("<tr id=key_row" + var0[1] + ">");
            $("#key_row" + var0[1]).append("<td class=camp_td id=td_id_" + var1[1] + "/>");
            $("#key_row" + var0[1]).append("<td class=camp_td id=td_id" + var1[1] + "/>");
            $("#key_row" + var0[1]).append("<td class=key_td id=td_id" + var1[0] + " />");
            $("#td_id_" + var1[1]).append($("#aliastextid1").val());
            $("#td_id" + var1[1]).append($("#campaigntextidfb1").val());
            $("#td_id" + var1[0]).append($("#keywordtextidfb1").val());
        }
    });
}

function addTwitterTokens(uuid) {
    if (document.getElementById("accessname").value == "") {
        alert("Acess Name Should Not Be Empty");
        document.getElementById("accessname").focus();
        return false;
    } else if (document.getElementById("accesskey").value == "") {
        alert("Acess Key Should Not Be Empty");
        document.getElementById("accesskey").focus();
        return false;
    } else if (document.getElementById("authname").value == "") {
        alert("Auth Name Should Not Be Empty");
        document.getElementById("authname").focus();
        return false;
    } else if (document.getElementById("authkey").value == "") {
        alert("Auth Key Should Not Be Empty");
        document.getElementById("authkey").focus();
        return false;
    } else {
        $.get(server_base_url + "PersistTokens", {
            uuid: uuid,
            source: "twitter",
            accessname: $("#accessname").val(),
            accesskey: $("#accesskey").val(),
            authname: $("#authname").val(),
            authkey: $("#authkey").val()
        }).done(function(data) {
            alert("Tokens For Twitter Successfully Added");
            document.getElementById("accessname").value = "";
            document.getElementById("accesskey").value = "";
            document.getElementById("authname").value = "";
            document.getElementById("authkey").value = "";
        });
    }
}

function addFBTokens(uuid) {
    if (document.getElementById("fb_appid").value == "") {
        alert("App ID Should Not Be Empty");
        document.getElementById("fb_appid").focus();
        return false;
    } else if (document.getElementById("fb_appsecret").value == "") {
        alert("App Secret Should Not Be Empty");
        document.getElementById("fb_appsecret").focus();
        return false;
    } else if (document.getElementById("fb_accesstoken").value == "") {
        alert("Access Token Should Not Be Empty");
        document.getElementById("fb_accesstoken").focus();
        return false;
    } else {
        $.get(server_base_url + "PersistTokens", {
            uuid: uuid,
            source: "fb",
            appid: $("#fb_appid").val(),
            appsecret: $("#fb_appsecret").val(),
            accesstoken: $("#fb_accesstoken").val(),
        }).done(function(data) {
            alert("Tokens For Facebook Successfully Added");
            document.getElementById("fb_appid").value = "";
            document.getElementById("fb_appsecret").value = "";
            document.getElementById("fb_accesstoken").value = "";
        });
    }
}

function changePassword(uuid) {
    if (document.getElementById("old_pass").value == "") {
        alert("Enter current Password");
        document.getElementById("old_pass").focus();
        return false;
    } else if (document.getElementById("new_pass").value == "") {
        alert("Enter new Password");
        document.getElementById("new_pass").focus();
        return false;
    } else if (document.getElementById("cnf_pass").value == "") {
        alert("Enter confirm Password");
        document.getElementById("cnf_pass").focus();
        return false;
    } else if (document.getElementById("new_pass").value != document.getElementById("cnf_pass").value) {
        alert("Password and Confirm Password should be same");
        document.getElementById("cnf_pass").focus();
        return false;
    } else {
        $.get(server_base_url + "ChanagePassword", {
            uuid: uuid,
            oldpass: document.getElementById("old_pass").value,
            newpass: document.getElementById("new_pass").value
        }).done(function(data) {
            if (data == "success") {
                alert("Password Changed Successfully");
                document.getElementById("old_pass").value = "";
                document.getElementById("new_pass").value = "";
                document.getElementById("cnf_pass").value = "";
            }
            if (data == "error") {
                alert("Incorrect Current Password");
                document.getElementById("old_pass").focus();
            }
        });
    }
}

function getURL() {
    var user = location.search.split('j=')[1];
    var keys = getKeywords(user);
    $.each(keys, function(index, value) {
        //       alert(value);
    });
}

function addToSearchBar(obj, value1) {
    value1 = value1.replace(/\|/g, ' ');
    if (document.getElementById("textbox1").value.length == 0)
    {
        document.getElementById("textbox1").value = value1;
        return false;
    }
    else
    {
        var gmd = document.getElementById("textbox1");
        var k = gmd.value + "," + value1;
        var dmg = k.split(",");
        if (dmg.length > 2)
        {
            $("#keyword_limit").text("Keyword limit exceeded..")
        }
        else
        {
            gmd.value = k;
        }
    }
}

function getUserKeywords() {
    $.get(server_base_url + "Keyword", {
        userid: getUserSessionElement("id")
    }).done(function(data) {
        $.each(data, function(index, value) {
            $("#keywords").append(value + "  ");
        });
    });
}

function getKeywordsWithChannelAndCampaign(value) {
    var user = value;

    $.get(server_base_url + "KeywordWithCampaign", {
    }).done(function(data) {
        var n = 0;
        $.each(data, function(index, value) {
            var channel = index;
            var val2 = index.split(' ');
            var val1 = "";
            for (i = 0; i < val2.length; i++) {
                val1 += val2[i];
            }
            $("#kwtable").append("<tr id=" + val1 + "_row class=channelkeycamp />");
            var gmd = index;
            record = value;

            $.each(record, function(index, value) {
                $("#" + val1 + "_row").append("<td class=key_td id=td_id" + val1 + "0" + " />");
                $("#" + val1 + "_row").append("<td class=key_td id=td_id" + val1 + "1" + " />");
                $("#" + val1 + "_row").append("<td class=camp_td id=td_id" + val1 + "2" + " />");
                $("#" + val1 + "_row").append("<td class=keys_td id=td_id" + val1 + "3" + " />");
                $("#" + val1 + "_row").append("<td class=key_td id=td_id" + val1 + "4" + " />");
                $("#td_id" + val1 + "0").append("<div contentEditable=false id=source" + n + ">" + channel.substring(0, channel.indexOf("-")) + "</div>");
                $("#td_id" + val1 + "1").append("<div contentEditable=true id=channel" + n + ">" + channel.substring((channel.indexOf("-") + 1)) + "</div>");
                $("#td_id" + val1 + "2").append("<div contentEditable=true id=campaign" + n + ">" + index + "</div>");
                $("#td_id" + val1 + "3").append("<div contentEditable=true id=kws" + n + ">" + value + "</div>");
                $("#td_id" + val1 + "4").append("<div id=btn" + n + ">" + "<input type=button value=Update onclick='updateKwd(" + n + ")' />" + "</div>");
            });
            n++;
        });
    });
}

function updateKwd(n) {
    var channel = $("#channel" + n).text();
    var source = $("#source" + n).text();

    var campaign = $("#campaign" + n).text();
    var kws = $("#kws" + n).text();
    if (source == "FB") {
        addFBKws(source, channel, kws, encodeURI(campaign));
    }
    else if (source == "Twitter") {

        addTwitterKws(source, kws, encodeURI(campaign));
    }


}
function loadChannel(channel, campaign, key) {
    //alert(channel.replace('|', ' ') + "\t" + campaign.replace('|', ' ') + "\t" + key.replace('|', ' '));
    var val1 = channel.replace('|', ' ').split('-');
    var source = val1[0];
    var channel_name = val1[1];
    if (source == "Twitter") {
        document.getElementById("keywordtextid").value = key.replace('|', ' ');
        document.getElementById("campaigntextid").value = campaign.replace('|', ' ');
        $(".channelSelectionDiv").hide();
        $("#channelsettingdiv").show();
        $(".twitter").show();
    } else if (source == "FB") {
        document.getElementById("aliastextid1").value = channel_name.replace('|', ' ');
        document.getElementById("keywordtextidfb1").value = key.replace('|', ' ');
        document.getElementById("campaigntextidfb1").value = campaign.replace('|', ' ');
        $(".channelSelectionDiv").hide();
        $("#channelsettingdiv").show();
        $(".facebook").show();
    }
}


function loadCampaign(key, campaign) {
    document.getElementById("keywordtextid").value = key;
    document.getElementById("campaigntextid").value = campaign;
}

function popupwindow1(id, tr) {
    $("#un_id").text("");
    $("#fol_id").text("");
    $("#post_time_id").text("");
    $("#fav_id").text("");
    $.get(server_base_url + "PopupService", {
        id: id
    }).done(function(data) {
        var status = data.response.docs;
        $.each(status, function(index, value) {
            popupwindow(value.id, value.user_screen_name, value.user_follower_count, value.created_time, value.user_favorite_count, tr);
        });
    });
}

function popupwindow2(id, tr, username) {
    $("#un_id").text("");
    $("#fol_id").text("");
    $("#post_time_id").text("");
    $("#fav_id").text("");
    $.get(server_base_url + "PopupService", {
        id: id
    }).done(function(data) {
        var status = data.response.docs;
        $.each(status, function(index, value) {
            popupwindow3(value.id, username, value.user_follower_count, value.created_time, value.user_favorite_count, tr);
        });
    });
}

function popupwindow(id, un, fol, time, fav, tr) {
    $("#un_id").text(un);
    $("#fol_id").text(fol);
    $("#post_time_id").text(time);
    $("#fav_id").text(fav);
    $("#replyaction").text("");
    $("#replyaction").append("<div class='reply' id='replyactiontext' onclick='mannualReply(\"" + id + "\",\"" + tr + "\")'  />");
    $("#replyactiontext").text("Reply");
    var overlay = $('<div id="overlay"></div>');
    $('.close11').click(function() {
        $('.popup').hide();
        overlay.appendTo(document.body).remove();
        return false;
    });

    $('.x').click(function() {
        $('.popup').hide();
        overlay.appendTo(document.body).remove();
        return false;
    });

    $('.click').click(function() {
        overlay.show();
        overlay.appendTo(document.body);
        $('.popup').show();
        return false;
    });
}

function popupwindow3(id, un, fol, time, fav, tr) {
    $("#un_id").text(un);
    $("#fol_id").text(fol);
    $("#post_time_id").text(time);
    $("#fav_id").text(fav);
    $("#replyaction").text("");
    $("#replyaction").append("<div class='reply' id='replyactiontext' onclick='mannualReply1(\"" + id + "\",\"" + tr + "\")'  />");
    $("#replyactiontext").text("Reply");
    var overlay = $('<div id="overlay"></div>');
    $('.close11').click(function() {
        $('.popup').hide();
        overlay.appendTo(document.body).remove();
        return false;
    });

    $('.x').click(function() {
        $('.popup').hide();
        overlay.appendTo(document.body).remove();
        return false;
    });

    $('.click').click(function() {
        overlay.show();
        overlay.appendTo(document.body);
        $('.popup').show();
        return false;
    });
}

function mannualReply(id, tr) {
    campaign = document.getElementById("campaign").value;
    $.get(server_base_url + "MannualReply", {
        id: id,
        camp: campaign
    }).done(function(data) {
        $('.popup').hide();
        if (data == "SUCCESS")
            $("#tweet_row_" + tr).css("background", "#82FA58");
    });
}

function mannualReply1(id, tr) {
    campaign = document.getElementById("campaign").value;
    $.get(server_base_url + "MannualReplyFB", {
        id: id,
        camp: campaign
    }).done(function(data) {
        $('.popup').hide();
        if (data == "SUCCESS")
            $("#fb_row_" + tr).css("background", "#82FA58");
    });
}

//user alert
function alertUser(uuid) {
    $.get(server_base_url + "AlertService", {
        uuid: uuid
    }).done(function(data) {
        document.getElementById("alertmessage").innerHTML = data;
        if (data === "") {
            $('.popup1').hide();
        }
        else {
            $('.popup1').show();
        }
    });
}

$(function userAlert() {
    var overlay1 = $('<div id="overlay1"></div>');
    $('.x1').click(function() {
        $('.popup1').hide();
        overlay1.appendTo(document.body).remove();
        return false;
    });
    overlay1.show();
    overlay1.appendTo(document.body);
});
//user alert ends

//threat analysis onload count
function find_analysis(uuid, bucket1, bucket2, bucket3) {
    $.get(server_base_url + "ThreatAnalyticsService", {
        uuid: uuid,
        bucket1: bucket1,
        bucket2: bucket2,
        bucket3: bucket3
    }).done(function(data) {
        $.each(data, function(index, value) {
            $("#gathering1").text("");
            $("#threat1").text("");
            $("#crime1").text("");
            $("#gathering1").append(value.bucket1);
            $("#threat1").append(value.bucket2);
            $("#crime1").append(value.bucket3);
        });
    });
}

function refreshFBStat() {
    $("#stat_ref_spinner_id").css("display", "block");
    $.get(server_base_url + "FBStatUpdateService", {
    }).done(function(data) {
        getFBStat("start");
        $("#stat_ref_spinner_id").css("display", "none");
    });
}
// Get facebook page stats
//function getFBStat(uuid) {
//    $.get(server_base_url + "FBStatService", {
//        uuid: uuid
//    }).done(function(data) {
//        $.each(data, function(index, value) {
//            if (data == null || data == "Fail" || data == "") {
//                $("#stat-area").text("");
//                $("#stat-area_empty").text("").append("<center><div style='font-size:20px;color:#769954'>No Facebook Page Found</div></center>");
//            } else {
//                $("#stat-area_empty").text("")
//                $("#stat-area").text("");
//                $("#stat-area").append("<ul id='fb_stat_inner' />");
//
//                // $("#twitter_sentiment_analysis_pagination_id").text("").append("<input type='button' style='margin-left:10%;float:left;' name='endRows' value='< prev' class='btnnxt' onclick='getBackFeedTwitter()'>&nbsp;<input type='button' name='startRows' value='next >' class='btnnxt' style='margin-right: 10%;float:right;' onclick='getNextFeedTwitter()'>");
//
//                var m = 1;
//                $("#fb_stat_inner").append("<table id=stat_tbl  class='comment-area' style='width:100%;'>");
//                $("#stat_tbl").append("<tr id=stat_tr style='height:50px'>");
//                $("#stat_tr").append("<td id=stat_td1>");
//                $("#stat_td1").append("<h3>Page Name</h3>");
//                $("#stat_tr").append("<td id=stat_td2>");
//                $("#stat_td2").append("<h3>Page Likes</h3>");
//                $("#stat_tr").append("<td id=stat_td3>");
//                $("#stat_td3").append("<h3>Page Posts</h3>");
//                $.each(data, function(index, value) {
//
//                    $("#stat_tbl").append("<tr id=stat_tr" + m + " class='comment-area' style='height:40px; margin-top:30px;'>");
//
//                    $("#stat_tr" + m).append("<td id=stat_td1" + m + ">");
//                    $("#stat_td1" + m).append(m + ". " + "<a target=_blank href='http://facebook.com/" + value.pageid + "'>" + value.pagename + "</a>")
//                    $("#stat_tr" + m).append("<td id=stat_td2" + m + ">");
//                    $("#stat_td2" + m).text(value.pagelikes);
//                    $("#stat_tr" + m).append("<td id=stat_td3" + m + ">");
//                    $("#stat_td3" + m).text(value.pageposts);
//
//                    m++;
//                });
//            }
//        });
//    });
//}
//onclick dashboard.jsp
function find_analysis_info(analysis, uuid) {
//    location.href = "threat_analysis.jsp";
    sessionStorage.setItem("a", analysis);
}
//threat analysis onclick threat_analysis.jsp
function find_analysis_info1(analysis, uuid) {
    $.get(server_base_url + "ThreatAnalyticsDisplayService", {
        analysis: analysis,
        userid: uuid
    }).done(function(data) {
        var jsn = data.response.docs;
        $("#disp_analysis").text("");
        $("#disp_header").text("");
        $("#disp_header").append(analysis.substring(0, analysis.indexOf("_")));
        $("#disp_analysis").append("<table id='analysis_table' class=analysisfeed />");
        $("#analysis_table").append("<tr id='tab_td1' />");
        $("#tab_td1").append("<th id='tb_hdr1' class=thhdr />");
        $("#tab_td1").append("<th id='tb_hdr2' class=thhdr />");
        $("#tab_td1").append("<th id='tb_hdr3' class=thhdr />");
        $("#tab_td1").append("<th id='tb_hdr4' class=thhdr />");
        $("#tab_td1").append("<th id='tb_hdr5' class=thhdr />");
        $("#tb_hdr1").append("User Id");
        $("#tb_hdr2").append("Text");
        $("#tb_hdr3").append("Followers");
        $("#tb_hdr4").append("Favorites");
        $("#tb_hdr5").append("Following");
        $.each(jsn, function(index, value) {
//            alert(value.type + "\t" + value.id);
            $("#analysis_table").append("<tr id='analysis_row_" + index + "' />");
            if (index % 2 == 0) {
                $("#analysis_row_" + index).css("background", "#EEE");
            }
            $("#analysis_row_" + index).append("<td id='analysis_data_" + index + "0'class=analysisfeed0 />");
            $("#analysis_row_" + index).append("<td id='analysis_data_" + index + "1'class=analysisfeed1 title='" + value.text + "' />");
            $("#analysis_row_" + index).append("<td id='analysis_data_" + index + "2'class=analysisfeed2 />");
            $("#analysis_row_" + index).append("<td id='analysis_data_" + index + "3'class=analysisfeed3 />");
            $("#analysis_row_" + index).append("<td id='analysis_data_" + index + "4'class=analysisfeed4 />");
            if (value.type == "twitter") {
                $("#analysis_data_" + index + "0").append("<a href='http://www.twitter.com/@" + value.user_screen_name + "' target='new'>" + "@" + value.user_screen_name + "</a>");
            } else if (value.type == "fb") {
                $("#analysis_data_" + index + "0").append("<a href='http://www.facebook.com/" + value.id + "' target='new'>" + "@" + value.user_screen_name + "</a>");
            }
            $("#analysis_data_" + index + "1").append(value.text.substring(0, 100) + "...");
            $("#analysis_data_" + index + "2").append(value.user_follower_count);
            $("#analysis_data_" + index + "3").append(value.user_favorite_count);
            $("#analysis_data_" + index + "4").append(value.friends_count);
        });
    });
}
function getAnalysisCount(uuid, bucket1, bucket2, bucket3) {
    setInterval(function() {
        find_analysis(uuid, bucket1, bucket2, bucket3);
    }, 15000);
}

function getSentimentOnload(uuid, comparekws) {
    $("#twitter_sentiment_analysis_pagination_id").show();
    $("#fb_sentiment_analysis_pagination_id").show();
    var keywords = document.getElementById("textbox1").value;
    if (keywords == "null" || keywords == "") {
        loadSentimentGraph(comparekws);
        loadSentimentGraph1(comparekws);
    }
//    else {
//        getSentimentOnload1(keywords, uuid);
//    }
}
function getSentimentOnload1(uuid) {
    var keywords = document.getElementById("textbox1").value;
    getRealtimeTwitterFeed(keywords, uuid);
    getRealtimeFBFeed(keywords, uuid);
}

function sentimentGraph() {
    var keywords = document.getElementById("textbox1").value;
    if (keywords != null && keywords != "") {
        loadSentimentGraph(keywords);
        loadSentimentGraph1(keywords);
    } else {
        alert("enter keywords to compare");
    }
}

function showConnectionReport() {
    $("#report_spinner").css("display", "block");
    var sd = $("#sd").val();
    var ed = $("#ed").val();
    var ds = $("input[type='radio'][name='data_src']:checked").val();
    var tz = new Date().getTimezoneOffset();
    var start = 0;
    var rows = 1000;

    $.get(server_base_url + "ConnectReportService", {
        sd: sd,
        ed: ed,
        ds: ds,
        tz: tz,
        start: start,
        rows: rows
    }).done(function(data) {
        $("#report_spinner").css("display", "none");
        $("#disp_header").text(data.response.numFound + " results found");
        var docs = data.response.docs;
//        $("#disp_report").css("width","100%");
        $("#disp_report").append("<table id='disp_tbl' style='width:100%' />");
        $("#disp_tbl").text("").append("<tr id=rpt/>");
        $("#rpt").append("<td id=rpt_td1>" + "<span  style='font-size: 20px;color: #0099ff;font-weight: bold;'>Date</span>" + "</td>");
        $("#rpt").append("<td id=rpt_td2 >" + "<span  style='font-size: 20px;color: #0099ff;font-weight: bold;'>Post/Reply URL</span>" + "</td>");
        $("#rpt").append("<td id=rpt_td3 >" + "<span  style='font-size: 20px;color: #0099ff;font-weight: bold;'>Post username</span>" + "</td>");
        //$("#rpt").append("<td id=rpt_td4 >" + "<span  style='font-size: 20px;color: #0099ff;font-weight: bold;'>Reply URL</span>" + "</td>");
//        $("#rpt").append("<td id=rpt_td4 >" + "Reply username" + "</td>");
        $.each(docs, function(index, value) {
            var date = new Date(eval(value.replied_time) - eval(tz));
//            alert(index);

            $("#disp_tbl").append("<tr id=rpt" + index + " />");
            if (index % 2 == 0) {
                $("#rpt" + index).css("background", "#EEE");
            }
            $("#rpt" + index).append("<td id=rpt_td" + index + "1 style='font-size:18px;line-height:30px;'>" + date.toString() + "</td>");
            $("#rpt" + index).append("<td id=rpt_td" + index + "2 style='font-size:18px;line-height:30px;'><a href=" + value.text[1] + " target=_blank>" + value.text[1] + "</a></td>");
            if (typeof value.reply_to_screen_name == 'undefined') {
                $("#rpt" + index).append("<td id=rpt_td" + index + "3 style='font-size:18px;line-height:30px;'>" + "Not Available" + "</td>");
            } else {
                $("#rpt" + index).append("<td id=rpt_td" + index + "3 style='font-size:18px;line-height:30px;'>" + value.reply_to_screen_name + "</td>");
            }
            //$("#rpt" + index).append("<td id=rpt_td" + index + "2 style='font-size:18px;line-height:30px;'><a href=https://facebook.com/" + (value.in_reply_to_status_id).substring(0, (value.in_reply_to_status_id).indexOf('_')) + " target=_blank>https://facebook.com/" + value.in_reply_to_status_id + "</a></td>");

        });
    });
}

//threat analysis end

$(function() {
    $('.cmp_class').autogrow();
});