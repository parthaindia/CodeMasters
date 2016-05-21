//world map start
function worldMap(user) {
    var data1;
    $.getJSON(server_base_url + 'CountryCount', {
        user_id: user, compare_kws: getUserSessionElement("compare_kws")
    }).done(function(data) {
        if (data != null && data != "Fail" && data != "") {
            $.each(data, function(index, value) {
                $("#map_container_msg").text("").append("Unknown country count : " + index);
                data1 = value;
            });
            $('#map_container').text("");
            $('#map_container').highcharts('Map', {
                title: {
                    text: 'Buzz Density by Country',
                    style: {color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'orange', fontWeight: 'bold'}
                },
                subtitle: {
                    text: 'Last 30 days',
                    style: {fontWeight: 'bold'}
                },
                mapNavigation: {
                    enabled: true, enableDoubleClickZoomTo: true,
                    buttonOptions: {verticalAlign: 'bottom'}
                },
                tooltip: {
//                footerFormat: '<span style="font-size: 8px">(Click graph for details)</span>'                
                },
                series: [{
                        data: data1, mapData: Highcharts.maps['custom/world'],
                        joinBy: ['iso-a2', 'code'],
                        name: 'Buzz Density', allowPointSelect: true, cursor: 'pointer',
                        states: {
                            select: {color: 'orange', borderColor: 'black', dashStyle: 'line'},
                            hover: {color: '#BADA55', borderColor: 'black', dashStyle: 'shortdot'}
                        }
                    }]
            });
        } else {
            $('#map_container').text("");
        }
    });
}//world map end

//connection stat chart start
function getConnectState(user) {
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
        return {
            radialGradient: {cx: 0.5, cy: 0.3, r: 0.7},
            stops: [[0, color], [1, Highcharts.Color(color).brighten(-0.3).get('rgb')]]};
    });
    $.get(server_base_url + "ConnectStateService", {
        user_id: user, compare_kws: getUserSessionElement("compare_kws"), orgid: getUserSessionElement("OrgId")
    }).done(function(data) {
        if (data != null && data != "Fail" && data != "") {
            $('#connect_stat_container').text("");
            var options = {
                chart: {
                    renderTo: 'connect_stat_container', type: 'column'
                },
                title: {
                    text: 'Connection Analysis',
                    style: {color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'orange', fontWeight: 'bold'}
                },
                subtitle: {
                    text: 'Last 30 days', style: {fontWeight: 'bold'}
                },
                xAxis: {
                    categories: ["Received vs Connected"]
                },
                yAxis: {
                    title: {
                        text: 'Tweets / Posts Count',
                        style: {color: 'orange', fontSize: '13px', fontWeight: 'bold'}
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:100px"></span>',
                    pointFormat: '<span style="font-size:16px;font-weight:bold">{series.name}:{point.y}</span>',
                },
                plotOptions: {column: {pointPadding: 0.2, borderWidth: 0}},
                series: [
                    {name: 'Received', data: [data.YES + data.NO]},
                    {name: 'Replied', data: [data.YES]},
                    {name: 'Not Replied', data: [data.NO]}
                ]
            };
            var chart = new Highcharts.Chart(options);
        } else {
            $('#connect_stat_container').text("");
        }
    });
}//connection stat chart end

//positive piechart start
var data1 = new Array();
function getPositivePie() {
    var user = getUserSessionElement("id");
    var options = {
        chart: {
            plotBackgroundColor: null, plotBorderWidth: null, plotShadow: true,
            renderTo: 'positive_container', type: 'pie', label: 'positive', name: 'Sentiments'
        },
        title: {
            text: 'Positive Sentiment Distribution',
            style: {color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'orange', fontWeight: 'bold'}
        },
        subtitle: {
            text: 'Last 30 days',
            style: {fontWeight: 'bold'}
        },
        tooltip: {
            pointFormat: '<span style="font-size:10px;font-weight:bold">{series.name} : {point.y}</span>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true, cursor: 'pointer',
                dataLabels: {
                    enabled: true, format: '<b>{point.name}</b>: {point.percentage:.1f}%',
                    style: {color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black', fontSize: '9px'}
                }
            }
        },
        series: [{}]
    };
    $.get(server_base_url + "KeyWordCount?userid=" + user, "sentiment= positive", {
        compare_kws: getUserSessionElement("compare_kws")
    }).done(function(jdata) {
        if (jdata != null && jdata != "Fail" && jdata != "") {
            $('#positive_container').text("");
            var count = 0;
            var temp = "";
            var data1 = new Array();
            $.each(jdata, function(index, value) {
                $.each(value, function(i, v) {
                    var data11 = new Array();
                    data11[0] = "'" + i + "'";
                    data11[1] = eval(v);
                    data1[count] = data11;
                    count++;
                });
            });
            d = [jdata[0][0], jdata[0][1]];
            options.series[0].name = "Positive Sentiments";
            options.series[0].data = data1;
            var chart = new Highcharts.Chart(options);
        } else {
            $('#positive_container').text("");
        }
    });
}//positive piechart end

