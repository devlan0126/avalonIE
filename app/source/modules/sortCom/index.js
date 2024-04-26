/*
 * @Date: 2024-04-26 11:19:56
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-26 15:54:15
 * @FilePath: \avalonIE\app\source\modules\sortCom\index.js
 * @Description: 文档描述
 */
avalon.component("ms-sort", {
    template: require("./template.html"),
    defaults: {
        sortBy: 'default',
        title: '字段',
        prop: '',
        sortEmit: avalon.noop,
        clear: false,
        onInit: function () { },
        onReady: function (v) {
            var that = this
            that.$watch('clear', function () {
                if (that.clear) {
                    that.sortBy = 'default'
                }
            })
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {
        },
        onSort: function () {
            if (this.sortBy === 'default') {
                this.sortBy = 'asc'
            } else if (this.sortBy === 'asc') {
                this.sortBy = 'desc'
            } else if (this.sortBy === 'desc') {
                this.sortBy = 'default'
            }
            this.emitEvent()
        },
        setSort: function (sortBy) {
            this.sortBy = sortBy
            this.emitEvent()
        },
        emitEvent: function () {
            return this.sortEmit(this.prop, this.sortBy)
        }
    },
});



