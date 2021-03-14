package com.tp.UserMoneyManager.controllers;

import com.tp.UserMoneyManager.exceptions.InvalidUserIdException;
import com.tp.UserMoneyManager.exceptions.InvalidUserNameException;

import com.tp.UserMoneyManager.exceptions.NullUserException;
import com.tp.UserMoneyManager.models.User;
import com.tp.UserMoneyManager.services.MoneyManagerService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    @Autowired
    MoneyManagerService service;

    @PostMapping("/addUser")
    public ResponseEntity addUser(@RequestBody User toAdd)  {
        User completed = null;
        try{
            completed =  service.addUser(toAdd);
            return ResponseEntity.ok(completed);
        }catch(InvalidUserNameException | NullUserException e ){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return service.getAllUsers();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity getUsersById(@PathVariable Integer userId){
        try{
            return ResponseEntity.ok(service.getAllUsersById(userId));
        }catch(InvalidUserIdException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/userName/{userName}")
    public ResponseEntity getUsersByUserName(@PathVariable String userName)  {
        try{
            return ResponseEntity.ok(service.getUsersByUserName(userName));
        }catch(InvalidUserNameException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/updateUser/{userId}")
    public ResponseEntity updateUser( @RequestBody User user){

        try {
            return ResponseEntity.ok(service.updateUser( user));
        } catch (InvalidUserIdException | NullUserException | InvalidUserNameException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/deleteUser/{userId}")
    public String deleteUser(@PathVariable Integer userId){
        try{
            service.deleteUser(userId);
            return "User with id " + userId + " successfully deleted.";
        }catch (InvalidUserIdException e){
            return e.getMessage();
        }
    }

    @GetMapping("/user/transactionReport/{userId}")
    public ResponseEntity getReport(@PathVariable Integer userId){
        try{
            return ResponseEntity.ok(service.getReport(userId));
        }catch (NullUserException | InvalidUserIdException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/expenseAndIncome")
    public ResponseEntity getAllExpenseAndIncome(){

            return ResponseEntity.ok(service.getAllExpenseAndIncome());

    }

}
