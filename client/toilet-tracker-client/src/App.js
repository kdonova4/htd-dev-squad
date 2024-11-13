import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import RestroomForm from "./RestroomForm"
import NavBar from "./NavBar";

import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" element={<ReviewList/>}/>
            <Route path="/review/new" element={<ReviewForm/>}/>
            <Route path="/restrooms/new" element={<RestroomForm />} />
            <Route path="/restrooms/edit/:restroomId" element={<RestroomForm />} />
          </Routes>
        </Container>

      </Router>
    </>
  );
}

export default App;
