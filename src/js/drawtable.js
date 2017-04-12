window.onload = function() {
    let canvas = document.getElementById('chess-table');
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
    drawtable(canvas, width, height);

    window.addEventListener('resize', function(event) {
        let canvas = document.getElementById('chess-table');
        let {width, height} = document.getElementById('table').getBoundingClientRect();
        canvas.width = 2 * width;
        canvas.height = 2 * height;
        drawtable(canvas, width, height);
    })
}

function drawtable(canvas, width, height) {
    canvas.getContext('2d').clearRect(0, 0, 2*width, 2*height);
    let xStep = width/20;
    let leftTop = new Point2D(2*xStep, 2*xStep),
    rightTop = new Point2D(18*xStep, 2*xStep),
    leftBottom = new Point2D(2*xStep, 28*xStep),
    rightBottom = new Point2D(18*xStep, 28*xStep);
    let lineArray = []
    for (let i = 1; i <= 6; i++) {
        lineArray.push([2, 2*i, 18, 2*i]);
    }
    for (let i = 9; i <= 14; i++) {
        lineArray.push([2, 2*i, 18, 2*i]);
    }
    for (let i = 0; i < 3; i++) {
        lineArray.push([2+8*i, 2, 2+8*i, 28]);
    }
    for (let i = 0; i < 2; i++) {
        lineArray.push([6+8*i, 2, 6+8*i, 12]);
        lineArray.push([6+8*i, 18, 6+8*i, 28]);
    }
    lineArray.push([10, 4, 18, 8]);
    lineArray.push([2, 4, 18, 12]);
    lineArray.push([2, 8, 10, 12]);

    lineArray.push([10, 4, 2, 8]);
    lineArray.push([18, 4, 2, 12]);
    lineArray.push([18, 8, 10, 12]);

    lineArray.push([2, 22, 10, 26]);
    lineArray.push([2, 18, 18, 26]);
    lineArray.push([10, 18, 18, 22]);

    lineArray.push([2, 22, 10, 18]);
    lineArray.push([2, 26, 18, 18]);
    lineArray.push([10, 26, 18, 22]);    
    for (let i = 0; i < lineArray.length; i++) {
        drawLine(canvas, '#000', lineArray[i][0]*xStep, lineArray[i][1]*xStep, lineArray[i][2]*xStep, lineArray[i][3]*xStep);
    }
    drawStation(canvas, '#424D37', '#538ED5', 2*xStep, 2*xStep, 2*xStep, xStep, 0);
}

function drawLine(canvas, color, x1, y1, x2, y2){
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.beginPath();
    [x1, y1] = getCanvasPoint(canvas, x1, y1);
    [x2, y2] = getCanvasPoint(canvas, x2, y2);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function drawStation(canvas, bdColor, bgColor, x, y, width, height, direction) {
    let ctx = canvas.getContext('2d')
    ctx.strokeStyle = bdColor;
    ctx.fillStyle = bgColor;
    [x, y] = getCanvasPoint(canvas, x, y);
    [width, height] = getCanvasPoint(canvas, width, height);
    ctx.beginPath();
    ctx.moveTo(x-width/2, y-height/2);
    ctx.lineTo(x+width/2, y-height/2);
    ctx.lineTo(x+width/2, y+height/2);
    ctx.lineTo(x-width/2, y+height/2);
    ctx.lineTo(x-width/2, y-height/2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function drawCamp(canvas, bdColor, bgColor, x, y, r, direction) {
    let ctx = canvas.getContext('2d');
    [x, y] = getCanvasPoint(canvas, x, y);
    r = 2*r;
    ctx.strokeStyle = bdColor;
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function getCanvasPoint (canvas, x, y) {
    return [
        2 * (x - 0), //canvas 显示大小缩放为实际大小的 50%。为了让图形在 Retina 屏上清晰
        2 * (y - 0)
    ];
}

function Point2D(x, y) {
    this.x = x;
    this.y = y;
}