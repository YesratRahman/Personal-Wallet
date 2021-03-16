package com.tp.UserMoneyManager.daos.mappers;

import com.tp.UserMoneyManager.models.ExpenseCategory;
import com.tp.UserMoneyManager.models.IncomeCategory;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class IncomeCategoryMapper implements RowMapper<IncomeCategory> {
    @Override
    public IncomeCategory mapRow(ResultSet resultSet, int i) throws SQLException {
        IncomeCategory mappedIncomeCategory = new IncomeCategory();
        mappedIncomeCategory.setCategory(resultSet.getString("category"));
        mappedIncomeCategory.setTotalIncomeByCategory(resultSet.getInt("totalIncomeByCategory"));


        return mappedIncomeCategory;
    }
}