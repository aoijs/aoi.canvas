const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$drawImage",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", id, x = "1", y = "1", w, h, radius = "1"] = data.inside.splits;

        function convertToInt(str) {
            const number = parseInt(str);
            if (isNaN(number)) {
                return 0;
            }
            return number;
        }

        if (name && id && x && y && w && h) {
                if (d.data.canvases[name]) {
                    let ctx = d.data.canvases[name].ctx;
                    if (d.data.canvases[name].images && d.data.canvases[name].images[id]) {
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
                    } else {
                        return canvaError.newError(d, 'Image with this id not found.');
                    };
                } else {
                    return canvaError.newError(d, 'Canvas with this name not found');
                };
        } else {
            return canvaError.newError(d, 'Arguments are required.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
