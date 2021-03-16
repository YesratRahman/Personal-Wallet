package com.tp.UserMoneyManager.daos.mappers;

import com.tp.UserMoneyManager.models.ExpenseCategory;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ExpenseCategoryMapper implements RowMapper<ExpenseCategory> {
    @Override
    public ExpenseCategory mapRow(ResultSet resultSet, int i) throws SQLException {
        ExpenseCategory mappedExpenseCategory = new ExpenseCategory();
        mappedExpenseCategory.setCategory(resultSet.getString("category"));
        mappedExpenseCategory.setTotalExpenseByCategory(resultSet.getInt("totalExpenseByCategory"));


        return mappedExpenseCategory;
    }
}