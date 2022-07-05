package com.niclas.mail;

import java.util.Arrays;
import java.util.Properties;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

import com.niclas.model.Department;
import com.niclas.model.Order;
import com.niclas.repository.DepartmentRepository;
import com.niclas.rest.exceptionHandling.exception.DepartmentNotFoundException;

import sendinblue.ApiClient;
import sendinblue.ApiException;
import sendinblue.Configuration;
import sendinblue.auth.ApiKeyAuth;
import sibApi.TransactionalEmailsApi;
import sibModel.CreateSmtpEmail;
import sibModel.SendSmtpEmail;
import sibModel.SendSmtpEmailTo;


@Component
public class SendOrderSuccessMail {

    private final DepartmentRepository departmentRepository;


    public SendOrderSuccessMail( DepartmentRepository departmentRepository ) {
        this.departmentRepository = departmentRepository;
    }


    private final String EMAIL = "EMAIL";

    private final String FIRSTNAME = "FIRSTNAME";

    private final String LASTNAME = "LASTNAME";

    private final String ORDER_ID = "ORDER_ID";

    private final String DEPARTMENT_NAME = "DEPARTMENT_NAME";

    private final String DEPARTMENT_STREET = "DEPARTMENT_STREET";

    private final String DEPARTMENT_HOUSE_NUMBER = "DEPARTMENT_HOUSENUMBER";

    private final String DEPARTMENT_POSTAL_CODE = "DEPARTMENT_POSTALCODE";

    private final String DEPARTMENT_LOCATION = "DEPARTMENT_LOCATION";


    private SendSmtpEmail buildSmtpMail( Order order ) throws DepartmentNotFoundException {
        Department department = getDepartment( order.getDepartmentId() );

        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail();

        sendSmtpEmail.setTemplateId( 1L );

        //to
        SendSmtpEmailTo sendSmtpEmailTo = new SendSmtpEmailTo();
        sendSmtpEmailTo.setEmail( department.getContact().getMail() );
        sendSmtpEmailTo.setName( department.getContactFullName() );
        sendSmtpEmail.setTo( Arrays.asList( sendSmtpEmailTo ) );
        sendSmtpEmail.setParams( buildParams( order, department ) );

        return sendSmtpEmail;
    }


    private Properties buildParams( Order order, Department department ) {
        Properties properties = new Properties();
        properties.setProperty( EMAIL, department.getContact().getMail() );
        properties.setProperty( ORDER_ID, order.getOrderId() );
        properties.setProperty( FIRSTNAME, department.getContact().getFirstname() );
        properties.setProperty( LASTNAME, department.getContact().getLastname() );
        return properties;
    }


    private Department getDepartment( ObjectId departmentId ) throws DepartmentNotFoundException {
        return departmentRepository.findDepartmentByIdAndDeletedIsFalse( departmentId )
                .orElseThrow( () -> new DepartmentNotFoundException( departmentId ) );
    }


    public void sendMail( Order order ) throws DepartmentNotFoundException {
        ApiClient apiClient = Configuration.getDefaultApiClient();

        ApiKeyAuth apiKey = (ApiKeyAuth)apiClient.getAuthentication( "api-key" );
        apiKey.setApiKey( "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" );

        TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();

        SendSmtpEmail sendSmtpEmail = buildSmtpMail( order );

        try {
            CreateSmtpEmail result = apiInstance.sendTransacEmail( sendSmtpEmail );
            System.out.println( result );
        }
        catch( ApiException e ) {
            System.err.println( "Exception when calling TransactionalEmailsApi#sendTransacEmail" );
            e.printStackTrace();
        }
    }
}
