const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$setShadow",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", blur] = data.inside.splits;

        if (d.data.canvases[name]) {
            let ctx = d.data.canvases[name].ctx;

            ctx.shadowBlur = Number(blur) || 0;
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};