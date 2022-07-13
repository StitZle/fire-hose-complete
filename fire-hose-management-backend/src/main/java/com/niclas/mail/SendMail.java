package com.niclas.mail;

import com.niclas.model.Order;
import com.niclas.rest.exceptionHandling.exception.DepartmentNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
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

    @Value( "${sendingblue.api.key}" )
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
            log.error( "Could not send order success mail: " + e.getMessage() );
            log.error( "Exception when calling TransactionalEmailsApi#sendTransacEmail" );
        }
    }
}
