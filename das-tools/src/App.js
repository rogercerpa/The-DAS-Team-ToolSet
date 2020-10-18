import React from 'react';
import './App.css';
import Header from "./components/Header/index"
import Footer from "./components/Footer/index"
import TriageFolder from "./components/MainContent/TriageTool/Pages/TriageFolder";
import TriageTime from "./components/MainContent/TriageTool/Pages/TriageTime";
import TriageNotes from "./components/MainContent/TriageTool/Pages/TriageNotes";
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



function App() {
  return (
    <Router>
          <div className="App">
      <Grid container spacing={3}>
      <Grid item xs={12}><Header/></Grid>
        <Switch>
          <Route exact path={['/TriageTime']}>
          <Grid item xs={12}><TriageTime/></Grid> 
          </Route>
          <Route exact path={['/TriageFolder']}>
          <Grid item xs={12}><TriageFolder/></Grid>
          </Route>
          <Route exact path={['/TriageNotes']}>
          <Grid item xs={12}><TriageNotes/></Grid>
          </Route>
        </Switch>
      {/* <Footer/> */}
      </Grid>
      </div>
    </Router>

  );
}

export default App;
