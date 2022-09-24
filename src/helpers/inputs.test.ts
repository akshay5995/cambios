const PACKAGE_NAME_MOCKED = "fake-package";
const ROOT_PACKAGE_NAME_MOCKED = "root";
const SINCE_MOCKED = "some-sha-or-git-tag";

const getInputMocked = jest.fn().mockImplementation((input: string) => {
  switch (input) {
    case "package-name":
      return PACKAGE_NAME_MOCKED;
    case "root-package-name":
      return ROOT_PACKAGE_NAME_MOCKED;
    case "since":
      return SINCE_MOCKED;
  }
});

jest.mock("@actions/core", () => ({
  getInput: getInputMocked,
}));

import { packageName, since } from "./inputs";

describe("inputs", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  test("should get the right inputs supplied", () => {
    expect(packageName).toBe(PACKAGE_NAME_MOCKED);
    expect(since).toBe(SINCE_MOCKED);
  });
});
