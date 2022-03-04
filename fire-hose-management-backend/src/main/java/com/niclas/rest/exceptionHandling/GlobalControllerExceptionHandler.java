package com.niclas.rest.exceptionHandling;


import java.util.Date;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.niclas.rest.exceptionHandling.exception.DepartmentNotFoundException;
import com.niclas.rest.exceptionHandling.exception.OrderParamsOverload;
import com.niclas.rest.exceptionHandling.exception.URLErrorException;
import com.niclas.rest.exceptionHandling.messages.ErrorMessage;
import com.niclas.rest.exceptionHandling.messages.ValidationErrorResponse;
import com.niclas.rest.exceptionHandling.messages.Violation;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@ControllerAdvice
public class GlobalControllerExceptionHandler {

    @ExceptionHandler( HttpMessageNotReadableException.class )
    public ResponseEntity<ErrorMessage> HttpMessageNotReadableException( Exception e ) {
        ErrorMessage errorMessage = new ErrorMessage( new Date(), e.getClass().getSimpleName(), e.getMessage() );
        return new ResponseEntity<>( errorMessage, new HttpHeaders(), HttpStatus.BAD_REQUEST );
    }


    @ExceptionHandler( HttpRequestMethodNotSupportedException.class )
    public ResponseEntity<ErrorMessage> HttpRequestMethodNotSupportedException( Exception e ) {
        ErrorMessage errorMessage = new ErrorMessage( new Date(), e.getClass().getSimpleName(), e.getMessage() );
        return new ResponseEntity<>( errorMessage, new HttpHeaders(), HttpStatus.METHOD_NOT_ALLOWED );
    }


    @ExceptionHandler( { ConstraintViolationException.class, MethodArgumentNotValidException.class } )
    @ResponseStatus( HttpStatus.BAD_REQUEST )
    @ResponseBody
    public ValidationErrorResponse onConstraintViolationException( ConstraintViolationException e ) {
        ValidationErrorResponse errorResponse = new ValidationErrorResponse();
        for( ConstraintViolation violation : e.getConstraintViolations() ) {
            errorResponse.getViolationList()
                    .add( new Violation( violation.getPropertyPath().toString(), violation.getMessage() ) );
        }
        return errorResponse;
    }


    @ExceptionHandler( URLErrorException.class )
    public ResponseEntity<ErrorMessage> URLErrorException( Exception e ) {
        ErrorMessage errorMessage = new ErrorMessage( new Date(), e.getClass().getSimpleName(), e.getMessage() );
        return new ResponseEntity<>( errorMessage, new HttpHeaders(), HttpStatus.BAD_REQUEST );
    }


    @ExceptionHandler( DepartmentNotFoundException.class )
    public ResponseEntity<ErrorMessage> DepartmentNotFoundException( Exception e ) {
        ErrorMessage errorMessage = new ErrorMessage( new Date(), e.getClass().getSimpleName(), e.getMessage() );
        return new ResponseEntity<>( errorMessage, new HttpHeaders(), HttpStatus.NOT_FOUND );
    }


    @ExceptionHandler( OrderParamsOverload.class )
    public ResponseEntity<ErrorMessage> OrderStatusNotFoundException( Exception e ) {
        ErrorMessage errorMessage = new ErrorMessage( new Date(), e.getClass().getSimpleName(), e.getMessage() );
        return new ResponseEntity<>( errorMessage, new HttpHeaders(), HttpStatus.BAD_REQUEST );
    }


    @ExceptionHandler( value = { Exception.class } )
    public ResponseEntity<ErrorMessage> exceptionHandler( Exception e ) {
        log.error( "An Error has occurred", e );
        ErrorMessage errorMessage = new ErrorMessage( new Date(), e.getClass().getSimpleName(), e.getMessage() );
        return new ResponseEntity<>( errorMessage, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR );
    }
}
