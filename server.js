const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    path: "/api/socket",
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 לקוח מחובר!");

    socket.on("disconnect", () => {
      console.log("❌ לקוח התנתק");
    });
  });

  global.io = io; // שמירת חיבור לכל הלקוחות

  server.listen(3000, () => {
    console.log("🚀 השרת רץ על http://localhost:3000");
  });
});
