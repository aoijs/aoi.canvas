const canvaError = require("../index.js").utils.canvaError;

module.exports = {
    name: "$drawImage",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", id, x = "1", y = "1", w, h, radius = "1"] = data.inside.splits;

        if (name && id && x && y && w && h) {
            if (Number(x) && Number(y) && Number(w) && Number(h)) {
                if (d.data.canvases[name]) {
                    let ctx = d.data.canvases[name].ctx;
                    if (d.data.canvases[name].images && d.data.canvases[name].images[id]) {
                        async function e () {
                            let image = d.data.canvases[name].images[id];
                            ctx.save();
                            ctx.beginPath();
                            ctx.moveTo(Number(x) + parseInt(radius), Number(y));
                            ctx.arcTo(Number(x) + Number(w), Number(y), Number(x) + Number(w), Number(y) + Number(h), parseInt(radius));
                            ctx.arcTo(Number(x) + Number(w), Number(y) + Number(h), Number(x), Number(y) + Number(h), parseInt(radius));
                            ctx.arcTo(Number(x), Number(y) + Number(h), Number(x), Number(y), parseInt(radius));
                            ctx.arcTo(Number(x), Number(y), Number(x) + Number(w), Number(y), parseInt(radius));
                            ctx.closePath();
                            ctx.clip();
                            await ctx.drawImage(image, Number(x), Number(y), Number(w), Number(h));
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
                return canvaError.newError(d, 'One or some position/size arguments arent number.');
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
