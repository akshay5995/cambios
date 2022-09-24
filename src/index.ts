import { setFailed } from "@actions/core";
import getChangedPackages from "./core/getChangedPackages";
import getRootPackageName from "./core/getRootPackageName";
import { packageName, since } from "./helpers/inputs";
import { setEnvChangeDetected, outputChangedPackages } from "./helpers/ouputs";

const main = async () => {
  try {
    const changedPackages = await getChangedPackages(since);
    const packageNames = changedPackages.map((p) => p.name);
    const rootPackage = await getRootPackageName();

    const hasRootOrGivenPackageChanged =
      packageNames.includes(rootPackage) || packageNames.includes(packageName);

    setEnvChangeDetected(hasRootOrGivenPackageChanged);
    outputChangedPackages(packageNames);
  } catch (error) {
    setFailed((error as Error).message);
  }
};

main();
