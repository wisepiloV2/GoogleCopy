package com.wisepilo.googlecopy.entity;

import com.wisepilo.googlecopy.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldSaveUser() {
        User user = new User(
                "matias",
                "1123456789",
                "matias@example.com",
                "123456"
        );

        User savedUser = userRepository.save(user);

        assertNotNull(savedUser.getId());
        assertEquals("matias", savedUser.getUsername());
        assertEquals("1123456789", savedUser.getPhone());
        assertEquals("matias@example.com", savedUser.getEmail());
    }

    @Test
    void shouldFindUserByEmail() {
        User user = new User(
                "lucas",
                "1134567890",
                "lucas@example.com",
                "password"
        );

        userRepository.save(user);

        Optional<User> foundUser = userRepository.findByEmail("lucas@example.com");

        assertTrue(foundUser.isPresent(), "El usuario debería existir en la base de datos");
        assertEquals("lucas", foundUser.get().getUsername());
    }

    @Test
    void shouldThrowErrorWhenEmailIsNotUnique() {
        User user1 = new User(
                "carlos",
                "1145678901",
                "correo_unico@example.com",
                "pass1"
        );

        userRepository.save(user1);

        User user2 = new User(
                "pedro",
                "1156789012",
                "correo_unico@example.com",
                "pass2"
        );

        assertThrows(
                DataIntegrityViolationException.class,
                () -> {
                    userRepository.save(user2);
                    userRepository.flush();
                },
                "Debería lanzar error porque el email ya está registrado"
        );
    }

    @Test
    void shouldThrowErrorWhenUsernameIsNull() {
        User invalidUser = new User(
                null,
                "1167890123",
                "valido@example.com",
                "pass123"
        );

        assertThrows(
                DataIntegrityViolationException.class,
                () -> {
                    userRepository.save(invalidUser);
                    userRepository.flush();
                },
                "Debería lanzar error porque el username no puede ser nulo"
        );
    }

    @Test
    void shouldThrowErrorWhenPhoneIsNotUnique() {
        User user1 = new User(
                "carlos",
                "1123456789",
                "carlos@example.com",
                "pass1"
        );

        userRepository.save(user1);

        User user2 = new User(
                "pedro",
                "1123456789",
                "pedro@example.com",
                "pass2"
        );

        assertThrows(
                DataIntegrityViolationException.class,
                () -> {
                    userRepository.save(user2);
                    userRepository.flush();
                },
                "Debería lanzar error porque el teléfono ya está registrado"
        );
    }

    @Test
    void shouldThrowErrorWhenPhoneIsNull() {
        User invalidUser = new User(
                "matias",
                null,
                "matias@example.com",
                "pass123"
        );

        assertThrows(
                DataIntegrityViolationException.class,
                () -> {
                    userRepository.save(invalidUser);
                    userRepository.flush();
                },
                "Debería lanzar error porque el teléfono no puede ser nulo"
        );
    }
}