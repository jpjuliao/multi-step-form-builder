"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmulti_step_form_builder"] = self["webpackChunkmulti_step_form_builder"] || []).push([["src_frontend_components_FormFeedback_js"],{

/***/ "./src/frontend/components/FormFeedback.js"
/*!*************************************************!*\
  !*** ./src/frontend/components/FormFeedback.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n\n\nvar FormFeedback = function FormFeedback(_ref) {\n  var hasError = _ref.hasError,\n    successMessage = _ref.successMessage,\n    errors = _ref.errors,\n    onBack = _ref.onBack;\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n    className: \"msf-step-content\",\n    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(\"div\", {\n      className: \"msf-form-\".concat(hasError ? 'error' : 'success'),\n      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n        className: \"msf-\".concat(hasError ? 'error' : 'success', \"-icon\"),\n        children: hasError ? '✕' : '✓'\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(\"div\", {\n        className: \"msf-form-message\",\n        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"h3\", {\n          children: hasError ? 'Error' : 'Success!'\n        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"p\", {\n          children: successMessage\n        })]\n      }), hasError && Object.keys(errors).length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"button\", {\n        type: \"button\",\n        onClick: onBack,\n        className: \"msf-btn msf-btn-primary\",\n        style: {\n          marginTop: '20px'\n        },\n        children: \"Go Back\"\n      })]\n    })\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormFeedback);\n\n//# sourceURL=webpack://multi-step-form-builder/./src/frontend/components/FormFeedback.js?\n}");

/***/ }

}]);