package com.tp.UserMoneyManager.daos.postGresDaos;

import com.tp.UserMoneyManager.daos.Interfaces.IncomeDao;
import com.tp.UserMoneyManager.daos.mappers.IncomeMapper;
import com.tp.UserMoneyManager.daos.mappers.IntegerMapper;
import com.tp.UserMoneyManager.exceptions.InvalidIncomeException;
import com.tp.UserMoneyManager.exceptions.InvalidIncomeIdException;
import com.tp.UserMoneyManager.exceptions.InvalidUserIdException;
import com.tp.UserMoneyManager.models.Income;
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
                    "INSERT INTO \"Incomes\" (\"incomeAmount\", \"earnedDate\", " +
                            "\"description\", \"userId\") " +
                            "VALUES(?, ?, ?,?) RETURNING \"incomeId\";",
                    new IntegerMapper("incomeId"),
                    toAdd.getIncomeAmount(),
                    toAdd.getEarnedDate(),
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

        if (allIncomes.isEmpty()) {
            return null;
        }
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
                    "SELECT \"incomeId\", \"incomeAmount\",\"earnedDate\",\"description\", \"userId\" " +
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
    public List<Income> getIncomeByDate(LocalDate date) throws InvalidIncomeException {
        if (date == null) {
            throw new InvalidIncomeException("Earned date can not be null");
        }

        int dateCount = template.queryForObject("select count(*) from \"Incomes\" Where \"earnedDate\" = '" + date + "'", new IntegerMapper("count"));

        List<Income> incomes;
        if (dateCount == 1) {
            incomes = template.query(
                    "select \"incomeId\", \"incomeAmount\", \"description\", \"earnedDate\" , \"userId\"" +
                            "from \"Incomes\" " +
                            "where \"earnedDate\" = ?;\n",
                    new IncomeMapper(), date);
        } else {
            throw new InvalidIncomeException("No income is found for this date");
        }
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
    public int getIncomeReport(Income income) throws InvalidIncomeException, InvalidUserIdException {
        if(income == null){
            throw new InvalidIncomeException("Income object can not be null!");
        }
        int userCount = template.queryForObject("select count(*) from \"Users\" Where \"userId\" = '" + income.getUserId() + "'", new IntegerMapper("count"));

        int getTotalIncome;
        if (userCount == 1) {
            getTotalIncome = template.queryForObject(
                    "SELECT sum(\"incomeAmount\") as \"totalIncome\" FROM \"Incomes\" WHERE \"userId\" = '" + income.getUserId() +"'",  new IntegerMapper("totalIncome"));
        } else {
            throw new InvalidUserIdException("The user you are trying to get the total income, does not exist.");
        }
        return getTotalIncome;
    }
}
