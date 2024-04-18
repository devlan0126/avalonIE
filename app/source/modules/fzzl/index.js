/*
 * @Date: 2024-03-16 13:26:06
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-18 17:51:01
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
                prop: "diagCode",
            },
            {
                label: "主诊断名称",
                prop: "diagName",
            },
            {
                label: "主手术编码",
                prop: "oprnCode",
            },
            {
                label: "主手术名称",
                prop: "oprnName",
            },
            {
                label: "DRG编码",
                prop: "主手术编码",
            },
            {
                label: "DRG名称",
                prop: "drgCode",
            },
            {
                label: "DRG类型",
                prop: "drgName",
            },
            {
                label: "病组均费",
                prop: "avgFee",
            },
            {
                label: "基准点数",
                prop: "score",
            },
            {
                label: "调整系数",
                prop: "adjFactor",
            },
            {
                label: "病例类型",
                prop: "grpType",
            },
            {
                label: "预测点数",
                prop: "predictPoint",
            },
            {
                label: "预测费用",
                prop: "predictAmt",
            },
            {
                label: "预测盈亏",
                prop: "profitAmt",
            },
            {
                label: "治理提升",
                prop: "advice",
            },
        ],

        onInit: function () {
        },
        onReady: function (v) {
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {
            console.log("onDispose:", v);
        },
    },
});
