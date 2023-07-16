let { loadImage, createCanvas } = require("@napi-rs/canvas");

module.exports = {
    name: "$lerefPro",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        if (!d.data.canvases) {
            d.data.canvases = {};
        };

        if (!d.data.canvases["lerefPro"]) {
            if (!d.data.canvases) {
                d.data.canvases = {};
            };
            var Leref = await d.util.getUser(d, '608358453580136499')
            Leref = Leref.avatarURL({format: 'png', size: 4096, dynamic: true});
            
            var canv = createCanvas(4024, 4024);
            var canvas = {
                "canvas": canv,
                "ctx": canv.getContext("2d")
            };

            await loadImage(Leref).then((image) => {
                canvas.ctx.drawImage(image, 1, 1, 4024, 4024);
                canvas.ctx.font = "450px Impact";
                canvas.ctx.fillText("Pro", 1850, 3000)

                d.data.canvases["lerefPro"] = canvas;
            });
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}