const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$addFilter",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        let [name = "canvas", filter = "", value] = data.inside.splits;
        const val = Number(value) || 0;
        if (!name || !filter || !value)
            return canvaError.newError(d, "One or some required parameters are missing."); // No need of brackets!
        if (!d.data.canvases[name]) return canvaError.newError(d, 'Canvas with this name not found.');
        if (![
            "grayscale",
            "blur",
            "sepia",
            "brightness",
            "contrast",
            "invert",
            "saturate"
        ].includes(filter)) return canvaError.newError(d, `Filter '${filter}' not found.`);
        if (isNaN(val)) return canvaError.newError(d, `Value is not a number.`);
        const filters = {
            "grayscale": `grayscale(${val}%)`,
            "blur": `blur(${val}px)`,
            "sepia": `sepia(${val}%)`,
            "brightness": `brightness(${val})`,
            "contrast": `contrast(${val})`,
            "invert": `invert(${val})`,
            "saturate": `saturate(${val})`
        };
        let canvas = d.data.canvases[name].canvas;
        let ctx = d.data.canvases[name].ctx;
        ctx.filter = filters[filter];
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};