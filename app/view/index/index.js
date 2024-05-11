// 引入图片资源
require('../../source/img/tab-img1.png');
require('../../source/img/tab-img2.png');
require('../../source/img/tab-img3.png');
require('../../source/img/warning.png');
require('../../source/img/bar.png');
require('../../source/img/up-arrow.png');
require('../../source/img/down-arrow.png');
require('../../source/img/bjcz-logo.png');
require('../../source/img/pdf.png');
require('../../source/js/main.js')
require('../../source/js/console.js')
require('../../source/js/fix.js')

require('./resize.js')
require('../../source/modules/content/index')
require('../../source/modules/pager/index')
require('../../source/modules/progress/index')
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
require('../../source/modules/guide/index')
require('../../source/modules/imgPreview/index')
require('../../source/modules/sortCom/index')

var vm = avalon.define({
  $id: "native",
  serialNo: '',
  mainDiagnose: '',
  mainOperation: '',
  qtzd: '',
  qtss: '',
  originData: {
    mainOperation: [],
    qtzd: [],
    qtss: [],
  },
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

    groupWarnName: '实时分组预警',
    loopGroupName: '实时分组预分组数据治理警',
    mdcAdrgName: 'MDC/ADRG查询',
    adrgCondName: 'ADRG查询',
    ccmccName: 'MCC/CC查询',
    multiTraumaName: '多发创伤查询',
    clinPathName: '临床路径指南'
  },
  isLarge: false,
  dataForm: {
    name: '-',
    medFeeAmt: 0,// 医疗费用
    actIptDays: 0,// 住院天数
    age: 0,
    ageDays: 0,
    dscgWay: '',
    insuType: '',
    setlMon: '',
    fixmedinsCode: '',
    ventUsedHCnt: '',
    nwbBirWt: 0,
    sex: "1",
    serialNo: '-',
    hospitalNo: '-',
    inHospitalTime: '-',
    mainDiagCode: '',
    mainOprnCodeList: [],
    othDiagCodeList: [],
    othOprnCodeList: [],
  },
  pageTitle: '医院DRG/DIP数据精细化治理',
  groupInfo: {},
  setlInfo: {},
  warnMsgList: [],
  processInfo: {
    real_short_amount: 0,
    drg_limit: 0,
    total_amount: 0,
  },
  fzzlList: [],
  fzzlAllList: [],
  guideList: [],
  curImg: '',
  imgList: [],
  imgPreviewVisible: false,
  pdfUrl: '',
  tabClick: function ($event, index) {
    var that = this
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
      if (index == 2) {
        that.grpAdvice()
      }
      if (index === 3) {
        window.mdcAdrgResize()
      }
      if (index === 4) {
        window.adrgResize()
      }
      if (index === 5) {
        window.mccResize()
      }
      if (index === 6) {
        window.dfcsResize()
      }
      if (index === 7) {
        that.getClinic()
      }
    }, 100)
  },
  enlarge: function () {
    this.isLarge = !this.isLarge
    setTimeout(function () {
      setLargeBtnHeight()
      resetBottomHeight()
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
      setlMon: this.dataForm.setlMon || '',
      fixmedinsCode: this.dataForm.fixmedinsCode || '',
      setlId: this.serialNo,
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
    str += '"setlId":"' + obj.setlId + '",'
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
    this.tabClick(null, 1)
    document.getElementById("zlDiagnose").checked = false
    document.getElementById("zlOperation").checked = false
    $.ajax({
      url: '/hprs/api/pop/regroup',
      type: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: that.getParams(),
      dataType: 'json',
      success: function (res) {
        if (res.code === 200) {
          if (res.code === 200) {
            res.data.medFeeAmt = that.dataForm.medFeeAmt;
            that.groupInfo = res.data;
            that.setlInfo = encodeGroupInfo(res.data);
            that.warnMsgList = res.data.warnMsgList || [];
            that.processInfo = {
              real_short_amount: that.setlInfo.lowAmt || 0,
              drg_limit: that.setlInfo.highAmt || 0,
              total_amount: that.dataForm.medFeeAmt || 0,
            }
            onProgressHandle(
              that.processInfo,
              document.getElementById('progressBarActive')
            );
          }
        }
      }
    });
  },
  onUpdateMainDiagnose: function (mainDiagCode) {
    this.dataForm.mainDiagCode = mainDiagCode
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
  grpAdvice: function () {
    var that = this;
    $.ajax({
      url: '/hprs/sim/grpAdvice',
      type: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      dataType: 'json',
      data: this.getParams(),
      success: function (res) {
        if (res.code === 200) {
          that.fzzlAllList = res.data || []
          var fzzlList = res.data || []
          for (var i = 0; i < fzzlList.length; i++) {
            if (i === fzzlList.length - 1) {
              fzzlList[i].isLast = true
            }
          }
          that.fzzlList = fzzlList
        }
      }
    });
  },
  getClinic: function () {
    var that = this;
    $.ajax({
      url: '/hprs/sim/clinic',
      type: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      dataType: 'json',
      data: this.getParams(),
      success: function (res) {
        if (res.code === 200) {
          that.guideList = res.data || []
        }
      }
    });
  },
  onRest: function () {
    window.location.reload()
  },
  previewImg() {
    $('#ImgSelect').hide()
    this.imgPreviewVisible = true
  },
  closeImgPreview: function () {
    $('#ImgSelect').show()
    this.imgPreviewVisible = false
  },
  onDownloadPdf: function () {
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    function downloadFile(url) {
      var elemIF = document.createElement("iframe");
      elemIF.src = url;
      elemIF.style.display = "none";
      document.body.appendChild(elemIF);
    }
    downloadFile(window.location.origin + window.pdfUrl);
  },
  guideEmit: function (imgList) {
    this.imgList = imgList
    this.pdfUrl = pdfUrl
  },
  onZlChange: function ($event, val) {
    window[val] = $event.target.checked
    window.zlDiagnose = typeof window.zlDiagnose === 'boolean' ? window.zlDiagnose : false
    window.zlOperation = typeof window.zlOperation === 'boolean' ? window.zlOperation : false
    this.fzzlList = filterZlList(this.fzzlAllList, window.zlDiagnose, window.zlOperation, this.dataForm.mainDiagCode, this.dataForm.mainOprnCodeList)
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
  var clientWidth = document.documentElement.clientWidth;
  // 分辨率大于等于1680，大部分为1920的情况下，调用此css
  if (clientWidth >= 1680) {
    this.pageClass = 'w-1920'
  }
  // 分辨率再在1600-1680的情况下，调用此css
  else if (clientWidth >= 1600) {
    this.pageClass = 'w-1600'
  }
  // 分辨率再在1366-1600的情况下，调用此css
  else if (clientWidth >= 1366) {
    this.pageClass = 'w-1366'
  }
  // 分辨率小于1366的情况下，调用此css
  else {
    this.pageClass = 'w-mini'
  }

  var body = document.getElementsByTagName('body')
  body[0].classList.add(this.pageClass)

  var that = this
  that.serialNo = getUrlParam('serialNo')
  if (!that.serialNo) {
    return false
  }

  getPageInfo(that.serialNo, function (data) {
    var req = data.req
    var res = data.res
    that.dataForm = {
      name: req.xm,
      medFeeAmt: req.zfy,
      actIptDays: req.sjzyts,
      age: req.nl,
      insuType: req.insurTypeId,
      // setlMon: req.settlTime,
      fixmedinsCode: req.fixmedinsCode,
      // fixmedinsCode: 'H13040400584',
      sex: req.xb,
      serialNo: that.serialNo,
      hospitalNo: req.bah,
      inHospitalTime: req.rysj || '-',
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
      if (qtzdList[i].qtzddm || qtzdList[i].qtzdmc) {
        qtzdTemp.push(qtzdList[i].qtzddm + ',' + qtzdList[i].qtzdmc)
        that.originData.qtzd.push(qtzdList[i])
      }
      othDiagCodeList.push(qtzdList[i].qtzddm)
    }
    that.qtzd = qtzdTemp.join(' | ')
    that.dataForm.othDiagCodeList = othDiagCodeList

    var zyssjczList = req.zyssjczList || []
    var mainOprnCodeList = []
    var zyssTemp = []

    for (var i = 0; i < zyssjczList.length; i++) {
      if (zyssjczList[i].ssjczbm || zyssjczList[i].ssjczmc) {
        zyssTemp.push(zyssjczList[i].ssjczbm + ',' + zyssjczList[i].ssjczmc)
        that.originData.mainOperation.push(zyssjczList[i])
      }
      mainOprnCodeList.push(zyssjczList[i].ssjczbm)
    }
    that.mainOperation = zyssTemp.join(' | ')
    that.dataForm.mainOprnCodeList = mainOprnCodeList

    var ssjczList = req.ssjczList || []
    var othOprnCodeList = []
    var ssTemp = []
    for (var i = 0; i < ssjczList.length; i++) {
      if (ssjczList[i].ssjczbm || ssjczList[i].ssjczmc) {
        ssTemp.push(ssjczList[i].ssjczbm + ',' + ssjczList[i].ssjczmc)
        that.originData.qtss.push(ssjczList[i])
      }
      othOprnCodeList.push(ssjczList[i].ssjczbm)
    }
    that.qtss = ssTemp.join(' | ')
    that.dataForm.othOprnCodeList = othOprnCodeList

    res.medFeeAmt = req.zfy;
    that.groupInfo = res;
    that.setlInfo = encodeGroupInfo(res);
    that.warnMsgList = res.adviceList || [];
    that.processInfo = {
      real_short_amount: that.setlInfo.lowAmt || 0,
      drg_limit: that.setlInfo.highAmt || 0,
      total_amount: res.medFeeAmt || 0,
    }
    var progressId = that.clrWay === '50' ? 'dipProgress' : 'drgProgress';
    onProgressHandle(
      that.processInfo,
      document.getElementById(progressId)
    );
  })

  getConfigByDeployMode(function (data) {
    that.clrWay = data.clrWay || '40';
    var configList = data.configList || []
    // ['queryReset', 'groupWarn', 'groupPolling', 'mdcAdrg', 'adrgCondition', 'ccMcc', 'multiTrauma', 'clinPath']
    var groupWarn = getTarget(configList, 'groupWarn')
    var queryReset = getTarget(configList, 'queryReset')
    var loopGroup = getTarget(configList, 'groupPolling')
    var mdcAdrg = getTarget(configList, 'mdcAdrg')
    var adrgCond = getTarget(configList, 'adrgCondition')
    var ccmcc = getTarget(configList, 'ccMcc')
    var multiTrauma = getTarget(configList, 'multiTrauma')
    var clinPath = getTarget(configList, 'clinPath')
    that.showTabs = {
      queryResetEnabled: queryReset.enableFlag == '1', // 是否开启查询重置功能
      groupWarnName: groupWarn.funcName, //  实时分组预警名称
      loopGroupEnabled: loopGroup.enableFlag == '1', // 是否开启分组数据治理
      loopGroupName: loopGroup.funcName,
      mdcAdrgEnabled: mdcAdrg.enableFlag == '1', // 是否开启MDC/ADRG查询功能
      mdcAdrgName: mdcAdrg.funcName,
      adrgCondEnabled: adrgCond.enableFlag == '1', // 是否开启ADRG条件查
      adrgCondName: adrgCond.funcName,
      ccmccEnabled: ccmcc.enableFlag == '1', // 是否开启MCC/CC查询功
      ccmccName: ccmcc.funcName,
      multiTraumaEnabled: multiTrauma.enableFlag == '1', // 是否开启多发创伤查询
      multiTraumaName: multiTrauma.funcName,
      clinPathEnabled: clinPath.enableFlag == '1', // 是否开启临床路径指南查
      clinPathName: clinPath.funcName,
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
  var activeTabWidth = $activeTab.offsetWidth
  $largeBtn.style.left = activeTabLeft + activeTabWidth / 2 - 30 + "px";
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


function getConfigByDeployMode(callback) {
  $.ajax({
    url: '/hprs/system/auth/pop/getConfigByDeployMode',
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
      if (res.code === 200) {
        callback(res)
      } else {
        alert(res.msg)
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
      lowAmt: setlInfo.lowAmt,// 低限金额
      highAmt: setlInfo.highAmt,// 高限金额
      basePointScore: setlInfo.basePointScore,
      predictPointValue: setlInfo.predictPointValue,
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
    lowAmt: 0,// 低限金额
    highAmt: 0,// 高限金额
  };
}


function onProgressHandle(drgGroupInfo, dom) {
  var lowCutoff = parseFloat(drgGroupInfo.real_short_amount ? drgGroupInfo.real_short_amount : 0.00)
  var highCutoff = parseFloat(drgGroupInfo.drg_limit ? drgGroupInfo.drg_limit : 0.00)
  var hispitalTotalAvg = ((highCutoff - lowCutoff) / 2);
  var cost = parseFloat(drgGroupInfo.total_amount ? drgGroupInfo.total_amount : 0.00)

  var stepVal = 0.25
  var percentVal = 0.00
  if (cost < lowCutoff) {
    var offset = lowCutoff - cost
    var offStep = lowCutoff
    percentVal = (1 - offset / offStep) * stepVal
  } else if (cost >= lowCutoff && cost < hispitalTotalAvg) {
    var offset = cost - lowCutoff
    var offStep = hispitalTotalAvg - lowCutoff
    percentVal = (offset / offStep) * stepVal + stepVal
  } else if (cost >= hispitalTotalAvg && cost <= highCutoff) {
    var offset = cost - hispitalTotalAvg
    var offStep = highCutoff - hispitalTotalAvg
    percentVal = (offset / offStep) * stepVal + stepVal * 2
  } else if (cost > highCutoff) {
    var offset = cost - highCutoff
    var offStep = highCutoff
    var ratio = (offset / offStep) > 2 ? 1 : (offset / (2 * offStep))
    percentVal = ratio * stepVal + stepVal * 3
  }

  if (isNaN(percentVal)) percentVal = 0
  var percent = Math.round(percentVal * 100);

  var colors = getColor(percent);
  dom.style.width = percent + '%'
  if ([6, 7, 8, 9].indexOf(window.IEVersion) > -1) {
    dom.style.background = colors[1]
  } else {
    dom.style.background = 'linear-gradient(to right,' + colors[0] + ', ' + colors[1] + ')'
  }
  dom.style.filter = 'progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr=' + colors[0] + ', endColorstr=' + colors[1] + ')'
  dom.style['-ms-filter'] = '"progid:DXImageTransform.Microsoft.gradient (GradientType=1, startColorstr=' + colors[0] + ', endColorstr=' + colors[1] + ')"'
}

function getColor(percent) {
  var colors = gradientColors('#e4d9d1', '#bf4a43', 100, 1)
  return ['#e4d9d1', colors[percent - 1]]
}

function hexToRgb(hexColor) {
  if (hexColor.length === 4) {
    var arr = []
    var hexColorArr = hexColor.substr(1).split('');
    for (var i = 0; i < hexColorArr.length; i++) {
      var s = hexColorArr[i];
      arr.push(0x11 * parseInt(s, 16))
    }
    return arr;
  } else {
    var arr = []
    var hexColorArr = [hexColor.substr(1, 2), hexColor.substr(3, 2), hexColor.substr(5, 2)];
    for (var i = 0; i < hexColorArr.length; i++) {
      var s = hexColorArr[i];
      arr.push(parseInt(s, 16))
    }
    return arr;
  }
}

function pad(s) {
  return s.length === 1 ? '0' + s : s
}

function gradientColors(start, end, steps, gamma) {
  var i, j, ms, me, output = [], so = []
  gamma = gamma || 1
  var normalize = function (channel) {
    return Math.pow(channel / 255, gamma)
  }
  start = hexToRgb(start).map(normalize)
  end = hexToRgb(end).map(normalize)

  for (i = 0; i < steps; i++) {
    ms = i / (steps - 1)
    me = 1 - ms
    for (j = 0; j < 3; j++) {
      so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16))
    }
    output.push('#' + so.join(''))
  }
  return output
}


function filterZlList(list, dflag, oflag, mainDiagCode, mainOprnCodeList) {
  var result = []
  var length = list.length;
  if (!dflag && !oflag) {
    result = list;
  }
  if (dflag && !oflag) {
    for (var index = 0; index < length; index++) {
      if (list[index].diagCode === mainDiagCode) {
        result.push(list[index]);
      }
    }
  }
  if (!dflag && oflag) {
    for (var index = 0; index < length; index++) {
      var item = list[index]
      var flag = false
      for (var i = 0; i < mainOprnCodeList.length; i++) {
        var mo = mainOprnCodeList[i];
        if (item.oprnCode && item.oprnCode.indexOf(mo) !== -1) {
          flag = true
        }
      }
      if (flag) {
        result.push(list[index]);
      }
    }
  }

  if (dflag && oflag) {
    var tempList = []
    for (var index = 0; index < length; index++) {
      if (list[index].diagCode === mainDiagCode) {
        tempList.push(list[index]);
      }
    }
    for (var index = 0; index < tempList.length; index++) {
      var item = tempList[index]
      var flag = false
      for (var i = 0; i < mainOprnCodeList.length; i++) {
        var mo = mainOprnCodeList[i];
        if (item.oprnCode && item.oprnCode.indexOf(mo) !== -1) {
          flag = true
        }
      }
      if (flag) {
        result.push(tempList[index]);
      }
    }

  }
  return result;
}

function getTarget(list, code) {
  var target = {}
  for (var i = 0; i < list.length; i++) {
    var data = list[i]
    if (data.funcCode === code) {
      target = list[i]
      break
    }
  }
  return target
}