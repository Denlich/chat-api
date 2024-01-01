import express from "express";
import { createServer } from "node:http";
import "dotenv/config.js";
import cors from "cors";
import router from "./routes/router.routes.js";
import { errorHandler } from "./middlewares/error.handler.js";
import Socket from "./socket/socket.js";

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
