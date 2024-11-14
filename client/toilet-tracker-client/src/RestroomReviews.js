import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewPage from "./ReviewPage";

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

function RestroomReviews() {
    const { restroomId } = useParams();
    const [restroom, setRestroom] = useState(RESTROOM_DEFAULT);

    useEffect(() => {
        const fetchRestroom = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/restroom/${restroomId}`);
                if (response.ok) {
                    const data = await response.json();
                    setRestroom(data);
                } else {
                    console.error("Error fetching restroom data");
                }
            } catch (error) {
                console.error("Error fetching restroom:", error);
            }
        };
        fetchRestroom();
    }, [restroomId]);

    return (
        <Container fluid>
            <Row>
                <Col md={6} className="p-4">
                    <h2>Restroom Details</h2>
                    <div><strong>Name:</strong> {restroom.name}</div>
                    <div><strong>Address:</strong> {restroom.address}</div>
                    <div><strong>Description:</strong> {restroom.description}</div>
                    <div><strong>Directions:</strong> {restroom.directions}</div>
                    <div><strong>Amenities:</strong> {restroom.amenities.map(amenity => amenity.name).join(", ")}</div>
                </Col>
                <Col md={6} className="p-4">

                </Col>
            </Row>
            <Link className="btn btn-outline-success mb-4" to={`/reviews/${restroomId}/new`}>Add a Review</Link>
            <ReviewPage type="restroom" restroomId={restroomId} />
        </Container>
    );
}

export default RestroomReviews;
