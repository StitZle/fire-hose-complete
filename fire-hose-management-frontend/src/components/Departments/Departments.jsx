import React, {useState} from 'react';
import {useGetAllDepartments} from "../../hooks/useGetAllDepartments";
import {useMutation} from "react-query";
import Notifications from "../shared/Notifications";
import {deleteDepartment, postDepartment, putDepartment} from "../../utils/requests/Departments";
import {DepartmentsDataGrid} from "./DepartmentsDataGrid";
import {DepartmentOverlay} from "./DepartmentOverlay";
import {DeleteDepartmentOverlay} from "./DeleteDepartmentOverlay";
import DefaultPage from "../shared/DefaultPage";

const Departments = () => {
    const [selectedDepartment, setSelectedDepartment] = useState({})
    const [isAddOverlayVisible, setIsAddOverlayVisible] = useState(false)
    const [isEditOverlayVisible, setIsEditOverlayVisible] = useState(false)
    const [isDeleteOverlayVisible, setIsDeleteOverlayVisible] = useState(false)

    const {departments, refetch} = useGetAllDepartments();

    const addDepartmentMutation = useMutation( ( department ) => postDepartment( department ), {
        onSuccess: () => {
            Notifications.showSuccess( "Die Abteilung wurde erfolgreich erstellt!" )
            setIsAddOverlayVisible( false )
            refetch();
        },
        onError: ( error ) => {
            Notifications.showError( "Fehler beim Hinzufügen der Abteilung!" )
            console.log( error )
        }
    } )

    const editDepartmentMutation = useMutation((departmentDto) => putDepartment(selectedDepartment.id, departmentDto), {
        onSuccess: () => {
            Notifications.showSuccess("Die Abteilung wurde erfolgreich aktualisiert!")
            setIsEditOverlayVisible(false)
            refetch();
        },
        onError: (error) => {
            Notifications.showError("Die Abteilung konnte nicht aktualisiert werden!")
            console.log(error)
        }
    })

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
                setIsAddOverlayVisibleFunction={(state) => setIsAddOverlayVisible(state)}
            />

            {isAddOverlayVisible &&
                <DepartmentOverlay
                        handleClose={() => setIsAddOverlayVisible(false)}
                        headline={"Neue Abteilung hinzufügen"}
                        submitBtnText={"Hinzufügen"}
                        submitBtnFunction={( department ) => addDepartmentMutation.mutate( department )}
                />}

            {isEditOverlayVisible &&
                <DepartmentOverlay
                    handleClose={() => setIsEditOverlayVisible(false)}
                    headline={selectedDepartment.departmentName + " bearbeiten"}
                    submitBtnText={"Ändern"}
                    submitBtnFunction={(department) => editDepartmentMutation.mutate(department)}
                    initialDepartmentName={selectedDepartment.departmentName}
                    initialStreet={selectedDepartment.street}
                    initialHouseNumber={selectedDepartment.houseNumber}
                    initialPostalCode={selectedDepartment.postalCode}
                    initialLocation={selectedDepartment.location}
                    initialCountry={selectedDepartment.country}
                    initialGender={selectedDepartment.contact.gender}
                    initialFirstname={selectedDepartment.contact.firstname}
                    initialLastname={selectedDepartment.contact.lastname}
                    initialMail={selectedDepartment.contact.mail}
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