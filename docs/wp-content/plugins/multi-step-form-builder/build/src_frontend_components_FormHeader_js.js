"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmulti_step_form_builder"] = self["webpackChunkmulti_step_form_builder"] || []).push([["src_frontend_components_FormHeader_js"],{

/***/ "./src/frontend/components/FormHeader.js"
/*!***********************************************!*\
  !*** ./src/frontend/components/FormHeader.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n\nvar FormHeader = function FormHeader(_ref) {\n  var formConfig = _ref.formConfig;\n  var title = formConfig.title,\n    description = formConfig.description,\n    _formConfig$showTitle = formConfig.showTitle,\n    showTitle = _formConfig$showTitle === void 0 ? true : _formConfig$showTitle,\n    _formConfig$showDescr = formConfig.showDescription,\n    showDescription = _formConfig$showDescr === void 0 ? true : _formConfig$showDescr;\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", {\n    className: \"msf-form-header\",\n    children: [showTitle && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"h2\", {\n      className: \"msf-form-title\",\n      children: title\n    }), showDescription && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"p\", {\n      className: \"msf-form-description\",\n      children: description\n    })]\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormHeader);\n\n//# sourceURL=webpack://multi-step-form-builder/./src/frontend/components/FormHeader.js?\n}");

/***/ }

}]);