//negative piechart start
var data2 = new Array();
function getNegativePie() {
    var user = getUserSessionElement("id");
    var options = {
        chart: {
            plotBackgroundColor: null, plotBorderWidth: null, plotShadow: true,
            renderTo: 'negative_container', type: 'pie', label: 'negative', name: 'Sentiments'
        },
        title: {
            text: 'Negative Sentiment Distribution',
            style: {color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'orange', fontWeight: 'bold'}
        },
        subtitle: {
            text: 'Last 30 days',
            style: {fontWeight: 'bold'}
        },
        tooltip: {
            pointFormat: '<span style="font-size:10px;font-weight:bold">{series.name} : {point.y}</span>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true, cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f}% ',
                    style: {color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black', fontSize: '9px'}
                }
            }
        },
        series: [{}]
    };
    $.get(server_base_url + "KeyWordCount1?userid=" + user, "sentiment= negative", {
        compare_kws: getUserSessionElement("compare_kws")
    }).done(function(kdata) {
        if (kdata != null && kdata != "Fail" && kdata != "") {
            $('#negative_container').text("");
            var count = 0;
            var temp = "";
            var data2 = new Array();
            $.each(kdata, function(index, value) {
                $.each(value, function(i, v) {
                    var data22 = new Array();
                    data22[0] = "'" + i + "'";
                    data22[1] = eval(v);
                    data2[count] = data22;
                    count++;
                });
            });
            d = [kdata[0][0], kdata[0][1]];
            options.series[0].name = "Negative Sentiments";
            options.series[0].data = data2;
            var chart = new Highcharts.Chart(options);
        } else {
            $('#negative_container').text("");
        }
    });
}//negative piechart end

//positive sentiment graph start
function loadSentimentGraph(kw) {
    if (kw != null) {
        var options = {
            chart: {
                renderTo: 'positive_sentiment_id', type: 'spline'
            },
            title: {
                text: 'Postive Sentiment Trend', x: 2,
                style: {color: 'orange', fontWeight: 'bold'}
            },
            subtitle: {
                text: 'Last 30 days',
                style: {fontWeight: 'bold'}
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text: 'Positive Sentiments',
                    style: {color: 'orange', fontSize: '12px', fontWeight: 'bold'}
                },
                plotLines: [{value: 0, width: 1, color: '#808080'}]
            },
            tooltip: {
                formatter: function() {
                    return '<span style="font-size:10px">' + this.x + '</span><br>' +
                            '<b><span style="font-size: 12px;font-weight: bold">' + this.series.name + " : " + this.y + " Sentiments" + '</span></b>'
                }
            },
            series: [{name: '', data: [], color: '#64E572'}, {name: '', data: [], color: '#ED561B'}]
        };
        $.get(server_base_url + "SentimentCount?keywords=" + kw, {
        }).done(function(data) {
            if (data != null && data != "Fail" && data != "") {
                $('#positive_sentiment_id').text("");
                var num = 0;
                var flag = 0;
                $.each(data, function(index, value) {
                    var data1 = new Array();
                    var count = 0;
                    $.each(value, function(i, v) {
                        data1[count] = eval(v);
                        options.xAxis.categories[count] = i;
                        count++;
                        flag++;
                    });
                    options.series[num].name = index;
                    options.series[num].data = data1;
                    num++;
                });
                if (flag == 0) {
                    $("#positive_sentiment_id").css("color", "orange").css("font-size", "20px").text("Postive Sentiment Trend\n\n\n");
                    $("#positive_sentiment_id").append("<p>");
                    $("#positive_sentiment_id").append("<p id='no_data1'>");
                    $("#no_data1").css("color", "brown").append("No Data Found");
                } else {
                    var chart = new Highcharts.Chart(options);
                }
            } else {
                $('#positive_sentiment_id').text("");
            }
        });
    } else {
        $('#positive_sentiment_id').text("");
    }
}//positive sentiment graph end

