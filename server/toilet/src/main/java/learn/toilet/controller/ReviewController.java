package learn.toilet.controller;


import learn.toilet.domain.Result;
import learn.toilet.domain.ReviewService;
import learn.toilet.models.Review;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    @GetMapping("/current")
    public List<Review> findByUserId(@PathVariable int userId) {
        return service.findByUserId(userId);
    }

    @GetMapping("/{restroomId}")
    public List<Review> findByRestroomId(@PathVariable int restroomId) {
        return service.findByRestroomId(restroomId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Review review) {
        Result<Review> result = service.add(review);
        if(result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }

        return ErrorResponse.build(result);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Object> update(@PathVariable int reviewId, @RequestBody Review review) {
        if(reviewId != review.getReviewId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Review> result = service.update(review);
        if(result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Object> deleteById(@PathVariable int reviewId) {
        if(service.deleteById(reviewId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
