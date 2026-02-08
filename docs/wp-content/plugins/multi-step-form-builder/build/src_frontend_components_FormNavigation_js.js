"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmulti_step_form_builder"] = self["webpackChunkmulti_step_form_builder"] || []).push([["src_frontend_components_FormNavigation_js"],{

/***/ "./src/frontend/components/FormNavigation.js"
/*!***************************************************!*\
  !*** ./src/frontend/components/FormNavigation.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n\n\nvar FormNavigation = function FormNavigation(_ref) {\n  var currentStep = _ref.currentStep,\n    isLastFormStep = _ref.isLastFormStep,\n    handlePrevious = _ref.handlePrevious,\n    handleNext = _ref.handleNext,\n    submitting = _ref.submitting,\n    _ref$settings = _ref.settings,\n    settings = _ref$settings === void 0 ? {} : _ref$settings;\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(\"div\", {\n    className: \"msf-form-navigation\",\n    children: [currentStep > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"button\", {\n      type: \"button\",\n      onClick: handlePrevious,\n      className: \"msf-btn msf-btn-secondary\",\n      children: settings.previousButtonText || 'Previous'\n    }), !isLastFormStep ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"button\", {\n      type: \"button\",\n      onClick: handleNext,\n      className: \"msf-btn msf-btn-primary\",\n      children: settings.nextButtonText || 'Next'\n    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"button\", {\n      type: \"submit\",\n      disabled: submitting,\n      className: \"msf-btn msf-btn-primary\",\n      children: submitting ? 'Submitting...' : settings.submitButtonText || 'Submit'\n    })]\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormNavigation);\n\n//# sourceURL=webpack://multi-step-form-builder/./src/frontend/components/FormNavigation.js?\n}");

/***/ }

}]);