//negative sentiment graph start
function loadSentimentGraph1(kw) {
    if (kw != null) {
        var options = {
            chart: {
                renderTo: 'negative_sentiment_id', type: 'spline'
            },
            title: {
                text: 'Negative Sentiment Trend', x: 2,
                style: {color: 'orange', fontWeight: 'bold'}
            },
            subtitle: {
                text: 'Last 30 days',
                style: {fontWeight: 'bold'}
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text: ' Negative Sentiments',
                    style: {color: 'orange', fontSize: '12px', fontWeight: 'bold'}
                },
                plotLines: [{value: 0, width: 1, color: '#808080'}]
            },
            tooltip: {
                formatter: function() {
                    return '<span style="font-size:10px">' + this.x + '</span><br>' +
                            '<b><span style="font-size: 12px;font-weight: bold">' + this.series.name + " : " + this.y + " Sentiments" + '</span></b>'
                }
            },
//        legend: {
//            layout: 'vertical',
//            align: 'bottom',
////            verticalAlign: 'middle',
//            borderWidth: 0
//        },
            series: [{name: '', data: []}, {
                    name: '', data: []}]
        };
        $.get(server_base_url + "SentimentCountNegative?keywords=" + kw, {
        }).done(function(data) {
            if (data != null && data != "Fail" && data != "") {
                $('#negative_sentiment_id').text("");
                var num = 0;
                var flag = 0;
                $.each(data, function(index, value) {
                    var data1 = new Array();
                    var count = 0;
                    $.each(value, function(i, v) {
                        data1[count] = eval(v);
                        options.xAxis.categories[count] = i;
                        count++;
                        flag++;
                    });
                    options.series[num].name = index;
                    options.series[num].data = data1;
                    num++;
                });
                if (flag == 0) {
                    $("#negative_sentiment_id").css("color", "orange").css("font-size", "20px").text("Negative Sentiment Trend\n\n\n");
                    $("#negative_sentiment_id").append("<p>");
                    $("#negative_sentiment_id").append("<p id='no_data2'>");
                    $("#no_data2").css("color", "brown").append("No Data Found");
                } else {
                    var chart = new Highcharts.Chart(options);
                }
            } else {
                $('#negative_sentiment_id').text("");
            }
        });
    } else {
        $('#negative_sentiment_id').text("");
    }
}//negative sentiment graph end

//threat piechart start
var data1 = new Array();
function getThreatGeo(analysis, user) {
    var options = {
        chart: {
            plotBackgroundColor: null, plotBorderWidth: null, plotShadow: true,
            renderTo: 'threat_container', type: 'pie', label: 'positive', name: 'Sentiments'
        },
        title: {
            text: 'Country of Message Origin',
            style: {color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'blue', fontWeight: 'bold'}
        },
        subtitle: {
            text: 'Last 30 days',
            style: {fontWeight: 'bold'}
        },
        tooltip: {
            pointFormat: '<span style="font-size:10px;font-weight:bold">{series.name} : {point.y}</span>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true, cursor: 'pointer',
                dataLabels: {
                    enabled: true, format: '<b>{point.name}</b>: {point.percentage:.1f}%',
                    style: {color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black', fontSize: '9px'}
                }
            }
        },
        series: [{}]
    };
    $.get(server_base_url + "ThreatGeoService", {
        analysis: analysis, user: user
    }).done(function(jdata) {
        if (jdata != null && jdata != "Fail" && jdata != "") {
            $('#threat_container').text("");
            var count = 0;
            var temp = "";
            var data1 = new Array();
            $.each(jdata, function(index, value) {
                $.each(value, function(i, v) {
                    var data11 = new Array();
                    data11[0] = "'" + i + "'";
                    data11[1] = eval(v);
                    data1[count] = data11;
                    count++;
                });
            });
            d = [jdata[0][0], jdata[0][1]];
            options.series[0].name = "Count";
            options.series[0].data = data1;
            var chart = new Highcharts.Chart(options);
        } else {
            $('#threat_container').text("");
        }
    });
}//threat piechart end

