import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import RFATYPE from "./RFA-Data/rfaType";
import RFATIME from "./RFA-Data/rfaTime"
import RFAINFO from "./RFA-Data/rfaInfo"


const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    margin: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function TriageForm() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.root}>
        <Button variant="contained" color="primary" size="large" className={classes.root}>Paste </Button>
        <Button variant="contained" color="secondary" size="large" className={classes.root}>Reset</Button>
        </div>

{/* RFA GENERAL INFO */}
    <div>
    <RFAINFO/>
    </div>

{/* RFA TYPE INFO */}
      <div>
        <RFATYPE/>
      </div>

{/* RFA ECD AND BRD */}

      <div>
        <RFATIME/>
      </div>

{/* FOLDER CREATION SAVING LOCATION */}

      <div>
        <TextField
          id="outlined-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          label="None"
          id="outlined-margin-none"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          variant="outlined"
        />
        <TextField
          label="Dense"
          id="outlined-margin-dense"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="dense"
          variant="outlined"
        />
        <TextField
          label="Normal"
          id="outlined-margin-normal"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="normal"
          variant="outlined"
        />
      </div>
      <div className={classes.root}>
        <Button variant="contained" color="primary" size="large" className={classes.root}>Create</Button>
        <Button variant="contained" color="secondary" size="large" className={classes.root}>Reset</Button>
        </div>
      </Container>
    </div>
  );
}
