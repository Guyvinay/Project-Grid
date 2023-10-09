package com.projecthub.exception;

public class InvalidArgumentsException extends RuntimeException {
	public InvalidArgumentsException() {
	}
	public InvalidArgumentsException(String str) {
		super(str);
	}
}
