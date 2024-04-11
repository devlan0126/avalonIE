/*
 * @Date: 2024-03-09 11:39:44
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-11 20:40:44
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
        total: 1,
        currentPage: 1,
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
                        $.ajax({
                            url: '/hprs/diagnose/pageList',
                            type: 'POST',
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            dataType: 'json',
                            data: '{"pageNum":1,"pageSize":20,"diagnose":"' + value + '"}',
                            success: function (res) {
                                if (res.code === 200) {
                                    that.list = res.data.list;
                                    that.total = res.data.total;
                                }
                            }
                        });
                    } else {
                        that.list = []
                    }
                } else {
                    that.list = []
                }
            }, 1000)
        },
        onPageClick: function ($event, page) {
            console.log("onPageClick:", page)
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
