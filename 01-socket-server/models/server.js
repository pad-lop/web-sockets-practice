import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import Sockets from "./sockets.js";

import cors from "cors"

export default class Server {
	constructor() {
		this.app = express();
        this.app.use(cors())
		this.PORT = process.env["PORT"] 
		this.server = http.createServer(this.app);
		this.io = new SocketServer(this.server, {});
	}

	middlewares() {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		this.app.use(express.static(path.resolve(__dirname, "../public")));
	}

    configurarSockets(){
        new Sockets(this.io);
    }

	execute() {
		this.middlewares();

		this.server.listen(this.PORT, () => {
			console.log("Servidor montado en ", this.PORT);
		});
	}
}
