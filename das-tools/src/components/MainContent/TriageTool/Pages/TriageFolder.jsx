import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import RFATYPE from "../RFA-Data/rfaType";
import RFATIME from "../RFA-Data/rfaTime"
import RFAINFO from "../RFA-Data/rfaInfo"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
 
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setAge(event.target.value);
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

{/* RFA ECD AND BRD */}

    <div>
      <RFATIME/>
    </div>


{/* RFA TYPE INFO */}
    <div>
      <RFATYPE/>
    </div>


{/* FOLDER CREATION SAVING LOCATION */}

      <div>
      <FormControl className={classes.formControl}>

        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Save Location
        </InputLabel>

        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={age}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={"LOCAL"}>LOCAL</MenuItem>
          <MenuItem value={"SERVER"}>SERVER</MenuItem>

        </Select>

        <FormHelperText>Select Location where to save the Project Folder</FormHelperText>

      </FormControl>
  
      </div>

{/* RFA FOLDER CREATION BUTTONS */}

      <div className={classes.root}>
        <Button variant="contained" color="primary" size="large" className={classes.root}>Create</Button>
        <Button variant="contained" color="secondary" size="large" className={classes.root}>Reset</Button>
      </div>

        </Container>
    </div>
  );
}
