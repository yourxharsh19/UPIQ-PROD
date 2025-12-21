package com.upiq.category.service;

import com.upiq.category.dto.CategoryResponse;
import com.upiq.category.dto.CreateCategoryRequest;

import java.util.List;

public interface CategoryService {

    CategoryResponse createCategory(CreateCategoryRequest request, Long userId);

    CategoryResponse getCategoryById(Long id, Long userId);

    List<CategoryResponse> getAllCategories(Long userId);

    List<CategoryResponse> getCategoriesByType(Long userId, String type);

    CategoryResponse updateCategory(Long id, CreateCategoryRequest request, Long userId);

    void deleteCategory(Long id, Long userId);
}

