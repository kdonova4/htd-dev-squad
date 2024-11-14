import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { Link, useParams } from "react-router-dom";
function RestroomReviews() {
    
    
    

    
    
    return(
    
        <Container fluid>
            <Row>
                <Col md={6} className="p-4">
                    <h2>Restroom</h2>
                    
                </Col>
                <Col md={6} className="p-4">

                </Col>
            </Row>
            <Link className="btn btn-outline-success mb-4" to={'/reviews/new'}>Add a Review</Link>
        </Container>
    )
}

export default RestroomReviews;