import "@testing-library/jest-dom/extend-expect";
import "cross-fetch/polyfill";

const mediaDevicesMock = {
  enumerateDevices: jest.fn(),
  getUserMedia: jest.fn().mockResolvedValue(jest.fn()),
};

// @ts-ignore
global.navigator.mediaDevices = mediaDevicesMock;
