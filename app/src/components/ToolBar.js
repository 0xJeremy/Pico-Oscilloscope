import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { paperColor, colorOrange, colorBlue } from "./PageStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: paperColor,
    color: colorOrange,
  },
  name: {
    marginLeft: "-10px",
    fontSize: "2.2em",
  },
  button: {
    display: "flex",
    alignItems: "center",
    marginLeft: "16px",
    color: colorBlue,
  },
  outline: {
    borderColor: colorBlue,
    height: "100%",
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
}));

function ToolBar(props) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.name}>
        Raspberry Pi[co] [OSS]illoscope
      </Typography>
      <section className={classes.rightToolbar}>
        <Button
          className={classes.button}
          classes={{ outlined: classes.outline }}
          variant="outlined"
          color="primary"
          href="https://github.com/0xJeremy/p6"
          target="_blank"
        >
          Contribute
        </Button>
      </section>
    </Toolbar>
  );
}

export default ToolBar;
