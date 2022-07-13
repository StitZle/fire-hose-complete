package com.niclas.repository;

import com.niclas.model.Department;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface DepartmentRepository extends MongoRepository<Department, ObjectId> {

    Department findDepartmentByDepartmentName( String departmentName );

    Optional<Department> findDepartmentById( ObjectId id );

    Optional<Department> findDepartmentByIdAndDeletedIsFalse( ObjectId id );

    List<Department> findDepartmentsByDeletedIsFalseOrderByIdDesc();

    List<Department> findAllByOrderByIdDesc();


    List<Department> findAllByRegisteredOrderByIdDesc( boolean registered );


}
