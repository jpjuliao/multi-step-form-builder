"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmulti_step_form_builder"] = self["webpackChunkmulti_step_form_builder"] || []).push([["src_admin_components_StepHeader_js"],{

/***/ "./src/admin/components/StepHeader.js"
/*!********************************************!*\
  !*** ./src/admin/components/StepHeader.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ \"@wordpress/components\");\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n\n\n\nvar StepHeader = function StepHeader(_ref) {\n  var title = _ref.title,\n    description = _ref.description,\n    index = _ref.index,\n    onUpdate = _ref.onUpdate,\n    onDelete = _ref.onDelete;\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(\"div\", {\n      className: \"msf-step-header\",\n      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {\n        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Step Title', 'multi-step-form-builder'),\n        value: title || '',\n        onChange: function onChange(value) {\n          return onUpdate('title', value);\n        },\n        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(\"Step \".concat(index + 1), 'multi-step-form-builder')\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {\n        icon: \"trash\",\n        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Delete Step', 'multi-step-form-builder'),\n        onClick: onDelete,\n        isDestructive: true\n      })]\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {\n      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Step Description', 'multi-step-form-builder'),\n      value: description || '',\n      onChange: function onChange(value) {\n        return onUpdate('description', value);\n      },\n      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Optional description for this step', 'multi-step-form-builder')\n    })]\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepHeader);\n\n//# sourceURL=webpack://multi-step-form-builder/./src/admin/components/StepHeader.js?\n}");

/***/ }

}]);