package com.wisepilo.googlecopy.controller;

import com.wisepilo.googlecopy.dto.response.SearchHistoryResponse;
import com.wisepilo.googlecopy.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("")
    public ResponseEntity<?> search(@RequestParam String q, Authentication authentication) {
        Object results = searchService.performSearch(q, authentication);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/history/recent")
    public ResponseEntity<List<SearchHistoryResponse>> getRecentHistory(Authentication authentication) {
        List<SearchHistoryResponse> history = searchService.getRecentHistory(authentication);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/history")
    public ResponseEntity<List<SearchHistoryResponse>> getAllHistory(Authentication authentication) {
        List<SearchHistoryResponse> history = searchService.getAllHistory(authentication);
        return ResponseEntity.ok(history);
    }

    @DeleteMapping("/history/{id}")
    public ResponseEntity<Void> deleteHistoryById(@PathVariable Long id, Authentication authentication) {
        searchService.deleteHistoryById(id, authentication);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/history/all")
    public ResponseEntity<Void> deleteAllHistory(Authentication authentication) {
        searchService.deleteAllHistory(authentication);
        return ResponseEntity.noContent().build();
    }
}