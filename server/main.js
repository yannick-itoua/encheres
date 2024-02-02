import http from "http";
import RequestController from './controllers/RequestController.js';
import { Server as ServerIO } from 'socket.io';
import IOController from "./controllers/IOController.js";

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

const port = 8080;
server.listen(port);
console.log(`>>> server running on port ${port} <<<`);
// mise en place du serveur de socket.io
const io = new ServerIO(server);
const ioController = new IOController(io);
io.on('connection', socket => ioController.registerSocket(socket) );
