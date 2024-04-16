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
