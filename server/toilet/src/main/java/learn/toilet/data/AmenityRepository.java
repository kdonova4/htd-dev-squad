package learn.toilet.data;

import learn.toilet.models.Amenity;

public interface AmenityRepository {
    Amenity findById(int amenityId);

    Amenity add(Amenity amenity);

}
