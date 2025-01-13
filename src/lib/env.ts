import { config } from "dotenv";
import { expand } from "dotenv-expand";

import { ZodError, z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  SERVER_HOST: z.string().default("localhost"),
  SERVER_PORT: z.coerce.number().default(3000),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number(),
  DB_URL: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  CMC_API_URL: z.string(),
  CMC_API_KEY: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n";
    error.issues.forEach((issue) => {
      message += `${issue.path[0]}\n`;
    });
    const e = new Error(message);
    e.stack = "";
    throw e;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
