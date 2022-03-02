package com.niclas.rest.exceptionHandling.exception;

public class URLErrorException extends Exception {
    public URLErrorException(String errorMsg){
        super(errorMsg);
    }
}
