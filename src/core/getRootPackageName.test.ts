const PACKAGE_NAME_MOCKED = "root";

const readPackageUpMock = jest.fn();

jest.mock("read-pkg-up", () => ({
  readPackageUp: readPackageUpMock,
}));

import getRootPackageName from "./getRootPackageName";

describe("getRootPackageName", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should call the right method", async () => {
    readPackageUpMock.mockResolvedValue({
      packageJson: {
        name: PACKAGE_NAME_MOCKED,
      },
    });
    const result = await getRootPackageName();
    expect(readPackageUpMock).toBeCalledTimes(1);
    expect(result).toBe(PACKAGE_NAME_MOCKED);
  });

  test("throw error when root package couldn't be found", async () => {
    readPackageUpMock.mockResolvedValue(null);
    await expect(getRootPackageName()).rejects.toThrow(
      "Couldn't read root package.json"
    );
    expect(readPackageUpMock).toBeCalledTimes(1);
  });
});
