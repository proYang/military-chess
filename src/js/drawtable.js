import {chessPosition} from './global';
import {setDrop} from '../../public/lib/script/drag';
// console.log(setDrop);
window.onload = function() {
    let game = true;
    let sendNegotiationFlag = false;
    let sendSurrenderFlag = false;
    let receiveNegotiationFlag = false;
    let receiveSurrenderFlag = false;
    const socket = io('http://chess.slane.cn/');

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
    });

    document.getElementById('negotiation').addEventListener('click', function(event) {
        let mask = document.getElementById('mask');
        mask.className = mask.className.replace('hidden', '');
        sendNegotiationFlag = true;
        document.getElementById('mask-content').getElementsByTagName('p')[0].innerText = "是否请求平局？";
    });
    document.getElementById('surrender').addEventListener('click', function(event) {
        let mask = document.getElementById('mask');
        mask.className = mask.className.replace('hidden', '');
        sendSurrenderFlag = true;
        document.getElementById('mask-content').getElementsByTagName('p')[0].innerText = "是否发起投降？";
    });

    socket.on('negotiation', function(data){
        console.log(data);
        if (game) {
            if (sendNegotiationFlag) {
                if (data.type === 'success') {
                    game = false;
                    let mask = document.getElementById('mask');
                    if (mask.className.indexOf('hidden') === -1) {
                        mask.className += 'hidden';
                    } else {
                        mask.className = mask.className.replace('hidden', '');
                    }
                    document.getElementById('mask-content').getElementsByTagName('p')[0].innerText = "双方平局";
                } else if (data.type === 'fail') {
                    sendNegotiationFlag = false;
                    let mask = document.getElementById('mask');
                    if (mask.className.indexOf('hidden') === -1) {
                        mask.className += 'hidden';
                    } else {
                        mask.className = mask.className.replace('hidden', '');
                    }
                    document.getElementById('mask-content').getElementsByTagName('p')[0].innerText = "求和失败";
                }
            } else {
                if (data.type === 'confirm') {
                    let mask = document.getElementById('mask');
                    if (mask.className.indexOf('hidden') === -1) {
                        mask.className += 'hidden';
                    } else {
                        mask.className = mask.className.replace('hidden', '');
                    }
                    receiveNegotiationFlag = true;
                    document.getElementById('mask-content').getElementsByTagName('p')[0].innerText = "对方发起求和";
                }
            }
        }  
    });

    socket.on('surrender', function(data){
        console.log(data);
        if (game) {
            if (data.type === 'win') {
                // 处理接收投降
                receiveSurrenderFlag = true;
                let mask = document.getElementById('mask');
                if (mask.className.indexOf('hidden') === -1) {
                    mask.className += 'hidden';
                } else {
                    mask.className = mask.className.replace('hidden', '');
                }
                document.getElementById('mask-content').getElementsByTagName('p')[0].innerText = "对方已经投降";
                game = false;
            }    
        }
    });

    document.getElementById('mask-btn-1').addEventListener('click', function(event) { 
        if (game) {
            if (sendNegotiationFlag) {
                let data = {
                    type: 'leave'
                }
                socket.emit('negotiation', data);
                let mask = document.getElementById('mask');
                if (mask.className.indexOf('hidden') === -1) {
                    mask.className += 'hidden';
                } else {
                    mask.className = mask.className.replace('hidden', '');
                }
                // game = false;
                // document.getElementById('mask-content').getElementsByTagName('p')[0].innerText = "等待对方接收平局请求";
            } else if (sendSurrenderFlag) {
                let data = {
                    type: 'fail'
                }
                socket.emit('surrender', data);
                document.getElementById('mask-content').getElementsByTagName('p')[0].innerText = "您已失败";                
                game = false;
            } else if (receiveNegotiationFlag) {
                // let mask = document.getElementById('mask');
                // if (mask.className.indexOf('hidden') === -1) {
                //     mask.className += 'hidden';
                // } else {
                //     mask.className = mask.className.replace('hidden', '');
                // }
                let data = {
                    type: 'success'
                };
                socket.emit('negotiation', data);
                game = false;
                document.getElementById('mask-content').getElementsByTagName('p')[0].innerText = "双方平局";
            } else if (receiveSurrenderFlag) {
                // socket.emit('surrender', data);   
                game = false;  
                document.getElementById('mask-content').getElementsByTagName('p')[0].innerText = "您已胜利";                     
            } else {
                let mask = document.getElementById('mask');
                if (mask.className.indexOf('hidden') === -1) {
                    mask.className += 'hidden';
                } else {
                    mask.className = mask.className.replace('hidden', '');
                }
            }
        }
    });

    document.getElementById('mask-btn-2').addEventListener('click', function(event) {
        if (game) {
            
            if (sendNegotiationFlag) {
                sendNegotiationFlag = false;
                let mask = document.getElementById('mask');
                if (mask.className.indexOf('hidden') === -1) {
                    mask.className += 'hidden';
                } else {
                    mask.className = mask.className.replace('hidden', '');
                }
            } else if (sendSurrenderFlag) {
                sendSurrenderFlag = false;
                let mask = document.getElementById('mask');
                if (mask.className.indexOf('hidden') === -1) {
                    mask.className += 'hidden';
                } else {
                    mask.className = mask.className.replace('hidden', '');
                }
            } else if (receiveNegotiationFlag) {
                let data = {
                    type: 'fail'
                }
                socket.emit('negotiation', data);
                receiveNegotiationFlag = false;
                console.log('receiveNegotiationFlag no');
                let mask = document.getElementById('mask');
                if (mask.className.indexOf('hidden') === -1) {
                    console.log('get int receNogot false');
                    mask.className = mask.className + 'hidden';
                } else {
                    mask.className = mask.className.replace('hidden', '');
                }
                // document.getElementById('mask-content').getElementsByTagName('p')[0].innerText = "双方平局";                
            } else if (receiveSurrenderFlag) {
                receiveSurrenderFlag = false;
                game = false;
                let mask = document.getElementById('mask');
                if (mask.className.indexOf('hidden') === -1) {
                    mask.className += 'hidden';
                } else {
                    mask.className = mask.className.replace('hidden', '');
                }        
            } else {
                let mask = document.getElementById('mask');
                if (mask.className.indexOf('hidden') === -1) {
                    mask.className += 'hidden';
                } else {
                    mask.className = mask.className.replace('hidden', '');
                }  
            }
        } 
    });
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

