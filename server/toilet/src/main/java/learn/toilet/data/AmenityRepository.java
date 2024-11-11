package learn.toilet.data;

import learn.toilet.models.Amenity;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AmenityRepository {

    List<Amenity> amenities();

    Amenity findById(int amenityId);

    Amenity add(Amenity amenity);

    boolean update(Amenity amenity);

    @Transactional
    boolean deleteById(int amenityId);
}
