package learn.toilet.data;

import learn.toilet.models.Restroom;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RestroomRepository {
    List<Restroom> findAll();

    @Transactional
    Restroom findById(int restroomId);

    Restroom add(Restroom restroom);

    boolean update(Restroom restroom);

    @Transactional
    boolean deleteById(int restroomId);
}
