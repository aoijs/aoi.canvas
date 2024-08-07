"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GIFManager = exports.GradientManager = exports.CanvasManager = exports.Manager = void 0;
const canvas_1 = require("@napi-rs/canvas");
const builder_1 = require("./builder");
const gifencoder = require("gif-encoder-2");
class Manager {
    map;
    constructor() {
        this.map = new Map();
    }
    ;
    remove = (name) => this.map.delete(name);
    set = (name, value) => this.map.set(name, value);
    get = (name) => this.map.get(name);
    all = () => this.map;
}
exports.Manager = Manager;
;
class CanvasManager extends Manager {
    create = (name, width, height) => this.set(name, new builder_1.CanvasBuilder(width, height));
}
exports.CanvasManager = CanvasManager;
;
class GradientManager extends Manager {
    ctx;
    constructor() {
        super();
        this.ctx = (0, canvas_1.createCanvas)(1, 1).getContext("2d");
    }
    ;
    create = (name, type, options) => this.map.set(name, type === builder_1.GradientType.radial
        ? this.ctx.createRadialGradient(...options)
        : type === builder_1.GradientType.conic
            ? this.ctx.createConicGradient(...options)
            : this.ctx.createLinearGradient(...options));
}
exports.GradientManager = GradientManager;
;
class GIFManager extends Manager {
    create = (name, width, height, algorithm) => this.set(name, new gifencoder(width, height, algorithm));
}
exports.GIFManager = GIFManager;
;
//# sourceMappingURL=managers.js.map