/*
 * @Date: 2024-04-24 14:16:38
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-25 10:05:01
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
            console.log('select change');
        },
        onImgClick: function ($event) {
            return this.previewImg('')
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