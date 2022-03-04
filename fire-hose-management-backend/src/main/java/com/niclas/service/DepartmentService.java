package com.niclas.service;

import java.util.List;

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


    public Department getDepartmentById( long id ) throws DepartmentNotFoundException {
        return departmentRepository.findDepartmentById( id ).orElseThrow( () -> new DepartmentNotFoundException( id ) );
    }


    public Department updateDepartment( Department departmentRequest, long id ) throws DepartmentNotFoundException {
        Department department = departmentRepository.findDepartmentById( id )
                .orElseThrow( () -> new DepartmentNotFoundException( id ) );

        department.setDepartment( departmentRequest.getDepartment() );
        department.setStreet( departmentRequest.getStreet() );
        department.setHouseNumber( departmentRequest.getHouseNumber() );
        department.setPostalCode( departmentRequest.getPostalCode() );
        department.setLocation( departmentRequest.getLocation() );
        department.setCountry( departmentRequest.getCountry() );
        department.setForename( departmentRequest.getForename() );
        department.setSurname( departmentRequest.getSurname() );
        department.setMail( departmentRequest.getMail() );

        departmentRepository.save( department );
        return department;
    }

    public void deleteDepartment(long id){
        departmentRepository.deleteById( id );
    }

}
