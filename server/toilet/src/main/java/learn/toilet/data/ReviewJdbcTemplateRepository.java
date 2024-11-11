package learn.toilet.data;

import learn.toilet.data.mappers.ReviewMapper;
import learn.toilet.models.Review;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Timestamp;
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


    public Review add(Review review) {
        final String sql = "insert into review (rating, review_text, timestamp, date_used, restroom_id, user_id)"
                +" values (?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setInt(1, review.getRating());
            ps.setString(2, review.getReviewText());
            ps.setTimestamp(3, Timestamp.valueOf(review.getTimeStamp()));
            ps.setDate(4, java.sql.Date.valueOf(review.getUsed()));
            ps.setInt(5, review.getRestroomId());
            ps.setInt(6, review.getUserId());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0) {
            return null;
        }

        review.setReviewId(keyHolder.getKey().intValue());
        return review;

    }

    public boolean update(Review review) {

        final String sql = "update review set "
                + "rating = ?, "
                + "review_text = ?, "
                + "timestamp = ?,"
                + "date_used = ?,"
                + "restroom_id = ?,"
                + "user_id = ?,"
                + "where review_id = ?;";

        return jdbcTemplate.update(sql,
                review.getRating(),
                review.getReviewText(),
                review.getTimeStamp(),
                review.getUsed(),
                review.getRestroomId(),
                review.getUserId(),
                review.getReviewId()) > 0;
    }

    public boolean deleteById(int reviewId) {

        return false;
    }





}



