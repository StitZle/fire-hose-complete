import {Card, CardContent, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {defaultDateFormat} from "../../utils/timeUtils";

const Info = ({ delivery }) => {
    const getOvDeviceCount = () => {
        return delivery.devices.length;
    };

    const getOverallDeviceCount = () => {
        let count = 0;
        delivery.devices.forEach( ( device ) => {
            const deviceCount = device.count;
            count = count + deviceCount;
        } );
        return count;
    };

    return (<Paper elevation={2}>
        <Card>
            <CardContent>
                <Typography variant={"h6"}>Infos zur Abgabe:</Typography>
                <p>Auftragsnummer: {delivery.orderId}</p>
                <p>Abgegeben am: {defaultDateFormat( delivery.createdAt )}</p>
                <p>Geräte (einzeln): {getOvDeviceCount()}</p>
                <p>Geräte akkumuliert: {getOverallDeviceCount()}</p>
                <Divider/>
                <p>Abgegeben durch: {delivery.senderForename + " " + delivery.senderSurname}</p>
            </CardContent>
        </Card>
    </Paper>);
};

export default Info;
