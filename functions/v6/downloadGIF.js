const canvaError = require("../../index.js").utils.canvaError;
const path = require("path");
const indexPath = path.join(__dirname, "../../index.js")
const fs = require("fs");

module.exports = {
    name: "$downloadGIF",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "gif", filename = `gif-${Math.random()}`] = data.inside.splits;

        if (d.data.gifs[name]) {
            let data = require(indexPath).getData();
            const folder = data.DownloadFolder;
            
            let canvas = await d.data.gifs[name].gif.out.getData();

            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder)
            };
            fs.writeFileSync(folder+filename+".gif", canvas)
        }else {
            return canvaError.newError(d, 'Gif with this name not found.');
        }
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}