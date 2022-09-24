import { getInput } from "@actions/core";

export const packageName = getInput("package-name");
export const since = getInput("since");
