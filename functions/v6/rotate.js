const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$rotate",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", angle = 0] = data.inside.splits, angl = Number(angle) || 0;
        if (!d.data.canvases[name]) return canvaError.newError(d, 'Canvas with this name not found.');
        if (isNaN(angl)) return canvaError.newError(d, 'Invalid angle. The angle must be a number.');
        const canvas = d.data.canvases[name].canvas;
        const ctx = d.data.canvases[name].ctx;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.translate(centerX, centerY);
        ctx.rotate((angl * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
