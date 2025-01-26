const express = require("express")
const http = require("http")
const WebSocket = require("ws")

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

const APP_PORT = process.env.PORT || 3000;
const APP_URL = process.env.URL || `https://localhost:${APP_PORT}`

app.use("/public", express.static("public"));
app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html") );
app.get("/admin", (req, res) => res.sendFile(__dirname + "/public/admin.html"));

server.listen(APP_PORT, () => {
  console.log(`Servidor rodando em ${APP_URL}`);
});