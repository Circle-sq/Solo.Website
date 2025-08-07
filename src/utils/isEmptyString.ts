/**
 * Check if provided string is empty,
 * or is built only from whitespaces.
 *
 * @param {string} str
 * @returns {boolean}
 */
function isEmptyString(str: string): boolean {
    return /^\s*$/.test(str);
}

export default isEmptyString;
