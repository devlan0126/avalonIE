/*
 * @Date: 2024-04-10 14:53:21
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-10 14:57:20
 * @FilePath: \avalonIE\app\source\modules\ssfzdrg\index.js
 * @Description: 文档描述
 */
avalon.component("ms-ssfzdip", {
    template: require("./template.html"),
    defaults: {
        show: false,
        data: "",
        list: [],
        source: [],
        zIndex: 1,
        timer: null,
        onClick: function ($event) {
        },
        onChange: function ($event) {
        },
        onSelectRow: function ($event, row) {
        },
        onInit: function () {
            var that = this;
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

