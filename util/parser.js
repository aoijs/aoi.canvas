// Aoi.js Fork.

let { createCanvas } = require("@napi-rs/canvas");
const Discord = require("discord.js");
const { ButtonStyleOptions } = require("./Constants.js");
const SlashOption = require("./slashOption.js");
const { Time } = require("./TimeParser.js");
const { CreateObjectAST } = require("./functions.js");
const { newError } = require("./canvaError.js");
const canvaError = require("./canvaError.js");

const { loadImage, GlobalFonts} = require("@napi-rs/canvas");

function convertToInt(str) {
    const number = parseFloat(str);qg
    if (isNaN(number)) {
        return 0;
    }
    return number;
};

let loadedFonts = [];

String.prototype.onEmpty = function (ifempty) {
    if (this.trim().length === 0) {
        return ifempty;
    } else {
        return this.toString();
    }
};

String.prototype.unescape = function () {
    if (this.trim().length === 0) return "";

    var result = this
        .replace(/&COLON&/g, ":")
        .replace(/&BR&/g, "{")
        .replace(/&BL&/g, "}");

    return result;
};

String.prototype.escape = function () {
    if (this.trim().length === 0) return "";

    var result = this
        .replace(/:/g, "&COLON&")
        .replace(/{/g, "&BR&")
        .replace(/}/g, "&BL&");

    return result;
};

function mustEscape (msg) {
    return msg
        .split("\\[")
        .join("#RIGHT#")
        .replace(/\\]/g, "#LEFT#")
        .replace(/\\;/g, "#SEMI#")
        .replace(/\\:/g, "#COLON#")
        .replace(/\\$/g, "#CHAR#")
        .replace(/\\>/g, "#RIGHT_CLICK#")
        .replace(/\\</g, "#LEFT_CLICK#")
        .replace(/\\=/g, "#EQUAL#")
        .replace(/\\{/g, "#RIGHT_BRACKET#")
        .replace(/\\}/g, "#LEFT_BRACKET#")
        .replace(/\\,/g, "#COMMA#")
        .replace(/\\&&/g, "#AND#")
        .replaceAll("\\||", "#OR#");
};

const ColorLinearGradientMaker = async (ctx, color) => {
	let [ cx, cy, endx, endy, ...gstops ] = color.split("=").slice(1).join("=").split("/");

	let thisgradient = ctx.createLinearGradient(parseFloat(cx), parseFloat(cy), parseFloat(endx), parseFloat(endy));

	for (let i = 0; i < gstops.length; i += 2) {
    		let pos = gstops[i];
    		let color = gstops[i + 1];

    		await thisgradient.addColorStop(parseFloat(pos), color);
  	};

	return thisgradient;
};

const ColorRadialGradientMaker = async (ctx, color) => {
	let [ cx, cy, cradius, endx, endy, endradius, ...gstops ] = color.split("=").slice(1).join("=").split("/");

	let thisgradient = ctx.createRadialGradient(parseFloat(cx), parseFloat(cy), parseFloat(cradius), parseFloat(endx), parseFloat(endy), parseFloat(endradius));

	for (let i = 0; i < gstops.length; i += 2) {
    		let pos = gstops[i];
    		let color = gstops[i + 1];

    		await thisgradient.addColorStop(parseFloat(pos), color);
  	};

	color = thisgradient;
};

