"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmulti_step_form_builder"] = self["webpackChunkmulti_step_form_builder"] || []).push([["src_frontend_components_StepContent_js"],{

/***/ "./src/frontend/components/StepContent.js"
/*!************************************************!*\
  !*** ./src/frontend/components/StepContent.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n\n\nvar FormField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {\n  return __webpack_require__.e(/*! import() */ \"src_frontend_components_FormField_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./FormField */ \"./src/frontend/components/FormField.js\"));\n});\nvar StepContent = function StepContent(_ref) {\n  var _step$fields;\n  var step = _ref.step,\n    formData = _ref.formData,\n    errors = _ref.errors,\n    updateFieldValue = _ref.updateFieldValue;\n  if (!step) return null;\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(\"div\", {\n    className: \"msf-step-content\",\n    children: [step.title && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"h3\", {\n      className: \"msf-step-title\",\n      children: step.title\n    }), step.description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"p\", {\n      className: \"msf-step-description\",\n      children: step.description\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"msf-fields\",\n      children: (_step$fields = step.fields) === null || _step$fields === void 0 ? void 0 : _step$fields.map(function (field, index) {\n        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(FormField, {\n          field: field,\n          value: formData[field.name],\n          onChange: function onChange(value) {\n            return updateFieldValue(field.name, value);\n          },\n          error: errors[field.name]\n        }, field.name || index);\n      })\n    })]\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepContent);\n\n//# sourceURL=webpack://multi-step-form-builder/./src/frontend/components/StepContent.js?\n}");

/***/ }

}]);