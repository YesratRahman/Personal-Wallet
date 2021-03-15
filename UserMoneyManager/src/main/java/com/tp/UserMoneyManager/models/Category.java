package com.tp.UserMoneyManager.models;

import java.time.LocalDate;

public class Category {

    String category;
    int totalExpenseByCategory;
    public Category(){

    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getTotalExpenseByCategory() {
        return totalExpenseByCategory;
    }

    public void setTotalExpenseByCategory(int totalExpenseByCategory) {
        this.totalExpenseByCategory = totalExpenseByCategory;
    }
}
