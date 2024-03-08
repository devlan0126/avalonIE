/*
 * @Date: 2024-03-08 11:51:42
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-03-08 14:19:34
 * @FilePath: \avalonIE\app\source\modules\content\index.js
 * @Description: 文档描述
 */
avalon.component('ms-view', {
    template: '<div class="view"><slot name="content" /></div>',
    defaults: {
        content: ""
    },
    onInit: function (vm, el) {
        console.log('onInit:', vm)
    },
    onReady: function () {
        console.log('onReady:', v)
    },
    onViewChange: function () {
        console.log('onViewChange:', v)
    },
    onDispose: function () {
        console.log('onDispose:', v)
    },
})
