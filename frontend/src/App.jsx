import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useState } from "react";
import RefreshHandler from "./components/extras/RefreshHandler";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="max-w-screen-2xl mx-auto bg-background">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Header />
      <Outlet context={{ isAuthenticated }} />
    </div>
  );
}

export default App;
