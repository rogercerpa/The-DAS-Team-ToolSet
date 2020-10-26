import React from 'react';
import './App.css';
import MainHeader from "./components/MainHeader/MainHeader"
import Grid from '@material-ui/core/Grid';
import HomePage from "./components/MainContent/HomePage/HomePage"




function App() {
  return (
    
      <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={12}><MainHeader/></Grid>
        <HomePage/>
      </Grid>
      </div>
    
  );
}

export default App;
