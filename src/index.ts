import express from "express";
import helmet from "helmet"

const app = express();

app.use(express.json());
app.use(helmet());


app.listen(3000);
