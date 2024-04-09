/*
 * @Date: 2024-03-09 11:39:44
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-09 18:24:15
 * @FilePath: \avalonIE\app\source\modules\popover2\index.js
 * @Description: 文档描述
 */
avalon.component("ms-pop2", {
    template: require("./template.html"),
    defaults: {
        show: false,
        data: "",
        list: [],
        source: [],
        zIndex: 1,
        timer: null,
        onClick: function ($event) {
            this.show = true;
            this.source = window.lonsDiagnoses
        },
        onChange: function ($event) {
            var that = this
            clearTimeout(that.timer);
            that.timer = setTimeout(function () {
                var srcElement = $event.srcElement;
                if (srcElement) {
                    var value = srcElement.value;
                    if (value) {
                        var temp = []
                        for (var i = 0; that.source.length > i; i++) {
                            if (that.source[i].diagnoseCode.indexOf(value) > -1 || that.source[i].diagnoseName.indexOf(value) > -1) {
                                temp.push(that.source[i])
                            }
                        }
                        that.list = temp.slice(0, 100)
                    } else {
                        that.list = []
                    }
                } else {
                    that.list = []
                }
            }, 1000)
        },
        onSelectRow: function ($event, row) {
            this.data = row.diagnoseCode + "  " + row.diagnoseName
            this.show = false;
        },
        onInit: function () {
            var that = this;
            window.addEvent(document
                .getElementsByTagName("body")[0], 'click', function ($event) {
                    var $child = $event.srcElement;
                    var $parent = that.$element;
                    if ($parent.contains) {
                        if (!$parent.contains($child)) {
                            that.show = false;
                        } else {
                            that.show = true;
                        }
                    } else if (!isChildOf($child, $parent)) {
                        that.show = false;
                    } else {
                        that.show = true;
                    }
                })
        },
        onReady: function (v) {
            console.log("onReady:", v);
        },
        onViewChange: function (v) {
            console.log("onViewChange:", v);
        },
        onDispose: function (v) {
            console.log("onDispose:", v);
        },
    },
});



function isChildOf(child, parent) {
    var parentNode;
    if (child && parent) {
        parentNode = child.parentNode;
        while (parentNode) {
            if (parent === parentNode) {
                return true;
            }
            parentNode = parentNode.parentNode;
        }
    }
    return false;
}
