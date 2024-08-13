const { AoiFunction } = require('./dist/classes/function.js');
const { readdirSync, statSync, writeFileSync } = require('node:fs');
const { resolve } = require('node:path');

const functions = [];

const loadFuncs = (path) => 
    readdirSync(path)?.forEach(file => {
        const fpath = resolve(path, file);

        if (statSync(fpath).isDirectory())
            loadFuncs(fpath);

        if (statSync(fpath).isFile() && file.endsWith('.js')) {
            try {
                let func = require(fpath);
                func = func.default ?? func;

                if (func instanceof AoiFunction) {
                    const funcInfo = func.get(),
                          category = path.split('\\').pop();

                    if (functions.find(x => x.name === funcInfo.name))
                        throw new Error(`wtf bro you have functions with the same name (${x.name})`);

                    functions.push({
                        ...funcInfo,
                        category,
                        src: `https://github.com/aoijs/aoi.canvas/tree/v2/src/functions/${category}/${file.split('.').slice(0, -1).join('.')}.ts`,
                        docs: `https://aoi.js.org/extensions/aoijs/aoicanvas/functions/${category}/${funcInfo.name.slice(1)}`
                    });
                }; 
            } catch (err) { console.error(err) };
        };
    });

loadFuncs('./dist/functions');
writeFileSync('./functions.json', JSON.stringify(functions, null, 2));