package learn.toilet.data.mappers;

import learn.toilet.models.Amenity;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AmenityMapper implements RowMapper<Amenity> {
    @Override
    public Amenity mapRow(ResultSet resultSet, int i) throws SQLException {
        Amenity amenity = new Amenity();
        amenity.setAmenityId(resultSet.getInt("amenity_id"));
        amenity.setAmenityName(resultSet.getString("amenity_name"));

        return amenity;
    }
}
