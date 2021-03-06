package com.tp.UserMoneyManager.daos.Interfaces;

import com.tp.UserMoneyManager.exceptions.InvalidUserIdException;
import com.tp.UserMoneyManager.exceptions.InvalidUserNameException;
import com.tp.UserMoneyManager.exceptions.NullUserException;
import com.tp.UserMoneyManager.models.ExpenseIncomeDate;
import com.tp.UserMoneyManager.models.User;

import java.util.List;

public interface UserDao {

    User addUser(User toAdd) throws InvalidUserNameException, NullUserException;
    List<User> getAllUsers();
    User getAllUsersById(Integer userId) throws InvalidUserIdException;
//    List<User> getUsersByUserName(String userName) throws InvalidUserNameException;
    int updateUser( User user) throws InvalidUserIdException, NullUserException, InvalidUserNameException;
    int deleteUser(Integer userId) throws InvalidUserIdException;

    int getReport(Integer userId) throws NullUserException, InvalidUserIdException;

    List<User> getAllExpenseAndIncome();
//    List<User> getAllExpenseAndIncomeByUserId(Integer userId) throws InvalidUserIdException;
          List<ExpenseIncomeDate> getTotalExpenseAndIncomeByUserId(Integer userId) throws InvalidUserIdException;


    }
