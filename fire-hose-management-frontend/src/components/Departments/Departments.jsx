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

    const addDepartmentMutation = useMutation((departmentDto) => postDepartment(departmentDto), {
        onSuccess: () => {
            Notifications.showSuccess("Die Abteilung wurde erfolgreich erstellt!")
            setIsAddOverlayVisible(false)
            refetch();
        },
        onError: (error) => {
            Notifications.showError("Fehler beim Hinzufügen der Abteilung!")
            console.log(error)
        }
    })

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

    const addDepartment = (department, street, houseNumber, postalCode, location, country, forename, surname, mail) => {
        addDepartmentMutation.mutate(dtoBuilder(department, street, houseNumber, postalCode, location, country, forename, surname, mail))
    }

    const editDepartment = (department, street, houseNumber, postalCode, location, country, forename, surname, mail) => {
        editDepartmentMutation.mutate(dtoBuilder(department, street, houseNumber, postalCode, location, country, forename, surname, mail))
    }

    const dtoBuilder = (department, street, houseNumber, postalCode, location, country, forename, surname, mail) => {
        return {
            department: department,
            street: street,
            houseNumber: houseNumber,
            postalCode: postalCode,
            location: location,
            country: country,
            forename: forename,
            surname: surname,
            mail: mail
        }
    }


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
                    submitBtnFunction={addDepartment}
                />}

            {isEditOverlayVisible &&
                <DepartmentOverlay
                    handleClose={() => setIsEditOverlayVisible(false)}
                    headline={selectedDepartment.department + " bearbeiten"}
                    submitBtnText={"Ändern"}
                    submitBtnFunction={editDepartment}
                    initialDepartment={selectedDepartment.department}
                    initialStreet={selectedDepartment.street}
                    initialHouseNumber={selectedDepartment.houseNumber}
                    initialPostalCode={selectedDepartment.postalCode}
                    initialLocation={selectedDepartment.location}
                    initialCountry={selectedDepartment.country}
                    initialForename={selectedDepartment.forename}
                    initialSurname={selectedDepartment.surname}
                    initialMail={selectedDepartment.mail}
                />}


            {isDeleteOverlayVisible &&
                <DeleteDepartmentOverlay
                    departmentName={selectedDepartment.department}
                    handleClose={() => setIsDeleteOverlayVisible(false)}
                    submitBtnFunction={() => deleteDepartmentMutation.mutate()}
                />}
        </DefaultPage>
    );
}

export default Departments;