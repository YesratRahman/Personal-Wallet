package com.tp.UserMoneyManager.daos.postGresDaos;

import com.tp.UserMoneyManager.daos.Interfaces.UserDao;
import com.tp.UserMoneyManager.daos.mappers.IntegerMapper;
import com.tp.UserMoneyManager.daos.mappers.UserMapper;
import com.tp.UserMoneyManager.daos.mappers.fullUserMapper;
import com.tp.UserMoneyManager.exceptions.InvalidUserIdException;
import com.tp.UserMoneyManager.exceptions.InvalidUserNameException;
import com.tp.UserMoneyManager.exceptions.NullUserException;
import com.tp.UserMoneyManager.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Profile({"production", "daoTesting"})
public class UserPostgresDao implements UserDao {

    @Autowired
    private JdbcTemplate template;

//    private List<User> allUser = new ArrayList<>();
//    public UserPostgresDao(){
//        User user = new User();
//        user.setUserName("RahaRahman");
//        user.setUserId(5);
//        allUser.add(user);
//
//    }
    @Override
    public User addUser(User toAdd) throws NullUserException, InvalidUserNameException {
        if(toAdd == null ){
            throw new NullUserException("User can not be null!");
        }

        Integer userId= template.queryForObject("INSERT INTO \"Users\" (\"userName\") \n" +
                        "VALUES (?) RETURNING \"userId\";",
                new IntegerMapper("userId"),
                toAdd.getUserName()
        );
        toAdd.setUserId( userId );
        return toAdd;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> allUsers = template.query("SELECT * FROM \"Users\"", new UserMapper());

        return allUsers;

    }

    @Override
    public User getAllUsersById(Integer userId) throws InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("User id can not be null!");
        }

        User getUser;
       int userCount = template.queryForObject("select count(*) from \"Users\" Where \"userId\" = '" + userId + "'", new IntegerMapper("count"));
       if(userCount == 1 ) {
           getUser = template.queryForObject("SELECT \"userId\", \"userName\" FROM \"Users\" WHERE \"userId\"='" + userId + "'", new UserMapper());
       }
       else {

            throw new InvalidUserIdException("User id does not exist or invalid");
        }

        return getUser;
    }


    @Override
    public List<User> getUsersByUserName(String userName) throws InvalidUserNameException {
        if(userName == null){
            throw new InvalidUserNameException("User name can not be null");
        }
        List<User> users = template.query(
                "SELECT \"userId\", \"userName\" FROM \"Users\" WHERE \"userName\" = ?;",
                new UserMapper(), userName);

        return users;
    }


    @Override
    public int updateUser( User user) throws InvalidUserIdException, NullUserException {

        if(user == null){
            throw new NullUserException("User can not be null!");
        }
        if(user.getUserId() == null){
            throw new InvalidUserIdException("User id can not be null!");
        }

        int userUpdate = template.update("UPDATE \"Users\" " +
                "SET \"userName\" =?\n" +
                "WHERE \"userId\" = ?;",
                user.getUserName(), user.getUserId());
            return userUpdate;
    }

    @Override
    public int deleteUser(Integer userId) throws InvalidUserIdException {
        if(userId == null){
            throw new InvalidUserIdException("User id can not be null!");
        }

        int delete;
        int userCount = template.queryForObject("select count(*) from \"Users\" Where \"userId\" = '" + userId + "'", new IntegerMapper("count"));

        if (userCount == 1) {
            delete = template.update("DELETE FROM \"Users\" WHERE \"userId\" = ?;", userId);
        }
        else {
            throw new InvalidUserIdException("User with this id does not exist or was deleted");
        }
        return delete;
    }

    @Override
    public int getReport(Integer userId) throws NullUserException, InvalidUserIdException {

        if(userId == null){
            throw new InvalidUserIdException("User Id can not be null");
        }
        Integer savings;
        int userCount = template.queryForObject("select count(*) from \"Users\" Where \"userId\" = '" + userId + "'", new IntegerMapper("count"));
        if(userCount == 1 ) {
            savings = template.queryForObject("SELECT COALESCE(sum(\"incomeAmount\"), 0) - (SELECT COALESCE(SUM(\"expenseAmount\"), 0) " +
                    "FROM \"Expenses\" WHERE \"userId\" = ?)" +
                    "FROM \"Incomes\" WHERE \"userId\" = ?; \n",
                    new IntegerMapper("total"),
                    userId,
                    userId);

        }
        else {
            throw new InvalidUserIdException("User with this id does not exist.");
        }
        return savings;
    }

    @Override

    public List<User> getAllExpenseAndIncome(){
        List<User> allUsers = template.query("Select * From \"Expenses\" as \"Ex\", \"Incomes\" as \"In\" " +
                "where \"Ex\".\"userId\" = \"In\".\"userId\"", new fullUserMapper());

        return allUsers;
    }



    @Override
    public List<User> getAllExpenseAndIncomeByUserId(Integer userId) throws InvalidUserIdException {
        if (userId == null) {
            throw new InvalidUserIdException("User id can not be null!");
        }
        List<User> getUser;
        int userCount = template.queryForObject("select count(*) from \"Users\" Where \"userId\" = '" + userId + "'", new IntegerMapper("count"));
        if (userCount == 1) {
                        getUser = template.query("Select *  From \"Expenses\", \"Incomes\"  where \"Expenses\".\"userId\"= '" + userId + "' AND \"Incomes\".\"userId\"= '" + userId +"' ", new fullUserMapper());
        } else {

            throw new InvalidUserIdException("User id does not exist or invalid");
        }
        return getUser;
    }

    @Override
    public List<User> getTotalExpenseAndIncomeByUserId(Integer userId) throws InvalidUserIdException {
        if (userId == null) {
            throw new InvalidUserIdException("User id can not be null!");
        }
        List<User> getUser;
        int userCount = template.queryForObject("select count(*) from \"Users\" Where \"userId\" = '" + userId + "'", new IntegerMapper("count"));
        if (userCount == 1) {
            getUser = template.query(

"Select sum(\"incomeAmount\"), sum(\"expenseAmount\"), \"Expenses\".\"spentDate\", \"Expenses\".\"userId\", \"Incomes\".\"userId\", \"Expenses\".\"expenseId\", \"Incomes\".\"incomeId\",\n" +
        "\"Expenses\".\"spentDate\", \"Incomes\".\"earnedDate\",\"Expenses\".\"category\", \"Incomes\".\"category\", \"Expenses\".\"description\", \"Incomes\".\"description\",\n" +
        "\"Expenses\".\"expenseAmount\", \"Incomes\".\"incomeAmount\"\n" +
        "From \"Expenses\", \"Incomes\"  where \"Expenses\".\"userId\"='"+userId+"' AND \"Incomes\".\"userId\"='"+userId+"' \n" +
        "Group by \"Expenses\".\"spentDate\", \"Expenses\".\"userId\", \"Incomes\".\"userId\", \"Expenses\".\"expenseId\", \"Incomes\".\"incomeId\",\"Expenses\".\"spentDate\", \"Incomes\".\"earnedDate\",\n" +
        "\"Expenses\".\"category\", \"Incomes\".\"category\", \"Expenses\".\"description\", \"Incomes\".\"description\",\"Expenses\".\"expenseAmount\", \"Incomes\".\"incomeAmount\"",
                    new fullUserMapper());
        } else {

            throw new InvalidUserIdException("User id does not exist or invalid");
        }
        return getUser;
    }


}
