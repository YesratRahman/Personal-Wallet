package com.tp.UserMoneyManager.daos.mappers;

import com.tp.UserMoneyManager.models.ExpenseCategory;
import com.tp.UserMoneyManager.models.ExpenseIncomeDate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ExpenseIncomeDateMapper implements RowMapper<ExpenseIncomeDate> {
    @Override
    public ExpenseIncomeDate mapRow(ResultSet resultSet, int i) throws SQLException {
        ExpenseIncomeDate mappedExpenseIncome = new ExpenseIncomeDate();

        mappedExpenseIncome.setExpenseSum(resultSet.getInt("expenseSum"));
        mappedExpenseIncome.setIncomeSum(resultSet.getInt("incomeSum"));
        mappedExpenseIncome.setSpentDate(resultSet.getDate("spentDate").toLocalDate());
        mappedExpenseIncome.setEarnedDate(resultSet.getDate("earnedDate").toLocalDate());
        return mappedExpenseIncome;
    }
}