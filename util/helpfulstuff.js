const drawSomeLines = async (ctx, waypoints) => {
    for (var i = 0; i < waypoints.length; i += 2) {
        const xPos = waypoints[i]
        const yPos = waypoints[i + 1]

        if (xPos !== undefined && yPos !== undefined) {
            await ctx.lineTo(parseFloat(xPos), parseFloat(yPos));
        };
    }
};

const drawSomeBezierLines = async (ctx, waypoints) => {
    for (let i = 0; i < points.length; i += 6) {
        await ctx.bezierCurveTo(
            parseFloat(waypoints[i]),
            parseFloat(waypoints[i + 1]),
            parseFloat(waypoints[i + 2]),
            parseFloat(waypoints[i + 3]),
            parseFloat(waypoints[i + 4]),
            parseFloat(waypoints[i + 5])
        );
    }
};

module.exports.drawLines = drawSomeLines;
module.exports.drawBezierLines = drawSomeBezierLines;