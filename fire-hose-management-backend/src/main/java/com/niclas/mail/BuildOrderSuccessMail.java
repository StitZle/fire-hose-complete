package com.niclas.mail;

import com.niclas.model.Department;
import com.niclas.model.Order;
import com.niclas.model.OrderDevice;
import com.niclas.repository.DepartmentRepository;
import com.niclas.rest.exceptionHandling.exception.DepartmentNotFoundException;
import com.niclas.utils.Gender;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;
import sibModel.SendSmtpEmail;
import sibModel.SendSmtpEmailTo;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import static com.niclas.utils.Gender.*;


@Component
public class BuildOrderSuccessMail {

    private final DepartmentRepository departmentRepository;


    public BuildOrderSuccessMail( DepartmentRepository departmentRepository ) {
        this.departmentRepository = departmentRepository;
    }

    private final String REGISTERED_ORGANISATION = "REGISTERED_ORGANISATION";

    private final String ORGANISATION_NAME = "ORGANISATION_NAME";
    private final String EMAIL = "EMAIL";
    private final String SALUTATION = "SALUTATION";
    private final String FIRSTNAME = "FIRSTNAME";
    private final String LASTNAME = "LASTNAME";
    private final String ORDER_ID = "ORDER_ID";
    private final String DEVICES = "DEVICES";
    private final String DEPARTMENT_NAME = "DEPARTMENT_NAME";
    private final String DEPARTMENT_STREET = "DEPARTMENT_STREET";
    private final String DEPARTMENT_HOUSE_NUMBER = "DEPARTMENT_HOUSENUMBER";
    private final String DEPARTMENT_POSTAL_CODE = "DEPARTMENT_POSTALCODE";
    private final String DEPARTMENT_LOCATION = "DEPARTMENT_LOCATION";
    private final String NOTES = "NOTES";
    private final String SENDER_FIRSTNAME = "SENDER_FIRSTNAME";
    private final String SENDER_LASTNAME = "SENDER_LASTNAME";
    private final String DATE = "DATE";

    public SendSmtpEmail buildOrderSuccessMail( Order order ) throws DepartmentNotFoundException {


        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail();
        SendSmtpEmailTo sendSmtpEmailTo = new SendSmtpEmailTo();
        sendSmtpEmail.setTemplateId( 1L );

        if( order.getDepartmentId() != null ) {
            Department department = getDepartment( order.getDepartmentId() );

            //to
            sendSmtpEmailTo.setEmail( department.getContact().getMail() );
            sendSmtpEmailTo.setName( department.getContactFullName() );

            //params
            sendSmtpEmail.setParams( buildRegisteredOrganisationParams( order, department ) );
        }
        else {
            sendSmtpEmailTo.setEmail( order.getOrderContact().getMail() );
            sendSmtpEmailTo.setName( order.getOrderContact().getFullName() );

            //params
            sendSmtpEmail.setParams( buildNonRegisteredOrganisationParams( order ) );
        }

        sendSmtpEmail.setTo( Arrays.asList( sendSmtpEmailTo ) );

        return sendSmtpEmail;
    }


    private HashMap<String, Object> buildRegisteredOrganisationParams( Order order, Department department ) {
        HashMap<String, Object> params = new HashMap<>();
        params.put( REGISTERED_ORGANISATION, true );

        params.put( EMAIL, department.getContact().getMail() );
        params.put( ORDER_ID, order.getOrderId() );
        params.put( DEVICES, buildDeviceList( order.getDevices() ) );

        params.put( SALUTATION, buildSalutation( department.getContact().getGender() ) );
        params.put( FIRSTNAME, department.getContact().getFirstname() );
        params.put( LASTNAME, department.getContact().getLastname() );

        params.put( DEPARTMENT_NAME, department.getDepartmentName() );
        params.put( DEPARTMENT_STREET, department.getStreet() );
        params.put( DEPARTMENT_HOUSE_NUMBER, department.getHouseNumber() );
        params.put( DEPARTMENT_POSTAL_CODE, department.getPostalCode() );
        params.put( DEPARTMENT_LOCATION, department.getLocation() );

        params.put( NOTES, buildNotes( order.getNotes() ) );

        params.put( SENDER_FIRSTNAME, order.getSenderFirstname() );
        params.put( SENDER_LASTNAME, order.getSenderLastname() );
        params.put( DATE, buildDateToString( order.getCreatedAt() ) );

        return params;
    }


    private HashMap<String, Object> buildNonRegisteredOrganisationParams( Order order ) {
        HashMap<String, Object> params = new HashMap<>();
        params.put( REGISTERED_ORGANISATION, false );

        params.put( EMAIL, order.getOrderContact().getMail() );
        params.put( ORDER_ID, order.getOrderId() );
        params.put( DEVICES, buildDeviceList( order.getDevices() ) );

        params.put( SALUTATION, buildSalutation( order.getOrderContact().getGender() ) );
        params.put( FIRSTNAME, order.getOrderContact().getFirstname() );
        params.put( LASTNAME, order.getOrderContact().getLastname() );

        params.put( ORGANISATION_NAME, order.getOrderContact().getOrganisation() );

        params.put( NOTES, buildNotes( order.getNotes() ) );

        params.put( SENDER_FIRSTNAME, order.getSenderFirstname() );
        params.put( SENDER_LASTNAME, order.getSenderLastname() );
        params.put( DATE, buildDateToString( order.getCreatedAt() ) );

        return params;
    }


    private Department getDepartment( ObjectId departmentId ) throws DepartmentNotFoundException {
        return departmentRepository.findDepartmentByIdAndDeletedIsFalse( departmentId ).orElseThrow( () -> new DepartmentNotFoundException( departmentId ) );
    }


    private String buildSalutation( Enum<Gender> genderEnum ) {

        if( MALE.equals( genderEnum ) ) {
            return "Sehr geehrter Herr";
        }
        else if( FEMALE.equals( genderEnum ) ) {
            return "Sehr geehrte Frau";
        }
        else if( OTHER.equals( genderEnum ) ) {
            return "Sehr geehrte*r";
        }
        return "Sehr geehrte*r";
    }


    private List<OrderMailDevice> buildDeviceList( List<OrderDevice> devices ) {
        List<OrderMailDevice> orderMailDevices = new ArrayList<>();

        devices.forEach( device -> {
            orderMailDevices.add( new OrderMailDevice( device.getDeviceName(), device.getCount() ) );
        } );

        return orderMailDevices;
    }


    private String buildNotes( String notes ) {
        if( notes != null ) {
            return notes;
        }
        return "-";
    }

    private String buildDateToString( Date date ) {
        String pattern = "dd/MM/yyyy HH:mm:ss";
        DateFormat df = new SimpleDateFormat( pattern );
        return df.format( date );
    }

    private static class OrderMailDevice {
        private String deviceName;

        private int count;


        public OrderMailDevice( String deviceName, int count ) {
            this.deviceName = deviceName;
            this.count = count;
        }


        public void setDeviceName( String deviceName ) {
            this.deviceName = deviceName;
        }


        public void setCount( int count ) {
            this.count = count;
        }
    }

}
