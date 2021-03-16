package com.tp.UserMoneyManager.models;

public class IncomeCategory {

    String category;
    int totalIncomeByCategory;
    public IncomeCategory(){

    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getTotalIncomeByCategory() {
        return totalIncomeByCategory;
    }

    public void setTotalIncomeByCategory(int totalIncomeByCategory) {
        this.totalIncomeByCategory = totalIncomeByCategory;
    }
}