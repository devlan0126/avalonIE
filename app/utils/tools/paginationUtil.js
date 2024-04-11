(function (win) {
    function PaginationUtil(totalRecords, recordsPerPage) {
        this.totalRecords = totalRecords;
        this.recordsPerPage = recordsPerPage;
    }

    win.PaginationUtil = PaginationUtil;

    PaginationUtil.prototype.getTotalPages = function () {
        return Math.ceil(this.totalRecords / this.recordsPerPage);
    }

    PaginationUtil.prototype.getVisiblePageNumbers = function (currentPage, numVisiblePages) {
        var totalPages = this.getTotalPages();
        var startPage = Math.max(1, currentPage - Math.floor(numVisiblePages / 2));
        var endPage = Math.min(totalPages, startPage + numVisiblePages - 1);

        if (endPage - startPage + 1 < numVisiblePages) {
            startPage = Math.max(1, endPage - numVisiblePages + 1);
        }

        var visiblePages = [];
        for (var i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }
        return visiblePages;
    }

    PaginationUtil.prototype.getOffset = function (currentPage) {
        return (currentPage - 1) * this.recordsPerPage;
    }
})(window)