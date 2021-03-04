package com.tp.UserMoneyManager.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Income {
    Integer incomeId;
    Integer userId;
    Double incomeAmount;
    String description;
    LocalDate earnedDate;
    List<User> user;
    String category;



    public Income(){

    }

    public Income(Integer incomeId, Integer userId, Double incomeAmount, String description, LocalDate earnedDate, String category) {
        this.incomeId = incomeId;
        this.userId = userId;
        this.incomeAmount = incomeAmount;
        this.description = description;
        this.earnedDate = earnedDate;
        this.category = category;
    }

    public Income(Income that){
        this.incomeId = incomeId;
        this.incomeAmount = incomeAmount;
        this.description = description;
        this.earnedDate = earnedDate;
        this.category = that.category;;
        this.user =new ArrayList<>();
        for(User toCopy : that.user){
            this.user.add(toCopy);
        }
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<User> getUser() {
        return user;
    }

    public void setUser(List<User> user) {
        this.user = user;
    }

    public LocalDate getEarnedDate() {
        return earnedDate;
    }

    public void setEarnedDate(LocalDate earnedDate) {
        this.earnedDate = earnedDate;
    }

    public Integer getIncomeId() {
        return incomeId;
    }

    public void setIncomeId(Integer incomeId) {
        this.incomeId = incomeId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Double getIncomeAmount() {
        return incomeAmount;
    }

    public void setIncomeAmount(Double incomeAmount) {
        this.incomeAmount = incomeAmount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



}
