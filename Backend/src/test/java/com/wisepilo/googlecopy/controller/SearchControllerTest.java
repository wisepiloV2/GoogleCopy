package com.wisepilo.googlecopy.controller;

import com.wisepilo.googlecopy.dto.response.SearchHistoryResponse;
import com.wisepilo.googlecopy.service.SearchService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import java.time.LocalDateTime;
import java.util.List;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SearchController.class)
@AutoConfigureMockMvc(addFilters = false)
class SearchControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private SearchService searchService;

    @Test
    void search_ShouldReturn200AndResults() throws Exception {
        when(searchService.performSearch(anyString(), any())).thenReturn(List.of());

        mockMvc.perform(get("/api/search")
                        .param("q", "Spring Boot")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getRecentHistory_ShouldReturn200AndHistoryList() throws Exception {
        SearchHistoryResponse historyMock = new SearchHistoryResponse(1L, "Spring Boot", LocalDateTime.now());
        when(searchService.getRecentHistory(any())).thenReturn(List.of(historyMock));

        mockMvc.perform(get("/api/search/history/recent")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].searchTerm").value("Spring Boot"));
    }

    @Test
    void deleteHistoryById_ShouldReturn204NoContent() throws Exception {
        doNothing().when(searchService).deleteHistoryById(any(Long.class), any());

        mockMvc.perform(delete("/api/search/history/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    void deleteAllHistory_ShouldReturn204NoContent() throws Exception {
        doNothing().when(searchService).deleteAllHistory(any());

        mockMvc.perform(delete("/api/search/history/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}
