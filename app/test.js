const SerialPort = require('serialport');
const ByteLength = require('@serialport/parser-byte-length');

const port = new SerialPort('/dev/ttyACM0');

const length = 8;
const parser = port.pipe(new ByteLength({length: length}));

let counter = 0;

port.write(Buffer.from([0x30, 0x00, 0x00, 0x00]), (err) => {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
});

parser.on('data', (data) => {
	counter += length;
	// console.log(data);
	// console.log(data.readUInt16LE(0));
	// console.log(data.readUInt16LE(2));
	// console.log(data.readUInt16LE(4));
	// console.log(data.readUInt16LE(6));
	// for (const value of data) {
	//   console.log(value);
	// }
});

setTimeout(() => {
	console.log(counter / 10 * 8);
}, 2000);
