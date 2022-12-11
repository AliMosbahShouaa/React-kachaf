import { Component } from 'react';
import './App.css';
import Home from './Component/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, Switch } from "react-router-dom";
import Login from './Component/Login'
import Onsors from './Component/Onsore/Onsors';
import OnsoreOne from './Component/Onsore/OnsoreOne'
import Kadeh from './Component/Kadeh/Kadeh';
import Talabat from './Component/Talabat/Talabat';
import Add from './Component/Add';
import Relation from './Component/Relation'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/onsors" element={<Onsors />} />
          <Route path="/onsore-one" element={<OnsoreOne />} />
          <Route path="/kadeh" element={<Kadeh />} />
          <Route path="/talabat" element={<Talabat />} />
          <Route path="/add-info" element={<Add />} />
          <Route path="/relation" element={<Relation />} />
        </Routes>
      </div>
    );
  }
}

export default App;
