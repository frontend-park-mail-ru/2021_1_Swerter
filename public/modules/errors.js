export const fatal = errorMsg => {
    const err = new Error(errorMsg);
    throw err;
};