avalon.component("ms-fzzl", {
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
