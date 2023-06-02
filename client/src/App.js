import './App.css';
import { React, useState } from "react";
import Landing from "./views/landing/Landing.jsx";
import Home from "./views/home/Home.jsx";
import Detail from "./views/detail/Detail.jsx";
import Form from "./views/form/Form.jsx";
import { Route, Routes } from "react-router-dom";

function App() {

  const [showHomePage, setshowHomePage] = useState(false);

  // Funcion para mostrar la HomePage al hacer clicc en el boton "Ingresar"
  const handleEnterClick = () => {
    setshowHomePage(true)
  };

  let content;

  if(showHomePage) {
    content = <Home />
  } else {
    content = <Landing onEnterClick={handleEnterClick} />
  }

  return (
    <div className="App" >
      <Routes>
        <Route exact path='/' element={content} />
        <Route exact path='/home' element={ <div  className="App-Home"> <Home /></div>} />
        <Route exact path='/detail/:id' element={ <div  className="App-Detail"><Detail /></div>} />
        <Route exact path='/form' element={ <div  className="App-Form"><Form /></div>} />
      </Routes>
    </div>
  );
}

export default App;
