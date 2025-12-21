package com.upiq.category.controller;

import com.upiq.auth.model.User;
import com.upiq.config.ApiResponse;
import com.upiq.category.dto.CategoryResponse;
import com.upiq.category.dto.CreateCategoryRequest;
import com.upiq.category.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

        private final CategoryService categoryService;

        // CREATE CATEGORY
        @PostMapping
        public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(
                        @Valid @RequestBody CreateCategoryRequest request,
                        @AuthenticationPrincipal User user) {
                CategoryResponse category = categoryService.createCategory(request, user.getId());
                ApiResponse<CategoryResponse> response = ApiResponse.<CategoryResponse>builder()
                                .success(true)
                                .data(category)
                                .message("Category created successfully")
                                .build();
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

        // GET ALL CATEGORIES FOR USER
        @GetMapping
        public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories(
                        @AuthenticationPrincipal User user) {
                List<CategoryResponse> categories = categoryService.getAllCategories(user.getId());
                ApiResponse<List<CategoryResponse>> response = ApiResponse.<List<CategoryResponse>>builder()
                                .success(true)
                                .data(categories)
                                .message("Categories retrieved successfully")
                                .build();
                return ResponseEntity.ok(response);
        }

        // GET CATEGORIES BY TYPE (income or expense)
        @GetMapping("/type/{type}")
        public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategoriesByType(
                        @PathVariable String type,
                        @AuthenticationPrincipal User user) {
                List<CategoryResponse> categories = categoryService.getCategoriesByType(user.getId(), type);
                ApiResponse<List<CategoryResponse>> response = ApiResponse.<List<CategoryResponse>>builder()
                                .success(true)
                                .data(categories)
                                .message("Categories retrieved successfully")
                                .build();
                return ResponseEntity.ok(response);
        }

        // GET CATEGORY BY ID
        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryById(
                        @PathVariable Long id,
                        @AuthenticationPrincipal User user) {
                CategoryResponse category = categoryService.getCategoryById(id, user.getId());
                ApiResponse<CategoryResponse> response = ApiResponse.<CategoryResponse>builder()
                                .success(true)
                                .data(category)
                                .message("Category retrieved successfully")
                                .build();
                return ResponseEntity.ok(response);
        }

        // UPDATE CATEGORY
        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(
                        @PathVariable Long id,
                        @Valid @RequestBody CreateCategoryRequest request,
                        @AuthenticationPrincipal User user) {
                CategoryResponse category = categoryService.updateCategory(id, request, user.getId());
                ApiResponse<CategoryResponse> response = ApiResponse.<CategoryResponse>builder()
                                .success(true)
                                .data(category)
                                .message("Category updated successfully")
                                .build();
                return ResponseEntity.ok(response);
        }

        // DELETE CATEGORY
        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<String>> deleteCategory(
                        @PathVariable Long id,
                        @AuthenticationPrincipal User user) {
                categoryService.deleteCategory(id, user.getId());
                ApiResponse<String> response = ApiResponse.<String>builder()
                                .success(true)
                                .data(null)
                                .message("Category deleted successfully")
                                .build();
                return ResponseEntity.ok(response);
        }

        // HEALTH CHECK ENDPOINT
        @GetMapping("/health")
        public ResponseEntity<ApiResponse<String>> health() {
                ApiResponse<String> response = ApiResponse.<String>builder()
                                .success(true)
                                .data("UPIQ-Category-Service is running")
                                .message("Service is healthy")
                                .build();
                return ResponseEntity.ok(response);
        }
}
