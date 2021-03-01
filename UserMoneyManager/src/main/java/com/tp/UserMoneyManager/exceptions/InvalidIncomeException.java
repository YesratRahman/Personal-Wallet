package com.tp.UserMoneyManager.exceptions;

public class InvalidIncomeException extends Exception{
    public InvalidIncomeException(String s){
        super(s);
    }
    public InvalidIncomeException(String s, Throwable t){
        super(s, t);
    }
}
