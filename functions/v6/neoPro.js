let { loadImage, createCanvas } = require("@napi-rs/canvas");

module.exports = {
    name: "$neoPro",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        if (!d.data.canvases) {
            d.data.canvases = {};
        };

        if (!d.data.canvases["neoPro"]) {
            if (!d.data.canvases) {
                d.data.canvases = {};
            };
            var Neo = await d.util.getUser(d, '285118390031351809')
            Neo = Neo.avatarURL({format: 'png', dynamic: true});
            
            var canv = createCanvas(4024, 4024);
            var canvas = {
                "canvas": canv,
                "ctx": canv.getContext("2d")
            };

            await loadImage(Neo).then((image) => {
                canvas.ctx.drawImage(image, 1, 1, 4024, 4024);
                canvas.ctx.font = "450px Impact";
                canvas.ctx.fillText("Pro", 1850, 3000)

                d.data.canvases["neoPro"] = canvas;
            });
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}
