package com.tp.UserMoneyManager.services;

import com.tp.UserMoneyManager.daos.Interfaces.ExpenseDao;
import com.tp.UserMoneyManager.daos.Interfaces.IncomeDao;
import com.tp.UserMoneyManager.daos.Interfaces.UserDao;
import com.tp.UserMoneyManager.exceptions.*;
import com.tp.UserMoneyManager.models.Expense;
import com.tp.UserMoneyManager.models.Income;
import com.tp.UserMoneyManager.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class MoneyManagerService {
    @Autowired
    UserDao userDao;

    @Autowired
    ExpenseDao expenseDao;

    @Autowired
    IncomeDao incomeDao;

    public List<User> getAllUsers() {
        return userDao.getAllUsers();
    }

    public User addUser(User toAdd) throws InvalidUserNameException, NullUserException {

        if(toAdd == null ){
            throw new NullUserException("User can not be null!");
        }
        if(toAdd.getUserName() == null || toAdd.getUserName().isEmpty() || toAdd.getUserName().isBlank()){
            throw new InvalidUserNameException("User name can not be Invalid");
        }


        return userDao.addUser(toAdd);
    }

    public User getAllUsersById(Integer userId) throws InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("User Id can not be null!");
        }
        return userDao.getAllUsersById(userId);

    }

    public List<User> getUsersByUserName(String userName) throws InvalidUserNameException {
        if(userName == null || userName.isEmpty() || userName.isBlank()){
            throw new InvalidUserNameException("UserName is invalid!");
        }
        return userDao.getUsersByUserName(userName);
    }


    public int updateUser(Integer userId, User user) throws InvalidUserIdException, NullUserException, InvalidUserNameException {
        if(userId == null){
            throw new InvalidUserIdException("User Id can not be null!");
        }
        if(user == null){
            throw new IllegalArgumentException("User can not be null!");
        }
        if(user.getUserName() == null || user.getUserName().isEmpty() || user.getUserName().isBlank()){
            throw new InvalidUserNameException("User name can not be invalid!");
        }
        return userDao.updateUser(userId, user);
    }


    public int deleteUser(Integer userId) throws InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("User Id can not be null!");
        }
         return userDao.deleteUser(userId);
    }

    public Expense addExpense(Expense toAdd) throws InvalidUserIdException, InvalidExpenseException, InvalidExpenseIdException {
        if(toAdd == null){
            throw new InvalidExpenseException("Expense can not be null!");
        }

        if(toAdd.getExpenseAmount() == null){
            throw new InvalidExpenseException("Expense amount can not be null!");
        }


        if(toAdd.getSpentDate() == null){
            throw new InvalidExpenseException("Spent date can not be null");
        }

        int currentDate = LocalDate.now().getYear();
        if(toAdd.getSpentDate().getYear() > currentDate) {
            throw new InvalidExpenseException("Date can not be a future date");
        }

        if(toAdd.getDescription() == null || toAdd.getDescription().isBlank() || toAdd.getDescription().isEmpty())
        {
            throw new InvalidExpenseException("Expense description can not be null, empty or blank");
        }
        if(toAdd.getUserId() == null){
            throw new InvalidUserIdException("User id can not be null!");
        }

        return expenseDao.addExpense(toAdd);
    }

    public List<Expense> getAllExpenses() {
        return expenseDao.getAllExpenses();
    }

    public Expense getAllExpenseById(Integer expenseId) throws InvalidExpenseIdException {
        if(expenseId == null){
            throw new InvalidExpenseIdException("Expense Id can not be null!");
        }
        return expenseDao.getAllExpenseById(expenseId);
    }


    public List<Expense> getExpenseByDate(LocalDate spentDate) throws InvalidExpenseException {

        if(spentDate == null){
            throw new InvalidExpenseException("Date can not be null");
        }

        int currentDate = LocalDate.now().getYear();
        if(spentDate.getYear() > currentDate) {
            throw new InvalidExpenseException("Date can not be a future date");
        }

        return expenseDao.getExpenseByDate(spentDate);

    }

    public int updateExpense(Integer expenseId, Expense expense) throws InvalidExpenseIdException, InvalidExpenseException, InvalidUserIdException {
        if(expenseId == null){
            throw new InvalidExpenseIdException("Expense Id can not be null");
        }
        if(expense == null){
            throw new InvalidExpenseException("Expense object can not be null!");
        }
        if(expense.getExpenseAmount() == null){
            throw new InvalidExpenseException("Expense amount can not be null.");
        }
        if(expense.getSpentDate() == null){
            throw new InvalidExpenseException("Date can not be null.");
        }
        if(expense.getDescription() == null || expense.getDescription().isEmpty()||expense.getDescription().isBlank()){
            throw new InvalidExpenseException("Expense description can not be null.");
        }

        int currentDate = LocalDate.now().getYear();
        if(expense.getSpentDate().getYear() > currentDate) {
            throw new InvalidExpenseException("Date can not be a future date");
        }

        return expenseDao.updateExpense(expenseId, expense);

    }

    public int deleteExpense(Integer expenseId) throws InvalidExpenseIdException{
        if(expenseId == null){
            throw new InvalidExpenseIdException("Expense Id can not be null");
        }
        return expenseDao.deleteExpense(expenseId);
    }

    //    public List<Expense> getExpenseByAmount(Double expenseAmount) throws InvalidExpenseException {
    //        if(expenseAmount == null){
    //            throw new InvalidExpenseException("Expense amount can not be null");
    //        }
    //        return expenseDao.getExpenseByAmount();
    //    }

    public Income addIncome(Income toAdd) throws InvalidIncomeException, InvalidUserIdException, InvalidIncomeIdException {
        if(toAdd == null){
            throw new InvalidIncomeException("Income can not be null!");
        }

        if(toAdd.getIncomeAmount() == null){
            throw new InvalidIncomeException("Income amount can not be null!");
        }


        if(toAdd.getEarnedDate() == null){
            throw new InvalidIncomeException("Earned date can not be null");
        }

        int currentDate = LocalDate.now().getYear();
        if(toAdd.getEarnedDate().getYear() > currentDate) {
            throw new InvalidIncomeException("Date can not be a future date");
        }

        if(toAdd.getDescription() == null || toAdd.getDescription().isBlank() || toAdd.getDescription().isEmpty())
        {
            throw new InvalidIncomeException("Income description can not be null, empty or blank");
        }
        if(toAdd.getUserId() == null){
            throw new InvalidUserIdException("User id can not be null!");
        }


        return incomeDao.addIncome(toAdd);
    }

    public List<Income> getAllIncomes() {

        return incomeDao.getAllIncomes();
    }

    public Income getAllIncomeById(Integer incomeId) throws InvalidIncomeIdException {
        if(incomeId == null){
            throw new InvalidIncomeIdException("Income Id can not be null!");
        }
        return incomeDao.getAllIncomeById(incomeId);
    }

