import express from "express";
import helmet from "helmet"
import services from "./services/index"
const app = express();

app.use(express.json());
app.use(helmet());
app.use('/', services)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
