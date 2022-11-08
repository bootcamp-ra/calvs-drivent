import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

export function loadEnv() {
  const path =
    process.env.NODE_ENV === "test"
      ? ".env.test"
      : process.env.NODE_ENV === "development"
        ? ".env.development"
        : ".env";

  const currentEnvs = dotenv.config({ path });
  dotenvExpand.expand(currentEnvs);
}
