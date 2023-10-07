module.exports = {
    errorMessage: async function (errorM, d) {
        let error;

        if (typeof errorM === "object") return errorM;
            error = require("./parser.js").AllParser(errorM, d.client, {
                d: d,
                returnMsg: true
            });

        return error;
      }
}