package com.tp.UserMoneyManager.models;

import java.time.LocalDate;

public class Expense {
    Integer expenseId;
    Double expenseAmount;
    String description;
    LocalDate spentDate;
    Integer userId;

    public Expense(){

    }
    public Expense(Integer expenseId, Integer userId, Double expenseAmount, String description, LocalDate spentDate){
        this.expenseId = expenseId;
        this.userId = userId;
        this.expenseAmount = expenseAmount;
        this.description = description;
        this.spentDate = spentDate;
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

}
