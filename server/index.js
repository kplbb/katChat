const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute');
const messagesRoute = require('./routes/messagesRoute');
const app = express();
const {socket, Server} = require("socket.io");
const http = require("http");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoute);
app.use("/api/messages", messagesRoute);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connection Successful!");
}).catch((err) => {
    console.log(err.message);
});

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

let onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (id) => {
    onlineUsers.set(id, socket.id);
    // console.log("onlineUsers-"+[...onlineUsers.entries()]);
    // console.log(`User Connected: ${socket.id}` + "----id-"+ id);
    
});

socket.on("join_room", (data) => {
    // console.log("data to-"+data.to + "data.from:"+ data.from);
        // console.log("onlineUsers-"+[...onlineUsers.entries()]);
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket)
            socket.join(data.from);
    });

    // socket.on("index_join_room", (data) => {
    //     socket.join(data);
    // });

    // socket.on("index_send_message", (data) => {
    //     socket.emit("receive_message", data);
    //     socket.to(data.room).emit("receive_message", data);
    // });

    socket.on("send_message", (data) => {
            socket.emit("receive_message", {message: data.msg, from: data.from, to:data.to});
    });

    socket.on('disconnect', () => {
        // console.log('user disconnected');
    });
    });

    server.listen(process.env.PORT, () => {
        console.log(`Server Started on PORT ${process.env.PORT}`)
    });