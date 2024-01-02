import cors from "cors";
import "dotenv/config.js";
import express from "express";
import { createServer } from "node:http";

import router from "./api/routes/router.routes.js";
import Socket from "./api/socket/socket.js";
import { errorHandler } from "./api/middlewares/error-handler.js";

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use(errorHandler);

const { SocketInstance } = Socket.createSocket(server);
SocketInstance(server);

server.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
