import React, { useState } from 'react';
import { useGetAllDepartments } from "../../hooks/useGetAllDepartments";
import { useMutation } from "react-query";
import Notifications from "../shared/Notifications";
import { deleteDepartment } from "../../utils/requests/Departments";
import { DepartmentsDataGrid } from "./DepartmentsDataGrid";
import { CreateDepartmentOverlay } from "./CreateDepartmentOverlay";
import { DeleteDepartmentOverlay } from "./DeleteDepartmentOverlay";
import DefaultPage from "../shared/DefaultPage";
import EditDepartmentOverlay from "./EditDepartmentOverlay";

const Departments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState( {} )
  const [isCreateOverlayVisible, setIsCreateOverlayVisible] = useState( false )
  const [isEditOverlayVisible, setIsEditOverlayVisible] = useState( false )
  const [isDeleteOverlayVisible, setIsDeleteOverlayVisible] = useState( false )

  const { departments, refetch } = useGetAllDepartments();

  const handleCloseCreateAndRefetch = () => {
    setIsCreateOverlayVisible( false );
    refetch();
  }

  const handleCloseEditAndRefetch = () => {
    setIsEditOverlayVisible( false );
    refetch();
  }

  const handleCloseDeleteAndRefetch = () =>{
    setIsDeleteOverlayVisible(false);
    refetch();
  }


  return (
    <DefaultPage>
      <h1>Abteilungen</h1>
      <DepartmentsDataGrid
        departments={departments}
        selectedDepartmentFunction={( item ) => setSelectedDepartment( item )}
        setDeleteOverlayVisibleFunction={( state ) => setIsDeleteOverlayVisible( state )}
        setIsEditOverlayVisibleFunction={( state ) => setIsEditOverlayVisible( state )}
        setIsAddOverlayVisibleFunction={( state ) => setIsCreateOverlayVisible( state )}
      />

      {isCreateOverlayVisible &&
        <CreateDepartmentOverlay
          closeOverlayAndRefetch={() => handleCloseCreateAndRefetch()}
          closeOverlay={() => setIsCreateOverlayVisible( false )}
        />}

      {isEditOverlayVisible &&
        <EditDepartmentOverlay
          closeOverlayAndRefetch={() => handleCloseEditAndRefetch()}
          closeOverlay={() => setIsEditOverlayVisible( false )}
          department={selectedDepartment}

        />}


      {isDeleteOverlayVisible &&
        <DeleteDepartmentOverlay
          closeOverlayAndRefetch={()=> handleCloseDeleteAndRefetch()}
          closeOverlay={() => setIsDeleteOverlayVisible( false )}
          department={selectedDepartment}
        />}
    </DefaultPage>
  );
}

export default Departments;