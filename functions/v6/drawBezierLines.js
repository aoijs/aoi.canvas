const canvaError = require("../../index.js").utils.canvaError;
const { drawBezierLines } = require("../../util/helpfulstuff.js");

module.exports = {
    name: "$drawBezierLines",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", ...waypoints] = data.inside.splits;

        if (!d.data.canvases) return canvaError.newError(d, `There is no canvases ever created.`);

        if (d.data.canvases[name]) {
            const canvas = d.data.canvases[name];
            const ctx = canvas.ctx;

            await drawBezierLines(
                ctx,
                waypoints
            );
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        }

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};