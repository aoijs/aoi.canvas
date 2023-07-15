const canvaError = require("../../index.js").utils.canvaError;
const { loadImage } = require('@napi-rs/canvas')

module.exports = {
    name: "$loadImage",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", id, type, somepath] = data.inside.splits;

        if (d.data.canvases[name]) {
            if (type && somepath && id) {
                let image;

                if(type === "url" || type === "link") {
                    await loadImage(somepath).then((img) => {
                        image = img;
                    });
                } else if (type === "path" || type === "file") {
                    await loadImage(path.join(__dirname, somepath)).then((image) => {
                        image = img;
                    });
                } else {
                    return canvaError.newError(d, 'Unknown type.');
                };

                if (!d.data.canvases[name].images) {
                    d.data.canvases[name].images = {};
                }

                d.data.canvases[name].images[id] = image
            } else {
                return canvaError.newError(d, 'Type, path and imageId arguments are required.');
            };
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}