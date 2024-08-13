import { AoiClient } from 'aoi.js';
export declare const log: (content: string, type?: 'log' | 'warn' | 'error') => void;
export declare const registerFonts: (fonts: {
    name?: string;
    path: string;
}[]) => void;
export declare class AoiCanvas {
    constructor(client: AoiClient);
}
export * from './typings';
export * from './classes';
//# sourceMappingURL=index.d.ts.map