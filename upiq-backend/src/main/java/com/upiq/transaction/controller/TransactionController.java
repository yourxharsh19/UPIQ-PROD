package com.upiq.transaction.controller;

import com.upiq.auth.model.User;
import com.upiq.config.ApiResponse;
import com.upiq.transaction.dto.CreateTransactionRequest;
import com.upiq.transaction.dto.TransactionResponse;
import com.upiq.transaction.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

        private final TransactionService service;

        // ------------------- ADD TRANSACTION -------------------
        @PostMapping
        public ResponseEntity<ApiResponse<TransactionResponse>> add(
                        @Valid @RequestBody CreateTransactionRequest request,
                        @AuthenticationPrincipal User user) {
                TransactionResponse transaction = service.addTransaction(request, user.getId());
                ApiResponse<TransactionResponse> response = ApiResponse.<TransactionResponse>builder()
                                .success(true)
                                .data(transaction)
                                .message("Transaction created successfully")
                                .build();
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

        // ------------------- GET ALL USER TRANSACTIONS -------------------
        @GetMapping
        public ResponseEntity<ApiResponse<List<TransactionResponse>>> getUserTransactions(
                        @AuthenticationPrincipal User user) {
                List<TransactionResponse> transactions = service.getUserTransactions(user.getId());
                ApiResponse<List<TransactionResponse>> response = ApiResponse.<List<TransactionResponse>>builder()
                                .success(true)
                                .data(transactions)
                                .message("Transactions retrieved successfully")
                                .build();
                return ResponseEntity.ok(response);
        }

        // ------------------- GET USER TRANSACTIONS BY CATEGORY -------------------
        @GetMapping("/category/{category}")
        public ResponseEntity<ApiResponse<List<TransactionResponse>>> getByCategory(
                        @AuthenticationPrincipal User user,
                        @PathVariable String category) {
                List<TransactionResponse> transactions = service.getUserTransactionsByCategory(user.getId(), category);
                ApiResponse<List<TransactionResponse>> response = ApiResponse.<List<TransactionResponse>>builder()
                                .success(true)
                                .data(transactions)
                                .message("Transactions retrieved successfully")
                                .build();
                return ResponseEntity.ok(response);
        }

        // ------------------- GET TRANSACTION BY ID -------------------
        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<TransactionResponse>> getById(@PathVariable Long id,
                        @AuthenticationPrincipal User user) {
                TransactionResponse transaction = service.getById(id, user.getId());
                ApiResponse<TransactionResponse> response = ApiResponse.<TransactionResponse>builder()
                                .success(true)
                                .data(transaction)
                                .message("Transaction retrieved successfully")
                                .build();
                return ResponseEntity.ok(response);
        }

        // ------------------- DELETE TRANSACTION -------------------
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteTransaction(@PathVariable Long id, @AuthenticationPrincipal User user) {
                service.deleteTransaction(id, user.getId());
                return ResponseEntity.noContent().build();
        }

        // ------------------- UPDATE TRANSACTION -------------------
        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<TransactionResponse>> updateTransaction(
                        @PathVariable Long id,
                        @Valid @RequestBody CreateTransactionRequest request,
                        @AuthenticationPrincipal User user) {
                TransactionResponse updated = service.updateTransaction(id, request, user.getId());
                ApiResponse<TransactionResponse> response = ApiResponse.<TransactionResponse>builder()
                                .success(true)
                                .data(updated)
                                .message("Transaction updated successfully")
                                .build();
                return ResponseEntity.ok(response);
        }

        // ------------------- DELETE ALL TRANSACTIONS -------------------
        @DeleteMapping
        public ResponseEntity<ApiResponse<String>> deleteAllTransactions(@AuthenticationPrincipal User user) {
                service.deleteAllTransactions(user.getId());
                ApiResponse<String> response = ApiResponse.<String>builder()
                                .success(true)
                                .data(null)
                                .message("All transactions deleted successfully")
                                .build();
                return ResponseEntity.ok(response);
        }
}
