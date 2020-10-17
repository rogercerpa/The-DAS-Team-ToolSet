import React from 'react';
import './App.css';
import Header from "./components/Header/index"
import Footer from "./components/Footer/index"
import TriageForm from "./components/MainContent/TriageTool/index"

function App() {
  return (
    <div className="App">
      <Header/>
      <TriageForm/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
