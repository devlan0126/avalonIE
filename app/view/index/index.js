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
require('../../source/modules/content/index')
require('../../source/modules/popover/index')
require('../../source/modules/popover2/index')
require('../../source/modules/popover3/index')
require('../../source/modules/popover4/index')
require('../../source/modules/fzzl/index')
require('../../source/modules/mdcAdrg/index')



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
  tabConfig: {
    tabVisible1: true,
    tabVisible2: false,
    tabVisible3: false,
    tabVisible4: false,
    tabVisible5: false,
    tabVisible6: false,
    tabVisible7: false,
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
  var titleHeight = $title.offsetHeight
  var centerHeight = $center.offsetHeight
  var pageHeight = document.body.clientHeight
  var bottomHeight = pageHeight - titleHeight - centerHeight
  $bottom.style.height = bottomHeight + 'px'

  const $tabsUl = document.getElementById('tabsUl')
  const h = bottomHeight - $tabsUl.offsetHeight
  document.getElementById('tabContent').style.height = h + 'px'



  const $tabs1 = document.getElementById('tabs-1')
  var $resultGrp = document.getElementById('resultGrp')
  var resultGrpH = $resultGrp.offsetHeight
  var $resultProgress = document.getElementById('resultProgress')
  var resultProgressH = $resultProgress.offsetHeight
  var $resultTable = document.getElementById('resultTable')
  var resultTableH = $resultTable.offsetHeight

  const h2 = h - resultGrpH - resultProgressH - resultTableH - 60 - 20
  var $resultBot = document.getElementById('resultBot')
  $resultBot.style.height = h2 + 'px'

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


// download("/hprs/api/pop/logo");

function download(url, data) {
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else {
    var xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open('GET', url, true);     // 请求方式，看具体接口情况决定
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8'); // 内容类型，看具体接口情况决定
  if (window.XMLHttpRequest) {
    xhr.responseType = "blob";  // 返回类型blob
  }
  // xhr.onload = function () {
  //   // 请求完成
  //   if (this.status === 200) {
  //     // 返回200
  //     var blob = this.response;
  //     var reader = new FileReader();
  //     reader.readAsDataURL(blob);  // 转换为base64，可以直接放入ahref
  //     reader.onload = function (e) {
  //       $("#logo").attr('src', e.target.result)
  //     }
  //   }
  // };
  // xhr.onerror = function () { alert("下载失败") };
  // // 发送ajax请求
  // xhr.send(); // 数据格式，看具体接口情况决定

  if (xhr != null) {
    xhr.onreadystatechange = state_Change;
    xhr.send();
  }
  else {
    alert("Your browser does not support XMLHTTP.");
  }
  function state_Change() {
    if (xhr.readyState == 4) {// 4 = "loaded"
      if (xhr.status == 200) {// 200 = OK
        alert(xhr)
      }
      else {
        alert("Problem retrieving XML data");
      }
    }
  }
}