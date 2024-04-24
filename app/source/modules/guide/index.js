/*
 * @Date: 2024-04-24 14:16:38
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-24 17:46:57
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
        previewImg: avalon.noop,
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
                if (that.list.length > 0) {
                    var pngFiles = that.list[0].pngFiles
                    var folderName = that.list[0].folderName
                    if (pngFiles && pngFiles.length > 0) {
                        for (var index = 0; index < pngFiles.length; index++) {
                            imgList.push('/hprs/sim/clinic/img/' + folderName + '/' + pngFiles[index])
                        }
                    }
                }
                that.imgList = imgList
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
        onImgClick: function ($event, imgSrc) {
            console.log('onImgClick', imgSrc)
            return this.previewImg(imgSrc, this.imgList)
        }
    },
});
