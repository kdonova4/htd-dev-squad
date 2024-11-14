import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";

const REVIEW_DEFAULT = {
    rating: 1,
    reviewText: '',
    timeStamp: '',
    used: '',
    restroomId: null,
    userId: null
};

function ReviewForm() {
    const token = localStorage.getItem("token");
    let decodedToken;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState(false);
    const url = 'http://localhost:8080/api/review';
    const navigate = useNavigate();
    const { restroomId, reviewId } = useParams(); // Extract restroomId and reviewId from the URL
    const [review, setReview] = useState(REVIEW_DEFAULT);

    // Fetch the review data for editing
    useEffect(() => {
        if (reviewId) {
            // Fetch existing review details by reviewId
            fetch(`${url}/${reviewId}`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return Promise.reject(`Unexpected Status code: ${response.status}`);
                    }
                })
                .then(data => {
                    setReview(data); // Fill the form with the existing review data
                })
                .catch(console.log);
        } else if (restroomId) {
            // Set restroomId and userId for a new review
            setReview(prevReview => ({
                ...prevReview,
                restroomId: parseInt(restroomId),
                userId: parseInt(decodedToken.appUserId)
            }));
        }
    }, [reviewId, restroomId, decodedToken?.appUserId]); // Re-run effect when these params change

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess(false);
        if (reviewId) {
            updateReview();  // Update review if reviewId is present
        } else {
            addReview();     // Add a new review if reviewId is absent
        }
    };

    const handleChange = (event) => {
        const newReview = { ...review };
        newReview[event.target.name] = event.target.value;
        setReview(newReview);
    };

    // Add a new review
    const addReview = () => {
        review.userId = parseInt(decodedToken.appUserId); // Ensure the userId is set from token
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ...review,
                userId: parseInt(decodedToken.appUserId)
            }),
        };
        fetch(url, init)
            .then(response => {
                if (response.status === 201 || response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .then(data => {
                if (data.reviewId) {
                    navigate('/');
                } else {
                    setErrors(data);
                }
            })
            .catch(console.log);
    };

    // Update an existing review
    const updateReview = () => {
        review.reviewId = reviewId;
        review.userId = parseInt(decodedToken.appUserId); // Ensure the userId is set from token
        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ...review,
                restroomId: parseInt(restroomId), // Include restroomId when updating
                userId: parseInt(decodedToken.appUserId)
            }),
        };
        fetch(`${url}/${restroomId}/${reviewId}`, init)
            .then(response => {
                if (response.status === 204) {
                    return null;
                } else if (response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected Status Code ${response.status}`);
                }
            })
            .then(data => {
                if (!data) {
                    navigate('/');
                    setSuccess(true);
                } else {
                    setErrors(data);
                }
            })
            .catch(console.log);
    };

    return (
        <Container fluid>
            <Row>
                <Col md={6} className="p-4">
                    <h2>{reviewId ? 'Update Review' : 'Add Review'}</h2>
                    {success && <Alert variant="success">Review added successfully!</Alert>}
                    {errors && <Alert variant="danger">{errors}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                name="rating"
                                value={review.rating}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="directions">
                            <Form.Label>Review Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="reviewText"
                                value={review.reviewText}
                                onChange={handleChange}
                                rows={3}
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Date Used</Form.Label>
                            <Form.Control
                                type="date"
                                name="used"
                                value={review.used}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="submit" className="mt-3">
                            <Button variant="primary" type="submit" className="mr-2">
                                Submit
                            </Button>
                            <Link type="button" className="btn btn-outline-danger" to={'/'}>Cancel</Link>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ReviewForm;
