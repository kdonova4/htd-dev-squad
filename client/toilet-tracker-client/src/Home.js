import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import LocationSearchForm from './LocationSearchForm';
import { useLocation } from './context/LocationContext';

const HomePage = () => {
    const { updateLocation } = useLocation();

    const handleLocationChange = (latitude, longitude) => {
        updateLocation([latitude, longitude]); // Update map center
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: `calc(100vh - 60px)` }}>
            <Row className="justify-content-center w-100">
                <Col>
                    <div className="text-center">
                        <h1 className="m-md-4">Toilet Tracker</h1>
                        <LocationSearchForm onLocationChange={handleLocationChange} />
                    </div>
                </Col>
            </Row>
        </div>
    )
};

export default HomePage;
