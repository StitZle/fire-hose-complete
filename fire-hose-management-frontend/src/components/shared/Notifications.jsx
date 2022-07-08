import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Notifications {
    static REGULAR_CLOSE_DELAY = 5000;

    static showSuccess(message) {
        toast.success(message, {
            autoClose: Notifications.REGULAR_CLOSE_DELAY,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    static showError(message) {
        toast.error(message, {
            autoClose: Notifications.REGULAR_CLOSE_DELAY,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    static showInfo(message) {
        toast.info(message, {
            autoClose: Notifications.REGULAR_CLOSE_DELAY,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export default Notifications;
