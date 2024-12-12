// format date into format 'YYYY-MM-DD HH:mm:ss'. Take in a string date and return a formatted date string

export const formatDate = (date: string): string => {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}-${
        newDate.getMonth() + 1
    }-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
};
