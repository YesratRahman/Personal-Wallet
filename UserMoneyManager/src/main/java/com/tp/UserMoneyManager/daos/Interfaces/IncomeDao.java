package com.tp.UserMoneyManager.daos.Interfaces;


import com.tp.UserMoneyManager.exceptions.InvalidIncomeException;
import com.tp.UserMoneyManager.exceptions.InvalidIncomeIdException;
import com.tp.UserMoneyManager.exceptions.InvalidUserIdException;
import com.tp.UserMoneyManager.models.ExpenseCategory;
import com.tp.UserMoneyManager.models.Income;
import com.tp.UserMoneyManager.models.IncomeCategory;

import java.time.LocalDate;
import java.util.List;

public interface IncomeDao {

    Income addIncome(Income toAdd) throws InvalidIncomeException, InvalidIncomeIdException, InvalidUserIdException;
    List<Income> getAllIncomes();
    Income getAllIncomeById(Integer incomeId) throws InvalidIncomeIdException;

    //List<Income> getIncomeByAmount();

    List<Income> getIncomeByDate(LocalDate date, Integer userId) throws InvalidIncomeException, InvalidUserIdException;
    List<Income> getIncomeByYear(Integer userId, Integer earnedDate) throws InvalidIncomeException, InvalidUserIdException ;

    List<Income> getAllIncomeByUserId(Integer userId) throws InvalidUserIdException;

        int updateIncome(Integer incomeId, Income income) throws InvalidIncomeIdException, InvalidIncomeException, InvalidUserIdException;

    int deleteIncome(Integer incomeId) throws InvalidIncomeIdException;
    int getIncomeReport(Integer userId) throws InvalidUserIdException;
    List<IncomeCategory> getIncomeByCategory(Integer userId) throws InvalidUserIdException;

    }
