import React from 'react';
import { Row, Col } from 'react-bootstrap';
import LocationSearchForm from './LocationSearchForm';

const HomePage = () => (
    <div className="d-flex align-items-center justify-content-center" style={{ height: `calc(100vh - 60px)` }}>
        <Row className="justify-content-center w-100">
            <Col>
                <div className="text-center">
                    <h1 className="m-md-4">Toilet Tracker</h1>
                    <LocationSearchForm />
                </div>
            </Col>
        </Row>
    </div>
);

export default HomePage;
