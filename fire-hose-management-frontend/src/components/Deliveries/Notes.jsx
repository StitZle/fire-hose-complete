import { Card, CardContent, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";

const Notes = ({ delivery }) => {
    const renderNotes = () => {
        if (delivery.notes === null || delivery.notes === "") {
            return "Keine Bemerkungen angegeben.";
        }
        return delivery.notes;
    };

    return (
        <Paper elevation={2}>
            <Card>
                <CardContent>
                    <Typography variant={"h6"}>Bemerkungen:</Typography>
                    <pre>
                        <TextField
                            id="filled-textarea"
                            label={"Bemerkungen"}
                            value={renderNotes()}
                            rows={5}
                            multiline
                            variant={"filled"}
                            fullWidth={true}
                        />
                    </pre>
                </CardContent>
            </Card>
        </Paper>
    );
};
export default Notes;
