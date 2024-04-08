/*
 * @Date: 2024-03-08 16:32:50
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-04-08 14:24:15
 * @FilePath: \avalonIE\app\source\js\fix.js
 * @Description: 文档描述
 */

const { method } = require("bluebird");

// 解决IE无法console方法，页面报错
; (function (g) {
    'use strict';
    var _document = g.document || {};
    try {
        if (typeof _document['contains'] === 'undefined') {
            return false
        }
        // 添加容错处理
        Function.prototype.apply.call(_document['contains'], _document, arguments);
    } catch (exp) {
    }

    g.addEvent = addEvent
    g.removeEvent = removeEvent

    // 跨浏览器事件绑定
    function addEvent(obj, type, fn) {
        if (typeof obj.addEventListener !== 'undefined') {
            obj.addEventListener(type, fn, false);
        } else if (typeof obj.attachEvent !== 'undefined') {
            obj.attachEvent('on' + type, fn);
        }
    }

    // 跨浏览器事件解除
    function removeEvent(obj, type, fn) {
        if (typeof obj.removeEventListener !== 'undefined') {
            obj.removeEventListener(type, fn, false);
        } else if (typeof obj.detachEvent !== 'undefined') {
            obj.detachEvent('on' + type, fn);
        }
    }

}(window));

Array.prototype.filter = function (fn) {
    console.log('rewrite array filter method');
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        fn(this[i]) && newArr.push(this[i]);
    }
    return newArr;
};