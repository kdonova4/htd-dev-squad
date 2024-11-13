import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