//realtime sentiment graph start
var data1;
var data2;
var data3;
var data4;
function popularityGraph() {
    var user = getUserSessionElement("id");
    $.get(server_base_url + "Keyword", {
        userid: getUserSessionElement("id")
    }).done(function(data) {
        if (data != null && data != "Fail" && data != "") {
            $('#popularity_container').text("");
//        $.each(data, function(index, value) {
            //for positive graph
            var keywordsList = data;
//            alert(keywordsList);
            var keywordsArray = keywordsList.toString().split(",");
            var keywordString = "";
            for (i = 0; i < keywordsArray.length; i++) {
                if (i == 0) {
                    keywordString = keywordString + keywordsArray[i];
                } else {
                    keywordString = keywordString + "," + keywordsArray[i];
                }
            }
//        alert(keywordString);
            var value = "";
            $.get(server_base_url + "PopularityCountPositive", {
                keyword: keywordString
            }).done(function(data) {
                data1 = data;
                options.series[0].name = value + " positive";
                options.series[0].data = (function() {
                    var positive_data = [],
                            time = (new Date()).getTime() - 1 * (new Date().getTimezoneOffset() * 60 * 1000), i;
                    for (i = -5; i <= 0; i++) {
                        positive_data.push({
                            x: time + i * 1000,
                            y: data1
                        });
                    }
                    return positive_data;
                })()
                chart = new Highcharts.Chart(options);
            }); //positive input servlet ends 


            //for negative graph
            $.get(server_base_url + "PopularityCountNegative", {
                keyword: keywordString
            }).done(function(data) {
                data2 = data;
                options.series[1].name = value + " negative";
                options.series[1].data = (function() {
                    var negative_data = [],
                            time = (new Date()).getTime() - 1 * (new Date().getTimezoneOffset() * 60 * 1000), j;
                    for (j = -6; j <= 0; j++) {
                        negative_data.push({
                            x: time + j * 1000,
                            y: data2
                        });
                    }
                    return negative_data;
                })()
                chart = new Highcharts.Chart(options);
            }); //negative input servlet ends

            var value1 = value.replace(' ', '_');
            var value2 = value1.replace(' ', '_');
            var value3 = value2.replace(' ', '_');
            var value4 = value3.replace(' ', '_');
            $("#popularity_container").append("<div id=popularity_container_" + value4 + "/>");
            document.getElementById('popularity_container_' + value4).style.height = '400px';
            var options = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: true,
                    renderTo: 'popularity_container',
                    type: 'spline',
                    name: 'Sentiments',
                    animation: Highcharts.svg,
                    marginRight: 10,
                    events: {
                        load: function() {
                            // set up the updating of the chart each second
                            var series = this.series[0];
                            var series1 = this.series[1];
                            setInterval(function() {
                                $.get(server_base_url + "PopularityCountPositive", {
                                    keyword: keywordString
                                }).done(function(data) {
                                    data3 = data;
                                });
                                var x = (new Date()).getTime() - 1 * (new Date().getTimezoneOffset() * 60 * 1000);
                                y = data3;
                                series.addPoint([x, y], true, true);
                            }, 45000);
                            setInterval(function() {
                                $.get(server_base_url + "PopularityCountNegative", {
                                    keyword: keywordString
                                }).done(function(data) {
                                    data4 = data;
                                });
                                var x = (new Date()).getTime() - 1 * (new Date().getTimezoneOffset() * 60 * 1000);
                                y = data4;
                                series1.addPoint([x, y], true, true);
                            }, 45000);
                        }
                    }
                },
                title: {
                    text: 'Realtime Sentiments', x: 0,
                    style: {color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'orange', fontWeight: 'bold'}
                },
                xAxis: {type: 'datetime', tickPixelInterval: 150},
                yAxis: {
                    title: {
                        text: 'Count',
                        style: {color: 'orange', fontSize: '11px', fontWeight: 'bold'}
                    },
                    plotLines: [{value: 0, width: 1, color: '#808080'}]
                },
                tooltip: {
                    formatter: function() {
                        return  Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                '<b><span style="font-size: 14px;font-weight: bold">' + this.series.name + " : " + this.y + '</span></b><br/>';
                    }
                },
                exporting: {enabled: false},
                series: [{name: '', data: [], color: '#64E572'}, {name: '', data: [], color: '#ED561B'}]
            }; //options end
            options.chart.renderTo = 'popularity_container_' + value4;
//        }); //foreach ends
        } else {
            $('#popularity_container').text("");
        }
    }); //keyword servlet ends 
}//realtime sentiment graph end




