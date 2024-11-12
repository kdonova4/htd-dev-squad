package learn.toilet.controller;

import learn.toilet.domain.RestroomService;
import learn.toilet.domain.Result;
import learn.toilet.models.Restroom;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/restroom")
public class RestroomController {

    private final RestroomService restroomService;

    public RestroomController(RestroomService restroomService) {
        this.restroomService = restroomService;
    }

    @GetMapping
    public List<Restroom> findAll() {
        return restroomService.findAll();
    }

    @GetMapping("/{restroomId}")
    public ResponseEntity<Restroom> findById(@PathVariable int restroomId) {
        Restroom restroom = restroomService.findById(restroomId);
        if (restroom == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(restroom);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Restroom restroom) {
        Result<Restroom> result = restroomService.add(restroom);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{restroomId}")
    public ResponseEntity<Object> update(@PathVariable int restroomId, @RequestBody Restroom restroom) {
        if (restroomId != restroom.getRestroomId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Restroom> result = restroomService.update(restroom);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{restroomId}")
    public ResponseEntity<Void> deleteById(@PathVariable int restroomId) {
        Result<Restroom> result = restroomService.deleteById(restroomId);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
