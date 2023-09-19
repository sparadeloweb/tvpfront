const buildDate = (date) => {
    const separatedDate = date.split(/\s/);
    const month = separatedDate[0].substring(4, 6);
    const day = separatedDate[0].substring(6, 8);
    let hour = separatedDate[0].substring(8, 10);
    const min = separatedDate[0].substring(10, 12);
    const period = separatedDate[0].substring(12, 14); // AM o PM

    if (period === 'PM') {
        hour = parseInt(hour, 10) + 12; // Ajuste para PM
    }

    return {
        time: `${hour}:${min}`,
        date: `${day}/${month}`
    };
};

export default buildDate;
