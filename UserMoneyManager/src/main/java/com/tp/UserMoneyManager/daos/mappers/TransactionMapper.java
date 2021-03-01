package com.tp.UserMoneyManager.daos.mappers;

import com.tp.UserMoneyManager.models.Expense;
import com.tp.UserMoneyManager.models.Income;
import com.tp.UserMoneyManager.models.User;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TransactionMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet resultSet, int i) throws SQLException{
        User mappedUser = new User();
        mappedUser.setUserId(resultSet.getInt("userId"));
        mappedUser.setUserName(resultSet.getString("userName"));

        Expense associatedExpense = new Expense();
        associatedExpense.setExpenseId(resultSet.getInt("expenseId"));
        associatedExpense.setExpenseAmount(resultSet.getDouble("expenseAmount"));
        associatedExpense.setSpentDate(resultSet.getDate("spentDate").toLocalDate());
        associatedExpense.setDescription(resultSet.getString("description"));
        associatedExpense.setUserId(resultSet.getInt("userId"));
        mappedUser.setAssociatedExpense(associatedExpense);

        Income associatedIncome = new Income();
        associatedIncome.setIncomeId(resultSet.getInt("incomeId"));
        associatedIncome.setIncomeAmount(resultSet.getDouble("incomeAmount"));
        associatedIncome.setEarnedDate(resultSet.getDate("earnedDate").toLocalDate());
        associatedIncome.setDescription(resultSet.getString("description"));
        associatedIncome.setUserId(resultSet.getInt("userId"));

        mappedUser.setAssociatedIncome(associatedIncome);

        return mappedUser;
    }



}
