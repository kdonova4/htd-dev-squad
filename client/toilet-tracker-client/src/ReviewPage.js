import React from "react";
import ReviewList from "./ReviewList";

function ReviewPage({ type, reviews }) {
    return (
        <div>
            <ReviewList reviews={reviews} />
        </div>
    );
}

export default ReviewPage;
