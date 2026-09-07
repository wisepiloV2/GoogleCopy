package com.wisepilo.googlecopy.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jpa.test.autoconfigure.TestEntityManager;
import org.hibernate.exception.ConstraintViolationException;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class SearchHistoryTest {

    @Autowired
    private TestEntityManager entityManager;

    private User dummyUser;

    @BeforeEach
    void setUp() {
        dummyUser = new User("wisepilo", "123456789", "wisepilo@test.com", "pass");

        dummyUser = entityManager.persistAndFlush(dummyUser);
    }

    // ==========================================
    // TESTS DE PERSISTENCIA CORRECTA (JPA)
    // ==========================================

    @Test
    void save_WhenValidData_ShouldPersistSuccessfully() {
        SearchHistory history = new SearchHistory(
                "Spring Boot WebMvcTest",
                LocalDateTime.now(),
                dummyUser
        );

        SearchHistory savedHistory = entityManager.persistAndFlush(history);

        assertNotNull(savedHistory.getId());
        assertEquals("Spring Boot WebMvcTest", savedHistory.getSearchTerm());
        assertEquals(dummyUser.getId(), savedHistory.getUser().getId());
    }

    // ==========================================
    // TESTS DE RESTRICCIONES (Constraints)
    // ==========================================

    @Test
    void save_WhenSearchTermIsNull_ShouldThrowException() {
        SearchHistory history = new SearchHistory();
        history.setSearchDate(LocalDateTime.now());
        history.setUser(dummyUser);

        assertThrows(ConstraintViolationException.class, () -> {
            entityManager.persistAndFlush(history);
        });
    }

    @Test
    void save_WhenSearchDateIsNull_ShouldThrowException() {
        SearchHistory history = new SearchHistory(
                "Java 21",
                null,
                dummyUser
        );

        assertThrows(ConstraintViolationException.class, () -> {
            entityManager.persistAndFlush(history);
        });
    }

    @Test
    void save_WhenUserIsNull_ShouldThrowException() {
        SearchHistory history = new SearchHistory();
        history.setSearchTerm("Clean Architecture");
        history.setSearchDate(LocalDateTime.now());

        assertThrows(ConstraintViolationException.class, () -> {
            entityManager.persistAndFlush(history);
        });
    }

    // ==========================================
    // TESTS UNITARIOS PUROS (POJO)
    // ==========================================

    @Test
    void gettersAndSetters_ShouldWorkCorrectly() {
        SearchHistory history = new SearchHistory();
        LocalDateTime now = LocalDateTime.now();

        history.setId(100L);
        history.setSearchTerm("Mockito");
        history.setSearchDate(now);
        history.setUser(dummyUser);

        assertEquals(100L, history.getId());
        assertEquals("Mockito", history.getSearchTerm());
        assertEquals(now, history.getSearchDate());
        assertNotNull(history.getUser());
    }
}