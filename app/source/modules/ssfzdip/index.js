/*
 * @Date: 2024-04-10 14:53:21
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-12 16:44:09
 * @FilePath: \avalonIE\app\source\modules\ssfzdip\index.js
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
        timer: {},
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
            ;
        },
        onViewChange: function (v) {
             
        },
        onDispose: function (v) {
             
        },
    },
});

