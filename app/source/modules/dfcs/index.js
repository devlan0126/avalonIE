avalon.component("ms-dfcs", {
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
            console.log("init tab2 fzzl...................");
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
                console.log('list:', that.list);
            }, 1000);
        },
        onReady: function (v) {
            resetListHeight()
            console.log("onReady:", v);
        },
        onViewChange: function (v) {
            console.log("onViewChange:", v);
        },
        onDispose: function (v) {
            console.log("onDispose:", v);
        },
    },
});

function resetListHeight() {
    var $tab = $('.ui-tabs-panel')
    var h = $tab.height() - 50;
    $('.ms-dfcs-tab .list-ul').css('height', h + 'px');
}