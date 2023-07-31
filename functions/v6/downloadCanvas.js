const canvaError = require("../../index.js").utils.canvaError;
const path = require("path");
const indexPath = path.join(__dirname, ".../index.js")
const fs = require("fs");

module.exports = {
    name: "$downloadCanvas",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", filename = `canvas-${Math.random()}`] = data.inside.splits;
        if (!d.data.canvases[name]) return canvaError.newError(d, 'Canvas with this name not found.');
        let overdata = require(indexPath).getData();
        const folder = overdata.DownloadFolder;    
        let canvas = d.data.canvases[name].canvas.toBuffer("image/png");
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
        fs.writeFileSync(folder+filename+".png", canvas);
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}