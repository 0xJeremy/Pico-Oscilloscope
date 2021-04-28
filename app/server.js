// Setup express server
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

// Setup Socket.io
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

// Setup Node Serialport
const SerialPort = require('serialport');
const ByteLength = require('@serialport/parser-byte-length');
// const port = new SerialPort('/dev/tty-usbserial1');

// const parser = port.pipe(new ByteLength({length: 8}));

// Add event listeners to socket
io.on("connection", socket => {
	console.log("Connection made!")
	socket.on('configUpdate', (data) => {
		console.log("Configuration update!", data);
	});

	setInterval(() => {
		io.emit('data', [gen(), gen(), gen(), gen()]);
		console.log("Emitting data!");
	}, 50);
});

// Add event listeners to serial port
// parser.on('data', (data) => {
	// Re-cast data to webpage
	// io.emit('data', data);
// });

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

httpServer.listen(port, () => console.log(`Listening on port ${port}`));

const gen = () => {
  return Math.floor(Math.random() * (100 - -100 + 1)) + -100;
};
