package learn.toilet.domain;

import learn.toilet.data.RestroomRepository;
import learn.toilet.models.Restroom;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class RestroomServiceTest {

    @Autowired
    RestroomService service;

    @MockBean
    RestroomRepository restroomRepository;

    @Test
    void shouldAdd() {
        Restroom restroom = new Restroom(0, "TEST", 0.0, 0.0, "TEST", "TEST", "TEST", 1);
        Restroom mockOut = new Restroom(2, "TEST", 0.0, 0.0, "TEST", "TEST", "TEST", 1);

        when(restroomRepository.add(restroom)).thenReturn(mockOut);

        Result<Restroom> actual = service.add(restroom);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddWhenInvalid() {

        Restroom restroom = new Restroom(35, "TEST", 0.0, 0.0, "TEST", "TEST", "TEST", 1);

        Result<Restroom> actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setRestroomId(0);
        restroom.setName(null);
        actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setName("");
        actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setName("TEST");
        restroom.setAddress(null);
        actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setAddress("");
        actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setAddress("TEST");
        restroom.setDescription(null);
        actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setDescription("");
        actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setDescription("TEST");
        restroom.setDirections(null);
        actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setDirections("");
        actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setDirections("TEST");
        restroom.setLatitude(-91);
        actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setLatitude(91);
        actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setLatitude(0);
        restroom.setLongitude(-181);
        actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setLongitude(181);
        actual = service.add(restroom);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        Restroom restroom = new Restroom(1, "TEST", 0.0, 0.0, "TEST", "TEST", "TEST", 1);
        when(restroomRepository.update(restroom)).thenReturn(true);
        Result<Restroom> actual = service.update(restroom);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateMissing() {
        Restroom restroom = new Restroom(35, "TEST", 0.0, 0.0, "TEST", "TEST", "TEST", 1);
        when(restroomRepository.update(restroom)).thenReturn(true);
        Result<Restroom> actual = service.update(restroom);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Restroom restroom = new Restroom(1, "TEST", 0.0, 0.0, "TEST", "TEST", "TEST", 1);

        restroom.setName(null);
        Result<Restroom> actual = service.update(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setName("");
        actual = service.update(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setName("TEST");
        restroom.setAddress(null);
        actual = service.update(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setAddress("");
        actual = service.update(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setAddress("TEST");
        restroom.setDescription(null);
        actual = service.update(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setDescription("");
        actual = service.update(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setDescription("TEST");
        restroom.setDirections(null);
        actual = service.update(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setDirections("");
        actual = service.update(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setDirections("TEST");
        restroom.setLatitude(-91);
        actual = service.update(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setLatitude(91);
        actual = service.update(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setLatitude(0);
        restroom.setLongitude(-181);
        actual = service.update(restroom);
        assertEquals(ResultType.INVALID, actual.getType());

        restroom.setLongitude(181);
        actual = service.update(restroom);
        assertEquals(ResultType.INVALID, actual.getType());
    }

}