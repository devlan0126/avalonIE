/*
 * @Date: 2024-04-10 17:59:09
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-05-14 11:07:56
 * @FilePath: \avalonIE\app\source\modules\adrg\index.js
 * @Description: 文档描述
 */
avalon.component("ms-adrg", {
    template: require("./template.html"),
    defaults: {
        diagHighIndex: -1,
        diagList: [],
        diagTotal: 0,
        diagCurrentPage: 1,
        diagTimer: {},
        searchDiagValue: "",

        adrgHighIndex: -1,
        adrgList: [],
        adrgTotal: 0,
        adrgCurrentPage: 1,
        adrgTimer: {},
        searchAdrgValue: "",

        operHighIndex: -1,
        operList: [],
        operTotal: 0,
        operCurrentPage: 1,
        operTimer: {},
        searchOperValue: "",
        isLarge: false,
        diagSortClear: false,
        operaSortClear: false,
        diagSortBy: '',
        diagSortProp: '',
        operaSortBy: '',
        operaSortProp: '',

        onInit: function () {
        },
        onReady: function (v) {
            window.adrgResize()
            initStyle()
            this.$watch('isLarge', function () {
                setTimeout(function () {
                    window.adrgResize()
                }, 500);
            })
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
                        that.diagSortClear = true
                        that.diagSortBy = ''
                        that.diagSortProp = ''
                        that.requestDiagList()
                    }
                }
            }, 1000)
        },
        onDiagPageClick: function ($event, page) {
            this.diagCurrentPage = page;
            this.requestDiagList()
        },
        requestDiagList: function (params) {
            var that = this
            var sortParams = !this.diagSortBy ? '' : '&isAsc=' + this.diagSortBy + '&orderByColumn=' + this.diagSortProp
            $.ajax({
                url: '/hprs/sim/adrgCondDiag',
                type: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                data: params || 'ver=CHS628&pageNum=' + that.diagCurrentPage + '&pageSize=10&data=' + that.searchDiagValue + sortParams,
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
            this.diagHighIndex = -1
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
            this.adrgHighIndex = -1
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
                        that.operaSortClear = true
                        that.operaSortBy = ''
                        that.operaSortProp = ''
                        that.requestOperList()
                    }
                }
            }, 1000)
        },
        onOperPageClick: function ($event, page) {
            this.operCurrentPage = page;
            this.requestOperList()
        },
        requestOperList: function (params) {
            var that = this
            var sortParams = !this.operaSortBy ? '' : '&isAsc=' + this.operaSortBy + '&orderByColumn=' + this.operaSortProp
            $.ajax({
                url: '/hprs/sim/adrgCondOper',
                type: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                data: params || 'ver=CHS628&pageNum=' + that.operCurrentPage + '&pageSize=10&data=' + that.searchOperValue + sortParams,
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
            this.operHighIndex = -1
        },
        onAdrgClick: function ($event, row, index) {
            this.diagCurrentPage = 1;
            this.operCurrentPage = 1;
            this.adrgHighIndex = index;
            this.diagHighIndex = -1;
            this.operHighIndex = -1;
            this.searchDiagValue = "";
            this.searchOperValue = "";
            document.getElementsByName('diagInputName')[0].value = ''
            document.getElementsByName('operInputName')[0].value = ''
            this.requestDiagList('ver=CHS628&pageNum=1&pageSize=10&adrgCode=' + row.code)
            this.requestOperList('ver=CHS628&pageNum=1&pageSize=10&adrgCode=' + row.code)
        },
        onDiagClick: function ($event, row, index) {
            this.adrgCurrentPage = 1;
            this.diagHighIndex = index;
            this.adrgHighIndex = -1;
            this.searchAdrgValue = "";
            document.getElementsByName('adrgInputName')[0].value = ''
            this.requestAdrgList('ver=CHS628&pageNum=1&pageSize=10&diagnoseCode=' + row.code)
        },
        onOperClick: function ($event, row, index) {
            this.adrgCurrentPage = 1;
            this.operHighIndex = index;
            this.adrgHighIndex = -1;
            this.searchAdrgValue = "";
            document.getElementsByName('adrgInputName')[0].value = ''
            this.requestAdrgList('ver=CHS628&pageNum=1&pageSize=10&operationCode=' + row.code)
        },
        diagSortEmit: function (prop, sortBy) {
            this.diagSortClear = false
            this.diagCurrentPage = 1
            this.diagSortBy = sortBy === 'default' ? '' : sortBy
            this.diagSortProp = prop
            this.requestDiagList()
        },
        operationSortEmit: function (prop, sortBy) {
            this.operaSortClear = false
            this.operCurrentPage = 1
            this.operaSortBy = sortBy === 'default' ? '' : sortBy
            this.operaSortProp = prop
            this.requestOperList()
        },
    }
});

function initStyle() {
    var $tab = $('.ui-tabs-panel')
    var w = $tab.width();
    $('.adrg-table-cell').css('width', w / 3 + 'px');
}