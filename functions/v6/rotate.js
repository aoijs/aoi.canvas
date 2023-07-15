const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$rotate",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", angle = 0] = data.inside.splits;

        const angl = Number(angle) || 0;

        if (isNaN(angl)) {
            return canvaError.newError(d, 'Invalid angle. The angle must be a number.');
        }

        if (d.data.canvases[name]) {
            const canvas = d.data.canvases[name].canvas;
            const ctx = d.data.canvases[name].ctx;

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            ctx.translate(centerX, centerY);
            ctx.rotate((angl * Math.PI) / 180);
            ctx.translate(-centerX, -centerY);
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        }

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
