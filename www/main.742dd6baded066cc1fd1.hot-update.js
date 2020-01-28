webpackHotUpdate("main",{

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var _pages_Agenda_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/Agenda.vue */ \"./src/pages/Agenda.vue\");\n/* harmony import */ var _pages_AgendaSingle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/AgendaSingle */ \"./src/pages/AgendaSingle.vue\");\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nconst routes = [{\n  path: '/',\n  component: _pages_Agenda_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n}, {\n  path: '/[:id]',\n  component: _pages_AgendaSingle__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n}]; // 3. Create the router instance and pass the `routes` option\n// You can pass in additional options here, but let's\n// keep it simple for now.\n\nconst router = new vue_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n  routes // short for `routes: routes`\n\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/routes.js?");

/***/ })

})