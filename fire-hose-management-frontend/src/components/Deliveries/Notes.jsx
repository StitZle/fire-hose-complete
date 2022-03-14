import {Card, CardContent, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";

const Notes = ({delivery}) => {

    const renderNotes = () => {
        if (delivery.notes === null || delivery.notes === "") {
            return "Keine Bemerkungen angegeben.";
        }
        return delivery.notes;
    }


    return (<Paper elevation={2}>
        <Card>
            <CardContent>
                <Typography variant={"h6"}>
                    Bemerkungen:
                </Typography>
                <pre>
                    <Typography>
                        {renderNotes()}
                    </Typography>
                </pre>
            </CardContent>
        </Card>
    </Paper>);
}
export default Notes;