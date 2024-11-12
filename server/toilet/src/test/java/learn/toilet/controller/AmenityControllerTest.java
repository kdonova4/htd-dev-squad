package learn.toilet.controller;

import learn.toilet.data.AmenityRepository;
import learn.toilet.data.AppUserRepository;
import learn.toilet.models.AppUser;
import learn.toilet.security.JwtConverter;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;

@SpringBootTest
public class AmenityControllerTest {

    @MockBean
    AmenityRepository amenityRepository;

    @MockBean
    AppUserRepository appUserRepository;

    @Autowired
    MockMvc mvc;

    @Autowired
    JwtConverter jwtConverter;

    String token;

    @BeforeEach
    void setup() {
        AppUser appUser = new AppUser(1, "johndoe@gmailcom", "P@sswOrd!", false,
                List.of("ADMIN"));

        when(appUserRepository.findByUsername("johndoe@gmail.com")).thenReturn(appUser);
    }
}
