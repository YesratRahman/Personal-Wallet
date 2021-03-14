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


    public int updateUser( User user) throws InvalidUserIdException, NullUserException, InvalidUserNameException {

        if(user == null){
            throw new IllegalArgumentException("User can not be null!");
        }
        if(user.getUserId() == null){
            throw new InvalidUserIdException("User Id can not be null!");
        }
        if(user.getUserName() == null || user.getUserName().isEmpty() || user.getUserName().isBlank()){
            throw new InvalidUserNameException("User name can not be invalid!");
        }
        return userDao.updateUser( user);
    }


    public int deleteUser(Integer userId) throws InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("User Id can not be null!");
        }
         return userDao.deleteUser(userId);
    }

    public Expense addExpense(Expense toAdd) throws InvalidUserIdException, InvalidExpenseException, InvalidExpenseIdException, InvalidCategoryException {
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
        if(toAdd.getCategory() == null || toAdd.getCategory().isBlank() || toAdd.getCategory().isEmpty())
        {
            throw new InvalidCategoryException("Expense category can not be null, empty or blank");
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

    public List<Expense> getExpenseByUserId(Integer userId) throws InvalidUserIdException, InvalidExpenseException {
        if(userId == null){
            throw new InvalidUserIdException("User id can not be null");
        }
        return expenseDao.getExpenseByUserId(userId);

    }

    public List<Expense> getExpenseByDate(LocalDate spentDate, Integer userId) throws InvalidExpenseException, InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("UserId can not be null");
        }
        if(spentDate == null){
            throw new InvalidExpenseException("Date can not be null");
        }


        int currentDate = LocalDate.now().getYear();
        if(spentDate.getYear() > currentDate) {
            throw new InvalidExpenseException("Date can not be a future date");
        }

        return expenseDao.getExpenseByDate(spentDate, userId);

    }


    public List<Expense> getExpenseByYear(Integer userId, Integer spentDate) throws InvalidExpenseException, InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("UserId can not be null");
        }
        if(spentDate == null){
            throw new InvalidExpenseException("Date can not be null");
        }


        int currentDate = LocalDate.now().getYear();
        if(spentDate > currentDate) {
            throw new InvalidExpenseException("Date can not be a future date");
        }

        return expenseDao.getExpenseByYear( userId, spentDate);

    }



    public int getExpenseTotalByYear(Integer userId, Integer spentDate) throws InvalidExpenseException, InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("UserId can not be null");
        }
        if(spentDate == null){
            throw new InvalidExpenseException("Date can not be null");
        }


        int currentDate = LocalDate.now().getYear();
        if(spentDate > currentDate) {
            throw new InvalidExpenseException("Date can not be a future date");
        }

        return expenseDao.getExpenseTotalByYear( userId, spentDate);

    }


    public List<Integer> getTotalExpenseWithYear(Integer userId) throws InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("UserId can not be null");
        }

        return expenseDao.getTotalExpenseWithYear( userId);

    }



//    public List<Expense> getExpenseByDate(LocalDate spentDate, Expense expense) throws InvalidExpenseException, InvalidUserIdException {
//
//        if(spentDate == null){
//            throw new InvalidExpenseException("Date can not be null");
//        }
//
//        int currentDate = LocalDate.now().getYear();
//        if(spentDate.getYear() > currentDate) {
//            throw new InvalidExpenseException("Date can not be a future date");
//        }
//
//        return expenseDao.getExpenseByDate(spentDate, expense);
//
//    }

    public int updateExpense(Expense expense) throws InvalidExpenseIdException, InvalidExpenseException, InvalidUserIdException {

        if(expense == null){
            throw new InvalidExpenseException("Expense object can not be null!");
        }
        if(expense.getExpenseId() == null){
            throw new InvalidExpenseIdException("Expense Id can not be null");
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

        return expenseDao.updateExpense(expense);

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

    public List<Income> getIncomeByDate(LocalDate earnedDate, Integer userId) throws InvalidIncomeException, InvalidUserIdException {
        if(userId==null){
            throw new InvalidUserIdException("User id can not be null");
        }
        if(earnedDate == null){
            throw new InvalidIncomeException("Date can not be null");
        }

        int currentDate = LocalDate.now().getYear();
        if(earnedDate.getYear() > currentDate) {
            throw new InvalidIncomeException("Date can not be a future date");
        }

        return incomeDao.getIncomeByDate(earnedDate, userId);
    }

    public List<Income> getIncomeByYear(Integer userId, Integer date) throws InvalidIncomeException, InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("UserId can not be null");
        }
        if(date == null){
            throw new InvalidIncomeException("Date can not be null");
        }


        int currentDate = LocalDate.now().getYear();
        if(date > currentDate) {
            throw new InvalidIncomeException("Date can not be a future date");
        }

        return incomeDao.getIncomeByYear( userId, date);

    }

    public List<Income> getAllIncomeByUserId(Integer userId) throws InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("User id can not be null");
        }
        return incomeDao.getAllIncomeByUserId(userId);

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


//    public int getExpenseReport(Expense expense) throws InvalidUserIdException, InvalidExpenseException {
//        if(expense == null){
//            throw new InvalidExpenseException("Expense object can not be null!");
//        }
//        return expenseDao.getExpenseReport(expense);
//    }

    public int getExpenseReport(Integer userId) throws InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("User id can not be null!");
        }
        return expenseDao.getExpenseReport(userId);
    }

    public int getIncomeReport(Integer userId) throws InvalidUserIdException{
        if(userId == null){
            throw new InvalidUserIdException("userId can not be null");
        }
        return incomeDao.getIncomeReport(userId);
    }

    public int getReport(Integer userId) throws NullUserException, InvalidUserIdException {


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
        return userDao.getReport(userId);
    }

    public List<Integer> getExpenseByCategory(Integer userId) throws InvalidUserIdException{
        if(userId == null){
            throw new InvalidUserIdException("User id can not be null!");
        }
        return expenseDao.getExpenseByCategory(userId);

    }

    public List<User> getAllExpenseAndIncome() {
        return userDao.getAllExpenseAndIncome();
    }


    public User getAllExpenseAndIncomeByUserId(Integer userId) throws InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("User Id can not be null!");
        }
        return userDao.getAllUsersById(userId);

    }
}
