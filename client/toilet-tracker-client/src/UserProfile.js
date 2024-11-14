import { jwtDecode } from "jwt-decode";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";

function UserProfile() {
    
    const token = localStorage.getItem("token");
    let decodedToken;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    const username = decodedToken.sub;
    
    return (<>
        <Container fluid>
            <Row>
                <Col md={6} className="p-4">
                    <h2>Profile</h2>
                    
                </Col>
                <Col md={6} className="p-4">
                    
                </Col>
            </Row>
            <Link className="btn btn-outline-success mb-4" to={`/reviews/${restroomId}/new`}>Add a Review</Link>
            <ReviewPage type="restroom" restroomId={restroomId} />
        </Container>
    </>)
}

export default UserProfile;