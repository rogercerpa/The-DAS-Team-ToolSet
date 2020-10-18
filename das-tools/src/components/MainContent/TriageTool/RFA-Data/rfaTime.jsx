import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  // textField: {
  //   marginLeft: theme.spacing(10),
  //   marginRight: theme.spacing(10),
  //   width: 230,
  // },
}));

export default function DateAndTimePickers() {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <TextField
        id="datetime-local"
        label="BRD"
        type="datetime-local"
        defaultValue="2022-12-25T08:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
            <TextField
        id="datetime-local"
        label="ECD"
        type="datetime-local"
        defaultValue="2022-12-25T08:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
  );
}
