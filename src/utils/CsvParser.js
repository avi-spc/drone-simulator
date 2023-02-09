export const csvToArray = (str, delimiter = ',') => {
    const rows = str.split('\n');

    const arr = rows.map((row) =>
        row.split(delimiter).map((value, index) => (index === 0 ? value : +value))
    );

    return arr;
};