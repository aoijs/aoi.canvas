const canvaError = require("../../index.js").utils.canvaError;
const GIFEncoder = require('gif-encoder-2');
let { AttachmentBuilder} = require("discord.js");

module.exports = {
    name: "$sendGIF",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "gif", type = "msg", index = "1"] = data.inside.splits;

        if (!d.data.gifs) return canvaError.newError(d, "No GIFs found, please create at least one to send.");
        if (!d.data.canvases) return canvaError.newError(d, `There is no canvases ever created.`);
        
        if (d.data.gifs[name]) {
            if (type === "msg") {
                const e = await d.data.gifs[name].gif.out.getData();
                const attachment = new AttachmentBuilder(e, { "name": name+".gif" });

                d.files.push(attachment);
            } else if (type === "image") {
                let i = Number(index) - 1 || 0;
                const e = await d.data.gifs[name].gif.out.getData();
                const attachment = new AttachmentBuilder(e, { "name": name+".gif" });

                if ( !d.embeds[i] ) d.embeds[i] = new d.embed();
                d.files.push(attachment);
                d.embeds[i].setImage("attachment://"+name+".gif");
            }
            
        } else {
            return canvaError.newError(d, "GIF with this name not found");
        };

        return {
            code: d.util.setCode(data),
            embeds: d.embeds
        };
    }
}