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
import UserProfile from "./UserProfile";

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
            <Route path="/reviews/:restroomId/new" element={<ReviewForm />} />
            <Route path="/reviews/:restroomId/:reviewId" element={<ReviewForm />} />
            <Route path="/current" element={<ReviewPage type="user" />} />
            <Route path="/restroom/reviews/:restroomId" element={<ReviewPage type="restroom" />} />
            <Route path="/restrooms/new" element={<RestroomForm />} />
            <Route path="/restrooms" element={<RestroomList />} />
            <Route path="/restroom/:restroomId" element={<RestroomReviews />} />
            <Route path="/profile" element={<UserProfile type="user" />} />
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
