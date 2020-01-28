webpackHotUpdate("main",{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/pages/Agenda.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Agenda.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _components_Header_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Header.ts */ \"./src/components/Header.ts\");\n/* harmony import */ var _components_Header_ts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_Header_ts__WEBPACK_IMPORTED_MODULE_1__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    appHeader: _components_Header_ts__WEBPACK_IMPORTED_MODULE_1___default.a\n  },\n\n  mounted() {\n    if (window.innerWidth < 800) {\n      this.visibleDays = 1;\n    }\n\n    this.getWeek();\n    this.$http.get('categoria?_embed&__hide_empty=1').then(res => {\n      this.categorias = res.data;\n      this.getPosts();\n    });\n  },\n\n  data() {\n    return {\n      categorias: [],\n      week: 0,\n      visibleDays: 7,\n      activeDay: false,\n      week_days: [],\n      days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],\n      months: [\"Jan\", \"Fev\", \"Mar\", \"Abr\", \"Mai\", \"Jun\", \"Jul\", \"Ago\", \"Set\", \"Out\", \"Nov\", \"Dez\"],\n      s: '',\n      now: new Date(),\n      curr_date: new Date(),\n      selectedDate: new Date()\n    };\n  },\n\n  methods: {\n    getImage(post) {\n      var img = post._embedded['wp:featuredmedia'][0].media_details;\n\n      if (img) {\n        return post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;\n      }\n\n      return 'https://via.placeholder.com/388x214';\n    },\n\n    getPosts() {\n      for (var i in this.categorias) {\n        this.$http.get('agenda?_embed&categoria[]=' + this.categorias[i].id + '&dia_de_inicio=' + this.activeDay.valueOf()).then(resp => {\n          vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(this.categorias[i], 'posts', resp.data);\n          this.categorias[i].page = 0;\n          console.log(resp); //this.categorias.push(this.categorias[i])\n        });\n      }\n    },\n\n    nextPage(category) {\n      if (category.page < category.posts.length) {\n        category.page++;\n      }\n    },\n\n    prevPage(category) {\n      if (category.page > 0) {\n        category.page--;\n      }\n    },\n\n    getWeek() {\n      this.week_days = [];\n      this.activeDay = false;\n\n      for (var d = 0; d < this.visibleDays; d++) {\n        var date = new Date(this.curr_date);\n\n        if (this.activeDay === false) {\n          this.activeDay = date;\n        }\n\n        date.setDate(date.getDate() + d);\n        this.week_days.push(date);\n      }\n\n      console.log(this.curr_date);\n    },\n\n    next() {\n      this.curr_date = this.curr_date.addDays(this.visibleDays);\n      this.getWeek();\n    },\n\n    prev() {\n      this.curr_date = this.curr_date.subDays(this.visibleDays);\n      this.getWeek();\n    }\n\n  },\n  watch: {\n    activeDay() {\n      this.getPosts();\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./src/pages/Agenda.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/ts-loader/index.js?!./node_modules/ts-loader/index.js!./node_modules/vue-loader/lib/index.js?!./src/pages/Agenda.vue?vue&type=script&lang=ts&":
false,

/***/ "./src/components/Header.ts":
/*!**********************************!*\
  !*** ./src/components/Header.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\")\n        r = Reflect.decorate(decorators, target, key, desc);\n    else\n        for (var i = decorators.length - 1; i >= 0; i--)\n            if (d = decorators[i])\n                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Importação do Vue\n */\nconst vue_2 = __importDefault(__webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\"));\n/**\n * Importação do events bus para trabalhar\n * com eventos globais dentro da aplicação\n */\nconst vue_property_decorator_2 = __webpack_require__(/*! vue-property-decorator */ \"./node_modules/vue-property-decorator/lib/vue-property-decorator.js\");\n/**\n * Class based components\n */\nlet Header = class Header extends vue_2.default {\n    mounted() {\n        alert('khlkhj');\n    }\n};\nHeader = __decorate([\n    vue_property_decorator_2.Component\n], Header);\nexports.default = Header;\n\n\n//# sourceURL=webpack:///./src/components/Header.ts?");

/***/ }),

/***/ "./src/pages/Agenda.vue":
/*!******************************!*\
  !*** ./src/pages/Agenda.vue ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Agenda_vue_vue_type_template_id_bc663ca0_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Agenda.vue?vue&type=template&id=bc663ca0&scoped=true&lang=pug& */ \"./src/pages/Agenda.vue?vue&type=template&id=bc663ca0&scoped=true&lang=pug&\");\n/* harmony import */ var _Agenda_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Agenda.vue?vue&type=script&lang=js& */ \"./src/pages/Agenda.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _Agenda_vue_vue_type_style_index_0_id_bc663ca0_scoped_true_lang_stylus___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Agenda.vue?vue&type=style&index=0&id=bc663ca0&scoped=true&lang=stylus& */ \"./src/pages/Agenda.vue?vue&type=style&index=0&id=bc663ca0&scoped=true&lang=stylus&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _Agenda_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Agenda_vue_vue_type_template_id_bc663ca0_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Agenda_vue_vue_type_template_id_bc663ca0_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"bc663ca0\",\n  null\n  \n)\n\n/* hot reload */\nif (true) {\n  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ \"./node_modules/vue-hot-reload-api/dist/index.js\")\n  api.install(__webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\"))\n  if (api.compatible) {\n    module.hot.accept()\n    if (!api.isRecorded('bc663ca0')) {\n      api.createRecord('bc663ca0', component.options)\n    } else {\n      api.reload('bc663ca0', component.options)\n    }\n    module.hot.accept(/*! ./Agenda.vue?vue&type=template&id=bc663ca0&scoped=true&lang=pug& */ \"./src/pages/Agenda.vue?vue&type=template&id=bc663ca0&scoped=true&lang=pug&\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Agenda_vue_vue_type_template_id_bc663ca0_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Agenda.vue?vue&type=template&id=bc663ca0&scoped=true&lang=pug& */ \"./src/pages/Agenda.vue?vue&type=template&id=bc663ca0&scoped=true&lang=pug&\");\n(function () {\n      api.rerender('bc663ca0', {\n        render: _Agenda_vue_vue_type_template_id_bc663ca0_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n        staticRenderFns: _Agenda_vue_vue_type_template_id_bc663ca0_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]\n      })\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))\n  }\n}\ncomponent.options.__file = \"src/pages/Agenda.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/pages/Agenda.vue?");

/***/ }),

/***/ "./src/pages/Agenda.vue?vue&type=script&lang=js&":
/*!*******************************************************!*\
  !*** ./src/pages/Agenda.vue?vue&type=script&lang=js& ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Agenda_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./Agenda.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/pages/Agenda.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Agenda_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/pages/Agenda.vue?");

/***/ }),

/***/ "./src/pages/Agenda.vue?vue&type=script&lang=ts&":
false

})