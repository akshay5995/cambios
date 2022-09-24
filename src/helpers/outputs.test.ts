const setOutputMocked = jest.fn();
const exportVariableMocked = jest.fn();

jest.mock("@actions/core", () => ({
  setOutput: setOutputMocked,
  exportVariable: exportVariableMocked,
}));

import { setEnvChangeDetected, outputChangedPackages } from "./ouputs";

describe("outputs", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
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
      JSON.stringify(changedPackages)
    );
  });
});
