/*
 * @Date: 2024-03-19 21:01:59
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-19 18:30:32
 * @FilePath: \avalonIE\app\source\modules\mdcAdrg\index.js
 * @Description: 文档描述
 */
avalon.component("ms-mdcAdrg", {
    template: require("./template.html"),
    defaults: {
        diagList: [],
        diagTotal: 0,
        diagCurrentPage: 1,
        operList: [],
        operTotal: 0,
        operCurrentPage: 1,
        diagTimer: {},
        operTimer: {},
        searchDiagValue: "",
        searchOperValue: "",
        isLarge: false,
        onDiagChange: function ($event) {
            var that = this
            clearTimeout(that.diagTimer);
            that.diagTimer = setTimeout(function () {
                that.resetDiagTableData()
                var srcElement = $event.srcElement;
                if (srcElement) {
                    var value = srcElement.value;
                    that.searchDiagValue = value
                    if (value) {
                        that.diagCurrentPage = 1;
                        that.requestDiagList()
                    }
                }
            }, 1000)
        },
        onDiagPageClick: function ($event, page) {
            this.diagCurrentPage = page;
            this.requestDiagList()
        },
        requestDiagList: function () {
            var that = this
            $.ajax({
                url: '/hprs/sim/diagQuery',
                type: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                data: 'ver=CHS628&pageNum=' + that.diagCurrentPage + '&pageSize=10&data=' + that.searchDiagValue,
                success: function (res) {
                    if (res.code === 200) {
                        that.diagList = res.data
                        that.diagTotal = res.total;
                    }
                }
            });
        },
        resetDiagTableData: function () {
            this.diagList = []
            this.diagTotal = 0
            this.diagCurrentPage = 1
            this.searchDiagValue = ""
        },
        onOperChange: function ($event) {
            var that = this
            clearTimeout(that.operTimer);
            that.operTimer = setTimeout(function () {
                that.resetOperTableData()
                var srcElement = $event.srcElement;
                if (srcElement) {
                    var value = srcElement.value;
                    that.searchOperValue = value
                    if (value) {
                        that.operCurrentPage = 1;
                        that.requestOperList()
                    }
                }
            }, 1000)
        },
        onOperPageClick: function ($event, page) {
            this.operCurrentPage = page;
            this.requestOperList()
        },
        requestOperList: function () {
            var that = this
            $.ajax({
                url: '/hprs/sim/operQuery',
                type: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                data: 'ver=CHS628&pageNum=' + that.operCurrentPage + '&pageSize=10&data=' + that.searchOperValue,
                success: function (res) {
                    if (res.code === 200) {
                        that.operList = res.data;
                        that.operTotal = res.total;
                    }
                }
            });
        },
        resetOperTableData: function () {
            this.operList = []
            this.operTotal = 0
            this.operCurrentPage = 1
            this.searchOperValue = ""
        },
        onInit: function () {
        },
        onReady: function (v) {
            window.mdcAdrgResize()
            this.$watch('isLarge', function () {
                setTimeout(() => {
                    window.mdcAdrgResize()
                }, 500);
            })
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {

        },
    },
});

