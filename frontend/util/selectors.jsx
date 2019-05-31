export const convertErrorMessageToObject = errors =>{
    const errorsObj = {};
    let key;
    errors.forEach( error => {
        key = error.split(" ")[0];
        errorsObj[key] = error
    });
    return errorsObj;
}


//Snippet per tylermcgnnis.com         
export const isEmailValid = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}