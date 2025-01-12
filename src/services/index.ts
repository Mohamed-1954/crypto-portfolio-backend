import express from "express";

import portfolio from "./portfolio/routes"


const app = express();

app.use('/portfolio', portfolio)


export default app