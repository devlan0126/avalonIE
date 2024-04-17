/*
 * @Date: 2024-03-09 11:39:44
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-12 16:43:08
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
        timer: {},
        total: 0,
        currentPage: 1,
        searchValue: "",
        onUpdateSelect: avalon.noop,
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
                    that.searchValue = value
                    if (value) {
                        that.currentPage = 1;
                        that.requestList()
                    } else {
                        that.list = []
                    }
                } else {
                    that.list = []
                }
            }, 1000)
        },
        requestList: function () {
            var that = this
            $.ajax({
                url: '/hprs/diagnose/pageList',
                type: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                data: '{"pageNum":' + this.currentPage + ',"pageSize":10,"diagnose":"' + this.searchValue + '"}',
                success: function (res) {
                    if (res.code === 200) {
                        that.list = res.data.list;
                        that.total = res.data.total;
                    }
                }
            });
        },
        onPageClick: function ($event, page) {
            console.log("onPageClick:", page)
            this.currentPage = page;
            this.requestList()
        },
        onSelectRow: function ($event, row) {
            this.data = row.diagnoseCode + "  " + row.diagnoseName
            this.show = false;
            this.updateValue(row.diagnoseCode)
        },
        updateValue: function (diagnoseCode) {
            return this.onUpdateSelect(diagnoseCode)
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
            var $inputContent = $('.ms-pop2 .input-content')
            var width = $inputContent.width()
            $inputContent.css("width", width + 'px');
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {

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
