package com.upiq.transaction.repository;

import com.upiq.transaction.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserIdOrderByDateDesc(Long userId);

    List<Transaction> findByUserIdAndCategoryIgnoreCase(Long userId, String category);

    void deleteByUserId(Long userId);
}
