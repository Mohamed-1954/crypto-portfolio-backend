import env from "@/lib/env"

const config = {
  env: env.NODE_ENV,
  server: {
    port: env.SERVER_PORT,
    host: env.SERVER_HOST,
  },
  database: {
    port: env.DB_PORT,
    host: env.DB_HOST,
    name: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    url: env.DB_URL
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
  coinMarketCap: {
    apiKey: env.CMC_API_KEY,
  },
};

export default config;