const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: "./.env" });
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));


const server = app.listen(8000, () => {
  console.log("server is running");
});

app.use("/auth", require("./routes/auth"));
app.use("/ai", require("./routes/ai"));
app.use("/pay", require("./routes/payment"));
app.use("/chat",require("./routes/chat"));
app.use("/pdf",require("./routes/pdf"));
app.use("/translate",require("./routes/translation"));
app.use("/col",require("./routes/collab"));

const { WebSocketServer } = require('ws');
// Initialize WebSocket server
const wss = new WebSocketServer({ server });

// Map to store clients with their associated emails
const clients = new Map();

// Broadcast to specific client by id
const sendToClientById = (id, message) => {
  for (const [client, clientId] of clients.entries()) {
    if (clientId === id && client.readyState === client.OPEN) {
      client.send(JSON.stringify(message));
    }
  }
};

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Temporary id storage until client sends its id
  let clientId = null;

  // Handle incoming messages
  ws.on('message', (data) => {
    const parsedData = JSON.parse(data);

    if (parsedData.type === 'register') {
      // Register client with id
      clientId = parsedData.id;
      clients.set(ws, clientId);
      console.log(`Registered client with id: ${clientId}`);
    } else if (parsedData.type === 'sync') {
      // Synchronize message between clients
      const { id, message } = parsedData;
      sendToClientById(id, { type: 'sync', data: message });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws); // Remove client from map on disconnect
  });

  // Send a welcome message to the client
  ws.send(JSON.stringify({ type: 'welcome', data: 'Connected to WebSocket server!' }));
});