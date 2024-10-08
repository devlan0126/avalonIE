/*
 * @Date: 2024-03-16 13:26:06
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-08-23 10:18:26
 * @FilePath: \avalonIE\app\source\modules\fzzl\index.js
 * @Description: 文档描述
 */
avalon.component("ms-fzzl", {
    template: require("./template.html"),
    defaults: {
        show: false,
        list: [],
        clrWay: "40",
        columns: [
            {
                label: "主诊断编码",
                prop: "diagCode",
            },
            {
                label: "主诊断名称",
                prop: "diagName",
            },
            {
                label: "主手术编码",
                prop: "oprnCode",
            },
            {
                label: "主手术名称",
                prop: "oprnName",
            },
            {
                label: "DRG编码",
                prop: "drgCode",
            },
            {
                label: "DRG名称",
                prop: "drgName",
            },
            {
                label: "DRG类型",
                prop: "grpType",
            },
            {
                label: "病组均费",
                prop: "avgFee",
            },
            {
                label: "基准点数",
                prop: "basePoint",
            },
            {
                label: "调整系数",
                prop: "adjFactor",
            },
            {
                label: "病例类型",
                prop: "casType",
            },
            {
                label: "预测点数",
                prop: "predictPoint",
            },
            {
                label: "预测费用",
                prop: "predictAmt",
            },
            {
                label: "预测盈亏",
                prop: "profitAmt",
            },
            {
                label: "治理提升",
                prop: "advice",
            },
        ],

        onInit: function () {
        },
        onReady: function (v) {
            var that = this;
            that.$watch("clrWay", function () {
              if (that.clrWay === "50") {
                that.columns = [
                  {
                    label: "诊断编码",
                    prop: "grpDiagCode",
                  },
                  {
                    label: "诊断名称",
                    prop: "grpDiagName",
                  },
                  {
                    label: "手术分组编码组合  ",
                    prop: "grpOprnCode",
                    width: "120px",
                  },
                  {
                    label: "手术分组名称组合",
                    prop: "grpOprnName",
                    width: "120px",
                  },
                  {
                    label: "辅助目录编码",
                    prop: "grpAssCode",
                  },
                  {
                    label: "辅助目录名称",
                    prop: "grpAssName",
                  },
                  {
                    label: "手术编码",
                    prop: "oprnCode",
                    width: "120px",
                  },
                  {
                    label: "手术名称",
                    prop: "oprnName",
                    width: "120px",
                  },
                  {
                    label: "病种均费",
                    prop: "avgFee",
                  },
                  {
                    label: "病种分值",
                    prop: "basePoint",
                  },
                  {
                    label: "倍率",
                    prop: "feeRate",
                  },
                  {
                    label: "基本统筹支付",
                    prop: "hifpPay",
                  },
                  {
                    label: "病例类型",
                    prop: "casType",
                  },
                  {
                    label: "预测分值",
                    prop: "score",
                  },
                  {
                    label: "预测费用",
                    prop: "predictAmt",
                  },
                  {
                    label: "预测盈亏",
                    prop: "profitAmt",
                  },
                ];
              }
            });
        },
        onViewChange: function (v) {
        },
        onDispose: function (v) {
            console.log("onDispose:", v);
        },
    },
});
