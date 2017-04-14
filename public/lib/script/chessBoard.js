/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/4/12.
 */

import Chess from './chess';
import Player from './player';
let chessInPosition = [],
    chessArr        = [],
    superPoint      = []                    //在铁路上的点
;
const maxRole = 12,
      maxChessNum = 50,
      boardRow  = 12,
      boardCol  = 5
;

export default class ChessBoard {
    constructor(isRandom){
        this.player1 = new Player('red');
        this.player2 = new Player('black');
        chessInPosition = [];
        this.initSuperPoint();
        for(let x=0;x<boardRow;x++){ chessInPosition[x]=[]; }              ///创建二维数组
        if(isRandom){
            this.getChessInPositionRandom();
            this.player1.initChessNum();
            this.player2.initChessNum();
        }else{
            chessInPosition = [];
        }
    }

    /*摆棋*/
    setOriflammePositionRan(player){                   //军旗随机位置
        while(player.getLeftChessNum(0)){
            let oriflamme = new Chess(),
                x         = player.getName() === 'red' ? 0 : boardRow - 1,
                y         = (function(){
                                return 2*Math.random()<1 ? 1 : 3;
                            })()
            ;
            while(chessInPosition[x][y] instanceof Chess){
                x = player.getName() === 'red' ? 0 : boardRow - 1;
                y = (function(){
                        return 2*Math.random()<1 ? 1 : 3;
                    })();
            }
            oriflamme.setPos(x, y);
            oriflamme.setRoleId(0);
            oriflamme.setOwner(player);
            chessInPosition[x][y] = oriflamme;
            player.subAChess(0);
        }
    }
    setLandMinePositionRan(player){                                          //地雷随机位置
        while(player.getLeftChessNum(10)){
            let landMin = new Chess(),
                x       = (function () {
                                return 2*Math.random()<1 ? (player.getName() === 'red' ? 0 : boardRow - 1) : (player.getName() === 'red' ? 1 : boardRow-2);
                            })(),
                y       = (function () {
                                return parseInt(5 * Math.random());
                            })()
            ;
            while(chessInPosition[x][y] instanceof Chess){
                x = (function () {
                    return 2*Math.random()<1 ? (player.getName() === 'red' ? 0 : boardRow - 1) : (player.getName() === 'red' ? 1 : boardRow-2);
                })();
                y = (function () {
                    return parseInt(5 * Math.random());
                })();
            }
            landMin.setPos(x, y);
            landMin.setRoleId(10);
            landMin.setOwner(player);
            chessInPosition[x][y] = landMin;
            player.subAChess(10);
        }
    }
    getChessInPositionRandom(){
        this.setOriflammePositionRan(this.player1);
        this.setOriflammePositionRan(this.player2);
        this.setLandMinePositionRan(this.player1);
        this.setLandMinePositionRan(this.player2);
        for(let x=0;x<boardRow;x++){
            for(let y=0;y<boardCol;y++){
                if(((x===2 || x===4 || x===7 || x===9) && (y===1 || y===3)) || ((x===3 || x===8) && y===2)){    //行营初始没棋子
                    continue;
                }
                if(!(chessInPosition[x][y] instanceof Chess)){
                    let chess  = new Chess(),
                        player = x<boardRow/2 ? this.player1 : this.player2;
                    let i = parseInt(-1 + maxRole*Math.random());
                    while(player.getLeftChessNum(i)<=0){                //////
                        i = (i+1) % maxRole;
                    }
                    chess.setPos(x,y);
                    chess.setRoleId(i);
                    chess.setOwner(player);
                    chessInPosition[x][y] = chess;
                    player.subAChess(i);
                }
           }
        }
    }
    getBoardRow(){
        return boardRow;
    }
    getBoardCol(){
        return boardRow;
    }
    getChessInPosition(){
        return chessInPosition;
    }

    initSuperPoint(){                                           // 初始化铁路点
        for(let x=0;x<boardRow;x++){
            for(let y=0;y<boardCol;y++){
                superPoint[x][y] = (x >= 1 && x <= 10 && (y === 0 || y === 4)) || (x === 1 || x === 5 || x === 6 || x === 10);
            }
        }
    }
    isSuperPoint(x, y){
        return !!superPoint[x][y];
    }

    /*行棋*/
    isAccessable(locX, locY, disX, disY){
        if(locX === disX && locY ===disY)
            return true;
        //目标点是行营
        if(((disX===2 || disX===4 || disX===7 || disX===9) && (disY===1 || disY===3)) || ((disX===3 || disX===8) && disY===2)){
            return Math.abs(locX-disX)<=1 && Math.abs(locY-disY)<=1;
        }
        if(!this.isSuperPoint(locX, locY)){
            if(locX+1<boardRow && (locX+1===disX && locY===disY)){
                return true;
            }
            if(locX-1>0 && (locX-1===disX && locY===disY)){
                return true;
            }
            if(locY+1<boardCol && ((locX===disX && locY+1===disY))){
                return true;
            }
            if(locY-1>0 && ((locX===disX && locY-1===disY))){
                return true;
            }
            return false;
        }

        if(locX+1<boardRow && this.isSuperPoint(locX, locY)){
            if(!(chessInPosition[locX+1][locY] instanceof Chess))
                isAccessable(locX+1, locY, disX, disY);
            else if(locX+1<boardRow && (locX+1===disX && locY===disY)){
                return true;
            }else{
                return false;
            }
        }
        if(locX-1>0 && this.isSuperPoint(locX, locY)){
            if(!(chessInPosition[locX-1][locY] instanceof Chess))
                isAccessable(locX-1, locY, disX, disY);
            else if(locX-1>0 && (locX-1===disX && locY===disY)){
                return true;
            }else{
                return false;
            }
        }
        if(locY+1<boardRow && this.isSuperPoint(locX, locY)){
            if(!(chessInPosition[locX][locY+1] instanceof Chess))
                isAccessable(locX, locY+1, disX, disY);
            else if(locY+1<boardCol && (locX===disX && locY+1===disY)){
                return true;
            }else{
                return false;
            }
        }
        if(locY-1>0 && this.isSuperPoint(locX, locY)){
            if(!(chessInPosition[locX][locY-1] instanceof Chess))
                isAccessable(locX, locY-1, disX, disY);
            else if(locY-1>0 && (locX===disX && locY-1===disY)){
                return true;
            }else{
                return false;
            }
        }
    }
    getAccessablePointArr(locX, locY){
        let accessablePointArr = [],
            boardRow = ChessBoard.getBoardRow(),
            boardCol = ChessBoard.getBoardCol(),
            chessInPosition = ChessBoard.getChessInPosition(),
            cnt=0
        ;
        for(let i=0;i<100;i++) {
            accessablePointArr[i] = [];
        }
        for(let x=0;x<boardRow;x++){
            for(let y=0;y<boardCol;y++){
                if(dfsAccessablePoint(locX, locY, x, y))
                    accessablePointArr[cnt++] = [x, y];
            }
        }
    }
}