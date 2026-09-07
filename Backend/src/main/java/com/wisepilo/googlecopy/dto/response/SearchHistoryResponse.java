package com.wisepilo.googlecopy.dto.response;

import java.time.LocalDateTime;

public class SearchHistoryResponse {

    private Long id;
    private String searchTerm;
    private LocalDateTime searchDate;

    public SearchHistoryResponse() {}

    public SearchHistoryResponse(Long id, String searchTerm, LocalDateTime searchDate) {
        this.id = id;
        this.searchTerm = searchTerm;
        this.searchDate = searchDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSearchTerm() {
        return searchTerm;
    }

    public void setSearchTerm(String searchTerm) {
        this.searchTerm = searchTerm;
    }

    public LocalDateTime getSearchDate() {
        return searchDate;
    }

    public void setSearchDate(LocalDateTime searchDate) {
        this.searchDate = searchDate;
    }
}