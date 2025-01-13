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
    accessTokenSecret: env.JWT_ACCESS_SECRET,
    refreshTokenSecret: env.JWT_REFRESH_SECRET,
  },
  coinMarketCap: {
    apiKey: env.CMC_API_KEY,
    apiUrl: env.CMC_API_URL,
  },
};

export default config;
