const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$addFilter",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        let [name = "canvas", filter = "", value] = data.inside.splits;

        const val = Number(value) || 0;

        if (!name || !filter || !value) {
            return canvaError.newError(d, "One or some required parameters are missing.");
        };

        if (d.data.canvases[name]) {
            let canvas = d.data.canvases[name].canvas;
            let ctx = d.data.canvases[name].ctx;

            let filters = {
                "grayscale": `grayscale(${val}%)`,
                "blur": `blur(${val}px)`,
                "sepia": `sepia(${val}%)`,
                "brightness": `brightness(${val})`,
                "contrast": `contrast(${val})`,
                "invert": `invert(${val})`,
                "saturate": `saturate(${val})`
            };

            if (filters[filter]) {
                if (val) {
                    ctx.filter = filters[filter]
                } else {
                    return canvaError.newError(d, `Value is not a number.`);
                };
            } else {
                return canvaError.newError(d, `Filter '${filter}' not found.`);
            };

        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};