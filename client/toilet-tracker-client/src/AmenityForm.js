import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AmenityForm() {
  const [amenityName, setAmenityName] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState("");

  const amenitiesUrl = "http://localhost:8080/api/amenity/admin";

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);
    setErrors("");
    // Handle the form submission logic here
    const token = localStorage.getItem("token");
    console.log("TOKEN", token);
    let decodedToken;
    if (token) {
      decodedToken = jwtDecode(token);
    }
    try {
      const init = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amenityName: amenityName,
        }),
      };
      const response = fetch(amenitiesUrl, init);

      if (response.status === 201) {
        setSuccess(true);
        setAmenityName("");
      }
    } catch (err) {
      setErrors("Failed to add amenity. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { value } = e.target; // Get value instead of name
    setAmenityName(value); // Update the state with the value of the input
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Amenity Name</Form.Label> {/* Update the label text */}
          <Form.Control
            type="text"
            name="name"
            value={amenityName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="submit" className="mt-3">
          <Button variant="primary" type="submit" className="mr-2">
            Submit
          </Button>
          <Link type="button" className="btn btn-outline-danger" to={"/"}>
            Cancel
          </Link>
        </Form.Group>
      </Form>
    </>
  );
}

export default AmenityForm;
