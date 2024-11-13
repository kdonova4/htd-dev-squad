import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const REVIEW_DATA = [

{
    reviewId: 1,
    rating: 1,
    reviewText: 'oijsoignoinrg',
    timeStamp: '2024-05-05 22:34:38',
    used: '2020-9-20'

},

{
    reviewId: 2,
    rating: 1,
    reviewText: 'oijsoignoinrg',
    timeStamp: '2024-05-05 22:34:38',
    used: '2020-9-20'

},
{
    reviewId: 3,
    rating: 1,
    reviewText: 'oijsoignoinrg',
    timeStamp: '2024-05-05 22:34:38',
    used: '2020-9-20'

},
{
    reviewId: 4,
    rating: 1,
    reviewText: 'oijsoignoinrg',
    timeStamp: '2024-05-05 22:34:38',
    used: '2020-9-20'

}

]

function ReviewList() {

    const[reviews, setReviews] = useState(REVIEW_DATA);
    const url = 'http://localhost:8080/api/review'

    useEffect(() => {

        fetch(url)
        .then(response => {
            if(response.status === 200) {
                return response.json();
            }else {
                return Promise.reject(`Unexpected Status Code: ${response.status}`);
            }
        })
        .then(data => setReviews(data))
        .catch(console.log)
    }, [])


    //Methods

    //delete
    const handleDeleteReview = (reviewId) => {
        const review = review.find(r => r.reviewId === reviewId);
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
                    <Link className="btn btn-outline-success mb-4" to={'/review/add'}>Add a Review</Link>
                    
                    {reviews.map(review => (
                    <div className="media-body pb-3 mb-0 small 1h-125 border-bottom border-gray">
                        <h5><span className="review-rating">{review.rating}</span></h5>
                        <p>{review.used}</p>
                        <p>
                            <strong className="d-block text-gray-dark">{review.reviewText}</strong>
                        </p>
                    </div>
                    ))}

                </section>
    </>)
}

export default ReviewList;


{/* <li class="mb-4">
            <div class="card p-3 shadow-sm">
                <h5 class="card-title">Review by Jane Smith</h5>
                <p class="card-subtitle text-muted">Date: 2024-11-02</p>
                <p class="card-text mt-3">"It worked as expected, but there were a few issues. Overall, a decent experience."</p>
            </div>
        </li> */}


//         <ul className="list-unstyled">
//                     {reviews.map(review => (

//                     <li key={review.reviewId} className="review-item mb-4 p-3 border rounded shadow-sm">
//                         <div>
//                             <h5>{review.rating}</h5>
//                             <p>{review.used}</p>
//                             <p>{review.reviewText}</p>
//                         </div>
//                         <Link className="btn btn-outline-warning mr-4" to={`/agent/edit/${review.reviewId}`}>Update</Link>
//                         <button className="btn btn-outline-danger" onClick={() => handleDeleteReview(review.reviewId)}>Delete</button>
//                     </li>

//                         ))}
// </ul>