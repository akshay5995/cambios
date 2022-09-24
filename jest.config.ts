import type { Config } from "jest";
// Sync object
const config: Config = {
  verbose: true,
  preset: "ts-jest",
  extensionsToTreatAsEsm: [".ts"],
};

export default config;
