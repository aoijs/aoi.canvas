"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compositingOperation = exports.lineJoinShape = exports.fillRule = exports.textBaseline = exports.Filters = exports.WidthOrHeight = exports.FillOrStrokeOrClear = exports.GradientType = exports.FilterMethod = exports.MeasureTextProperty = exports.textAlign = exports.ParamType = void 0;
const gifencoder = require('gif-encoder-2');
;
;
;
;
;
// Enums
var ParamType;
(function (ParamType) {
    ParamType[ParamType["String"] = 0] = "String";
    ParamType[ParamType["Number"] = 1] = "Number";
    ParamType[ParamType["Integer"] = 2] = "Integer";
    ParamType[ParamType["Boolean"] = 3] = "Boolean";
    ParamType[ParamType["Url"] = 4] = "Url";
    ParamType[ParamType["Enum"] = 5] = "Enum";
    ParamType[ParamType["Color"] = 6] = "Color";
    ParamType[ParamType["Object"] = 7] = "Object";
    ParamType[ParamType["Array"] = 8] = "Array";
    ParamType[ParamType["JSON"] = 9] = "JSON";
    ParamType[ParamType["User"] = 10] = "User";
    ParamType[ParamType["Guild"] = 11] = "Guild";
    ParamType[ParamType["Channel"] = 12] = "Channel";
    ParamType[ParamType["Permission"] = 13] = "Permission";
})(ParamType || (exports.ParamType = ParamType = {}));
;
var textAlign;
(function (textAlign) {
    textAlign["start"] = "end";
    textAlign["right"] = "left";
    textAlign["center"] = "center";
    textAlign["left"] = "right";
    textAlign["end"] = "start";
})(textAlign || (exports.textAlign = textAlign = {}));
;
var MeasureTextProperty;
(function (MeasureTextProperty) {
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxAscent"] = 0] = "actualBoundingBoxAscent";
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxDescent"] = 1] = "actualBoundingBoxDescent";
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxLeft"] = 2] = "actualBoundingBoxLeft";
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxRight"] = 3] = "actualBoundingBoxRight";
    MeasureTextProperty[MeasureTextProperty["fontBoundingBoxAscent"] = 4] = "fontBoundingBoxAscent";
    MeasureTextProperty[MeasureTextProperty["fontBoundingBoxDescent"] = 5] = "fontBoundingBoxDescent";
    MeasureTextProperty[MeasureTextProperty["alphabeticBaseline"] = 6] = "alphabeticBaseline";
    MeasureTextProperty[MeasureTextProperty["emHeightAscent"] = 7] = "emHeightAscent";
    MeasureTextProperty[MeasureTextProperty["emHeightDescent"] = 8] = "emHeightDescent";
    MeasureTextProperty[MeasureTextProperty["width"] = 9] = "width";
})(MeasureTextProperty || (exports.MeasureTextProperty = MeasureTextProperty = {}));
;
var FilterMethod;
(function (FilterMethod) {
    FilterMethod[FilterMethod["add"] = 0] = "add";
    FilterMethod[FilterMethod["set"] = 1] = "set";
    FilterMethod[FilterMethod["remove"] = 2] = "remove";
    FilterMethod[FilterMethod["clear"] = 3] = "clear";
    FilterMethod[FilterMethod["get"] = 4] = "get";
    FilterMethod[FilterMethod["parse"] = 5] = "parse";
})(FilterMethod || (exports.FilterMethod = FilterMethod = {}));
;
var GradientType;
(function (GradientType) {
    GradientType[GradientType["linear"] = 0] = "linear";
    GradientType[GradientType["radial"] = 1] = "radial";
    GradientType[GradientType["conic"] = 2] = "conic";
})(GradientType || (exports.GradientType = GradientType = {}));
;
var FillOrStrokeOrClear;
(function (FillOrStrokeOrClear) {
    FillOrStrokeOrClear[FillOrStrokeOrClear["none"] = 0] = "none";
    FillOrStrokeOrClear[FillOrStrokeOrClear["fill"] = 1] = "fill";
    FillOrStrokeOrClear[FillOrStrokeOrClear["stroke"] = 2] = "stroke";
    FillOrStrokeOrClear[FillOrStrokeOrClear["clear"] = 3] = "clear";
})(FillOrStrokeOrClear || (exports.FillOrStrokeOrClear = FillOrStrokeOrClear = {}));
;
var WidthOrHeight;
(function (WidthOrHeight) {
    WidthOrHeight[WidthOrHeight["width"] = 0] = "width";
    WidthOrHeight[WidthOrHeight["height"] = 1] = "height";
})(WidthOrHeight || (exports.WidthOrHeight = WidthOrHeight = {}));
;
var Filters;
(function (Filters) {
    Filters[Filters["none"] = 0] = "none";
    Filters[Filters["blur"] = 1] = "blur";
    Filters[Filters["sepia"] = 2] = "sepia";
    Filters[Filters["grayscale"] = 3] = "grayscale";
    Filters[Filters["brightness"] = 4] = "brightness";
    Filters[Filters["contrast"] = 5] = "contrast";
    Filters[Filters["invert"] = 6] = "invert";
    Filters[Filters["saturate"] = 7] = "saturate";
})(Filters || (exports.Filters = Filters = {}));
;
var textBaseline;
(function (textBaseline) {
    textBaseline[textBaseline["top"] = 0] = "top";
    textBaseline[textBaseline["hanging"] = 1] = "hanging";
    textBaseline[textBaseline["middle"] = 2] = "middle";
    textBaseline[textBaseline["alphabetic"] = 3] = "alphabetic";
    textBaseline[textBaseline["ideographic"] = 4] = "ideographic";
    textBaseline[textBaseline["bottom"] = 5] = "bottom";
})(textBaseline || (exports.textBaseline = textBaseline = {}));
;
var fillRule;
(function (fillRule) {
    fillRule[fillRule["nonzero"] = 0] = "nonzero";
    fillRule[fillRule["evenodd"] = 1] = "evenodd";
})(fillRule || (exports.fillRule = fillRule = {}));
;
var lineJoinShape;
(function (lineJoinShape) {
    lineJoinShape[lineJoinShape["round"] = 0] = "round";
    lineJoinShape[lineJoinShape["bevel"] = 1] = "bevel";
    lineJoinShape[lineJoinShape["miter"] = 2] = "miter";
})(lineJoinShape || (exports.lineJoinShape = lineJoinShape = {}));
;
var compositingOperation;
(function (compositingOperation) {
    compositingOperation[compositingOperation["source-over"] = 0] = "source-over";
    compositingOperation[compositingOperation["source-in"] = 1] = "source-in";
    compositingOperation[compositingOperation["source-out"] = 2] = "source-out";
    compositingOperation[compositingOperation["source-atop"] = 3] = "source-atop";
    compositingOperation[compositingOperation["destination-over"] = 4] = "destination-over";
    compositingOperation[compositingOperation["destination-in"] = 5] = "destination-in";
    compositingOperation[compositingOperation["destination-out"] = 6] = "destination-out";
    compositingOperation[compositingOperation["destination-atop"] = 7] = "destination-atop";
    compositingOperation[compositingOperation["lighter"] = 8] = "lighter";
    compositingOperation[compositingOperation["copy"] = 9] = "copy";
    compositingOperation[compositingOperation["xor"] = 10] = "xor";
    compositingOperation[compositingOperation["multiply"] = 11] = "multiply";
    compositingOperation[compositingOperation["screen"] = 12] = "screen";
    compositingOperation[compositingOperation["overlay"] = 13] = "overlay";
    compositingOperation[compositingOperation["darken"] = 14] = "darken";
    compositingOperation[compositingOperation["lighten"] = 15] = "lighten";
    compositingOperation[compositingOperation["color-dodge"] = 16] = "color-dodge";
    compositingOperation[compositingOperation["color-burn"] = 17] = "color-burn";
    compositingOperation[compositingOperation["hard-light"] = 18] = "hard-light";
    compositingOperation[compositingOperation["soft-light"] = 19] = "soft-light";
    compositingOperation[compositingOperation["difference"] = 20] = "difference";
    compositingOperation[compositingOperation["exclusion"] = 21] = "exclusion";
    compositingOperation[compositingOperation["hue"] = 22] = "hue";
    compositingOperation[compositingOperation["saturation"] = 23] = "saturation";
    compositingOperation[compositingOperation["color"] = 24] = "color";
    compositingOperation[compositingOperation["luminosity"] = 25] = "luminosity";
})(compositingOperation || (exports.compositingOperation = compositingOperation = {}));
;
//# sourceMappingURL=typings.js.map