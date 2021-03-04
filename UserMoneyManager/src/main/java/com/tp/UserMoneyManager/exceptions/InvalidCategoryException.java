package com.tp.UserMoneyManager.exceptions;

public class InvalidCategoryException extends Exception {
    public InvalidCategoryException(String s){
        super(s);
    }
    public InvalidCategoryException(String s, Throwable t){
        super(s, t);
    }
}
