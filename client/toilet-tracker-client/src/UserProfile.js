import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams, Link} from "react-router-dom";
import ReviewPage from "./ReviewPage";
import { useRestrooms } from "./context/RestroomContext";

function UserProfile() {
    const [restrooms, setRestrooms] = useState([]);
    const [reviews, setReviews] = useState([]);
    const url = 'http://localhost:8080/api/restroom';
    const reviewUrl = `http://localhost:8080/api/review`;
    const token = localStorage.getItem("token");
    let decodedToken;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    useEffect(() => {
        let fetchUrl;

        fetchUrl = `${url}/current`; // Fetch restrooms by userId

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        fetch(fetchUrl, { headers })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .then(data => {
                console.log(data)
                setRestrooms(data); // Set the retrieved restrooms in state
            })
            .catch(console.log);
    }, [decodedToken]);

    useEffect(() => {
        let fetchUrl;

        fetchUrl = `${reviewUrl}/current`;


        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        fetch(fetchUrl, { headers })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .then(data => {
                setReviews(data);

                const userIds = [...new Set(data.map(review => review.userId))];


            })
            .catch(console.log);
    }, [token])

    const username = decodedToken.sub;


    const handleDeleteRestroom = (restroomId) => {

    }

    return (<>
        <Container fluid>
    <Row>
        <Col md={6} className="p-4">
            <h2>{username}'s Profile</h2>
            <ReviewPage reviews={reviews} />
        </Col>
        <Col md={6} className="p-4">
            <Row className="justify-content-center w-100 mb-4">
                <Col>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <h2>Restrooms</h2>
                    </div>
                </Col>
            </Row>
            <section id="listContainer">
                {restrooms.length === 0 ? (
                    <p>No restrooms found.</p>
                ) : (
                    restrooms.map(restroom => (
                        <div key={restroom.restroomId} className="media-body pb-3 mb-0 small 1h-125 border-bottom border-gray" style={{ position: 'relative' }}>
                            <h5>
                                {restroom.name}
                            </h5>
                            <p>
                                <strong className="d-block text-gray-dark">{restroom.description}</strong>
                            </p>

                            {restroom.userId === decodedToken.appUserId && (
                                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                    <Link className="btn btn-primary" to={`/restrooms/edit/${restroom.restroomId}`}>Update</Link>
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
    </>)
}

export default UserProfile;
