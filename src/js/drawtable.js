window.onload = function() {
    let canvas = document.getElementById('chess-table');
    let tablectx = canvas.getContext('2d');
    let {width, height} = document.getElementById('table').getBoundingClientRect();
    canvas.width = 2 * width;
    canvas.height = 2 * height;
    console.log(width, height);
    Object.assign(canvas.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(0.5)',
    });
    drawtable(tablectx, width, height);
}

function drawtable(ctx, width, height) {
    let xStep = width/20;
    // console.log(xStep);

}

function drawLine(ctx, color, x1, y1, x2, y2){
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function drawStation(ctx, bdColor, bgColor, x, y, width, height, direction) {
    ctx.strokeStyle = bdColor;
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.moveTo(x-width/2, y-height/2);
    ctx.lineTo(x+width/2, y-height/2);
    ctx.lineTo(x+width/2, y+height/2);
    ctx.lineTo(x-width/2, y-height/2);
    ctx.lineTo(x-width/2, y-height/2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function drawCamp(ctx, bdColor, bgColor, x, y, r, direction) {
    ctx.strokeStyle = bdColor;
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function getCanvasPoint (canvas, x, y) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: 2 * (x - rect.left), //canvas 显示大小缩放为实际大小的 50%。为了让图形在 Retina 屏上清晰
        y: 2 * (y - rect.top),
    };
}