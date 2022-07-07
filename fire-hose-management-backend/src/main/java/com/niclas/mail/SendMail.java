package com.niclas.mail;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.niclas.model.Department;
import com.niclas.model.Order;
import com.niclas.model.OrderDevice;
import com.niclas.repository.DepartmentRepository;
import com.niclas.rest.exceptionHandling.exception.DepartmentNotFoundException;
import com.niclas.utils.Gender;

import lombok.extern.slf4j.Slf4j;
import sendinblue.ApiClient;
import sendinblue.ApiException;
import sendinblue.Configuration;
import sendinblue.auth.ApiKeyAuth;
import sibApi.TransactionalEmailsApi;
import sibModel.CreateSmtpEmail;
import sibModel.SendSmtpEmail;

@Slf4j
@Component
public class SendMail {

    @Value("${sendingblue.api.key}")
    private String sendingBlueApiKey;


    private final BuildOrderSuccessMail buildOrderSuccessMail;


    public SendMail( BuildOrderSuccessMail buildOrderSuccessMail ) {
        this.buildOrderSuccessMail = buildOrderSuccessMail;
    }


    public void sendMail( Order order ) throws DepartmentNotFoundException {
        ApiClient apiClient = Configuration.getDefaultApiClient();

        ApiKeyAuth apiKey = (ApiKeyAuth)apiClient.getAuthentication( "api-key" );
        apiKey.setApiKey( sendingBlueApiKey );

        TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();

        SendSmtpEmail sendSmtpEmail = buildOrderSuccessMail.buildOrderSuccessMail( order );

        try {
            CreateSmtpEmail result = apiInstance.sendTransacEmail( sendSmtpEmail );
            log.info( "Successful send order success mail: " + result.getMessageId() );
        }
        catch( ApiException e ) {
            log.error( "Could not send order success mail." + e.getMessage() );
            log.error( "Exception when calling TransactionalEmailsApi#sendTransacEmail" );
        }
    }
}
