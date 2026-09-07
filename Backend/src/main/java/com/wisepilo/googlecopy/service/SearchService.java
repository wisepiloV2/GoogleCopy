package com.wisepilo.googlecopy.service;

import com.wisepilo.googlecopy.dto.response.SearchHistoryResponse;
import com.wisepilo.googlecopy.entity.CustomUserDetails;
import com.wisepilo.googlecopy.entity.SearchHistory;
import com.wisepilo.googlecopy.entity.User;
import com.wisepilo.googlecopy.repository.SearchHistoryRepository;
import com.wisepilo.googlecopy.service.exception.UnauthorizedUserException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private final SearchHistoryRepository historyRepository;
    public SearchService(SearchHistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    public record SearchResult(String title, String url, String snippet) {}

    private User getAuthenticatedUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails userDetails)) {
            throw new UnauthorizedUserException("Usuario no autenticado o sesión inválida");
        }
        return userDetails.getUser();
    }

    @Transactional
    public Object performSearch(String query, Authentication authentication) {
        Object results = search(query);

        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails userDetails) {
            User user = userDetails.getUser();

            historyRepository.findBySearchTermAndUser(query, user)
                    .ifPresentOrElse(
                            existingHistory -> {
                                existingHistory.setSearchDate(LocalDateTime.now());
                                historyRepository.save(existingHistory);
                            },
                            () -> {
                                SearchHistory newHistory = new SearchHistory();
                                newHistory.setSearchTerm(query);
                                newHistory.setSearchDate(LocalDateTime.now());
                                newHistory.setUser(user);
                                historyRepository.save(newHistory);
                            }
                    );
        }

        return results;
    }

    public List<SearchHistoryResponse> getRecentHistory(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);

        return historyRepository.findTop10ByUserOrderBySearchDateDesc(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<SearchHistoryResponse> getAllHistory(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);

        return historyRepository.findByUserOrderBySearchDateDesc(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteHistoryById(Long historyId, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        historyRepository.deleteByIdAndUser(historyId, user);
    }

    @Transactional
    public void deleteAllHistory(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        historyRepository.deleteByUser(user);
    }

    private SearchHistoryResponse mapToResponse(SearchHistory history) {
        return new SearchHistoryResponse(
                history.getId(),
                history.getSearchTerm(),
                history.getSearchDate()
        );
    }

    private List<SearchResult> search(String query) {
        return List.of(
                new SearchResult(
                        "Spring Boot",
                        "https://spring.io/projects/spring-boot",
                        "Spring Boot makes it easy to create stand-alone, production-grade Spring based applications."
                ),
                new SearchResult(
                        "Spring Framework",
                        "https://spring.io/projects/spring-framework",
                        "The Spring Framework provides a comprehensive programming and configuration model for modern Java applications."
                ),
                new SearchResult(
                        "Java",
                        "https://www.java.com/",
                        "Java is a programming language and development platform used to build applications across many environments."
                ),
                new SearchResult(
                        "TypeScript",
                        "https://www.typescriptlang.org/",
                        "TypeScript is JavaScript with syntax for types and provides better tooling for large-scale applications."
                ),
                new SearchResult(
                        "MDN Web Docs",
                        "https://developer.mozilla.org/",
                        "MDN provides documentation and guides for HTML, CSS, JavaScript and other web platform technologies."
                ),
                new SearchResult(
                        "Docker",
                        "https://www.docker.com/",
                        "Docker provides tools for building, running and deploying applications using containers."
                ),
                new SearchResult(
                        "PostgreSQL",
                        "https://www.postgresql.org/",
                        "PostgreSQL is a powerful open source object-relational database system."
                ),
                new SearchResult(
                        "MySQL",
                        "https://www.mysql.com/",
                        "MySQL is an open source relational database management system widely used for web applications."
                ),
                new SearchResult(
                        "React",
                        "https://react.dev/",
                        "React is a JavaScript library for building user interfaces from reusable components."
                ),
                new SearchResult(
                        "SearXNG",
                        "https://docs.searxng.org/",
                        "SearXNG is a free internet metasearch engine that aggregates results from multiple search services."
                )
        );
    }
}