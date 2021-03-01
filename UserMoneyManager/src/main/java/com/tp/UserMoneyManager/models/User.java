package com.tp.UserMoneyManager.models;

public class User {
    Integer userId;
    String userName;
    Expense associatedExpense;
    Income associatedIncome;

    public Expense getAssociatedExpense() {
        return associatedExpense;
    }

    public void setAssociatedExpense(Expense associatedExpense) {
        this.associatedExpense = associatedExpense;
    }

    public Income getAssociatedIncome() {
        return associatedIncome;
    }

    public void setAssociatedIncome(Income associatedIncome) {
        this.associatedIncome = associatedIncome;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
