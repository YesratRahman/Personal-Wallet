package com.tp.UserMoneyManager.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Expense {
    Integer expenseId;
    Double expenseAmount;
    String description;
    LocalDate spentDate;
    Integer userId;
    List<User> user;



    public Expense(){

    }
    public Expense(Integer expenseId, Integer userId, Double expenseAmount, String description, LocalDate spentDate){
        this.expenseId = expenseId;
        this.userId = userId;
        this.expenseAmount = expenseAmount;
        this.description = description;
        this.spentDate = spentDate;
    }

    public Expense(Expense that){
        this.expenseId = expenseId;
        this.expenseAmount = expenseAmount;
        this.description = description;
        this.spentDate = spentDate;
        this.user =new ArrayList<>();
        for(User toCopy : that.user){
            this.user.add(toCopy);
        }
    }

    public Integer getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(Integer expenseId) {
        this.expenseId = expenseId;
    }

    public Double getExpenseAmount() {
        return expenseAmount;
    }

    public void setExpenseAmount(Double expenseAmount) {
        this.expenseAmount = expenseAmount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getSpentDate() {
        return spentDate;
    }

    public void setSpentDate(LocalDate spentDate) {
        this.spentDate = spentDate;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public List<User> getUser() {
        return user;
    }

    public void setUser(List<User> user) {
        this.user = user;
    }
}
