import { AoiClient } from 'aoi.js';
import { readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import packagejson from '../package.json';
import { AoiFunction } from './classes/function';
import { GlobalFonts } from '@napi-rs/canvas';
const gifencoder = require('gif-encoder-2');

let funcs = 0;

export const log = (content: string, type: 'log' | 'warn'| 'error' = 'log') => {
    const color = 
        (type === 'error' 
            ? '\x1b[91m' 
            : (type === 'warn' ? '\x1b[33m' : ''));

    return console[type](`\x1b[0m[\x1b[36maoi.canvas\x1b[0m]: ${color + content}\x1b[0m`);
};
const loadFuncs = (client: AoiClient, path: string) => {
    if (!existsSync(path))
        return 'notfound';

    readdirSync(path)?.forEach(file => {
        const fpath = resolve(path, file);

        if (statSync(fpath).isDirectory())
            loadFuncs(client, fpath);

        if (statSync(fpath).isFile() && (file.endsWith('.ts') || file.endsWith('.js')) && !file.endsWith('.d.ts')) {
            try {
                let func = require(fpath);
                func = func.default ?? func;

                if (func instanceof AoiFunction) {
                    func.register(client);
                    funcs++;
                };
            } catch (err) {
                log(`Error loading function at path '${fpath}'`, 'error');
            };
        };
    });

    return 'loaded';
};

export const registerFonts = (fonts: { name?: string, path: string }[]): void => fonts.forEach(font => {
    if (!existsSync(font.path))
        throw Error(`Invalid font path. (${font.path})`);

    if (statSync(font.path).isFile()) {
        let filename = basename(font.path);
        if (!['ttf', 'otf', 'woff', 'woff2'].find(x => filename.endsWith(`.${x}`))) 
            return;

        filename = font.name ?? filename.split('.').slice(0, -1).join('.');
        GlobalFonts.registerFromPath(font.path, filename);
        log(`Registered '${filename}' font.`);
    } else return registerFonts(readdirSync(font.path).map(x => ({ path: join(font.path, x) })));
});

export class AoiCanvas {
    constructor (client: AoiClient) {
        loadFuncs(client, join(__dirname, './functions')) === 'loaded' ? 
            log(`Loaded ${funcs} functions.`) : 
            log('Failed to load the functions.', 'error');

        try {
            (async () => {
                const res = await (await fetch('https://registry.npmjs.org/@aoijs/aoi.canvas', {
                    headers: {
                        'User-Agent': 'aoi.canvas',
                    },
                })).json();

                if (!res.versions[packagejson.version])
                    return log('This is a dev version. Some stuff may be incomplete or unstable.', 'warn');
                
                if (packagejson.version !== res['dist-tags'].latest)
                    return log('aoi.canvas is outdated!', 'warn');
            })();
        } catch (e) {
            log('There was an error fetching aoi.canvas info on npm.', 'error');
        };
    }
};

export * from './typings';
export * from './classes';