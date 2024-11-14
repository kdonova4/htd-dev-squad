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

}



function ReviewForm() {
    // STATE
    const token = localStorage.getItem("token");
    console.log("TOKEN", token);
    let decodedToken;
    if (token) {
      decodedToken = jwtDecode(token);
      console.log("decodedtoken", decodedToken.appUserId);
      //   userId = decodedToken.userId || decodedToken.sub; // adjust based on your JWT structure
      // access sub property to find user by username as sub property has username which was used to create jwt token
  
    }
    
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState(false);
    const url = 'http://localhost:8080/api/review'
    const navigate = useNavigate();
    const { restroomId, reviewId } = useParams();
    const [review, setReview] = useState(REVIEW_DEFAULT);

    useEffect(() =>{
        if(reviewId) {
            fetch(`${url}/${reviewId}`)
            .then(response => {
                if(response.status === 200) {
                    return response.json();
                }else {
                    return Promise.reject(`Unexpected Status code: ${response.status}`);
                }
            })
            .then(data => {
                setReview(data)
            })
            .catch(console.log)
        }else{
            setReview(REVIEW_DEFAULT);
        }
    }, [reviewId]);


    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess(false);
        if(reviewId) {
            updateReview();
        }else {
            addReview();
        }
    }

    const handleChange = (event) => {
        const newReview = {...review};
        newReview[event.target.name] = event.target.value
        console.log(newReview[event.target.name])

        setReview(newReview);
        console.log(review);
    }

    // adding review
    const addReview = () => {

        const token = localStorage.getItem('token');

        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...review,
                restroomId: 1,
                userId: parseInt(decodedToken.appUserId)
            })
        }
        fetch(url, init)
        .then(response => {
            if(response.status === 201 || response.status === 400) {
                return response.json()
            }else {
                return Promise.reject(`Unexpected Status Code: ${response.status}`);
            }
        })
        .then(data =>{
            if(data.reviewId) {
                navigate('/')
            }else {
                setErrors(data)
            }
        })
    }

    // updating review
    const updateReview = () => {

        review.reviewId = reviewId;
        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        }
        fetch(`${url}/${reviewId}`, init)
        .then(response =>{
            if(response.status === 204){
                return null;
            }else if(response.status === 400){
                return response.json();
            }else {
                return Promise.reject(`Unexxpected Status Code ${response.status}`);
            }
        })
        .then(data =>{
            if(!data) {
                navigate('/')
                setSuccess(true);
            }else {
                // get error messages and display them
                setErrors(data);
            }
        })
        .catch(console.log)
    }


    return(<>
            <Container fluid>
            <Row>
                <Col md={6} className="p-4">
                    <h2>{reviewId > 0 ? 'Update Review' : 'Add Review'}</h2>
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
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
    </>)
}

export default ReviewForm;



{/* <section>
                <h2 className="mb-4">{reviewId > 0 ? 'Update Review' : 'Add Review'}</h2>
                    {errors.length > 0 && (
                        <div className="alert alert-danger">
                            <p>The following errors were found</p>
                            <ul>
                                {errors.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <fieldset className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <input 
                            id="rating"
                            name="rating"
                            type="number"
                            className="form-control"
                            value={review.rating}
                            onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <label htmlFor="reviewText">Review Text</label>
                            <input 
                            id="reviewText"
                            name="reviewText"
                            type="textarea"
                            className="form-control"
                            value={review.reviewText}
                            onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <label htmlFor="used">Date Used</label>
                            <input 
                            id="used"
                            name="used"
                            type="date"
                            className="form-control"
                            value={review.used}
                            onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <button type="submit" className="btn btn-outline-success mr-4">{reviewId > 0 ? 'Update Review' : 'Add Review'}</button>
                            <Link type="button" className="btn btn-outline-danger mr-4" to={'/'}>Cancel</Link>
                        </fieldset>
                    </form>
            </section> */}