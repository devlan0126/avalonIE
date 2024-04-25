/*
 * @Date: 2024-04-24 14:16:38
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-25 10:55:25
 * @FilePath: \avalonIE\app\source\modules\guide\index.js
 * @Description: 文档描述
 */
avalon.component("ms-guide", {
    template: require("./template.html"),
    defaults: {
        show: false,
        list: [],
        imgList: [],
        total: 0,
        isLarge: false,
        pdfUrl: '',
        previewImg: avalon.noop,
        guideEmit: avalon.noop,
        onInit: function () { },
        onReady: function (v) {
            window.guideResize()
            var that = this
            that.$watch('isLarge', function () {
                setTimeout(function () {
                    window.guideResize()
                }, 500);
            })
            that.$watch('list', function () {
                console.log('guide list change', that.list)
                var imgList = []
                var pdfUrl = '';
                if (that.list.length > 0) {
                    var pngFiles = that.list[0].pngFiles
                    var folderName = that.list[0].folderName
                    $('.bok-select').find('.placeholder').text(folderName);

                    pdfUrl = '/hprs/sim/clinic/download/' + folderName + '/' + that.list[0].pdfFiles[0]
                    if (pngFiles && pngFiles.length > 0) {
                        for (var index = 0; index < pngFiles.length; index++) {
                            imgList.push('/hprs/sim/clinic/img/' + folderName + '/' + pngFiles[index])
                        }
                    }
                }
                that.imgList = imgList
                window.pdfUrl = pdfUrl
                insertImgs(imgList)
                return that.guideEmit(imgList)
            })
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {
            console.log("onDispose:", v);
        },
        onDiagBlur: function () {
            $('#dfDiagInput').val('')
        },
        onPageClick: function ($event, page) {
            this.currentPage = page;
            this.requestList()
        },
        onChange: function ($event) {
            console.log('select change', $event.target.value);
            var index = $event.target.value;
            var item = this.list[index]
            window.pdfUrl = '/hprs/sim/clinic/download/' + item.folderName + '/' + item.pdfFiles[0]

            var pngFiles = item.pngFiles
            var imgList = []
            if (pngFiles && pngFiles.length > 0) {
                for (var index = 0; index < pngFiles.length; index++) {
                    imgList.push('/hprs/sim/clinic/img/' + item.folderName + '/' + pngFiles[index])
                }
            }
            insertImgs(imgList)
            return this.guideEmit(imgList)
        },
        onImgClick: function ($event) {
            return this.previewImg('')
        },
        onSelectClick: function ($event) {
            var parent = $('.bok-select')
            if (!parent.hasClass('is-open')) {
                parent.addClass('is-open');
                $('.select.is-open').not(parent).removeClass('is-open');
            } else {
                parent.removeClass('is-open');
            }
            $event.stopPropagation();
        },
        onSelectItemClick: function ($event, index) {
            var parent = $('.bok-select')

            var item = this.list[index]
            window.pdfUrl = '/hprs/sim/clinic/download/' + item.folderName + '/' + item.pdfFiles[0]

            var pngFiles = item.pngFiles
            var imgList = []
            if (pngFiles && pngFiles.length > 0) {
                for (var index = 0; index < pngFiles.length; index++) {
                    imgList.push('/hprs/sim/clinic/img/' + item.folderName + '/' + pngFiles[index])
                }
            }
            insertImgs(imgList)
            parent.removeClass('is-open').find('.placeholder').text(item.folderName);
            return this.guideEmit(imgList)
        }
    },
});


function insertImgs(imgList) {
    var htmlStr = "";
    for (var i = 0; i < imgList.length; i++) {
        htmlStr += "<img src='" + imgList[i] + "' />";
    }
    $('#guideImgContent').html(htmlStr);
}

$(function () {
    $('body').on('click', function () {
        $('.bok-select.is-open').removeClass('is-open');
    });
})
