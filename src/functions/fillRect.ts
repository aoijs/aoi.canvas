import { loadImage } from "@napi-rs/canvas";
import { CanvasBuilder, CanvasManager, CanvasUtil, RepeatType } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$fillRect",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", style, x = "0", y = "0", width, height, radius ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found. (canvas)`);

        const canvas_2 = d.data.canvases.get(canvas);
        if (!canvas_2)
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found. (canvas)`);

        const ctx = canvas_2.getContext();

        if (style && style?.trim()?.toLowerCase()?.startsWith("pattern:")) {
            const splits: string[] = style?.trim()?.split(":")?.slice(1);
            const typee = splits.shift();
            const isLastRepeat = splits[splits.length - 1] && ["repeat", "repeat-x", "repeat-y", "no-repeat"].includes(splits[splits.length - 1]);

            if (typee && typee?.toLowerCase() === "canvas") {
                const name = isLastRepeat ? splits?.slice(0, -1)?.join(":") : splits?.join();
                const repeat = isLastRepeat ? splits.pop() : null;

                const canvas_3: CanvasBuilder | undefined = d.data.canvases.get(name);

                if (!canvas_3)
                    return d.aoiError.fnError(d, "custom", {}, "No canvas with provided name found. (pattern)");
                
                const ctx_2 = canvas_3.getContext();

                style = ctx.createPattern(ctx_2.getImageData(0, 0, ctx_2.canvas.width, ctx_2.canvas.height), repeat as RepeatType);
            } else if (typee && typee?.toLowerCase() === "image") {
                const image = await loadImage(isLastRepeat ? splits?.slice(0, -1)?.join(":") : splits?.join(), { maxRedirects: 30 });
                const repeat = isLastRepeat ? splits.pop() : null;

                style = ctx.createPattern(image, repeat as RepeatType);
            };
        };

        d.data.canvases.get(canvas)?.fillRect(
            style, 
            x,
            y,
            width,
            height,
            parseFloat(radius)
        )

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};