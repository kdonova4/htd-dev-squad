import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams, Link } from "react-router-dom";


function ReviewList({ reviewType, id }) {
    const [reviews, setReviews] = useState([]);
    const [usernames, setUsernames] = useState({});
    const { restroomId } = useParams();
    
    const url = `http://localhost:8080/api/review`;
    const token = localStorage.getItem("token");
    let decodedToken;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    

    useEffect(() => {
        let fetchUrl;
        if (reviewType === 'restroom') {
            fetchUrl = `${url}/restroom/reviews/${id}`;
        } else if (reviewType === 'user') {
            fetchUrl = `${url}/current`;
        }

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

                // Step 2: Extract userIds from the fetched reviews
                const userIds = [...new Set(data.map(review => review.userId))];

                // Step 3: Fetch usernames in bulk for each userId
                const fetchUsernames = async () => {
                    const fetchedUsernames = {};
                    for (let userId of userIds) {
                        const response = await fetch(`http://localhost:8080/api/user/${userId}`, { headers });
                        if (response.ok) {
                            const userData = await response.json();
                            fetchedUsernames[userId] = userData.username;
                        }
                    }
                    setUsernames(fetchedUsernames); // Store the fetched usernames
                };

                fetchUsernames();
            })
            .catch(console.log);
    }, [id, reviewType, token]);

    return (
        <section className="container">
            <h2 className="mb-4">Reviews</h2>

            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                reviews.map(review => (
                    <div key={review.reviewId} className="media-body pb-3 mb-0 small 1h-125 border-bottom border-gray">
                        <h5>
                            <span className="review-rating">
                                {usernames[review.userId] || "Unknown User"}  -  {review.rating}
                            </span>
                        </h5>
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
