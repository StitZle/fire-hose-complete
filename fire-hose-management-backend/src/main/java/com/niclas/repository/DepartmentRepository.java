package com.niclas.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.niclas.model.Department;


public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Department findDepartmentByDepartment( String departmentName );


    Optional<Department> findDepartmentById( long id );


    List<Department> findAllByOrderByIdDesc();


    List<Department> findAllByRegisteredOrderByIdDesc( boolean registered );


}
