package com.niclas.rest.exceptionHandling.messages;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
public class ValidationErrorResponse
{
	private List<Violation> violationList = new ArrayList<>( );
}
