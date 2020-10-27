import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
     
        <Grid item xs={6}>
          <Button className={classes.paper}>Triage Tool</Button>
        </Grid>
        <Grid item xs={6}>
          <Button className={classes.paper}>Start-Up Tool</Button>
        </Grid>

      </Grid>
    </div>
  );
}
