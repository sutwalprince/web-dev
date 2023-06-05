import logo from './logo.svg';
import './App.css';

import Home from './components/Home';
import View from './components/View';
import Create from './components/Create';
import Edit from './components/Edit';
import {BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit/:postId" element={<Edit />} />
      <Route path="/create" element={<Create />} />
      <Route path="/view/:postId" element={<View />} />

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
