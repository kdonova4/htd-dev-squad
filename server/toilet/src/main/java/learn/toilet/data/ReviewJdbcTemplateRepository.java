package learn.toilet.data;

import learn.toilet.data.mappers.ReviewMapper;
import learn.toilet.models.Review;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ReviewJdbcTemplateRepository {

    private final JdbcTemplate jdbcTemplate;


    public ReviewJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }





    public List<Review> findByUserId(int userId)
    {
        final String sql = "select review_id, rating, review_text, timestamp, date_used, restroom_id, user_id "
                + "from review"
                + "where user_id = ?;";

        return jdbcTemplate.query(sql, new ReviewMapper(), userId);
    }

    public List<Review> findByRestroomId(int restroomId)
    {
        final String sql = "select review_id, rating, review_text, timestamp, date_used, restroom_id, user_id "
                + "from review"
                + "where restroom_id = ?;";
        
        return jdbcTemplate.query(sql, new ReviewMapper(), restroomId);
    }


}
