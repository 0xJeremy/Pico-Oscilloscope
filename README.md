<div align="center">
  <img src="docs/repo_logo.png">
</div>

### About

This project is an open source project to build an oscilloscope out of the $4 Raspberry Pi Pico. It uses a Raspberry Pi (or any other device) to host a webpage and display data streamed from the 4 analog-to-digital converters on the Pico.

### Code Structure

Code in the `app` folder is the Node.js powered web-based interface (running on a Raspberry Pi) which gathers and displays the data coming from the Pico.

Code in the `src` folder lives on the Raspberry Pi Pico and streams analog data over the serial port. It also accepts serial configuration commands... see below.

### Pico Serial Commands

[TODO: This section!]

### Developing

To develop on the webpage, use the command `npm run-script local` in the `app/` folder (must have done an `npm install` first). This will open the webpage in your default browser.

### Building the UI

To compile the react.js front-end, use `npm run-script build` in the `app/` directory. Once it compiles, use `node server.js` to host the webpage at `localhost:8080` and to start the back-end server for communicating with the Raspberry Pi Pico
