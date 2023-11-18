const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$startPath",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", x = "center", y = "center"] = data.inside.splits;

        if (!d.data.canvases) return canvaError.newError(d, `There is no canvases ever created.`);

        if (d.data.canvases[name]) {
            const canvas = d.data.canvases[name];
            const ctx = canvas.ctx;

            if (x && (x === "center" || x === "%center%"))
                x = canvas.width / 2;

            if (y && (y === "center" || y === "%center%"))
                y = canvas.height / 2;

            await ctx.beginPath();

            ctx.moveTo(parseFloat(x), parseFloat(y));
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        }

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};