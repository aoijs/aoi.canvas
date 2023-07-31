class Utils {
    /** 
    * Converts a string number to number.
    * @param {string} str The string number to convert.
    * @returns {number}
    */
    static convertToInt(str) {
        const number = parseInt(str);
        return isNaN(number) ? 0 : number;
    };
}

module.exports = { Utils };