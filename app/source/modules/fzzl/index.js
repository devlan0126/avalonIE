/*
 * @Date: 2024-03-16 13:26:06
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-15 11:51:18
 * @FilePath: \avalonIE\app\source\modules\fzzl\index.js
 * @Description: 文档描述
 */
avalon.component("ms-fzzl", {
    template: require("./template.html"),
    defaults: {
        show: false,
        list: [],
        columns: [
            {
                label: "主诊断编码",
                prop: "主诊断编码",
            },
            {
                label: "主诊断名称",
                prop: "主诊断名称",
            },
            {
                label: "主手术编码",
                prop: "主手术编码",
            },
            {
                label: "主手术名称",
                prop: "主手术编码",
            },
            {
                label: "DRG编码",
                prop: "主手术编码",
            },
            {
                label: "DRG名称",
                prop: "主手术编码",
            },
            {
                label: "DRG类型",
                prop: "主手术编码",
            },
            {
                label: "病组均费",
                prop: "主手术编码",
            },
            {
                label: "基准点数",
                prop: "主手术编码",
            },
            {
                label: "调整系数",
                prop: "主手术编码",
            },
            {
                label: "病例类型",
                prop: "主手术编码",
            },
            {
                label: "预测点数",
                prop: "主手术编码",
            },
            {
                label: "预测费用",
                prop: "主手术编码",
            },
            {
                label: "预测盈亏",
                prop: "主手术编码",
            },
            {
                label: "治理提升",
                prop: "主手术编码",
            },
        ],

        onInit: function () {
        },
        onReady: function (v) {
            this.requestList()
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {
            console.log("onDispose:", v);
        },
        requestList: function () {
            var that = this;
            $.ajax({
                url: '/hprs/sim/grpAdvice',
                type: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                data: 'ver=CHS628&pageNum=' + that.diagCurrentPage + '&pageSize=10&data=' + that.searchDiagValue,
                success: function (res) {
                    if (res.code === 200) {
                        that.list = res.data
                    }
                }
            });
        }
    },
});
