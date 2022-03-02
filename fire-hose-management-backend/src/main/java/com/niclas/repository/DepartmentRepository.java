package com.niclas.repository;

import com.niclas.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Department findDepartmentByDepartment(String departmentName);
    Department findDepartmentById(long id);
    List<Department> findAllByOrderByIdDesc();
    List<Department> findAllByRegisteredOrderByIdDesc(boolean registered);


}
