import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { paperColor, colorBlue } from "./PageStyles";

const useStyles = makeStyles((theme) => ({
  dialog: {
    color: colorBlue,
    backgroundColor: paperColor,
  },
  blue: {
    color: colorBlue,
  },
  outline_blue: {
    borderColor: colorBlue,
    height: "100%",
  },
  box: {
    backgroundColor: paperColor,
    color: colorBlue,
    borderRadius: "0px",
  },
  paper: {
    borderRadius: "0px",
  },
  link: {
    color: "white",
  },
}));

export default function InfoBox(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        className={classes.dialog}
        classes={{ paper: classes.paper }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className={classes.box}>
          Raspberry Pi[co] [OSS]illoscope
        </DialogTitle>
        <DialogContent className={classes.box}>
          <DialogContentText className={classes.box}>
            Welcome to the Raspberry Pi[co] [OSS]illoscope: a Raspberry Pi and
            Raspberry Pi Pico open-source oscilloscope. Please enjoy.
            <br />
            View the source code and contribute to the project{" "}
            <a
              className={classes.link}
              href="https://github.com/0xJeremy/p6"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
            <br />
            <br />
            Thanks Brandon.
            <br />
            <br />
            Made with ❤️ by Jeremy Kanovsky & Ben London
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.box}>
          <Button
            className={classes.blue}
            classes={{ outlined: classes.outline_blue }}
            variant="outlined"
            onClick={handleClose}
          >
            Done!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
