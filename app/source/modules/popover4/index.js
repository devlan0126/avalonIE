/*
 * @Date: 2024-03-09 13:02:16
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-12 16:43:17
 * @FilePath: \avalonIE\app\source\modules\popover4\index.js
 * @Description: 文档描述
 */
avalon.component("ms-pop4", {
    template: require("./template.html"),
    defaults: {
        show: false,
        data: "",
        list: [],
        source: [],
        selection: [],
        zIndex: 1,
        timer: {},
        total: 0,
        currentPage: 1,
        searchValue: "",
        onClick: function ($event) {
            this.show = true;
            this.source = window.lonsDiagnoses
        },
        onChange: function ($event) {
            var that = this
            clearTimeout(that.timer);
            that.timer = setTimeout(function () {
                that.resetTableData()
                var srcElement = $event.srcElement;
                if (srcElement) {
                    var value = srcElement.value;
                    that.searchValue = value
                    if (value) {
                        that.currentPage = 1;
                        that.requestList()
                    }
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
        resetTableData: function () {
            this.list = []
            this.total = 0
            this.currentPage = 1
            this.searchValue = ""
        },
        onPageClick: function ($event, page) {
            console.log("onPageClick:", page)
            this.currentPage = page;
            this.requestList()
        },
        onSelectRow: function ($event, row, index) {
            this.selection.push(row)
            this.list.splice(index, 1)
            this.setData()
        },
        onRemoveRow: function ($event, index) {
            this.list.unshift(this.selection[index])
            this.selection.splice(index, 1)
            this.setData()
        },
        setData: function () {
            if (this.selection.length > 0) {
                var temp = []
                for (var i = 0; i < this.selection.length; i++) {
                    temp.push(this.selection[i].diagnoseCode + ',' + this.selection[i].diagnoseName)
                }
                this.data = temp.join(' | ');
            } else {
                this.data = ''
            }
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
            var $inputContent = $('.ms-pop4 .input-content')
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
