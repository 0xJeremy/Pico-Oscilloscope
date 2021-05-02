const SerialPort = require('serialport');
const ByteLength = require('@serialport/parser-byte-length');

const port = new SerialPort('/dev/ttyACM0');

const length = 32;
const parser = port.pipe(new ByteLength({length: length}));

let counter = 0;

parser.on('data', (data) => {
	counter += length;
});

setTimeout(() => {
	console.log(counter / 10 * 8);
}, 10000);
