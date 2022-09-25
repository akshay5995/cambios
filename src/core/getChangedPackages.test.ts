const SINCE_MOCK = "commit-sha";
const MOCK_CHANGED_PACAKGES = [{ name: "root", version: "0.0.1" }];
const MOCK_OUTPUT = JSON.stringify(MOCK_CHANGED_PACAKGES);

const execMock = jest.fn().mockImplementation((cmd, callback) => {
  callback(null, MOCK_OUTPUT);
});

jest.mock("child_process", () => ({
  exec: execMock,
}));

import getChangedPackages from "./getChangedPackages";

describe("getChangedPackages", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should call the right methods and return right result", async () => {
    const result = await getChangedPackages(SINCE_MOCK);
    expect(execMock).toBeCalledTimes(1);
    expect(execMock).toBeCalledWith(
      `pnpm --filter "...[${SINCE_MOCK}]" list --json --depth=-1`,
      expect.anything()
    );
    expect(result).toStrictEqual(MOCK_CHANGED_PACAKGES);
  });

  test("should fail if pnpm command fails", async () => {
    const FAKE_ERROR = Error("Cmd: falied due to some reason");
    execMock.mockImplementation((cmd, callback) => {
      callback(FAKE_ERROR, null);
    });

    await expect(getChangedPackages(SINCE_MOCK)).rejects.toThrow();
  });
});
