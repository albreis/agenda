webpackHotUpdate("main",{

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Header.vue?vue&type=template&id=61dd7a3d&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Header.vue?vue&type=template&id=61dd7a3d& ***!
  \************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"header\", { attrs: { id: \"header\" } }, [\n    _c(\n      \"h1\",\n      {\n        on: {\n          click: function($event) {\n            return _vm.$router.push(\"/\")\n          }\n        }\n      },\n      [_vm._v(\"Agenda VueJS\")]\n    ),\n    _vm._v(\" \"),\n    _c(\n      \"ul\",\n      _vm._l(_vm.categorias, function(cat) {\n        return _c(\n          \"li\",\n          { key: cat.id },\n          [\n            _c(\n              \"router-link\",\n              { attrs: { to: { path: cat.slug, name: cat.name, id: cat.id } } },\n              [_vm._v(\"\\n        \" + _vm._s(cat.name) + \"\\n      \")]\n            )\n          ],\n          1\n        )\n      }),\n      0\n    )\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/Header.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ })

})