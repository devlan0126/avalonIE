/*
 * @Date: 2024-04-10 17:59:09
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-12 17:53:58
 * @FilePath: \avalonIE\app\source\modules\adrg\index.js
 * @Description: 文档描述
 */
avalon.component("ms-adrg", {
    template: require("./template.html"),
    defaults: {
        diagList: [],
        diagTotal: 0,
        diagCurrentPage: 1,
        diagTimer: {},
        searchDiagValue: "",

        adrgList: [],
        adrgTotal: 0,
        adrgCurrentPage: 1,
        adrgTimer: {},
        searchAdrgValue: "",

        operList: [],
        operTotal: 0,
        operCurrentPage: 1,
        operTimer: {},
        searchOperValue: "",
        onInit: function () {
        },
        onReady: function (v) {
            resetListHeight()
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {

        },
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
                url: '/hprs/sim/adrgCondDiag',
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
        onAdrgChange: function ($event) {
            var that = this
            clearTimeout(that.adrgTimer);
            that.adrgTimer = setTimeout(function () {
                that.resetAdrgTableData()
                var srcElement = $event.srcElement;
                if (srcElement) {
                    var value = srcElement.value;
                    that.searchAdrgValue = value
                    if (value) {
                        that.adrgCurrentPage = 1;
                        that.requestAdrgList()
                    }
                }
            }, 1000)
        },
        onAdrgPageClick: function ($event, page) {
            this.adrgCurrentPage = page;
            this.requestAdrgList()
        },
        requestAdrgList: function (params) {
            var that = this
            $.ajax({
                url: '/hprs/sim/adrg',
                type: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                data: params || 'ver=CHS628&pageNum=' + that.adrgCurrentPage + '&pageSize=10&data=' + that.searchAdrgValue,
                success: function (res) {
                    if (res.code === 200) {
                        that.adrgList = res.data
                        that.adrgTotal = res.total;
                    }
                }
            });
        },
        resetAdrgTableData: function () {
            this.adrgList = []
            this.adrgTotal = 0
            this.adrgCurrentPage = 1
            this.searchAdrgValue = ""
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
                url: '/hprs/sim/adrgCondOper',
                type: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                data: 'ver=CHS628&pageNum=' + that.operCurrentPage + '&pageSize=10&data=' + that.searchOperValue,
                success: function (res) {
                    if (res.code === 200) {
                        that.operList = res.data
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
        onDiagClick: function ($event, row) {
            this.adrgCurrentPage = 1;
            this.requestAdrgList('ver=CHS628&pageNum=1&pageSize=10&diagnoseCode=' + row.code)
        },
        onOperClick: function ($event, row) {
            this.adrgCurrentPage = 1;
            this.requestAdrgList('ver=CHS628&pageNum=1&pageSize=10&operationCode=' + row.code)
        }
    }
});


function resetListHeight() {
    var $tab = $('.ui-tabs-panel')
    var h = $tab.height() - 50 - 45;
    $('.mdc-adrg-tab__list').css('height', h + 'px');

}