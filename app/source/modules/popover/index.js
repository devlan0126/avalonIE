avalon.component("ms-pop", {
    template: require("./template.html"),
    defaults: {
        show: false,
        data: "J18.903,重症肺炎",
        list: [],
        source: [],
        zIndex: 1,
        onClick: function ($event) {
            this.show = true;
        },
        onChange: function ($event) {
            var srcElement = $event.srcElement;
            if (srcElement) {
                var value = srcElement.value;
                if (value) {
                    var temp = this.source.filter(function (item) {
                        return item.operationName.indexOf(value) > -1;
                    })
                    this.list = temp.slice(0, 100)
                } else {
                    this.list = []
                }
            } else {
                this.list = []
            }
        },
        onSelectRow: function ($event, row) {
            this.data = row.operationCode + "  " + row.operationName
        },
        onInit: function () {
            var that = this;
            var data = require("./mock.json")
            if (data.code === 200) {
                that.source = data.data.list;
            }
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