////-------------------------------------------------------------------------------------
////realtime sentiment graph on leftside of dashboard
//var data1;
//var data2;
//var data3;
//var data4;
//function popularityGraph() {
//    var user = location.search.split('u=')[1];
//    $.get(server_base_url + "Keyword", {
//    }).done(function(data) {
//        $.each(data, function(index, value) {
//            //for positive graph
//            $.get(server_base_url + "PopularityCountPositive?sentiment:positive,userid:" + user, {
//                keyword: value
//            }).done(function(data) {
//                data1 = data;
//                options.series[0].name = value + " positive";
//                options.series[0].data = (function() {
//                    var positive_data = [],
//                            time = (new Date()).getTime() - 1 * (new Date().getTimezoneOffset() * 60 * 1000), i;
//                    for (i = -7; i <= 0; i++)
//                    {
//                        positive_data.push
//                                ({
//                                    x: time + i * 1000,
//                                    y: data1
//                                });
//                    }
//                    return positive_data;
//                })()
//                chart = new Highcharts.Chart(options);
//            }); //positive input servlet ends 
//
//
//            //for negative graph
//            $.get(server_base_url + "PopularityCountNegative?sentiment:negative,userid:" + user, {
//                keyword: value
//            }).done(function(data) {
//                data2 = data;
//                options.series[1].name = value + " negative";
//                options.series[1].data = (function() {
//                    var negative_data = [],
//                            time = (new Date()).getTime() - 1 * (new Date().getTimezoneOffset() * 60 * 1000), j;
//                    for (j = -8; j <= 0; j++)
//                    {
//                        negative_data.push
//                                ({
//                                    x: time + j * 1000,
//                                    y: data2
//                                });
//                    }
//                    return negative_data;
//                })()
//                chart = new Highcharts.Chart(options);
//            }); //negative input servlet ends
//
//            var value1 = value.replace(' ', '_');
//            var value2 = value1.replace(' ', '_');
//            var value3 = value2.replace(' ', '_');
//            var value4 = value3.replace(' ', '_');
//            $("#popularity_container").append("<div id=popularity_container_" + value4 + "/>");
//            document.getElementById('popularity_container_' + value4).style.height = '250px';
//            var options = {
//                chart: {
//                    plotBackgroundColor: null,
//                    plotBorderWidth: null,
//                    plotShadow: true,
//                    renderTo: 'popularity_container',
//                    type: 'spline',
//                    name: 'Sentiments',
//                    animation: Highcharts.svg,
//                    marginRight: 10,
//                    events: {
//                        load: function() {
//                            // set up the updating of the chart each second
//                            var series = this.series[0];
//                            var series1 = this.series[1];
//                            setInterval(function() {
//                                $.get(server_base_url + "PopularityCountPositive?sentiment:positive,userid:" + user, {
//                                    keyword: value
//                                }).done(function(data) {
//                                    data3 = data;
//                                });
//                                var x = (new Date()).getTime() - 1 * (new Date().getTimezoneOffset() * 60 * 1000);
//                                y = data3;
//                                series.addPoint([x, y], true, true);
//                            }, 5000);
//                            setInterval(function() {
//                                $.get(server_base_url + "PopularityCountNegative?sentiment:negative,userid:" + user, {
//                                    keyword: value
//                                }).done(function(data) {
//                                    data4 = data;
//                                });
//                                var x = (new Date()).getTime() - 1 * (new Date().getTimezoneOffset() * 60 * 1000);
//                                y = data4;
//                                series1.addPoint([x, y], true, true);
//                            }, 5000);
//                        }
//                    }
//                },
//                title: {
//                    text: 'Realtime Sentiments',
//                    x: 0,
//                    style: {
//                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'orange',
//                        fontSize: '12px',
//                        fontWeight: 'bold'
//                    }
//                },
//                xAxis: {
//                    type: 'datetime',
//                    tickPixelInterval: 150
//                },
//                yAxis: {
//                    title: {
//                        text: 'Count',
//                        style: {
//                            color: 'orange',
//                            fontSize: '11px',
//                            fontWeight: 'bold'
//                        }
//                    },
//                    plotLines: [{
//                            value: 0,
//                            width: 1,
//                            color: '#808080'
//                        }]
//                },
//                tooltip: {
//                    formatter: function() {
//                        return  Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
//                                '<b><span style="font-size: 14px;font-weight: bold">' + this.series.name + " : " + this.y + '</span></b><br/>';
//                    }
//                },
//                legend: {
//                    layout: 'vertical',
//                    verticalAlign: 'bottom',
//                    borderWidth: 0
//                },
//                exporting: {
//                    enabled: false
//                },
//                series: [{
//                        name: '',
//                        data: []
//                    }, {
//                        name: '',
//                        data: []
//                    }]
//            }; //options end
//            options.chart.renderTo = 'popularity_container_' + value4;
//        }); //foreach ends
//
//    }); //keyword servlet ends 
//}
////-------------------------------------------------------------------------------------
