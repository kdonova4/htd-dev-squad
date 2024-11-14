import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import About from "./About";
import Login from "./Login";
import Register from "./Register";
import RestroomForm from "./RestroomForm";
import NavBar from "./NavBar";
import AmenityForm from "./AmenityForm";
import AmenityList from "./AmenityList";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { Container } from "react-bootstrap";
import HomePage from "./Home";
import RestroomList from "./RestroomList";
import { jwtDecode } from "jwt-decode";

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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/review/new" element={<ReviewForm />} />
            <Route path="/restrooms/new" element={<RestroomForm />} />
            <Route path="/restrooms" element={<RestroomList />} />
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
