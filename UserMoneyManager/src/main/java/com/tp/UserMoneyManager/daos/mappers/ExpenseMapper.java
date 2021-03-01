package com.tp.UserMoneyManager.daos.mappers;

import com.tp.UserMoneyManager.models.Expense;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ExpenseMapper implements RowMapper<Expense> {
    @Override
    public Expense mapRow(ResultSet resultSet, int i) throws SQLException {
        Expense mappedExpense = new Expense();
        mappedExpense.setExpenseId(resultSet.getInt("expenseId"));
        mappedExpense.setExpenseAmount(resultSet.getDouble("expenseAmount"));
        mappedExpense.setSpentDate(resultSet.getDate("spentDate").toLocalDate());
        mappedExpense.setDescription(resultSet.getString("description"));
        mappedExpense.setUserId(resultSet.getInt("userId"));
        return mappedExpense;
    }
}