package learn.toilet.domain;

import learn.toilet.data.RestroomAmenityRepository;
import learn.toilet.data.RestroomRepository;
import learn.toilet.models.Restroom;
import learn.toilet.models.RestroomAmenity;
import org.springframework.stereotype.Service;

import java.util.List;

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
            result.addMessage("agent not added", ResultType.INVALID);
        }

        return result;
    }

    public boolean deleteAmenityByKey(int restroomId, int agentId) {
        return restroomAmenityRepository.deleteByKey(restroomId, agentId);
    }

    private Result<Restroom> validate(Restroom restroom) {
        Result<Restroom> result = new Result<>();
        if (restroom == null) {
            result.addMessage("restroom cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(restroom.getShortName())) {
            result.addMessage("shortName is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(restroom.getLongName())) {
            result.addMessage("longName is required", ResultType.INVALID);
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
            result.addMessage("agent cannot be null", ResultType.INVALID);
        }

        if (restroomAmenity.getSecurityClearance() == null) {
            result.addMessage("securityClearance cannot be null", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(restroomAmenity.getIdentifier())) {
            result.addMessage("identifier is required", ResultType.INVALID);
        }

        if (restroomAmenity.getActivationDate() == null) {
            result.addMessage("activationDate is required", ResultType.INVALID);
        }

        return result;
    }
}
