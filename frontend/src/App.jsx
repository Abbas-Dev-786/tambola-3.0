import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import components
import Nav from "./components/Navbar/Navbar";
import Ticket from "./components/Ticket/Ticket";
import PrivateRoute from "./components/Navbar/PrivateComponent";
import Login from "./components/LogIn/Login";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* put Navbar on every route */}
        <Nav />

        <Routes>
          {/* routes for Private Components */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Ticket />} />
            <Route path="/logout" element={<h1>Logout component</h1>} />
          </Route>

          {/* Public Login route */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
