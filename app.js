//require the express module
require('./dbconnect')();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const chatRouter = require("./route");
const io = require("socket.io");
const http = require("http").Server(app);
const port = 5000;
const chatManager = require('./manager');

//bodyparser middleware
app.use(bodyParser.json());
//set the express.static middleware
app.use(express.static(__dirname + "/public"));

//routes
app.use("/chats", chatRouter);

//integrating socketio
socket = io(http);

//setup event listener
socket.on("connection", socket => {
	console.log("user connected");

	socket.on("disconnect", function () {
		console.log("user disconnected");
	});

	//Someone is typing
	socket.on("typing", data => {
		socket.broadcast.emit("notifyTyping", {
			user: data.user,
			message: data.message
		});
	});

	//when soemone stops typing
	socket.on("stopTyping", () => {
		socket.broadcast.emit("notifyStopTyping");
	});

	socket.on("chat message", function (msg) {
		console.log("message: " + msg);

		//broadcast message to everyone in port:5000 except yourself.
		socket.broadcast.emit("received", { message: msg });

		//save chat to the database
		chatManager.save(msg);
	});
});

http.listen(port, () => {
	console.log("Running on Port: " + port);
});
