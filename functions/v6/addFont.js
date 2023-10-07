const canvaError = require("../../index.js").utils.canvaError;
const { GlobalFonts } = require("@napi-rs/canvas");

let loadedFonts = [];

module.exports = {
    name: "$addFont",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", font = "MyFont", path] = data.inside.splits;

        if (d.data.canvases[name]) {
            const fs = require("fs");
            const data = fs.readFileSync(path);

            if (loadedFonts.find(tfont => tfont.name === font) && loadedFonts.find(tfont => tfont.data === data)) return;

            GlobalFonts.register(data, font)
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};