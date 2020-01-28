webpackHotUpdate("main",{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/pages/Agenda.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Agenda.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module '../components/Heade'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    appHeader: !(function webpackMissingModule() { var e = new Error(\"Cannot find module '../components/Heade'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())\n  },\n\n  mounted() {\n    if (window.innerWidth < 800) {\n      this.visibleDays = 1;\n    }\n\n    this.getWeek();\n    this.$http.get('categoria?_embed&__hide_empty=1').then(res => {\n      this.categorias = res.data;\n      this.getPosts();\n    });\n  },\n\n  data() {\n    return {\n      categorias: [],\n      week: 0,\n      visibleDays: 7,\n      activeDay: false,\n      week_days: [],\n      days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],\n      months: [\"Jan\", \"Fev\", \"Mar\", \"Abr\", \"Mai\", \"Jun\", \"Jul\", \"Ago\", \"Set\", \"Out\", \"Nov\", \"Dez\"],\n      s: '',\n      now: new Date(),\n      curr_date: new Date(),\n      selectedDate: new Date()\n    };\n  },\n\n  methods: {\n    getImage(post) {\n      var img = post._embedded['wp:featuredmedia'][0].media_details;\n\n      if (img) {\n        return post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;\n      }\n\n      return 'https://via.placeholder.com/388x214';\n    },\n\n    getPosts() {\n      for (var i in this.categorias) {\n        this.$http.get('agenda?_embed&categoria[]=' + this.categorias[i].id + '&dia_de_inicio=' + this.activeDay.valueOf()).then(resp => {\n          vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(this.categorias[i], 'posts', resp.data);\n          this.categorias[i].page = 0;\n          console.log(resp); //this.categorias.push(this.categorias[i])\n        });\n      }\n    },\n\n    nextPage(category) {\n      if (category.page < category.posts.length) {\n        category.page++;\n      }\n    },\n\n    prevPage(category) {\n      if (category.page > 0) {\n        category.page--;\n      }\n    },\n\n    getWeek() {\n      this.week_days = [];\n      this.activeDay = false;\n\n      for (var d = 0; d < this.visibleDays; d++) {\n        var date = new Date(this.curr_date);\n\n        if (this.activeDay === false) {\n          this.activeDay = date;\n        }\n\n        date.setDate(date.getDate() + d);\n        this.week_days.push(date);\n      }\n\n      console.log(this.curr_date);\n    },\n\n    next() {\n      this.curr_date = this.curr_date.addDays(this.visibleDays);\n      this.getWeek();\n    },\n\n    prev() {\n      this.curr_date = this.curr_date.subDays(this.visibleDays);\n      this.getWeek();\n    }\n\n  },\n  watch: {\n    activeDay() {\n      this.getPosts();\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./src/pages/Agenda.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-class-component/dist/vue-class-component.esm.js":
false,

/***/ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js":
false,

/***/ "./src/components/Header.ts":
false

})