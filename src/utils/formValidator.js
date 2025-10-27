export function formValidator(dataArray) {

    const errors = [];

    dataArray.forEach((data) => {
        const key = Object.keys(data)[0];

        if (data[key].length <= 0) {
            errors.push({[`${key}`]: `${key.slice(0, 1).toUpperCase() + key.slice(1)} is Required`});
        }
    });

    if (errors.length > 0) {
        return errors;
    }

    return null;
}