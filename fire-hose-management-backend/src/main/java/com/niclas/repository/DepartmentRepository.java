package com.niclas.repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.niclas.model.Department;


public interface DepartmentRepository extends MongoRepository<Department, ObjectId>
{

    Department findDepartmentByDepartmentName( String departmentName );


    Optional<Department> findDepartmentById( ObjectId id );


    List<Department> findAllByOrderByIdDesc();


    List<Department> findAllByRegisteredOrderByIdDesc( boolean registered );


}
