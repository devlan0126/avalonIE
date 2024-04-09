avalon.component("ms-pop3", {
    template: require("./template.html"),
    defaults: {
        show: false,
        data: "",
        list: [],
        source: [],
        selection: [],
        zIndex: 1,
        timer: null,
        onClick: function ($event) {
            this.show = true;
            this.source = window.lonsOperations
        },
        onChange: function ($event) {
            var that = this
            clearTimeout(that.timer);
            that.timer = setTimeout(function () {
                var srcElement = $event.srcElement;
                if (srcElement) {
                    var value = srcElement.value;
                    if (value) {
                        var temp = []
                        for (var i = 0; that.source.length > i; i++) {
                            var flag = false
                            for (var j = 0; j < that.selection.length; j++) {
                                if (that.selection[j].operationCode === that.source[i].operationCode) {
                                    flag = true
                                    break
                                }
                            }

                            if (!flag && that.source[i].operationCode.indexOf(value) > -1 || that.source[i].operationName.indexOf(value) > -1) {
                                temp.push(that.source[i])
                            }
                        }
                        that.list = temp
                    } else {
                        that.list = []
                    }
                } else {
                    that.list = []
                }
            }, 1000)
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
