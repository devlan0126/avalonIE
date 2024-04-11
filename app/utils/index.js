/**
 * 基础补丁包
 * */
require('./patch/console');
require('es6-promise/auto');

/**
 * 功能扩展包
 * */
var jquery = require('./tools/jquery.min');
window.$ = jquery;
window.jQuery = jquery;
require('avalon2');