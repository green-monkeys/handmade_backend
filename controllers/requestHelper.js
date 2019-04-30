/**
 * Checks to see if passed ID is valid (is an integer)
 * @param id: The ID to be checked
 * @returns {boolean}: Whether the ID is valid
 */
export const idIsValid = (id) => {
    try {
        parseInt(id);
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Checks to see if passed email is valid
 * @param email: The email to be checked
 * @returns {boolean}: Whether the email is valid
 */
export const emailIsValid = (email) => {
    const r = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/g;
    const matches = email.match(r);
    if (!matches) {
        return false;
    }
    return matches.length > 0;
};

export const dollarAmountIsValid = (amount) => {
    return !isNaN(amount);
}