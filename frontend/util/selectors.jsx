export const convertErrorMessageToObject = errors =>{
    const errorsObj = {};
    let key;
    errors.forEach( error => {
        key = error.split(" ")[0];
        errorsObj[key] = error
    });
    return errorsObj;
}