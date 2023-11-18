const canvaError = require("../../index.js").utils.canvaError;
const GIFEncoder = require('gif-encoder-2');

module.exports = {
    name: "$setGIF",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "gif", param, value] = data.inside.splits;

        if (!d.data.gifs) return canvaError.newError(d, `There is no gifs ever created.`);
        if (!d.data.canvases) return canvaError.newError(d, `There is no canvases ever created.`);

        if (d.data.gifs) {
            if (d.data.gifs[name]) {
                if (param && value) {
                    let gif = d.data.gifs[name].gif
                    if (param === "delay") {
                        gif.setDelay(Number(value) || 10)
                    } else if (param === "fps") {
                        gif.setFramesPerSecond(Number(value) || 2);
                    } else if (param === "quality") {
                        var numberr = Number(value) || 1;
                        if (numberr <= 30 && numberr >= 1) {
                            gif.setQuality(numberr);
                        } else {
                            canvaError.newError(d, "Quality value must be 1-30")
                        };
                    } else if (param === "threshold") {
                        var numberr = Number(value) || 0;
                        if (numberr <= 100 && numberr >= 0) {
                            gif.setThreshold(numberr);
                        } else {
                            canvaError.newError(d, "Threshold value must be 0-100")
                        };
                    } else if (param === "repeat") {
                        var numberr = Number(value) || 0;
                        if (numberr >= 0) {
                            gif.setRepeat(numberr);
                        } else {
                            canvaError.newError(d, "Repeat value can't be lower than 0")
                        }
                    } else {
                        canvaError.newError(d, "Invalid \"Parameter\" parameter. Expected delay/fps/quality/threshold/repeat. Got: \""+param+"\"");
                    };
                } else {
                    canvaError.newError(d, "\"Parameter\" and \"Value\" parameters required.");
                };
            } else {
                canvaError.newError(d, "No gif with this name found.");
            };
        } else {
            canvaError.newError(d, "No gifs found, create at least one to use this function.");
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}