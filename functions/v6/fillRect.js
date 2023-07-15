const canvaError = require("../index.js").utils.canvaError;

module.exports = {
    name: "$fillRect",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", x, y, w, h, radius = 1] = data.inside.splits;

        const step = Math.min(Number(w), Number(h)) * 0.1;

        if (isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(w)) || isNaN(Number(h)) || isNaN(Number(radius))) {
            return canvaError.newError(d, 'Invalid parameter. All parameters must be numbers.');
        }

        if (d.data.canvases[name]) {
            const canvas = d.data.canvases[name];
            const ctx = canvas.ctx;

            if (Number(radius) === 0) {
                ctx.fillRect(Number(x), Number(y), Number(w), Number(h));
            } else {
                ctx.beginPath();
                ctx.moveTo(Number(x) + Number(radius), Number(y));
                ctx.lineTo(Number(x) + Number(w) - Number(radius), Number(y));
                ctx.quadraticCurveTo(Number(x) + Number(w), Number(y), Number(x) + Number(w), Number(y) + Number(radius));
                ctx.lineTo(Number(x) + Number(w), Number(y) + Number(h) - Number(radius));
                ctx.quadraticCurveTo(Number(x) + Number(w), Number(y) + Number(h), Number(x) + Number(w) - Number(radius), Number(y) + Number(h));
                ctx.lineTo(Number(x) + Number(radius), Number(y) + Number(h));
                ctx.quadraticCurveTo(Number(x), Number(y) + Number(h), Number(x), Number(y) + Number(h) - Number(radius));
                ctx.lineTo(Number(x), Number(y) + Number(radius));
                ctx.quadraticCurveTo(Number(x), Number(y), Number(x) + Number(radius), Number(y));
                ctx.closePath();
                ctx.fill();
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
