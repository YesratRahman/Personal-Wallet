package com.tp.UserMoneyManager.daos;

import com.tp.UserMoneyManager.daos.postGresDaos.UserPostgresDao;
import com.tp.UserMoneyManager.exceptions.InvalidUserIdException;
import com.tp.UserMoneyManager.exceptions.NullUserException;
import com.tp.UserMoneyManager.exceptions.InvalidUserNameException;
import com.tp.UserMoneyManager.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@ActiveProfiles("daoTesting")
public class PostgresUserDaoTests {

    @Autowired
    UserPostgresDao toTest;

    @Autowired
    JdbcTemplate template;


    @BeforeEach
    public void setUp(){
        template.update("TRUNCATE \"IncomeReports\", \"ExpenseReports\", \"Reports\", \"Expenses\", \"Incomes\", \"Users\" RESTART IDENTITY; \n");
        template.update("INSERT INTO \"Users\" (\"userName\") VALUES ('Yesrat')");

    }

    @Test
    public void addUserGoldenPathTest() throws InvalidUserNameException, NullUserException {
        User user = new User();
        user.setUserName("Raha");

        User newUser = toTest.addUser(user);
        assertEquals(2, newUser.getUserId());
        assertEquals("Raha", user.getUserName());

        List<User> allUsers = toTest.getAllUsers();

        assertEquals(1, allUsers.get(0).getUserId());
        assertEquals("Yesrat", allUsers.get(0).getUserName());
        assertEquals("Raha", allUsers.get(1).getUserName());
    }

    @Test
    public void getAllUserGoldenPathTest(){
       List<User> copy = toTest.getAllUsers();

        assertEquals(1, copy.size());
        assertEquals("Yesrat", copy.get(0).getUserName());
    }

    @Test
    public void getUserByNullIdTest(){
        assertThrows(InvalidUserIdException.class, ()->toTest.getAllUsersById(null));
    }

    @Test
    public void getAllUserByInvalidId() {

        assertThrows(InvalidUserIdException.class, ()->toTest.getAllUsersById(-1));

    }


    @Test
    public void addNullUserTest(){
        assertThrows(NullUserException.class, () ->toTest.addUser(null));
    }

//    @Test
//    public void addUserNullNameTest(){
//        User user = new User();
//        user.setUserName(null);
//        assertThrows(InvalidUserNameException.class, () ->toTest.addUser(user));
//    }


    @Test
    public void getUserByNullName(){
        assertThrows(InvalidUserNameException.class, ()->toTest.getUsersByUserName(null));
    }

//    @Test
//    public void getUserByEmptyName(){
//        assertThrows(InvalidUserNameException.class, ()->toTest.getUsersByUserName(""));
//    }
//
//    @Test
//    public void getUserByBlankName(){
//        assertThrows(InvalidUserNameException.class, ()->toTest.getUsersByUserName(" "));
//    }

    @Test
    public void updateUserGoldenPath() throws InvalidUserNameException, NullUserException, InvalidUserIdException {
        User user = toTest.getAllUsersById(1);
        user.setUserName("Polly");

        int in = toTest.updateUser(user.getUserId(), user);

        assertEquals(1, in);
        assertEquals("Polly", toTest.getAllUsers().get(0).getUserName());
    }

    @Test
    public void updateUserNullUserId() throws InvalidUserIdException, NullUserException, InvalidUserNameException {
        User user = toTest.getAllUsersById(1);
        user.setUserName("Polly");

        int in = toTest.updateUser(user.getUserId(), user);
        assertThrows(InvalidUserIdException.class, ()->toTest.updateUser(null, user));
    }

    @Test
    public void updateUserNullUser() throws InvalidUserIdException, NullUserException, InvalidUserNameException {
        User user = toTest.getAllUsersById(1);
        user.setUserName("Polly");

        int in = toTest.updateUser(user.getUserId(), user);
        assertThrows(NullUserException.class, ()->toTest.updateUser(1, null));
    }

//    @Test
//    public void updateUserNullUserName() {
//        User user = toTest.getAllUsers().get(0);
//        user.setUserName(null);
//
//        assertThrows(InvalidUserNameException.class, () -> toTest.updateUser(1, user));
//    }
//    @Test
//    public void updateUserEmptyUserName() {
//        User user = toTest.getAllUsers().get(0);
//        user.setUserName("");
//
//        assertThrows(InvalidUserNameException.class, () -> toTest.updateUser(1, user));
//    }
//    @Test
//    public void updateUserBlankUserName() {
//        User user = toTest.getAllUsers().get(0);
//        user.setUserName(" ");
//
//        assertThrows(InvalidUserNameException.class, () -> toTest.updateUser(1, user));
//    }

    @Test
    public void deleteUserGoldenPathTest(){
        try{
            toTest.deleteUser(1);
            assertEquals(0, toTest.getAllUsers().size());
        }catch (InvalidUserIdException e){
            fail();
        }
    }
    @Test
    public void deleteUserNullId(){
        assertThrows(InvalidUserIdException.class, ()->toTest.deleteUser(null));
    }

    @Test
    public void deleteUserInvalidId(){

        assertThrows(InvalidUserIdException.class, ()->toTest.deleteUser(-1));
    }
}
