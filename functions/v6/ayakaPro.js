let { loadImage, createCanvas } = require("@napi-rs/canvas");

module.exports = {
    name: "$ayakaPro",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        let Ayaka = await d.util.getUser(d, '715755977483223081');
        Ayaka = Ayaka.avatarURL({format: 'png', size: 4096, dynamic: true});
        const canv = createCanvas(4024, 4024);
        const canvas = {
            "canvas": canv,
            "ctx": canv.getContext("2d")
        };
        const avatar = await loadImage(Ayaka);
        canvas.ctx.drawImage(avatar, 1, 1, 4024, 4024);
        canvas.ctx.font = "450px Impact"
        canvas.ctx.fillText("Pro", 1850, 3000);
        (d.data.canvases??={})["ayakaPro"] = canvas;
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}

/** 
* THIS => (d.data.canvases??={})
* INSTEAD OF
* if (!d.data.canvases) {
*     d.data.canvases = {};
* };
*/