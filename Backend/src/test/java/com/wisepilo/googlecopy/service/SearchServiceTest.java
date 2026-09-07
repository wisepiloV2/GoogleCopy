package com.wisepilo.googlecopy.service;

import com.wisepilo.googlecopy.dto.response.SearchHistoryResponse;
import com.wisepilo.googlecopy.entity.CustomUserDetails;
import com.wisepilo.googlecopy.entity.SearchHistory;
import com.wisepilo.googlecopy.entity.User;
import com.wisepilo.googlecopy.repository.SearchHistoryRepository;
import com.wisepilo.googlecopy.service.exception.UnauthorizedUserException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SearchServiceTest {

    @Mock
    private SearchHistoryRepository historyRepository;

    @InjectMocks
    private SearchService searchService;

    private User dummyUser;
    private CustomUserDetails dummyUserDetails;

    @BeforeEach
    void setUp() {
        dummyUser = new User("wisepilo", "123", "wisepilo@test.com", "pass");
        dummyUserDetails = new CustomUserDetails(dummyUser);
    }

    // ==========================================
    // TESTS DE PERFORM SEARCH
    // ==========================================

    @Test
    void performSearch_WhenUserIsAuthenticated_ShouldSaveHistory() {
        Authentication mockAuth = mock(Authentication.class);
        when(mockAuth.getPrincipal()).thenReturn(dummyUserDetails);
        when(historyRepository.findBySearchTermAndUser(anyString(), any(User.class))).thenReturn(Optional.empty());

        searchService.performSearch("Java", mockAuth);

        verify(historyRepository, times(1)).save(any(SearchHistory.class));
    }

    @Test
    void performSearch_WhenUserIsAnonymousOrNull_ShouldNotSaveHistory() {
        searchService.performSearch("Java", null);

        verify(historyRepository, never()).save(any());
    }

    @Test
    void performSearch_WhenTermAlreadyExists_ShouldUpdateDateInsteadOfCreatingNew() {
        Authentication mockAuth = mock(Authentication.class);
        when(mockAuth.getPrincipal()).thenReturn(dummyUserDetails);

        SearchHistory existingHistory = new SearchHistory();
        existingHistory.setSearchTerm("Java");

        when(historyRepository.findBySearchTermAndUser(anyString(), any(User.class)))
                .thenReturn(Optional.of(existingHistory));

        searchService.performSearch("Java", mockAuth);

        verify(historyRepository, times(1)).save(existingHistory);
    }

    // ==========================================
    // TESTS DE EXCEPCIONES Y OBTENCIÓN DE DATOS
    // ==========================================

    @Test
    void getRecentHistory_WhenUserIsNull_ShouldThrowUnauthorizedUserException() {
        assertThrows(UnauthorizedUserException.class, () -> searchService.getRecentHistory(null));
    }

    @Test
    void getRecentHistory_WhenUserIsAuthenticated_ShouldReturnList() {
        Authentication mockAuth = mock(Authentication.class);
        when(mockAuth.getPrincipal()).thenReturn(dummyUserDetails);

        SearchHistory history = new SearchHistory();
        history.setId(1L);
        history.setSearchTerm("Spring");
        history.setSearchDate(LocalDateTime.now());
        history.setUser(dummyUser);

        when(historyRepository.findTop10ByUserOrderBySearchDateDesc(dummyUser)).thenReturn(List.of(history));

        List<SearchHistoryResponse> responses = searchService.getRecentHistory(mockAuth);

        assertEquals(1, responses.size());
        assertEquals("Spring", responses.get(0).getSearchTerm());
    }

    @Test
    void deleteAllHistory_WhenUserIsAuthenticated_ShouldCallDelete() {
        Authentication mockAuth = mock(Authentication.class);
        when(mockAuth.getPrincipal()).thenReturn(dummyUserDetails);

        searchService.deleteAllHistory(mockAuth);

        verify(historyRepository, times(1)).deleteByUser(dummyUser);
    }
}