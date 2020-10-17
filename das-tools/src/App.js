import React from 'react';
import './App.css';
import Header from "./components/Header/index"
import Footer from "./components/Footer/index"
import TriageForm from "./components/MainContent/TriageTool/TriageTool"
import Grid from '@material-ui/core/Grid';



function App() {
  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={12}><Header/></Grid> 
        <Grid item xs={12}><TriageForm/></Grid>
      
      {/* <Footer/> */}
      </Grid>
    </div>
  );
}

export default App;
