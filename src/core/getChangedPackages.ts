import { exec } from "child_process";

type PackageDefinition = {
  name: string;
  version: string;
};

const isValidPackage = (value: unknown) => {
  return value && typeof value == "object" && "name" in value;
};

const getChangedPackages = (since: string): Promise<PackageDefinition[]> => {
  const command = `pnpm --filter "...[${since}]" list --json --depth=-1`;
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err !== null) {
        reject(err);
        return;
      }

      if (stdout == "") {
        resolve([]);
        return;
      }

      try {
        const packagesArray = JSON.parse(stdout) as PackageDefinition[];
        if (
          Array.isArray(packagesArray) &&
          packagesArray.every((p) => isValidPackage(p))
        ) {
          resolve(packagesArray);
        } else {
          reject(`Invalid PackageDefinitions: ${packagesArray}`);
        }
      } catch (err) {
        reject((err as Error).message);
      }
    });
  });
};

export default getChangedPackages;
