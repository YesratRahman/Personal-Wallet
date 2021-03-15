package com.tp.UserMoneyManager.daos.postGresDaos;

import com.tp.UserMoneyManager.daos.Interfaces.ExpenseDao;
import com.tp.UserMoneyManager.daos.mappers.CategoryMapper;
import com.tp.UserMoneyManager.daos.mappers.ExpenseMapper;
import com.tp.UserMoneyManager.daos.mappers.IntegerMapper;
import com.tp.UserMoneyManager.exceptions.InvalidExpenseException;
import com.tp.UserMoneyManager.exceptions.InvalidExpenseIdException;
import com.tp.UserMoneyManager.exceptions.InvalidUserIdException;
import com.tp.UserMoneyManager.models.Category;
import com.tp.UserMoneyManager.models.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component

@Profile({"production", "daoTesting"})
public class ExpensePostgresDao implements ExpenseDao {
    @Autowired
    private JdbcTemplate template;


    @Override
    public Expense addExpense(Expense toAdd) throws InvalidExpenseException, InvalidExpenseIdException, InvalidUserIdException {
        if (toAdd == null) {
            throw new InvalidExpenseException("Expense can not be null");
        }

        List<Integer> expenseId;
        int userCount = template.queryForObject("select count(*) from \"Users\" Where \"userId\" = '" + toAdd.getUserId() + "'", new IntegerMapper("count"));
        if (userCount == 1) {

            expenseId = template.query(
                    "INSERT INTO \"Expenses\" (\"expenseAmount\", \"spentDate\", \"category\", " +
                            "\"description\", \"userId\") " +
                            "VALUES(?, ?, ?,?,?) RETURNING \"expenseId\";",
                    new IntegerMapper("expenseId"),
                    toAdd.getExpenseAmount(),
                    toAdd.getSpentDate(),
                    toAdd.getCategory(),
                    toAdd.getDescription(),
                    toAdd.getUserId());
            if (expenseId.size() == 0) {
                throw new InvalidExpenseIdException("Expense Id not found!");
            }
            toAdd.setExpenseId(expenseId.get(0));

        } else {
            throw new InvalidUserIdException("User Id does not exist");
        }

        return toAdd;
    }

    @Override
    public List<Expense> getAllExpenses() {
        List<Expense> allExpenses = template.query("Select * from \"Expenses\";", new ExpenseMapper());
        return allExpenses;
    }

    @Override
    public Expense getAllExpenseById(Integer expenseId) throws InvalidExpenseIdException {
        if (expenseId == null) {
            throw new InvalidExpenseIdException("Expense Id can not be null!");
        }
        Expense getExpense;

        int userCount = template.queryForObject("select count(*) from \"Expenses\" Where \"expenseId\" = '" + expenseId + "'", new IntegerMapper("count"));

        if (userCount == 1) {
            getExpense = template.queryForObject(
                    "SELECT \"expenseId\", \"expenseAmount\",\"spentDate\",\"category\",\"description\", \"userId\" " +
                            "FROM \"Expenses\" WHERE \"expenseId\" ='" + expenseId + "'", new ExpenseMapper());
        } else {
            throw new InvalidExpenseIdException("Expense id does not exist");
        }
        return getExpense;
    }

    @Override
    public List<Expense> getExpenseByUserId(Integer userId) throws InvalidUserIdException, InvalidExpenseException {
    if(userId == null){
        throw new InvalidUserIdException("User id can not be null");
    }

        List<Expense> expenses;
            expenses = template.query(
                    "select \"expenseId\", \"expenseAmount\", \"category\", \"description\", \"spentDate\"," +
                            "\"userId\" from \"Expenses\" where \"userId\" = ?\n",
                    new ExpenseMapper(), userId);
        return expenses;
    }


