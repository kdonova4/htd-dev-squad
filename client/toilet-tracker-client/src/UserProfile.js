import { jwtDecode } from "jwt-decode";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReviewPage from "./ReviewPage";

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
                    <h2>{username}'s Profile</h2>
                    <ReviewPage type="user" id={decodedToken?.sub} />
                </Col>
                <Col md={6} className="p-4">
                    
                </Col>
            </Row>
            
        </Container>
    </>)
}

export default UserProfile;