package com.tp.UserMoneyManager.controllers;

import com.tp.UserMoneyManager.exceptions.*;
import com.tp.UserMoneyManager.models.Expense;
import com.tp.UserMoneyManager.services.MoneyManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ExpenseController {
    @Autowired
    MoneyManagerService service;

    @PostMapping("/expense")
    public ResponseEntity addExpense(@RequestBody Expense toAdd) {
        Expense toReturn = null;
        try{
            toReturn = service.addExpense(toAdd);
        }catch(InvalidExpenseException|  InvalidExpenseIdException|  InvalidUserIdException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.ok(toReturn);

    }

    @GetMapping("/expenses")
    public List<Expense> getAllExpenses(){
        return service.getAllExpenses();
    }

    @GetMapping("/expense/{expenseId}")
    public ResponseEntity getAllExpenseById(@PathVariable Integer expenseId){
        try{
            return ResponseEntity.ok(service.getAllExpenseById(expenseId));
        }catch(InvalidExpenseIdException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/expense/date/{spentDate}")
    public ResponseEntity getExpenseByDate(@DateTimeFormat(pattern = "yyyy-MM-dd") @PathVariable LocalDate spentDate){
        try{
            return ResponseEntity.ok(service.getExpenseByDate(spentDate));
        }catch(InvalidExpenseException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/expense/{expenseId}")
    public ResponseEntity updateExpense(@PathVariable Integer expenseId, @RequestBody Expense expense){
        try {
            return ResponseEntity.ok(service.updateExpense(expenseId, expense));
        } catch (InvalidExpenseIdException | InvalidExpenseException | InvalidUserIdException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/expense/{expenseId}")
    public String deleteExpense(@PathVariable Integer expenseId){
        try{
            service.deleteExpense(expenseId);
            return "Expense with id " + expenseId + " successfully deleted.";
        }catch (InvalidExpenseIdException e){
            return e.getMessage();
        }
    }

    @GetMapping("expense/report")
    public ResponseEntity getExpenseReport(@RequestBody Expense expense){
        try {
            return ResponseEntity.ok(service.getExpenseReport(expense));
        }
        catch (InvalidUserIdException | InvalidExpenseException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //    @GetMapping("/expense/amount/{expenseAmount}")
//    public ResponseEntity getExpenseByAmount(@PathVariable Double expenseAmount) {
//        try{
//            return ResponseEntity.ok(service.getExpenseByAmount(expenseAmount));
//        }catch(InvalidExpenseException e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

}
