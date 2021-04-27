# MPP P6

### Code Structure

Code in the `app` folder is the Node.js powered web-based interface (running on a Raspberry Pi) which gathers and displays the data coming from the Pico.

Code in the `src` folder lives on the Raspberry Pi Pico and streams analog data over the serial port. It also accepts serial configuration commands... see below.

### Pico Serial Commands

[TODO: This section!]

### Developing

To develop on the webpage, use the command `npm run-script local` in the `app/` folder (must have done an `npm install` first). This will open the webpage in your default browser.
