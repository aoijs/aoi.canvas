export declare class CanvasUtil {
    static isValidFont: (font: string) => boolean;
    static parseFilters: (filters: string) => {
        filter: string;
        value: string;
        raw: string;
    }[];
    static rgbaToHex: (r: number, g: number, b: number, a?: number) => string;
    static hexToRgba: (hex: string) => {
        red: number;
        green: number;
        blue: number;
        alpha: number | undefined;
    };
}
//# sourceMappingURL=util.d.ts.map