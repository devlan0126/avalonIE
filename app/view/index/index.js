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



var vm = avalon.define({
  $id: "native",
  serialNo: '',
  mainDiagnose: 'J18.903,重症肺炎',
  mainOperation: '31.1x00x005,暂时性气管切开术',
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
    var mainDiagCode = "";
    var mainOprnCodeList = [];
    var othDiagCodeList = [];
    var othOprnCodeList = [];
    this.diagTableData.body.forEach((ele) => {
      if (ele.isMajor) {
        mainDiagCode = ele.code;
      } else {
        othDiagCodeList.push(ele.code);
      }
    });
    this.operTableData.body.forEach((ele) => {
      if (ele.isMajor) {
        mainOprnCodeList.push(ele.code);
      } else {
        othOprnCodeList.push(ele.code);
      }
    });
    return {
      actIptDays: this.dataForm.actIptDays,
      age: this.dataForm.age,
      ageDays: this.dataForm.ageDays,
      dscgWay: this.dataForm.dscgWay,
      insuType: this.dataForm.insuType,
      mainDiagCode: mainDiagCode,
      mainOprnCodeList: mainOprnCodeList,
      medFeeAmt: this.dataForm.medFeeAmt,
      nwbBirWt: this.dataForm.nwbBirWt,
      othDiagCodeList: othDiagCodeList,
      othOprnCodeList: othOprnCodeList,
      sex: this.dataForm.sex,
      ventUsedHCnt: this.dataForm.ventUsedHCnt,
      setlMon: this.dataForm.setlMon,
      fixmedinsCode: this.fixmedinsCode,
    };
  },
  onSubmit: function () {
    var that = this
    // $.ajax({
    //   url: '/hprs/sim/grpsetl',
    //   type: 'POST',
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   dataType: 'json',
    //   success: function (res) {
    //     if (res.code === 200) {
    //       that.groupInfo = {
    //         ...data,
    //         medFeeAmt: that.dataForm.medFeeAmt,
    //       };
    //     }
    //   }
    // });
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

    res.data.medFeeAmt = that.dataForm.medFeeAmt;
    that.groupInfo = res.data;
    if (res.code === 200) {
      that.setlInfo = encodeGroupInfo(res.data);
      that.warnMsgList = res.data.warnMsgList || [];
    }
    console.log('groupInfo>', that.groupInfo)
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
  that.serialNo = getUrlParam('serialNo') || '18293943845959000'

  getPageInfo(that.serialNo, function (data) {
    that.dataForm = {
      name: '经典可乐',
      medFeeAmt: 2273.22,// 医疗费用
      actIptDays: 12,// 住院天数
      age: 23,
      insuType: '01',
      setlMon: '202404',
      fixmedinsCode: 'H118282',
      ventUsedHCnt: '11',
      sex: "1",
      serialNo: that.serialNo,
      hospitalNo: '2983930',
      inHospitalTime: '2024年3月7日 19点24分',
    }
    that.pageTitle = '医院DRG/DIP数据精细化治理'

    that.onSubmit()
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
  // $.ajax({
  //   url: '/hprs/api/pop/getSysConfig',
  //   type: 'GET',
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   dataType: 'json',
  //   success: function (res) {
  //     if (res.code === 200) {
  //       callback(res.data)
  //     }
  //   }
  // });
  callback()

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