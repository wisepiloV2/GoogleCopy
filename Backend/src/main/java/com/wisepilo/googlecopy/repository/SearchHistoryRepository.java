package com.wisepilo.googlecopy.repository;

import com.wisepilo.googlecopy.entity.SearchHistory;
import com.wisepilo.googlecopy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
    List<SearchHistory> findByUserOrderBySearchDateDesc(User user);
    List<SearchHistory> findTop10ByUserOrderBySearchDateDesc(User user);
    Optional<SearchHistory> findBySearchTermAndUser(String searchTerm, User user);
    void deleteByIdAndUser(Long id, User user);
    void deleteByUser(User user);
}
