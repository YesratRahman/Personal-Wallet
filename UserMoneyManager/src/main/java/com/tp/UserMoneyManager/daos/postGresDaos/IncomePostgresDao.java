package com.tp.UserMoneyManager.daos.postGresDaos;

import com.tp.UserMoneyManager.daos.Interfaces.IncomeDao;
import com.tp.UserMoneyManager.daos.mappers.ExpenseCategoryMapper;
import com.tp.UserMoneyManager.daos.mappers.IncomeCategoryMapper;
import com.tp.UserMoneyManager.daos.mappers.IncomeMapper;
import com.tp.UserMoneyManager.daos.mappers.IntegerMapper;
import com.tp.UserMoneyManager.exceptions.InvalidIncomeException;
import com.tp.UserMoneyManager.exceptions.InvalidIncomeIdException;
import com.tp.UserMoneyManager.exceptions.InvalidUserIdException;
import com.tp.UserMoneyManager.models.ExpenseCategory;
import com.tp.UserMoneyManager.models.Income;
import com.tp.UserMoneyManager.models.IncomeCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@Profile({"production", "daoTesting"})

public class IncomePostgresDao implements IncomeDao {
    @Autowired
    private JdbcTemplate template;

    @Override
    public Income addIncome(Income toAdd) throws InvalidIncomeException, InvalidIncomeIdException, InvalidUserIdException {
        if (toAdd == null) {
            throw new InvalidIncomeException("Income can not be null");
        }

        List<Integer> incomeId;
        int userCount = template.queryForObject("select count(*) from \"Users\" Where \"userId\" = '" + toAdd.getUserId() + "'", new IntegerMapper("count"));
        if (userCount == 1) {

            incomeId = template.query(
                    "INSERT INTO \"Incomes\" (\"incomeAmount\", \"earnedDate\", \"category\", " +
                            "\"description\", \"userId\") " +
                            "VALUES(?, ?, ?,?, ?) RETURNING \"incomeId\";",
                    new IntegerMapper("incomeId"),
                    toAdd.getIncomeAmount(),
                    toAdd.getEarnedDate(),
                    toAdd.getCategory(),
                    toAdd.getDescription(),
                    toAdd.getUserId());
            if (incomeId.size() == 0) {
                throw new InvalidIncomeIdException("Income Id not found!");
            }
            toAdd.setIncomeId(incomeId.get(0));

        } else {
            throw new InvalidUserIdException("User Id does not exist");
        }

        return toAdd;
    }

    @Override
    public List<Income> getAllIncomes() {
        List<Income> allIncomes = template.query("Select * from \"Incomes\";", new IncomeMapper());
        return allIncomes;
    }

    @Override
    public Income getAllIncomeById(Integer incomeId) throws InvalidIncomeIdException {
        if (incomeId == null) {
            throw new InvalidIncomeIdException("Income Id can not be null!");
        }
        Income getIncome;

        int userCount = template.queryForObject("select count(*) from \"Incomes\" Where \"incomeId\" = '" + incomeId + "'", new IntegerMapper("count"));

        if (userCount == 1) {
            getIncome = template.queryForObject(
                    "SELECT \"incomeId\", \"incomeAmount\",\"earnedDate\",\"category\",\"description\", \"userId\" " +
                            "FROM \"Incomes\" WHERE \"incomeId\" ='" + incomeId + "'", new IncomeMapper());
        } else {
            throw new InvalidIncomeIdException("Income id does not exist");
        }
        return getIncome;
    }

//    @Override
//    public List<Income> getIncomeByAmount() {
//        return null;
//    }

    @Override
    public List<Income> getIncomeByDate(LocalDate date, Integer userId) throws InvalidIncomeException, InvalidUserIdException {
       if(userId==null){
           throw new InvalidUserIdException("User id can not be null");
       }
        if (date == null) {
            throw new InvalidIncomeException("Earned date can not be null");
        }



        List<Income> incomes;
            incomes = template.query(
                    "select \"incomeId\", \"incomeAmount\" , \"category\", \"description\", \"earnedDate\" , \"userId\"" +
                            "from \"Incomes\" " +
                            "where \"earnedDate\" = ?;\n",
                    new IncomeMapper(), date);

        return incomes;
    }


