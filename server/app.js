const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
io.on("connection", (socket) => {
    console.log(socket);
    socket.on("chat", (payload) => {
        console.log(payload);
        io.emit("chat", payload);
    });
});
server.listen(5000, () => {
    console.log("Server is running on port 5000");
})