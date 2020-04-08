import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import DataContextProvider from "./context/DataContext";
import Login from "./components/Login";
import AuthContextProvider from "./context/AuthContext";
import Admin from "./components/Admin";
function App() {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
          </div>
        </BrowserRouter>
      </DataContextProvider>
    </AuthContextProvider>
  );
}

export default App;
