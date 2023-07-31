const canvaError = require("../../index.js").utils.canvaError;
const { Utils } = require("../../util/utils.js");
const { convertToInt } = Utils;

module.exports = {
    name: "$drawImage",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", id, x = "1", y = "1", w, h, radius = "1"] = data.inside.splits;
        if (!(name && id && x && y && w && h)) return canvaError.newError(d, 'Arguments are required.');
        if (!d.data.canvases[name]) return canvaError.newError(d, 'Canvas with this name not found');
        if (d.data.canvases[name].images && !d.data.canvases[name].images[id])
            return canvaError.newError(d, 'Image with this id not found.');
        let ctx = d.data.canvases[name].ctx;
        async function e () {
            let image = d.data.canvases[name].images[id];
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(convertToInt(x) + parseInt(radius), convertToInt(y));
            ctx.arcTo(convertToInt(x) + convertToInt(w), convertToInt(y), convertToInt(x) + convertToInt(w), convertToInt(y) + convertToInt(h), parseInt(radius));
            ctx.arcTo(convertToInt(x) + convertToInt(w), convertToInt(y) + convertToInt(h), convertToInt(x), convertToInt(y) + convertToInt(h), parseInt(radius));
            ctx.arcTo(convertToInt(x), convertToInt(y) + convertToInt(h), convertToInt(x), convertToInt(y), parseInt(radius));
            ctx.arcTo(convertToInt(x), convertToInt(y), convertToInt(x) + convertToInt(w), convertToInt(y), parseInt(radius));
            ctx.closePath();
            ctx.clip();
            await ctx.drawImage(image, convertToInt(x), convertToInt(y), convertToInt(w), convertToInt(h));
            ctx.restore();
        };
        await e();
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
