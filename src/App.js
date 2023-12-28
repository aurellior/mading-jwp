import "./App.css";
import { Button, Card } from "semantic-ui-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import HomeAdmin from "./pages/HomeAdmin";
import Add from "./pages/Add";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail";
import DetailAdmin from "./pages/DetailAdmin";
import Laporan from "./pages/Laporan";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homeadmin" element={<HomeAdmin />} />
          <Route path="/add" element={<Add />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/detailadmin/:id" element={<DetailAdmin />} />
          <Route path="/update/:id" element={<Add />} />
          <Route path="/login" element={<Login />} />
          <Route path="/laporan" element={<Laporan />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
