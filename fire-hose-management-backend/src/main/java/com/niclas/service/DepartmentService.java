package com.niclas.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.niclas.model.Department;
import com.niclas.repository.DepartmentRepository;
import com.niclas.rest.exceptionHandling.exception.DepartmentNotFoundException;


@Component
public class DepartmentService {

    private final DepartmentRepository departmentRepository;


    @Autowired
    public DepartmentService( DepartmentRepository departmentRepository ) {
        this.departmentRepository = departmentRepository;
    }


    public Department addDepartment( Department department ) {
        department.setRegistered( true );
        departmentRepository.save( department );
        return department;
    }


    public List<Department> getAllDepartments() {
        return departmentRepository.findAllByOrderByIdDesc();
    }


    public Department getDepartmentById( ObjectId id ) throws DepartmentNotFoundException {
        return departmentRepository.findDepartmentById( id ).orElseThrow( () -> new DepartmentNotFoundException( id ) );
    }


    public Department updateDepartment( Department departmentRequest, ObjectId id ) throws DepartmentNotFoundException
    {
        Department department = departmentRepository.findDepartmentById( id )
                .orElseThrow( () -> new DepartmentNotFoundException( id ) );

        department.setDepartmentName( departmentRequest.getDepartmentName() );
        department.setStreet( departmentRequest.getStreet() );
        department.setHouseNumber( departmentRequest.getHouseNumber() );
        department.setPostalCode( departmentRequest.getPostalCode() );
        department.setLocation( departmentRequest.getLocation() );
        department.setCountry( departmentRequest.getCountry() );

        department.getContact().setFirstname( departmentRequest.getContact().getFirstname() );
        department.getContact().setLastname( departmentRequest.getContact().getLastname() );
        department.getContact().setGender( departmentRequest.getContact().getGender() );
        department.getContact().setMail( departmentRequest.getContact().getMail() );

        departmentRepository.save( department );
        return department;
    }

    public void deleteDepartment( ObjectId id ) {
        departmentRepository.deleteById( id );
    }

}
