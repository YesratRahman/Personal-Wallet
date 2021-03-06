package com.tp.UserMoneyManager.controllers;

import com.tp.UserMoneyManager.exceptions.InvalidExpenseException;
import com.tp.UserMoneyManager.exceptions.InvalidIncomeException;
import com.tp.UserMoneyManager.exceptions.InvalidIncomeIdException;
import com.tp.UserMoneyManager.exceptions.InvalidUserIdException;
import com.tp.UserMoneyManager.models.Income;
import com.tp.UserMoneyManager.services.MoneyManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class IncomeController {

    @Autowired
    MoneyManagerService service;

    @PostMapping("/addIncome")
    public ResponseEntity addIncome(@RequestBody Income toAdd) {
        Income completed = null;
        try{
            completed = service.addIncome(toAdd);
            return ResponseEntity.ok(completed);
        }catch(InvalidUserIdException | InvalidIncomeException | InvalidIncomeIdException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/incomes")
    public List<Income> getAllIncomes(){
        return service.getAllIncomes();
    }

    @GetMapping("/income/{incomeId}")
    public ResponseEntity getAllIncomeById(@PathVariable Integer incomeId){
        try{
            return ResponseEntity.ok(service.getAllIncomeById(incomeId));
        }catch(InvalidIncomeIdException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



//    @GetMapping("/income/amount/{incomeAmount}")
//    public ResponseEntity getIncomeByAmount(@PathVariable Double incomeAmount) {
//        try{
//            return ResponseEntity.ok(service.getIncomeByAmount(incomeAmount));
//        }catch(InvalidIncomeException e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @GetMapping("/userIncome/{userId}")
    public ResponseEntity getAllIncomeByUserId(@PathVariable Integer userId){
        try{
            return ResponseEntity.ok(service.getAllIncomeByUserId(userId));
        }catch(InvalidUserIdException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/income/date/{userId}/{earnedDate}")
    public ResponseEntity getIncomeByDate(@DateTimeFormat(pattern = "yyyy-MM-dd") @PathVariable LocalDate earnedDate, @PathVariable Integer userId){
        try{
            return ResponseEntity.ok(service.getIncomeByDate(earnedDate, userId));
        }catch(InvalidIncomeException | InvalidUserIdException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/income/year/{userId}/{earnedDate}")
    public ResponseEntity getIncomeByYear( @PathVariable Integer userId, @PathVariable Integer earnedDate){
        try{
            return ResponseEntity.ok(service.getIncomeByYear(userId, earnedDate));
        }catch(InvalidIncomeException | InvalidUserIdException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/updateIncome/{incomeId}")
    public ResponseEntity updateIncome(@PathVariable Integer incomeId, @RequestBody Income income){
        try {
            return ResponseEntity.ok(service.updateIncome(incomeId, income));
        } catch (InvalidIncomeIdException | InvalidIncomeException | InvalidUserIdException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/deleteIncome/{incomeId}")
    public String deleteIncome(@PathVariable Integer incomeId){
        try{
            service.deleteIncome(incomeId);
            return "Income with id " + incomeId + " successfully deleted.";
        }catch (InvalidIncomeIdException e){
            return e.getMessage();
        }
    }


    @GetMapping("/incomeReport/{userId}")
    public ResponseEntity getIncome(@PathVariable Integer userId){
        try {
            return ResponseEntity.ok(service.getIncomeReport(userId));
        }
        catch (InvalidUserIdException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/totalIncomeByCategory/{userId}")
    public ResponseEntity getIncomeByCategory( @PathVariable Integer userId) {
        try {
            return ResponseEntity.ok(service.getIncomeByCategory(userId));
        } catch (InvalidUserIdException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
