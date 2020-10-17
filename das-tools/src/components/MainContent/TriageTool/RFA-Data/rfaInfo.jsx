import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



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

{/* RFA INFORMATION INPUT FIELDS */}
      <div>
        <TextField
          label="Project Name"
          id="margin-none"
          className={classes.textField}
          helperText="Enter the name of the RFA"
          margin="dense"
        />
        <TextField
          label="Project Container"
          id="margin-dense"
          className={classes.textField}
          helperText="Enter the project container number"
          margin="dense"
        />
        <TextField
          label="Agent Number"
          id="margin-normal"
          className={classes.textField}
          helperText="Enter the agency number"
          margin="dense"
        />
        <TextField
          label="RFA Number"
          id="margin-normal"
          className={classes.textField}
          helperText="Enter the RFA number"
          margin="dense"
        />
      </div>

      {/* RFA NEW PROJECT OR REVISION */}

        <div>
      <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label="New Project"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
        label="Revision"
      />
      </FormGroup>
        </div>

      </Container>
    </div>
  );
}
