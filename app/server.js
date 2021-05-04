// Setup express server

const ENABLE_HARDWARE = true;

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
let serialport = null;
if(ENABLE_HARDWARE) {
	const maxValue = 2**16;
	const scaleValue = 3300;
	const SerialPort = require('serialport');
	const ByteLength = require('@serialport/parser-byte-length');
	serialport = new SerialPort('/dev/ttyACM0');

	const parser = serialport.pipe(new ByteLength({length: 8}));

	// Here be dragons. I'm not proud...
	let adc1 = [];
	let adc2 = [];
	let adc3 = [];
	let adc4 = [];

	// Add event listeners to serial port
	parser.on('data', (data) => {
		adc1.push(data.readUInt16LE(0) / maxValue * scaleValue);
		adc2.push(data.readUInt16LE(2) / maxValue * scaleValue);
		adc3.push(data.readUInt16LE(4) / maxValue * scaleValue);
		adc4.push(data.readUInt16LE(6) / maxValue * scaleValue);

		if (adc1.length >= 10) {
			// Re-cast data to webpage
			if(shouldSendData()) {
				io.emit('data', processData([adc1, adc2, adc3, adc4]));
			}
			adc1 = [];
			adc2 = [];
			adc3 = [];
			adc4 = [];
		}
	});

	serialport.write(Buffer.from([0x20, 0x00, 0x00, 0x00]), (err) => {
	  if (err) {
	    return console.log('Error on write: ', err.message)
	  }
	  console.log('Wrote Sampling Frequency');
	});
}


const enabled = [false, false, false, false];
const inverted = [false, false, false, false];
const frequency = [50, 50, 50, 50];
const offset = [0, 0, 0, 0];
let paused = false;

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

		if(offset[i] !== 0) {
			data[i] = data[i].map((value) => parseInt(value + offset[i]));
		}

		if (inverted[i] === true) {
			data[i] = data[i].map((value) => value * -1);
		}
	}
	return data;
}

const shouldSendData = () => {
	return !paused && enabled.some((v) => v === true);
}

const toBytesInt32 = (num) => {
    arr = new Uint8Array([
         (num & 0x000000ff),
         (num & 0x0000ff00) >> 8,
         (num & 0x00ff0000) >> 16,
         (num & 0xff000000) >> 24
    ]);
    return arr;
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
		if(ENABLE_HARDWARE) {
			serialport.write(toBytesInt32(data[0]), (err) => {
				if (err) {
				  return console.log('Error on write: ', err.message)
				}
				console.log('Wrote Sampling Frequency', data[0]);
			});
		}
	});

	socket.on('updateoffset', (data) => {
		updateState(offset, data);
		console.log("Offset:", offset);
	});

	socket.on('streamUpdate', (data) => {
		console.log("Pausing?", data);
		paused = data;
	})

	if(!ENABLE_HARDWARE) {
		setInterval(() => {
			if(shouldSendData()) {
				const sendData = processData([[gen(), gen(), gen()], [gen(), gen(), gen()], [gen(), gen(), gen()], [gen(), gen(), gen()]]);
				io.emit('data', sendData);
				console.log("Emitting data!");
			}
		}, 100);
	}
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

httpServer.listen(port, () => console.log(`Listening on port ${port}`));

const gen = () => {
  return Math.floor(Math.random() * 101);
};
