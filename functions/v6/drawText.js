module.exports = {
    name: "$drawText",
    type: "djs",
    code: async (d) => {
        const canvaError = require("../../index.js").utils.canvaError;
        const data = d.util.aoiFunc(d);
        const [name = "canvas", text = "Text", x = "1", y = "1"] = data.inside.splits;

        function convertToInt(str) {
            const number = parseInt(str);
            if (isNaN(number)) {
                return 0;
            }
            return number;
        }

        if (d.data.canvases[name]) {
            const ctx = d.data.canvases[name].ctx;
            ctx.fillText(text, convertToInt(x), convertToInt(y));
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}