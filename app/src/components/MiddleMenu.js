import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { rightMenuStyle } from "./PageStyles";

const useStyles = makeStyles((theme) => rightMenuStyle);

export default function MiddleMenu(props) {
  const classes = useStyles();

  return <Paper className={classes.paper}>Channel 2</Paper>;
}
