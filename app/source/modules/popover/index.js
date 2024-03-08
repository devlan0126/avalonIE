// require('./index.less')

avalon.component('ms-pop', {
    template: require('./template.html'),
    defaults: {
        show: false,
        content: "***弹框内容***",
        onClick: function ($event) {
            console.log('$event:',$event);
            this.show = true
        }
    },
    onInit: function () {
        var that = this;
        alert(that)
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
