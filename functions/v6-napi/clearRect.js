const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$clearRect",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", x, y, w, h] = data.inside.splits;

        if (!d.data.canvases) return canvaError.newError(d, `There is no canvases ever created.`);

        function convertToInt(str) {
            const number = parseFloat(str);
            if (isNaN(number)) {
                return 0;
            }
            return number;
        }

        if (isNaN(convertToInt(x)) || isNaN(convertToInt(y)) || isNaN(convertToInt(w)) || isNaN(convertToInt(h))) {
            return canvaError.newError(d, 'Invalid parameter. All parameters must be numbers.');
        }

        if (d.data.canvases[name]) {
            const canvas = d.data.canvases[name];
            const ctx = canvas.ctx;

            ctx.clearRect(convertToInt(x), convertToInt(y), convertToInt(w), convertToInt(h));
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        }

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
