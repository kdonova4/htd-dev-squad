import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

function App() {
  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<ReviewList/>}/>
          <Route path="/review/new" element={<ReviewForm/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
