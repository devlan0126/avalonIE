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