export function drawtable(canvas, width, height) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 2*width, 2*height);
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
        drawLine(ctx, '#000', lineArray[i][0]*xStep, lineArray[i][1]*xStep, lineArray[i][2]*xStep, lineArray[i][3]*xStep, 2);
    }
    drawSubway(ctx, '#000', xStep, 8);
    let stations = [0, 2, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 19, 20, 22, 24, 
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37, 39, 40, 41, 43, 44, 45, 47, 49,
    50, 51, 52, 53, 54, 55, 57, 59];
    let station;
    for (let i = 0; i < stations.length; i++) {
        drawStationWrapper(ctx, '#424D37', '#538ED5', 6 , stations[i], '兵站', xStep, chessPosition);
        // (ctx, bdColor, bgColor, lineWidth, index, text, xStep, chessPosition)
    }
    let camps = [11, 13, 17, 21, 23, 36, 38, 42, 46, 48];
    let camp;
    for (let i = 0; i < camps.length; i++) {
        drawCampWrapper(ctx, '#424D37', '#538ED5', camps[i], '行营', xStep, chessPosition);
    }
    let strongholds = [1, 3, 56, 58];
    let stronghold;
    for (let i = 0; i < strongholds.length; i++) {
        drawStationWrapper(ctx, '#424D37', '#538ED5', 6,  strongholds[i], '大本营', xStep, chessPosition);   
    }
    drawMountainWrapper(ctx, 25, 32, '山界', '#000', 100, xStep, chessPosition);
    drawMountainWrapper(ctx, 27, 34, '山界', '#000', 100, xStep, chessPosition);  
    drawHiddenPlaceholder(canvas, 2, 2, chessPosition, xStep);
    setDrop();
}

function drawHiddenPlaceholder(canvas, chessWidth, chessHeight, chessPosition, xStep) {
    let placeholders = document.getElementsByClassName('hover');
    // table = document.getElementById('table');
    // for (let i = 0; i < placeholders.length; i++) {
    //     placeholders[i].remove();
    // }
    if (placeholders.length) {
        for (let i = 0; i < placeholders.length; i++) {
            placeholders[i].setAttribute('style', 'left: ' + (chessPosition[i][0] -  chessWidth/2)*xStep + 'px; top: ' + (chessPosition[i][1] - chessHeight/2)*xStep + 'px; width: ' +  chessWidth*xStep + 'px; height: ' + chessHeight*xStep + 'px;');       
        }
    } else {
        let documentFragment = new DocumentFragment(), placeholder;
        for (let i = 0; i < chessPosition.length; i++) {
            let placeholder = document.createElement('div');     
            placeholder.setAttribute('class', 'hover');
            placeholder.setAttribute('id', i);
            placeholder.setAttribute('style', 'left: ' + (chessPosition[i][0] -  chessWidth/2)*xStep + 'px; top: ' + (chessPosition[i][1] - chessHeight/2)*xStep + 'px; width: ' +  chessWidth*xStep + 'px; height: ' + chessHeight*xStep + 'px;');       
            documentFragment.appendChild(placeholder);
        }
        document.getElementById('table').appendChild(documentFragment);
    }
}

function drawMountainWrapper(ctx, index1, index2, text, color, fontSize, xStep, chessPosition) {
    drawMountain(ctx, chessPosition[index1][0]*xStep, chessPosition[index1][1]*xStep, chessPosition[index2][0]*xStep, chessPosition[index2][1]*xStep, text, color, fontSize);
}

