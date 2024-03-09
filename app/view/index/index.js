// 引入图片资源
var tab1img = require('../../source/img/tab1.png');
var tab2img = require('../../source/img/tab2.png');
var tab3img = require('../../source/img/tab3.png');
var warningimg = require('../../source/img/warning.png');
require('../../source/js/main.js')
require('../../source/js/console.js')
require('../../source/js/fix.js')
require('../../source/modules/content/index')
require('../../source/modules/popover/index')
// require('json3')



var vm = avalon.define({
  $id: "native",
  name: "司徒正美",// 姓名
  sex: '男',// 性别
  age: '28岁',// 年龄
  hospitalNumber: '2983930',//住院号
  serialNumber: '18293943845959000',//流水号
  inHospitalTime: '2024年3月7日 19点24分',//入院时间
  array: [11, 22, 33],
  mainDiagnose:'J18.903,重症肺炎',
  mainOperation:'31.1x00x005,暂时性气管切开术',
  tabConfig: {
    tabVisible1: true,
    tabVisible2: false,
    tabVisible3: false,
    tabVisible4: false,
  },
  tabClick: function ($event, index) {
    const visible = this.tabConfig['tabVisible' + index]
    this.tabConfig.tabVisible1 = false
    this.tabConfig.tabVisible2 = false
    this.tabConfig.tabVisible3 = false
    this.tabConfig.tabVisible4 = false
    this.tabConfig['tabVisible' + index] = !visible
  },
  config: {
    isShow: false,
    onCancel: function () {
      alert('cancel')
    },
    onOk: function () {
      alert('ok')
    },
    title: '这是测试'
  },

});

