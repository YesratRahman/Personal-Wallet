package com.tp.UserMoneyManager.daos.Interfaces;

import com.tp.UserMoneyManager.exceptions.InvalidCategoryException;
import com.tp.UserMoneyManager.exceptions.InvalidExpenseException;
import com.tp.UserMoneyManager.exceptions.InvalidExpenseIdException;
import com.tp.UserMoneyManager.exceptions.InvalidUserIdException;
import com.tp.UserMoneyManager.models.ExpenseCategory;
import com.tp.UserMoneyManager.models.Expense;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseDao {
    Expense addExpense(Expense toAdd) throws InvalidExpenseException, InvalidExpenseIdException, InvalidUserIdException, InvalidCategoryException;

    List<Expense> getAllExpenses();

    Expense getAllExpenseById(Integer expenseId) throws InvalidExpenseIdException;
    List<Expense> getExpenseByUserId(Integer userId) throws InvalidUserIdException, InvalidExpenseException;

    List<Expense> getExpenseByDate(LocalDate date, Integer userId) throws InvalidExpenseException, InvalidUserIdException;
     List<Expense> getExpenseByYear(Integer userId, Integer spentDate) throws InvalidExpenseException, InvalidUserIdException ;


    int updateExpense(Expense expense) throws InvalidExpenseIdException, InvalidExpenseException, InvalidUserIdException;

    int deleteExpense(Integer expenseId) throws InvalidExpenseIdException;

    int getExpenseReport(Integer userId) throws InvalidUserIdException;
     List<Integer> getTotalExpenseWithYear(Integer userId) throws InvalidUserIdException;

     int getExpenseTotalByYear(Integer userId, Integer spentDate) throws InvalidExpenseException, InvalidUserIdException;

    List<ExpenseCategory> getExpenseByCategory(Integer userId) throws InvalidUserIdException ;


    //int getExpenseReport(Expense expenseId) throws InvalidExpenseException, InvalidUserIdException;
}
