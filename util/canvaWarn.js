// Why i made file for only this...

module.exports = {
    newWarn: (msg) => {
        try {
            console.log(`\x1b[33mCanvaWarning:\x1b[97m ${msg}`);
        } catch (err) {
            // Hi
        }
    }
}