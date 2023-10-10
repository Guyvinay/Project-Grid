package com.projecthub.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {  // Exception Handler
	
	   @ExceptionHandler(DuplicateEntryException.class)
	    public ResponseEntity<MyErrorDetails> handleDuplicateEntryException(DuplicateEntryException ex, WebRequest req) {
	        MyErrorDetails err = new MyErrorDetails();
	        err.setTimestamp(LocalDateTime.now());
	        err.setMessage("Duplicate Entry : " + ex.getMessage());
	        err.setDetails(req.getDescription(false));
	        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
	    }
	 
	    @ExceptionHandler(InvalidArgumentsException.class)
	    public ResponseEntity<MyErrorDetails> handleInvalidArgumentsException(InvalidArgumentsException ex, WebRequest req) {
	        MyErrorDetails err = new MyErrorDetails();
	        err.setTimestamp(LocalDateTime.now());
	        err.setMessage("Invalid Argument passed " + ex.getMessage());
	        err.setDetails(req.getDescription(false));
	        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
	    }

	    @ExceptionHandler(InvalidUserException.class)
	    public ResponseEntity<MyErrorDetails> handleInvalidAppointmentException(InvalidUserException ex, WebRequest req) {
	        MyErrorDetails err = new MyErrorDetails();
	        err.setTimestamp(LocalDateTime.now());
	        err.setMessage("Invalid User: " + ex.getMessage());
	        err.setDetails(req.getDescription(false));
	        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
	    }
	    
	    @ExceptionHandler(UnauthorizedAccessException.class)
	    public ResponseEntity<MyErrorDetails> handleUnauthorizedAccessException(UnauthorizedAccessException ex, WebRequest req) {
	        MyErrorDetails err = new MyErrorDetails();
	        err.setTimestamp(LocalDateTime.now());
	        err.setMessage("Unauthorized access: " + ex.getMessage());
	        err.setDetails(req.getDescription(false));
	        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
	    }
	    
	    @ExceptionHandler(NoHandlerFoundException.class)
	    public ResponseEntity<MyErrorDetails> noHandlerExceptionHandler(NoHandlerFoundException ex, WebRequest req) {
	        MyErrorDetails err = new MyErrorDetails();
	        err.setTimestamp(LocalDateTime.now());
	        err.setMessage("There is no handler for this endpoint: " + req.getDescription(false));
	        err.setDetails(req.getDescription(false));
	        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
	    }

	    @ExceptionHandler(MethodArgumentNotValidException.class)
	    public ResponseEntity<MyErrorDetails> notValidExceptionHandler(MethodArgumentNotValidException ex, WebRequest req) {
	        MyErrorDetails err = new MyErrorDetails();
	        System.out.println("Hii");
	        err.setTimestamp(LocalDateTime.now());
	        err.setMessage("Validation failed: " + ex.getMessage());
	        err.setDetails(req.getDescription(false));
//	        err.setDetails(ex.getBindingResult().getFieldError().getDefaultMessage());
	        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
	    }

	    @ExceptionHandler(Exception.class)
	    public ResponseEntity<MyErrorDetails> GeneralExceptionHandler(Exception se, WebRequest req){
	    	MyErrorDetails err= new MyErrorDetails();
	    	err.setTimestamp(LocalDateTime.now());
	    	log.info("From Exception.class Global Exception Handler");
	    	err.setMessage(se.getMessage());
	    	err.setDetails(req.getDescription(false));
	    	return new ResponseEntity<MyErrorDetails>(err, HttpStatus.BAD_REQUEST) ;
	    }
	

}
