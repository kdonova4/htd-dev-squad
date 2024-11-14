import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import About from "./About";
import Login from "./Login";
import Register from "./Register";
import RestroomForm from "./RestroomForm";
import NavBar from "./NavBar";
import AmenityForm from "./AmenityForm";
import AmenityList from "./AmenityList";
import ReviewPage from "./ReviewPage";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { Container } from "react-bootstrap";
import HomePage from "./Home";
import RestroomList from "./RestroomList";
import { jwtDecode } from "jwt-decode";
import RestroomReviews from "./RestroomReviews";
import UserProfile from "./UserProfile";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  // Get the token from localStorage (or wherever it is stored)
  const token = localStorage.getItem("token");

  // Decode the token if it exists
  let role = null;
  let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.authorities; // Assuming the authorities are stored under "authorities"
      isAuthenticated = true; // If token exists, the user is authenticated
      console.log(role);
    } catch (e) {
      console.error("Invalid token", e);
    }
  }
  return (
    <>
      <Router>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route
              path="/register"
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<HomePage />} />
            <Route path="/reviews/:restroomId/new" element={<ReviewForm />} />
            <Route
              path="/reviews/:restroomId/:reviewId"
              element={<ReviewForm />}
            />
            <Route path="/current" element={<ReviewPage type="user" />} />
            <Route
              path="/restroom/reviews/:restroomId"
              element={<ReviewPage type="restroom" />}
            />
            <Route path="/restrooms/new" element={<RestroomForm />} />
            <Route path="/restrooms" element={<RestroomList />} />
            <Route path="/restroom/:restroomId" element={<RestroomReviews />} />
            <Route path="/profile" element={<UserProfile type="user" />} />
            <Route
              path="/restrooms/edit/:restroomId"
              element={<RestroomForm />}
            />
            <Route path="/amenities" element={<AmenityList />} />
            <Route
              path="/amenity/new"
              element={
                isAuthenticated && role && role.includes("ROLE_ADMIN") ? (
                  <AmenityForm />
                ) : (
                  <Navigate to="/login" /> // Redirect to login if not authorized for now
                )
              }
            />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
