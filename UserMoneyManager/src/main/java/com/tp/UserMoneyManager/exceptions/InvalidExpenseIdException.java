package com.tp.UserMoneyManager.exceptions;

public class InvalidExpenseIdException extends Exception{
    public InvalidExpenseIdException(String message){
        super(message);
    }
    public InvalidExpenseIdException(String message, Throwable innerException){
        super(message, innerException);
    }
}
