package learn.toilet.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public class Review {

    private int reviewId;
    private int rating;
    private String reviewText;
    private LocalDateTime timeStamp;
    private LocalDate used;
    private int restroomId;

    public Review() {
        
    }

    public Review(int reviewId, int rating, String reviewText, LocalDateTime timeStamp, LocalDate used, int restroomId, int userId) {
        this.reviewId = reviewId;
        this.rating = rating;
        this.reviewText = reviewText;
        this.timeStamp = timeStamp;
        this.used = used;
        this.restroomId = restroomId;
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getRestroomId() {
        return restroomId;
    }

    public void setRestroomId(int restroomId) {
        this.restroomId = restroomId;
    }

    private int userId;

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public LocalDate getUsed() {
        return used;
    }

    public void setUsed(LocalDate used) {
        this.used = used;
    }



}