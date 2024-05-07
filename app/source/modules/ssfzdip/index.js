/*
 * @Date: 2024-04-10 14:53:21
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-29 16:00:38
 * @FilePath: \avalonIE\app\source\modules\ssfzdip\index.js
 * @Description: 文档描述
 */
avalon.component("ms-ssfzdip", {
    template: require("./template.html"),
    defaults: {
        show: false,
        data: "",
        list: [],
        source: [],
        zIndex: 1,
        timer: {},
        groupInfo: {
            dipInfo: {
                diagCode: '',
                diagName: '',
                oprnGrpCode: '',
                oprnGrpName: '',
                asstListItemCode: '',
                asstListItemName: '',
            }
        },
        setlInfo: {
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
            basePointscore: 0,
            predictPointValue: 0,
        },
        warnMsgList: [],
        processInfo: {
            real_short_amount: 0,
            drg_limit: 0,
            total_amount: 0,
        },
        onClick: function ($event) {
        },
        onChange: function ($event) {
        },
        onSelectRow: function ($event, row) {
        },
        onInit: function () {
        },
        onReady: function (v) {
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {
            console.log("onDispose:", v);
        },
    },
});

