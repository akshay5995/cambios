import { getChangedPackages, getRootPackageName } from "./core";
import {
  setEnvChangeDetected,
  outputChangedPackages,
  packageName,
  since,
  setFailedMessage,
} from "./helpers";

const run = async () => {
  try {
    const changedPackages = await getChangedPackages(since);
    const packageNames = changedPackages.map((p) => p.name);
    const rootPackage = await getRootPackageName();

    const hasRootOrGivenPackageChanged =
      packageNames.includes(rootPackage) || packageNames.includes(packageName);

    setEnvChangeDetected(hasRootOrGivenPackageChanged);
    outputChangedPackages(packageNames);
  } catch (error) {
    setFailedMessage(error as Error);
  }
};

export default run;
