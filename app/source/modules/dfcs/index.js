/*
 * @Date: 2024-04-10 18:20:40
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-19 18:28:36
 * @FilePath: \avalonIE\app\source\modules\dfcs\index.js
 * @Description: 文档描述
 */
avalon.component("ms-dfcs", {
    template: require("./template.html"),
    defaults: {
        show: false,
        list: [],
        total: 0,
        currentPage: 1,
        searchDiagValue: "",
        searchPartValue: "",
        timer: {},
        columns: [
            {
                label: "诊断编码",
                prop: "code",
            },
            {
                label: "诊断名称",
                prop: "name",
            },
            {
                label: "创伤部位",
                prop: "part",
            },
        ],
        isLarge: false,
        onInit: function () {
        },
        onReady: function (v) {
            window.dfcsResize()
            this.$watch('isLarge', function () {
                setTimeout(function () {
                    window.dfcsResize()
                }, 500);
            })
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {
            console.log("onDispose:", v);
        },
        onDiagChange: function ($event) {
            var that = this
            clearTimeout(that.timer);
            that.timer = setTimeout(function () {
                that.resetTableData()
                var srcElement = $event.srcElement;
                if (srcElement) {
                    var value = srcElement.value;
                    that.searchDiagValue = value
                    if (value) {
                        that.currentPage = 1;
                        that.requestList()
                    }
                }
            }, 1000)
        },
        onDiagBlur: function () {
            // this.searchDiagValue = ""
            $('#dfDiagInput').val('')
        },
        onPartChange: function ($event) {
            var that = this
            clearTimeout(that.diagTimer);
            that.diagTimer = setTimeout(function () {
                that.resetTableData()
                var srcElement = $event.srcElement;
                if (srcElement) {
                    var value = srcElement.value;
                    that.searchPartValue = value
                    if (value) {
                        that.currentPage = 1;
                        that.requestList()
                    }
                }
            }, 1000)
        },
        onPageClick: function ($event, page) {
            this.currentPage = page;
            this.requestList()
        },
        requestList: function () {
            var that = this
            $.ajax({
                url: '/hprs/sim/mdcz',
                type: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                data: 'ver=CHS628&pageNum=' + that.currentPage + '&pageSize=10&data=' + that.searchDiagValue + '&part=' + that.searchPartValue,
                success: function (res) {
                    if (res.code === 200) {
                        that.list = res.data
                        that.total = res.total;
                    }
                }
            });
        },
        resetTableData: function () {
            this.list = []
            this.total = 0
            this.currentPage = 1
            this.searchDiagValue = ""
            this.searchPartValue = ""
        },
        onPartBlur: function () {
            // this.searchPartValue = ""
            $('#dfPartInput').val('')
        }
    },
});
