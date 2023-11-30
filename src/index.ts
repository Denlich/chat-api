import express from "express";
import "dotenv/config.js";
import cors from "cors";
import router from "./routes/router.routes.js";
import { errorHandler } from "./middlewares/error.handler.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
