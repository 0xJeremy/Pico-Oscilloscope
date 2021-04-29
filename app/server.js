// Setup express server
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

// Setup Socket.io
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:8080"],
    methods: ["GET", "POST"]
  }
});

// Setup Node Serialport
const SerialPort = require('serialport');
const ByteLength = require('@serialport/parser-byte-length');
// const port = new SerialPort('/dev/tty-usbserial1');

// const parser = port.pipe(new ByteLength({length: 8}));

const enabled = [false, false, false, false];
const inverted = [false, false, false, false];
const frequency = [50, 50, 50, 50];
const offset = [0, 0, 0, 0];

const updateState = (variable, newData) => {
	for(var i = 0; i < 4; i++) {
		variable[i] = newData[i];
	}
}

const processData = (data) => {
	for(var i = 0; i < 4; i++) {
		if (enabled[i] === false) {
			data[i] = [];
		}

		if (inverted[i] === true) {
			data[i] *= -1;
		}

		// data[i] += offset[i];
	}
	return data;
}


// Add event listeners to socket
io.on("connection", socket => {
	console.log("Connection made!")

	socket.on('updateEnabled', (data) => {
		updateState(enabled, data);
		console.log("Enabled:", enabled);
	});

	socket.on('updateInverted', (data) => {
		updateState(inverted, data);
		console.log("Inverted:", inverted);
	});

	socket.on('updateFrequency', (data) => {
		updateState(frequency, data);
		console.log("Frequency:", frequency);
	});

	socket.on('updateoffset', (data) => {
		updateState(offset, data);
		console.log("Offset:", offset);
	});

	setInterval(() => {
		io.emit('data', processData([[gen()], [gen()], [gen()], [gen()]]));
		console.log("Emitting data!");
	}, 250);
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
  return Math.floor(Math.random() * 101);
};
