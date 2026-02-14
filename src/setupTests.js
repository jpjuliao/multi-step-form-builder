// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock WordPress dependencies
global.wp = {
  element: {
    createElement: jest.fn(),
    Component: class Component {},
    Fragment: 'div',
  },
  components: {
    Button: jest.fn(),
    Panel: jest.fn(),
    PanelBody: jest.fn(),
  },
  i18n: {
    __: jest.fn((text) => text),
    _x: jest.fn((text) => text),
    _n: jest.fn((single, plural, number) => number === 1 ? single : plural),
  },
  apiFetch: jest.fn(),
  data: {
    withSelect: jest.fn(),
    withDispatch: jest.fn(),
  },
};

// Mock React hooks that might be used from WordPress
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
  useRef: jest.fn(),
}));
