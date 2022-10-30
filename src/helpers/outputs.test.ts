const setOutputMocked = jest.fn();
const exportVariableMocked = jest.fn();
const setFailedMock = jest.fn();

jest.mock("@actions/core", () => ({
  setOutput: setOutputMocked,
  exportVariable: exportVariableMocked,
  setFailed: setFailedMock,
}));

import {
  setEnvChangeDetected,
  outputChangedPackages,
  setFailedMessage,
} from "./outputs";

describe("outputs", () => {
  test("setEnvChangeDetected should call the right method", () => {
    setEnvChangeDetected(true);
    expect(exportVariableMocked).toBeCalledTimes(1);
    expect(exportVariableMocked).toBeCalledWith("CHANGE_DETECTED", true);
  });

  test("outputChangedPackages should call the right method", () => {
    const changedPackages = ["root"];
    outputChangedPackages(changedPackages);
    expect(setOutputMocked).toBeCalledTimes(1);
    expect(setOutputMocked).toBeCalledWith(
      "changed-packages",
      JSON.stringify(JSON.stringify(changedPackages))
    );
  });

  test("setFailedMessage should call the right method", () => {
    const FAKE_ERROR = Error("action failed to get package");
    setFailedMessage(FAKE_ERROR);
    expect(setFailedMock).toBeCalledTimes(1);
    expect(setFailedMock).toBeCalledWith(FAKE_ERROR.message);
  });
});
