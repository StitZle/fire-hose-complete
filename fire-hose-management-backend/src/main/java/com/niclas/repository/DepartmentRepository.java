package com.niclas.repository;

import com.niclas.model.Department;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface DepartmentRepository extends MongoRepository<Department, ObjectId> {

    Department findDepartmentByDepartment( String departmentName );


    Optional<Department> findDepartmentById( ObjectId id );


    List<Department> findAllByOrderByIdDesc();


    List<Department> findAllByRegisteredOrderByIdDesc( boolean registered );


}
