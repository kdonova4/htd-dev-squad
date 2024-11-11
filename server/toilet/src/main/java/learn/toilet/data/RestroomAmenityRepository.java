package learn.toilet.data;

import learn.toilet.models.RestroomAmenity;

public interface RestroomAmenityRepository {
    boolean add(RestroomAmenity restroomAmenity);

    boolean deleteByKey(int restroomId, int amenityId);
}
