webpackHotUpdate("main",{

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ \"./src/App.vue\");\n/* harmony import */ var _fortawesome_fontawesome_free_js_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/fontawesome-free/js/fontawesome */ \"./node_modules/@fortawesome/fontawesome-free/js/fontawesome.js\");\n/* harmony import */ var _fortawesome_fontawesome_free_js_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_js_fontawesome__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Request_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Request.js */ \"./src/Request.js\");\n/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes.js */ \"./src/routes.js\");\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].prototype.$http = _Request_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\n\nDate.prototype.addDays = function (days) {\n  this.setDate(this.getDate() + days);\n  return this;\n};\n\nDate.prototype.subDays = function (days) {\n  this.setDate(this.getDate() - days);\n  return this;\n};\n\nconst bus = new vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  router: _routes_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  render: h => h(_App__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n});\nObject.defineProperty(vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].prototype, '$bus', {\n  get() {\n    return this.$root.bus;\n  },\n\n  set(newInstance) {\n    this.$root.bus = newInstance;\n  }\n\n});\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

})