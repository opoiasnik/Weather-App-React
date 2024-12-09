// setupTests.ts
import '@testing-library/jest-dom';
import '@testing-library/jest-dom';

import { TextEncoder } from 'node:util'
import fetchMock from "jest-fetch-mock";
import 'jest-canvas-mock';


global.TextEncoder = TextEncoder
fetchMock.enableMocks();

global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  