const canvaError = require("../index.js").utils.canvaError;

module.exports = {
    name: "$fillRect",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", x, y, w, h, radius = 1] = data.inside.splits;

        const parsedX = Number(x);
        const parsedY = Number(y);
        const parsedW = Number(w);
        const parsedH = Number(h);
        const parsedRadius = Number(radius);

        const step = Math.min(parsedW, parsedH) * 0.1; // Измените значение 0.1 на нужное вам

        if (isNaN(parsedX) || isNaN(parsedY) || isNaN(parsedW) || isNaN(parsedH) || isNaN(parsedRadius)) {
            return canvaError.newError(d, 'Invalid parameter. All parameters must be numbers.');
        }

        if (d.data.canvases[name]) {
            const canvas = d.data.canvases[name];
            const ctx = canvas.ctx;

            if (parsedRadius === 0) {
                ctx.fillRect(parsedX, parsedY, parsedW, parsedH);
            } else {
                ctx.beginPath();
                ctx.moveTo(parsedX + parsedRadius, parsedY);
                ctx.lineTo(parsedX + parsedW - parsedRadius, parsedY);
                ctx.quadraticCurveTo(parsedX + parsedW, parsedY, parsedX + parsedW, parsedY + parsedRadius);
                ctx.lineTo(parsedX + parsedW, parsedY + parsedH - parsedRadius);
                ctx.quadraticCurveTo(parsedX + parsedW, parsedY + parsedH, parsedX + parsedW - parsedRadius, parsedY + parsedH);
                ctx.lineTo(parsedX + parsedRadius, parsedY + parsedH);
                ctx.quadraticCurveTo(parsedX, parsedY + parsedH, parsedX, parsedY + parsedH - parsedRadius);
                ctx.lineTo(parsedX, parsedY + parsedRadius);
                ctx.quadraticCurveTo(parsedX, parsedY, parsedX + parsedRadius, parsedY);
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
