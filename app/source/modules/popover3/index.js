avalon.component("ms-pop3", {
    template: require("./template.html"),
    defaults: {
        show: false,
        data: "J18.903,重症肺炎",
        list: [],
        zIndex: 1,
        onClick: function ($event) {
            this.show = true;
        },
        onChange: function ($event) {
            var srcElement = $event.srcElement;
            if (srcElement) {
                var value = srcElement.value;
                this.list = []
                for (var index = 0; index < 22; index++) {
                    this.list.push(new Date().getTime());
                }
            }
        },
        onSelectRow: function ($event, row) {
            console.log('select row:', row)
            this.data = row
        },
        onInit: function () {
            var that = this;
            console.log('zIndex:', that.zIndex)
            window.addEvent(document
                .getElementsByTagName("body")[0], 'click', function ($event) {
                    var $child = $event.srcElement;
                    var $parent = that.$element;
                    if ($parent.contains) {
                        if (!$parent.contains($child)) {
                            that.show = false;
                        } else {
                            that.show = true;
                        }
                    } else if (!isChildOf($child, $parent)) {
                        that.show = false;
                    } else {
                        that.show = true;
                    }
                })
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



function isChildOf(child, parent) {
    var parentNode;
    if (child && parent) {
        parentNode = child.parentNode;
        while (parentNode) {
            if (parent === parentNode) {
                return true;
            }
            parentNode = parentNode.parentNode;
        }
    }
    return false;
}
