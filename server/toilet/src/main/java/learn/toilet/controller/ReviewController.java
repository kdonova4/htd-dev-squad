package learn.toilet.controller;


import learn.toilet.domain.Result;
import learn.toilet.domain.ReviewService;
import learn.toilet.models.AppUser;
import learn.toilet.models.Review;
import learn.toilet.security.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/review")
public class ReviewController {

    private final AppUserService appUserService;
    private final ReviewService service;

    public ReviewController(AppUserService appUserService, ReviewService service) {
        this.appUserService = appUserService;
        this.service = service;
    }

    @GetMapping("/current")
    public List<Review> findByUserId() {
        // Get the authenticated username from the JWT token
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = (String) authentication.getPrincipal();
        AppUser user = (AppUser) appUserService.loadUserByUsername(username);

        // Get user id from AppUser
        int authenticatedUserId = user.getAppUserId();

        return service.findByUserId(authenticatedUserId);
    }

    @GetMapping("/{restroomId}")
    public List<Review> findByRestroomId(@PathVariable int restroomId) {
        return service.findByRestroomId(restroomId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Review review) {
        // Get the authenticated username from the JWT token
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = (String) authentication.getPrincipal();
        AppUser user = (AppUser) appUserService.loadUserByUsername(username);

        // Get user id from AppUser
        int authenticatedUserId = user.getAppUserId();

        // Ensure that the restroom's userId matches the authenticated user's userId
        if (review.getUserId() != authenticatedUserId) {
            return new ResponseEntity<>("You are not authorized to create a review entry for another user.", HttpStatus.FORBIDDEN);
        }
        Result<Review> result = service.add(review);
        if(result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }

        return ErrorResponse.build(result);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Object> update(@PathVariable int reviewId, @RequestBody Review review) {
        // Get the authenticated username from the JWT token
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = (String) authentication.getPrincipal();
        AppUser user = (AppUser) appUserService.loadUserByUsername(username);

        // Get user id from AppUser
        int authenticatedUserId = user.getAppUserId();

        // Ensure that the restroom's userId matches the authenticated user's userId
        if (review.getUserId() != authenticatedUserId) {
            return new ResponseEntity<>("You are not authorized to create a restroom entry for another user.", HttpStatus.FORBIDDEN);
        }
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
        // Get the authenticated username from the JWT token
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = (String) authentication.getPrincipal();
        AppUser user = (AppUser) appUserService.loadUserByUsername(username);

        // Get user id from AppUser
        int authenticatedUserId = user.getAppUserId();

        Review review = service.findById(authenticatedUserId);

        // Ensure that the restroom's userId matches the authenticated user's userId
        if (review.getUserId() != authenticatedUserId) {
            return new ResponseEntity<>("You are not authorized to create a restroom entry for another user.", HttpStatus.FORBIDDEN);
        }
        if(service.deleteById(reviewId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
