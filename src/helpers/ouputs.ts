import { exportVariable, setOutput } from "@actions/core";

export const setEnvChangeDetected = (bool: boolean): void => {
  exportVariable("CHANGE_DETECTED", bool);
};

export const outputChangedPackages = (packageNames: string[]): void => {
  setOutput("changed-packages", JSON.stringify(packageNames));
};
