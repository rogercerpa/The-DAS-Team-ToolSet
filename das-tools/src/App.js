import React from 'react';
import './App.css';
import MainHeader from "./components/MainHeader/MainHeader"
import TriageHeader from "./components/MainContent/TriageTool/TriageHeader/TriageHeader"
import Grid from '@material-ui/core/Grid';




function App() {
  return (
    
      <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={12}><MainHeader/></Grid>
        <Grid item xs={12}><TriageHeader/></Grid>
      </Grid>
      </div>
    
  );
}

export default App;
