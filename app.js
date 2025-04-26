const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const path = require("path");
const expressSession = require("express-session");
const authRouter = require("./routes/auth");
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);
const ConnectToDB = require("./config/mongoose-connection");
const passport = require("passport");
ConnectToDB();
require("dotenv").config();
require('./config/googleOauth');

let waitingusers = [];
let rooms = {};

io.on("connection", function (socket) {
  socket.on("joinroom", function () {
    if (waitingusers.length > 0) {
      let partner = waitingusers.shift();
      const roomname = `${socket.id}-${partner.id}`;

      socket.join(roomname);
      partner.join(roomname);

      io.to(roomname).emit("joined", roomname);
    } else {
      waitingusers.push(socket);
    }
  });

  socket.on("signalingMessage", function (data) {
    socket.broadcast.to(data.room).emit("signalingMessage", data.message);
  });

  socket.on("message", function (data) {
    socket.broadcast.to(data.room).emit("message", data.message);
  });

  socket.on("startVideoCall", function ({ room }) {
    socket.broadcast.to(room).emit("incomingCall");
  });

  socket.on("rejectCall", function ({ room }) {
    socket.broadcast.to(room).emit("callRejected");
  });

  socket.on("acceptCall", function ({ room }) {
    socket.broadcast.to(room).emit("callAccepted");
  });

  socket.on("disconnect", function () {
    let index = waitingusers.findIndex(
      (waitingUser) => waitingUser.id === socket.id
    );

    waitingusers.splice(index, 1);
  });
});
require('dotenv').config();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(expressSession({ secret: process.env.EXPRESS_SECRET, resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);

server.listen(process.env.PORT || 3000 , () => {
  console.log("listening on port 3000");
});