const CanvasBuilderParserFishes = {
    lineargradient: async (duck) => {
        let ctx = duck.canv.ctx;
        let [ gname = "gradient", cx = "0", cy = "0", endx = "0", endy = "0",  ...gstops] = duck.fish.params;

        gname = gname.onEmpty("gradient");
        cx = parseFloat(cx.onEmpty("0"));
        cy = parseFloat(cy.onEmpty("0"));
        endx = parseFloat(endx.onEmpty("15"));
        endy = parseFloat(endy.onEmpty("0"));
        
        if (!duck.canv.gradients) duck.canv.gradients = {};
        
        let thisgradient = ctx.createLinearGradient(cx, cy, endx, endy);

        if (duck.canv.gradients[gname]) thisgradient = duck.canv.gradients[gname];

        for (let i = 0; i < gstops.length; i += 2) {
                let pos = gstops[i];
                let color = gstops[i + 1];

            

                await thisgradient.addColorStop(parseFloat(pos), color);
        };

        duck.canv.gradients[gname] = thisgradient;
    },
    radialgradient: async (duck) => {
        let ctx = duck.canv.ctx;
        let [ gname = "gradient", cx = "0", cy = "0", cradius = "15", endx = "0", endy = "0", endradius = "15", ...gstops] = duck.fish.params;

        gname = gname.onEmpty("gradient");
        cx = cx.onEmpty("0");
        cy = cy.onEmpty("0");
        cradius = cradius.onEmpty("15");
        endx = endx.onEmpty("0");
        endy = endy.onEmpty("0");
        endradius = endradius.onEmpty("15");
        
        if (!duck.canv.gradients) duck.canv.gradients = {};
        
        let thisgradient = ctx.createRadialGradient(parseFloat(cx), parseFloat(cy), parseFloat(cradius), parseFloat(endx), parseFloat(endy), parseFloat(endradius));

        if (duck.canv.gradients[gname]) thisgradient = duck.canv.gradients[gname];

        for (let i = 0; i < gstops.length; i += 2) {
                let pos = gstops[i];
                let color = gstops[i + 1];

                await thisgradient.addColorStop(parseFloat(pos), color);
        };

        duck.canv.gradients[gname] = thisgradient;
    },
    image: async (duck) => {
        let ctx = duck.canv.ctx;
        let [ type = "url", path, x = "0", y = "0", w = duck.canv.canvas.width.toString(), h = duck.canv.canvas.height.toString(), radius = "0" ] = duck.fish.params

        type = type.onEmpty("url") || undefined; x = x.onEmpty("0"); y = y.onEmpty("0"); w = w.onEmpty(duck.canv.canvas.width.toString()); h = h.onEmpty(duck.canv.canvas.height.toString()); radius = radius.onEmpty("0");

        if (x && (x.toLowerCase() === "center" || x.toLowerCase() === "%center%"))
            x = (duck.canv.canvas.width - parseFloat(w)) / 2;

        if (y && (y.toLowerCase() === "center" || y.toLowerCase() === "%center%"))
            y = (duck.canv.canvas.height - parseFloat(h)) / 2;

        if (radius && (radius.toLowerCase() === "%circle%" || radius.toLowerCase() === "circle"))
            radius = parseFloat(w) / 2;

        if (!path) return canvaError.newError(duck.d, `Please provide (path/link) parameter.`);
        
        if (type && (
            type.toLowerCase() === "link" 
            || 
            type.toLowerCase() === "url"
        ) === true) {
            let image;

            await loadImage(path.addBrackets().unescape()).then((img) => {
                image = img;
            });

            if (!duck.d.data.canvases[duck.settings.params[0]].images) {
                duck.d.data.canvases[duck.settings.params[0]].images = {};
            }
            duck.d.data.canvases[duck.settings.params[0]].images[(duck.d.data.canvases[duck.settings.params[0]].images.length + 1).toString()] = image

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(parseFloat(x) + parseInt(radius), parseFloat(y));
            ctx.arcTo(parseFloat(x) + parseFloat(w), parseFloat(y), parseFloat(x) + parseFloat(w), parseFloat(y) + parseFloat(h), parseInt(radius));
            ctx.arcTo(parseFloat(x) + parseFloat(w), parseFloat(y) + parseFloat(h), parseFloat(x), parseFloat(y) + parseFloat(h), parseInt(radius));
            ctx.arcTo(parseFloat(x), parseFloat(y) + parseFloat(h), parseFloat(x), parseFloat(y), parseInt(radius));
            ctx.arcTo(parseFloat(x), parseFloat(y), parseFloat(x) + parseFloat(w), parseFloat(y), parseInt(radius));
            ctx.closePath();
            ctx.clip();
            await ctx.drawImage(image, parseFloat(x), parseFloat(y), parseFloat(w), parseFloat(h));
            ctx.restore();
        } else if (type && (
            type.toLowerCase() === "file"
            ||
            type.toLowerCase() === "path"
            ||
            type.toLowerCase() === "local"
        ) === true) {
            let image;

            await loadImage(nodepath.join(__dirname, path.addBrackets().replace(/&COLON&/g, ":"))).then((img) => {
                image = img;
            });

            if (!duck.d.data.canvases[duck.settings.params[0]].images) {
                duck.d.data.canvases[duck.settings.params[0]].images = {};
            }
            duck.d.data.canvases[duck.settings.params[0]].images[(duck.d.data.canvases[duck.settings.params[0]].images.length + 1).toString()] = image

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(parseFloat(x) + parseInt(radius), parseFloat(y));
            ctx.arcTo(parseFloat(x) + parseFloat(w), parseFloat(y), parseFloat(x) + parseFloat(w), parseFloat(y) + parseFloat(h), parseInt(radius));
            ctx.arcTo(parseFloat(x) + parseFloat(w), parseFloat(y) + parseFloat(h), parseFloat(x), parseFloat(y) + parseFloat(h), parseInt(radius));
            ctx.arcTo(parseFloat(x), parseFloat(y) + parseFloat(h), parseFloat(x), parseFloat(y), parseInt(radius));
            ctx.arcTo(parseFloat(x), parseFloat(y), parseFloat(x) + parseFloat(w), parseFloat(y), parseInt(radius));
            ctx.closePath();
            ctx.clip();
            await ctx.drawImage(image, parseFloat(x), parseFloat(y), parseFloat(w), parseFloat(h));
            ctx.restore();
        } else {
            duck.fish.params[0] = ">"+duck.fish.params[0]+"<"
            return canvaError.newError(duck.d, `Invalid type. {${duck.fish.name}:${duck.fish.params.join(":")}}`)
        }
    },
    font: async (duck) => {
        let [ font = "10px Arial" ] = duck.fish.params;
        font = font.onEmpty("10px Arial");

        duck.canv.ctx.font = font;
    },
    addfont: async (duck) => {
        let [ font = "MyFont", path ] = duck.fish.params;
        font = font.onEmpty("MyFont");
        
        if (!path) return canvaError.newError(duck.d, `No Path parameter. ({${duck.fish.name}:${duck.params.join(":")}})`);

        const data = fs.readFileSync(nodepath.join(getData().dirname, path));

        if (loadedFonts.find(tfont => tfont.name === font) && loadedFonts.find(tfont => tfont.data === data)) return;

        GlobalFonts.register(data, font.addBrackets().unescape());
        loadedFonts.push({
	name: font,
	data: data
        });
    },
    textalign: async (duck) => {
      let ctx = duck.canv.ctx;
      let [ align = "start" ] = duck.fish.params;
      
      align = align.onEmpty("start");

      ctx.textAlign = align;
    },
    stroketext: async (duck) => {
        let ctx = duck.canv.ctx;
        let [ text = "Text", font = "30px Arial", strokecolor = "#000000", x = "center", y = "center", strokesize = "1"] = duck.fish.params;
        
        text = text.onEmpty("Text")
        font = font.onEmpty("30px Arial")
        x = x.onEmpty("center")
        y = y.onEmpty("center")
        strokecolor = strokecolor.onEmpty("#000000")
        strokesize = strokesize.onEmpty("0")

        ctx.font = font;

        const oldstrokecolor = ctx.strokeStyle;
        const oldstrokesize = ctx.lineWidth;

	if (strokecolor.toLowerCase().startsWith("gradientid=")) {
		let gradients = duck.canv.gradients;
		if (gradients) {
			let [gradientnaefrnirognrieorngeioirngoirnoeriognrigoernio, ...gradientname] = strokecolor.split("=");
			if (gradients[gradientname])
			strokecolor = gradients[gradientname.join()];
		};
	} else if (strokecolor.toLowerCase().startsWith("lineargradient=")) {
		strokecolor = await ColorLinearGradientMaker(duck.canv.ctx, strokecolor);
	}  else if (strokecolor.toLowerCase().startsWith("radialgradient=")) {
		strokecolor = await ColorRadialGradientMaker(duck.canv.ctx, strokecolor);
	};

        ctx.strokeStyle = strokecolor;
        ctx.lineWidth = strokesize;

        const oldalign = ctx.textAlign;
        const oldbaseline = ctx.textBaseline;

        if (x && (x.toLowerCase() === "center" || x.toLowerCase() === "%center%")) {
            ctx.textAlign = "center"
            x = duck.canv.canvas.width / 2;
        };

        if (y && (y.toLowerCase() === "center" || y.toLowerCase() === "%center%")) {
            ctx.textBaseline = "middle"
            y = duck.canv.canvas.height / 2;
        };
        
        ctx.strokeText(text.addBrackets().unescape(), parseFloat(x), parseFloat(y));

        ctx.textAlign = oldalign;
        ctx.textBaseline = oldbaseline;
        ctx.strokeStyle = oldstrokecolor;
        ctx.lineWidth = oldstrokesize;
    },
    text: async (duck) => {
        let ctx = duck.canv.ctx;
        let [ text = "Text", font = "30px Arial", color = "#000000", x = "center", y = "center"] = duck.fish.params;
        
        text = text.onEmpty("Text")
        font = font.onEmpty("30px Arial")
        color = color.onEmpty("000000")
        x = x.onEmpty("center")
        y = y.onEmpty("center")

        const oldalign = ctx.textAlign;
        const oldbaseline = ctx.textBaseline;

	if (color.toLowerCase().startsWith("gradientid=")) {
		let gradients = duck.canv.gradients;
		if (gradients) {
			let [gradientnaefrnirognrieorngeioirngoirnoeriognrigoernio, ...gradientname] = color.split("=");
			if (gradients[gradientname])
			color = gradients[gradientname.join()];
		};
	} else if (color.toLowerCase().startsWith("lineargradient=")) {
		color = await ColorLinearGradientMaker(duck.canv.ctx, strokecolor);
	}  else if (color.toLowerCase().startsWith("radialgradient=")) {
		color = await ColorRadialGradientMaker(duck.canv.ctx, strokecolor);
	};

        ctx.font = font;
        ctx.fillStyle = color;

        if (x && (x.toLowerCase() === "center" || x.toLowerCase() === "%center%")) {
            ctx.textAlign = "center"
            x = duck.canv.canvas.width / 2;
        };

        if (y && (y.toLowerCase() === "center" || y.toLowerCase() === "%center%")) {
            ctx.textBaseline = "middle"
            y = duck.canv.canvas.height / 2;
        };
            
         ctx.fillText(text.addBrackets().unescape(), parseFloat(x), parseFloat(y));
        
        ctx.textAlign = oldalign;
        ctx.textBaseline = oldbaseline;
    },
    color: async (duck) => {
        let ctx = duck.canv.ctx;
        let [ color = "none" ] = duck.fish.params;

        color = color.onEmpty("none")

	if (color.toLowerCase().startsWith("gradientid=")) {
		let gradients = duck.canv.gradients;
		if (gradients) {
			let [gradientnaefrnirognrieorngeioirngoirnoeriognrigoernio, ...gradientname] = color.split("=");
			if (gradients[gradientname])
			color = gradients[gradientname.join()];
		};
	} else if (color.toLowerCase().startsWith("lineargradient=")) {
		color = await ColorLinearGradientMaker(duck.canv.ctx, strokecolor);
	}  else if (color.toLowerCase().startsWith("radialgradient=")) {
		color = await ColorRadialGradientMaker(duck.canv.ctx, strokecolor);
	};

        if (color !== "none") {
	ctx.fillStyle = color;
        } else {
	ctx.fillStyle = "#000";
        };
    },
    strokecolor: async (duck) => {
        let ctx = duck.canv.ctx;
        let [ color = "none" ] = duck.fish.params;

        color = color.onEmpty("none")

	if (color.toLowerCase().startsWith("gradientid=")) {
		let gradients = duck.canv.gradients;
		if (gradients) {
			let [gradientnaefrnirognrieorngeioirngoirnoeriognrigoernio, ...gradientname] = color.split("=");
			if (gradients[gradientname])
			color = gradients[gradientname.join()];
		};
	} else if (color.toLowerCase().startsWith("lineargradient=")) {
		color = await ColorLinearGradientMaker(duck.canv.ctx, color);
	}  else if (color.toLowerCase().startsWith("radialgradient=")) {
		color = await ColorRadialGradientMaker(duck.canv.ctx, color);
	};

        if (color !== "none") {
	ctx.strokeStyle = color;
        } else {
	ctx.strokeStyle = "#000";
        };
    },
    rect: async (duck) => {
        let ctx = duck.canv.ctx;
        let [ color = "black", x = "center", y = "center", w = duck.canv.canvas.width.toString(), h = duck.canv.canvas.height.toString(), radius = "0" ] = duck.fish.params;

        color = color.onEmpty("black")
        x = x.onEmpty("center");
        y = y.onEmpty("center");
        w = w.onEmpty(duck.canv.canvas.width.toString());
        h = h.onEmpty(duck.canv.canvas.height.toString());
        radius = radius.onEmpty("0");

	if (color.toLowerCase().startsWith("gradientid=")) {
		let gradients = duck.canv.gradients;
		if (gradients) {
			let [gradientnaefrnirognrieorngeioirngoirnoeriognrigoernio, ...gradientname] = color.split("=");
			if (gradients[gradientname])
			color = gradients[gradientname.join()];
		};
	} else if (color.toLowerCase().startsWith("lineargradient=")) {
		color = await ColorLinearGradientMaker(duck.canv.ctx, color);
	}  else if (color.toLowerCase().startsWith("radialgradient=")) {
		color = await ColorRadialGradientMaker(duck.canv.ctx, color);
	};

    if (x && (x.toLowerCase() === "center" || x.toLowerCase() === "%center%"))
        x = (duck.canv.canvas.width - parseFloat(w)) / 2;

    if (y && (y.toLowerCase() === "center" || y.toLowerCase() === "%center%"))
        y = (duck.canv.canvas.height - parseFloat(h)) / 2;

    if (radius && (radius.toLowerCase() === "%circle%" || radius.toLowerCase() === "circle"))
        radius = parseFloat(w) / 2;

        if (w < 1 || h < 1) {
            if (duck.fish.params[3]) duck.fish.params[3] = (w < 1) ? ">"+duck.fish.params[3]+"<" : duck.fish.params[3];
            if (duck.fish.params[4]) duck.fish.params[4] = (h < 1) ? ">"+duck.fish.params[4]+"<" : duck.fish.params[4];

            return canvaError.newError(duck.d, `Width/Height needs to be greater than 0. ({${duck.fish.name}:${duck.fish.params.join(":")}})`)
        };

        const step = Math.min(parseFloat(w), parseFloat(h)) * 0.1;

        const oldcolor = ctx.fillStyle;

        if (parseFloat(radius) === 0) {
            ctx.fillStyle = color;
            ctx.fillRect(parseFloat(x), parseFloat(y), parseFloat(w), parseFloat(h));
            ctx.fillStyle = oldcolor;
        } else {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(parseFloat(x) + parseFloat(radius), parseFloat(y));
            ctx.lineTo(parseFloat(x) + parseFloat(w) - parseFloat(radius), parseFloat(y));
            ctx.quadraticCurveTo(parseFloat(x) + parseFloat(w), parseFloat(y), parseFloat(x) + parseFloat(w), parseFloat(y) + parseFloat(radius));
            ctx.lineTo(parseFloat(x) + parseFloat(w), parseFloat(y) + parseFloat(h) - parseFloat(radius));
            ctx.quadraticCurveTo(parseFloat(x) + parseFloat(w), parseFloat(y) + parseFloat(h), parseFloat(x) + parseFloat(w) - parseFloat(radius), parseFloat(y) + parseFloat(h));
            ctx.lineTo(parseFloat(x) + parseFloat(radius), parseFloat(y) + parseFloat(h));
            ctx.quadraticCurveTo(parseFloat(x), parseFloat(y) + parseFloat(h), parseFloat(x), parseFloat(y) + parseFloat(h) - parseFloat(radius));
            ctx.lineTo(parseFloat(x), parseFloat(y) + parseFloat(radius));
            ctx.quadraticCurveTo(parseFloat(x), parseFloat(y), parseFloat(x) + parseFloat(radius), parseFloat(y));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = oldcolor;
        }
    },
    void: async (duck) => {
        let ctx = duck.canv.ctx;
        let [x = "center", y = "center", w = duck.canv.canvas.width.toString(), h = duck.canv.canvas.height.toString()] = duck.fish.params;

        x = x.onEmpty("center");
        y = y.onEmpty("center");
        w = w.onEmpty(duck.canv.canvas.width.toString());
        y = y.onEmpty(duck.canv.canvas.height.toString());

        if (x && (x.toLowerCase() === "center" || x.toLowerCase() === "%center%"))
            x = (duck.canv.canvas.width - parseFloat(w)) / 2;

        if (y && (y.toLowerCase() === "center" || y.toLowerCase() === "%center%"))
            y = (duck.canv.canvas.height - parseFloat(h)) / 2;

        ctx.clearRect(parseFloat(x), parseFloat(y), parseFloat(w), parseFloat(h));
    },
    shadow: async (duck) => {
        let ctx = duck.canv.ctx;
        let [ size = "0", color = "#000000" ] = duck.fish.params;

        size = size.onEmpty("0");
        color = color.onEmpty("#000000");

	if (color.toLowerCase().startsWith("gradientid=")) {
		let gradients = duck.canv.gradients;
		if (gradients) {
			let [gradientnaefrnirognrieorngeioirngoirnoeriognrigoernio, ...gradientname] = color.split("=");
			if (gradients[gradientname])
			color = gradients[gradientname.join()];
		};
	} else if (color.toLowerCase().startsWith("lineargradient=")) {
		color = await ColorLinearGradientMaker(duck.canv.ctx, color);
	}  else if (color.toLowerCase().startsWith("radialgradient=")) {
		strokecolor = await ColorRadialGradientMaker(duck.canv.ctx, color);
	};
         
        ctx.shadowColor = color;
        ctx.shadowBlur = parseFloat(size);
         
    },
    effect: async (duck) => {
        let ctx = duck.canv.ctx;
        let [ effect = "none", value = "none" ] = duck.fish.params;

        effect = effect.onEmpty("blur");
        value = value.onEmpty("5");

        const val = parseFloat(value);

        let effects = {
            "grayscale": `grayscale(${val}%)`,
            "blur": `blur(${val}px)`,
            "sepia": `sepia(${val}%)`,
            "brightness": `brightness(${val})`,
            "contrast": `contrast(${val})`,
            "invert": `invert(${val})`,
            "saturate": `saturate(${val})`,
            "none": "none"
        };

        if (effects[effect]) {
            ctx.filter = effects[effect]
        } else {
            return canvaError.newError(duck.d, `Effect '${effect}' not found.`);
        };
    },
    addeffect: async (duck) => {
        let ctx = duck.canv.ctx;
        let [ effect = "blur", value = "5" ] = duck.fish.params;

        effect = effect.onEmpty("blur");
        value = value.onEmpty("5");

        const val = parseFloat(value);

        let effects = {
            "grayscale": `grayscale(${val}%)`,
            "blur": `blur(${val}px)`,
            "sepia": `sepia(${val}%)`,
            "brightness": `brightness(${val})`,
            "contrast": `contrast(${val})`,
            "invert": `invert(${val})`,
            "saturate": `saturate(${val})`
        };

        if (effects[effect]) {
            if (ctx.filter === "none") {
                ctx.filter = effects[effect];
            } else {
	ctx.filter += " "+effects[effect];
            };
        } else {
            return canvaError.newError(duck.d, `Effect '${effect}' not found.`);
        };
    },
    rotate: async (duck) => {
        let [ angle = "0" ] = duck.fish.params;
        angle = angle.onEmpty("0");

        const canvas = duck.canv.canvas;
        const ctx = duck.canv.ctx;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.translate(centerX, centerY);
        ctx.rotate((angl * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
    },
    stroke: async (duck) => {
        let ctx = duck.canv.ctx
        let [ color = "#000000", size = "1"] = duck.fish.params;
    
        color = color.onEmpty("#000000");
        size = size.onEmpty("0");

	if (color.toLowerCase().startsWith("gradientid=")) {
		let gradients = duck.canv.gradients;
		if (gradients) {
			let [gradientnaefrnirognrieorngeioirngoirnoeriognrigoernio, ...gradientname] = color.split("=");
			if (gradients[gradientname])
			color = gradients[gradientname.join()];
		};
	} else if (color.toLowerCase().startsWith("lineargradient=")) {
		let [ cx, cy, endx, endy, ...gstops ] = color.split("=").slice(1).join("=").split("/");

		let thisgradient = ctx.createLinearGradient(cx, cy, endx, endy);

		for (let i = 0; i < gstops.length; i += 2) {
    			let pos = gstops[i];
    			let color = gstops[i + 1];

			

    			await thisgradient.addColorStop(parseFloat(pos), color);
  		};

		color = thisgradient;
	}  else if (color.toLowerCase().startsWith("radialgradient=")) {
		let [ cx, cy, cradius, endx, endy, endradius, ...gstops ] = color.split("=").slice(1).join("=").split("/");

		let thisgradient = ctx.createRadialGradient(cx, cy, cradius, endx, endy, endradius);

		for (let i = 0; i < gstops.length; i += 2) {
    			let pos = gstops[i];
    			let color = gstops[i + 1];

    			await thisgradient.addColorStop(parseFloat(pos), color);
  		};

		color = thisgradient;
	};
         
        ctx.strokeStyle = color;
        ctx.lineWidth = parseFloat(size);
        await ctx.stroke();
    },
};

async function catParser (cat) {
        let obj = [];

        for (var kitty of cat.split("{")) {
            let object = { };

            var inside = kitty.split("}")[0]
            var [ name, ...params ] = inside.split(":")

            object.name = name || "undefined"
            object.params = params || []

            obj.push(object)
        }

        return obj;
};

const AllParser = async (messg, d, returnMsg = false, channel, client) => {
    let message = {};

    const CanvasBuilderParser = async (msg) => {
                let cat = msg.split("{newCanvas:").slice(1);
	let parsed = await catParser(cat[0]);

                 if (!parsed) return;
            let settings = parsed.find(fish => fish.name === "settings")
            if (!settings) return canvaError.newError(d, `No settings option.`);
            if (!d.data.canvases) d.data.canvases = {};

            let [cname = "canvas", w = "512", h = "512"] = settings.params || ["canvas", "512", "512"];

            cname = cname.onEmpty("canvas").trim();
            w = w.onEmpty("512").trim();
            h = h.onEmpty("512").trim();

            let canvas = await createCanvas(parseFloat(w), parseFloat(h))
            let canv = {
                canvas: canvas,
                ctx: canvas.getContext("2d")
            };
            
            if (d.data.canvases[cname]) canv = d.data.canvases[cname];
            d.data.canvases[cname] = canv;

            for (var fish of parsed) {
                if (fish && fish.name && typeof fish.name === "string")
                if (CanvasBuilderParserFishes[fish.name.toLowerCase()])

                await CanvasBuilderParserFishes[fish.name.toLowerCase()]({
                    canv: (d.data.canvases[cname]),
                    d,
                    fish: fish,
                    fishes: CanvasBuilderParserFishes,
                    cat,
                    parsed,
                    settings,
                });
            };
    };

    const EmbedParser = async (msg) => {
        msg = mustEscape(msg);
    
        if (!message.embeds) message.embeds = [];
        const embeds = message.embeds;
    
        let msgs = msg.split("{newEmbed:").slice(1);
        for (let rawr of msgs) {
            rawr = rawr.slice(0, rawr.length - 1);
    
            const embed = {};
            embed.fields = [];
            const Checker = (peko) => rawr.includes(`{${peko}:`);
            if (Checker("author")) {
                const auth = rawr.split("{author:")[1].split("}")[0].split(":");
    
                var name = auth.shift().addBrackets()?.trim() || "";
                var icon_url = auth.join(":").addBrackets()?.trim() || "";

                if (icon_url.startsWith("canvas:")) {
                    let parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai = icon_url.split(":");
                    let canvas_name = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai[1]
                    let canvasname = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai.slice(2).join(":");
                    if (d.canvases && d.data.canvases[canvasname]) {
                        let canvas_image = await d.data.canvases[canvasname].canvas.encode("png");
                        const attachment = new Discord.AttachmentBuilder(canvas_image, { "name": canvas_name+".png" });
                        if (!message.files) message.files = [];
                        if (!message.files.some(hi => hi.name === canvas_name+".png")) message.files.push(attachment);
                        icon_url = "attachment://"+canvas_name+".png";
                    } else {
                        newError(d, `|Parser| Canvas with name ${canvasname} not found.`);
                    }
                }
    
                embed.author = {
                    name: name,
                    icon_url: icon_url,
                };
            }
            if (Checker("authorURL")) {
                if (!embed.author) return console.error("{author:} was not used");

                let icon_url = rawr.split("{authorURL:")[1]
                    .split("}")[0]
                    .addBrackets()
                    .trim()

                embed.author.url = icon_url;
            }
            if (Checker("title")) {
                embed.title = rawr
                    .split("{title:")[1]
                    .split("}")[0]
                    .addBrackets()
                    .trim();
            }
            if (Checker("url")) {
                if (!embed.title)
                    return console.error(
                        "Title was not provided while using {url}",
                    );
                embed.url = rawr
                    .split("{url:")[1]
                    .split("}")[0]
                    .addBrackets()
                    .trim();
            }
            if (Checker("description")) {
                embed.description = rawr
                    .split("{description:")[1]
                    .split("}")[0]
                    .addBrackets()
                    .trim();
            }
            if (Checker("thumbnail")) {
                let auth = rawr.split("{thumbnail:")[1]
                .split("}")[0].addBrackets().split(":");
                let icon_url = auth.join(":").trim();

                if (icon_url.startsWith("canvas:")) {
                    let parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai = icon_url.split(":");
                    let canvas_name = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai[1]
                    let canvasname = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai.slice(2).join(":");
                    if (d.data.canvases && d.data.canvases[canvasname]) {
                        let canvas_image = await d.data.canvases[canvasname].canvas.encode("png");
                        const attachment = new Discord.AttachmentBuilder(canvas_image, { "name": canvas_name+".png" });
                        if (!message.files) message.files = [];
                        if (!message.files.some(hi => hi.name === canvas_name+".png")) message.files.push(attachment);
                        icon_url = "attachment://"+canvas_name+".png";
                    } else {
                        newError(d, `|Parser| Canvas with name ${canvasname} not found.`);
                    }
                }
                embed.thumbnail = {
                    url: icon_url,
                };
            }
            if (Checker("image")) {
                let auth = rawr.split("{image:")[1]
                .split("}")[0].addBrackets().split(":");
                let icon_url = auth.join(":").trim();

                if (icon_url.startsWith("canvas:")) {
                    let parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai = icon_url.split(":");
                    let canvas_name = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai[1]
                    let canvasname = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai.slice(2).join(":");
                    if (d.data.canvases && d.data.canvases[canvasname]) {
                        let canvas_image = await d.data.canvases[canvasname].canvas.encode("png");
                        const attachment = new Discord.AttachmentBuilder(canvas_image, { "name": canvas_name+".png" });
                        if (!message.files) message.files = [];
                        if (!message.files.some(hi => hi.name === canvas_name+".png")) message.files.push(attachment);
                        icon_url = "attachment://"+canvas_name+".png";
                    } else {
                        newError(d, `|Parser| Canvas with name ${canvasname} not found.`);
                    }
                }
                embed.image = {
                    url: icon_url,
                };
            }
            if (Checker("footer")) {
                const f = rawr.split("{footer:")[1].split("}")[0].split(":");

                let icon_url = f.join(":").addBrackets().trim() || "";

                if (icon_url.startsWith("canvas:")) {
                    let parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai = icon_url.split(":");
                    let canvas_name = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai[1]
                    let canvasname = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai.slice(2).join(":");
                    if (d.data.canvases && d.data.canvases[canvasname]) {
                        let canvas_image = await d.data.canvases[canvasname].canvas.encode("png");
                        const attachment = new Discord.AttachmentBuilder(canvas_image, { "name": canvas_name+".png" });
                        if (!message.files) message.files = [];
                        if (!message.files.some(hi => hi.name === canvas_name+".png")) message.files.push(attachment);
                        icon_url = "attachment://"+canvas_name+".png";
                    } else {
                        newError(d, `|Parser| Canvas with name ${canvasname} not found.`);
                    }
                }

                embed.footer = {
                    text: f.shift().addBrackets().trim() || "",
                    icon_url: f.join(":").addBrackets().trim() || "",
                };
            }
            if (Checker("color")) {
                embed.color = Discord.resolveColor(
                    rawr.split("{color:")[1].split("}")[0].addBrackets().trim(),
                );
            }
            if (rawr.includes("{timestamp")) {
                let t = rawr
                    .split("{timestamp")[1]
                    .split("}")[0]
                    .replace(":", "")
                    .trim();
                if (t === "" || t === "ms") {
                    t = Date.now();
                }
                embed.timestamp = new Date(t);
            }
            if (Checker("field")) {
                const fi = rawr.split("{field:").slice(1);
                for (let fo of fi) {
                    fo = fo.split("}")[0].split(":");
                    const fon = fo.shift().addBrackets().trim();
                    const foi = ["yes", "no", "true", "false"].find(
                        (x) => x === fo[Number(fo.length - 1)].trim(),
                    )
                        ? fo.pop().trim() === "true"
                        : false;
    
                    const fov = fo.join(":").addBrackets().trim();
                    embed.fields.push({ name: fon, value: fov, inline: foi });
                }
            }
            if (Checker("fields")) {
                const fie = rawr.split("{fields:").slice(1);
                for (let fiel of fie) {
                    fiel = fiel.split("}")[0].split(":");
                    for (let oof of fiel) {
                        oof = oof.split(",");
                        const oofn = oof.shift().addBrackets().trim();
                        const oofi = ["yes", "no", "true", "false"].find(
                            (x) => x === oof[oof.length - 1].trim(),
                        )
                            ? oof.pop().trim() === "true"
                            : false;
                        const oofv = oof.join(",").addBrackets().trim();
                        embed.fields.push({
                            name: oofn,
                            value: oofv,
                            inline: oofi,
                        });
                    }
                }
            }
            embeds.push(embed);
        }
    };

    const ComponentParser = d.util.parsers.ComponentParser;
    const EditParser = d.util.parsers.EditParser;
    const FileParser = d.util.parsers.FileParser;
    const OptionParser = d.util.parsers.OptionParser;

    let errorMessage = messg;
    errorMessage = errorMessage.trim();
    let send = true;
    let deleteCommand = false;
    let interaction;
    let deleteAfter;
    const Checker = (parts,ayaya) => parts.includes("{" + ayaya + ":");
    let suppress = false;
    let reactions = [];

    let edits = {
        time: "0s",
        messages: [],
    };
  const parts = CreateObjectAST( errorMessage );
  for ( const part of parts )
  {
      errorMessage = errorMessage.replace( part, "" );
        if (Checker(part,"newEmbed")) await EmbedParser(part);
        else if (Checker(part, "actionRow"))
            message["components"] = await ComponentParser(part);
        else if (Checker(part, "newCanvas"))
            await CanvasBuilderParser(part);
        else if (Checker(part, "attachment") || Checker("file"))
            message["files"] = FileParser(part);
        else if (Checker(part, "edit")) edits = await EditParser(part);
        else if (Checker(part, "suppress")) suppress = true;
        else if (Checker(part,"deleteCommand")) deleteCommand = true;
        else if (Checker(part, "interaction")) interaction = true;
        else if (Checker(part, "deleteAfter"))
            deleteAfter = part.split(":")[1].trim();
        else if (Checker(part, "reactions"))
            reactions = part
                .split(":")[1]
                .trim().split("}")[0]
                .split(",")
                .map((x) => x.trim());
    }

    let embeds = message.embeds || [];
    let components = message.components || [];
    let files = message.files || [];

    if (!embeds.length) send = false;

    if (send && suppress) send = false;

    if (returnMsg === true) {
        return {
          embeds: send ? embeds : [],
          components: components,
            content:
                errorMessage.addBrackets() === ""
                    ? " "
                    : errorMessage.addBrackets(),
            files,
            options: {
                reactions: reactions.length ? reactions : undefined,
                suppress,
                edits,
                deleteIn: deleteAfter,
                deleteCommand,
            },
        };
    }

    errorMessage = errorMessage.addBrackets().trim();
    if (!(errorMessage.length || send || files.length)) return;

    const ch = channel || d.channel;

    if (
        (errorMessage.length || send || files.length) &&
        d &&
        ch &&
        !returnMsg
    ) {
        const m = await ch
            .send({
                content: errorMessage.addBrackets(),
                embeds: send ? embeds : [],
                files: files?.length ? files : [],
            })
            .catch(() => {});

        if (!m) return;

        if (m && reactions.length) {
            for (const reaction of reactions) {
                await m.react(reaction).catch(console.error);
            }
        }

        if (m && edits.timeout) {
            for (const code of edits.messages) {
                await new Promise((e) => setTimeout(e, edits.timeout));

                const sender = await errorHandler(d, code, true);

                await m.suppressEmbeds(suppress);

                await m.edit(sender.message, sender.embed).catch(() => null);
            }
        }

        if (m && deleteAfter) {
            m.delete({
                timeout: deleteAfter,
            }).catch(() => null);
        }

        if (returnMsg === "id") {
            return m.id;
        } else if (returnMsg === "object") {
            return m;
        } else if (returnMsg === "withMessage") return m;
    }
};

module.exports = {
    catParser,
    AllParser,
    CanvasBuilderParserFishes,
    loadedFonts,
    ColorLinearGradientMaker,
    ColorRadialGradientMaker
};