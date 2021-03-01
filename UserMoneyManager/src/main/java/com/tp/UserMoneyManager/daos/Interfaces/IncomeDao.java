package com.tp.UserMoneyManager.daos.Interfaces;


import com.tp.UserMoneyManager.exceptions.InvalidIncomeException;
import com.tp.UserMoneyManager.exceptions.InvalidIncomeIdException;
import com.tp.UserMoneyManager.exceptions.InvalidUserIdException;
import com.tp.UserMoneyManager.models.Income;

import java.time.LocalDate;
import java.util.List;

public interface IncomeDao {

    Income addIncome(Income toAdd) throws InvalidIncomeException, InvalidIncomeIdException, InvalidUserIdException;
    List<Income> getAllIncomes();
    Income getAllIncomeById(Integer incomeId) throws InvalidIncomeIdException;

    //List<Income> getIncomeByAmount();

    List<Income> getIncomeByDate(LocalDate date) throws InvalidIncomeException;

    int updateIncome(Integer incomeId, Income income) throws InvalidIncomeIdException, InvalidIncomeException, InvalidUserIdException;

    int deleteIncome(Integer incomeId) throws InvalidIncomeIdException;
    int getIncomeReport(Income income) throws InvalidIncomeException, InvalidUserIdException;

}
