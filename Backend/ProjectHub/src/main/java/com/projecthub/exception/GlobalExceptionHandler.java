package com.projecthub.exception;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
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
	    public ResponseEntity<MyErrorDetails> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex, WebRequest wb) {
			
			List<ObjectError> allErrors     = ex.getBindingResult().getAllErrors();
	        List<String>      errorMessages = MethodArgumentNotValidException.errorsToStringList(allErrors);
//	        System.out.println("From MethodArgumentNotValidException ");
			return new ResponseEntity<MyErrorDetails>(new MyErrorDetails(
					LocalDateTime.now(),
					String.join(", ", errorMessages),
					wb.getDescription(false)
					),
					HttpStatus.BAD_REQUEST);
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
	    
	    @ExceptionHandler(DataIntegrityViolationException.class)
		public ResponseEntity<MyErrorDetails> duplicateExceptionHandler(DataIntegrityViolationException ex, WebRequest wb){

			org.hibernate.exception.ConstraintViolationException cause =
	              (org.hibernate.exception.ConstraintViolationException) ex.getCause();
			
			String errMessage = cause.getSQLException().getMessage();
			
			System.out.println(errMessage);
			
			return new ResponseEntity<MyErrorDetails>(new MyErrorDetails(
					LocalDateTime.now(),
					errMessage,
					wb.getDescription(false)
					),
					HttpStatus.BAD_REQUEST);
		}
//		@ExceptionHandler(DataIntegrityViolationException.class)
//	    public ResponseEntity<String> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
//	        if (ex.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
//	            org.hibernate.exception.ConstraintViolationException cause =
//	                    (org.hibernate.exception.ConstraintViolationException) ex.getCause();
//	            
//	            if (cause.getErrorCode() == 1062) {
//	                // MySQL duplicate entry error code
//	                String errorMessage = "Duplicate entry found for email: " + cause.getSQLException().getMessage();
//	                return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
//	            }
//	        }
//	        
//	        // Handle other DataIntegrityViolationException cases if needed
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing your request.");
//	    }

}
