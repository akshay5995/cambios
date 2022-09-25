const PACKAGE_NAME_MOCKED = "fake-package";
const SINCE_MOCKED = "commit-sha";

const setFailedMessageMock = jest.fn();
const outputChangedPackagesMock = jest.fn();
const setEnvChangeDetectedMock = jest.fn();
const getChangedPackagesMock = jest.fn().mockReturnValue([
  { name: "root", version: "0.0.1" },
  { name: "some-fake-package", version: "0.0.1" },
]);
const getRootPackageNameMock = jest.fn().mockReturnValue("root");

jest.mock("./helpers", () => ({
  setEnvChangeDetected: setEnvChangeDetectedMock,
  outputChangedPackages: outputChangedPackagesMock,
  packageName: PACKAGE_NAME_MOCKED,
  since: SINCE_MOCKED,
  setFailedMessage: setFailedMessageMock,
}));

jest.mock("./core", () => ({
  getRootPackageName: getRootPackageNameMock,
  getChangedPackages: getChangedPackagesMock,
}));

import run from "./run";

describe("run", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should call all the right methods", async () => {
    await run();
    expect(getChangedPackagesMock).toBeCalledTimes(1);
    expect(getChangedPackagesMock).toBeCalledWith(SINCE_MOCKED);
    expect(getRootPackageNameMock).toBeCalledTimes(1);
    expect(setEnvChangeDetectedMock).toBeCalledTimes(1);
    expect(setEnvChangeDetectedMock).toBeCalledWith(true);
    expect(outputChangedPackagesMock).toBeCalledTimes(1);
    expect(outputChangedPackagesMock).toBeCalledWith([
      "root",
      "some-fake-package",
    ]);
  });

  test("should call setFailed when there's an error", async () => {
    const FAKE_ERROR = Error("Action failed due to error");
    getChangedPackagesMock.mockRejectedValue(FAKE_ERROR);

    await expect(run()).resolves.not.toThrow();
    expect(getChangedPackagesMock).toBeCalledTimes(1);
    expect(getChangedPackagesMock).toBeCalledWith(SINCE_MOCKED);
    expect(getRootPackageNameMock).not.toBeCalled();
    expect(setEnvChangeDetectedMock).not.toBeCalled();
    expect(outputChangedPackagesMock).not.toBeCalled();
    expect(setFailedMessageMock).toBeCalledTimes(1);
    expect(setFailedMessageMock).toBeCalledWith(FAKE_ERROR);
  });
});
