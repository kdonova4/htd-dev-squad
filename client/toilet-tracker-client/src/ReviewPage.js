import React from "react";
import { useParams } from "react-router-dom";
import ReviewList from "./ReviewList";

function ReviewPage() {
    const { id, type } = useParams(); // assuming `type` could be either "restroom" or "user"

    return (
        <div>
            <h1>Reviews</h1>
            {/* Pass the reviewType prop based on the route or context */}
            <ReviewList reviewType={type} />
        </div>
    );
}

export default ReviewPage;