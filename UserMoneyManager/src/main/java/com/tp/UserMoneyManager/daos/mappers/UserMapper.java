package com.tp.UserMoneyManager.daos.mappers;

import com.tp.UserMoneyManager.models.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet resultSet, int i) throws SQLException {
        User mappedUser = new User();
        mappedUser.setUserId(resultSet.getInt("userId"));
        mappedUser.setUserName(resultSet.getString("userName"));

        return mappedUser;
    }
}