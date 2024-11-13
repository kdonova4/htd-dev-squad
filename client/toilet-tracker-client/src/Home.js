import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import L from 'leaflet'; // Import Leaflet
import 'leaflet-control-geocoder'; // Import the geocoding plugin

const HomePage = () => {
  const [address, setAddress] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [restrooms, setRestrooms] = useState([]);
  const navigate = useNavigate();  // Initialize the navigate function

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a Leaflet map instance (you don't need to render it on the page)
    const geocoder = L.Control.Geocoder.nominatim(); // Nominatim geocoding service from OpenStreetMap
    geocoder.geocode(address, (results) => {
      if (results && results.length > 0) {
        const { lat, lng } = results[0].center; // First result's coordinates
        setCurrentLocation({ latitude: lat, longitude: lng });
        alert(`Found Location: Latitude: ${lat}, Longitude: ${lng}`);

          // After getting the coordinates, make the backend request using fetch
          fetch(`http://localhost:8080/api/restroom/search?latitude=${lat}&longitude=${lng}`)
            .then((response) => response.json())  // Parse the JSON response
            .then((data) => {
              setRestrooms(data);  // Store the fetched restrooms in the state
              console.log(data);  // Log for debugging purposes

              // Navigate to the /restrooms route after fetching data
              navigate('/restrooms');  // Redirect to restrooms list page
            })
            .catch((error) => {
              alert('Error fetching restrooms data');
              console.error(error);
            });
      } else {
        alert('Geocoding failed. Please try again with a different address.');
      }
    });
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          alert(`Current Location: Latitude: ${latitude}, Longitude: ${longitude}`);

          // After getting the location, make the backend request using fetch
          fetch(`http://localhost:8080/api/restroom/search?latitude=${latitude}&longitude=${longitude}`)
            .then((response) => response.json())  // Parse the JSON response
            .then((data) => {
              setRestrooms(data);  // Store the fetched restrooms in the state
              console.log(data);  // Log for debugging purposes

              // Navigate to the /restrooms route after fetching data
              navigate('/restrooms');  // Redirect to restrooms list page
            })
            .catch((error) => {
              alert('Error fetching restrooms data');
              console.error(error);
            });
        },
        (error) => {
          alert('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: `calc(100vh - 60px)` }}>
      <Row className="justify-content-center w-100">
        <Col>
          <div className="text-center">
            <h1 className="m-md-4">Toilet Tracker</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formAddress">
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Enter a location"
                      value={address}
                      onChange={handleAddressChange}
                      required
                      className="h-100"
                    />
                  </Col>
                  <Col xs={12} md={4} className="d-flex flex-column flex-md-row mt-2 mt-md-0">
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mr-md-2 w-md-auto mb-2 mb-md-0 h-100"
                    >
                      Search
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleGetCurrentLocation}
                      className="w-100 w-md-auto h-100 text-nowrap"
                    >
                      Get Current Location
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
