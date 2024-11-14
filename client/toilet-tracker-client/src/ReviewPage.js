import React from "react";
import ReviewList from "./ReviewList";

function ReviewPage({ type, restroomId }) {
    return (
        <div>
            <ReviewList reviewType={type} id={restroomId} />
        </div>
    );
}

export default ReviewPage;
