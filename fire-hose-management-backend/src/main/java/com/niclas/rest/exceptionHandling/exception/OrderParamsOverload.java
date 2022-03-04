package com.niclas.rest.exceptionHandling.exception;

public class OrderParamsOverload extends Exception {
    public OrderParamsOverload() {
        super();
    }

    public OrderParamsOverload(String errorMsg) {
        super(errorMsg);
    }
}
