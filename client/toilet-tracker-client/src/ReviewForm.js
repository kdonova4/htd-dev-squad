import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";


const REVIEW_DEFAULT = {

    rating: 1,
    reviewText: '',
    timeStamp: '',
    used: ''

}



function ReviewForm() {
    // STATE

    const [review, setReview] = useState(REVIEW_DEFAULT);
    const [errors, setErrors] = useState([]);

    const url = 'http://localhost:8080/api/review'
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() =>{
        if(id) {
            fetch(`${url}/${id}`)
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
    }, [id]);


    const handleSubmit = (event) => {
        event.preventDefault();
        if(id) {
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
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
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

        review.reviewId = id;
        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        }
        fetch(`${url}/${id}`, init)
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
                
            }else {
                // get error messages and display them
                setErrors(data);
            }
        })
        .catch(console.log)
    }


    return(<>
            <section>
                <h2 className="mb-4">{id > 0 ? 'Update Review' : 'Add Review'}</h2>
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
                            <button type="submit" className="btn btn-outline-success mr-4">{id > 0 ? 'Update Review' : 'Add Review'}</button>
                            <Link type="button" className="btn btn-outline-danger mr-4" to={'/'}>Cancel</Link>
                        </fieldset>
                    </form>
            </section>
    </>)
}

export default ReviewForm;