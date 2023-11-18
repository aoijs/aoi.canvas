const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$addEffect",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        let [name = "canvas", effect = "none", value] = data.inside.splits;

        if (!d.data.canvases) return canvaError.newError(d, `There is no canvases ever created.`);

        const val = Number(value) || 0;

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
                "saturate": `saturate(${val})`
            };

            if (effects[effect]) {
                if (val) {
                    if (ctx.filter === "none") {
                	ctx.filter = effects[effect];
            	    } else {
		ctx.filter += " "+effects[effect];
                    };
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