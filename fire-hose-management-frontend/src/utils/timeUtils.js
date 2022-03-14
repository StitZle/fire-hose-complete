import dayjs from "dayjs";

export const defaultDateFormat = (date) => {
    return dayjs(date).format("DD/MM/YYYY HH:mm")
}