//    public List<Income> getIncomeByAmount(Double incomeAmount) throws InvalidIncomeException {
//        return incomeDao.getIncomeByAmount();
//    }

    public List<Income> getIncomeByDate(LocalDate earnedDate) throws InvalidIncomeException {
        if(earnedDate == null){
            throw new InvalidIncomeException("Date can not be null");
        }

        int currentDate = LocalDate.now().getYear();
        if(earnedDate.getYear() > currentDate) {
            throw new InvalidIncomeException("Date can not be a future date");
        }

        return incomeDao.getIncomeByDate(earnedDate);
    }

    public int updateIncome(Integer incomeId, Income income) throws InvalidIncomeIdException, InvalidIncomeException, InvalidUserIdException {
        if(incomeId == null){
            throw new InvalidIncomeIdException("Income Id can not be null");
        }
        if(income == null){
            throw new InvalidIncomeException("Income object can not be null!");
        }
        if(income.getIncomeAmount() == null){
            throw new InvalidIncomeException("Income amount can not be null.");
        }
        if(income.getEarnedDate() == null){
            throw new InvalidIncomeException("Date can not be null.");
        }
        if(income.getDescription() == null || income.getDescription().isEmpty()||income.getDescription().isBlank()){
            throw new InvalidIncomeException("Income description can not be null.");
        }

        int currentDate = LocalDate.now().getYear();
        if(income.getEarnedDate().getYear() > currentDate) {
            throw new InvalidIncomeException("Date can not be a future date");
        }

        return incomeDao.updateIncome(incomeId, income);
    }

    public int deleteIncome(Integer incomeId) throws InvalidIncomeIdException{
        if(incomeId == null){
            throw new InvalidIncomeIdException("Income Id can not be null");
        }
        return incomeDao.deleteIncome(incomeId);

    }


    public int getExpenseReport(Expense expense) throws InvalidUserIdException, InvalidExpenseException {
        if(expense == null){
            throw new InvalidExpenseException("Expense object can not be null!");
        }
        return expenseDao.getExpenseReport(expense);
    }

    public int getIncomeReport(Income income) throws InvalidUserIdException, InvalidIncomeException {
        if(income == null){
            throw new InvalidIncomeException("Income object can not be null!");
        }
        return incomeDao.getIncomeReport(income);
    }

    public int getReport(Integer userId, User user) throws NullUserException, InvalidUserIdException {

        if(user == null){
            throw new NullUserException("user object can not be null!");
        }
        if(userId == null){
            throw new InvalidUserIdException("User Id can not be null");
        }
//        if(user.getAssociatedExpense().getUserId() == null){
//            throw new InvalidUserIdException("User id can not be null");
//        }
//
//        if(user.getAssociatedIncome().getUserId() == null){
//            throw new InvalidUserIdException("User id can not be null");
//
//        }
        return userDao.getReport(userId, user);
    }
}
