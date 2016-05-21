function prepareSignature() {
    var topics = {};
    $.publish = function(topic, args) {
        if (topics[topic]) {
            var currentTopic = topics[topic],
                    args = args || {};

            for (var i = 0, j = currentTopic.length; i < j; i++) {
                currentTopic[i].call($, args);
            }
        }
    };
    $.subscribe = function(topic, callback) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        topics[topic].push(callback);
        return {
            "topic": topic,
            "callback": callback
        };
    };
}


function prepareSignatureForm() {
    var $sigdiv = $("#signature").jSignature()
            , $tools = $('#tools')
            , $extraarea = $('#displayarea')
            , pubsubprefix = 'jSignature.demo.'

    var export_plugins = $sigdiv.jSignature('listPlugins', 'export')
            , chops = ['<select id="conversionOptionId" style="display:none;">', '<option value="">(select export format)</option>']
            , name
    for (var i in export_plugins) {
        if (export_plugins.hasOwnProperty(i)) {
            name = export_plugins[i]
            chops.push('<option value="' + name + '">' + name + '</option>')
        }
    }
    chops.push('</select>')

    $(chops.join('')).bind('change', function(e) {
        if (e.target.value !== '') {
            var data = $sigdiv.jSignature('getData', e.target.value)
            $.publish(pubsubprefix + 'formatchanged')
            if (typeof data === 'string') {
                $('textarea', $tools).val(data)
            } else if ($.isArray(data) && data.length === 2) {
                $('textarea', $tools).val(data.join(','))
                $.publish(pubsubprefix + data[0], data);
            } else {
                try {
                    $('textarea', $tools).val(JSON.stringify(data))
                } catch (ex) {
                    $('textarea', $tools).val('')
                }
            }
        }
    }).appendTo($tools)

    $('<div><textarea style="width:100%;display:none;height:7em;" id="imageStringId"></textarea></div>').appendTo($tools)

    $('<a style="cursor:pointer;float:left;">Clear</a>').click(function(e) {
        $sigdiv.jSignature('reset')
        $("#displaySignatureMsg").text("");
    }).appendTo($tools)
}