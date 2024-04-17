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
require('../../source/modules/popover5/index')
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



var vm = avalon.define({
  $id: "native",
  serialNo: '',
  mainDiagnose: 'J18.90311,重症肺炎',
  mainOperation: '31.1x00x005,暂时性气管切开术',
  qtzd: '',
  qtss: '',
  dayPercent: 0,
  feePercent: 0,
  clrWay: '40',
  pageClass: 'w-1366',
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
  dataForm: {
    name: '-',
    medFeeAmt: 0,// 医疗费用
    actIptDays: 0,// 住院天数
    age: 0,
    insuType: '',
    setlMon: '',
    fixmedinsCode: '',
    ventUsedHCnt: '',
    sex: "1",
    serialNo: '',
    hospitalNo: '',
    inHospitalTime: '',
    mainDiagCode: '',
    mainOprnCodeList: [],
    othDiagCodeList: [],
    othOprnCodeList: [],
  },
  pageTitle: '医院DRG/DIP数据精细化治理',
  groupInfo: {},
  setlInfo: {},
  warnMsgList: [],
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
  getParams: function () {
    var obj = {
      actIptDays: this.dataForm.actIptDays,
      age: this.dataForm.age,
      ageDays: this.dataForm.ageDays || 0,
      dscgWay: this.dataForm.dscgWay || '',
      insuType: this.dataForm.insuType,
      mainDiagCode: this.dataForm.mainDiagCode,
      mainOprnCodeList: this.dataForm.mainOprnCodeList,
      medFeeAmt: this.dataForm.medFeeAmt,
      nwbBirWt: this.dataForm.nwbBirWt || '',
      othDiagCodeList: this.dataForm.othDiagCodeList,
      othOprnCodeList: this.dataForm.othOprnCodeList,
      sex: this.dataForm.sex,
      ventUsedHCnt: this.dataForm.ventUsedHCnt || '',
      setlMon: this.dataForm.setlMon,
      fixmedinsCode: this.dataForm.fixmedinsCode || '',
      serialNo: this.serialNo,
    };

    var mainOprnCodeList = ''
    for (var i = 0; i < obj.mainOprnCodeList.length; i++) {
      mainOprnCodeList += '"' + obj.mainOprnCodeList[i] + '",'
    }
    mainOprnCodeList = mainOprnCodeList.substring(0, mainOprnCodeList.length - 1)

    var othDiagCodeList = ''
    for (var i = 0; i < obj.othDiagCodeList.length; i++) {
      othDiagCodeList += '"' + obj.othDiagCodeList[i] + '",'
    }
    othDiagCodeList = othDiagCodeList.substring(0, othDiagCodeList.length - 1)

    var othOprnCodeList = ''
    for (var i = 0; i < obj.othOprnCodeList.length; i++) {
      othOprnCodeList += '"' + obj.othOprnCodeList[i] + '",'
    }
    othOprnCodeList = othOprnCodeList.substring(0, othOprnCodeList.length - 1)

    var str = '{'
    str += '"serialNo":"' + obj.serialNo + '",'
    str += '"actIptDays":"' + obj.actIptDays + '",'
    str += '"age":"' + obj.age + '",'
    str += '"ageDays":"' + obj.ageDays + '",'
    str += '"dscgWay":"' + obj.dscgWay + '",'
    str += '"insuType":"' + obj.insuType + '",'
    str += '"mainDiagCode":"' + obj.mainDiagCode + '",'
    str += '"mainOprnCodeList":[' + mainOprnCodeList + '],'
    str += '"medFeeAmt":"' + obj.medFeeAmt + '",'
    str += '"nwbBirWt":"' + obj.nwbBirWt + '",'
    str += '"othDiagCodeList":[' + othDiagCodeList + '],'
    str += '"othOprnCodeList":[' + othOprnCodeList + '],'
    str += '"sex":"' + obj.sex + '",'
    str += '"ventUsedHCnt":"' + obj.ventUsedHCnt + '",'
    str += '"setlMon":"' + obj.setlMon + '",'
    str += '"fixmedinsCode":"' + obj.fixmedinsCode + '"'
    str += '}'
    return str
  },
  onSubmit: function () {
    var that = this
    $.ajax({
      url: '/hprs/api/pop/regroup',
      type: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: that.getParams(),
      dataType: 'json',
      success: function (response) {
        if (response.code === 200) {
        }
      }
    });
    var res = {
      "msg": "成功",
      "code": 200,
      "data": {
        "gid": "c5eabfe6-0db9-407b-9101-f1468952190a",
        "code": 200,
        "fine": true,
        "message": null,
        "setlId": null,
        "fixmedinsCode": "H13068200954",
        "clrOptins": "130682",
        "setlMon": "202404",
        "insuType": "390",
        "actIptDays": 12,
        "setlAmt": 66789,
        "drgInfo": {
          "fine": true,
          "message": "",
          "drgCode": "ES35",
          "drgName": "呼吸系统感染/炎症，不伴并发症或合并症",
          "adrg": "ES3",
          "adrgName": "呼吸系统感染/炎症",
          "ccmcc": "NO",
          "cod": "100",
          "codd": "内科组",
          "mdc": "MDCE",
          "mdcName": "呼吸系统疾病及功能障碍",
          "ccList": "K91.833,胃肠吻合口水肿|E11.600x015+M14.2*,2型糖尿病性肩关节周围炎",
          "mccList": "K91.833,胃肠吻合口水肿|E11.600x015+M14.3"
        },
        "dipInfo": null,
        "setlInfo": {
          "fine": true,
          "message": null,
          "caseType": "高限病例",
          "feeRatio": null,
          "grpStdAmt": 0.00,
          "stdDiffAmt": 66789.00,
          "dayDiff": null,
          "predictProfit": -63848.56,
          "predictAmt": 2940.44,
          "predictPointValue": 0.4527,
          "pointValue": 6495.3400,
          "basePointScore": 0.4527,
          "grpAvgAmt": 0.00,
          "adjustmentFactor": 1.0000,
          "stdGrpDays": 0.00,
          "lowAmt": 599.85,
          "highAmt": 4498.87,
          "msg": null
        },
        "mccOutcome": "K91.833",
        "ccOutcome": "K91.833,胃肠吻合口水肿|E11.600x015+M14.2*,2型糖尿病性肩关节周围炎",
        "icd10Adrg": "ES3",
        "icd9Adrg": "",
        "warnMsgList": ['主诊断不满足分组要求，请修订主诊断；', '主诊断与主手术不匹配，入歧义(QY)病组，建议核查修订主诊断或主手术；', '高倍率病例，费用较高，需合理控费或核对诊疗信息准确性;']
      }
    }

    if (res.code === 200) {
      res.data.medFeeAmt = that.dataForm.medFeeAmt;
      that.groupInfo = res.data;
      that.setlInfo = encodeGroupInfo(res.data);
      that.warnMsgList = res.data.warnMsgList || [];
    }
    console.log('groupInfo>', that.groupInfo)
  },
  onUpdateMainDiagnose: function (mainDiagnose) {
    this.dataForm.mainDiagnose = mainDiagnose
  },
  onUpdateQtzd: function (othDiagCodeList) {
    this.dataForm.othDiagCodeList = othDiagCodeList
  },
  onUpdateMainOperation: function (mainOprnCodeList) {
    this.dataForm.mainOprnCodeList = mainOprnCodeList
  },
  onupdateQtss: function (othOprnCodeList) {
    this.dataForm.othOprnCodeList = othOprnCodeList
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
  if (window.clientWidth < 1367) {
    // 1366*768
    this.pageClass = 'w-1366'
  } else if (window.clientWidth < 1441) {
    // 1440*900
    this.pageClass = 'w-1440'
  } else if (window.clientWidth < 1601) {
    // 1600*1024
    this.pageClass = 'w-1600'
  } else if (window.clientWidth < 1921) {
    // 1920*1080
    this.pageClass = 'w-1920'
  }

  var that = this
  that.clrWay = getUrlParam('clrWay') || '40';
  that.serialNo = getUrlParam('serialNo') || 'ZY020000667561'

  getPageInfo(that.serialNo, function (data) {
    var req = data.req
    var res = data.res
    that.dataForm = {
      name: req.xm,
      medFeeAmt: req.zfy,
      actIptDays: req.sjzyts,
      age: req.nl,
      insuType: req.insurTypeId,
      setlMon: req.settlTime,
      fixmedinsCode: req.fixmedinsCode,
      sex: req.xb,
      serialNo: that.serialNo,
      hospitalNo: req.bah,
      inHospitalTime: req.admTime || '-',
      dscgWay: req.lyfs,
      mainDiagCode: '',
      othDiagCodeList: [],
      mainOprnCodeList: [],
      othOprnCodeList: [],
    }
    that.pageTitle = data.title || '医院DRG/DIP数据精细化治理'
    that.dayPercent = data.dayPercent || 0
    that.feePercent = data.feePercent || 0
    that.mainDiagnose = req.jbdm + ',' + req.zyzd
    that.dataForm.mainDiagCode = req.jbdm

    var qtzdList = req.qtzdList || []
    var othDiagCodeList = []
    var qtzdTemp = []
    for (var i = 0; i < qtzdList.length; i++) {
      qtzdTemp.push(qtzdList[i].qtzddm + ',' + qtzdList[i].qtzdmc)
      othDiagCodeList.push(qtzdList[i].qtzddm)
    }
    that.qtzd = qtzdTemp.join(' | ')
    that.dataForm.othDiagCodeList = othDiagCodeList

    var zyssjczList = req.zyssjczList || []
    var mainOprnCodeList = []
    var zyssTemp = []

    for (var i = 0; i < zyssjczList.length; i++) {
      zyssTemp.push(zyssjczList[i].ssjczbm + ',' + zyssjczList[i].ssjczmc)
      mainOprnCodeList.push(zyssjczList[i].ssjczbm)
    }
    that.mainOperation = zyssTemp.join(' | ')
    that.dataForm.mainOprnCodeList = mainOprnCodeList

    var ssjczList = req.ssjczList || []
    var othOprnCodeList = []
    var ssTemp = []
    for (var i = 0; i < ssjczList.length; i++) {
      ssTemp.push(ssjczList[i].ssjczbm + ',' + ssjczList[i].ssjczmc)
      othOprnCodeList.push(ssjczList[i].ssjczbm)
    }
    that.qtss = ssTemp.join(' | ')
    that.dataForm.othOprnCodeList = othOprnCodeList

    console.log('that.dataForm>', that.dataForm);

    res.medFeeAmt = req.zfy;
    that.groupInfo = res;
    that.setlInfo = encodeGroupInfo(res);
    that.warnMsgList = res.adviceList || [];
  })

  getSysConfig(function (data) {
    console.log('getSysConfig>', data)
    that.showTabs = {
      queryResetEnabled: data.queryResetEnabled == '1', // 是否开启查询重置功能
      loopGroupEnabled: data.loopGroupEnabled == '1', // 是否开启分组数据治理
      mdcAdrgEnabled: data.mdcAdrgEnabled == '1', // 是否开启MDC/ADRG查询功能
      adrgCondEnabled: data.adrgCondEnabled == '1', // 是否开启ADRG条件查
      ccmccEnabled: data.ccmccEnabled == '1', // 是否开启MCC/CC查询功
      multiTraumaEnabled: data.multiTraumaEnabled == '1', // 是否开启多发创伤查询
      clinPathEnabled: data.clinPathEnabled == '1', // 是否开启临床路径指南查
    }
  })
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

function getPageInfo(serialNo, callback) {
  $.ajax({
    url: '/hprs/api/pop/getSmtGrpInfo',
    type: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: 'serialNo=' + serialNo,
    dataType: 'json',
    success: function (res) {
      callback(res)
      if (res.code === 200) {
        callback(res)
      }
    }
  });
}

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}


function encodeGroupInfo(groupInfo) {
  if (groupInfo && groupInfo.setlInfo) {
    var setlInfo = groupInfo.setlInfo;
    return {
      grpAvgAmt: setlInfo.grpAvgAmt,// 病组均费
      score: setlInfo.score,// 基准点数
      feeRatio: setlInfo.feeRatio, // 费用比例
      stdDiffAmt: setlInfo.stdDiffAmt, // 标准差额
      adjustmentFactor: setlInfo.adjustmentFactor, // 调整系数
      grpStdAmt: setlInfo.grpStdAmt,// 费用标准
      caseType: setlInfo.caseType,// 病例类型
      yhds: setlInfo.yhds,// 预测点数
      predictAmt: setlInfo.predictAmt,// 预测费用
      predictProfit: setlInfo.predictProfit,// 预测盈亏
      medFeeAmt: groupInfo.medFeeAmt,// 总费用
    };
  }
  return {
    grpAvgAmt: "",// 病组均费
    score: "",// 基准点数
    feeRatio: 0, // 费用比例
    stdDiffAmt: 0, // 标准差额
    adjustmentFactor: 0, // 调整系数
    grpStdAmt: 0,// 费用标准
    caseType: '-',// 病例类型
    yhds: "",// 预测点数
    predictAmt: '0',// 预测费用
    predictProfit: 0,// 预测盈亏
    medFeeAmt: 0,// 总费用
  };
}