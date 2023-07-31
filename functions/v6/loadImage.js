const canvaError = require("../../index.js").utils.canvaError;
const { loadImage } = require('@napi-rs/canvas')

module.exports = {
    name: "$loadImage",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", id, type, somepath] = data.inside.splits;
        if (!d.data.canvases[name]) return canvaError.newError(d, 'Canvas with this name not found.');
        if (!(type && somepath && id))
            return canvaError.newError(d, 'Type, path and imageId arguments are required.');
        if (!["url", "type", "path", "file"].includes(type)) return canvaError.newError(d, 'Unknown type.');
        let image;
        if(type === "url" || type === "link") {
            await loadImage(somepath).then((img) => {
                image = img;
            });
        } else if (type === "path" || type === "file") {
            await loadImage(path.join(__dirname, somepath)).then((img) => {
                image = img;
            });
        };
        (d.data.canvases[name].images??={})[id] = image;
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}