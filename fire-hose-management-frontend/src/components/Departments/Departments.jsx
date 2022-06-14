import React, {useState} from 'react';
import {useGetAllDepartments} from "../../hooks/useGetAllDepartments";
import {useMutation} from "react-query";
import Notifications from "../shared/Notifications";
import {deleteDepartment} from "../../utils/requests/Departments";
import {DepartmentsDataGrid} from "./DepartmentsDataGrid";
import {CreateDepartmentOverlay} from "./CreateDepartmentOverlay";
import {DeleteDepartmentOverlay} from "./DeleteDepartmentOverlay";
import DefaultPage from "../shared/DefaultPage";
import EditDepartmentOverlay from "./EditDepartmentOverlay";

const Departments = () => {
    const [selectedDepartment, setSelectedDepartment] = useState({})
    const [isCreateOverlayVisible, setIsCreateOverlayVisible] = useState(false)
    const [isEditOverlayVisible, setIsEditOverlayVisible] = useState(false)
    const [isDeleteOverlayVisible, setIsDeleteOverlayVisible] = useState(false)

    const {departments, refetch} = useGetAllDepartments();

    const handleCloseCreateOverlay = () => {
        setIsCreateOverlayVisible(false)
        refetch();
    }


    const deleteDepartmentMutation = useMutation(() => deleteDepartment(selectedDepartment.id), {
        onSuccess: () => {
            setIsDeleteOverlayVisible(false)
            Notifications.showSuccess(`Abteilung: ${selectedDepartment.department} erfolgreich gelöscht!`)
            refetch();
        },
        onError: () => {
            Notifications.showError(`Abteilung: ${selectedDepartment.department} konnte nicht gelöscht werden!`)
        }
    })


    return (
        <DefaultPage>
            <h1>Abteilungen</h1>
            <DepartmentsDataGrid
                departments={departments}
                selectedDepartmentFunction={(item) => setSelectedDepartment(item)}
                setDeleteOverlayVisibleFunction={(state) => setIsDeleteOverlayVisible(state)}
                setIsEditOverlayVisibleFunction={(state) => setIsEditOverlayVisible(state)}
                setIsAddOverlayVisibleFunction={(state) => setIsCreateOverlayVisible(state)}
            />

            {isCreateOverlayVisible &&
                <CreateDepartmentOverlay
                    closeCreateDepartmentOverlay={() => handleCloseCreateOverlay()}
                    handleClose={() => setIsCreateOverlayVisible(false)}
                />}

            {isEditOverlayVisible &&
                <EditDepartmentOverlay
                    department={selectedDepartment}
                    handleClose={() => setIsEditOverlayVisible(false)}
                />}


            {isDeleteOverlayVisible &&
                <DeleteDepartmentOverlay
                    departmentName={selectedDepartment.departmentName}
                    handleClose={() => setIsDeleteOverlayVisible(false)}
                    submitBtnFunction={() => deleteDepartmentMutation.mutate()}
                />}
        </DefaultPage>
    );
}

export default Departments;