const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$setEffect",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        let [name = "canvas", effect = "none", value = "none"] = data.inside.splits;

        const val = Number(value) || "none";

        if (!name || !effect || !value) {
            return canvaError.newError(d, "One or some required parameters are missing.");
        };

        if (d.data.canvases[name]) {
            let ctx = d.data.canvases[name].ctx;

            let effects = {
                "grayscale": `grayscale(${val}%)`,
                "blur": `blur(${val}px)`,
                "sepia": `sepia(${val}%)`,
                "brightness": `brightness(${val})`,
                "contrast": `contrast(${val})`,
                "invert": `invert(${val})`,
                "saturate": `saturate(${val})`,
                "none": "none"
            };

            if (effects[effect]) {
                if (val) {
                    ctx.filter = effects[effect]
                } else {
                    return canvaError.newError(d, `Value is not a number.`);
                };
            } else {
                return canvaError.newError(d, `Effect '${effect}' not found.`);
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