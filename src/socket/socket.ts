import { Server } from "socket.io";
import { Server as HttpServer } from "http";

class Socket {
  private server: HttpServer;
  private io: Server;

  constructor(server: HttpServer) {
    this.server = server;
    this.io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });
  }

  initializeSocket() {
    this.io.on("connection", (socket) => {
      console.log(socket.id);
    });
  }

  static createSocket(server: HttpServer) {
    const _createSocketInstance = (server: HttpServer) => {
      const socketInstance = new Socket(server);
      return socketInstance.initializeSocket();
    };

    return {
      SocketInstance: _createSocketInstance,
    };
  }
}

export default Socket;
