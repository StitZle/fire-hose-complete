package com.niclas.rest.exceptionHandling.messages;

import lombok.Data;


@Data
public class Violation
{
	private final String fieldName;
	private final String message;
}
