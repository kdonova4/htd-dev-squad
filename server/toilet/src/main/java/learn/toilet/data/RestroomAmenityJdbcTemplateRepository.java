package learn.toilet.data;

import learn.toilet.models.RestroomAmenity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RestroomAmenityJdbcTemplateRepository implements RestroomAmenityRepository {

    private final JdbcTemplate jdbcTemplate;

    public RestroomAmenityJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(RestroomAmenity restroomAmenity) {

        final String sql = "insert into restroom_amenity (agency_id, agent_id)"
                + " values "
                + "(?,?);";

        return jdbcTemplate.update(sql,
                restroomAmenity.getRestroomId(),
                restroomAmenity.getAmenity().getAmenityId()) > 0;
    }

    @Override
    public boolean deleteByKey(int restroomId, int amenityId) {

        final String sql = "delete from restroom_amenity "
                + "where restroom_id = ? and amenity_id = ?;";

        return jdbcTemplate.update(sql, restroomId, amenityId) > 0;
    }
}
