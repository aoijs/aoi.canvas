const canvaError = require("../../index.js").utils.canvaError;
const { createCanvas, GlobalFonts } = require('@napi-rs/canvas')
const getData = require("../../index.js").getData;
const fs = require("fs")

module.exports = {
    name: "$createCanvas",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", w = "512", h = "512"] = data.inside.splits;
        
        function convertToInt(str) {
            const number = parseInt(str);
            if (isNaN(number)) {
                return 0;
            }
            return number;
        }

        if (convertToInt(w) && convertToInt(h)) {
            let canv = await createCanvas(convertToInt(w), convertToInt(h));
            if (!d.data.canvases) {
                d.data.canvases = {};
            }
            d.data.canvases[name] = {canvas: canv, ctx: canv.getContext("2d")};
            
            require("../../index.js").canvasData({
                "method": "set",
                "where": "canvases",
                "what": name,
                "value": d.data.canvases[name]
            });
        } else {
            canvaError.newError(d, "One or Two size parameters are not number.")
        }

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}