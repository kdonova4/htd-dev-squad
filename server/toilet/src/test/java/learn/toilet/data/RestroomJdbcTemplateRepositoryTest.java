package learn.toilet.data;

import learn.toilet.models.Restroom;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class RestroomJdbcTemplateRepositoryTest {

    @Autowired
    RestroomJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindRestrooms() {
        List<Restroom> restrooms = repository.findAll();
        assertNotNull(restrooms);
        assertTrue(restrooms.size() > 0);
    }

    @Test
    void shouldFindById() {
        Restroom acme = repository.findById(1);
        assertEquals("ACME", acme.getName());
    }

    @Test
    void shouldAddRestroom() {
        Restroom restroom = new Restroom();
        restroom.setName("Downtown Public Restroom");
        restroom.setAddress("123 Main St, Downtown");
        restroom.setLongitude(-123.4567);
        restroom.setLatitude(48.1234);
        restroom.setDirections("Located near the main entrance of the downtown park.");
        restroom.setDescription("A clean public restroom with wheelchair access and baby changing stations.");
        Restroom actual = repository.add(restroom);
        assertNotNull(actual);
        assertEquals(4, actual.getRestroomId());
    }

    @Test
    void shouldUpdateRestroom() {

        Restroom restroom = new Restroom();
        restroom.setRestroomId(3);
        restroom.setName("Downtown Public Restroom");
        restroom.setAddress("123 Main St, Downtown");
        restroom.setLongitude(-123.4567);
        restroom.setLatitude(48.1234);
        restroom.setDirections("Located near the main entrance of the downtown park.");
        restroom.setDescription("A clean public restroom with wheelchair access and baby changing stations.");

        assertTrue(repository.update(restroom));
    }

    @Test
    void shouldDeleteRestroom() {
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(2));
    }
}