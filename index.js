const { WebSocketServer } = require("ws");
const http = require("http");
const { v4: uuidv4 } = require("uuid");

const { PORT } = require("./config");

// Spinning the http server and the websocket server
const server = http.createServer();
const webSocketServer = new WebSocketServer({ server });

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

// I'm maintaining all active connections in this object
const clients = {};

// A new client connection request received
webSocketServer.on("connection", (connection, request) => {
  console.log(
    `new connection: ${request.socket.remoteAddress}:${request.socket.remotePort}`,
    request.rawHeaders[9]
  );

  // Generate a unique code for every user
  const userId = uuidv4();

  clients[userId] = connection;

  // A new client has disconnected
  connection.on("close", () => {
    console.log(`${userId} disconnected`);
    delete clients[userId];
  });

  // A new message was received from the client
  connection.on("message", (message) => {
    const data = JSON.parse(message);
    console.log(`${userId} received: `, data);

    // setTimeout(() => {
    //   const message = "Balasan baru anjay 👍";
    //   clients[userId].send(message);
    //   console.log(`${userId} sent: `, message);
    // }, 2000);
  });

  console.log(`${userId} connected`);

  // Broadcast message to all connected clients
  const interval = setInterval(() => {
    Object.values(clients).forEach((client) => {
      const message = new Date().toTimeString();
      client.send(message);
      console.log(`new message: ${message} was sent to: ${userId}`);
    });
  }, 5000);

  return () => clearInterval(interval);
});
