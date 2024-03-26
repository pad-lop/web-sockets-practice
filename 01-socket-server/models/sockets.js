export default class Sockets {
	constructor(io) {
        this.io = io;
        this.socketEvents()
    }

	socketEvents() {
		this.io.on("connection", (socket) => {
			console.log("Conection on: ", socket.id);

			socket.on("mensaje-cliente", (data) => {
				console.log(data);

				this.io.emit("mensaje-server", data);
			});
		});
	}
}
