const canvaError = require("../../index.js").utils.canvaError;
const { ColorRadialGradientMaker, ColorLinearGradientMaker } = require("../../index.js").utils.parser;

module.exports = {
    name: "$canvasColor",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", color = "ffffff", type = "color"] = data.inside.splits;

        if (!d.data.canvases) return canvaError.newError(d, `There is no canvases ever created.`);

        if (d.data.canvases[name]) {
            if (type.toLowerCase() === "color" || type.toLowerCase() === "1" || type.toLowerCase() === "content" || type.toLowerCase() === "contentcolor" || type.toLowerCase() === "fill" || type.toLowerCase() === "fillstyle") {

	if (color.toLowerCase().startsWith("gradientid=")) {
		let gradients = d.data.canvases[name].gradients;
		if (gradients) {
			let [gradientnaefrnirognrieorngeioirngoirnoeriognrigoernio, ...gradientname] = color.split("=");
			if (gradients[gradientname])
			color = gradients[gradientname.join()];
		};
	} else if (color.toLowerCase().startsWith("lineargradient=")) {
		color = await ColorLinearGradientMaker(d.data.canvases[name].ctx, strokecolor);
	}  else if (color.toLowerCase().startsWith("radialgradient=")) {
		color = await ColorRadialGradientMaker(d.data.canvases[name].ctx, strokecolor);
	};

	d.data.canvases[name].ctx.fillStyle = color;
            } else if (type.toLowerCase() === "stroke" || type.toLowerCase() === "2" || type.toLowerCase() === "strokecolor" || type.toLowerCase() === "strokestyle") {
	d.data.canvases[name].ctx.strokeStyle = color;
            } else if (type.toLowerCase() === "shadow" || type.toLowerCase() === "3" || type.toLowerCase() === "shadowcolor" || type.toLowerCase() === "shadowstyle") {
	d.data.canvases[name].ctx.shadowColor = color;
            } else {
	return canvaError.newError(d, "Invalid type.");
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