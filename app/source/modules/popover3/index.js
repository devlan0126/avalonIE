avalon.component("ms-pop3", {
    template: require("./template.html"),
    defaults: {
        show: false,
        data: "J18.903,重症肺炎",
        list: [],
        source: [],
        selection: [],
        zIndex: 1,
        onClick: function ($event) {
            this.show = true;
        },
        onChange: function ($event) {
            var that = this;
            var srcElement = $event.srcElement;
            if (srcElement) {
                var value = srcElement.value;
                if (value) {
                    var temp = this.source.filter(function (item) {
                        return item.operationName.indexOf(value) > -1 || item.operationCode.indexOf(value) > -1;
                    })
                    var temp2 = temp.filter(function (item) {
                        return that.selection.indexOf(item) === -1
                    })
                    this.list = temp2.slice(0, 120)
                } else {
                    this.list = []
                }
            } else {
                this.list = []
            }
        },
        onSelectRow: function ($event, row, index) {
            this.selection.push(row)
            this.list.splice(index, 1)
            this.setData()
        },
        onRemoveRow: function ($event, index) {
            this.list.unshift(this.selection[index])
            this.selection.splice(index, 1)
            this.setData()
        },
        setData: function () {
            if (this.selection.length > 0) {
                var temp = []
                for (var i = 0; i < this.selection.length; i++) {
                    temp.push(this.selection[i].operationCode + ',' + this.selection[i].operationName)
                }
                this.data = temp.join(' | ');
            } else {
                this.data = ''
            }
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
