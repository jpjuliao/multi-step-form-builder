"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmulti_step_form_builder"] = self["webpackChunkmulti_step_form_builder"] || []).push([["src_frontend_components_ProgressBar_js"],{

/***/ "./src/frontend/components/ProgressBar.js"
/*!************************************************!*\
  !*** ./src/frontend/components/ProgressBar.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n\nvar ProgressBar = function ProgressBar(_ref) {\n  var currentStep = _ref.currentStep,\n    totalSteps = _ref.totalSteps,\n    steps = _ref.steps;\n  var progress = (currentStep + 1) / totalSteps * 100;\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", {\n    className: \"msf-progress-container\",\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n      className: \"msf-progress-bar\",\n      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n        className: \"msf-progress-fill\",\n        style: {\n          width: \"\".concat(progress, \"%\")\n        }\n      })\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n      className: \"msf-progress-steps\",\n      children: steps.map(function (step, index) {\n        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", {\n          className: \"msf-progress-step \".concat(index < currentStep ? 'completed' : index === currentStep ? 'active' : 'pending'),\n          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n            className: \"msf-progress-step-number\",\n            children: index < currentStep ? '✓' : index + 1\n          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n            className: \"msf-progress-step-label\",\n            children: step.title || \"Step \".concat(index + 1)\n          })]\n        }, index);\n      })\n    })]\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgressBar);\n\n//# sourceURL=webpack://multi-step-form-builder/./src/frontend/components/ProgressBar.js?\n}");

/***/ }

}]);