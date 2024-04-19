/*
 * @Date: 2024-04-10 18:13:59
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-16 11:14:57
 * @FilePath: \avalonIE\app\source\modules\mcc\index.js
 * @Description: 文档描述
 */
avalon.component("ms-mcc", {
    template: require("./template.html"),
    defaults: {
        mccList: [],
        mccTotal: 0,
        mccCurrentPage: 1,
        searchMccValue: "",
        mccTimer: {},

        ccList: [],
        ccTotal: 0,
        ccCurrentPage: 1,
        searchCcValue: "",
        ccTimer: {},
        isLarge: false,
        onInit: function () {
        },
        onReady: function (v) {
            resetListHeight()
            this.$watch('isLarge', function () {
                setTimeout(() => {
                    resetListHeight()
                }, 100);
            })
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {
            console.log("onDispose:", v);
        },
        onMccChange: function ($event) {
            var that = this
            clearTimeout(that.diagTimer);
            that.diagTimer = setTimeout(function () {
                that.resetMccTableData()
                var srcElement = $event.srcElement;
                if (srcElement) {
                    var value = srcElement.value;
                    that.searchMccValue = value
                    if (value) {
                        that.mccCurrentPage = 1;
                        that.requestMccList()
                    }
                }
            }, 1000)
        },
        onMccPageClick: function ($event, page) {
            this.mccCurrentPage = page;
            this.requestMccList()
        },
        requestMccList: function () {
            var that = this
            $.ajax({
                url: '/hprs/sim/mcc',
                type: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                data: 'ver=CHS628&pageNum=' + that.mccCurrentPage + '&pageSize=10&data=' + that.searchMccValue,
                success: function (res) {
                    if (res.code === 200) {
                        that.mccList = res.data
                        that.mccTotal = res.total;
                    }
                }
            });
        },
        resetMccTableData: function () {
            this.mccList = []
            this.mccTotal = 0
            this.mccCurrentPage = 1
            this.searchMccValue = ""
        },
        onCcChange: function ($event) {
            var that = this
            clearTimeout(that.ccTimer);
            that.ccTimer = setTimeout(function () {
                that.resetCcTableData()
                var srcElement = $event.srcElement;
                if (srcElement) {
                    var value = srcElement.value;
                    that.searchCcValue = value
                    if (value) {
                        that.ccCurrentPage = 1;
                        that.requestCcList()
                    }
                }
            }, 1000)
        },
        onCcPageClick: function ($event, page) {
            this.ccCurrentPage = page;
            this.requestCcList()
        },
        resetCcTableData: function () {
            this.ccList = []
            this.ccTotal = 0
            this.ccCurrentPage = 1
            this.searchCcValue = ""
        },
        requestCcList: function () {
            var that = this
            $.ajax({
                url: '/hprs/sim/cc',
                type: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                data: 'ver=CHS628&pageNum=' + that.ccCurrentPage + '&pageSize=10&data=' + that.searchCcValue,
                success: function (res) {
                    if (res.code === 200) {
                        that.ccList = res.data
                        that.ccTotal = res.total;
                    }
                }
            });
        },
    },
});


function resetListHeight() {
    var $tab = $('.ui-tabs-panel')
    var h = $tab.height() - 50 - 45;
    $('.mdc-mcc-tab__list').css('height', h + 'px');

}