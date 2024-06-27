import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import List from './components/List';
import Detail from './components/Detail';
import './styles/app.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/list" element={<List />} />
          <Route path="/detail/:name" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

