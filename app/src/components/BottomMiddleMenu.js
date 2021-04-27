import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { paperColor, paddingSize, colorOrange } from "./PageStyles";

const useStyles = makeStyles({
  paper: {
    marginRight: paddingSize,
    textAlign: "center",
    color: colorOrange,
    fontSize: "40px",
    backgroundColor: paperColor,
    minHeight: "32vh",
  },
});

export default function BottomMiddleMenu(props) {
  const classes = useStyles();

  return <Paper className={classes.paper}>What goes here???</Paper>;
}
