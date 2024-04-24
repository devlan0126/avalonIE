
/*
 * @Date: 2024-04-24 14:16:38
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-24 17:56:00
 * @FilePath: \avalonIE\app\source\modules\imgPreview\index.js
 * @Description: 文档描述
 */
avalon.component("ms-imgPreview", {
    template: require("./template.html"),
    defaults: {
        show: false,
        curImg: '',
        imgList: [],
        closeEvent: avalon.noop,
        onInit: function () { },
        onReady: function (v) {
            var clientWidth = document.documentElement.clientWidth;
            var left = (clientWidth - 700) / 2;
            $('.preview-content').css('left', left + 'px');

            var that = this
            that.$watch('imgList', function () {
            })
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {
            console.log("onDispose:", v);
        },
        closePreview: function () {
            return this.closeEvent()
        }
    },
});
