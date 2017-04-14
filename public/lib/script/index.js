import '../style/commes.css';
import '../style/style.scss';
import '../style/normalize.css';
import '../style/talk.scss';
import '../../../src/js/global';
import '../../../src/js/drawtable';
import talkObj from './talk.js';
import Chess from './chess.js';
import ChessBoard from './chessBoard';
talkObj.listen(); // 监听聊天的所有

let chessBoard = new ChessBoard(true);
let chessInPosition = chessBoard.getChessInPosition();
let cnt = 0;




/*for(let x=0;x<12;x++){
    for(let y=0;y<5;y++){
        if(chessInPosition[x][y])
        {
            console.log(chessInPosition[x][y]);
            cnt++;
        }

    }
}*/
