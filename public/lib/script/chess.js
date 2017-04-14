/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/4/12.
 */

import  chessBoard  from './chessBoard';
//             0       1      2      3      4       5      6      7        8       9      10     11
//             1       3      3      3      2       2      2      2        1       1      3      2
let roles = ['军旗','工兵','排长','连长','营长','团长','旅长','师长 ','军长','司令','地雷','炸弹']
;
export default class Chess {
    constructor(chessRoleId){
        this.setRole(chessRoleId);
    }
    getOwner(){
        return this.player;
    }
    setOwner(player){
        this.player = player;
    }
    getRole(){
        return this.chessRoleId;
    }
    setRole(chessRoleId){
        this.chessRoleId = chessRoleId;
    }
    getPos(){
        return this.pos;
    }
    setPos(x, y){
        this.pos = [x, y];
    }
    getRoleId(role){
        return roles.indexOf(role);
    }
    getAccessablePointArr(x, y){

    }
    isAccessable(x, y){

    }
    getBigger(chessId1,chessId2){

    }
    isWinner(){

    }
}

