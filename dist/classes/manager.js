"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasManager = void 0;
const builder_1 = require("./builder");
class CanvasManager {
    canvases;
    constructor() {
        this.canvases = new Map();
    }
    create = (name, width, height) => {
        this.canvases.set(name, new builder_1.CanvasBuilder(width, height));
    };
    remove = (name) => {
        this.canvases.delete(name);
    };
    set = (name, canvas) => {
        if (!this.canvases.has(name))
            return;
        this.canvases.set(name, canvas);
    };
    get = (name) => {
        if (!this.canvases.has(name))
            return;
        return this.canvases.get(name);
    };
    all = () => {
        return this.canvases;
    };
}
exports.CanvasManager = CanvasManager;
//# sourceMappingURL=manager.js.map