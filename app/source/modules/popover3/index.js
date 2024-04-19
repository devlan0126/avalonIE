avalon.component("ms-pop3", {
    template: require("./template.html"),
    defaults: {
        show: false,
        data: "",
        list: [],
        source: [],
        selection: [],
        zIndex: 1,
        timer: {},
        total: 0,
        currentPage: 1,
        searchValue: "",
        onUpdateSelect: avalon.noop,
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
                    that.searchValue = value
                    if (value) {
                        that.currentPage = 1;
                        that.requestList()
                    } else {
                        that.list = []
                    }
                } else {
                    that.list = []
                }
            }, 1000)
        },
        requestList: function () {
            var that = this
            $.ajax({
                url: '/hprs/operation/pageList',
                type: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                data: '{"pageNum":' + this.currentPage + ',"pageSize":10,"operation":"' + this.searchValue + '"}',
                success: function (res) {
                    if (res.code === 200) {
                        that.list = res.data.list;
                        that.total = res.data.total;
                    }
                }
            });
        },
        onPageClick: function ($event, page) {
            console.log("onPageClick:", page)
            this.currentPage = page;
            this.requestList()
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
            this.updateValue()
        },
        updateValue: function () {
            var operationCodes = []
            for (var i = 0; i < this.selection.length; i++) {
                operationCodes.push(this.selection[i].operationCode)
            }
            return this.onUpdateSelect(operationCodes)
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
            var $inputContent = $('.ms-pop3 .input-content')
            var width = $inputContent.width()
            $inputContent.css("width", width + 'px');

            var $pop3 = $('.ms-pop3')
            var pop3Width = $pop3.width()
            if (pop3Width > 1000) {
                $('.ms-pop3 .pop-content').css('left', '0px')
            } else {
                $('.ms-pop3 .pop-content').css('left', (pop3Width - 1000) + 'px')
            }
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {

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
