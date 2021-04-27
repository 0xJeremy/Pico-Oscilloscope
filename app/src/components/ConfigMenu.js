import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { paddingSize, colorOrange, paperColor } from "./PageStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginBottom: paddingSize,
    marginRight: paddingSize,
    marginTop: paddingSize,
    textAlign: "center",
    color: colorOrange,
    fontSize: "40px",
    backgroundColor: paperColor,
    minHeight: "28.6vh",
  },
}));

export default function ConfigMenu(props) {
  const classes = useStyles();
  const channelNumber = props.channelNumber;

  return <Paper className={classes.paper}>Config Menu</Paper>;
}
