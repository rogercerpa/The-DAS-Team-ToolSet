import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [type, setType] = React.useState('');
  const [account, setAcount] = React.useState("");

  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangeAccount = (event)=>{
    setAcount(event.target.value);
  }

  return (
    <div>

{/* RFA TYPE */}

      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          RFA Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={type}
          onChange={handleChangeType}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"BOM"}>BOM (NO LAYOUT)</MenuItem>
          <MenuItem value={"BUDGET"}>BUDGET (NO LAYOUT)</MenuItem>
          <MenuItem value={"LAYOUT"}>BOM & LAYOUT</MenuItem>
          <MenuItem value={"SUBMITTAL"}>SUBMITTAL</MenuItem>
          <MenuItem value={"RELEASE"}>RELEASE</MenuItem>
          <MenuItem value={"RELOCBOM"}>RELOC BOM</MenuItem>
          <MenuItem value={"RELOCSUB"}>RELOC SUBMITTAL</MenuItem>
          <MenuItem value={"RELOCCONTROLSSUB"}>RELOC CONTROLS SUBMITTAL</MenuItem>
          <MenuItem value={"GRAPHICS"}>GRAPHICS</MenuItem>
          <MenuItem value={"ATRIUSBOM"}>ATRIUS BOM (NO LAYOUT)</MenuItem>
          <MenuItem value={"ATRIUSLAYOUT"}>ATRIUS LAYOUT</MenuItem>
          <MenuItem value={"ATRIUSSUB"}>ATRIUS SUBMITTAL</MenuItem>
        </Select>
        <FormHelperText>Select the type of Requested needed</FormHelperText>
      </FormControl>

{/* NATIONAL ACCOUNTS */}

      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          National Account
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={account}
          onChange={handleChangeAccount}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"ARBYS"}>ARBYS</MenuItem>
          <MenuItem value={"BEALLS"}>BEALLS</MenuItem>
          <MenuItem value={"CHIPOTLE"}>CHIPOTLE</MenuItem>
          <MenuItem value={"DAVE&BUSTERS"}>DAVE & BUSTERS</MenuItem>
          <MenuItem value={"DAVITA"}>DAVITA</MenuItem>
          <MenuItem value={"DRIVESHACK"}>DRIVE SHACK</MenuItem>
          <MenuItem value={"DRYBAR"}>DRY BAR</MenuItem>
          <MenuItem value={"FLOOR&DECOR"}>FLOOR & DECOR</MenuItem>
          <MenuItem value={"FMC"}>FMC</MenuItem>
          <MenuItem value={"HOMEDEPOT"}>HOME DEPOT</MenuItem>
          <MenuItem value={"INPLANTOFFICE"}>INPLANT OFFICE</MenuItem>
          <MenuItem value={"LEVIS"}>LEVIS</MenuItem>
          <MenuItem value={"LUCKY"}>LUCKY</MenuItem>
          <MenuItem value={"OFFICEDEPOT"}>OFFICE DEPOT</MenuItem>
          <MenuItem value={"POTTERY BARN"}>POTTERY BARN</MenuItem>
          <MenuItem value={"REGUS"}>REGUS</MenuItem>
          <MenuItem value={"TARGET_R"}>TARGET REMODEL</MenuItem>
          <MenuItem value={"TARGET_EN"}>TARGET EXPRESS/NEW STORES</MenuItem>
          <MenuItem value={"TDAMERITRADE"}>TD AMERITRADE</MenuItem>
          <MenuItem value={"WESTELM"}>WEST ELM</MenuItem>
        </Select>
        <FormHelperText>Select National Account</FormHelperText>
      </FormControl>

 
    </div>
  );
}