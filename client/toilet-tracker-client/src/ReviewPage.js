import React from "react";
import { useParams } from "react-router-dom";
import ReviewList from "./ReviewList";

function ReviewPage({ type }) {
    // This will receive the dynamic `id` from the URL for restroom reviews
    const { id } = useParams(); 

    return (
        <div>
            <h1>Reviews</h1>
            <ReviewList reviewType={type} id={id} />
        </div>
    );
}

export default ReviewPage;