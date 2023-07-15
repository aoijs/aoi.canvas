const canvaError = require("../index.js").utils.canvaError;

module.exports = {
    name: "$addFilter",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", filter = ""] = data.inside.splits;

        if (d.data.canvases[name]) {
            const canvas = d.data.canvases[name].canvas;
            const ctx = d.data.canvases[name].ctx;

            switch (filter) {
                case "grayscale":
                    ctx.filter = "grayscale(100%)";
                    break;
                case "sepia":
                    ctx.filter = "sepia(100%)";
                    break;
                case "blur":
                    ctx.filter = "blur(5px)";
                    break;
                default:
                    return canvaError.newError(d, 'Invalid filter. Available filters: grayscale, sepia, blur');
            }
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        }

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
