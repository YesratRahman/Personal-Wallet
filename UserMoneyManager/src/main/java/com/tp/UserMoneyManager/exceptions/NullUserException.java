package com.tp.UserMoneyManager.exceptions;

public class NullUserException extends Exception{
    public NullUserException(String s){
        super(s);
    }
    public NullUserException(String s, Throwable innerEx){
        super(s, innerEx);
    }
}
