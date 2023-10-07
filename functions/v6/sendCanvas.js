const canvaError = require("../../index.js").utils.canvaError;
let { AttachmentBuilder } = require("discord.js");
let { errorMessage } = require("../../util/errorMessage.js");
let { newError } = require("../../util/canvaError.js");

module.exports = {
    name: "$sendCanvas",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        let [name = "canvas", type = "msg", code = "1"] = data.inside.splits;

        if (!d.data.canvases) return canvaError.newError(d, "There is no canvases.");

        type = type.toLowerCase();

        if (d.data.canvases[name]) {
            if (type === "msg") {
                const e = await d.data.canvases[name].canvas.encode("png");
                const attachment = new AttachmentBuilder(e, { "name": name+".png" });

                d.files.push(attachment);
            } else if (type === "image") {
                let i = Number(code) - 1 || 0;
                const e = await d.data.canvases[name].canvas.encode("png");
                const attachment = new AttachmentBuilder(e, { "name": name+".png" });

                if ( !d.embeds[i] ) d.embeds[i] = new d.embed();
                d.files.push(attachment);
                d.embeds[i].setImage("attachment://"+name+".png");
            } else if (type === "thumbnail") {
                let i = Number(code) - 1 || 0;
                const e = await d.data.canvases[name].canvas.encode("png");
                const attachment = new AttachmentBuilder(e, { "name": name+".png" });

                if ( !d.embeds[i] ) d.embeds[i] = new d.embed();
                d.files.push(attachment);
                d.embeds[i].setThumbnail("attachment://"+name+".png");
            } else if (type === "author") {
                let i = Number(code) - 1 || 0;
                const e = await d.data.canvases[name].canvas.encode("png");
                const attachment = new AttachmentBuilder(e, { "name": name+".png" });

                if ( !d.embeds[i] ) d.embeds[i] = new d.embed();
                if ( !d.embeds[i].data || !d.embeds[i].data.author ) return newError(d, `No author.`)
                d.files.push(attachment);
                d.embeds[i].data.author.icon_url = "attachment://"+name+".png";
            } else if (type === "footer") {
                let i = Number(code) - 1 || 0;
                const e = await d.data.canvases[name].canvas.encode("png");
                const attachment = new AttachmentBuilder(e, { "name": name+".png" });

                if ( !d.embeds[i] ) d.embeds[i] = new d.embed();
                if ( !d.embeds[i].data || !d.embeds[i].data.footer ) return newError(d, `No footer.`)
                d.files.push(attachment);
                d.embeds[i].data.footer.icon_url = "attachment://"+name+".png";
            } else {
                return newError(d, "Invalid $sendCanvas Type.");
            };
            
        } else {
            return canvaError.newError(d, "Canvas with this name not found");
        };

        return {
            code: d.util.setCode(data),
            embeds: d.embeds
        };
    }
}