    @Override
    public List<Expense> getExpenseByDate(LocalDate date, Integer userId) throws InvalidExpenseException, InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("userId can not be null");
        }
        if (date == null) {
            throw new InvalidExpenseException("Spent date can not be null");
        }
        List<Expense> expenses;
            expenses = template.query(
                    "select \"expenseId\", \"expenseAmount\", \"category\", \"description\", \n" +
                            "\"spentDate\",\"userId\" from \"Expenses\" " +
                            "where \"userId\" = ? AND \"spentDate\" = ? ",
                    new ExpenseMapper(), userId, date);

        return expenses;
    }

    @Override
    public List<Expense> getExpenseByYear(Integer userId, Integer date) throws InvalidExpenseException, InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("userId can not be null");
        }
        if (date == null) {
            throw new InvalidExpenseException("Spent date can not be null");
        }
        List<Expense> expenses;
        expenses = template.query(
                "SELECT \"expenseId\", \"expenseAmount\", \"category\", \"description\", \n" +
                        "\"spentDate\",\"userId\"\n" +
                        "FROM \"Expenses\" \n" +
                        "WHERE \"userId\" = ? AND EXTRACT(YEAR FROM \"Expenses\".\"spentDate\")  = ? ",
                new ExpenseMapper(), userId, date);

        return expenses;
    }


    @Override
    public int getExpenseTotalByYear(Integer userId, Integer date) throws InvalidExpenseException, InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("userId can not be null");
        }
        if (date == null) {
            throw new InvalidExpenseException("Spent date can not be null");
        }
        int total;
        total = template.queryForObject(
                "SELECT sum(\"expenseAmount\") as \"totalExpenseByYear\" FROM \"Expenses\" WHERE \"userId\" = ? AND EXTRACT(YEAR FROM \"Expenses\".\"spentDate\")  = ? \n",
                new IntegerMapper("totalExpenseByYear"), userId, date);

        return total;
    }


    @Override

    public List<Integer> getTotalExpenseWithYear(Integer userId) throws InvalidUserIdException{
        if(userId == null){
            throw new InvalidUserIdException("userId can not be null");
        }
        List<Integer> totalExpeYear;

        totalExpeYear = template.query("SELECT EXTRACT(YEAR FROM \"Expenses\".\"spentDate\") as \"Year\", " +
                "sum(\"expenseAmount\") as \"totalExpenseByYear\" FROM \"Expenses\" " +
                "WHERE \"userId\" = ?  GROUP BY \"Year\"\n",
                new IntegerMapper("Year"),new IntegerMapper("totalExpenseByYear"), userId);
        return totalExpeYear;
    }


    @Override
    public int updateExpense(Expense expense) throws InvalidExpenseIdException, InvalidExpenseException, InvalidUserIdException {

        if (expense == null) {
            throw new InvalidExpenseException("Null expense can not be updated!");
        }
        if (expense.getExpenseId() == null) {
            throw new InvalidExpenseIdException("Expense Id can not be null!");
        }
        int updatedExpense;
        int userCount = template.queryForObject("select count(*) from \"Users\" Where \"userId\" = '" + expense.getUserId() + "'", new IntegerMapper("count"));

        if (userCount == 1) {
            updatedExpense = template.update(
                    "Update \"Expenses\" " +
                            "Set \"expenseAmount\"=?," +
                            " \"spentDate\"=?, " +
                            " \"category\"=?, " +
                            "\"description\"=? " +
                            "Where \"expenseId\" =?; \n",
                    expense.getExpenseAmount(), expense.getSpentDate(),expense.getCategory(), expense.getDescription(), expense.getExpenseId());
        } else {
            throw new InvalidUserIdException("The user whose expense tried to be updated, doesn't exist.");
       }
            return updatedExpense;
        }

        @Override
        public int deleteExpense (Integer expenseId) throws InvalidExpenseIdException {
            if(expenseId == null){
                throw new InvalidExpenseIdException("Expense id can not be null!");
            }

            int delete;
            int expenseCount = template.queryForObject(
                    "select count(*) from \"Expenses\" Where \"expenseId\" = '" + expenseId + "'", new IntegerMapper("count"));

            if (expenseCount == 1) {
                delete = template.update("DELETE FROM \"Expenses\" WHERE \"expenseId\" = ?;", expenseId);
            }
            else {
                throw new InvalidExpenseIdException("Expense with this id does not exist or was deleted");
            }
            return delete;
        }




    @Override
    public int getExpenseReport(Integer userId) throws InvalidUserIdException {

        if(userId == null){
            throw new InvalidUserIdException("userId can not be null");
        }
        int getTotalExpense;

            getTotalExpense = template.queryForObject(
                    "SELECT sum(\"expenseAmount\") as \"totalExpense\" FROM \"Expenses\" WHERE \"userId\" = '" + userId +"'",  new IntegerMapper("totalExpense"));

        return getTotalExpense;
    }

    @Override
    public List<Category> getExpenseByCategory(Integer userId) throws InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("userId can not be null");
        }

        List<Category> totalExpenseByCategory;

        totalExpenseByCategory = template.query("" +
                "SELECT \"category\", sum(\"expenseAmount\") as \"totalExpenseByCategory\" FROM \"Expenses\" \n" +
                "WHERE \"userId\" = ?  GROUP BY \"category\";",
                new CategoryMapper(), userId);
        return totalExpenseByCategory;
    }















//    @Override
//    public int getExpenseReport(Expense expense) throws InvalidUserIdException, InvalidExpenseException {
//
//        if(expense == null){
//            throw new InvalidExpenseException("Expense object can not be null!");
//        }
//        int userCount = template.queryForObject("select count(*) from \"Users\" Where \"userId\" = '" + expense.getUserId() + "'", new IntegerMapper("count"));
//
//        int getTotalExpense;
//        if (userCount == 1) {
//            getTotalExpense = template.queryForObject(
//                    "SELECT sum(\"expenseAmount\") as \"totalExpense\" FROM \"Expenses\" WHERE \"userId\" = '" + expense.getUserId() +"'",  new IntegerMapper("totalExpense"));
//        } else {
//            throw new InvalidUserIdException("The user you are trying to get the total expense, does not exist.");
//        }
//        return getTotalExpense;
//    }
//





}



//        totalExpenseByCategory = template.query("SELECT \"category\" as \"Category\", sum(\"expenseAmount\") as " +
//                        "\"totalExpenseByCategory\" FROM \"Expenses\" \n" +
//                        "WHERE \"userId\" = ?  GROUP BY \"Category\";", new IntegerMapper("Category"),
//                new IntegerMapper("totalExpenseByCategory"), userId);


        //    @Override
        //    public List<Expense> getExpenseByAmount() {
        //        return null;
        //    }