function drawMountain(ctx, x1, y1, x2, y2, text, color, fontSize) {
    [x1, y1] = getCanvasPoint( x1, y1);
    [x2, y2] = getCanvasPoint( x2, y2);
    let x = (x1 + x2)/2;
    let y = (y1 + y2)/2;
    ctx.filleStyle = color;
    ctx.font = fontSize + 'px serif';
    ctx.fillText(text, x-fontSize * (text.length/2), y+fontSize/4);
}

function drawLine(ctx, color, x1, y1, x2, y2, lineWidth){
    // let ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    [x1, y1] = getCanvasPoint( x1, y1);
    [x2, y2] = getCanvasPoint( x2, y2);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}




function drawSubway(ctx, color, xStep, lineWidth) {
    drawLine(ctx, color, chessPosition[5][0]*xStep, chessPosition[5][1]*xStep, chessPosition[9][0]*xStep, chessPosition[9][1]*xStep, lineWidth);
    drawLine(ctx, color, chessPosition[5][0]*xStep, chessPosition[5][1]*xStep, chessPosition[50][0]*xStep, chessPosition[50][1]*xStep, lineWidth);
    drawLine(ctx, color, chessPosition[9][0]*xStep, chessPosition[9][1]*xStep, chessPosition[54][0]*xStep, chessPosition[54][1]*xStep, lineWidth);
    drawLine(ctx, color, chessPosition[50][0]*xStep, chessPosition[50][1]*xStep, chessPosition[54][0]*xStep, chessPosition[54][1]*xStep, lineWidth);
    drawLine(ctx, color, chessPosition[25][0]*xStep, chessPosition[25][1]*xStep, chessPosition[29][0]*xStep, chessPosition[29][1]*xStep, lineWidth);
    drawLine(ctx, color, chessPosition[30][0]*xStep, chessPosition[30][1]*xStep, chessPosition[34][0]*xStep, chessPosition[34][1]*xStep, lineWidth);
    drawLine(ctx, color, chessPosition[27][0]*xStep, chessPosition[27][1]*xStep, chessPosition[32][0]*xStep, chessPosition[32][1]*xStep, lineWidth);
}

function drawStationWrapper(ctx, bdColor, bgColor, lineWidth, index, text, xStep, chessPosition) {
    drawStation(ctx, bdColor, bgColor, chessPosition[index][0]*xStep, chessPosition[index][1]*xStep, 2*xStep*text.length/2, xStep*text.length/2, text, 6);   
}

function drawStation(ctx, bdColor, bgColor, x, y, width, height, text, lineWidth) {
    ctx.strokeStyle = bdColor;
    ctx.fillStyle = bgColor;
    ctx.lineWidth = lineWidth;
    [x, y] = getCanvasPoint( x, y);
    [width, height] = getCanvasPoint( width, height);
    // console.log(ctx);
    ctx.beginPath();
    ctx.moveTo(x-width/2, y-height/2);
    ctx.lineTo(x+width/2, y-height/2);
    ctx.lineTo(x+width/2, y+height/2);
    ctx.lineTo(x-width/2, y+height/2);
    ctx.lineTo(x-width/2, y-height/2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.strokeStyle = bdColor;
    ctx.fillStyle = '#000';
    let fontSize = (20*width/text.length)/23; //canvas.width/23
    ctx.font = Math.floor(fontSize) + 'px serif';
    ctx.fillText(text, x-fontSize * (text.length/2), y+9);
}

function drawCampWrapper(ctx, bdColor, bgColor, index, text, xStep, chessPosition) {
    drawCamp(ctx, '#424D37', '#538ED5', chessPosition[index][0]*xStep, chessPosition[index][1]*xStep, xStep, '行营', 6);    
}

function drawCamp(ctx, bdColor, bgColor, x, y, r, text, lineWidth) {
    [x, y] = getCanvasPoint( x, y);
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
    let fontSize = 20*r/23; //canvas.width/23
    ctx.font = Math.floor(fontSize) + 'px serif';
    ctx.fillText(text, x-fontSize, y+9);
}

// function drawStronghold(canvas, bdColor, bgColor, x, y, width, height, text, lineWidth) {
//     let ctx = canvas.getContext('2d');
//     ctx.strokeStyle = bdColor;
//     ctx.fillStyle = bgColor;
//     ctx.lineWidth = lineWidth;
//     [x, y] = getCanvasPoint( x, y);
//     [width, height] = getCanvasPoint( width, height);
//     ctx.beginPath();
//     ctx.moveTo(x-width/2, y+height/2);
//     ctx.lineTo(x-width/2, y-height/2);
//     ctx.lineTo(x+width/2, y-height/2);
//     ctx.lineTo(x+width/2, y+height/2);
//     ctx.closePath();
//     ctx.stroke();
// }

function getCanvasPoint (x, y) {
    return [
        2 * (x - 0), //canvas 显示大小缩放为实际大小的 50%。为了让图形在 Retina 屏上清晰
        2 * (y - 0)
    ];
}

// function getCanvasPointTest(index,, chessPosition xStep) {
//     let x = chessPosition[index][1];
//     let y = chessPosition[index][0];
//     x = 4 * x + 2;
//     y = 2 * y + 2;  
// }

function Point2D(x, y) {
    this.x = x;
    this.y = y;
}

setDrop();