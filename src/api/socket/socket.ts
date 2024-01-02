import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { Socket as SocketIO } from "socket.io";

class Socket {
  private server: HttpServer;
  private io: Server;

  constructor(server: HttpServer) {
    this.server = server;
    this.io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });
  }

  private initializeSocket() {
    this.io.on("connection", (socket) => {
      socket.on("user:join", this.onJoin);
    });
  }

  private onJoin(socket: SocketIO) {
    console.log(socket);
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
