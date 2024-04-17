avalon.component('ms-progress', {
    template: require("./template.html"),
    defaults: {
        processInfo: {
            real_short_amount: 0,
            drg_limit: 0,
            total_amount: 0,
        },
        onInit: function (vm, el) {
            var that = this
            that.$watch('processInfo', function () {
                console.log('**********************************************processInfo is changed', that.processInfo);
                onProgressHandle(
                    that.processInfo,
                    document.getElementById('progressBarActive')
                );
            })
        },
        onReady: function () {
        },
        onViewChange: function () {
        },
        onDispose: function () {
        },
    }
})


function onProgressHandle(drgGroupInfo, dom) {
    var lowCutoff = parseFloat(drgGroupInfo.real_short_amount ? drgGroupInfo.real_short_amount : 0.00)
    var highCutoff = parseFloat(drgGroupInfo.drg_limit ? drgGroupInfo.drg_limit : 0.00)
    var hispitalTotalAvg = ((highCutoff - lowCutoff) / 2);
    var cost = parseFloat(drgGroupInfo.total_amount ? drgGroupInfo.total_amount : 0.00)

    var stepVal = 0.25
    var percentVal = 0.00
    if (cost < lowCutoff) {
        var offset = lowCutoff - cost
        var offStep = lowCutoff
        percentVal = (1 - offset / offStep) * stepVal
    } else if (cost >= lowCutoff && cost < hispitalTotalAvg) {
        var offset = cost - lowCutoff
        var offStep = hispitalTotalAvg - lowCutoff
        percentVal = (offset / offStep) * stepVal + stepVal
    } else if (cost >= hispitalTotalAvg && cost <= highCutoff) {
        var offset = cost - hispitalTotalAvg
        var offStep = highCutoff - hispitalTotalAvg
        percentVal = (offset / offStep) * stepVal + stepVal * 2
    } else if (cost > highCutoff) {
        var offset = cost - highCutoff
        var offStep = highCutoff
        var ratio = (offset / offStep) > 2 ? 1 : (offset / (2 * offStep))
        percentVal = ratio * stepVal + stepVal * 3
    }

    if (isNaN(percentVal)) percentVal = 0
    var percent = Math.round(percentVal * 100);

    var colors = getColor(percent);
    console.log('percent>>', percent);
    dom.style.width = percent + '%'
    dom.style.background = 'linear-gradient(to right,' + colors[0] + ', ' + colors[1] + ')'
    dom.style.filter = 'progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr=' + colors[0] + ', endColorstr=' + colors[1] + ')'
    dom.style['-ms-filter'] = '"progid:DXImageTransform.Microsoft.gradient (GradientType=1, startColorstr=' + colors[0] + ', endColorstr=' + colors[1] + ')"'
}

function getColor(percent) {
    var colors = gradientColors('#e4d9d1', '#bf4a43', 100, 1)
    return ['#e4d9d1', colors[percent - 1]]
}

function hexToRgb(hexColor) {
    if (hexColor.length === 4) {
        var arr = []
        var hexColorArr = hexColor.substr(1).split('');
        for (var i = 0; i < hexColorArr.length; i++) {
            var s = hexColorArr[i];
            arr.push(0x11 * parseInt(s, 16))
        }
        return arr;
    } else {
        var arr = []
        var hexColorArr = [hexColor.substr(1, 2), hexColor.substr(3, 2), hexColor.substr(5, 2)];
        for (var i = 0; i < hexColorArr.length; i++) {
            var s = hexColorArr[i];
            arr.push(parseInt(s, 16))
        }
        return arr;
    }
}

function pad(s) {
    return s.length === 1 ? '0' + s : s
}

function gradientColors(start, end, steps, gamma) {
    var i, j, ms, me, output = [], so = []
    gamma = gamma || 1
    var normalize = function (channel) {
        return Math.pow(channel / 255, gamma)
    }
    start = hexToRgb(start).map(normalize)
    end = hexToRgb(end).map(normalize)

    for (i = 0; i < steps; i++) {
        ms = i / (steps - 1)
        me = 1 - ms
        for (j = 0; j < 3; j++) {
            so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16))
        }
        output.push('#' + so.join(''))
    }
    return output
}