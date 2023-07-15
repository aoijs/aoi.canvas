const canvaError = require("../index.js").utils.canvaError;
let { AttachmentBuilder} = require("discord.js")

module.exports = {
    name: "$sendCanvas",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", type = "msg", index = "1"] = data.inside.splits;

        if (d.data.canvases[name]) {
            if (type === "msg") {
                const e = await d.data.canvases[name].canvas.encode("png");
                const attachment = new AttachmentBuilder(e, { "name": name+".png" });

                d.files.push(attachment);
            } else if (type === "image") {
                let i = Number(index) - 1;
                const e = await d.data.canvases[name].canvas.encode("png");
                const attachment = new AttachmentBuilder(e, { "name": name+".png" });

                if ( !d.embeds[i] ) d.embeds[i] = new d.embed();
                d.files.push(attachment);
                d.embeds[i].setImage("attachment://"+name+".png");
            }
            
        } else {
            return canvaError.newError(d, "Canvas with this name not found");
        };

        return {
            code: d.util.setCode(data),
            embeds: d.embeds
        };
    }
}