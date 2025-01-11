import express from "express";
import helmet from "helmet"
import config from "@/config/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
