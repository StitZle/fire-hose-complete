import { Card, CardContent, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const Sender = ({ delivery }) => {
    if (delivery.department !== null) {
        const department = delivery.department;
        return (
            <Paper elevation={2}>
                <Card>
                    <CardContent>
                        <Typography variant={"h6"}>Abgegeben durch: {department.department}</Typography>
                        <p>Ansprechpartner: {department.forename + " " + department.surname}</p>
                        <Divider />
                        <p>Strasse: {department.street + " " + department.houseNumber}</p>
                        <p>Ort: {department.postalCode + " " + department.location}</p>
                        <p>Land: {department.country}</p>
                        <Divider />
                        <p>E-Mail: {department.mail}</p>
                    </CardContent>
                </Card>
            </Paper>
        );
    }

    if (delivery.contact !== null) {
        const contact = delivery.contact;
        return (
            <Paper elevation={2}>
                <Card>
                    <CardContent>
                        <Typography variant={"h6"}>Abgegeben durch: {contact.company}</Typography>
                        <p>Ansprechpartner: {contact.firstname + " " + contact.lastname}</p>
                        <Divider />
                        <p>E-Mail: {contact.mail}</p>
                    </CardContent>
                </Card>
            </Paper>
        );
    }
};

export default Sender;

/*
"department": "Feuerwehr March",
            "forename": "Patrick",
            "surname": "Gutmann",
            "mail": "march@feuerwehr.de",
            "street": "Sportplatzstrasse",
            "houseNumber": "20",
            "location": "March",
            "postalCode": "79232",
            "country": "Deutschland",
            "registered": true
 */
