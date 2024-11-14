import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ReviewList({ reviewType, id }) {
    const [reviews, setReviews] = useState([]);
    const url = `http://localhost:8080/api/review`;

    useEffect(() => {
        let fetchUrl;

        if (reviewType === 'restroom') {
            // Fetch reviews for a specific restroom
            fetchUrl = `${url}/restroom/${id}`;
        } else if (reviewType === 'user') {
            // Fetch reviews for the current logged-in user
            fetchUrl = `${url}/current`;
        }

        const token = localStorage.getItem('token');
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
            })
            .catch(console.log);
    }, [id, reviewType]);

    return (
        <section className="container">
            <h2 className="mb-4">Reviews</h2>
            <Link className="btn btn-outline-success mb-4" to={'/reviews/new'}>Add a Review</Link>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                reviews.map(review => (
                    <div key={review.reviewId} className="media-body pb-3 mb-0 small 1h-125 border-bottom border-gray">
                        <h5><span className="review-rating">{review.rating}</span></h5>
                        <p>Date Used: {review.used}</p>
                        <p>
                            <strong className="d-block text-gray-dark">{review.reviewText}</strong>
                        </p>
                        <footer>{new Date(review.timeStamp).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</footer>
                    </div>
                ))
            )}
        </section>
    );
}

export default ReviewList;
