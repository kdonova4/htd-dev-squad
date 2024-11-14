import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const REVIEW_DATA = [

{
    reviewId: 1,
    rating: 1,
    reviewText: 'This is a review',
    timeStamp: '2024-05-05 22:34:38',
    used: '2020-9-20'

},

{
    reviewId: 2,
    rating: 5,
    reviewText: 'This is a review',
    timeStamp: '2024-05-05 22:34:38',
    used: '2020-9-20'

},
{
    reviewId: 3,
    rating: 4,
    reviewText: 'This is a review',
    timeStamp: '2024-05-05 22:34:38',
    used: '2020-9-20'

},
{
    reviewId: 4,
    rating: 1,
    reviewText: 'This is a review',
    timeStamp: '2024-05-05 22:34:38',
    used: '2020-9-20'

}

]

function ReviewList({ reviewType }) {

    const[reviews, setReviews] = useState([]);
    const { id } = useParams(); // to get the dynamic part of the URL, like restroomId or userId

    const url = `http://localhost:8080/api/review`;

    useEffect(() => {
        let fetchUrl;
        if (reviewType === 'restroom') {
            fetchUrl = `${url}/${id}`;  
        } else if (reviewType === 'user') {
            fetchUrl = `${url}/current`; 
        }
        console.log(fetchUrl);
        // get token 
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


    //Methods

    //delete
    const handleDeleteReview = (reviewId) => {
        const review = reviews.find(r => r.reviewId === reviewId);
        if(window.confirm(`Delete Review?`)) {
            const init = {
                method: 'DELETE'
            }
            fetch(`${url}/${reviewId}`, init)
            .then(response => {
                if(response.status === 204){
                    const newReviews = reviews.filter(r => r.reviewId !== reviewId);

                    setReviews(newReviews);
                }else {
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .catch(console.log)
        }
    }

    return(<>
        <section className="container">
                    <h2 className="mb-4">Reviews</h2>
                    <Link className="btn btn-outline-success mb-4" to={'/review/new'}>Add a Review</Link>
                    
                    {reviews.map(review => (
                    <div key={review.reviewId} className="media-body pb-3 mb-0 small 1h-125 border-bottom border-gray">
                        <h5><span className="review-rating">{review.rating}</span></h5>
                        <p>Date Used: {review.used}</p>
                        <p>
                            <strong className="d-block text-gray-dark">{review.reviewText}</strong>
                        </p>
                        <footer>{new Date(review.timeStamp).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</footer>

                    </div>
                    ))}
                </section>
    </>)
}

export default ReviewList;


