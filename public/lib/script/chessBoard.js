/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/4/12.
 */

import Chess from './chess';
import Player from './player';
let chessInPosition = [],
    chessArr        = []
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
        for(let x=-1;x<boardRow;x++){ chessInPosition[x]=[]; }              ///创建二维数组
        if(isRandom){
            this.getChessInPositionRandom();
        }else{
            chessInPosition = [];
        }
    }

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
            oriflamme.setRole(0);
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
            landMin.setRole(10);
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
                    chess.setRole(i);
                    chess.setOwner(player);
                    chessInPosition[x][y] = chess;
                    player.subAChess(i);
                }
           }
        }
    }

    getChessInPosition(){
        return chessInPosition;
    }
}