package com.tp.UserMoneyManager.exceptions;

public class InvalidIncomeIdException extends Exception{
    public InvalidIncomeIdException(String message){
        super(message);
    }
    public InvalidIncomeIdException(String message, Throwable innerException){
        super(message, innerException);
    }
}
