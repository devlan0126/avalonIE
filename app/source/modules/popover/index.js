/*
 * @Date: 2024-03-08 13:24:46
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-11 10:28:21
 * @FilePath: \avalonIE\app\source\modules\popover\index.js
 * @Description: 文档描述
 */
avalon.component("ms-pop", {
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
            this.source = window.lonsOperations
        },
        onChange: function ($event) {
            var that = this;
            clearTimeout(that.timer);
            that.timer = setTimeout(function () {
                var srcElement = $event.srcElement;
                if (srcElement) {
                    var value = srcElement.value;
                    if (value) {
                        $.ajax({
                            url: '/hprs/operation/pageList',
                            type: 'POST',
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            dataType: 'json',
                            data: '{"pageNum":1,"pageSize":20,"operation":"' + value + '"}',
                            success: function (res) {
                                if (res.code === 200) {
                                    that.list = res.data.list;
                                }
                            }
                        });
                    } else {
                        that.list = [];
                    }
                } else {
                    that.list = [];
                }
            }, 1000);
        },
        onSelectRow: function ($event, row) {
            this.data = row.operationCode + "  " + row.operationName;
            this.show = false;
        },
        onInit: function () {
            var that = this;
            window.addEvent(
                document.getElementsByTagName("body")[0],
                "click",
                function ($event) {
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
                }
            );
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
