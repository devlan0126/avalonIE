/*
 * @Date: 2024-04-10 18:13:59
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-10 18:14:23
 * @FilePath: \avalonIE\app\source\modules\mcc\index.js
 * @Description: 文档描述
 */
avalon.component("ms-mcc", {
    template: require("./template.html"),
    defaults: {
        show: false,
        list: [],
        columns: [
            {
                label: "主诊断编码",
                prop: "mainDiagCode",
            },
            {
                label: "主诊断名称",
                prop: "mainDiagName",
            },
            {
                label: "主手术编码",
                prop: "mainOprnCode",
            },
            {
                label: "主手术名称",
                prop: "mainOprnName",
            },
            {
                label: "DRG编码",
                prop: "drgCode",
            },
            {
                label: "DRG名称",
                prop: "drgName",
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
            resetListHeight()
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {
            console.log("onDispose:", v);
        },
    },
});


function resetListHeight() {
    var $tab = $('.ui-tabs-panel')
    var h = $tab.height() - 50;
    $('.mdc-mcc-tab__list').css('height', h + 'px');

}