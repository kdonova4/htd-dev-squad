import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import RestroomForm from "./RestroomForm";
import NavBar from "./NavBar";

import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { Container } from "react-bootstrap";
import HomePage from "./Home";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ReviewList/>}/>
            <Route path="/review/new" element={<ReviewForm/>}/>
            <Route path="/restrooms/new" element={<RestroomForm />} />
            <Route
              path="/restrooms/edit/:restroomId"
              element={<RestroomForm />}
            />
          </Routes>
        </Container>

      </Router>
    </>
  );
}

export default App;
