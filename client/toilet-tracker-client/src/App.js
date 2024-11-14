import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import RestroomForm from "./RestroomForm";
import NavBar from "./NavBar";
import ReviewPage from "./ReviewPage";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { Container } from "react-bootstrap";
import HomePage from "./Home";
import RestroomList from "./RestroomList";
import RestroomReviews from "./RestroomReviews";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage/>}/>
            <Route path="/reviews/new/" element={<ReviewForm/>}/>
            <Route path="/reviews/edit/:reviewId" element={<ReviewForm/>}/>
            <Route path="/current" element={<ReviewPage type="user" />} />
            <Route path="/restroom/:id" element={<ReviewPage type="restroom" />} />
            <Route path="/current" element={<ReviewPage/>} />
            <Route path="/restrooms/new" element={<RestroomForm />} />
            <Route path="/restrooms" element={<RestroomList />} />
            <Route path="/restroom" element={<RestroomReviews />} />
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
