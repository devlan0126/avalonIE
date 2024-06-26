avalon.component("ms-pager", {
    template: require("./template.html"),
    defaults: {
        getTitle: function (title) {
            return title
        },
        isDisabled: function (name, page) {
            var disabled = true
            if (this.total !== 0) {
                disabled = this.currentPage === page
            }
            this.$buttons[name] = disabled
            return disabled
        },
        $buttons: {},
        showPages: 3,
        pages: [],
        totalPages: 0,
        currentPage: 1,
        firstText: '≪',
        prevText: '<',
        nextText: '>',
        lastText: '≫',
        pageSize: 10,
        total: 0,
        onPageClick: avalon.noop,
        toPage: function (p) {
            var cur = this.currentPage
            var max = getTotalPages(this.total, this.pageSize)
            switch (p) {
                case 'first':
                    return 1
                case 'prev':
                    return Math.max(cur - 1, 0)
                case 'next':
                    return Math.min(cur + 1, max)
                case 'last':
                    return max
                default:
                    return p
            }
        },
        cbProxy: function (e, p) {
            if (this.$buttons[p] || p === this.currentPage) {
                e.preventDefault()
                return //disabled, active不会触发
            }
            var cur = this.toPage(p)
            this.currentPage = cur
            this.render(cur)
            return this.onPageClick(e, cur)
        },
        render: function (cur) {
            var obj = getPages.call(this, cur, this.totalPages)
            this.pages = obj.pages
            this.currentPage = obj.currentPage
        },
        onInit: function () {
            var cur = this.currentPage
            var that = this
            that.$watch('totalPages', function () {
                setTimeout(function () {
                    that.render(that.currentPage)
                }, 4)
            })
            this.totalPages = getTotalPages(this.total, this.pageSize)
            that.$watch('total', function () {
                that.totalPages = getTotalPages(that.total, that.pageSize)
            })
            that.render(cur)
        },
        onReady: function (v) {
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {
        },
        getHref: function (v) {
            return false
        }
    },
});

function getTotalPages(total, pageSize) {
    return Math.ceil(total / pageSize)
}

function getPages(currentPage, total) {
    var pages = []
    var s = this.showPages
    if (s > total) {
        itPage = 1
        var lst = total === 0 ? 1 : total
        while (itPage <= lst) {
            pages.push(itPage)
            itPage++
        }
        return { currentPage: currentPage, pages: pages };
    }
    var half = Math.floor(s / 2)
    var start = currentPage - half + 1 - s % 2
    var end = currentPage + half

    if (start <= 0) {
        start = 1;
        end = s;
    }
    if (end > total) {
        start = total - s + 1
        end = total
    }

    var itPage = start;
    while (itPage <= end) {
        pages.push(itPage)
        itPage++
    }
    return { currentPage: currentPage, pages: pages };
}