/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/4/13.
 */

export default class Player{
    constructor(name){
        this.name = name;
        this.chessLeftNumArr = [1, 3, 3, 3, 2, 2, 2, 2, 1, 1, 3, 2];        //各种棋余子
        this.chessLeftAll    = 25;                                           //总余子数
    }
    getName(){
        return this.name;
    }
    getLeftChessNum(i){
        return this.chessLeftNumArr[i];
    }
    subAChess(i){                               //减去某一个棋子
        this.chessLeftNumArr[i]--;
    }

}