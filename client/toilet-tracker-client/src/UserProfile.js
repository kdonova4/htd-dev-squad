import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReviewPage from "./ReviewPage";

const API_BASE_URL = 'http://localhost:8080/api';

function UserProfile() {
    const [restrooms, setRestrooms] = useState([]);
    const [reviews, setReviews] = useState([]);
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;

    const username = decodedToken?.sub;

    const fetchData = useCallback(async (endpoint, setter) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}/current`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Unexpected Status Code: ${response.status}`);
            }

            const data = await response.json();
            setter(data);
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    useEffect(() => {
        fetchData('restroom', setRestrooms);
        fetchData('review', setReviews);
    }, [fetchData]);

    const handleDeleteRestroom = (restroomId) => {
        if (window.confirm(`Delete Restroom?`)) {
            const token = localStorage.getItem("token");
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const init = {
                method: 'DELETE',
                headers: headers,
            };

            fetch(`${API_BASE_URL}/restroom/${restroomId}`, init)
                .then(response => {
                    if (response.status === 204) {

                        const newRestrooms = restrooms.filter(r => r.restroomId !== restroomId);

                        setRestrooms(newRestrooms);
                    } else {
                        return Promise.reject(`Unexpected Status Code ${response.status}`);
                    }
                })
                .catch(console.log);
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col md={6} className="p-4">
                    <h2>{username}'s Profile</h2>
                    <ReviewPage reviews={reviews} />
                </Col>
                <Col md={6} className="p-4">
                    <div className="text-center mb-4">
                        <h2>Restrooms</h2>
                    </div>
                    <section id="listContainer">
                        {restrooms.length === 0 ? (
                            <p>No restrooms found.</p>
                        ) : (
                            restrooms.map(restroom => (
                                <div key={restroom.restroomId} className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" style={{ position: 'relative' }}>
                                    <h5>{restroom.name}</h5>
                                    <p>
                                        <strong className="d-block text-gray-dark">{restroom.description}</strong>
                                    </p>
                                    {restroom.userId === decodedToken.appUserId && (
                                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                            <Link className="btn btn-primary me-2" to={`/restrooms/edit/${restroom.restroomId}`}>Update</Link>
                                            <button className="btn btn-danger" onClick={() => handleDeleteRestroom(restroom.restroomId)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </section>
                </Col>
            </Row>
        </Container>
    );
}

export default UserProfile;
