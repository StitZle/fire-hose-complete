import React, {useState} from "react";
import {DepartmentsDataGrid} from "./DepartmentsDataGrid";
import {CreateDepartmentOverlay} from "./CreateDepartmentOverlay";
import {DeleteDepartmentOverlay} from "./DeleteDepartmentOverlay";
import DefaultPage from "../shared/DefaultPage";
import EditDepartmentOverlay from "./EditDepartmentOverlay";

const Departments = () => {
    const [selectedDepartment, setSelectedDepartment] = useState( {} );
    const [isCreateOverlayVisible, setIsCreateOverlayVisible] = useState( false );
    const [isEditOverlayVisible, setIsEditOverlayVisible] = useState( false );
    const [isDeleteOverlayVisible, setIsDeleteOverlayVisible] = useState( false );

    return (<DefaultPage>
        <h1>Abteilungen</h1>
        <DepartmentsDataGrid
                selectedDepartmentFunction={( item ) => setSelectedDepartment( item )}
                setDeleteOverlayVisibleFunction={( state ) => setIsDeleteOverlayVisible( state )}
                setIsEditOverlayVisibleFunction={( state ) => setIsEditOverlayVisible( state )}
                setIsAddOverlayVisibleFunction={( state ) => setIsCreateOverlayVisible( state )}
        />

        {isCreateOverlayVisible && (<CreateDepartmentOverlay closeOverlay={() => setIsCreateOverlayVisible( false )}/>)}

        {isEditOverlayVisible && (<EditDepartmentOverlay
                closeOverlay={() => setIsEditOverlayVisible( false )}
                department={selectedDepartment}
        />)}

        {isDeleteOverlayVisible && (<DeleteDepartmentOverlay
                closeOverlay={() => setIsDeleteOverlayVisible( false )}
                department={selectedDepartment}
        />)}
    </DefaultPage>);
};

export default Departments;
