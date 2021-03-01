package com.tp.UserMoneyManager.exceptions;

public class InvalidExpenseException extends Exception {
    public InvalidExpenseException(String s){
        super(s);
    }
    public InvalidExpenseException(String s, Throwable t){
        super(s, t);
    }
}
