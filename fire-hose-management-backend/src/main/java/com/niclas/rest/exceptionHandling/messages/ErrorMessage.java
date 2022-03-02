package com.niclas.rest.exceptionHandling.messages;

import lombok.Data;

import java.util.Date;


@Data
public class ErrorMessage
{
	private Date timestamp;
	private String error;
	private String message;


	public ErrorMessage(Date timestamp, String error, String message )
	{
		this.timestamp = timestamp;
		this.error = error;
		this.message = message;
	}

	public ErrorMessage(  )
	{
	}

}
