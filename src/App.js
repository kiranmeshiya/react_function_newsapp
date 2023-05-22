import './App.css';
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './component/NavBar';
import News from './component/News';
import { Routes, Route } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [progress, setProgress] = useState(0)
  return (
    <div className="App">
      <NavBar/>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
      />
      <Routes>
        <Route exact path="/business" element={ <News setProgress={setProgress}  key='business' pageSize={8} country='in' category='business'/> } />    
        <Route exact path="/entertainment" element={ <News setProgress={setProgress}  key='entertainment' pageSize={8} country='in' category='entertainment'/> } />    
        <Route exact path="/" element={ <News setProgress={setProgress}  key='general' pageSize={10} country='in' category='general'/> } />    
        <Route exact path="/health" element={ <News setProgress={setProgress}  key='health' pageSize={8} country='in' category='health'/> } />    
        <Route exact path="/science" element={ <News setProgress={setProgress}  key='science' pageSize={8} country='in' category='science'/> } />    
        <Route exact path="/sports" element={ <News setProgress={setProgress}  key='sports' pageSize={8} country='in' category='sports'/> } />   
        <Route exact path="/technology" element={ <News setProgress={setProgress}  key='technology' pageSize={8} country='in' category='technology'/> } />    
      </Routes>


    </div>
  );
}

export default App;
