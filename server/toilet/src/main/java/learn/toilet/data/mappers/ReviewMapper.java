package learn.toilet.data.mappers;

import learn.toilet.models.Review;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewMapper implements RowMapper<Review> {


    @Override
    public Review mapRow(ResultSet resultSet, int i) throws SQLException {
        Review review = new Review();
        review.setReviewId(resultSet.getInt("review_id"));
        review.setReviewText(resultSet.getString("review_text"));
        review.setTimeStamp(resultSet.getTimestamp("timestamp").toLocalDateTime());
        review.setUsed(resultSet.getDate("date_used"));
        review.setRestroomId(resultSet.getInt("restroom_id"));
        review.setUserId(resultSet.getInt("user_id"));
        return review;

    }
}
