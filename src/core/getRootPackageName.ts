import { readPackageUp } from "read-pkg-up";

const getRootPackageName = async (): Promise<string> => {
  const rootPackageResult = await readPackageUp();
  if (!rootPackageResult) {
    throw new Error("Couldn't read root package.json");
  }

  return rootPackageResult.packageJson.name;
};

export default getRootPackageName;
