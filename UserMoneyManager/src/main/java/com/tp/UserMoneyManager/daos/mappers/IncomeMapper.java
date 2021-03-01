package com.tp.UserMoneyManager.daos.mappers;

import com.tp.UserMoneyManager.models.Income;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class IncomeMapper implements RowMapper<Income> {
    @Override
    public Income mapRow(ResultSet resultSet, int i) throws SQLException {
        Income mappedIncome = new Income();
        mappedIncome.setIncomeId(resultSet.getInt("incomeId"));
        mappedIncome.setIncomeAmount(resultSet.getDouble("incomeAmount"));
        mappedIncome.setEarnedDate(resultSet.getDate("earnedDate").toLocalDate());
        mappedIncome.setDescription(resultSet.getString("description"));
        mappedIncome.setUserId(resultSet.getInt("userId"));
        return mappedIncome;
    }
}