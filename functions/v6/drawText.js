module.exports = {
    name: "$drawText",
    type: "djs",
    code: async (d) => {
        const canvaError = require("../../index.js").utils.canvaError;
        const data = d.util.aoiFunc(d);
        let [name = "canvas", text = "Text", x = "1", y = "1"] = data.inside.splits;

        function convertToInt(str) {
            const number = parseInt(str);
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

            if (x && x === "center") {
                ctx.textAlign = "center";
                x = canvas.width / 2;
            }; 

            if (y && y === "center") {
                ctx.textBaseline = "middle";
                y = canvas.height / 2;
            };
            
            ctx.fillText(text.addBrackets(), convertToInt(x), convertToInt(y));
            ctx.textAlign = oldalign;
            ctx.textBaseline = oldbaseline;
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}