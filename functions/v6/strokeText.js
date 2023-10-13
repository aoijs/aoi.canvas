module.exports = {
    name: "$strokeText",
    type: "djs",
    code: async (d) => {
        const canvaError = require("../../index.js").utils.canvaError;
        const data = d.util.aoiFunc(d);
        let [name = "canvas", text = "Text", x = "1", y = "1", size = "0"] = data.inside.splits;

        function convertToInt(str) {
            const number = parseFloat(str);
            if (isNaN(number)) {
                return 0;
            }
            return number;
        }

        if (d.data.canvases[name]) {
            var canvas = d.data.canvases[name].canvas;
            var ctx = d.data.canvases[name].ctx;

            const oldalign = ctx.textAlign;
            const oldbaseline = ctx.textBaseline;
            const oldstrokesize = ctx.lineWidth;

            if (x && (x.toLowerCase() === "center" || x.toLowerCase() === "%center%")) {
                ctx.textAlign = "center";
                x = canvas.width / 2;
            }; 

            if (y && (y.toLowerCase() === "center" || y.toLowerCase() === "%center%")) {
                ctx.textBaseline = "middle";
                y = canvas.height / 2;
            };

            ctx.lineWidth = size;
            
            ctx.strokeText(text.addBrackets(), convertToInt(x), convertToInt(y))
            ctx.textAlign = oldalign;
            ctx.textBaseline = oldbaseline;
            ctx.lineWidth = oldstrokesize;
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}