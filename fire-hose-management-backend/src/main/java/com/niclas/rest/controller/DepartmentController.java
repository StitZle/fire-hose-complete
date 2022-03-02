package com.niclas.rest.controller;

import com.niclas.model.Department;
import com.niclas.repository.DepartmentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class DepartmentController {

    //TODO add Logging

    private final DepartmentRepository departmentRepository;

    public DepartmentController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }


    @PostMapping("/departments/")
    public ResponseEntity<Department> addDepartment(@RequestBody Department department) {

        department.setRegistered(true);
        departmentRepository.save(department);

        return new ResponseEntity<>(department, HttpStatus.CREATED);
    }

    @GetMapping("/departments/")
    //returns only registered Departments
    public ResponseEntity<List<Department>> getAllDepartments() {
        List<Department> departmentList = departmentRepository.findAllByRegisteredOrderByIdDesc(true);
        return new ResponseEntity<>(departmentList, HttpStatus.OK);
    }

    @GetMapping("/departments/{id}")
    public ResponseEntity<Department> getSpecificDepartments(@PathVariable long id) {
        Department department = departmentRepository.findDepartmentById(id);
        return new ResponseEntity<>(department, HttpStatus.OK);
    }

    @PutMapping("/departments/{id}")
    public ResponseEntity<Department> editDepartment(@PathVariable(value = "id") long id, @RequestBody Department newDepartment) {

        Department oldDepartment = departmentRepository.findDepartmentById(id);

        oldDepartment.setDepartment(newDepartment.getDepartment());
        oldDepartment.setStreet(newDepartment.getStreet());
        oldDepartment.setHouseNumber(newDepartment.getHouseNumber());
        oldDepartment.setPostalCode(newDepartment.getPostalCode());
        oldDepartment.setLocation(newDepartment.getLocation());
        oldDepartment.setCountry(newDepartment.getCountry());
        oldDepartment.setForename(newDepartment.getForename());
        oldDepartment.setSurname(newDepartment.getSurname());
        oldDepartment.setMail(newDepartment.getMail());

        departmentRepository.save(oldDepartment);

        return new ResponseEntity<>(oldDepartment, HttpStatus.OK);
    }


    @DeleteMapping("/departments/{id}")
    public ResponseEntity deleteDepartment(@PathVariable(value = "id") long id) {

        departmentRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
