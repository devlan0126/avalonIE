// 引入图片资源
require('../../source/img/tab1.png');
require('../../source/img/tab2.png');
require('../../source/img/tab3.png');
require('../../source/img/warning.png');
require('../../source/img/row.png');
require('../../source/img/bjcz-logo.png');
require('../../source/img/left-arrow.png');


require('../../source/js/main.js')
require('../../source/js/console.js')
require('../../source/js/fix.js')
require('../../source/bootstrap/bootstrap-ie.js')
require('../../source/bootstrap/bootstrap.min.js')

require('../../source/modules/content/index')
require('../../source/modules/pager/index')
require('../../source/modules/popover/index')
require('../../source/modules/popover2/index')
require('../../source/modules/popover3/index')
require('../../source/modules/popover4/index')
require('../../source/modules/fzzl/index')
require('../../source/modules/mdcAdrg/index')
require('../../source/modules/ssfzdrg/index')
require('../../source/modules/ssfzdip/index')
require('../../source/modules/adrg/index')
require('../../source/modules/mcc/index')
require('../../source/modules/dfcs/index')

// require('../../utils/tools/paginationUtil.js')



var vm = avalon.define({
  $id: "native",
  name: "司徒正美",// 姓名
  sex: '男',// 性别
  age: '28岁',// 年龄
  hospitalNumber: '2983930',//住院号
  serialNumber: '18293943845959000',//流水号
  inHospitalTime: '2024年3月7日 19点24分',//入院时间
  array: [11, 22, 33],
  mainDiagnose: 'J18.903,重症肺炎',
  mainOperation: '31.1x00x005,暂时性气管切开术',
  clrWay: '40',
  tabConfig: {
    tabVisible1: true,
    tabVisible2: false,
    tabVisible3: false,
    tabVisible4: false,
    tabVisible5: false,
    tabVisible6: false,
    tabVisible7: false,
  },
  showTabs: {
    queryResetEnabled: true, // 是否开启查询重置功能
    loopGroupEnabled: true, // 是否开启分组数据治理
    mdcAdrgEnabled: true, // 是否开启MDC/ADRG查询功能
    adrgCondEnabled: true, // 是否开启ADRG条件查
    ccmccEnabled: true, // 是否开启MCC/CC查询功
    multiTraumaEnabled: true, // 是否开启多发创伤查询
    clinPathEnabled: true, // 是否开启临床路径指南查
  },
  isLarge: false,
  tabClick: function ($event, index) {
    var visible = this.tabConfig['tabVisible' + index]
    this.tabConfig.tabVisible1 = false
    this.tabConfig.tabVisible2 = false
    this.tabConfig.tabVisible3 = false
    this.tabConfig.tabVisible4 = false
    this.tabConfig.tabVisible5 = false
    this.tabConfig.tabVisible6 = false
    this.tabConfig.tabVisible7 = false
    this.tabConfig['tabVisible' + index] = true
    setTimeout(function () {
      setLargeBtnHeight()
    }, 100)
  },
  enlarge: function () {
    this.isLarge = !this.isLarge
    setTimeout(function () {
      setLargeBtnHeight()
    }, 100)
  },
  onSubmit: function () {


  },
  onRest: function () {
    window.location.reload()
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
  onReady: function (v) {
  },
});

vm.$watch('onReady', function (v) {
  getSysConfig(function (data) {
    console.log('getSysConfig>', data)
    this.showTabs = {
      queryResetEnabled: data.queryResetEnabled == '1', // 是否开启查询重置功能
      loopGroupEnabled: data.loopGroupEnabled == '1', // 是否开启分组数据治理
      mdcAdrgEnabled: data.mdcAdrgEnabled == '1', // 是否开启MDC/ADRG查询功能
      adrgCondEnabled: data.adrgCondEnabled == '1', // 是否开启ADRG条件查
      ccmccEnabled: data.ccmccEnabled == '1', // 是否开启MCC/CC查询功
      multiTraumaEnabled: data.multiTraumaEnabled == '1', // 是否开启多发创伤查询
      clinPathEnabled: data.clinPathEnabled == '1', // 是否开启临床路径指南查
    }
  })
  this.clrWay = getUrlParam('clrWay') || '40'
  window.lonsOperations = []
  window.lonsDiagnoses = []
  getOperationList()
  getDiagnoseList()
  resetBottomHeight()
})

function resetBottomHeight() {
  var $bottom = document.getElementById('pageBottom')
  var $title = document.getElementById('pageTitle')
  var $center = document.getElementById('pageCenter')
  var titleHeight = $title.offsetHeight + 16
  var centerHeight = $center.offsetHeight + 16
  var pageHeight = document.documentElement.clientHeight

  if (window.IEVersion === 6 || window.IEVersion === 8) {
    var bottomHeight = pageHeight - titleHeight - centerHeight - 20 - 20
    $bottom.style.height = bottomHeight + 'px'
  } else {
    var bottomHeight = pageHeight - titleHeight - centerHeight - 20
    $bottom.style.height = bottomHeight + 'px'
  }

  const $tabsUl = document.getElementById('tabsUl')
  const h = bottomHeight - $tabsUl.offsetHeight
  document.getElementById('tabContent').style.height = h + 'px'
}

function setLargeBtnHeight() {
  var $largeBtn = document.getElementById('largeBtn')
  var $activeTab = document.getElementsByClassName('active-tab')[0];
  var activatTabRect = $activeTab.getBoundingClientRect();
  var activeTabLeft = activatTabRect.left
  var activeTabTop = activatTabRect.top
  $largeBtn.style.top =
    activeTabTop - 13 + "px";
  $largeBtn.style.left = activeTabLeft + 50 + "px";
}




function getOperationList() {
  $.ajax({
    url: '/hprs/operation/pageList',
    type: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    dataType: 'json',
    data: '{"pageNum":1,"pageSize":100}',
    success: function (res) {
      if (res.code === 200) {
        window.lonsOperations = res.data.list;
      }
    }
  });
}

function getDiagnoseList() {
  $.ajax({
    url: '/hprs/diagnose/pageList',
    type: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    dataType: 'json',
    data: '{"pageNum":1,"pageSize":100}',
    success: function (res) {
      if (res.code === 200) {
        window.lonsDiagnoses = res.data.list;
      }
    }
  });
}


function getSysConfig(callback) {
  $.ajax({
    url: '/hprs/api/pop/getSysConfig',
    type: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    dataType: 'json',
    success: function (res) {
      if (res.code === 200) {
        callback(res.data)
      }
    }
  });
}

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}
