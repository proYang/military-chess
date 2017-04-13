import {chessPosition} from './global';

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

    // console.log(window);

    window.addEventListener('resize', function(event) {
        let canvas = document.getElementById('chess-table');
        let {width, height} = document.getElementById('table').getBoundingClientRect();
        canvas.width = 2 * width;
        canvas.height = 2 * height;
        drawtable(canvas, width, height);
    })
    startTiming();
}

function startTiming() {
    let timeDom = document.getElementById('time');
    let startTime = new Date();
    function startCall() {
        setTimeout(function() {
            let leftTime = parseInt(((new Date()).getTime() - startTime.getTime())/1000);
            let h = parseInt((leftTime/(60*60))%24);
            let m = parseInt((leftTime/60)%60);
            let s = leftTime%60;
            timeDom.innerText = h+':'+m+':'+s;
            startCall()
        }, 1000);
    }
    startCall();
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
        drawLine(canvas, '#000', lineArray[i][0]*xStep, lineArray[i][1]*xStep, lineArray[i][2]*xStep, lineArray[i][3]*xStep, 1);
    }
    drawSubway(canvas, '#000', xStep, 8);
    let stations = [0, 2, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 19, 20, 22, 24, 
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37, 39, 40, 41, 43, 44, 45, 47, 49,
    50, 51, 52, 53, 54, 55, 57, 59];
    let station;
    for (let i = 0; i < stations.length; i++) {
        station = chessPosition[stations[i]];
        drawStation(canvas, '#424D37', '#538ED5', station[0]*xStep, station[1]*xStep, 2*xStep, xStep, 0, '兵站', 6);
    }
    let camps = [11, 13, 17, 21, 23, 36, 38, 42, 46, 48];
    let camp;
    for (let i = 0; i < camps.length; i++) {
        camp = chessPosition[camps[i]];
        drawCamp(canvas, '#424D37', '#538ED5', camp[0]*xStep, camp[1]*xStep, 1*xStep, 0, '行营', 6);
    }
    let strongholds = [1, 3, 56, 58];
    let stronghold;
    for (let i = 0; i < strongholds.length; i++) {
        stronghold = chessPosition[strongholds[i]];
        drawStation(canvas, '#424D37', '#538ED5', stronghold[0]*xStep, stronghold[1]*xStep, 3*xStep, 1.5*xStep, 0, '大本营', 6);
    }
    drawMountain(canvas, chessPosition[25][0]*xStep, chessPosition[25][1]*xStep, chessPosition[32][0]*xStep, chessPosition[32][1]*xStep, '山界', '#000', 100);
    drawMountain(canvas, chessPosition[27][0]*xStep, chessPosition[27][1]*xStep, chessPosition[34][0]*xStep, chessPosition[34][1]*xStep, '山界', '#000', 100);
}

function drawMountain(canvas, x1, y1, x2, y2, text, color, fontSize) {
    [x1, y1] = getCanvasPoint(canvas, x1, y1);
    [x2, y2] = getCanvasPoint(canvas, x2, y2);
    let x = (x1 + x2)/2;
    let y = (y1 + y2)/2;
    let ctx = canvas.getContext('2d');
    ctx.filleStyle = color;
    ctx.font = fontSize + 'px serif';
    ctx.fillText(text, x-fontSize * (text.length/2), y+fontSize/4);
}

function drawLine(canvas, color, x1, y1, x2, y2, lineWidth){
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    [x1, y1] = getCanvasPoint(canvas, x1, y1);
    [x2, y2] = getCanvasPoint(canvas, x2, y2);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function drawSubway(canvas, color, xStep, lineWidth) {
    drawLine(canvas, color, chessPosition[5][0]*xStep, chessPosition[5][1]*xStep, chessPosition[9][0]*xStep, chessPosition[9][1]*xStep, lineWidth);
    drawLine(canvas, color, chessPosition[5][0]*xStep, chessPosition[5][1]*xStep, chessPosition[50][0]*xStep, chessPosition[50][1]*xStep, lineWidth);
    drawLine(canvas, color, chessPosition[9][0]*xStep, chessPosition[9][1]*xStep, chessPosition[54][0]*xStep, chessPosition[54][1]*xStep, lineWidth);
    drawLine(canvas, color, chessPosition[50][0]*xStep, chessPosition[50][1]*xStep, chessPosition[54][0]*xStep, chessPosition[54][1]*xStep, lineWidth);
    drawLine(canvas, color, chessPosition[25][0]*xStep, chessPosition[25][1]*xStep, chessPosition[29][0]*xStep, chessPosition[29][1]*xStep, lineWidth);
    drawLine(canvas, color, chessPosition[30][0]*xStep, chessPosition[30][1]*xStep, chessPosition[34][0]*xStep, chessPosition[34][1]*xStep, lineWidth);
    drawLine(canvas, color, chessPosition[27][0]*xStep, chessPosition[27][1]*xStep, chessPosition[32][0]*xStep, chessPosition[32][1]*xStep, lineWidth);
}

function drawStation(canvas, bdColor, bgColor, x, y, width, height, direction, text, lineWidth) {
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = bdColor;
    ctx.fillStyle = bgColor;
    ctx.lineWidth = lineWidth;
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
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = bdColor;
    ctx.fillStyle = '#000';
    let fontSize = canvas.width/23;
    ctx.font = Math.floor(fontSize) + 'px serif';
    ctx.fillText(text, x-fontSize * (text.length/2), y+9);
}

function drawCamp(canvas, bdColor, bgColor, x, y, r, direction, text, lineWidth) {
    let ctx = canvas.getContext('2d');
    [x, y] = getCanvasPoint(canvas, x, y);
    r = 2*r;
    ctx.strokeStyle = bdColor;
    ctx.fillStyle = bgColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = '#000';
    let fontSize = canvas.width/23;
    ctx.font = Math.floor(fontSize) + 'px serif';
    ctx.fillText(text, x-fontSize, y+9);
}

function drawStronghold(canvas, bdColor, bgColor, x, y, width, height, text, lineWidth) {
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = bdColor;
    ctx.fillStyle = bgColor;
    ctx.lineWidth = lineWidth;
    [x, y] = getCanvasPoint(canvas, x, y);
    [width, height] = getCanvasPoint(canvas, width, height);
    ctx.beginPath();
    ctx.moveTo(x-width/2, y+height/2);
    ctx.lineTo(x-width/2, y-height/2);
    ctx.lineTo(x+width/2, y-height/2);
    ctx.lineTo(x+width/2, y+height/2);
    ctx.closePath();
    ctx.stroke();
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