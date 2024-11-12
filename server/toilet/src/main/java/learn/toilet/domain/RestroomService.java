package learn.toilet.domain;

import learn.toilet.data.RestroomAmenityRepository;
import learn.toilet.data.RestroomRepository;
import learn.toilet.models.Restroom;
import learn.toilet.models.RestroomAmenity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestroomService {

    private final RestroomRepository restroomRepository;
    private final RestroomAmenityRepository restroomAmenityRepository;

    public RestroomService(RestroomRepository restroomRepository, RestroomAmenityRepository restroomAmenityRepository) {
        this.restroomRepository = restroomRepository;
        this.restroomAmenityRepository = restroomAmenityRepository;
    }

    public List<Restroom> findAll() {
        return restroomRepository.findAll();
    }

    public List<Restroom> findByLocation(double latitude, double longitude) {
        double radiusInMiles = 5.0;

        return restroomRepository.findAll().stream()
                .filter(restroom -> calculateDistance(latitude, longitude, restroom.getLatitude(), restroom.getLongitude()) <= radiusInMiles)
                .collect(Collectors.toList());
    }

    // Haversine formula to calculate the distance in miles between two lat/long points
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int EARTH_RADIUS_MILES = 3959;

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS_MILES * c;
    }

    public Restroom findById(int restroomId) {
        return restroomRepository.findById(restroomId);
    }

    public Result<Restroom> add(Restroom restroom) {
        Result<Restroom> result = validate(restroom);
        if (!result.isSuccess()) {
            return result;
        }

        if (restroom.getRestroomId() != 0) {
            result.addMessage("restroomId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        restroom = restroomRepository.add(restroom);
        result.setPayload(restroom);
        return result;
    }

    public Result<Restroom> update(Restroom restroom) {
        Result<Restroom> result = validate(restroom);
        if (!result.isSuccess()) {
            return result;
        }

        if (restroom.getRestroomId() <= 0) {
            result.addMessage("restroomId must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!restroomRepository.update(restroom)) {
            String msg = String.format("restroomId: %s, not found", restroom.getRestroomId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int restroomId) {
        return restroomRepository.deleteById(restroomId);
    }

    public Result<Void> addAmenity(RestroomAmenity restroomAmenity) {
        Result<Void> result = validate(restroomAmenity);
        if (!result.isSuccess()) {
            return result;
        }

        if (!restroomAmenityRepository.add(restroomAmenity)) {
            result.addMessage("amenity not added", ResultType.INVALID);
        }

        return result;
    }

    public boolean deleteAmenityByKey(int restroomId, int amenityId) {
        return restroomAmenityRepository.deleteByKey(restroomId, amenityId);
    }

    private Result<Restroom> validate(Restroom restroom) {
        Result<Restroom> result = new Result<>();
        if (restroom == null) {
            result.addMessage("restroom cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(restroom.getName())) {
            result.addMessage("name is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(restroom.getAddress())) {
            result.addMessage("address is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(restroom.getDescription())) {
            result.addMessage("description is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(restroom.getDirections())) {
            result.addMessage("directions are required", ResultType.INVALID);
        }

        if (restroom.getLatitude() < -90 || restroom.getLatitude() > 90) {
            result.addMessage("latitude must be between -90 and 90 degrees", ResultType.INVALID);
        }

        if (restroom.getLongitude() < -180 || restroom.getLongitude() > 180) {
            result.addMessage("longitude must be between -90 and 90 degrees", ResultType.INVALID);
        }


        return result;
    }

    private Result<Void> validate(RestroomAmenity restroomAmenity) {
        Result<Void> result = new Result<>();
        if (restroomAmenity == null) {
            result.addMessage("restroomAmenity cannot be null", ResultType.INVALID);
            return result;
        }

        if (restroomAmenity.getAmenity() == null) {
            result.addMessage("amenity cannot be null", ResultType.INVALID);
        }

        return result;
    }
}
