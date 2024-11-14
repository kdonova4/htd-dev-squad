import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate, useParams, Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { jwtDecode } from "jwt-decode";
import AddressSearch from "./AddressSearch.js"; // Import the AddressSearch component

// Marker icon configuration for compatibility with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const RESTROOM_DEFAULT = {
  name: "",
  latitude: "",
  longitude: "",
  address: "",
  directions: "",
  description: "",
  userId: "",
  amenities: [],
};

const RestroomForm = () => {
  const [restroom, setRestroom] = useState(RESTROOM_DEFAULT);

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState("");
  const [position, setPosition] = useState([0, 0]);
  const [manualEntry, setManualEntry] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const navigate = useNavigate();
  const { restroomId } = useParams();
  const url = "http://localhost:8080/api/restroom";
  const amenitiesUrl = "http://localhost:8080/api/amenity";

  useEffect(() => {
    fetch(amenitiesUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected Status Code: ${response.status}`);
        }
      })
      .then((data) => {
        setAmenities(data); // Assuming data is an array of amenities with id and name
      })
      .catch(console.log);

    if (restroomId) {
      fetch(`${url}/${restroomId}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected Status Code: ${response.status}`);
          }
        })
        .then((data) => {
          setRestroom(data);
        })
        .catch(console.log);
    } else {
      setRestroom(RESTROOM_DEFAULT);
    }
  }, [restroomId]);

  const handleManualEntryToggle = () => {
    setManualEntry(!manualEntry);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestroom((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "latitude" || name === "longitude") {
      const lat = parseFloat(name === "latitude" ? value : restroom.latitude);
      const lng = parseFloat(name === "longitude" ? value : restroom.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        setPosition([lat, lng]);
      }
    }
  };

  const handleAddressSelect = ({ latitude, longitude, address }) => {
    setRestroom((prev) => ({
      ...prev,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      address,
    }));
    setPosition([latitude, longitude]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);
    setErrors("");
    if (restroomId) {
      // checks to see if there is an restroomId in the url
      updateRestroom();
    } else {
      addRestroom();
    }
  };

  const addRestroom = async () => {
    const token = localStorage.getItem("token");
    console.log("TOKEN", token);
    console.log(restroom);
    let decodedToken;
    if (token) {
      decodedToken = jwtDecode(token);
      console.log("decodedtoken", decodedToken.appUserId);
      //   userId = decodedToken.userId || decodedToken.sub; // adjust based on your JWT structure
      // access sub property to find user by username as sub property has username which was used to create jwt token
    }
    try {
      const init = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...restroom,
          latitude: parseFloat(restroom.latitude),
          longitude: parseFloat(restroom.longitude),
          userId: parseInt(decodedToken.appUserId),
        }),
      };
      const response = fetch(url, init);
      if (response.status === 201) {
        setSuccess(true);
        setRestroom({
          name: "",
          latitude: "",
          longitude: "",
          address: "",
          directions: "",
          description: "",
          userId: decodedToken.appUserId,
        });
      }
    } catch (err) {
      setErrors("Failed to add restroom. Please try again.");
    }
  };

  const updateRestroom = () => {
    restroom.restroomId = restroomId;
    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...restroom,
        latitude: parseFloat(restroom.latitude),
        longitude: parseFloat(restroom.longitude),
        userId: parseInt(restroom.userId),
      }),
    };
    fetch(`${url}/${restroomId}`, init)
      .then((response) => {
        if (response.status === 204) {
          return null;
        } else if (response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected Status Code ${response.status}`);
        }
      })
      .then((data) => {
        if (!data) {
          // happy path
          navigate("/");
        } else {
          //unhappy
          // get our errors messages and diplay them
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setRestroom((prev) => {
      const amenities = checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((amenity) => amenity !== value);
      return { ...prev, amenities };
    });
  };

  // Custom component to update map center
  const MapView = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position[0] && position[1]) {
        map.setView(position, map.getZoom());
      }
    }, [position, map]);
    return null;
  };

  return (
    <Container fluid>
      <Row>
        <Col md={6} className="p-4">
          <h2>Add Restroom</h2>
          {success && (
            <Alert variant="success">Restroom added successfully!</Alert>
          )}
          {errors && <Alert variant="danger">{errors}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={restroom.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="directions">
              <Form.Label>Directions</Form.Label>
              <Form.Control
                as="textarea"
                name="directions"
                value={restroom.directions}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={restroom.description}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>
            <Form.Group controlId="amenities">
              <Form.Label>Amenities</Form.Label>
              {amenities.map((amenity) => (
                <Form.Check
                  key={amenity.id}
                  type="checkbox"
                  label={amenity.name}
                  value={amenity.id}
                  checked={restroom.amenities.includes(amenity.id)}
                  onChange={handleAmenityChange}
                />
              ))}
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
        </Col>
        <Col md={6} className="p-4">
          <h2>Location Preview</h2>
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <MapView position={position} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <AddressSearch onAddressSelect={handleAddressSelect} />
            {position[0] && position[1] && (
              <Marker position={position}>
                <Popup>
                  {restroom.name || "Restroom"} <br /> {restroom.address}
                </Popup>
              </Marker>
            )}
          </MapContainer>
          <Form.Group controlId="manualEntry">
            <Form.Check
              type="checkbox"
              label="Enter location manually"
              checked={manualEntry}
              onChange={handleManualEntryToggle}
            />
          </Form.Group>
          {manualEntry && (
            <>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={restroom.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="latitude">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  name="latitude"
                  value={restroom.latitude}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="longitude">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  name="longitude"
                  value={restroom.longitude}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RestroomForm;
