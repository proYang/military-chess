window.onload = function() {
    let canvas = document.getElementById('table');
    let context = canvas.getContext('2d');
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