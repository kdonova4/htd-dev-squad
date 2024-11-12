package learn.toilet.controller;

import learn.toilet.domain.RestroomService;
import learn.toilet.domain.Result;
import learn.toilet.models.RestroomAmenity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/restroom/amenity")
public class RestroomAmenityController {

    private final RestroomService service;

    public RestroomAmenityController(RestroomService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody RestroomAmenity restroomAmenity) {
        Result<Void> result = service.addAmenity(restroomAmenity);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{restroomId}/{amenityId}")
    public ResponseEntity<Void> deleteByKey(@PathVariable int restroomId, @PathVariable int amenityId) {
        if (service.deleteAmenityByKey(restroomId, amenityId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
