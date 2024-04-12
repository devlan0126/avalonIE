/*
 * @Date: 2024-03-16 13:26:06
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-12 10:07:25
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

            var that = this;
            // query the list data
            setTimeout(function () {
                that.list = [
                    { mainDiagCode: "item1", mainDiagName: "mainDiagName", mainOprnCode: 'mainOprnCode', mainOprnName: 'mainOprnName', drgCode: 'drgCode', drgName: 'drgName' },
                    { mainDiagCode: "item1", mainDiagName: "mainDiagName", mainOprnCode: 'mainOprnCode', mainOprnName: 'mainOprnName', drgCode: 'drgCode', drgName: 'drgName' },
                    { mainDiagCode: "item1", mainDiagName: "mainDiagName", mainOprnCode: 'mainOprnCode', mainOprnName: 'mainOprnName', drgCode: 'drgCode', drgName: 'drgName' },
                    { mainDiagCode: "item1", mainDiagName: "mainDiagName", mainOprnCode: 'mainOprnCode', mainOprnName: 'mainOprnName', drgCode: 'drgCode', drgName: 'drgName' },
                ];
                that.show = true;
                ;
            }, 1000);
        },
        onReady: function (v) {
            ;
        },
        onViewChange: function (v) {
            console.log("onViewChange:", v);
        },
        onDispose: function (v) {
            console.log("onDispose:", v);
        },
    },
});
