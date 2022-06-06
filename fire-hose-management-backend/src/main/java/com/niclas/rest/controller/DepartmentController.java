package com.niclas.rest.controller;

import com.niclas.model.Department;
import com.niclas.rest.exceptionHandling.exception.DepartmentNotFoundException;
import com.niclas.service.DepartmentService;
import com.niclas.transfer.DepartmentRequest;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@Slf4j
@RestController
public class DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController( DepartmentService departmentService ) {
        this.departmentService = departmentService;
    }


    @PostMapping( value = "/departments", consumes = {MediaType.APPLICATION_JSON_VALUE} )
    public ResponseEntity<Department> addDepartment( @RequestBody DepartmentRequest departmentRequest ) {

        Department department = departmentService.addDepartment( departmentRequest );
        return new ResponseEntity<>( department, HttpStatus.CREATED );
    }


    @GetMapping( value = "/departments" )
    public ResponseEntity<List<Department>> getAllDepartments() {

        List<Department> departments = departmentService.getAllDepartments();
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }


    @GetMapping( "/departments/{id}" )
    public ResponseEntity<Department> getDepartmentById( @PathVariable ObjectId id ) throws DepartmentNotFoundException {

        Department department = departmentService.getDepartmentById( id );
        return new ResponseEntity<>( department, HttpStatus.OK );
    }


    @PutMapping( value = "/departments/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE} )
    public ResponseEntity<Department> updateDepartment( @PathVariable( value = "id" ) ObjectId id, @RequestBody Department departmentRequest ) throws DepartmentNotFoundException {

        Department department = departmentService.updateDepartment( departmentRequest, id );
        return new ResponseEntity<>( department, HttpStatus.OK );
    }


    @DeleteMapping( "/departments/{id}" )
    public ResponseEntity<Object> deleteDepartment( @PathVariable( value = "id" ) ObjectId id ) {

        departmentService.deleteDepartment( id );
        return new ResponseEntity<>( HttpStatus.OK );
    }


}
