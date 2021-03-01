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
public class UserController {

    @Autowired
    MoneyManagerService service;

    @PostMapping("/user")
    public ResponseEntity addUser(@RequestBody User toAdd) throws InvalidUserNameException, NullUserException {
        User completed = service.addUser(toAdd);
        return ResponseEntity.ok(completed);
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

    @PutMapping("/user/update/{userId}")
    public ResponseEntity updateUser(@PathVariable Integer userId, @RequestBody User user){
        try {
            return ResponseEntity.ok(service.updateUser(userId, user));
        } catch (InvalidUserIdException | NullUserException | InvalidUserNameException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/user/delete/{userId}")
    public String deleteUser(@PathVariable Integer userId){
        try{
            service.deleteUser(userId);
            return "User with id " + userId + " successfully deleted.";
        }catch (InvalidUserIdException e){
            return e.getMessage();
        }
    }

    @GetMapping("/user/transactionReport/{userId}")
    public ResponseEntity getReport(@PathVariable Integer userId,  User user){
        try{
            return ResponseEntity.ok(service.getReport(userId, user));
        }catch (NullUserException | InvalidUserIdException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
