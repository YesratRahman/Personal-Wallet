package com.tp.UserMoneyManager.daos.Interfaces;

import com.tp.UserMoneyManager.exceptions.InvalidExpenseException;
import com.tp.UserMoneyManager.exceptions.InvalidExpenseIdException;
import com.tp.UserMoneyManager.exceptions.InvalidUserIdException;
import com.tp.UserMoneyManager.models.Expense;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseDao {
    Expense addExpense(Expense toAdd) throws InvalidExpenseException, InvalidExpenseIdException, InvalidUserIdException;

    List<Expense> getAllExpenses();

    Expense getAllExpenseById(Integer expenseId) throws InvalidExpenseIdException;

    //List<Expense> getExpenseByAmount();

    List<Expense> getExpenseByDate(LocalDate date) throws InvalidExpenseException;

    int updateExpense(Integer expenseId, Expense expense) throws InvalidExpenseIdException, InvalidExpenseException, InvalidUserIdException;

    int deleteExpense(Integer expenseId) throws InvalidExpenseIdException;

    int getExpenseReport(Expense expenseId) throws InvalidExpenseException, InvalidUserIdException;
}
