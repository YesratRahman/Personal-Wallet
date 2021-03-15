package com.tp.UserMoneyManager.daos.mappers;

import com.tp.UserMoneyManager.models.Category;
import com.tp.UserMoneyManager.models.Expense;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CategoryMapper implements RowMapper<Category> {
    @Override
    public Category mapRow(ResultSet resultSet, int i) throws SQLException {
        Category mappedCategory = new Category();
        mappedCategory.setCategory(resultSet.getString("category"));
        mappedCategory.setTotalExpenseByCategory(resultSet.getInt("totalExpenseByCategory"));


        return mappedCategory;
    }
}