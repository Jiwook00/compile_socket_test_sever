const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const { codeData } = require("./data");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const compileNamespace = io.of("/compile");

compileNamespace.on("connection", (socket) => {
  console.log("hello socket");

  // 에디터에서 코드 받기
  socket.on("blockEditor", (data) => {
    // 코드 컴파일 (생략)
    console.log("block_editor", data);

    // 유니티로 전송
    compileNamespace.emit("unity", codeData);
  });

  socket.on("disconnect", () => {
    console.log("bye socket");
  });
});

server.listen(8080, () => {
  console.log("server is running");
});
