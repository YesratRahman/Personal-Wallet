package com.tp.UserMoneyManager.models;

import java.time.LocalDate;

public class ExpenseIncomeDate {
    int incomeSum;
    int expenseSum;
    LocalDate spentDate;
    LocalDate earnedDate;

    public ExpenseIncomeDate(){

    }

    public int getIncomeSum() {
        return incomeSum;
    }

    public void setIncomeSum(int incomeSum) {
        this.incomeSum = incomeSum;
    }

    public int getExpenseSum() {
        return expenseSum;
    }

    public void setExpenseSum(int expenseSum) {
        this.expenseSum = expenseSum;
    }

    public LocalDate getSpentDate() {
        return spentDate;
    }

    public void setSpentDate(LocalDate spentDate) {
        this.spentDate = spentDate;
    }

    public LocalDate getEarnedDate() {
        return earnedDate;
    }

    public void setEarnedDate(LocalDate earnedDate) {
        this.earnedDate = earnedDate;
    }
}