    @Override
    public List<Income> getIncomeByYear(Integer userId, Integer date) throws InvalidIncomeException, InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("userId can not be null");
        }
        if (date == null) {
            throw new InvalidIncomeException("Earned date can not be null");
        }
        List<Income> incomes;
        incomes = template.query(
                "SELECT \"incomeId\", \"incomeAmount\", \"category\", \"description\", \n" +
                        "\"earnedDate\",\"userId\"\n" +
                        "FROM \"Incomes\" \n" +
                        "WHERE \"userId\" = ? AND EXTRACT(YEAR FROM \"Incomes\".\"earnedDate\")  = ? ",
                new IncomeMapper(), userId, date);

        return incomes;
    }


    @Override
    public List<Income> getAllIncomeByUserId(Integer userId) throws InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("User id can not be null");
        }

        List<Income> incomes;
        incomes = template.query(
                "select \"incomeId\", \"incomeAmount\", \"category\", \"description\", \"earnedDate\"," +
                        "\"userId\" from \"Incomes\" where \"userId\" = ?\n",
                new IncomeMapper(), userId);
        return incomes;
    }

    @Override
    public int updateIncome(Integer incomeId, Income income) throws InvalidIncomeIdException, InvalidIncomeException, InvalidUserIdException {
        if (incomeId == null) {
            throw new InvalidIncomeIdException("Income Id can not be null!");
        }
        if (income == null) {
            throw new InvalidIncomeException("Null income can not be updated!");
        }

        int updatedIncome;
        int userCount = template.queryForObject("select count(*) from \"Users\" Where \"userId\" = '" + income.getUserId() + "'", new IntegerMapper("count"));

        if (userCount == 1) {
            updatedIncome = template.update(
                    "Update \"Incomes\" " +
                            "Set \"incomeAmount\"=?," +
                            " \"earnedDate\"=?, " +
                            "\"description\"=? " +
                            "Where \"incomeId\" =?; \n",
                    income.getIncomeAmount(), income.getEarnedDate(), income.getDescription(), incomeId);
        } else {
            throw new InvalidUserIdException("The user whose income tried to be updated, doesn't exist.");
        }
        return updatedIncome;
    }

    @Override
    public int deleteIncome(Integer incomeId) throws InvalidIncomeIdException {
        if(incomeId == null){
            throw new InvalidIncomeIdException("Income id can not be null!");
        }

        int delete;
        int incomeCount = template.queryForObject(
                "select count(*) from \"Incomes\" Where \"incomeId\" = '" + incomeId + "'", new IntegerMapper("count"));

        if (incomeCount == 1) {
            delete = template.update("DELETE FROM \"Incomes\" WHERE \"incomeId\" = ?;", incomeId);
        }
        else {
            throw new InvalidIncomeIdException("Income with this id does not exist or was deleted");
        }
        return delete;
    }
    @Override
    public int getIncomeReport(Integer userId) throws InvalidUserIdException {

        if(userId == null){
            throw new InvalidUserIdException("userId can not be null");
        }
        int getTotalIncome;

        getTotalIncome = template.queryForObject(
                "SELECT sum(\"incomeAmount\") as \"totalIncome\" FROM \"Incomes\" WHERE \"userId\" = '" + userId +"'",  new IntegerMapper("totalIncome"));

        return getTotalIncome;
    }

    @Override
    public List<IncomeCategory> getIncomeByCategory(Integer userId) throws InvalidUserIdException {
        if (userId == null) {
            throw new InvalidUserIdException("userId can not be null");
        }

        List<IncomeCategory> totalIncomeByCategory;

        totalIncomeByCategory = template.query("" +
                        "SELECT \"category\", sum(\"incomeAmount\") as \"totalIncomeByCategory\" FROM \"Incomes\" \n" +
                        "WHERE \"userId\" = ?  GROUP BY \"category\";",
                new IncomeCategoryMapper(), userId);
        return totalIncomeByCategory;
    }
}
