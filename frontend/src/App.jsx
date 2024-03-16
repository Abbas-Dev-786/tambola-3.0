import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Nav from "./components/Navbar/Navbar";
import Ticket from "./components/Ticket/Ticket";
import PrivateRoute from "./components/Navbar/PrivateComponent";
import Login from "./components/LogIn/Login";
import Notification from "./components/Notification";

import "bootstrap/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
//eslint-disable-next-line
import * as bootstrap from "bootstrap";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 0 } },
  });

  return (
    <div className="container-fluid m-0 p-0">
      <QueryClientProvider client={queryClient}>
        <Notification />
        <BrowserRouter>
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
      </QueryClientProvider>
    </div>
  );
}
