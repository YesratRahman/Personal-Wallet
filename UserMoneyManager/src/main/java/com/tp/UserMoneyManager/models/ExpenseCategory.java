package com.tp.UserMoneyManager.models;

import java.time.LocalDate;

public class ExpenseCategory {

    String category;
    int totalExpenseByCategory;
    public ExpenseCategory(){

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
