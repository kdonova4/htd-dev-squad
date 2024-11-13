import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import { useNavigate } from 'react-router-dom';
import { useRestrooms } from './RestroomContext';

const LocationSearchForm = () => {
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const { updateRestrooms } = useRestrooms();

    const handleAddressChange = (event) => setAddress(event.target.value);

    const handleLocationFetch = (latitude, longitude) => {
        fetch(`http://localhost:8080/api/restroom/search?latitude=${latitude}&longitude=${longitude}`)
            .then((response) => response.json())
            .then((data) => {
                updateRestrooms(data);
                navigate('/restrooms');
            })
            .catch((error) => {
                alert('Error fetching restrooms data');
                console.error(error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const geocoder = L.Control.Geocoder.nominatim();
        geocoder.geocode(address, (results) => {
            if (results && results.length > 0) {
                const { lat, lng } = results[0].center;
                handleLocationFetch(lat, lng);
            } else {
                alert('Geocoding failed. Please try again with a different address.');
            }
        });
    };

    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => handleLocationFetch(latitude, longitude),
                () => alert('Unable to retrieve your location')
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAddress">
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter an address"
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
    );
};

export default LocationSearchForm;
